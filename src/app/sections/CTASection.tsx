import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent } from '@/lib/db';
import Link from 'next/link';

interface Props {
  content: HomepageContent;
}

export default function CTASection({ content }: Props) {
  return (
    <section className="wa-section wa-section-dark" id="cta-section">
      <div className="wa-container">
        <RevealOnScroll>
          <div className="wa-cta">
            <div className="wa-cta-content">
              <h2 className="wa-cta-title">{content.ctaHeading}</h2>
              <p className="wa-cta-description">{content.ctaDescription}</p>
              <Link href="/contact" className="wa-cta-btn">
                {content.ctaButtonText}
              </Link>
              <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>
                Or email us directly at <strong>{content.companyEmail}</strong>
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
