create policy "athlete_profiles_admin_select" on public.athlete_profiles
  for select using (public.is_admin(auth.uid()));

create policy "athlete_profiles_admin_update" on public.athlete_profiles
  for update using (public.is_admin(auth.uid()));
