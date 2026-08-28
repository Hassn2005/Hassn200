alter table public.features
  add column if not exists title_ar text,
  add column if not exists description_ar text;

update public.features
set title_ar = case title
  when 'Curated Selection' then 'اختيارات منتقاة'
  when 'Timeless Elegance' then 'أناقة خالدة'
  when 'Thoughtful Details' then 'تفاصيل مدروسة'
  when 'Personal Expression' then 'تعبير شخصي'
  else title_ar
end,
description_ar = case title
  when 'Curated Selection' then 'قطع مختارة بعناية لترتقي بإطلالتك اليومية برؤية خاصة ومدروسة.'
  when 'Timeless Elegance' then 'إكسسوارات راقية تتجاوز تغير المواسم وتجمع بين سهولة الاستخدام والحضور الدائم.'
  when 'Thoughtful Details' then 'لمسات نهائية وملمس أنيق ونسب مدروسة تمنح كل قطعة حضورها الخاص.'
  when 'Personal Expression' then 'قطع تساعد كل إطلالة على أن تكون أكثر شخصية وقصدًا وتفردًا.'
  else description_ar
end
where title_ar is null or description_ar is null;