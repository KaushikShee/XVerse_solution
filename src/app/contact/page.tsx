'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RevealOnScroll from '@/components/RevealOnScroll';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setStatusMessage(data.message || 'Message sent successfully!');
        setForm({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setStatusMessage(data.error || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <Header />
      <main>
        <section className="wa-page-banner">
          <div className="wa-container">
            <h1>Get in <span className="wa-gradient-text">Touch</span></h1>
            <p>Let&apos;s discuss your project and bring your ideas to life</p>
          </div>
        </section>

        <section className="wa-section wa-section-dark">
          <div className="wa-container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', maxWidth: 1000, margin: '0 auto' }}>
              {/* Contact Form */}
              <RevealOnScroll>
                <div className="admin-card" style={{ padding: '2.5rem' }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Send us a Message</h2>

                  {status === 'success' && (
                    <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 8, marginBottom: '1.5rem', color: '#10b981' }}>
                      {statusMessage}
                    </div>
                  )}

                  {status === 'error' && (
                    <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: 8, marginBottom: '1.5rem', color: '#ef4444' }}>
                      {statusMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit}>
                    <div className="wa-form-group">
                      <label className="wa-form-label">Name</label>
                      <input
                        type="text"
                        className="wa-form-input"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        required
                        placeholder="Your name"
                      />
                    </div>
                    <div className="wa-form-group">
                      <label className="wa-form-label">Email</label>
                      <input
                        type="email"
                        className="wa-form-input"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="wa-form-group">
                      <label className="wa-form-label">Subject</label>
                      <input
                        type="text"
                        className="wa-form-input"
                        value={form.subject}
                        onChange={e => setForm({ ...form, subject: e.target.value })}
                        required
                        placeholder="Project inquiry"
                      />
                    </div>
                    <div className="wa-form-group">
                      <label className="wa-form-label">Message</label>
                      <textarea
                        className="wa-form-textarea"
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        required
                        placeholder="Tell us about your project..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="wa-btn-primary"
                      disabled={status === 'loading'}
                      style={{ width: '100%', textAlign: 'center', opacity: status === 'loading' ? 0.7 : 1 }}
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </RevealOnScroll>

              {/* Contact Info */}
              <RevealOnScroll delay={2}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="admin-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 45, height: 45, background: 'var(--wa-gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Mail size={20} color="white" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Email</h3>
                        <p style={{ color: 'var(--wa-text-secondary)' }}>hello@xverse.solutions</p>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 45, height: 45, background: 'var(--wa-gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Phone size={20} color="white" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Phone</h3>
                        <p style={{ color: 'var(--wa-text-secondary)' }}>+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 45, height: 45, background: 'var(--wa-gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <MapPin size={20} color="white" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Location</h3>
                        <p style={{ color: 'var(--wa-text-secondary)' }}>San Francisco, CA</p>
                      </div>
                    </div>
                  </div>

                  <div className="admin-card" style={{ padding: '2rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div style={{ width: 45, height: 45, background: 'var(--wa-gradient-primary)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Clock size={20} color="white" />
                      </div>
                      <div>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>Business Hours</h3>
                        <p style={{ color: 'var(--wa-text-secondary)' }}>Mon - Fri: 9:00 AM - 6:00 PM PST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
