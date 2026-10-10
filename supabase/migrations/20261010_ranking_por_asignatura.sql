-- =====================================================================
-- Migración 2026-10-10 · Tests por tema, ids estables de pregunta,
-- ranking por asignatura y RLS endurecido.
--
-- Requisito: haber ejecutado antes supabase/schema.sql.
-- Cuándo: pégala en Supabase → SQL Editor → New query → Run ANTES de
-- publicar la versión nueva de la app. Es aditiva: la versión anterior
-- de la app sigue funcionando hasta que cada móvil se actualice.
-- Se puede ejecutar más de una vez: la copia de datos solo se hace la primera.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 0. Registro de migraciones aplicadas
-- ---------------------------------------------------------------------
create table if not exists public.app_migrations (
  name text primary key,
  at   timestamptz not null default now()
);
alter table public.app_migrations enable row level security;
revoke all on public.app_migrations from anon, authenticated;


-- ---------------------------------------------------------------------
-- 1. Clasificaciones (boards): cada test pertenece a una asignatura
-- ---------------------------------------------------------------------
alter table public.boards add column if not exists asignatura_id text;

update public.boards set asignatura_id = case
    when subject_id = 'sif' then 'sif'
    when subject_id in ('ii', 'ii-pci') then 'inst'
  end
where asignatura_id is null;

insert into public.boards (id, subject_id, preset_id, penalty, min_questions, asignatura_id) values
  ('sif',                   'sif',          null,        0,   20, 'sif'),
  ('clim-temario',          'clim-temario', null,        0,   20, 'inst'),
  ('clim-verif',            'clim-verif',   null,        0,   20, 'inst'),
  ('pci-temario',           'pci-temario',  null,        0.5, 20, 'inst'),
  ('pci-verif',             'pci-verif',    null,        0.5, 20, 'inst'),
  ('pci-temario:real-2026', 'pci-temario',  'real-2026', 0.5, 20, 'inst')
on conflict (id) do update set asignatura_id = excluded.asignatura_id;

-- p: [{ "subject_id": "mec-temario", "preset_id": null, "penalty": 0, "min_questions": 20, "asignatura_id": "mec" }, …]
create or replace function public.register_boards(p jsonb)
returns void language plpgsql security definer set search_path = ''
as $$
declare b jsonb;
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  if jsonb_typeof(p) <> 'array' or jsonb_array_length(p) > 100 then return; end if;
  for b in select * from jsonb_array_elements(p) loop
    continue when char_length(coalesce(b ->> 'subject_id', '')) not between 1 and 60
               or not public.valid_penalty((b ->> 'penalty')::numeric)
               or coalesce((b ->> 'min_questions')::int, 0) not between 1 and 1000;
    insert into public.boards (id, subject_id, preset_id, penalty, min_questions, asignatura_id)
    values (
      (b ->> 'subject_id') || coalesce(':' || nullif(b ->> 'preset_id', ''), ''),
      b ->> 'subject_id', nullif(b ->> 'preset_id', ''),
      (b ->> 'penalty')::numeric, (b ->> 'min_questions')::int,
      nullif(left(b ->> 'asignatura_id', 60), ''))
    on conflict (id) do update set asignatura_id = coalesce(public.boards.asignatura_id, excluded.asignatura_id);
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 2. Resultados de examen: asignatura y test
-- ---------------------------------------------------------------------
alter table public.exam_results add column if not exists asignatura_id text;
alter table public.exam_results add column if not exists test_id text;

update public.exam_results set test_id = subject_id where test_id is null;
update public.exam_results e set asignatura_id = b.asignatura_id
  from public.boards b
 where e.asignatura_id is null and b.id = e.subject_id;

create index if not exists exam_results_asig_idx
  on public.exam_results (asignatura_id, user_id, taken_at desc) where ranked;

-- Validación en el servidor (igual que antes) + asignatura y test
create or replace function public.validate_exam_result()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare
  b public.boards;
  expected numeric;
