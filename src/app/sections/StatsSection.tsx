import AnimatedCounter from '@/components/AnimatedCounter';
import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent } from '@/lib/db';

interface Props {
  content: HomepageContent;
}

export default function StatsSection({ content }: Props) {
  const stats = [
    { number: parseInt(content.stat1Number) || 150, suffix: content.stat1Suffix, label: content.stat1Label },
    { number: parseInt(content.stat2Number) || 80, suffix: content.stat2Suffix, label: content.stat2Label },
    { number: parseInt(content.stat3Number) || 25, suffix: content.stat3Suffix, label: content.stat3Label },
    { number: parseInt(content.stat4Number) || 4, suffix: content.stat4Suffix, label: content.stat4Label },
  ];

  return (
    <section className="wa-section wa-section-dark" id="stats-section">
      <div className="wa-container">
        <RevealOnScroll>
          <div className="wa-stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="wa-stat-item" style={{ padding: '2rem' }}>
                <p className="wa-stat-number">
                  <AnimatedCounter target={stat.number} suffix={stat.suffix} />
                </p>
                <p className="wa-stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
