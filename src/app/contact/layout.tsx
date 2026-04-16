import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with XVerse Solutions. Discuss your project, request a quote, or learn how we can help bring your digital product ideas to life.',
  openGraph: {
    title: 'Contact XVerse Solutions',
    description: 'Get in touch to discuss your project. Web development, mobile apps, UI/UX design, and cloud solutions.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact XVerse Solutions',
    description: 'Get in touch to discuss your project. Web development, mobile apps, UI/UX design, and cloud solutions.',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
