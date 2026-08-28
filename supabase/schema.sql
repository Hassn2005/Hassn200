create table public.site_settings (
  id text primary key default 'default' check (id = 'default'),
  brand_name text not null default 'Dantil',
  description text,
  phone text,
  whatsapp text,
  instagram text,
  address text,
  opening_hours text,
  updated_at timestamptz not null default now()
);

create table public.features (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  icon text not null check (icon in ('sparkles', 'gem', 'palette', 'star')),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.contact_methods (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  value text not null,
  href text not null,
  icon text not null check (icon in ('messageCircle', 'instagram', 'phone', 'mapPin')),
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  status text not null default 'new' check (status in ('new', 'read', 'replied', 'archived')),
  created_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;
alter table public.features enable row level security;
alter table public.contact_methods enable row level security;
alter table public.contact_messages enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

create policy "Public can read active features"
  on public.features for select
  to anon, authenticated
  using (is_active = true);

create policy "Public can read active contact methods"
  on public.contact_methods for select
  to anon, authenticated
  using (is_active = true);

create policy "Anyone can submit a contact message"
  on public.contact_messages for insert
  to anon, authenticated
  with check (true);

insert into public.site_settings (
  id, brand_name, description, phone, whatsapp, instagram, address, opening_hours
)
values (
  'default',
  'Dantil',
  'Premium accessories and refined finishing touches for women who dress with intention.',
  '+963 985 201 454',
  '+963 962 963 145',
  '@dantil.accessories',
  'Al-Mahatta Street, Daraa, Syria',
  'Sun-Thu: 10:00 AM - 10:00 PM'
)
on conflict (id) do update set
  brand_name = excluded.brand_name,
  description = excluded.description,
  phone = excluded.phone,
  whatsapp = excluded.whatsapp,
  instagram = excluded.instagram,
  address = excluded.address,
  opening_hours = excluded.opening_hours,
  updated_at = now();

insert into public.features (title, description, icon, sort_order)
values
  ('Curated Selection', 'Carefully chosen pieces designed to elevate daily styling with a thoughtful, signature point of view.', 'sparkles', 1),
  ('Timeless Elegance', 'Accessories crafted to feel refined long after the season changes, balancing everyday ease with lasting presence.', 'gem', 2),
  ('Thoughtful Details', 'Subtle finishes, elegant textures, and impeccably considered proportions that give every piece presence.', 'palette', 3),
  ('Personal Expression', 'Designed to help each look feel more personal, intentional, and effortlessly unique to its wearer.', 'star', 4);

insert into public.contact_methods (title, value, href, icon, sort_order)
values
  ('WhatsApp', '+963 962 963 145', 'https://wa.me/963962963145', 'messageCircle', 1),
  ('Instagram', '@dantil.accessories', 'https://instagram.com/dantil.accessories', 'instagram', 2),
  ('Phone', '+963 985 201 454', 'tel:+963985201454', 'phone', 3),
  ('Location', 'Daraa, Syria', '#location', 'mapPin', 4);