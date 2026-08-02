create table public.chat_rooms (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  section text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.chat_rooms enable row level security;

create policy "chat_rooms_authenticated_select" on public.chat_rooms
  for select using (auth.role() = 'authenticated');

insert into public.chat_rooms (slug, name, section, sort_order) values
  ('general', 'general', 'General', 1),
  ('introductions', 'introductions', 'General', 2),
  ('topark-news', 'topark-news', 'General', 3),
  ('quarterbacks', 'quarterbacks', 'By Position', 4),
  ('skill-positions', 'skill-positions', 'By Position', 5),
  ('linemen', 'linemen', 'By Position', 6),
  ('europe-league', 'europe-league', 'Regional', 7),
  ('latin-america', 'latin-america', 'Regional', 8);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.chat_rooms(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

alter table public.chat_messages enable row level security;

create function public.can_use_community_chat(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.is_admin(uid)
    or exists (
      select 1 from public.athlete_profiles
      where id = uid and membership_tier in ('elite', 'pro_ark')
    );
$$;

grant execute on function public.can_use_community_chat(uuid) to authenticated;

create policy "chat_messages_paid_select" on public.chat_messages
  for select using (public.can_use_community_chat(auth.uid()));

create policy "chat_messages_paid_insert" on public.chat_messages
  for insert with check (sender_id = auth.uid() and public.can_use_community_chat(auth.uid()));

create index chat_messages_room_idx on public.chat_messages (room_id, created_at);

alter publication supabase_realtime add table public.chat_messages;
