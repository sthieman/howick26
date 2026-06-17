-- ============================================================================
-- Howick 2026 — Supabase schema
-- ============================================================================
-- Run this in the Supabase SQL editor (or `supabase db push`) on a new project.
-- This file is IDEMPOTENT: every table uses `if not exists`, every column uses
-- `add column if not exists`, and every policy is dropped before being created.
-- Safe to re-run after changes — including on a project that ran an earlier
-- version of this schema.
--
-- Auth model: a SINGLE shared team login (one Supabase Auth user). Any signed-in
-- session can author posts, manage the gallery, and edit the team. The public can
-- read published content, leave comments, and like posts without logging in.
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
  body          text not null default '',          -- rich HTML from the admin editor
  cover_image   text,                              -- public Storage URL
  author_name   text not null default 'Howick 2026 Team',
  category      text not null default 'Update',
  published     boolean not null default false,
  published_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Added after the initial release — no-ops on a fresh table.
alter table public.posts add column if not exists category text not null default 'Update';

create index if not exists posts_published_idx on public.posts (published, published_at desc);

alter table public.posts enable row level security;

drop policy if exists "posts public read published" on public.posts;
create policy "posts public read published"
  on public.posts for select
  using (published = true);

drop policy if exists "posts team read all" on public.posts;
create policy "posts team read all"
  on public.posts for select to authenticated
  using (true);

drop policy if exists "posts team insert" on public.posts;
create policy "posts team insert"
  on public.posts for insert to authenticated
  with check (true);

drop policy if exists "posts team update" on public.posts;
create policy "posts team update"
  on public.posts for update to authenticated
  using (true) with check (true);

drop policy if exists "posts team delete" on public.posts;
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

drop policy if exists "comments public read" on public.comments;
create policy "comments public read"
  on public.comments for select
  using (true);

-- Anyone may comment, but only on a published post.
drop policy if exists "comments public insert" on public.comments;
create policy "comments public insert"
  on public.comments for insert
  with check (
    exists (select 1 from public.posts p where p.id = post_id and p.published = true)
  );

-- Only the team can delete (moderation).
drop policy if exists "comments team delete" on public.comments;
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

drop policy if exists "likes public read" on public.likes;
create policy "likes public read"
  on public.likes for select
  using (true);

drop policy if exists "likes public insert" on public.likes;
create policy "likes public insert"
  on public.likes for insert
  with check (
    exists (select 1 from public.posts p where p.id = post_id and p.published = true)
  );

-- A visitor may remove their own like (toggle off).
drop policy if exists "likes public delete own" on public.likes;
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
  category      text not null default 'Travel',
  sort_order    int not null default 0,
  created_at    timestamptz not null default now()
);

alter table public.gallery_photos add column if not exists category text not null default 'Travel';

create index if not exists gallery_sort_idx on public.gallery_photos (sort_order, created_at desc);

alter table public.gallery_photos enable row level security;

drop policy if exists "gallery public read" on public.gallery_photos;
create policy "gallery public read"
  on public.gallery_photos for select
  using (true);

drop policy if exists "gallery team insert" on public.gallery_photos;
create policy "gallery team insert"
  on public.gallery_photos for insert to authenticated
  with check (true);

drop policy if exists "gallery team update" on public.gallery_photos;
create policy "gallery team update"
  on public.gallery_photos for update to authenticated
  using (true) with check (true);

drop policy if exists "gallery team delete" on public.gallery_photos;
create policy "gallery team delete"
  on public.gallery_photos for delete to authenticated
  using (true);

-- ----------------------------------------------------------------------------
-- Team members (DB-backed so the team self-manages photos + bios via admin)
-- ----------------------------------------------------------------------------
create table if not exists public.team_members (
  id           uuid primary key default gen_random_uuid(),
  name         text not null default '',
  bio          text not null default '',
  photo        text,                 -- public Storage URL
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists team_sort_idx on public.team_members (sort_order, created_at);

alter table public.team_members enable row level security;

drop policy if exists "team public read" on public.team_members;
create policy "team public read"
  on public.team_members for select
  using (true);

drop policy if exists "team team insert" on public.team_members;
create policy "team team insert"
  on public.team_members for insert to authenticated
  with check (true);

drop policy if exists "team team update" on public.team_members;
create policy "team team update"
  on public.team_members for update to authenticated
  using (true) with check (true);

drop policy if exists "team team delete" on public.team_members;
create policy "team team delete"
  on public.team_members for delete to authenticated
  using (true);

-- Seed the eight team members once (names from the trip roster). Re-running is a
-- no-op because the insert only fires when the table is empty.
insert into public.team_members (name, sort_order)
select v.name, v.ord
from (values
  ('Jarred Lewis', 1), ('Sky White', 2), ('Luke March', 3), ('Ana Levy', 4),
  ('Joe Levy', 5), ('Elizabeth Betsch', 6), ('Vickie Shaar', 7), ('Sam Thieman', 8)
) as v(name, ord)
where not exists (select 1 from public.team_members);

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
-- Storage bucket for gallery, post covers, inline post images, and team photos
-- ============================================================================
-- One public-read bucket, organized by prefix: gallery/, covers/, inline/, team/.
-- Only the team (authenticated) can upload/delete.
insert into storage.buckets (id, name, public)
values ('gallery', 'gallery', true)
on conflict (id) do nothing;

drop policy if exists "gallery storage public read" on storage.objects;
create policy "gallery storage public read"
  on storage.objects for select
  using (bucket_id = 'gallery');

drop policy if exists "gallery storage team write" on storage.objects;
create policy "gallery storage team write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'gallery');

drop policy if exists "gallery storage team update" on storage.objects;
create policy "gallery storage team update"
  on storage.objects for update to authenticated
  using (bucket_id = 'gallery') with check (bucket_id = 'gallery');

drop policy if exists "gallery storage team delete" on storage.objects;
create policy "gallery storage team delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'gallery');
