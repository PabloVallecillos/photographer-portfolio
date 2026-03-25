-- ============================================================
-- SCHEMA: photographer portfolio
-- Run this in Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- TABLES
-- ============================================================

create table public.projects (
  id          uuid default uuid_generate_v4() primary key,
  slug        text not null unique,
  title       text not null,
  category    text not null,
  year        text not null,
  description text not null default '',
  cover_image text,                          -- URL from Storage
  aspect_ratio text not null default 'landscape'
                check (aspect_ratio in ('portrait', 'landscape', 'square')),
  published   boolean not null default false,
  sort_order  integer not null default 0,
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

create table public.project_images (
  id         uuid default uuid_generate_v4() primary key,
  project_id uuid not null references public.projects(id) on delete cascade,
  url        text not null,                  -- URL from Storage
  storage_path text not null,               -- path inside bucket (for deletion)
  sort_order integer not null default 0,
  created_at timestamptz default now()
);

-- ============================================================
-- STORAGE BUCKET
-- ============================================================

-- Create a public bucket for portfolio images
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict do nothing;

-- ============================================================
-- STORAGE POLICIES
-- ============================================================

-- Allow public read access to all images
create policy "Public read"
  on storage.objects for select
  using (bucket_id = 'portfolio-images');

-- Only authenticated users can upload
create policy "Auth upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'portfolio-images');

-- Only authenticated users can update/delete
create policy "Auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'portfolio-images');

create policy "Auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'portfolio-images');

-- ============================================================
-- RLS (Row Level Security)
-- ============================================================

alter table public.projects enable row level security;
alter table public.project_images enable row level security;

-- Public can read published projects
create policy "Public read published projects"
  on public.projects for select
  using (published = true);

-- Authenticated (admin) can do everything on projects
create policy "Auth full access projects"
  on public.projects for all
  to authenticated
  using (true)
  with check (true);

-- Public can read images of published projects
create policy "Public read images"
  on public.project_images for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = project_id and p.published = true
    )
  );

-- Authenticated (admin) can do everything on images
create policy "Auth full access images"
  on public.project_images for all
  to authenticated
  using (true)
  with check (true);

-- ============================================================
-- HELPERS
-- ============================================================

-- Auto-update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_projects_updated
  before update on public.projects
  for each row execute procedure public.handle_updated_at();
