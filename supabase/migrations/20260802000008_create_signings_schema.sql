create table public.signings (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  team_id uuid not null references public.profiles(id) on delete cascade,
  signed_at date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

alter table public.signings enable row level security;

create policy "signings_admin_select" on public.signings
  for select using (public.is_admin(auth.uid()));

create policy "signings_admin_insert" on public.signings
  for insert with check (public.is_admin(auth.uid()));

create policy "signings_admin_update" on public.signings
  for update using (public.is_admin(auth.uid()));

create policy "signings_admin_delete" on public.signings
  for delete using (public.is_admin(auth.uid()));

create index signings_athlete_idx on public.signings (athlete_id);
create index signings_team_idx on public.signings (team_id);
