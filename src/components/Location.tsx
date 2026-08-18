import { MapPin, Clock3 } from 'lucide-react';

function Location() {
  return (
    <section id="location" className="section-shell scroll-mt-28 py-16 sm:py-20 lg:py-24">
      <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-12">
        <div>
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-[#fff7f4] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            Our location
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">Visit the Dantil boutique.</h2>

          <div className="mt-8 space-y-6 rounded-[2rem] border border-[#d8b8b0]/60 bg-[#fffaf8]/70 p-6 shadow-[0_18px_45px_rgba(97,70,62,0.08)]">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e5df] text-[#4c3634]">
                <MapPin size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#72615f]">Address</div>
                <p className="mt-1 text-lg font-medium text-[#2d1d1d]">Al-Mahatta Street, Daraa, Syria</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f3e5df] text-[#4c3634]">
                <Clock3 size={20} />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.18em] text-[#72615f]">Opening hours</div>
                <p className="mt-1 text-lg font-medium text-[#2d1d1d]">Sun–Thu: 10:00 AM – 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-[#d5b2a5]/60 bg-[#f1e1d6] p-3 shadow-[0_24px_60px_rgba(89,62,57,0.12)]">
          <div className="relative h-[440px] overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f5eae7_0%,#d9c4b3_38%,#b89282_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.75),transparent_24%),radial-gradient(circle_at_82%_35%,rgba(142,94,82,0.25),transparent_18%),linear-gradient(135deg,rgba(61,40,42,0.18),rgba(255,255,255,0)_55%)]" />
            <div className="absolute inset-x-8 bottom-8 top-8 rounded-[1.75rem] border border-white/40 bg-white/12 backdrop-blur-[1px]" />
            <div className="absolute left-10 top-14 h-40 w-40 rounded-full border border-[#fffaf8]/60 bg-[#fffaf8]/20" />
            <div className="absolute bottom-12 right-12 h-52 w-52 rounded-full border border-[#fffaf8]/60 bg-[#fffaf8]/15" />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#fffaf8]/70 bg-[#fffaf8]/30 p-6 shadow-[0_24px_70px_rgba(83,61,59,0.18)]">
              <MapPin size={36} className="text-[#3b2323]" />
            </div>
            <div className="absolute bottom-10 left-8 right-8 rounded-full border border-[#fffaf8]/50 bg-[#fffaf8]/20 px-4 py-3 text-center text-sm uppercase tracking-[0.2em] text-[#3a2a2c] backdrop-blur-sm">
              Daraa • boutique destination
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Location;
