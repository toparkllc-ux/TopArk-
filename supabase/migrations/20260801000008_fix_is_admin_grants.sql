-- RLS policies that call is_admin() execute as the querying (authenticated)
-- role, so that role needs EXECUTE even though the function body itself
-- runs as SECURITY DEFINER to read the admins table.
grant execute on function public.is_admin(uuid) to authenticated;
