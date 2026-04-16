import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://xverse.solutions';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#6366f1',
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'XVerse Solutions | Modern Software Development Agency',
    template: '%s | XVerse Solutions',
  },
  description: 'XVerse Solutions is a forward-thinking software development agency crafting exceptional digital products. Web development, mobile apps, UI/UX design, and cloud solutions.',
  keywords: 'software development, web development, mobile apps, react, next.js, agency, XVerse Solutions, UI/UX design, cloud solutions, ecommerce development, AI/ML solutions',
  authors: [{ name: 'XVerse Solutions', url: siteUrl }],
  creator: 'XVerse Solutions',
  publisher: 'XVerse Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'XVerse Solutions',
    title: 'XVerse Solutions | Modern Software Development Agency',
    description: 'Crafting exceptional digital experiences. Web development, mobile apps, UI/UX design, and cloud solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'XVerse Solutions | Modern Software Development Agency',
    description: 'Crafting exceptional digital experiences. Web development, mobile apps, UI/UX design, and cloud solutions.',
    creator: '@xversesolutions',
  },
};

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'XVerse Solutions',
  url: siteUrl,
  logo: `${siteUrl}/icon.png`,
  email: 'hello@xverse.solutions',
  telephone: '+1-555-123-4567',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    addressCountry: 'US',
  },
  foundingDate: '2020',
  description: 'XVerse Solutions is a forward-thinking software development agency crafting exceptional digital products.',
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
