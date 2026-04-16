import { readDbAsync } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from './sections/HeroSection';
import StatsSection from './sections/StatsSection';
import ServicesSection from './sections/ServicesSection';
import ProjectsSection from './sections/ProjectsSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: 'XVerse Solutions | Modern Software Development Agency',
  },
  description: 'XVerse Solutions builds exceptional digital products. Web development, mobile apps, UI/UX design, cloud solutions, and eCommerce development.',
  openGraph: {
    title: 'XVerse Solutions | Modern Software Development Agency',
    description: 'XVerse Solutions builds exceptional digital products. Web development, mobile apps, UI/UX design, cloud solutions, and eCommerce development.',
    url: '/',
  },
  twitter: {
    title: 'XVerse Solutions | Modern Software Development Agency',
    description: 'XVerse Solutions builds exceptional digital products. Web development, mobile apps, UI/UX design, cloud solutions, and eCommerce development.',
  },
};

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const db = await readDbAsync();
  const { homepageContent, services, projects, testimonials } = db;

  return (
    <>
      <Header companyName={homepageContent.companyName} />
      <main>
        <HeroSection content={homepageContent} />
        <StatsSection content={homepageContent} />
        <ServicesSection content={homepageContent} services={services} />
        <ProjectsSection content={homepageContent} projects={projects} />
        <TestimonialsSection content={homepageContent} testimonials={testimonials} />
        <CTASection content={homepageContent} />
      </main>
      <Footer content={homepageContent} />
    </>
  );
}
