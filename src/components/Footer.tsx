import { AtSign, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { footerDetails, navItems, type SiteSettings } from '../data/siteData';
import { fetchSiteSettings } from '../services/siteContent';
import { useLanguage } from '../i18n/useLanguage';

function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({
    brand_name: footerDetails.brand,
    description: footerDetails.description,
    phone: footerDetails.phone,
    whatsapp: footerDetails.whatsapp,
    instagram: footerDetails.instagram,
    address: footerDetails.location,
    opening_hours: '',
  });
  const { language } = useLanguage();

  useEffect(() => {
    void fetchSiteSettings().then(setSettings).catch(() => undefined);
  }, []);

  return (
    <footer className="border-t border-[#d8b7ae]/70 bg-[#f7f1ee] py-10">
      <div className="section-shell grid gap-8 lg:grid-cols-[1.1fr_0.9fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src="/dantil-logo.svg" alt="Dantil logo" className="h-10 w-10 rounded-full" />
            <span className="brand-serif text-3xl text-[#2a1d1d]">{settings.brand_name}</span>
          </div>
          <p className="mt-4 max-w-sm text-base leading-7 text-[#5d4d4b]">{settings.description}</p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#6d5d5b]">{language === 'ar' ? 'التنقل' : 'Navigate'}</div>
          <div className="mt-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <a key={item.label} href={item.href} className="text-sm text-[#4a3a39] transition hover:text-[#1d1212]">
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-[#6d5d5b]">{language === 'ar' ? 'تواصل' : 'Contact'}</div>
          <div className="mt-4 space-y-3 text-sm text-[#4a3a39]">
            <div className="flex items-center gap-3">
              <Phone size={15} />
              <span dir="ltr">{settings.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <AtSign size={15} />
              <span dir="ltr">{settings.instagram}</span>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircleMore size={15} />
              <span dir="ltr">{settings.whatsapp}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={15} />
              <span>{settings.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section-shell mt-8 border-t border-[#d8b7ae]/70 pt-5 text-sm text-[#5d4d4b]">
        © 2026 Dantil. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
