import Link from 'next/link';
import type { HomepageContent } from '@/lib/db';

interface FooterProps {
  content?: Partial<HomepageContent>;
}

export default function Footer({ content }: FooterProps) {
  const c = {
    companyName: content?.companyName || 'XVerse Solutions',
    companyTagline: content?.companyTagline || 'Crafting exceptional digital experiences since 2020.',
    companyEmail: content?.companyEmail || 'hello@xverse.solutions',
    companyPhone: content?.companyPhone || '+91 9064158621',
    companyAddress: content?.companyAddress || 'Kolkata, India',
    copyrightText: (content?.copyrightText || '© 2026 XVerse Solutions. All rights reserved.').replace(/\b20\d{2}\b/, '2026'),
    socialLinkedin: content?.socialLinkedin || '#',
    socialGithub: content?.socialGithub || '#',
    socialTwitter: content?.socialTwitter || '#',
    socialDribbble: content?.socialDribbble || '#',
  };

  return (
    <footer className="wa-footer">
      <div className="wa-container">
        <div className="wa-footer-grid">
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <img src="/xverse-logo.png" alt="XVerse Logo" width={40} height={40} style={{ objectFit: 'contain', flexShrink: 0 }} />
              <h3 className="wa-footer-logo" style={{ margin: 0 }}>{c.companyName}</h3>
            </div>
            <p className="wa-footer-description">{c.companyTagline}</p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="wa-footer-title">Services</h4>
            <ul className="wa-footer-links">
              <li><Link href="/services">Web Development</Link></li>
              <li><Link href="/services">Mobile Apps</Link></li>
              <li><Link href="/services">UI/UX Design</Link></li>
              <li><Link href="/services">Cloud Solutions</Link></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="wa-footer-title">Company</h4>
            <ul className="wa-footer-links">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/portfolio">Portfolio</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="wa-footer-title">Contact</h4>
            <ul className="wa-footer-links">
              <li style={{ color: 'var(--wa-text-secondary)' }}>{c.companyEmail}</li>
              <li style={{ color: 'var(--wa-text-secondary)' }}>{c.companyPhone}</li>
              <li style={{ color: 'var(--wa-text-secondary)' }}>{c.companyAddress}</li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="wa-footer-bottom">
          <p className="wa-footer-copyright">{c.copyrightText}</p>
        </div>
      </div>
    </footer>
  );
}
