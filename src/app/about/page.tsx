import { readDbAsync } from '@/lib/db';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | XVerse Solutions',
  description: 'Learn about XVerse Solutions — our mission, vision, and the talented team behind our exceptional digital products.',
};

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const db = await readDbAsync();
  const { homepageContent, teamMembers } = db;

  return (
    <>
      <Header companyName={homepageContent.companyName} />
      <main>
        {/* Page Banner */}
        <section className="wa-page-banner">
          <div className="wa-container">
            <h1>About <span className="wa-gradient-text">Us</span></h1>
            <p>The passionate team behind your next digital masterpiece</p>
          </div>
        </section>

        {/* About Content */}
        <section className="wa-section wa-section-dark">
          <div className="wa-container">
            <div style={{ maxWidth: 800, margin: '0 auto' }}>
              <RevealOnScroll>
                <div className="admin-card" style={{ marginBottom: '2rem', padding: '2.5rem' }}>
                  <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.5rem' }}>
                    Who We <span className="wa-gradient-text">Are</span>
                  </h2>
                  <p style={{ lineHeight: 1.8, fontSize: '1.0625rem' }}>{homepageContent.aboutIntro}</p>
                </div>
              </RevealOnScroll>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                <RevealOnScroll delay={1}>
                  <div className="admin-card" style={{ padding: '2.5rem', height: '100%' }}>
                    <div style={{ width: 50, height: 50, background: 'var(--wa-gradient-primary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                      🎯
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Our Mission</h3>
                    <p style={{ lineHeight: 1.7 }}>{homepageContent.aboutMission}</p>
                  </div>
                </RevealOnScroll>

                <RevealOnScroll delay={2}>
                  <div className="admin-card" style={{ padding: '2.5rem', height: '100%' }}>
                    <div style={{ width: 50, height: 50, background: 'var(--wa-gradient-primary)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                      🔭
                    </div>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Our Vision</h3>
                    <p style={{ lineHeight: 1.7 }}>{homepageContent.aboutVision}</p>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="wa-section wa-section-lighter" id="team-section">
          <div className="wa-container">
            <RevealOnScroll>
              <div className="wa-section-header">
                <p className="wa-section-label">{homepageContent.teamLabel}</p>
                <h2 className="wa-section-title">
                  Meet the <span className="wa-gradient-text">Experts</span>
                </h2>
                <p className="wa-section-description">{homepageContent.teamDescription}</p>
              </div>
            </RevealOnScroll>

            <div className="wa-team-grid">
              {teamMembers.sort((a, b) => a.order - b.order).map((member, index) => (
                <RevealOnScroll key={member.id} delay={Math.min(index + 1, 4)}>
                  <div className="wa-team-card">
                    <div className="wa-team-avatar">
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          background: `linear-gradient(135deg, ${member.color1} 0%, ${member.color2} 100%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2.5rem',
                          color: 'white',
                        }}
                      >
                        {member.initials}
                      </div>
                    </div>
                    <h3 className="wa-team-name">{member.name}</h3>
                    <p className="wa-team-role">{member.role}</p>
                    <p className="wa-team-bio">{member.bio}</p>
                    <div className="wa-team-social">
                      {member.linkedin && (
                        <a href={member.linkedin} aria-label="LinkedIn">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                        </a>
                      )}
                      {member.github && (
                        <a href={member.github} aria-label="GitHub">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} aria-label="Twitter">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer content={homepageContent} />
    </>
  );
}
