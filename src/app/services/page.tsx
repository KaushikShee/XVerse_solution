import { readDbAsync } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import { Monitor, Smartphone, Palette, Cloud, ShoppingCart, Bot, Code2 } from 'lucide-react';
import type { Metadata } from 'next';

const titleIconMap: Record<string, React.ReactNode> = {
  'web development':       <Monitor size={28} strokeWidth={1.5} />,
  'mobile apps':           <Smartphone size={28} strokeWidth={1.5} />,
  'ui/ux design':          <Palette size={28} strokeWidth={1.5} />,
  'cloud solutions':       <Cloud size={28} strokeWidth={1.5} />,
  'ecommerce development': <ShoppingCart size={28} strokeWidth={1.5} />,
  'ai/ml solutions':       <Bot size={28} strokeWidth={1.5} />,
};

function ServiceIcon({ title }: { title: string }) {
  return titleIconMap[title.toLowerCase()] ?? <Code2 size={28} strokeWidth={1.5} />;
}

export const metadata: Metadata = {
  title: 'Services | XVerse Solutions',
  description: 'Explore our comprehensive software development services — web development, mobile apps, UI/UX design, cloud solutions, eCommerce, and AI/ML.',
};

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const db = await readDbAsync();
  const { homepageContent, services } = db;

  return (
    <>
      <Header companyName={homepageContent.companyName} />
      <main>
        <section className="wa-page-banner">
          <div className="wa-container">
            <h1>Our <span className="wa-gradient-text">Services</span></h1>
            <p>End-to-end solutions tailored to your unique business needs</p>
          </div>
        </section>

        <section className="wa-section wa-section-dark">
          <div className="wa-container">
            <div className="wa-services-grid">
              {services.sort((a, b) => a.order - b.order).map((service, index) => (
                <RevealOnScroll key={service.id} delay={Math.min(index + 1, 6)}>
                  <div className="wa-service-card" style={{ minHeight: 280 }}>
                    <div className="wa-service-icon"><ServiceIcon title={service.title} /></div>
                    <h3 className="wa-service-title">{service.title}</h3>
                    <p className="wa-service-description">{service.description}</p>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="wa-section wa-section-lighter">
          <div className="wa-container">
            <RevealOnScroll>
              <div className="wa-cta">
                <div className="wa-cta-content">
                  <h2 className="wa-cta-title">Need a Custom Solution?</h2>
                  <p className="wa-cta-description">
                    We specialize in building tailored software that fits your exact requirements. Let&apos;s talk.
                  </p>
                  <a href="/contact" className="wa-cta-btn">Get a Free Quote →</a>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer content={homepageContent} />
    </>
  );
}
