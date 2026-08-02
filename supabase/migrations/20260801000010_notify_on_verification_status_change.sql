create function public.after_athlete_verification_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.verification_status = old.verification_status then
    return new;
  end if;

  if new.verification_status = 'verified' then
    insert into public.notifications (user_id, type, title, body)
    values (new.id, 'verification', 'You are verified!', 'Your athlete profile has been verified. You can now message teams (on paid plans) and appear as a verified athlete.');
  elsif new.verification_status = 'unverified' and old.verification_status = 'pending' then
    insert into public.notifications (user_id, type, title, body)
    values (new.id, 'verification', 'Verification not approved', 'Your verification request needs more information. Update your profile and resubmit.');
  end if;

  return new;
end;
$$;

create trigger athlete_profiles_after_verification_update
  after update on public.athlete_profiles
  for each row execute function public.after_athlete_verification_update();

revoke execute on function public.after_athlete_verification_update() from public, anon, authenticated;
