import { Gem, Palette, Sparkles, Star } from 'lucide-react';
import { featureItems } from '../data/siteData';

const iconMap = {
  sparkles: Sparkles,
  gem: Gem,
  palette: Palette,
  star: Star,
};

function Features() {
  return (
    <section id="features" className="scroll-mt-28 bg-[#f3e7e0] py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-white/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            What defines us
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">A brand shaped by thoughtful details.</h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featureItems.map(({ title, description, icon }) => {
            const Icon = iconMap[icon];

            return (
              <article
                key={title}
                className="group flex h-full flex-col rounded-[1.75rem] border border-[#d7b5aa]/60 bg-[#fffaf8]/70 p-6 shadow-[0_18px_45px_rgba(97,70,62,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(97,70,62,0.12)]"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#f4e2d8] text-[#563d3b] transition duration-300 group-hover:scale-105 group-hover:bg-[#ead6cc]">
                  <Icon size={26} />
                </div>
                <h3 className="brand-serif text-4xl text-[#2d1d1d]">{title}</h3>
                <p className="mt-4 text-base leading-7 text-[#5d4d4b]">{description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
