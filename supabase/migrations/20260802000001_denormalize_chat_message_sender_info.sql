alter table public.chat_messages add column sender_name text not null default 'TopArk Member';
alter table public.chat_messages add column sender_role text not null default 'elite'
  check (sender_role in ('elite', 'pro_ark', 'founder'));

create function public.set_chat_message_sender_info()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  athlete record;
begin
  if public.is_admin(new.sender_id) then
    new.sender_role := 'founder';
    select first_name, last_name into athlete from public.athlete_profiles where id = new.sender_id;
    new.sender_name := coalesce(nullif(trim(athlete.first_name || ' ' || athlete.last_name), ''), 'TopArk Founder');
    return new;
  end if;

  select first_name, last_name, membership_tier into athlete
  from public.athlete_profiles where id = new.sender_id;

  new.sender_name := coalesce(nullif(trim(athlete.first_name || ' ' || athlete.last_name), ''), 'TopArk Member');
  new.sender_role := coalesce(athlete.membership_tier, 'elite');

  return new;
end;
$$;

create trigger chat_messages_set_sender_info
  before insert on public.chat_messages
  for each row execute function public.set_chat_message_sender_info();

revoke execute on function public.set_chat_message_sender_info() from public, anon, authenticated;
