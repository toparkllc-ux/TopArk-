-- Founders/admins allowlist. Add more rows here as other founders' login
-- emails are known — this table is never exposed to clients.
create table public.admin_allowlist (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_allowlist (email) values ('noahwhittle1@gmail.com');

alter table public.admin_allowlist enable row level security;
-- No select/insert/update policies: this table is only ever touched by the
-- claim_admin() SECURITY DEFINER function below, never directly by clients.

create table public.admins (
  id uuid primary key references auth.users(id) on delete cascade,
  granted_at timestamptz not null default now()
);

alter table public.admins enable row level security;

create policy "admins_self_select" on public.admins
  for select using (auth.uid() = id);

create function public.is_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where id = uid);
$$;

create function public.claim_admin()
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  my_email text;
begin
  select email into my_email from auth.users where id = auth.uid();

  if my_email is not null and exists (select 1 from public.admin_allowlist where email = my_email) then
    insert into public.admins (id) values (auth.uid()) on conflict do nothing;
  end if;

  return public.is_admin(auth.uid());
end;
$$;

revoke execute on function public.claim_admin() from public, anon;
grant execute on function public.claim_admin() to authenticated;

revoke execute on function public.is_admin(uuid) from public, anon, authenticated;
