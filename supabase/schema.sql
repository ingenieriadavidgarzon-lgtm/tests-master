-- =====================================================================
-- Tests del Máster · esquema de Supabase
-- Pega TODO este archivo en Supabase → SQL Editor → New query → Run.
-- Se puede ejecutar varias veces: no borra datos y deja todo al día.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Configuración: código de grupo
-- ---------------------------------------------------------------------
-- Para cambiar el código más adelante (los que ya tienen cuenta siguen dentro):
--   update public.app_config set value = 'NUEVO-CODIGO' where key = 'group_code';

create table if not exists public.app_config (
  key   text primary key,
  value text not null
);
alter table public.app_config enable row level security;   -- sin políticas: nadie la lee desde la app
revoke all on public.app_config from anon, authenticated;

insert into public.app_config (key, value)
values ('group_code', 'CAMBIA-ESTE-CODIGO')
on conflict (key) do nothing;


-- ---------------------------------------------------------------------
-- 2. Perfiles (nombre visible). El email nunca sale de auth.users.
-- ---------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text not null,
  created_at   timestamptz not null default now(),
  constraint profiles_name_len check (char_length(display_name) between 3 and 20),
  constraint profiles_name_clean check (display_name = btrim(display_name) and display_name !~ '[[:cntrl:]]')
);
create unique index if not exists profiles_display_name_key on public.profiles (lower(display_name));

alter table public.profiles enable row level security;
revoke all on public.profiles from anon;
revoke insert, update, delete on public.profiles from authenticated;   -- se crean y renombran con funciones


-- Nombre visible normalizado: sin espacios sobrantes
create or replace function public.normalize_name(p text)
returns text language sql immutable
as $$ select nullif(regexp_replace(btrim(coalesce(p, '')), '\s+', ' ', 'g'), '') $$;

-- ¿El usuario actual tiene perfil, es decir, es del grupo?
create or replace function public.is_member()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.profiles where id = auth.uid()) $$;

-- Comprobación previa al registro, para dar errores claros en la app:
-- devuelve 'ok', 'bad_code', 'bad_name' o 'name_taken'.
create or replace function public.signup_check(p_code text, p_name text)
returns text language plpgsql stable security definer set search_path = ''
as $$
declare
  n text := public.normalize_name(p_name);
begin
  if p_code is null or upper(btrim(p_code)) <> upper(btrim((select value from public.app_config where key = 'group_code'))) then
    return 'bad_code';
  end if;
  if n is null or char_length(n) not between 3 and 20 or n ~ '[[:cntrl:]]' then
    return 'bad_name';
  end if;
  if exists (select 1 from public.profiles where lower(display_name) = lower(n)) then
    return 'name_taken';
  end if;
  return 'ok';
end $$;

-- Crear el perfil tras registrarse: valida el código de grupo en el servidor.
-- Una cuenta sin perfil no puede leer ni escribir nada (todas las políticas exigen is_member()).
create or replace function public.create_profile(p_code text, p_name text)
returns text language plpgsql security definer set search_path = ''
as $$
declare
  r text;
  n text := public.normalize_name(p_name);
  cur text;
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  select display_name into cur from public.profiles where id = auth.uid();
  if cur is not null then return cur; end if;          -- ya creado (reintento)
  r := public.signup_check(p_code, p_name);
  if r = 'bad_code'   then raise exception 'bad_code'   using errcode = '22023'; end if;
  if r = 'bad_name'   then raise exception 'bad_name'   using errcode = '22023'; end if;
  if r = 'name_taken' then raise exception 'name_taken' using errcode = '23505'; end if;
  insert into public.profiles (id, display_name) values (auth.uid(), n);
  return n;
exception when unique_violation then
  raise exception 'name_taken' using errcode = '23505';
end $$;

-- Cambiar el nombre visible
create or replace function public.set_display_name(p_name text)
returns text language plpgsql security definer set search_path = ''
as $$
declare
  n text := public.normalize_name(p_name);
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  if n is null or char_length(n) not between 3 and 20 or n ~ '[[:cntrl:]]' then
    raise exception 'bad_name' using errcode = '22023';
  end if;
  if exists (select 1 from public.profiles where lower(display_name) = lower(n) and id <> auth.uid()) then
    raise exception 'name_taken' using errcode = '23505';
  end if;
  update public.profiles set display_name = n where id = auth.uid();
  return n;
