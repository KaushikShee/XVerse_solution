'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  companyName?: string;
}

export default function Header({ companyName = 'XVerse Solutions' }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`wa-header ${scrolled ? 'scrolled' : ''}`} id="main-header">
        <div className="wa-nav-container">
          <Link href="/" className="wa-nav-brand">
            <div className="wa-logo-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L19 19" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                <path d="M19 5L5 19" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.85"/>
              </svg>
            </div>
            <span className="wa-site-title">{companyName}</span>
          </Link>

          <nav className="wa-nav-desktop">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`wa-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/contact" className="wa-nav-cta">
              Start Project
            </Link>
          </nav>

          <button
            className="wa-mobile-toggle"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`wa-mobile-menu ${mobileOpen ? 'is-open' : ''}`}>
        <div className="wa-mobile-header">
          <div className="wa-nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="wa-logo-icon" style={{ width: 36, height: 36, background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L19 19" stroke="white" strokeWidth="2.8" strokeLinecap="round"/>
                <path d="M19 5L5 19" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeOpacity="0.85"/>
              </svg>
            </div>
            <span style={{ fontWeight: 700, color: '#f8fafc' }}>{companyName}</span>
          </div>
          <button
            className="wa-mobile-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="wa-mobile-menu-content">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="wa-mobile-link"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="wa-mobile-cta"
            onClick={() => setMobileOpen(false)}
          >
            Start a Project
          </Link>
        </div>
      </div>
    </>
  );
}
