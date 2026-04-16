import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent, Service } from '@/lib/db';

interface Props {
  content: HomepageContent;
  services: Service[];
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
                <div className="wa-service-icon">{service.icon}</div>
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
