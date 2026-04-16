'use client';

import { useEffect, useState } from 'react';

export default function AdminHomepagePage() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => { load(); }, []);

  const load = async () => {
    const r = await fetch('/api/homepage', { cache: 'no-store' });
    setContent(await r.json());
    setLoading(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/homepage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  const sections = [
    {
      title: '🎯 Hero Section', fields: [
        { key: 'heroBadge', label: 'Badge Text' },
        { key: 'heroTitle', label: 'Hero Title' },
        { key: 'heroSubtitle', label: 'Subtitle', textarea: true },
        { key: 'heroBtn1Text', label: 'Button 1 Text' },
        { key: 'heroBtn1Link', label: 'Button 1 Link' },
        { key: 'heroBtn2Text', label: 'Button 2 Text' },
        { key: 'heroBtn2Link', label: 'Button 2 Link' },
        { key: 'heroTech', label: 'Tech Stack Text' },
      ]
    },
    {
      title: '📊 Stats', fields: [
        { key: 'stat1Number', label: 'Stat 1 Number' }, { key: 'stat1Suffix', label: 'Stat 1 Suffix' }, { key: 'stat1Label', label: 'Stat 1 Label' },
        { key: 'stat2Number', label: 'Stat 2 Number' }, { key: 'stat2Suffix', label: 'Stat 2 Suffix' }, { key: 'stat2Label', label: 'Stat 2 Label' },
        { key: 'stat3Number', label: 'Stat 3 Number' }, { key: 'stat3Suffix', label: 'Stat 3 Suffix' }, { key: 'stat3Label', label: 'Stat 3 Label' },
        { key: 'stat4Number', label: 'Stat 4 Number' }, { key: 'stat4Suffix', label: 'Stat 4 Suffix' }, { key: 'stat4Label', label: 'Stat 4 Label' },
      ]
    },
    {
      title: '📌 Section Headers', fields: [
        { key: 'servicesLabel', label: 'Services Label' }, { key: 'servicesTitle', label: 'Services Title' }, { key: 'servicesDescription', label: 'Services Description', textarea: true },
        { key: 'projectsLabel', label: 'Projects Label' }, { key: 'projectsTitle', label: 'Projects Title' }, { key: 'projectsDescription', label: 'Projects Description', textarea: true },
        { key: 'teamLabel', label: 'Team Label' }, { key: 'teamTitle', label: 'Team Title' }, { key: 'teamDescription', label: 'Team Description', textarea: true },
        { key: 'testimonialsLabel', label: 'Testimonials Label' }, { key: 'testimonialsTitle', label: 'Testimonials Title' }, { key: 'testimonialsDescription', label: 'Testimonials Description', textarea: true },
      ]
    },
    {
      title: '📢 CTA Section', fields: [
        { key: 'ctaHeading', label: 'CTA Heading' },
        { key: 'ctaDescription', label: 'CTA Description', textarea: true },
        { key: 'ctaButtonText', label: 'CTA Button Text' },
      ]
    },
    {
      title: '🏢 Company Info', fields: [
        { key: 'companyName', label: 'Company Name' },
        { key: 'companyTagline', label: 'Tagline', textarea: true },
        { key: 'companyEmail', label: 'Email' },
        { key: 'companyPhone', label: 'Phone' },
        { key: 'companyAddress', label: 'Address' },
        { key: 'copyrightText', label: 'Copyright' },
        { key: 'socialLinkedin', label: 'LinkedIn URL' },
        { key: 'socialGithub', label: 'GitHub URL' },
        { key: 'socialTwitter', label: 'Twitter URL' },
        { key: 'socialDribbble', label: 'Dribbble URL' },
      ]
    },
    {
      title: '📄 About Page', fields: [
        { key: 'aboutIntro', label: 'Introduction', textarea: true },
        { key: 'aboutMission', label: 'Mission', textarea: true },
        { key: 'aboutVision', label: 'Vision', textarea: true },
      ]
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Homepage Content</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Edit all website content from one place</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving} style={{ opacity: saving ? 0.7 : 1 }}>
          {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save All Changes'}
        </button>
      </div>

      {saved && (
        <div style={{ padding: '0.75rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 8, marginBottom: '1.5rem', color: '#10b981', fontSize: '0.875rem' }}>
          Changes saved successfully!
        </div>
      )}

      {sections.map(section => (
        <div key={section.title} className="admin-card" style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1.5rem' }}>{section.title}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {section.fields.map(field => (
              <div key={field.key}>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {field.label}
                </label>
                {field.textarea ? (
                  <textarea
                    className="admin-form-textarea"
                    value={content[field.key] || ''}
                    onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                    style={{ minHeight: 80 }}
                  />
                ) : (
                  <input
                    className="admin-form-input"
                    value={content[field.key] || ''}
                    onChange={e => setContent({ ...content, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
