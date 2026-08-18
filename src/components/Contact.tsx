import { AtSign, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import { contactMethods } from '../data/siteData';

const iconMap = {
  messageCircle: MessageCircleMore,
  instagram: AtSign,
  phone: Phone,
  mapPin: MapPin,
};

function Contact() {
  return (
    <section id="contact" className="scroll-mt-28 bg-[#f6efe8] py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-white/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            Contact us
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">Let’s make every detail feel personal.</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactMethods.map(({ title, value, href, icon }) => {
            const Icon = iconMap[icon];

            return (
              <a
                key={title}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noreferrer' : undefined}
                className="group rounded-[1.7rem] border border-[#d7b5aa]/60 bg-[#fffaf8]/70 p-6 shadow-[0_18px_45px_rgba(97,70,62,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#bb8a7d] hover:bg-[#fff5f1]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f2dfd5] text-[#563d3b] transition duration-300 group-hover:scale-105 group-hover:bg-[#ead4c8]">
                  <Icon size={24} />
                </div>
                <div className="mt-6 text-[10px] uppercase tracking-[0.18em] text-[#72615f]">{title}</div>
                <div className="mt-2 brand-serif text-3xl leading-none text-[#2d1d1d]">{value}</div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Contact;
