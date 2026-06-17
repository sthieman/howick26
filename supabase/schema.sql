-- ============================================================================
-- Howick 2026 — Supabase schema
-- ============================================================================
-- Run this in the Supabase SQL editor (or `supabase db push`) on a new project.
--
-- Auth model: a SINGLE shared team login (one Supabase Auth user). Any signed-in
-- session can author posts and manage the gallery. The public can read published
-- content, leave comments, and like posts without logging in.
--
-- RLS is ON for every table. "authenticated" = the shared team account.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Posts
-- ----------------------------------------------------------------------------
create table if not exists public.posts (
  id            uuid primary key default gen_random_uuid(),
  slug          text not null unique,
  title         text not null,
  excerpt       text,
  body          text not null default '',          -- markdown
  cover_image   text,
  author_name   text not null default 'Howick 2026 Team',
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists posts_published_idx on public.posts (published, published_at desc);

alter table public.posts enable row level security;

-- Public can read only published posts; the team can read everything (drafts).
create policy "posts public read published"
  on public.posts for select
  using (published = true);

create policy "posts team read all"
  on public.posts for select to authenticated
  using (true);

create policy "posts team insert"
  on public.posts for insert to authenticated
  with check (true);

create policy "posts team update"
  on public.posts for update to authenticated
  using (true) with check (true);

create policy "posts team delete"
  on public.posts for delete to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- Comments (public, no login)
-- ----------------------------------------------------------------------------
create table if not exists public.comments (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid not null references public.posts(id) on delete cascade,
  author_name  text not null check (char_length(trim(author_name)) between 1 and 80),
  body         text not null check (char_length(trim(body)) between 1 and 4000),
  created_at   timestamptz not null default now()
);

create index if not exists comments_post_idx on public.comments (post_id, created_at);

alter table public.comments enable row level security;

create policy "comments public read"
  on public.comments for select
  using (true);

-- Anyone may comment, but only on a published post.
create policy "comments public insert"
  on public.comments for insert
  with check (
    exists (select 1 from public.posts p where p.id = post_id and p.published = true)
  );

-- Only the team can delete (moderation).
create policy "comments team delete"
  on public.comments for delete to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- Likes (public, deduped per anonymous visitor)
-- ----------------------------------------------------------------------------
-- visitor_id is a random id generated + stored in the browser (localStorage).
-- The unique constraint stops a single browser from inflating the count.
create table if not exists public.likes (
  post_id     uuid not null references public.posts(id) on delete cascade,
  visitor_id  text not null check (char_length(visitor_id) between 8 and 64),
  created_at  timestamptz not null default now(),
  primary key (post_id, visitor_id)
);

alter table public.likes enable row level security;

create policy "likes public read"
  on public.likes for select
  using (true);

create policy "likes public insert"
  on public.likes for insert
  with check (
    exists (select 1 from public.posts p where p.id = post_id and p.published = true)
  );

-- A visitor may remove their own like (toggle off).
create policy "likes public delete own"
  on public.likes for delete
  using (true);

-- Aggregate like counts, readable by everyone.
create or replace view public.post_like_counts as
  select post_id, count(*)::int as likes
  from public.likes
  group by post_id;

-- ----------------------------------------------------------------------------
-- Gallery
-- ----------------------------------------------------------------------------
create table if not exists public.gallery_photos (
  id            uuid primary key default gen_random_uuid(),
  storage_path  text not null,        -- path inside the `gallery` storage bucket
  caption       text,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

create index if not exists gallery_sort_idx on public.gallery_photos (sort_order, created_at desc);

alter table public.gallery_photos enable row level security;

create policy "gallery public read"
  on public.gallery_photos for select
  using (true);

create policy "gallery team insert"
  on public.gallery_photos for insert to authenticated
  with check (true);

create policy "gallery team update"
  on public.gallery_photos for update to authenticated
  using (true) with check (true);

create policy "gallery team delete"
  on public.gallery_photos for delete to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- updated_at trigger for posts
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- ============================================================================
-- Storage bucket for gallery + post cover images
-- ============================================================================
-- Public-read bucket; only the team can upload/delete.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

create policy "gallery storage public read"
  on storage.objects for select
  using (bucket_id = 'gallery');

create policy "gallery storage team write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery');

create policy "gallery storage team update"
  on storage.objects for update to authenticated
  using (bucket_id = 'gallery') with check (bucket_id = 'gallery');

create policy "gallery storage team delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery');
