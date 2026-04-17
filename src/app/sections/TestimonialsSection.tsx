import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent, Testimonial } from '@/lib/db';

interface Props {
  content: HomepageContent;
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ content, testimonials }: Props) {
  return (
    <section className="wa-section wa-section-lighter" id="testimonials-section">
      <div className="wa-container">
        <RevealOnScroll>
          <div className="wa-section-header">
            <p className="wa-section-label">{content.testimonialsLabel}</p>
            <h2 className="wa-section-title">
              {content.testimonialsTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="wa-gradient-text">{content.testimonialsTitle.split(' ').slice(-1)}</span>
            </h2>
            <p className="wa-section-description">{content.testimonialsDescription}</p>
          </div>
        </RevealOnScroll>

        <div className="wa-testimonials-grid">
          {testimonials.sort((a, b) => a.order - b.order).map((testimonial, index) => {
            const stars = '★'.repeat(testimonial.starRating);
            const positionCompany = [testimonial.clientPosition, testimonial.companyName].filter(Boolean).join(', ');
            
            return (
              <RevealOnScroll key={testimonial.id} delay={Math.min(index + 1, 3)}>
                <div className="wa-testimonial-card">
                  <div className="wa-testimonial-stars">{stars}</div>
                  <p className="wa-testimonial-text">&ldquo;{testimonial.reviewText}&rdquo;</p>
                  <div className="wa-testimonial-author">
                    <div className="wa-testimonial-avatar">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, ${testimonial.avatarColor1} 0%, ${testimonial.avatarColor2} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.25rem',
                          color: 'white',
                          borderRadius: '50%',
                        }}
                      >
                        {testimonial.clientName.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')}
                      </div>
                    </div>
                    <div>
                      <p className="wa-testimonial-name">{testimonial.clientName}</p>
                      <p className="wa-testimonial-company">{positionCompany}</p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
