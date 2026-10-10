-- =====================================================================
-- Migración 2026-10-11 · Sistemas Integrados de Fabricación: clave del profesor
--
-- Cambian las respuestas correctas de 4 preguntas de SIF. El progreso que cada
-- usuario tenía en ellas («dominada» o «fallada») se calculó con la clave antigua,
-- así que vuelven a «sin ver» para todos. El resto del progreso, las respuestas
-- de «Esta semana» y los exámenes ya guardados (exam_results) no se tocan.
--
-- Cuándo: pégala en Supabase → SQL Editor → New query → Run ANTES de publicar
-- la versión nueva de la app. Se puede ejecutar más de una vez: solo actúa la primera.
--
-- Preguntas (id estable · posición antigua en SIF):
--   0ypjz2j · 22  Señale la afirmación correcta relativa a un proceso de estirado.
--   1l52f0a · 29  Embutición de chapa de 0,5 mm, recipiente de 156 × 78 mm.
--   09t1jhm · 33  Agujero de 15 mm de longitud y 38 mm de diámetro (tiempo total).
--   0ll8jxm · 40  El espesor de viruta en un proceso de mecanizado depende de.
-- =====================================================================

do $$
begin
  if not exists (select 1 from public.app_migrations where name = '2026-10-11 sif clave profesor') then
    -- progreso actual (por id estable)
    delete from public.question_progress
     where test_id = 'sif' and q_id in ('0ypjz2j', '1l52f0a', '09t1jhm', '0ll8jxm');
    -- tabla de la versión anterior de la app (por posición)
    delete from public.question_stats
     where subject_id = 'sif' and q_index in (22, 29, 33, 40);
    insert into public.app_migrations (name) values ('2026-10-11 sif clave profesor');
  end if;
end $$;
