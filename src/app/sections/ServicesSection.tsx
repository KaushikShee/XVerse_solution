import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent, Service } from '@/lib/db';
import { Monitor, Smartphone, Palette, Cloud, ShoppingCart, Bot, Code2, Globe, Cpu, LayoutDashboard } from 'lucide-react';

interface Props {
  content: HomepageContent;
  services: Service[];
}

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

export default function ServicesSection({ content, services }: Props) {
  return (
    <section className="wa-section wa-section-lighter" id="services-section">
      <div className="wa-container">
        <RevealOnScroll>
          <div className="wa-section-header">
            <p className="wa-section-label">{content.servicesLabel}</p>
            <h2 className="wa-section-title">
              {content.servicesTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="wa-gradient-text">{content.servicesTitle.split(' ').slice(-1)}</span>
            </h2>
            <p className="wa-section-description">{content.servicesDescription}</p>
          </div>
        </RevealOnScroll>

        <div className="wa-services-grid">
          {services.sort((a, b) => a.order - b.order).map((service, index) => (
            <RevealOnScroll key={service.id} delay={Math.min(index + 1, 6)}>
              <div className="wa-service-card">
                <div className="wa-service-icon"><ServiceIcon title={service.title} /></div>
                <h3 className="wa-service-title">{service.title}</h3>
                <p className="wa-service-description">{service.description}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
