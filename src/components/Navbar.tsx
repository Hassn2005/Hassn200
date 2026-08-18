import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { navItems } from '../data/siteData';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      const shouldShow = currentY < lastScrollY.current || currentY < 24;
      setIsVisible(shouldShow);
      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-6xl transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between rounded-full border border-[#ccb2a8]/70 bg-[#f7f1ee]/80 px-3 py-2 shadow-[0_18px_40px_rgba(101,70,62,0.12)] backdrop-blur-xl sm:px-5"
        >
          <a href="#home" className="flex items-center gap-3" aria-label="Dantil home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#7c4d42]/20 bg-[#efe1d8] text-sm font-semibold tracking-[0.2em] text-[#3b2a2a]">
              D
            </span>
            <span className="brand-serif text-2xl leading-none text-[#2a1d1d]">Dantil</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-[0.12em] text-[#473b39] transition hover:text-[#1d1212]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-[#6c4640]/20 bg-[#f2e5df] px-4 py-2 text-sm font-semibold tracking-[0.12em] text-[#2f1e1e] transition hover:-translate-y-0.5 hover:bg-[#ead7cf]"
            >
              Book a Visit
            </a>
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#6c4640]/20 bg-[#f2e5df] text-[#2f1e1e] md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </div>

      {isOpen && (
        <div className="mx-auto mt-2 max-w-6xl rounded-[28px] border border-[#ccb2a8]/70 bg-[#f7f1ee]/95 p-4 shadow-[0_18px_40px_rgba(101,70,62,0.12)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium tracking-[0.12em] text-[#473b39] transition hover:bg-[#f0e4de]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-[#3d2a2a] px-4 py-2.5 text-sm font-semibold tracking-[0.12em] text-[#f7f1ee]"
              onClick={() => setIsOpen(false)}
            >
              Book a Visit
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
