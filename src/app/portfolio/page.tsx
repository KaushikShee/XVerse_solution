import { readDbAsync } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | XVerse Solutions',
  description: 'Explore our portfolio of exceptional digital products — fintech, healthcare, e-commerce, and travel applications.',
};

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
  const db = await readDbAsync();
  const { homepageContent, projects } = db;

  return (
    <>
      <Header companyName={homepageContent.companyName} />
      <main>
        <section className="wa-page-banner">
          <div className="wa-container">
            <h1>Our <span className="wa-gradient-text">Portfolio</span></h1>
            <p>Innovation, design excellence, and technical expertise in every project</p>
          </div>
        </section>

        <section className="wa-section wa-section-dark">
          <div className="wa-container">
            <div className="wa-projects-grid">
              {projects.sort((a, b) => a.order - b.order).map((project, index) => {
                return (
                  <RevealOnScroll key={project.id} delay={Math.min(index + 1, 4)}>
                    <div className="wa-project-card">
                      <div
                        className="wa-project-image-wrapper"
                        style={{
                          background: `linear-gradient(135deg, ${project.bgColor1} 0%, ${project.bgColor2} 100%)`,
                        }}
                      >
                      </div>
                      <div className="wa-project-overlay">
                        <p className="wa-project-category">{project.category}</p>
                        <h3 className="wa-project-title">{project.title}</h3>
                        <p style={{ fontSize: '0.9rem', color: 'var(--wa-text-secondary)', marginBottom: '0.75rem' }}>
                          {project.description}
                        </p>
                        <div className="wa-project-tags">
                          {project.tags.map((tag, ti) => (
                            <span key={ti} className="wa-project-tag">{tag}</span>
                          ))}
                        </div>
                        {project.liveLink && project.liveLink !== '#' && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              marginTop: '0.75rem',
                              display: 'inline-block',
                              color: 'var(--wa-accent)',
                              fontSize: '0.85rem',
                              fontWeight: 500,
                              textDecoration: 'underline',
                              textUnderlineOffset: '3px',
                            }}
                          >
                            View Live
                          </a>
                        )}
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer content={homepageContent} />
    </>
  );
}
