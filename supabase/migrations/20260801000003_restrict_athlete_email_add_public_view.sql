-- Athletes' email addresses are personal data — only the athlete themselves
-- should be able to read their own athlete_profiles row directly.
drop policy "athlete_profiles_public_select" on public.athlete_profiles;

create policy "athlete_profiles_owner_select" on public.athlete_profiles
  for select using (auth.uid() = id);

-- Public/team-facing directory: everything teams need to search and display
-- an athlete card, minus email and Stripe identifiers.
create view public.athlete_directory
  with (security_invoker = false) as
  select
    id,
    first_name,
    last_name,
    position,
    country,
    height_cm,
    weight_kg,
    forty_yard_dash,
    bio,
    highlight_url,
    verification_status,
    membership_tier,
    created_at
  from public.athlete_profiles;

grant select on public.athlete_directory to anon, authenticated;
