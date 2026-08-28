alter table public.products
  add column if not exists name_ar text,
  add column if not exists description_ar text,
  add column if not exists category_ar text;

update public.products
set name_ar = case name
  when 'patek philippe' then 'باتيك فيليب'
  when 'Golden Muse' then 'إلهام ذهبي'
  when 'Rose Watch' then 'ساعة روز'
  when 'Silken Detail' then 'تفصيل حريري'
  when 'Pearl Reverie' then 'لؤلؤة حالمة'
  when 'Rose Gold Hour' then 'ساعة الذهب الوردي'
  when 'The Sculpted Line' then 'الخط المنحوت'
  else name_ar
end,
description_ar = case name
  when 'patek philippe' then 'اكتشفي الأناقة الخالدة مع مجموعتنا الحصرية من الساعات النسائية.'
  when 'Golden Muse' then 'لمسة دافئة وراقية لإطلالات يومية مشرقة.'
  when 'Rose Watch' then 'ساعة رقيقة بتصميم أنيق ولمسة أنثوية راقية.'
  when 'Silken Detail' then 'تفصيل أنيق يضيف النعومة والطابع المميز إلى كل إطلالة.'
  when 'Pearl Reverie' then 'لمسة مضيئة لإطلالات هادئة وأنيقة.'
  when 'Rose Gold Hour' then 'تفصيل معدني ناعم بتصميم عصري ورومانسي.'
  when 'The Sculpted Line' then 'قطعة مدروسة تضفي طابعًا شخصيًا على إطلالتك اليومية.'
  else description_ar
end,
category_ar = case category
  when 'Watch' then 'ساعات'
  when 'Jewelry' then 'مجوهرات'
  when 'Watches' then 'ساعات'
  when 'Accessories' then 'إكسسوارات'
  else category_ar
end
where name_ar is null or description_ar is null or category_ar is null;
