create extension if not exists "pgcrypto";

create type public.organization_type as enum ('store', 'supplier', 'admin');
create type public.order_status as enum ('new', 'confirmed', 'picking', 'shipping', 'completed', 'cancelled');

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  type public.organization_type not null,
  name text not null,
  bin text,
  phone text,
  city text not null default 'Алматы',
  address text,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null default 'member',
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  supplier_id uuid not null references public.organizations(id) on delete cascade,
  sku text,
  name text not null,
  brand text,
  category text,
  image_url text,
  unit text not null,
  price numeric(14,2) not null check (price >= 0),
  min_order integer not null default 1 check (min_order > 0),
  stock integer not null default 0 check (stock >= 0),
  delivery_days integer not null default 1 check (delivery_days > 0),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references public.organizations(id),
  supplier_id uuid not null references public.organizations(id),
  status public.order_status not null default 'new',
  total numeric(14,2) not null default 0,
  delivery_address text not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(14,2) not null check (unit_price >= 0),
  total numeric(14,2) generated always as (quantity * unit_price) stored
);

create index products_supplier_idx on public.products(supplier_id);
create index products_category_idx on public.products(category);
create index orders_store_idx on public.orders(store_id, created_at desc);
create index orders_supplier_idx on public.orders(supplier_id, created_at desc);