exception when unique_violation then
  raise exception 'name_taken' using errcode = '23505';
end $$;

drop policy if exists "profiles: lectura del grupo" on public.profiles;
create policy "profiles: lectura del grupo" on public.profiles
  for select to authenticated using (public.is_member());


-- ---------------------------------------------------------------------
-- 3. Clasificaciones (boards): una por asignatura o tema, y una por cada examen real.
--    Guardan la penalización por defecto, que decide si un examen cuenta.
--    La app registra sola las asignaturas nuevas (register_boards); la primera
--    vez que se registra una, sus valores quedan fijos.
-- ---------------------------------------------------------------------
create table if not exists public.boards (
  id            text primary key,           -- 'sif', 'ii-pci', 'ii-pci:real-2026'
  subject_id    text not null,
  preset_id     text,
  penalty       numeric not null,
  min_questions int not null,
  created_at    timestamptz not null default now()
);
alter table public.boards enable row level security;
revoke insert, update, delete on public.boards from anon, authenticated;
drop policy if exists "boards: lectura del grupo" on public.boards;
create policy "boards: lectura del grupo" on public.boards
  for select to authenticated using (public.is_member());

insert into public.boards (id, subject_id, preset_id, penalty, min_questions) values
  ('sif',              'sif',    null,        0,   20),
  ('ii',               'ii',     null,        0,   20),
  ('ii-pci',           'ii-pci', null,        0.5, 20),
  ('ii-pci:real-2026', 'ii-pci', 'real-2026', 0.5, 20)
on conflict (id) do nothing;

create or replace function public.valid_penalty(p numeric)
returns boolean language sql immutable
as $$ select p is not null and (abs(p) < 1e-6 or abs(p - 0.5) < 1e-6 or abs(p - 1.0/3) < 1e-6 or abs(p - 0.25) < 1e-6) $$;

-- p: [{ "subject_id": "mec", "preset_id": null, "penalty": 0, "min_questions": 20 }, …]
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
    insert into public.boards (id, subject_id, preset_id, penalty, min_questions)
    values (
      (b ->> 'subject_id') || coalesce(':' || nullif(b ->> 'preset_id', ''), ''),
      b ->> 'subject_id', nullif(b ->> 'preset_id', ''),
      (b ->> 'penalty')::numeric, (b ->> 'min_questions')::int)
    on conflict (id) do nothing;
  end loop;
end $$;


-- ---------------------------------------------------------------------
-- 4. Resultados de examen
-- ---------------------------------------------------------------------
create table if not exists public.exam_results (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  client_id   uuid not null,                -- id generado en el móvil: evita duplicados al reintentar
  subject_id  text not null,                -- asignatura o tema
  preset_id   text,                         -- examen real (null si es al azar)
  board_id    text,                         -- clasificación donde cuenta (lo pone el servidor)
  taken_at    timestamptz not null,         -- inicio del examen
  n_questions int not null,
  n_correct   int not null,
  n_wrong     int not null,
  n_blank     int not null,
  penalty     numeric not null,             -- 0, 1/2, 1/3 o 1/4
  duration_s  int not null,                 -- tiempo empleado
  grade       numeric(5,2) not null,        -- nota sobre 10
  ranked      boolean not null default false, -- cuenta para el ranking (lo decide el servidor)
  created_at  timestamptz not null default now(),
  unique (user_id, client_id)
);
create index if not exists exam_results_rank_idx on public.exam_results (board_id, user_id, taken_at desc) where ranked;

alter table public.exam_results enable row level security;
revoke all on public.exam_results from anon;
revoke update, delete on public.exam_results from authenticated;
drop policy if exists "exam_results: leer los míos" on public.exam_results;
create policy "exam_results: leer los míos" on public.exam_results
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "exam_results: escribir los míos" on public.exam_results;
create policy "exam_results: escribir los míos" on public.exam_results
  for insert to authenticated with check (user_id = auth.uid() and public.is_member());

-- Validación en el servidor: rechaza valores imposibles y decide si cuenta para el ranking.
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

  -- ¿Cuenta para el ranking? Al menos 20 preguntas (o el examen real completo) y la penalización por defecto.
  select * into b from public.boards
   where id = new.subject_id || coalesce(':' || nullif(new.preset_id, ''), '');
  new.board_id := b.id;
  new.ranked := b.id is not null
    and abs(new.penalty - b.penalty) < 1e-6
    and new.n_questions >= b.min_questions
    and (b.preset_id is null or new.n_questions = b.min_questions);
  new.created_at := now();
  return new;
