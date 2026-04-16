import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XVerse Solutions | Modern Software Development Agency",
  description: "XVerse Solutions is a forward-thinking software development agency crafting exceptional digital products. Web development, mobile apps, UI/UX design, and cloud solutions.",
  keywords: "software development, web development, mobile apps, react, next.js, agency, XVerse Solutions",
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "XVerse Solutions | Modern Software Development Agency",
    description: "Crafting exceptional digital experiences. Web development, mobile apps, UI/UX design, and cloud solutions.",
    type: "website",
  },
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
      </head>
      <body>{children}</body>
    </html>
  );
}
