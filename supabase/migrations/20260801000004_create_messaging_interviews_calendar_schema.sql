-- CONVERSATIONS
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  team_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now(),
  unique (athlete_id, team_id)
);

alter table public.conversations enable row level security;

create policy "conversations_participant_select" on public.conversations
  for select using (auth.uid() = athlete_id or auth.uid() = team_id);

create policy "conversations_team_insert" on public.conversations
  for insert with check (auth.uid() = team_id);

-- MESSAGES
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  read_at timestamptz
);

alter table public.messages enable row level security;

create policy "messages_participant_select" on public.messages
  for select using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and (auth.uid() = c.athlete_id or auth.uid() = c.team_id)
    )
  );

create policy "messages_participant_insert" on public.messages
  for insert with check (
    sender_id = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id and (auth.uid() = c.athlete_id or auth.uid() = c.team_id)
    )
  );

create policy "messages_participant_update" on public.messages
  for update using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id and (auth.uid() = c.athlete_id or auth.uid() = c.team_id)
    )
  );

-- INTERVIEW REQUESTS
create table public.interview_requests (
  id uuid primary key default gen_random_uuid(),
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  team_id uuid not null references public.profiles(id) on delete cascade,
  requested_by uuid not null references public.profiles(id),
  status text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled')),
  message text,
  proposed_at timestamptz,
  scheduled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.interview_requests enable row level security;

create policy "interview_requests_participant_select" on public.interview_requests
  for select using (auth.uid() = athlete_id or auth.uid() = team_id);

create policy "interview_requests_team_insert" on public.interview_requests
  for insert with check (auth.uid() = team_id and requested_by = auth.uid());

create policy "interview_requests_participant_update" on public.interview_requests
  for update using (auth.uid() = athlete_id or auth.uid() = team_id);

create trigger interview_requests_set_updated_at
  before update on public.interview_requests
  for each row execute function public.set_updated_at();

-- APPOINTMENTS
create table public.appointments (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  interview_request_id uuid references public.interview_requests(id) on delete cascade,
  title text not null,
  detail text,
  kind text not null default 'meeting' check (kind in ('interview', 'meeting', 'combine')),
  starts_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.appointments enable row level security;

create policy "appointments_owner_select" on public.appointments
  for select using (auth.uid() = owner_id);

create policy "appointments_owner_insert" on public.appointments
  for insert with check (auth.uid() = owner_id);

create policy "appointments_owner_delete" on public.appointments
  for delete using (auth.uid() = owner_id);

-- NOTIFICATIONS
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "notifications_owner_select" on public.notifications
  for select using (auth.uid() = user_id);

create policy "notifications_owner_update" on public.notifications
  for update using (auth.uid() = user_id);

create index notifications_user_unread_idx on public.notifications (user_id) where read_at is null;
create index messages_conversation_idx on public.messages (conversation_id, created_at);
create index appointments_owner_idx on public.appointments (owner_id, starts_at);
