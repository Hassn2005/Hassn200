create table public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Dantil Admin',
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(12, 2),
  currency text not null default 'SYP',
  image_url text,
  category text,
  is_active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index products_active_order_idx
  on public.products (is_active, sort_order, created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.admin_profiles
    where user_id = auth.uid()
  );
$$;

alter table public.admin_profiles enable row level security;
alter table public.products enable row level security;

create policy "Admins can read their profile"
  on public.admin_profiles for select
  to authenticated
  using (user_id = auth.uid());

create policy "Public can read active products"
  on public.products for select
  to anon, authenticated
  using (is_active = true);

create policy "Admins can manage products"
  on public.products for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can read contact messages"
  on public.contact_messages for select
  to authenticated
  using (public.is_admin());

create policy "Admins can update contact messages"
  on public.contact_messages for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into public.products (name, description, price, currency, image_url, category, sort_order)
values
  ('Pearl Reverie', 'A luminous finishing touch for quiet, polished looks.', 0, 'SYP', 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80', 'Jewelry', 1),
  ('Rose Gold Hour', 'Soft metallic detail with a modern romantic silhouette.', 0, 'SYP', 'https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=900&q=80', 'Watches', 2),
  ('The Sculpted Line', 'A considered accent designed to make an everyday edit feel personal.', 0, 'SYP', 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=900&q=80', 'Accessories', 3),
  ('Golden Muse', 'A warm, polished accent made for luminous everyday styling.', 0, 'SYP', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80', 'Jewelry', 4),
  ('Rose Watch', 'A delicate timepiece with a refined silhouette and feminine finish.', 0, 'SYP', 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80', 'Watches', 5),
  ('Silken Detail', 'An elegant finishing touch that brings softness and character to every look.', 0, 'SYP', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80', 'Accessories', 6);