begin
  if new.n_questions is null or new.n_questions < 1 or new.n_questions > 1000 then
    raise exception 'Resultado rechazado: número de preguntas no válido.' using errcode = '22023';
  end if;
  if least(new.n_correct, new.n_wrong, new.n_blank) < 0
     or new.n_correct + new.n_wrong + new.n_blank <> new.n_questions then
    raise exception 'Resultado rechazado: aciertos + fallos + en blanco no suman el número de preguntas.' using errcode = '22023';
  end if;
  if new.grade is null or new.grade < 0 or new.grade > 10 then
    raise exception 'Resultado rechazado: la nota debe estar entre 0 y 10.' using errcode = '22023';
  end if;
  if new.duration_s is null or new.duration_s < 60 then
    raise exception 'Resultado rechazado: el examen duró menos de 1 minuto.' using errcode = '22023';
  end if;
  if not public.valid_penalty(new.penalty) then
    raise exception 'Resultado rechazado: penalización no válida.' using errcode = '22023';
  end if;
  expected := round(greatest(0, (new.n_correct - new.n_wrong * new.penalty) * 10.0 / new.n_questions), 2);
  if abs(new.grade - expected) > 0.011 then
    raise exception 'Resultado rechazado: la nota no corresponde a los aciertos y fallos.' using errcode = '22023';
  end if;
  if new.taken_at is null or new.taken_at > now() + interval '10 minutes' then
    raise exception 'Resultado rechazado: fecha no válida.' using errcode = '22023';
  end if;
  if new.duration_s > extract(epoch from (now() - new.taken_at)) + 600 then
    raise exception 'Resultado rechazado: la duración no cuadra con la fecha.' using errcode = '22023';
  end if;

  -- ¿Cuenta? Al menos 20 preguntas (o el examen real completo) y la penalización por defecto del test.
  select * into b from public.boards
   where id = new.subject_id || coalesce(':' || nullif(new.preset_id, ''), '');
  new.board_id := b.id;
  new.ranked := b.id is not null
    and abs(new.penalty - b.penalty) < 1e-6
    and new.n_questions >= b.min_questions
    and (b.preset_id is null or new.n_questions = b.min_questions);
  new.test_id := new.subject_id;
  new.asignatura_id := coalesce(b.asignatura_id,
    (select x.asignatura_id from public.boards x where x.id = new.subject_id));
  new.created_at := now();
  return new;
end $$;


-- ---------------------------------------------------------------------
-- 3. Progreso por pregunta con id estable (hash del enunciado)
-- ---------------------------------------------------------------------
create table if not exists public.question_progress (
  user_id      uuid not null references public.profiles (id) on delete cascade,
  test_id      text not null,               -- 'sif', 'clim-temario', 'pci-verif'…
  q_id         text not null,               -- hash corto del enunciado normalizado
  n            int not null default 0,
  n_correct    int not null default 0,
  last_correct boolean not null,
  last_at      timestamptz not null,
  updated_at   timestamptz not null default now(),
  primary key (user_id, test_id, q_id)
);
alter table public.question_progress enable row level security;
revoke all on public.question_progress from anon;
revoke insert, update, delete on public.question_progress from authenticated;
drop policy if exists "question_progress: leer el mío" on public.question_progress;
create policy "question_progress: leer el mío" on public.question_progress
  for select to authenticated using (user_id = auth.uid());

-- Correspondencia de las preguntas antiguas (por posición) con los tests nuevos.
-- Una pregunta que está en dos tests aparece dos veces.
create table if not exists public.legacy_question_map (
  old_subject text not null,
  old_index   int  not null,
  test_id     text not null,
  q_id        text not null,
  primary key (old_subject, old_index, test_id)
);
alter table public.legacy_question_map enable row level security;
revoke all on public.legacy_question_map from anon, authenticated;

