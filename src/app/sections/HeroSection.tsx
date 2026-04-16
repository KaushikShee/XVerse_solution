import type { HomepageContent } from '@/lib/db';
import Link from 'next/link';

interface Props {
  content: HomepageContent;
}

export default function HeroSection({ content }: Props) {
  return (
    <section className="wa-hero" id="hero-section">
      {/* Floating Elements */}
      <div className="wa-floating-element wa-floating-element--1">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <rect width="60" height="60" rx="12" fill="url(#g1)" fillOpacity="0.3"/>
          <defs><linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#6366f1"/><stop offset="100%" stopColor="#22d3ee"/></linearGradient></defs>
        </svg>
      </div>
      <div className="wa-floating-element wa-floating-element--2">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="40" fill="url(#g2)" fillOpacity="0.2"/>
          <defs><linearGradient id="g2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#8b5cf6"/><stop offset="100%" stopColor="#f472b6"/></linearGradient></defs>
        </svg>
      </div>
      <div className="wa-floating-element wa-floating-element--3">
        <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
          <polygon points="25,5 45,40 5,40" fill="url(#g3)" fillOpacity="0.25"/>
          <defs><linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#22d3ee"/><stop offset="100%" stopColor="#6366f1"/></linearGradient></defs>
        </svg>
      </div>

      <div className="wa-hero-content">
        {/* Badge */}
        <p className="wa-hero-badge">{content.heroBadge}</p>

        {/* Title */}
        <h1 className="wa-hero-title">
          {content.heroTitle.split(' ').map((word, i, arr) => {
            if (i >= arr.length - 2) {
              return <span key={i} className="wa-gradient-text">{word}{i < arr.length - 1 ? ' ' : ''}</span>;
            }
            return word + ' ';
          })}
        </h1>

        {/* Subtitle */}
        <p className="wa-hero-subtitle">{content.heroSubtitle}</p>

        {/* CTA Buttons */}
        <div className="wa-hero-buttons">
          <Link href={content.heroBtn1Link} className="wa-btn-primary">
            {content.heroBtn1Text}
          </Link>
          <Link href={content.heroBtn2Link} className="wa-btn-outline">
            {content.heroBtn2Text}
          </Link>
        </div>

        {/* Tech */}
        <p className="wa-hero-tech">{content.heroTech}</p>
      </div>
    </section>
  );
}
