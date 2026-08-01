-- Enforce: free-tier athletes can't send messages at all; paid athletes must
-- be verified; teams can only send a free-tier athlete one new message per
-- rolling 7 days.
create function public.enforce_messaging_rules()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  conv record;
  sender_type text;
  athlete_tier text;
  athlete_verification text;
  recent_count int;
begin
  select * into conv from public.conversations where id = new.conversation_id;
  if conv is null then
    raise exception 'Conversation not found';
  end if;

  select account_type into sender_type from public.profiles where id = new.sender_id;

  if sender_type = 'athlete' then
    select membership_tier, verification_status into athlete_tier, athlete_verification
    from public.athlete_profiles where id = new.sender_id;

    if athlete_tier = 'free' then
      raise exception 'Free members cannot send messages. Upgrade to Elite to message teams.';
    end if;
    if athlete_verification <> 'verified' then
      raise exception 'You must be verified before messaging teams.';
    end if;
  elsif sender_type = 'team' then
    select membership_tier into athlete_tier from public.athlete_profiles where id = conv.athlete_id;

    if athlete_tier = 'free' then
      select count(*) into recent_count
      from public.messages m
      join public.conversations c on c.id = m.conversation_id
      join public.profiles p on p.id = m.sender_id
      where c.athlete_id = conv.athlete_id
        and p.account_type = 'team'
        and m.created_at > now() - interval '7 days';

      if recent_count >= 1 then
        raise exception 'This athlete is on the Free plan and has reached their weekly message limit from teams.';
      end if;
    end if;
  end if;

  return new;
end;
$$;

create trigger messages_enforce_rules
  before insert on public.messages
  for each row execute function public.enforce_messaging_rules();

-- Keep conversations.last_message_at fresh and notify the other participant.
create function public.after_message_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  conv record;
  recipient_id uuid;
  sender_label text;
begin
  select * into conv from public.conversations where id = new.conversation_id;
  update public.conversations set last_message_at = new.created_at where id = conv.id;

  recipient_id := case when new.sender_id = conv.athlete_id then conv.team_id else conv.athlete_id end;

  select coalesce(nullif(trim(first_name || ' ' || last_name), ''), 'An athlete') into sender_label
  from public.athlete_profiles where id = new.sender_id;
  if sender_label is null then
    select coalesce(nullif(team_name, ''), 'A team') into sender_label
    from public.team_profiles where id = new.sender_id;
  end if;

  insert into public.notifications (user_id, type, title, body, link)
  values (
    recipient_id,
    'message',
    'New message from ' || sender_label,
    left(new.body, 140),
    '/messages/' || conv.id
  );

  return new;
end;
$$;

create trigger messages_after_insert
  after insert on public.messages
  for each row execute function public.after_message_insert();

-- Notify the recipient when an interview request is created, and the
-- requester when its status changes. Auto-create appointments on accept.
create function public.after_interview_request_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recipient_id uuid;
  requester_label text;
begin
  recipient_id := case when new.requested_by = new.athlete_id then new.team_id else new.athlete_id end;

  select coalesce(nullif(team_name, ''), 'A team') into requester_label
  from public.team_profiles where id = new.requested_by;
  if requester_label is null then
    select coalesce(nullif(trim(first_name || ' ' || last_name), ''), 'An athlete') into requester_label
    from public.athlete_profiles where id = new.requested_by;
  end if;

  insert into public.notifications (user_id, type, title, body, link)
  values (
    recipient_id,
    'interview_request',
    requester_label || ' requested an interview',
    new.message,
    '/interviews/' || new.id
  );

  return new;
end;
$$;

create trigger interview_requests_after_insert
  after insert on public.interview_requests
  for each row execute function public.after_interview_request_insert();

create function public.after_interview_request_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  other_party uuid;
  athlete_name text;
  team_name_val text;
begin
  if new.status = old.status then
    return new;
  end if;

  other_party := case when new.requested_by = new.athlete_id then new.team_id else new.athlete_id end;

  insert into public.notifications (user_id, type, title, body, link)
  values (
    other_party,
    'interview_status',
    'Interview request ' || new.status,
    null,
    '/interviews/' || new.id
  );

  if new.status = 'accepted' and new.scheduled_at is not null then
    select coalesce(nullif(trim(first_name || ' ' || last_name), ''), 'Athlete') into athlete_name
    from public.athlete_profiles where id = new.athlete_id;
    select coalesce(nullif(team_name, ''), 'Team') into team_name_val
    from public.team_profiles where id = new.team_id;

    insert into public.appointments (owner_id, interview_request_id, title, detail, kind, starts_at)
    values (new.athlete_id, new.id, 'Interview — ' || team_name_val, 'Video call interview', 'interview', new.scheduled_at)
    on conflict do nothing;

    insert into public.appointments (owner_id, interview_request_id, title, detail, kind, starts_at)
    values (new.team_id, new.id, 'Interview — ' || athlete_name, 'Video call interview', 'interview', new.scheduled_at)
    on conflict do nothing;
  end if;

  return new;
end;
$$;

create trigger interview_requests_after_update
  after update on public.interview_requests
  for each row execute function public.after_interview_request_update();

alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;
