create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  tag text not null default 'Announcement',
  status text not null default 'draft' check (status in ('draft', 'published')),
  author_id uuid references public.profiles(id) on delete set null,
  views int not null default 0,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.news_posts enable row level security;

create trigger news_posts_set_updated_at
  before update on public.news_posts
  for each row execute function public.set_updated_at();

create policy "news_posts_public_select" on public.news_posts
  for select using (status = 'published');

create policy "news_posts_admin_select" on public.news_posts
  for select using (public.is_admin(auth.uid()));

create policy "news_posts_admin_insert" on public.news_posts
  for insert with check (public.is_admin(auth.uid()));

create policy "news_posts_admin_update" on public.news_posts
  for update using (public.is_admin(auth.uid()));

create policy "news_posts_admin_delete" on public.news_posts
  for delete using (public.is_admin(auth.uid()));

create index news_posts_published_idx on public.news_posts (published_at desc) where status = 'published';

create function public.increment_news_post_views(post_slug text)
returns void
language sql
security definer
set search_path = public
as $$
  update public.news_posts set views = views + 1 where slug = post_slug and status = 'published';
$$;

grant execute on function public.increment_news_post_views(text) to anon, authenticated;
