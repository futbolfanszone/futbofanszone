-- Futbol Fan Zone schema
-- Run this in the Supabase SQL editor.

create extension if not exists "pgcrypto";

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'unsubscribed')),
  confirm_token text,
  source text,
  created_at timestamptz not null default now()
);

create index if not exists subscribers_status_idx on public.subscribers (status);
create index if not exists subscribers_confirm_token_idx on public.subscribers (confirm_token);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('quiz', 'job', 'general')),
  name text not null,
  email text not null,
  phone text,
  socials jsonb,
  message text,
  extra jsonb,
  status text not null default 'new'
    check (status in ('new', 'shortlisted', 'picked', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists applications_status_idx on public.applications (status);
create index if not exists applications_type_idx on public.applications (type);
create index if not exists applications_created_at_idx on public.applications (created_at desc);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.applications enable row level security;
alter table public.contact_messages enable row level security;

-- No public policies: all access via service role from Next.js API routes.