insert into public.legacy_question_map (old_subject, old_index, test_id, q_id) values
  ('sif', 0, 'sif', '1vfhdfx'),
  ('sif', 1, 'sif', '19bqoin'),
  ('sif', 2, 'sif', '13dly3x'),
  ('sif', 3, 'sif', '016foir'),
  ('sif', 4, 'sif', '1mg3gf3'),
  ('sif', 5, 'sif', '05k361j'),
  ('sif', 6, 'sif', '12tkky5'),
  ('sif', 7, 'sif', '1ajcoqs'),
  ('sif', 8, 'sif', '03ab7ww'),
  ('sif', 9, 'sif', '0s6bpjw'),
  ('sif', 10, 'sif', '0k6uytv'),
  ('sif', 11, 'sif', '0fbmh1q'),
  ('sif', 12, 'sif', '0mzwurt'),
  ('sif', 13, 'sif', '1tvp4py'),
  ('sif', 14, 'sif', '0iysa8c'),
  ('sif', 15, 'sif', '1oevsdw'),
  ('sif', 16, 'sif', '03scjvs'),
  ('sif', 17, 'sif', '1izarp6'),
  ('sif', 18, 'sif', '1ipb607'),
  ('sif', 19, 'sif', '13o7fy0'),
  ('sif', 20, 'sif', '1yw89b4'),
  ('sif', 21, 'sif', '021lj09'),
  ('sif', 22, 'sif', '0ypjz2j'),
  ('sif', 23, 'sif', '1e322on'),
  ('sif', 24, 'sif', '1ed1odm'),
  ('sif', 25, 'sif', '030m4g5'),
  ('sif', 26, 'sif', '0ora9ij'),
  ('sif', 27, 'sif', '14awk1g'),
  ('sif', 28, 'sif', '0ixpgts'),
  ('sif', 29, 'sif', '1l52f0a'),
  ('sif', 30, 'sif', '18fe65x'),
  ('sif', 31, 'sif', '173y6i1'),
  ('sif', 32, 'sif', '0tuwnyt'),
  ('sif', 33, 'sif', '09t1jhm'),
  ('sif', 34, 'sif', '0xbc0yr'),
  ('sif', 35, 'sif', '08bqon3'),
  ('sif', 36, 'sif', '14tcwda'),
  ('sif', 37, 'sif', '1l230jj'),
  ('sif', 38, 'sif', '1d40stx'),
  ('sif', 39, 'sif', '0kgnoy2'),
  ('sif', 40, 'sif', '0ll8jxm'),
  ('sif', 41, 'sif', '1p10skd'),
  ('sif', 42, 'sif', '1ginvi5'),
  ('sif', 43, 'sif', '1xc99ga'),
  ('sif', 44, 'sif', '1n5kp6w'),
  ('sif', 45, 'sif', '0lcp3si'),
  ('sif', 46, 'sif', '1h0ywxd'),
  ('sif', 47, 'sif', '0hqk7j7'),
  ('sif', 48, 'sif', '06se0uq'),
  ('sif', 49, 'sif', '0am6fwv'),
  ('sif', 50, 'sif', '1yk3rnl'),
  ('sif', 51, 'sif', '0tw7gvl'),
  ('sif', 52, 'sif', '0jajj2c'),
  ('sif', 53, 'sif', '14r2c6e'),
  ('sif', 54, 'sif', '18mxd6l'),
  ('sif', 55, 'sif', '0eu3wwz'),
  ('sif', 56, 'sif', '1ct13x7'),
  ('sif', 57, 'sif', '0771e8q'),
  ('sif', 58, 'sif', '057ohyt'),
  ('sif', 59, 'sif', '07r5j2j'),
  ('ii', 0, 'clim-temario', '0whabs5'),
  ('ii', 1, 'clim-temario', '01zj20w'),
  ('ii', 2, 'clim-temario', '1tm45ia'),
  ('ii', 3, 'clim-temario', '1byiv2n'),
  ('ii', 4, 'clim-temario', '0ok80fc'),
  ('ii', 5, 'clim-temario', '0ctkmw7'),
  ('ii', 6, 'clim-temario', '0axjmgf'),
  ('ii', 7, 'clim-temario', '0e8ikdl'),
  ('ii', 8, 'clim-temario', '0w720tc'),
  ('ii', 9, 'clim-temario', '0exdbav'),
  ('ii', 10, 'clim-temario', '0xywz7h'),
  ('ii', 11, 'clim-temario', '1o54q5x'),
  ('ii', 12, 'clim-temario', '1yd4b0t'),
  ('ii', 13, 'clim-temario', '0p58ado'),
  ('ii', 14, 'clim-temario', '1pyjrxc'),
  ('ii', 15, 'clim-temario', '1gwui9j'),
  ('ii', 16, 'clim-temario', '1ac1b1n'),
  ('ii', 17, 'clim-temario', '12t15eb'),
  ('ii', 18, 'clim-temario', '16yf4yl'),
  ('ii', 19, 'clim-temario', '0tliowa'),
  ('ii', 20, 'clim-temario', '0mizcno'),
  ('ii', 21, 'clim-temario', '0msonym'),
  ('ii', 22, 'clim-temario', '1554p4c'),
  ('ii', 23, 'clim-temario', '1b5na6v'),
  ('ii', 24, 'clim-temario', '1lmk1sw'),
  ('ii', 25, 'clim-temario', '0i8jwfh'),
  ('ii', 26, 'clim-temario', '0hekm4z'),
  ('ii', 27, 'clim-temario', '0d98gb7'),
  ('ii', 28, 'clim-temario', '0966qp6'),
  ('ii', 29, 'clim-temario', '1grn06k'),
  ('ii', 30, 'clim-temario', '1yscklx'),
  ('ii', 31, 'clim-temario', '11bar0g'),
  ('ii', 32, 'clim-temario', '13ptmxb'),
  ('ii', 33, 'clim-temario', '1m90twy'),
  ('ii', 34, 'clim-temario', '0s1pvz7'),
  ('ii', 35, 'clim-temario', '0wf666p'),
  ('ii', 36, 'clim-temario', '0eefmvy'),
  ('ii', 37, 'clim-temario', '1ca3bda'),
  ('ii', 38, 'clim-temario', '1b8qzb1'),
  ('ii', 39, 'clim-temario', '0gmufta'),
  ('ii', 40, 'clim-temario', '0uiay8r'),
  ('ii', 41, 'clim-temario', '138a51j'),
  ('ii', 42, 'clim-temario', '1vxblmn'),
  ('ii', 43, 'clim-temario', '1lwlknv'),
  ('ii', 44, 'clim-temario', '12f4rby'),
  ('ii', 45, 'clim-temario', '0ug68bp'),
  ('ii', 46, 'clim-temario', '0rcwb1a'),
  ('ii', 47, 'clim-temario', '0j9gm8p'),
  ('ii', 48, 'clim-temario', '0i7dubp'),
  ('ii', 49, 'clim-temario', '09gyzw9'),
  ('ii', 50, 'clim-temario', '121f5mv'),
  ('ii', 51, 'clim-temario', '1atqwwg'),
  ('ii', 52, 'clim-temario', '1avxev7'),
  ('ii', 53, 'clim-temario', '1gcp8lz'),
  ('ii', 54, 'clim-temario', '1n2691f'),
  ('ii', 55, 'clim-temario', '18h0qeu'),
  ('ii', 56, 'clim-temario', '1wywkaf'),
  ('ii', 57, 'clim-temario', '0vimt58'),
  ('ii', 58, 'clim-temario', '04m3ku6'),
  ('ii', 59, 'clim-temario', '1pj7sp1'),
  ('ii', 60, 'clim-temario', '16sbnzp'),
  ('ii', 61, 'clim-temario', '0fitl11'),
  ('ii', 62, 'clim-temario', '0ngoans'),
  ('ii', 63, 'clim-temario', '17zchum'),
  ('ii', 64, 'clim-temario', '0bt2pjv'),
  ('ii', 64, 'clim-verif', '0bt2pjv'),
  ('ii', 65, 'clim-verif', '1wpwio5'),
  ('ii', 66, 'clim-verif', '14nem8u'),
  ('ii', 67, 'clim-temario', '1u9xa12'),
  ('ii', 67, 'clim-verif', '1u9xa12'),
  ('ii', 68, 'clim-verif', '1gioutl'),
  ('ii', 69, 'clim-verif', '1mww5kc'),
  ('ii', 70, 'clim-temario', '0nzi4h8'),
  ('ii', 70, 'clim-verif', '0nzi4h8'),
  ('ii', 71, 'clim-verif', '0eaxwiv'),
  ('ii', 72, 'clim-verif', '09b19yb'),
  ('ii', 73, 'clim-temario', '1eljq9x'),
  ('ii', 73, 'clim-verif', '1eljq9x'),
  ('ii', 74, 'clim-verif', '13t4j2w'),
  ('ii', 75, 'clim-verif', '1160tav'),
  ('ii', 76, 'clim-temario', '0up420r'),
  ('ii', 76, 'clim-verif', '0up420r'),
  ('ii', 77, 'clim-verif', '0xt90mk'),
  ('ii', 78, 'clim-verif', '0b2vosw'),
  ('ii', 79, 'clim-temario', '13ydljv'),
  ('ii', 79, 'clim-verif', '13ydljv'),
  ('ii', 80, 'clim-verif', '1rqinny'),
  ('ii', 81, 'clim-verif', '05e2y0c'),
  ('ii', 82, 'clim-temario', '0nhsive'),
  ('ii', 82, 'clim-verif', '0nhsive'),
  ('ii', 83, 'clim-verif', '0c2jpcr'),
  ('ii', 84, 'clim-verif', '1ady7op'),
  ('ii', 85, 'clim-temario', '1xkolon'),
  ('ii', 85, 'clim-verif', '1xkolon'),
  ('ii', 86, 'clim-verif', '14xjxto'),
  ('ii', 87, 'clim-verif', '19dm2q1'),
  ('ii', 88, 'clim-temario', '1lir41d'),
  ('ii', 88, 'clim-verif', '1lir41d'),
  ('ii', 89, 'clim-verif', '03g32ex'),
  ('ii', 90, 'clim-verif', '08io645'),
  ('ii', 91, 'clim-temario', '0zhf9tg'),
  ('ii', 91, 'clim-verif', '0zhf9tg'),
  ('ii', 92, 'clim-verif', '1deoj46'),
  ('ii', 93, 'clim-verif', '1ljz0k4'),
  ('ii', 94, 'clim-temario', '0otj0wl'),
  ('ii', 94, 'clim-verif', '0otj0wl'),
  ('ii', 95, 'clim-verif', '1dbj1wq'),
  ('ii', 96, 'clim-verif', '0f35el0'),
  ('ii', 97, 'clim-temario', '01ajd3n'),
  ('ii', 97, 'clim-verif', '01ajd3n'),
  ('ii', 98, 'clim-verif', '0ntkpqb'),
  ('ii', 99, 'clim-verif', '1ftzio6'),
  ('ii', 100, 'clim-temario', '0wikeh5'),
  ('ii', 100, 'clim-verif', '0wikeh5'),
  ('ii', 101, 'clim-verif', '0s5cafo'),
  ('ii', 102, 'clim-verif', '0r2zzbk'),
  ('ii', 103, 'clim-temario', '0v5jogs'),
  ('ii', 103, 'clim-verif', '0v5jogs'),
  ('ii', 104, 'clim-verif', '0e6v7az'),
  ('ii', 105, 'clim-verif', '1ffh7f6'),
  ('ii-pci', 0, 'pci-temario', '0e1teyd'),
  ('ii-pci', 1, 'pci-temario', '0wbjcw9'),
  ('ii-pci', 2, 'pci-temario', '0omy0ji'),
  ('ii-pci', 3, 'pci-temario', '04v9x8y'),
  ('ii-pci', 4, 'pci-temario', '1rrn8ad'),
  ('ii-pci', 5, 'pci-temario', '1w69o2g'),
  ('ii-pci', 6, 'pci-temario', '1du8ak9'),
  ('ii-pci', 7, 'pci-temario', '087dii4'),
  ('ii-pci', 8, 'pci-temario', '1rkwymy'),
  ('ii-pci', 9, 'pci-temario', '0ijxqqx'),
  ('ii-pci', 10, 'pci-temario', '1ahatj5'),
  ('ii-pci', 11, 'pci-temario', '0k3d0zg'),
  ('ii-pci', 12, 'pci-temario', '0a22a2q'),
  ('ii-pci', 13, 'pci-temario', '1ry3xrw'),
  ('ii-pci', 14, 'pci-temario', '09rz21s'),
  ('ii-pci', 15, 'pci-temario', '1m5stcr'),
  ('ii-pci', 16, 'pci-temario', '0q9k923'),
  ('ii-pci', 17, 'pci-temario', '0xwop1o'),
  ('ii-pci', 18, 'pci-temario', '17k3a1c'),
  ('ii-pci', 19, 'pci-temario', '16f6rn1'),
  ('ii-pci', 20, 'pci-temario', '0woavh6'),
  ('ii-pci', 21, 'pci-temario', '0im6mmr'),
  ('ii-pci', 22, 'pci-temario', '0l0kzid'),
  ('ii-pci', 23, 'pci-temario', '0ya2dim'),
  ('ii-pci', 24, 'pci-temario', '0diulkk'),
  ('ii-pci', 25, 'pci-temario', '093hgk2'),
  ('ii-pci', 26, 'pci-temario', '0u0xm98'),
  ('ii-pci', 27, 'pci-temario', '0iyge5g'),
  ('ii-pci', 28, 'pci-temario', '0ipkoqy'),
  ('ii-pci', 29, 'pci-temario', '0ke7p0x'),
  ('ii-pci', 30, 'pci-temario', '1dn8jc3'),
  ('ii-pci', 31, 'pci-temario', '16xw1v0'),
  ('ii-pci', 32, 'pci-temario', '1buf66x'),
  ('ii-pci', 33, 'pci-temario', '01qx2as'),
  ('ii-pci', 34, 'pci-temario', '0etv4pg'),
  ('ii-pci', 35, 'pci-temario', '10ba981'),
  ('ii-pci', 36, 'pci-temario', '1726k9j'),
  ('ii-pci', 37, 'pci-temario', '1arupqf'),
  ('ii-pci', 38, 'pci-temario', '1nn22wo'),
  ('ii-pci', 39, 'pci-temario', '1rbz6h3'),
  ('ii-pci', 40, 'pci-temario', '1hdckrj'),
  ('ii-pci', 41, 'pci-temario', '00l8qiv'),
  ('ii-pci', 42, 'pci-temario', '0zl1b4k'),
  ('ii-pci', 43, 'pci-temario', '089sos1'),
  ('ii-pci', 44, 'pci-temario', '1j3rpq2'),
  ('ii-pci', 45, 'pci-temario', '1gbg43e'),
  ('ii-pci', 46, 'pci-temario', '1rlyyqt'),
  ('ii-pci', 47, 'pci-temario', '12zp5tb'),
  ('ii-pci', 48, 'pci-temario', '1ez9r12'),
  ('ii-pci', 49, 'pci-temario', '1suifqa'),
  ('ii-pci', 50, 'pci-temario', '0guhexq'),
  ('ii-pci', 51, 'pci-temario', '1015lak'),
  ('ii-pci', 52, 'pci-temario', '1rlwoi9'),
  ('ii-pci', 53, 'pci-temario', '0di39ti'),
  ('ii-pci', 54, 'pci-temario', '0u4uzgu'),
  ('ii-pci', 55, 'pci-temario', '1feua8g'),
  ('ii-pci', 56, 'pci-temario', '1buf696'),
  ('ii-pci', 57, 'pci-temario', '1o63bck'),
  ('ii-pci', 58, 'pci-temario', '11dto0t'),
  ('ii-pci', 59, 'pci-temario', '12g0pa8'),
  ('ii-pci', 60, 'pci-temario', '0xlm1z4'),
  ('ii-pci', 61, 'pci-temario', '02sk8so'),
  ('ii-pci', 62, 'pci-temario', '1jiztgf'),
  ('ii-pci', 63, 'pci-temario', '0gv97ib'),
  ('ii-pci', 64, 'pci-temario', '0vh57fo'),
  ('ii-pci', 65, 'pci-temario', '126rcyh'),
  ('ii-pci', 66, 'pci-temario', '0aedihr'),
  ('ii-pci', 67, 'pci-temario', '0r90h9x'),
  ('ii-pci', 68, 'pci-temario', '0ug9rqn'),
  ('ii-pci', 69, 'pci-temario', '035qxuq'),
  ('ii-pci', 70, 'pci-temario', '1tg9i9a'),
  ('ii-pci', 71, 'pci-temario', '101ecmp'),
  ('ii-pci', 72, 'pci-temario', '1wdnf6u'),
  ('ii-pci', 73, 'pci-temario', '040b80j'),
  ('ii-pci', 74, 'pci-temario', '117bzne'),
  ('ii-pci', 75, 'pci-temario', '18zwynk'),
  ('ii-pci', 76, 'pci-temario', '030kzar'),
  ('ii-pci', 77, 'pci-temario', '1wocvyc'),
  ('ii-pci', 78, 'pci-temario', '1jynvqa'),
  ('ii-pci', 78, 'pci-verif', '1jynvqa'),
  ('ii-pci', 79, 'pci-verif', '0s2g63h'),
  ('ii-pci', 80, 'pci-verif', '1y1bvn7'),
  ('ii-pci', 81, 'pci-temario', '0bpuem0'),
  ('ii-pci', 81, 'pci-verif', '0bpuem0'),
  ('ii-pci', 82, 'pci-verif', '1yzs08q'),
  ('ii-pci', 83, 'pci-verif', '1o05ubw'),
  ('ii-pci', 84, 'pci-temario', '0dggzsc'),
  ('ii-pci', 84, 'pci-verif', '0dggzsc'),
  ('ii-pci', 85, 'pci-verif', '1y0anak'),
  ('ii-pci', 86, 'pci-verif', '14ffob8'),
  ('ii-pci', 87, 'pci-temario', '1wyih9r'),
  ('ii-pci', 87, 'pci-verif', '1wyih9r'),
  ('ii-pci', 88, 'pci-verif', '1vdh4xl'),
  ('ii-pci', 89, 'pci-verif', '12dpxin'),
  ('ii-pci', 90, 'pci-temario', '1lhco8t'),
  ('ii-pci', 90, 'pci-verif', '1lhco8t'),
  ('ii-pci', 91, 'pci-verif', '03y0bh5'),
  ('ii-pci', 92, 'pci-verif', '0830qs2'),
  ('ii-pci', 93, 'pci-temario', '1xuj20x'),
  ('ii-pci', 93, 'pci-verif', '1xuj20x'),
  ('ii-pci', 94, 'pci-verif', '1trjnk0'),
  ('ii-pci', 95, 'pci-verif', '12vo5tq'),
  ('ii-pci', 96, 'pci-temario', '0lo6xtz'),
  ('ii-pci', 96, 'pci-verif', '0lo6xtz'),
  ('ii-pci', 97, 'pci-verif', '0votxly'),
  ('ii-pci', 98, 'pci-verif', '0h4u1hn'),
  ('ii-pci', 99, 'pci-temario', '0bipfu2'),
  ('ii-pci', 99, 'pci-verif', '0bipfu2'),
  ('ii-pci', 100, 'pci-verif', '1ru6bl4'),
  ('ii-pci', 101, 'pci-verif', '0xubxey'),
  ('ii-pci', 102, 'pci-temario', '0plfsad'),
  ('ii-pci', 102, 'pci-verif', '0plfsad'),
  ('ii-pci', 103, 'pci-verif', '1nrvlrj'),
  ('ii-pci', 104, 'pci-verif', '1w85cy2'),
  ('ii-pci', 105, 'pci-temario', '1g2fdpy'),
  ('ii-pci', 105, 'pci-verif', '1g2fdpy')