end $$;

drop trigger if exists exam_results_validate on public.exam_results;
create trigger exam_results_validate before insert on public.exam_results
  for each row execute function public.validate_exam_result();


-- ---------------------------------------------------------------------
-- 5. Respuestas: un registro por pregunta respondida (para «Esta semana»)
--    y un resumen por pregunta (para «Dominio» y para sincronizar dispositivos)
-- ---------------------------------------------------------------------
create table if not exists public.answer_events (
  id          uuid primary key,             -- generado en el móvil: evita duplicados
  user_id     uuid not null default auth.uid() references public.profiles (id) on delete cascade,
  subject_id  text not null check (char_length(subject_id) between 1 and 60),
  q_index     int not null check (q_index between 0 and 9999),
  correct     boolean not null,
  answered_at timestamptz not null,
  created_at  timestamptz not null default now()
);
create index if not exists answer_events_week_idx on public.answer_events (answered_at, user_id, subject_id);

create table if not exists public.question_stats (
  user_id      uuid not null references public.profiles (id) on delete cascade,
  subject_id   text not null,
  q_index      int not null,
  n            int not null default 0,      -- veces respondida
  n_correct    int not null default 0,      -- veces acertada
  last_correct boolean not null,            -- última respuesta: dominada si es true
  last_at      timestamptz not null,
  updated_at   timestamptz not null default now(),
  primary key (user_id, subject_id, q_index)
);

alter table public.answer_events enable row level security;
alter table public.question_stats enable row level security;
revoke all on public.answer_events, public.question_stats from anon;
revoke update, delete on public.answer_events from authenticated;
revoke insert, update, delete on public.question_stats from authenticated;

drop policy if exists "answer_events: leer las mías" on public.answer_events;
create policy "answer_events: leer las mías" on public.answer_events
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "answer_events: escribir las mías" on public.answer_events;
create policy "answer_events: escribir las mías" on public.answer_events
  for insert to authenticated with check (user_id = auth.uid() and public.is_member());
drop policy if exists "question_stats: leer las mías" on public.question_stats;
create policy "question_stats: leer las mías" on public.question_stats
  for select to authenticated using (user_id = auth.uid());

-- Fechas imposibles se ajustan (no se rechazan, para no bloquear la cola del móvil)
create or replace function public.answer_events_before()
returns trigger language plpgsql set search_path = ''
as $$
begin
  new.answered_at := least(coalesce(new.answered_at, now()), now());
  new.created_at := now();
  return new;
end $$;

-- Cada respuesta nueva actualiza el resumen de esa pregunta
create or replace function public.answer_events_after()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  insert into public.question_stats as s (user_id, subject_id, q_index, n, n_correct, last_correct, last_at)
  values (new.user_id, new.subject_id, new.q_index, 1, new.correct::int, new.correct, new.answered_at)
  on conflict (user_id, subject_id, q_index) do update set
    n            = s.n + 1,
    n_correct    = s.n_correct + excluded.n_correct,
    last_correct = case when excluded.last_at >= s.last_at then excluded.last_correct else s.last_correct end,
    last_at      = greatest(s.last_at, excluded.last_at),
    updated_at   = now();
  return new;
end $$;

drop trigger if exists answer_events_before on public.answer_events;
create trigger answer_events_before before insert on public.answer_events
  for each row execute function public.answer_events_before();
drop trigger if exists answer_events_after on public.answer_events;
create trigger answer_events_after after insert on public.answer_events
  for each row execute function public.answer_events_after();

-- Primera vez que se inicia sesión en un dispositivo: se suma el progreso local a la cuenta.
-- p_stats: { "sif": { "12": { "n": 3, "ok": 2, "last": 1 }, … }, … }
create table if not exists public.stat_imports (
  user_id   uuid not null references public.profiles (id) on delete cascade,
  import_id uuid not null,
  at        timestamptz not null default now(),
  primary key (user_id, import_id)
);
alter table public.stat_imports enable row level security;
revoke all on public.stat_imports from anon, authenticated;

create or replace function public.import_local_stats(p_import_id uuid, p_stats jsonb)
returns int language plpgsql security definer set search_path = ''
as $$
declare
  sid text; subj jsonb; qi text; r jsonb; cnt int := 0;
  vn int; vok int; vlast boolean;
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  insert into public.stat_imports (user_id, import_id) values (auth.uid(), p_import_id)
  on conflict do nothing;
  if not found then return 0; end if;          -- ya importado (reintento)
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
      cnt := cnt + 1;
    end loop;
  end loop;
  return cnt;
