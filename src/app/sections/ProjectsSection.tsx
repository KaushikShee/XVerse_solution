import RevealOnScroll from '@/components/RevealOnScroll';
import type { HomepageContent, Project } from '@/lib/db';

interface Props {
  content: HomepageContent;
  projects: Project[];
}

export default function ProjectsSection({ content, projects }: Props) {
  return (
    <section className="wa-section wa-section-lighter" id="portfolio-section" style={{ paddingTop: 0 }}>
      <div className="wa-container">
        <RevealOnScroll>
          <div className="wa-section-header">
            <p className="wa-section-label">{content.projectsLabel}</p>
            <h2 className="wa-section-title">
              {content.projectsTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="wa-gradient-text">{content.projectsTitle.split(' ').slice(-1)}</span>
            </h2>
            <p className="wa-section-description">{content.projectsDescription}</p>
          </div>
        </RevealOnScroll>

        <div className="wa-projects-grid">
          {projects.sort((a, b) => a.order - b.order).map((project, index) => {
            const initials = project.title.substring(0, 2).toUpperCase();
            return (
              <RevealOnScroll key={project.id} delay={Math.min(index + 1, 4)}>
                <div className="wa-project-card">
                  <div
                    className="wa-project-image-wrapper"
                    style={{
                      background: `linear-gradient(135deg, ${project.bgColor1} 0%, ${project.bgColor2} 100%)`,
                    }}
                  >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                      <rect x="20" y="30" width="80" height="60" rx="8" stroke={project.iconColor} strokeWidth="2"/>
                      <text x="60" y="68" textAnchor="middle" fill={project.iconColor} fontSize="20" fontWeight="bold">{initials}</text>
                    </svg>
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
  );
}
