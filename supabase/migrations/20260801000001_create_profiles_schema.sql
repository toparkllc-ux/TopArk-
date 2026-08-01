-- profiles: thin table mapping an auth user to an account type
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  account_type text not null check (account_type in ('athlete', 'team')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- athlete_profiles
create table public.athlete_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null default '',
  position text,
  country text,
  height_cm integer,
  weight_kg integer,
  forty_yard_dash numeric(4,2),
  bio text,
  highlight_url text,
  verification_status text not null default 'unverified'
    check (verification_status in ('unverified', 'pending', 'verified')),
  verification_submitted_at timestamptz,
  membership_tier text not null default 'free'
    check (membership_tier in ('free', 'elite', 'pro_ark')),
  stripe_customer_id text,
  stripe_subscription_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.athlete_profiles enable row level security;

create policy "athlete_profiles_public_select" on public.athlete_profiles
  for select using (true);

create policy "athlete_profiles_owner_insert" on public.athlete_profiles
  for insert with check (auth.uid() = id);

create policy "athlete_profiles_owner_update" on public.athlete_profiles
  for update using (auth.uid() = id);

-- team_profiles
create table public.team_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,
  team_name text not null default '',
  contact_name text not null default '',
  email text not null default '',
  country text,
  league text,
  bio text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.team_profiles enable row level security;

create policy "team_profiles_public_select" on public.team_profiles
  for select using (true);

create policy "team_profiles_owner_insert" on public.team_profiles
  for insert with check (auth.uid() = id);

create policy "team_profiles_owner_update" on public.team_profiles
  for update using (auth.uid() = id);

-- keep updated_at fresh
create function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger athlete_profiles_set_updated_at
  before update on public.athlete_profiles
  for each row execute function public.set_updated_at();

create trigger team_profiles_set_updated_at
  before update on public.team_profiles
  for each row execute function public.set_updated_at();

-- populate profiles + athlete_profiles/team_profiles from signup metadata
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  acct_type text := new.raw_user_meta_data ->> 'account_type';
begin
  if acct_type not in ('athlete', 'team') then
    return new;
  end if;

  insert into public.profiles (id, account_type)
  values (new.id, acct_type);

  if acct_type = 'athlete' then
    insert into public.athlete_profiles (id, first_name, last_name, email, position, country)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'first_name', ''),
      coalesce(new.raw_user_meta_data ->> 'last_name', ''),
      coalesce(new.email, ''),
      new.raw_user_meta_data ->> 'position',
      new.raw_user_meta_data ->> 'country'
    );
  else
    insert into public.team_profiles (id, team_name, contact_name, email, country, league)
    values (
      new.id,
      coalesce(new.raw_user_meta_data ->> 'team_name', ''),
      coalesce(new.raw_user_meta_data ->> 'contact_name', ''),
      coalesce(new.email, ''),
      new.raw_user_meta_data ->> 'country',
      new.raw_user_meta_data ->> 'league'
    );
  end if;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