on conflict do nothing;

-- Respuestas nuevas: subject_id = test, q_id = id estable (q_index queda para las antiguas)
alter table public.answer_events add column if not exists q_id text;
alter table public.answer_events alter column q_index drop not null;
do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'answer_events_q_check') then
    alter table public.answer_events add constraint answer_events_q_check
      check ((q_index is not null or q_id is not null) and (q_id is null or q_id ~ '^[0-9a-z]{1,12}$'));
  end if;
end $$;
create index if not exists answer_events_user_subject_idx on public.answer_events (user_id, subject_id);

create or replace function public.upsert_progress(p_user uuid, p_test text, p_q text, p_correct boolean, p_at timestamptz)
returns void language sql security definer set search_path = ''
as $$
  insert into public.question_progress as s (user_id, test_id, q_id, n, n_correct, last_correct, last_at)
  values (p_user, p_test, p_q, 1, p_correct::int, p_correct, p_at)
  on conflict (user_id, test_id, q_id) do update set
    n            = s.n + 1,
    n_correct    = s.n_correct + excluded.n_correct,
    last_correct = case when excluded.last_at >= s.last_at then excluded.last_correct else s.last_correct end,
    last_at      = greatest(s.last_at, excluded.last_at),
    updated_at   = now();
$$;

-- Cada respuesta actualiza el progreso. Las de la versión anterior (q_index) se traducen con la tabla de correspondencia.
create or replace function public.answer_events_after()
returns trigger language plpgsql security definer set search_path = ''
as $$
declare m record;
begin
  if new.q_id is not null then
    perform public.upsert_progress(new.user_id, new.subject_id, new.q_id, new.correct, new.answered_at);
    return new;
  end if;
  -- versión anterior de la app
  insert into public.question_stats as s (user_id, subject_id, q_index, n, n_correct, last_correct, last_at)
  values (new.user_id, new.subject_id, new.q_index, 1, new.correct::int, new.correct, new.answered_at)
  on conflict (user_id, subject_id, q_index) do update set
    n            = s.n + 1,
    n_correct    = s.n_correct + excluded.n_correct,
    last_correct = case when excluded.last_at >= s.last_at then excluded.last_correct else s.last_correct end,
    last_at      = greatest(s.last_at, excluded.last_at),
    updated_at   = now();
  for m in select test_id, q_id from public.legacy_question_map
            where old_subject = new.subject_id and old_index = new.q_index loop
    perform public.upsert_progress(new.user_id, m.test_id, m.q_id, new.correct, new.answered_at);
  end loop;
  return new;
