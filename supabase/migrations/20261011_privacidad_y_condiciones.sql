-- =====================================================================
-- Migración 2026-10-11 · Privacidad (RGPD / LOPDGDD) y condiciones de uso
--
--  1. Consentimiento en el perfil: versión y fecha de aceptación de las
--     Condiciones de uso y del aviso de Privacidad.
--  2. Ranking voluntario (profiles.in_ranking). Quien no está en el
--     ranking, o aún no ha aceptado la Privacidad, no aparece para los
--     demás en ninguna vista ni función.
--  3. Última actividad (profiles.last_active_at).
--  4. Derechos desde la app: descargar mis datos y borrar mi cuenta.
--  5. Conservación: borrado automático de cuentas sin actividad en 12
--     meses (pg_cron, una vez al día) y función de cierre de la app.
--
-- Requisito: schema.sql y las migraciones anteriores.
-- Cuándo: pégala en Supabase → SQL Editor → New query → Run ANTES de
-- publicar la versión de la app que trae Privacidad y Condiciones.
-- Se puede ejecutar más de una vez.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Columnas nuevas del perfil
-- ---------------------------------------------------------------------
alter table public.profiles add column if not exists terms_version       text;
alter table public.profiles add column if not exists terms_accepted_at   timestamptz;
alter table public.profiles add column if not exists privacy_version     text;
alter table public.profiles add column if not exists privacy_accepted_at timestamptz;
alter table public.profiles add column if not exists in_ranking          boolean not null default true;
alter table public.profiles add column if not exists last_active_at      timestamptz not null default now();

do $$ begin
  if not exists (select 1 from pg_constraint where conname = 'profiles_legal_versions') then
    alter table public.profiles add constraint profiles_legal_versions
      check (coalesce(char_length(terms_version), 0) <= 20 and coalesce(char_length(privacy_version), 0) <= 20);
  end if;
end $$;

-- ¿Se puede mostrar a este usuario en el ranking a los demás?
-- Siempre te ves a ti mismo; a los demás, solo si siguen en el ranking y han aceptado la Privacidad.
create or replace function public.rank_visible(p_user uuid)
returns boolean language sql stable security definer set search_path = ''
as $$
  select p_user = auth.uid()
      or exists (select 1 from public.profiles
                  where id = p_user and in_ranking and privacy_accepted_at is not null)
$$;

-- Lectura de perfiles: el tuyo entero; de los demás, solo los que están en el ranking
drop policy if exists "profiles: lectura del grupo" on public.profiles;
create policy "profiles: lectura del grupo" on public.profiles
  for select to authenticated
  using (id = auth.uid() or (public.is_member() and in_ranking and privacy_accepted_at is not null));


-- ---------------------------------------------------------------------
-- 2. Ranking: fuera quien no está en el ranking (vistas nuevas y antiguas)
-- ---------------------------------------------------------------------
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
where public.is_member() and public.rank_visible(t.user_id)
group by t.user_id, p.display_name, t.asignatura_id;

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
where public.is_member() and public.rank_visible(x.user_id)
group by x.user_id, p.display_name, x.asignatura_id;

create or replace view public.ranking_week_v2 as
select e.user_id, p.display_name, b.asignatura_id, count(*)::int as answered
from public.answer_events e
join public.boards b on b.id = e.subject_id and b.preset_id is null
join public.profiles p on p.id = e.user_id
where public.is_member() and public.rank_visible(e.user_id)
  and e.answered_at >= public.week_start() and b.asignatura_id is not null
group by e.user_id, p.display_name, b.asignatura_id;

-- Vistas de la primera versión (por si queda alguna app sin actualizar)
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
where public.is_member() and public.rank_visible(t.user_id)
group by t.user_id, p.display_name, t.board_id;

create or replace view public.ranking_mastery as
select s.user_id, p.display_name, s.subject_id,
       count(*) filter (where s.last_correct)::int as mastered
