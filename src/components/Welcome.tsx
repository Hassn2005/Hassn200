import { ArrowRight } from 'lucide-react';

function Welcome() {
  return (
    <section className="section-shell py-16 sm:py-20 lg:py-24">
      <div className="overflow-hidden rounded-[2.2rem] border border-[#d8b3a8]/60 bg-[#f3e3db] shadow-[0_24px_80px_rgba(80,58,60,0.12)]">
        <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr] lg:p-12">
          <div>
            <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-white/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
              A warm welcome
            </div>
            <h2 className="brand-serif text-5xl leading-[0.95] text-[#2d1d1d] sm:text-6xl">
              Your style begins with the details.
            </h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#5d4d4b] sm:text-lg">
              Discover the little pieces that make every look feel like yours—crafted to feel intimate, elevated, and unmistakably personal.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#382425] px-6 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#fefaf8] transition duration-200 hover:-translate-y-0.5 hover:bg-[#4b2f2e]"
            >
              Discover Dantil
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="overflow-hidden rounded-[1.8rem] border border-[#d5b2a5]/60 bg-[#f6e2d5] p-3">
            <img
              src="https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1200&q=80"
              alt="Luxury accessory and jewelry styling in a refined boutique editorial scene"
              className="h-[340px] w-full rounded-[1.35rem] object-cover object-center sm:h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