end $$;

-- Copia única del progreso antiguo (question_stats) al nuevo (question_progress)
do $$ begin
  if not exists (select 1 from public.app_migrations where name = '2026-10-10 progreso por id') then
    insert into public.question_progress as s (user_id, test_id, q_id, n, n_correct, last_correct, last_at)
    select qs.user_id, m.test_id, m.q_id, qs.n, qs.n_correct, qs.last_correct, qs.last_at
      from public.question_stats qs
      join public.legacy_question_map m on m.old_subject = qs.subject_id and m.old_index = qs.q_index
    on conflict (user_id, test_id, q_id) do update set
      n            = s.n + excluded.n,
      n_correct    = s.n_correct + excluded.n_correct,
      last_correct = case when excluded.last_at >= s.last_at then excluded.last_correct else s.last_correct end,
      last_at      = greatest(s.last_at, excluded.last_at);
    insert into public.app_migrations (name) values ('2026-10-10 progreso por id');
  end if;
end $$;

-- Progreso local que se sube al entrar por primera vez en un dispositivo.
-- p_stats: { "clim-temario": { "1a2b3c4": { "n": 3, "ok": 2, "last": 1 }, … }, … }
create or replace function public.import_progress(p_import_id uuid, p_stats jsonb)
returns int language plpgsql security definer set search_path = ''
as $$
declare
  tid text; t jsonb; q text; r jsonb; cnt int := 0;
  vn int; vok int; vlast boolean;
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  insert into public.stat_imports (user_id, import_id) values (auth.uid(), p_import_id)
  on conflict do nothing;
  if not found then return 0; end if;          -- ya importado (reintento)
  if jsonb_typeof(p_stats) <> 'object' then return 0; end if;
  for tid, t in select * from jsonb_each(p_stats) loop
    continue when char_length(tid) not between 1 and 60 or jsonb_typeof(t) <> 'object';
    for q, r in select * from jsonb_each(t) loop
      continue when q !~ '^[0-9a-z]{1,12}$' or jsonb_typeof(r) <> 'object';
      vn := least(greatest(coalesce((r ->> 'n')::int, 0), 0), 100000);
      vok := least(greatest(coalesce((r ->> 'ok')::int, 0), 0), vn);
      vlast := coalesce((r ->> 'last')::int, 0) = 1;
      continue when vn = 0;
      insert into public.question_progress as s (user_id, test_id, q_id, n, n_correct, last_correct, last_at)
      values (auth.uid(), tid, q, vn, vok, vlast, '-infinity')
      on conflict (user_id, test_id, q_id) do update set
        n = s.n + excluded.n, n_correct = s.n_correct + excluded.n_correct, updated_at = now();
      cnt := cnt + 1;
    end loop;
  end loop;
  return cnt;
