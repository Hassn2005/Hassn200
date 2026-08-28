-- Add the new Dantil products without recreating tables or duplicating existing rows.
alter table public.products
  add column if not exists name_ar text,
  add column if not exists description_ar text,
  add column if not exists category_ar text;

insert into public.products (
  name,
  description,
  price,
  currency,
  image_url,
  category,
  sort_order,
  name_ar,
  description_ar,
  category_ar
)
select *
from (
  values
    (
      'Golden Muse',
      'A warm, polished accent made for luminous everyday styling.',
      0::numeric,
      'SYP',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=900&q=80',
      'Jewelry',
      4,
      'إلهام ذهبي',
      'لمسة دافئة وراقية لإطلالات يومية مشرقة.',
      'مجوهرات'
    ),
    (
      'Rose Watch',
      'A delicate timepiece with a refined silhouette and feminine finish.',
      0::numeric,
      'SYP',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=80',
      'Watches',
      5,
      'ساعة روز',
      'ساعة رقيقة بتصميم أنيق ولمسة أنثوية راقية.',
      'ساعات'
    ),
    (
      'Silken Detail',
      'An elegant finishing touch that brings softness and character to every look.',
      0::numeric,
      'SYP',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=80',
      'Accessories',
      6,
      'تفصيل حريري',
      'تفصيل أنيق يضيف النعومة والطابع المميز إلى كل إطلالة.',
      'إكسسوارات'
    )
) as new_products(
  name,
  description,
  price,
  currency,
  image_url,
  category,
  sort_order,
  name_ar,
  description_ar,
  category_ar
)
where not exists (
  select 1
  from public.products existing
  where lower(existing.name) = lower(new_products.name)
);
