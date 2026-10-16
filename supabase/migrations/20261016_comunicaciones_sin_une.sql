-- =====================================================================
-- Migración 2026-10-16 · Comunicaciones: preguntas quitadas
--
-- Se han quitado de la app tres preguntas de Comunicaciones cuya respuesta
-- era una norma UNE. Esto borra el progreso que hubiera en ellas, para que
-- no sigan sumando en el «Dominio» del ranking de Instalaciones.
--
-- Opcional: la app funciona igual sin ella. Pégala en Supabase → SQL
-- Editor → New query → Run cuando quieras. Se puede ejecutar más de una vez.
-- =====================================================================
delete from public.question_progress
 where test_id in ('com-temario', 'com-verif')
   and q_id in ('1i1ob8r', '09aamty', '1wqf9nk');

insert into public.app_migrations (name) values ('2026-10-16 comunicaciones sin UNE')
on conflict (name) do nothing;