end $$;

-- La importación de la versión anterior también alimenta el progreso nuevo
create or replace function public.import_local_stats(p_import_id uuid, p_stats jsonb)
returns int language plpgsql security definer set search_path = ''
as $$
declare
  sid text; subj jsonb; qi text; r jsonb; cnt int := 0; m record;
  vn int; vok int; vlast boolean;
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  insert into public.stat_imports (user_id, import_id) values (auth.uid(), p_import_id)
  on conflict do nothing;
  if not found then return 0; end if;
  if jsonb_typeof(p_stats) <> 'object' then return 0; end if;
  for sid, subj in select * from jsonb_each(p_stats) loop
    continue when char_length(sid) not between 1 and 60 or jsonb_typeof(subj) <> 'object';
    for qi, r in select * from jsonb_each(subj) loop
      continue when qi !~ '^\d{1,4}$' or jsonb_typeof(r) <> 'object';
      vn := least(greatest(coalesce((r ->> 'n')::int, 0), 0), 100000);
      vok := least(greatest(coalesce((r ->> 'ok')::int, 0), 0), vn);
      vlast := coalesce((r ->> 'last')::int, 0) = 1;
      continue when vn = 0;
      insert into public.question_stats as s (user_id, subject_id, q_index, n, n_correct, last_correct, last_at)
      values (auth.uid(), sid, qi::int, vn, vok, vlast, '-infinity')
      on conflict (user_id, subject_id, q_index) do update set
        n = s.n + excluded.n, n_correct = s.n_correct + excluded.n_correct, updated_at = now();
      for m in select test_id, q_id from public.legacy_question_map where old_subject = sid and old_index = qi::int loop
        insert into public.question_progress as s (user_id, test_id, q_id, n, n_correct, last_correct, last_at)
        values (auth.uid(), m.test_id, m.q_id, vn, vok, vlast, '-infinity')
        on conflict (user_id, test_id, q_id) do update set
          n = s.n + excluded.n, n_correct = s.n_correct + excluded.n_correct, updated_at = now();
      end loop;
      cnt := cnt + 1;
    end loop;
  end loop;
  return cnt;
