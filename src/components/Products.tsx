import { useEffect, useState } from 'react';
import type { Product } from '../data/siteData';
import { fetchProducts } from '../services/siteContent';
import { useLanguage } from '../i18n/useLanguage';

const fallbackProducts: Product[] = [
  {
    id: 'signature-edit',
    name: 'Signature Edit',
    description: 'A refined accent selected for everyday styling.',
    price: null,
    currency: 'SYP',
    image_url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab534?auto=format&fit=crop&w=900&q=80',
    category: 'Featured',
  },
];

function Products() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const { language } = useLanguage();

  useEffect(() => {
    void fetchProducts().then((items) => {
      if (items.length > 0) setProducts(items);
    }).catch(() => undefined);
  }, []);

  return (
    <section id="products" className="section-shell scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-[#fff7f4] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            {language === 'ar' ? 'المجموعة' : 'The collection'}
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">{language === 'ar' ? 'قطع بحضور استثنائي.' : 'Pieces with presence.'}</h2>
        </div>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article key={product.id} className="overflow-hidden rounded-[1.75rem] border border-[#d7b5aa]/60 bg-[#fffaf8]/70 shadow-[0_18px_45px_rgba(97,70,62,0.08)]">
            <div className="aspect-[4/3] overflow-hidden bg-[#efe2d8]">
              {product.image_url && <img src={product.image_url} alt={product.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />}
            </div>
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-[0.18em] text-[#72615f]">{language === 'ar' ? product.category_ar ?? product.category ?? 'مجموعة دانتيل' : product.category ?? 'Dantil collection'}</div>
              <h3 className="mt-2 brand-serif text-4xl text-[#2d1d1d]">{language === 'ar' ? product.name_ar ?? product.name : product.name}</h3>
              {(language === 'ar' ? product.description_ar ?? product.description : product.description) && <p className="mt-3 text-sm leading-6 text-[#5d4d4b]">{language === 'ar' ? product.description_ar ?? product.description : product.description}</p>}
              {product.price !== null && <div className="mt-5 text-sm font-semibold text-[#3d2a2a]">{product.price.toLocaleString()} {product.currency}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Products;
