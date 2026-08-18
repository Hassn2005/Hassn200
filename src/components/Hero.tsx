import { ArrowRight, Play } from 'lucide-react';

function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-x-0 top-0 h-[620px] bg-[radial-gradient(circle_at_top,_rgba(196,146,134,0.28),_rgba(247,241,238,0)_60%)]" />

      <div className="section-shell relative grid items-center gap-8 pb-14 pt-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:pb-20 lg:pt-12">
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#b8877d]/30 bg-[#fff9f5] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#6f4c46]">
            Boutique elegance • Daraa, Syria
          </div>

          <h1 className="brand-serif max-w-xl text-[3.3rem] leading-[0.9] tracking-[-0.05em] text-[#2d1d1d] sm:text-[4.4rem] lg:text-[6rem]">
            Details <span className="text-[#7f5a52]">that define</span> you.
          </h1>

          <p className="mt-5 max-w-lg text-base leading-8 text-[#5d4d4b] sm:text-lg">
            Dantil brings together fine accents, refined shapes, and feminine statement pieces designed to turn each look into a lasting impression.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#382425] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#fefaf8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4b2f2e]"
            >
              Discover Dantil
              <ArrowRight size={16} />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6f4c46]/20 bg-white/40 px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#2f1d1d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f1eae6]"
            >
              <Play size={14} className="fill-current" />
              Our story
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-5 text-sm text-[#594643]">
            <div>
              <div className="brand-serif text-3xl text-[#2d1d1d]">120+</div>
              <div className="mt-1 uppercase tracking-[0.12em] text-[10px]">Curated pieces</div>
            </div>
            <div>
              <div className="brand-serif text-3xl text-[#2d1d1d]">4.9/5</div>
              <div className="mt-1 uppercase tracking-[0.12em] text-[10px]">Client love</div>
            </div>
            <div>
              <div className="brand-serif text-3xl text-[#2d1d1d]">Daraa</div>
              <div className="mt-1 uppercase tracking-[0.12em] text-[10px]">Boutique roots</div>
            </div>
          </div>

          <div className="mt-8 max-w-[300px] rounded-2xl border border-[#d2b7ae]/70 bg-[#fffaf8]/90 p-3 shadow-[0_18px_45px_rgba(80,58,60,0.12)] backdrop-blur-sm sm:mt-10">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#6c504d]">Signature edit</div>
            <div className="mt-2 flex items-center gap-4">
              <div className="h-12 w-12 rounded-full border border-[#d4b9a6] bg-[radial-gradient(circle_at_30%_30%,_#f7d6c4,_#d19d88_60%,_#b87868)]" />
              <div>
                <div className="brand-serif text-2xl text-[#2d1d1d]">Dantil</div>
                <div className="text-sm text-[#584744]">Fine romantic accents</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[540px]">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d5b2a5]/60 bg-[#f2e1d6] p-3 shadow-[0_32px_80px_rgba(90,59,62,0.15)]">
            <img
              src="https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1200&q=80"
              alt="Elegant feminine watch styling for a premium boutique brand"
              className="h-[560px] w-full rounded-[1.5rem] object-cover object-center sm:h-[640px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
