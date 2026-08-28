import { AtSign, MapPin, MessageCircleMore, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { contactMethods, type ContactMethod } from '../data/siteData';
import { supabase } from '../lib/supabase';
import { fetchContactMethods } from '../services/siteContent';
import { useLanguage } from '../i18n/useLanguage';

const iconMap = {
  messageCircle: MessageCircleMore,
  instagram: AtSign,
  phone: Phone,
  mapPin: MapPin,
};

function Contact() {
  const [items, setItems] = useState<ContactMethod[]>(contactMethods);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const { language } = useLanguage();

  useEffect(() => {
    void fetchContactMethods().then(setItems).catch(() => undefined);
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const { error } = await supabase.from('contact_messages').insert(form);
    if (error) {
      setStatus('error');
      return;
    }
    setForm({ name: '', phone: '', message: '' });
    setStatus('sent');
  }

  return (
    <section id="contact" className="scroll-mt-28 bg-[#f6efe8] py-16 sm:py-20 lg:py-24">
      <div className="section-shell">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-[#b8877d]/30 bg-white/40 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#715a55]">
            {language === 'ar' ? 'تواصل معنا' : 'Contact us'}
          </div>
          <h2 className="brand-serif text-5xl leading-none text-[#2d1d1d] sm:text-6xl">{language === 'ar' ? 'لنجعل كل تفصيل شخصيًا.' : 'Let’s make every detail feel personal.'}</h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map(({ title, value, href, icon }) => {
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
                <div dir="ltr" className="mt-2 brand-serif text-3xl leading-none text-[#2d1d1d]">{value}</div>
              </a>
            );
          })}
        </div>

        <form onSubmit={handleSubmit} className="mx-auto mt-12 max-w-5xl rounded-[1.7rem] border border-[#d7b5aa]/60 bg-[#fffaf8]/70 p-6 shadow-[0_18px_45px_rgba(97,70,62,0.08)] sm:p-8 lg:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm text-[#4d3d3a]">{language === 'ar' ? 'الاسم' : 'Your name'}<input required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d7b5aa] bg-white/70 px-4 py-3 outline-none focus:border-[#8e6259]" /></label>
            <label className="text-sm text-[#4d3d3a]">{language === 'ar' ? 'الهاتف' : 'Phone'}<input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} className="mt-2 w-full rounded-xl border border-[#d7b5aa] bg-white/70 px-4 py-3 outline-none focus:border-[#8e6259]" /></label>
          </div>
          <label className="mt-5 block text-sm text-[#4d3d3a]">{language === 'ar' ? 'الرسالة' : 'Message'}<textarea required rows={6} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} className="mt-2 min-h-40 w-full resize-y rounded-xl border border-[#d7b5aa] bg-white/70 px-4 py-3 outline-none focus:border-[#8e6259]" /></label>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="rounded-full bg-[#382425] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#fefaf8] disabled:opacity-60">{status === 'sending' ? (language === 'ar' ? 'جار الإرسال...' : 'Sending...') : (language === 'ar' ? 'إرسال الرسالة' : 'Send message')}</button>
            {status === 'sent' && <span className="text-sm text-green-700">{language === 'ar' ? 'تم إرسال رسالتك بنجاح.' : 'Your message was sent successfully.'}</span>}
            {status === 'error' && <span className="text-sm text-red-700">{language === 'ar' ? 'تعذر الإرسال. استخدم واتساب.' : 'Unable to send. Please use WhatsApp.'}</span>}
          </div>
        </form>
      </div>
    </section>
  );
}

export default Contact;
