-- COMBINE EVENTS
create table public.combine_events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  location text not null,
  description text not null,
  event_date timestamptz not null,
  registration_deadline timestamptz,
  capacity int,
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.combine_events enable row level security;

create trigger combine_events_set_updated_at
  before update on public.combine_events
  for each row execute function public.set_updated_at();

create policy "combine_events_public_select" on public.combine_events
  for select using (status in ('published', 'closed'));

create policy "combine_events_admin_select" on public.combine_events
  for select using (public.is_admin(auth.uid()));

create policy "combine_events_admin_insert" on public.combine_events
  for insert with check (public.is_admin(auth.uid()));

create policy "combine_events_admin_update" on public.combine_events
  for update using (public.is_admin(auth.uid()));

create policy "combine_events_admin_delete" on public.combine_events
  for delete using (public.is_admin(auth.uid()));

-- COMBINE REGISTRATIONS
create table public.combine_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.combine_events(id) on delete cascade,
  athlete_id uuid not null references public.profiles(id) on delete cascade,
  appointment_id uuid references public.appointments(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (event_id, athlete_id)
);

alter table public.combine_registrations enable row level security;

create policy "combine_registrations_athlete_select" on public.combine_registrations
  for select using (auth.uid() = athlete_id);

create policy "combine_registrations_admin_select" on public.combine_registrations
  for select using (public.is_admin(auth.uid()));

create policy "combine_registrations_athlete_delete" on public.combine_registrations
  for delete using (auth.uid() = athlete_id);

create index combine_registrations_event_idx on public.combine_registrations (event_id);

-- REGISTER: capacity + deadline checked server-side, appointment created to reflect on calendar
create function public.register_for_combine(p_event_id uuid)
returns public.combine_registrations
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event public.combine_events;
  v_account_type text;
  v_taken int;
  v_appointment_id uuid;
  v_registration public.combine_registrations;
begin
  select account_type into v_account_type from public.profiles where id = auth.uid();
  if v_account_type is distinct from 'athlete' then
    raise exception 'Only athletes can register for combines';
  end if;

  select * into v_event from public.combine_events where id = p_event_id and status = 'published';
  if not found then
    raise exception 'Combine event is not open for registration';
  end if;

  if v_event.registration_deadline is not null and now() > v_event.registration_deadline then
    raise exception 'Registration for this combine has closed';
  end if;

  if v_event.capacity is not null then
    select count(*) into v_taken from public.combine_registrations where event_id = p_event_id;
    if v_taken >= v_event.capacity then
      raise exception 'This combine is full';
    end if;
  end if;

  insert into public.appointments (owner_id, title, detail, kind, starts_at)
  values (auth.uid(), v_event.title, v_event.location, 'combine', v_event.event_date)
  returning id into v_appointment_id;

  insert into public.combine_registrations (event_id, athlete_id, appointment_id)
  values (p_event_id, auth.uid(), v_appointment_id)
  returning * into v_registration;

  return v_registration;
end;
$$;

grant execute on function public.register_for_combine(uuid) to authenticated;

-- UNREGISTER: removes the registration and its linked calendar appointment
create function public.cancel_combine_registration(p_event_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_appointment_id uuid;
begin
  select appointment_id into v_appointment_id
  from public.combine_registrations
  where event_id = p_event_id and athlete_id = auth.uid();

  delete from public.combine_registrations where event_id = p_event_id and athlete_id = auth.uid();

  if v_appointment_id is not null then
    delete from public.appointments where id = v_appointment_id and owner_id = auth.uid();
  end if;
end;
$$;

grant execute on function public.cancel_combine_registration(uuid) to authenticated;

-- Public aggregate view so anyone can see spots remaining without exposing registrant identities.
-- This bypasses table RLS (views run as owner by default), so the status filter below is load-bearing:
-- it must never expose draft events.
create view public.combine_event_public
  with (security_invoker = false) as
select
  e.id,
  e.slug,
  e.title,
  e.location,
  e.description,
  e.event_date,
  e.registration_deadline,
  e.capacity,
  e.status,
  coalesce(r.registered_count, 0) as registered_count
from public.combine_events e
left join (
  select event_id, count(*) as registered_count
  from public.combine_registrations
  group by event_id
) r on r.event_id = e.id
where e.status in ('published', 'closed');

grant select on public.combine_event_public to anon, authenticated;
