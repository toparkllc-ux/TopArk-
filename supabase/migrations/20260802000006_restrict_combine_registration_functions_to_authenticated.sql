revoke execute on function public.register_for_combine(uuid) from public;
revoke execute on function public.cancel_combine_registration(uuid) from public;
grant execute on function public.register_for_combine(uuid) to authenticated;
grant execute on function public.cancel_combine_registration(uuid) to authenticated;