end $$;

-- «Borrar mi progreso» de un test
create or replace function public.reset_progress(p_test text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  delete from public.question_progress where user_id = auth.uid() and test_id = p_test;
end $$;


-- ---------------------------------------------------------------------
-- 4. Ranking por asignatura (Sistemas Integrados de Fabricación e Instalaciones Industriales)
-- ---------------------------------------------------------------------
-- Exámenes: media de los 5 últimos que cuentan en la asignatura (incluido el examen real) y total
create or replace view public.ranking_exams_v2 as
select t.user_id, p.display_name, t.asignatura_id,
       round(avg(t.grade) filter (where t.rn <= 5), 2) as avg_last5,
       count(*)::int as n_exams
from (
  select user_id, asignatura_id, grade,
         row_number() over (partition by user_id, asignatura_id order by taken_at desc, id desc) as rn
  from public.exam_results
  where ranked and asignatura_id is not null
) t
join public.profiles p on p.id = t.user_id
where public.is_member()
group by t.user_id, p.display_name, t.asignatura_id;

-- Dominio: preguntas distintas de la asignatura cuya última respuesta (en cualquier test) fue correcta
create or replace view public.ranking_mastery_v2 as
select x.user_id, p.display_name, x.asignatura_id,
       count(*) filter (where x.last_correct)::int as mastered
from (
  select distinct on (q.user_id, b.asignatura_id, q.q_id)
         q.user_id, b.asignatura_id, q.q_id, q.last_correct
  from public.question_progress q
  join public.boards b on b.id = q.test_id and b.preset_id is null
  where b.asignatura_id is not null
  order by q.user_id, b.asignatura_id, q.q_id, q.last_at desc
) x
join public.profiles p on p.id = x.user_id
where public.is_member()
group by x.user_id, p.display_name, x.asignatura_id;

-- Esta semana: preguntas respondidas desde el lunes a las 00:00 (hora de Madrid)
create or replace view public.ranking_week_v2 as
select e.user_id, p.display_name, b.asignatura_id, count(*)::int as answered
from public.answer_events e
join public.boards b on b.id = e.subject_id and b.preset_id is null
join public.profiles p on p.id = e.user_id
where public.is_member() and e.answered_at >= public.week_start() and b.asignatura_id is not null
group by e.user_id, p.display_name, b.asignatura_id;

create or replace function public.ranking_data_v2()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  return jsonb_build_object(
    'me', auth.uid(),
    'at', now(),
    'week_start', public.week_start(),
    'members', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'name', display_name)) from public.profiles), '[]'),
    'exams',   coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 'a', asignatura_id, 'avg', avg_last5, 'n', n_exams)) from public.ranking_exams_v2), '[]'),
    'mastery', coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 'a', asignatura_id, 'm', mastered)) from public.ranking_mastery_v2), '[]'),
    'week',    coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 'a', asignatura_id, 'c', answered)) from public.ranking_week_v2), '[]'),
    'mine',    coalesce((select jsonb_agg(jsonb_build_object('a', asignatura_id, 'c', client_id, 'g', grade, 't', taken_at) order by taken_at desc)
                         from (select asignatura_id, client_id, grade, taken_at,
                                      row_number() over (partition by asignatura_id order by taken_at desc, id desc) as rn
                               from public.exam_results
                               where ranked and user_id = auth.uid() and asignatura_id is not null) m
                         where rn <= 6), '[]')
  );
