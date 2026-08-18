export type NavItem = {
  label: string;
  href: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: 'sparkles' | 'gem' | 'palette' | 'star';
};

export type ContactMethod = {
  title: string;
  value: string;
  href: string;
  icon: 'messageCircle' | 'instagram' | 'phone' | 'mapPin';
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Features', href: '#features' },
  { label: 'Location', href: '#location' },
  { label: 'Contact', href: '#contact' },
];

export const featureItems: FeatureItem[] = [
  {
    title: 'Curated Selection',
    description:
      'Carefully chosen pieces designed to elevate daily styling with a thoughtful, signature point of view.',
    icon: 'sparkles',
  },
  {
    title: 'Timeless Elegance',
    description:
      'Accessories crafted to feel refined long after the season changes, balancing everyday ease with lasting presence.',
    icon: 'gem',
  },
  {
    title: 'Thoughtful Details',
    description:
      'Subtle finishes, elegant textures, and impeccably considered proportions that give every piece presence.',
    icon: 'palette',
  },
  {
    title: 'Personal Expression',
    description:
      'Designed to help each look feel more personal, intentional, and effortlessly unique to its wearer.',
    icon: 'star',
  },
];

export const contactMethods: ContactMethod[] = [
  {
    title: 'WhatsApp',
    value: '+963 962 963 145',
    href: 'https://wa.me/963962963145',
    icon: 'messageCircle',
  },
  {
    title: 'Instagram',
    value: '@dantil.accessories',
    href: 'https://instagram.com/dantil.accessories',
    icon: 'instagram',
  },
  {
    title: 'Phone',
    value: '+963 985 201 454',
    href: 'tel:+963985201454',
    icon: 'phone',
  },
  {
    title: 'Location',
    value: 'Daraa, Syria',
    href: '#location',
    icon: 'mapPin',
  },
];

export const footerDetails = {
  brand: 'Dantil',
  description: 'Premium accessories and refined finishing touches for women who dress with intention.',
  phone: '+963 985 201 454',
  instagram: '@dantil.accessories',
  whatsapp: '+963 962 963 145',
  location: 'Daraa, Syria',
};
