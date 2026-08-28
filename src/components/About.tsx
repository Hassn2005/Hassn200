import { useLanguage } from '../i18n/useLanguage';

function About() {
  const { language } = useLanguage();
  return (
    <section id="about" className="section-shell scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] border border-[#d9b6ac]/60 bg-[#efe2d8] p-3 shadow-[0_24px_60px_rgba(89,62,57,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80"
              alt="Woman styling elegant jewelry and premium accessories"
              className="h-[470px] w-full rounded-[1.5rem] object-cover object-center sm:h-[530px]"
            />
          </div>
          <div className="absolute -bottom-6 right-5 rounded-full border border-[#d6b5a8]/70 bg-[#fffaf7]/90 px-4 py-3 text-center shadow-[0_18px_45px_rgba(80,58,60,0.12)] backdrop-blur-sm">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#65504d]">{language === 'ar' ? 'منذ' : 'Since'}</div>
            <div className="brand-serif text-3xl text-[#2d1d1d]">2021</div>
          </div>
        </div>

        <div>
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-[#fff7f4] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            {language === 'ar' ? 'عن دانتيل' : 'About Dantil'}
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">{language === 'ar' ? 'ترف هادئ لإطلالتك اليومية.' : 'A quiet luxury for daily styling.'}</h2>

          <p className="mt-6 max-w-xl text-base leading-8 text-[#5d4d4b] sm:text-lg">
            {language === 'ar' ? 'صُممت دانتيل للنساء اللواتي يدركن أن الأناقة الحقيقية تسكن في التفاصيل. نصنع إكسسوارات مدروسة تحمل إحساسًا بالراحة والأنوثة والثقة من الصباح إلى المساء.' : 'Dantil was imagined for women who understand that true elegance lives in the details. We create thoughtful accessories that carry a sense of ease, femininity, and confidence from morning to evening.'}
          </p>

          <p className="mt-4 max-w-xl text-base leading-8 text-[#5d4d4b] sm:text-lg">
            {language === 'ar' ? 'نختار كل قطعة بعناية، بهيكل ناعم وخطوط راقية ولمسة رومانسية تبدو عفوية وشخصية ولا تُنسى.' : 'Every piece is selected with intention—soft structure, refined silhouettes, and a touch of romance that feels effortless, personal, and unforgettable.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-[#4d3d3a]">
            <span className="rounded-full border border-[#d5b9b1] bg-[#f9f1ee] px-3 py-2">{language === 'ar' ? 'أنوثة راقية' : 'Refined femininity'}</span>
            <span className="rounded-full border border-[#d5b9b1] bg-[#f9f1ee] px-3 py-2">{language === 'ar' ? 'تجربة بوتيكية' : 'Boutique experience'}</span>
            <span className="rounded-full border border-[#d5b9b1] bg-[#f9f1ee] px-3 py-2">{language === 'ar' ? 'لمسات خالدة' : 'Timeless finishes'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
