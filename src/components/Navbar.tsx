import { useEffect, useRef, useState } from 'react';
import { Languages, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems } from '../data/siteData';
import { useLanguage } from '../i18n/useLanguage';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDark, setIsDark] = useState(() => localStorage.getItem('dantil-theme') === 'dark');
  const { language, setLanguage } = useLanguage();
  const labels: Record<string, string> = language === 'ar' ? { Home: 'الرئيسية', About: 'عن دانتيل', Features: 'مميزاتنا', Collection: 'المجموعة', Location: 'الموقع', Contact: 'تواصل معنا' } : {};
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

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    localStorage.setItem('dantil-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div
        className={`mx-auto max-w-6xl transition-all duration-500 ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <nav
          aria-label="Main navigation"
          className="dark-site-nav flex items-center justify-between rounded-full border border-[#ccb2a8]/70 bg-[#f7f1ee]/80 px-3 py-2 shadow-[0_18px_40px_rgba(101,70,62,0.12)] backdrop-blur-xl sm:px-5"
        >
          <a href="#home" className="flex items-center gap-3" aria-label="Dantil home">
            <img src="/dantil-logo.svg" alt="Dantil logo" className="h-9 w-9 rounded-full" />
            <span className="brand-serif text-2xl leading-none text-[#2a1d1d]">Dantil</span>
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium tracking-[0.12em] text-[#473b39] transition hover:text-[#1d1212]"
              >
                {labels[item.label] ?? item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <button type="button" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="dark-site-control inline-flex h-10 items-center gap-2 rounded-full border border-[#6c4640]/20 bg-[#f2e5df] px-3 text-xs font-semibold" aria-label="Change language"><Languages size={16} />{language === 'en' ? 'عربي' : 'EN'}</button>
            <button type="button" aria-label="Toggle color theme" onClick={() => setIsDark((prev) => !prev)} className="dark-site-control inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#6c4640]/20 bg-[#f2e5df] text-[#2f1e1e]">
              {isDark ? <Sun size={17} /> : <Moon size={17} />}
            </button>
            <a
              href="#contact"
              className="dark-site-control inline-flex items-center justify-center rounded-full border border-[#6c4640]/20 bg-[#f2e5df] px-4 py-2 text-sm font-semibold tracking-[0.12em] text-[#2f1e1e] transition hover:-translate-y-0.5 hover:bg-[#ead7cf]"
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
        <div className="dark-site-nav mx-auto mt-2 max-w-6xl rounded-[28px] border border-[#ccb2a8]/70 bg-[#f7f1ee]/95 p-4 shadow-[0_18px_40px_rgba(101,70,62,0.12)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            <button type="button" onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#6c4640]/20 bg-[#f2e5df] px-4 py-2 text-sm font-semibold" aria-label="Change language"><Languages size={16} />{language === 'en' ? 'عربي' : 'EN'}</button>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium tracking-[0.12em] text-[#473b39] transition hover:bg-[#f0e4de]"
                onClick={() => setIsOpen(false)}
              >
                {labels[item.label] ?? item.label}
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
