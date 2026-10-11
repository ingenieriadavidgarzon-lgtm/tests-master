-- =====================================================================
-- Migración 2026-10-11 · Módulo «Aprender»: progreso de lecciones,
-- repaso espaciado y chuleta, por usuario y por tema.
--
-- Requisito: haber ejecutado antes supabase/schema.sql y la migración
-- 20261010_ranking_por_asignatura.sql.
-- Cuándo: pégala en Supabase → SQL Editor → New query → Run ANTES de
-- publicar la versión de la app que trae «Aprender». Es aditiva: no toca
-- ninguna tabla existente, ni los tests ni el ranking.
-- Se puede ejecutar más de una vez.
--
-- Cada fila es un elemento del progreso de un usuario en un tema:
--   item_id 'L:<lección>'   estado de la lección (en curso, completada)
--   item_id 'R:<tarjeta>'   caja y fecha del repaso espaciado (Leitner)
-- Gana siempre la versión más reciente (updated_at), así dos dispositivos
-- pueden avanzar a la vez sin pisarse. Nada de esto cuenta para el ranking.
-- =====================================================================

create table if not exists public.learn_progress (
  user_id    uuid        not null default auth.uid() references auth.users (id) on delete cascade,
  tema_id    text        not null check (char_length(tema_id) between 1 and 40),
  item_id    text        not null check (char_length(item_id) between 1 and 120),
  data       jsonb       not null check (pg_column_size(data) <= 4096),
  updated_at timestamptz not null,
  primary key (user_id, tema_id, item_id)
);

-- RLS: cada usuario solo ve y escribe lo suyo
alter table public.learn_progress enable row level security;
revoke all on public.learn_progress from anon;
grant select, insert, update, delete on public.learn_progress to authenticated;

drop policy if exists "learn_progress: leer lo mío" on public.learn_progress;
create policy "learn_progress: leer lo mío" on public.learn_progress
  for select to authenticated using (user_id = auth.uid());
drop policy if exists "learn_progress: crear lo mío" on public.learn_progress;
create policy "learn_progress: crear lo mío" on public.learn_progress
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists "learn_progress: cambiar lo mío" on public.learn_progress;
create policy "learn_progress: cambiar lo mío" on public.learn_progress
  for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
drop policy if exists "learn_progress: borrar lo mío" on public.learn_progress;
create policy "learn_progress: borrar lo mío" on public.learn_progress
  for delete to authenticated using (user_id = auth.uid());

-- Subida por lotes desde la cola de la app: solo se guarda una fila si es
-- más reciente que la que ya hay. Corre con los permisos del usuario (RLS).
create or replace function public.learn_put(p jsonb)
returns integer
language plpgsql
security invoker
set search_path = public
as $$
declare n integer;
begin
  if auth.uid() is null then
    raise exception 'not_signed_in' using errcode = '42501';
  end if;
  if jsonb_typeof(p) is distinct from 'array' or jsonb_array_length(p) > 500 then
    raise exception 'bad_batch' using errcode = '22023';
  end if;
  insert into public.learn_progress as l (user_id, tema_id, item_id, data, updated_at)
  select distinct on (x->>'tema', x->>'item')
         auth.uid(), x->>'tema', x->>'item', x->'data',
         least((x->>'at')::timestamptz, now() + interval '5 minutes')
    from jsonb_array_elements(p) as x
   where x->>'tema' is not null and x->>'item' is not null and x ? 'data'
   order by x->>'tema', x->>'item', (x->>'at')::timestamptz desc
  on conflict (user_id, tema_id, item_id) do update
     set data = excluded.data, updated_at = excluded.updated_at
   where l.updated_at < excluded.updated_at;
  get diagnostics n = row_count;
  return n;
end $$;

revoke all on function public.learn_put(jsonb) from public, anon;
grant execute on function public.learn_put(jsonb) to authenticated;