from public.question_stats s
join public.profiles p on p.id = s.user_id
where public.is_member() and public.rank_visible(s.user_id)
group by s.user_id, p.display_name, s.subject_id;

create or replace view public.ranking_week as
select e.user_id, p.display_name, e.subject_id, count(*)::int as answered
from public.answer_events e
join public.profiles p on p.id = e.user_id
where public.is_member() and public.rank_visible(e.user_id) and e.answered_at >= public.week_start()
group by e.user_id, p.display_name, e.subject_id;

-- Todo lo de la pantalla de ranking: solo miembros visibles (y tú, con «visible» indicando si te ven los demás)
create or replace function public.ranking_data_v2()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  return jsonb_build_object(
    'me', auth.uid(),
    'at', now(),
    'week_start', public.week_start(),
    'visible', (select in_ranking and privacy_accepted_at is not null from public.profiles where id = auth.uid()),
    'members', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'name', display_name))
                         from public.profiles where public.rank_visible(id)), '[]'),
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

create or replace function public.ranking_data()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  return jsonb_build_object(
    'me', auth.uid(),
    'at', now(),
    'week_start', public.week_start(),
    'members', coalesce((select jsonb_agg(jsonb_build_object('id', id, 'name', display_name))
                         from public.profiles where public.rank_visible(id)), '[]'),
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
-- 3. Consentimiento
-- ---------------------------------------------------------------------
-- Crear el perfil con las dos aceptaciones (las versiones que ha leído el usuario)
create or replace function public.create_profile(p_code text, p_name text, p_terms text, p_privacy text)
returns text language plpgsql security definer set search_path = ''
as $$
declare n text;
begin
  if nullif(btrim(coalesce(p_terms, '')), '') is null or nullif(btrim(coalesce(p_privacy, '')), '') is null
     or char_length(p_terms) > 20 or char_length(p_privacy) > 20 then
    raise exception 'consent_required' using errcode = '22023';
  end if;
  n := public.create_profile(p_code, p_name);
  update public.profiles
     set terms_version = p_terms, terms_accepted_at = now(),
         privacy_version = p_privacy, privacy_accepted_at = now(),
         last_active_at = now()
   where id = auth.uid() and (terms_version is null or privacy_version is null);
  return n;
end $$;

-- Aceptar uno o los dos documentos (null = ese no se toca)
create or replace function public.accept_legal(p_terms text, p_privacy text)
returns jsonb language plpgsql security definer set search_path = ''
as $$
declare r jsonb;
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  if coalesce(char_length(p_terms), 0) > 20 or coalesce(char_length(p_privacy), 0) > 20 then
    raise exception 'bad_version' using errcode = '22023';
  end if;
  update public.profiles set
    terms_version       = coalesce(nullif(btrim(p_terms), ''), terms_version),
    terms_accepted_at   = case when nullif(btrim(p_terms), '') is not null then now() else terms_accepted_at end,
    privacy_version     = coalesce(nullif(btrim(p_privacy), ''), privacy_version),
    privacy_accepted_at = case when nullif(btrim(p_privacy), '') is not null then now() else privacy_accepted_at end,
    last_active_at      = now()
  where id = auth.uid();
  select jsonb_build_object('terms_version', terms_version, 'terms_accepted_at', terms_accepted_at,
                            'privacy_version', privacy_version, 'privacy_accepted_at', privacy_accepted_at,
                            'in_ranking', in_ranking)
    into r from public.profiles where id = auth.uid();
  return r;
end $$;

-- Aparecer o no en el ranking
create or replace function public.set_in_ranking(p_on boolean)
returns boolean language plpgsql security definer set search_path = ''
as $$
begin
  if not public.is_member() then raise exception 'not_member' using errcode = '42501'; end if;
  update public.profiles set in_ranking = coalesce(p_on, true) where id = auth.uid();
  return coalesce(p_on, true);
end $$;


-- ---------------------------------------------------------------------
-- 4. Última actividad: al iniciar sesión (la app llama a touch_activity
--    una vez al día) y al responder, hacer exámenes o avanzar en Aprender
-- ---------------------------------------------------------------------
create or replace function public.touch_activity()
returns void language sql security definer set search_path = ''
as $$ update public.profiles set last_active_at = now() where id = auth.uid() $$;

create or replace function public.touch_activity_rows()
returns trigger language plpgsql security definer set search_path = ''
as $$
begin
  update public.profiles p set last_active_at = now()
   where p.id in (select distinct user_id from new_rows) and p.last_active_at < now() - interval '1 minute';
  return null;
end $$;

drop trigger if exists answer_events_activity on public.answer_events;
create trigger answer_events_activity after insert on public.answer_events
  referencing new table as new_rows for each statement execute function public.touch_activity_rows();
drop trigger if exists exam_results_activity on public.exam_results;
create trigger exam_results_activity after insert on public.exam_results
  referencing new table as new_rows for each statement execute function public.touch_activity_rows();
drop trigger if exists learn_progress_activity_ins on public.learn_progress;
create trigger learn_progress_activity_ins after insert on public.learn_progress
  referencing new table as new_rows for each statement execute function public.touch_activity_rows();
drop trigger if exists learn_progress_activity_upd on public.learn_progress;
create trigger learn_progress_activity_upd after update on public.learn_progress
  referencing new table as new_rows for each statement execute function public.touch_activity_rows();


-- ---------------------------------------------------------------------
-- 5. Descargar mis datos (derecho de acceso y portabilidad)
-- ---------------------------------------------------------------------
create or replace function public.export_my_data()
returns jsonb language plpgsql stable security definer set search_path = ''
as $$
declare u uuid := auth.uid();
begin
  if u is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  return jsonb_build_object(
    'generado', now(),
    'cuenta', (select jsonb_build_object('id', id, 'email', email, 'creada', created_at,
                                         'email_confirmado', email_confirmed_at, 'ultimo_inicio_de_sesion', last_sign_in_at)
                 from auth.users where id = u),
    'perfil', (select to_jsonb(p) from public.profiles p where id = u),
    'resultados_de_examenes', coalesce((select jsonb_agg(to_jsonb(e) - 'user_id' order by e.taken_at) from public.exam_results e where e.user_id = u), '[]'),
    'respuestas', coalesce((select jsonb_agg(to_jsonb(a) - 'user_id' order by a.answered_at) from public.answer_events a where a.user_id = u), '[]'),
    'progreso_por_pregunta', coalesce((select jsonb_agg(to_jsonb(q) - 'user_id' order by q.test_id, q.q_id) from public.question_progress q where q.user_id = u), '[]'),
    'progreso_por_pregunta_version_anterior', coalesce((select jsonb_agg(to_jsonb(s) - 'user_id') from public.question_stats s where s.user_id = u), '[]'),
    'aprender', coalesce((select jsonb_agg(to_jsonb(l) - 'user_id' order by l.tema_id, l.item_id) from public.learn_progress l where l.user_id = u), '[]'),
    'importaciones_de_progreso', coalesce((select jsonb_agg(to_jsonb(i) - 'user_id') from public.stat_imports i where i.user_id = u), '[]')
  );
end $$;


-- ---------------------------------------------------------------------
-- 6. Borrado: de una cuenta (la propia), de las inactivas y de todo
-- ---------------------------------------------------------------------
-- Borra por completo a un usuario: sus datos de la app, sus registros de Auth y su usuario.
-- Interna: no se puede llamar desde la app.
create or replace function public.purge_user(p_user uuid)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  delete from public.learn_progress    where user_id = p_user;
  delete from public.answer_events     where user_id = p_user;
  delete from public.exam_results      where user_id = p_user;
  delete from public.question_progress where user_id = p_user;
  delete from public.question_stats    where user_id = p_user;
  delete from public.stat_imports      where user_id = p_user;
  delete from public.profiles          where id = p_user;
  delete from auth.audit_log_entries   where payload ->> 'actor_id' = p_user::text;
  delete from auth.flow_state          where user_id = p_user;
  delete from auth.users               where id = p_user;   -- y en cascada sesiones, identidades, tokens…
end $$;

-- «Borrar mi cuenta»: solo la del usuario que la pide, y solo si escribe BORRAR
create or replace function public.delete_my_account(p_confirm text)
returns void language plpgsql security definer set search_path = ''
as $$
begin
  if auth.uid() is null then raise exception 'not_authenticated' using errcode = '42501'; end if;
  if p_confirm is distinct from 'BORRAR' then raise exception 'confirm_required' using errcode = '22023'; end if;
  perform public.purge_user(auth.uid());
end $$;

-- Cuentas sin actividad durante más de p_days días (por defecto 12 meses). Devuelve cuántas borra.
create or replace function public.purge_inactive(p_days int default 365)
returns int language plpgsql security definer set search_path = ''
as $$
declare r record; n int := 0;
begin
  if p_days is null or p_days < 30 then raise exception 'p_days debe ser 30 o más' using errcode = '22023'; end if;
  for r in
    select u.id from auth.users u left join public.profiles p on p.id = u.id
     where greatest(coalesce(p.last_active_at, '-infinity'), coalesce(u.last_sign_in_at, '-infinity'), u.created_at)
           < now() - make_interval(days => p_days)
  loop
    perform public.purge_user(r.id);
    n := n + 1;
  end loop;
  return n;
end $$;

-- Cierre de la app: borra TODAS las cuentas y todos los datos. Solo a mano, desde el SQL Editor:
--   select public.purge_everything('BORRAR TODO');
create or replace function public.purge_everything(p_confirm text)
returns int language plpgsql security definer set search_path = ''
as $$
declare r record; n int := 0;
begin
  if p_confirm is distinct from 'BORRAR TODO' then raise exception 'confirm_required' using errcode = '22023'; end if;
  for r in select id from auth.users loop
    perform public.purge_user(r.id);
    n := n + 1;
  end loop;
  delete from public.learn_progress; delete from public.answer_events; delete from public.exam_results;
  delete from public.question_progress; delete from public.question_stats; delete from public.stat_imports;
  delete from public.profiles;
  delete from auth.audit_log_entries; delete from auth.flow_state;
  return n;
end $$;


-- ---------------------------------------------------------------------
-- 7. Permisos de las funciones
-- ---------------------------------------------------------------------
revoke execute on function public.create_profile(text, text, text, text), public.accept_legal(text, text),
                           public.set_in_ranking(boolean), public.touch_activity(), public.export_my_data(),
                           public.delete_my_account(text), public.rank_visible(uuid)
  from public, anon;
grant  execute on function public.create_profile(text, text, text, text), public.accept_legal(text, text),
                           public.set_in_ranking(boolean), public.touch_activity(), public.export_my_data(),
                           public.delete_my_account(text), public.rank_visible(uuid)
  to authenticated;
-- Solo para el administrador (SQL Editor) o pg_cron
revoke execute on function public.purge_user(uuid), public.purge_inactive(int), public.purge_everything(text),
                           public.touch_activity_rows()
  from public, anon, authenticated;


-- ---------------------------------------------------------------------
-- 8. Tarea diaria: borrar cuentas inactivas (pg_cron, 03:17 UTC)
-- ---------------------------------------------------------------------
do $$
begin
  begin
    create extension if not exists pg_cron;
  exception when others then
    raise notice 'pg_cron no está disponible (%). Ejecuta a mano: select public.purge_inactive();', sqlerrm;
  end;
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid) from cron.job where jobname = 'borrar-cuentas-inactivas';
    perform cron.schedule('borrar-cuentas-inactivas', '17 3 * * *', 'select public.purge_inactive(365)');
  end if;
end $$;

insert into public.app_migrations (name) values ('2026-10-11 privacidad y condiciones')
on conflict (name) do nothing;