end $$;

-- «Borrar mi progreso» de una asignatura o tema
create or replace function public.reset_subject_stats(p_subject text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  delete from public.question_stats where user_id = auth.uid() and subject_id = p_subject;
end $$;


-- ---------------------------------------------------------------------
-- 6. Vistas del ranking: solo nombre visible, nunca email.
--    Se pueden leer si eres del grupo (tienes perfil).
-- ---------------------------------------------------------------------
create or replace function public.week_start()
returns timestamptz language sql stable
as $$ select date_trunc('week', now() at time zone 'Europe/Madrid') at time zone 'Europe/Madrid' $$;

-- Exámenes: media de los 5 últimos que cuentan y total de exámenes que cuentan, por clasificación
create or replace view public.ranking_exams as
select t.user_id, p.display_name, t.board_id,
       split_part(t.board_id, ':', 1) as subject_id,
       round(avg(t.grade) filter (where t.rn <= 5), 2) as avg_last5,
       count(*)::int as n_exams
from (
  select user_id, board_id, grade,
         row_number() over (partition by user_id, board_id order by taken_at desc, id desc) as rn
  from public.exam_results
  where ranked
) t
join public.profiles p on p.id = t.user_id
where public.is_member()
group by t.user_id, p.display_name, t.board_id;

-- Dominio: preguntas cuya última respuesta fue correcta
create or replace view public.ranking_mastery as
select s.user_id, p.display_name, s.subject_id,
       count(*) filter (where s.last_correct)::int as mastered
from public.question_stats s
join public.profiles p on p.id = s.user_id
where public.is_member()
group by s.user_id, p.display_name, s.subject_id;

-- Esta semana: preguntas respondidas desde el lunes a las 00:00 (hora de Madrid)
create or replace view public.ranking_week as
select e.user_id, p.display_name, e.subject_id, count(*)::int as answered
from public.answer_events e
join public.profiles p on p.id = e.user_id
where public.is_member() and e.answered_at >= public.week_start()
group by e.user_id, p.display_name, e.subject_id;

revoke all on public.ranking_exams, public.ranking_mastery, public.ranking_week from anon;
grant select on public.ranking_exams, public.ranking_mastery, public.ranking_week to authenticated;

-- Todo lo que necesita la pantalla de ranking en una sola llamada
create or replace function public.ranking_data()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  return jsonb_build_object(
    'me', auth.uid(),
    'at', now(),
    'week_start', public.week_start(),
    'members', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'name', display_name)) from public.profiles), '[]'),
    'exams',   coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 'b', board_id, 's', subject_id, 'avg', avg_last5, 'n', n_exams)) from public.ranking_exams), '[]'),
    'mastery', coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 's', subject_id, 'm', mastered)) from public.ranking_mastery), '[]'),
    'week',    coalesce((select jsonb_agg(jsonb_build_object('u', user_id, 's', subject_id, 'a', answered)) from public.ranking_week), '[]'),
    'mine',    coalesce((select jsonb_agg(jsonb_build_object('b', board_id, 'c', client_id, 'g', grade) order by taken_at desc)
                         from (select board_id, client_id, grade, taken_at,
                                      row_number() over (partition by board_id order by taken_at desc, id desc) as rn
                               from public.exam_results where ranked and user_id = auth.uid()) m
                         where rn <= 6), '[]')
  );
end $$;


-- ---------------------------------------------------------------------
-- 7. Permisos de las funciones
-- ---------------------------------------------------------------------
revoke execute on function public.signup_check(text, text) from public;
grant  execute on function public.signup_check(text, text) to anon, authenticated;

revoke execute on function public.create_profile(text, text), public.set_display_name(text), public.register_boards(jsonb),
                           public.import_local_stats(uuid, jsonb), public.reset_subject_stats(text),
                           public.ranking_data() from public, anon;
grant  execute on function public.create_profile(text, text), public.set_display_name(text), public.register_boards(jsonb),
                           public.import_local_stats(uuid, jsonb), public.reset_subject_stats(text),
                           public.ranking_data() to authenticated;

revoke execute on function public.validate_exam_result(), public.answer_events_after()
  from public, anon, authenticated;