end $$;


-- ---------------------------------------------------------------------
-- 5. Permisos y RLS endurecido: nada se puede leer sin estar autenticado
-- ---------------------------------------------------------------------
do $$
declare r record;
begin
  -- RLS activado en todas las tablas
  for r in select c.relname from pg_class c join pg_namespace n on n.oid = c.relnamespace
            where n.nspname = 'public' and c.relkind in ('r', 'p') loop
    execute format('alter table public.%I enable row level security', r.relname);
  end loop;
  -- Ni tablas, ni vistas, ni secuencias para el rol anónimo
  for r in select c.relname, c.relkind from pg_class c join pg_namespace n on n.oid = c.relnamespace
            where n.nspname = 'public' and c.relkind in ('r', 'p', 'v', 'm', 'S') loop
    if r.relkind = 'S' then
      execute format('revoke all on sequence public.%I from anon', r.relname);
    else
      execute format('revoke all on public.%I from anon', r.relname);
    end if;
  end loop;
end $$;

-- Vistas del ranking: solo usuarios autenticados del grupo
grant select on public.ranking_exams_v2, public.ranking_mastery_v2, public.ranking_week_v2 to authenticated;

-- Funciones: el anónimo solo puede comprobar el código y el nombre antes de registrarse
revoke execute on function public.import_progress(uuid, jsonb), public.reset_progress(text),
                           public.ranking_data_v2(), public.register_boards(jsonb),
                           public.import_local_stats(uuid, jsonb)
  from public, anon;
grant  execute on function public.import_progress(uuid, jsonb), public.reset_progress(text),
                           public.ranking_data_v2(), public.register_boards(jsonb),
                           public.import_local_stats(uuid, jsonb)
  to authenticated;
revoke execute on function public.upsert_progress(uuid, text, text, boolean, timestamptz),
                           public.validate_exam_result(), public.answer_events_after()
  from public, anon, authenticated;

insert into public.app_migrations (name) values ('2026-10-10 ranking por asignatura')
on conflict (name) do nothing;
