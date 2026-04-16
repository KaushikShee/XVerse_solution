'use client';

import { useEffect, useState } from 'react';

interface Stats {
  services: number;
  projects: number;
  team: number;
  testimonials: number;
  blogPosts: number;
  messages: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ services: 0, projects: 0, team: 0, testimonials: 0, blogPosts: 0, messages: 0 });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [services, projects, team, testimonials, blog, messages] = await Promise.all([
        fetch('/api/services', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/projects', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/team', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/testimonials', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/blog', { cache: 'no-store' }).then(r => r.json()),
        fetch('/api/contact', { cache: 'no-store' }).then(r => r.json()),
      ]);
      setStats({
        services: services.length || 0,
        projects: projects.length || 0,
        team: team.length || 0,
        testimonials: testimonials.length || 0,
        blogPosts: blog.length || 0,
        messages: messages.length || 0,
      });
    } catch (err) {
      console.error('Failed to load stats:', err);
    }
  };

  const statCards = [
    { label: 'Services', value: stats.services, icon: '🛠️', color: '#6366f1' },
    { label: 'Projects', value: stats.projects, icon: '💼', color: '#8b5cf6' },
    { label: 'Team Members', value: stats.team, icon: '👥', color: '#22d3ee' },
    { label: 'Testimonials', value: stats.testimonials, icon: '⭐', color: '#f472b6' },
    { label: 'Blog Posts', value: stats.blogPosts, icon: '📝', color: '#10b981' },
    { label: 'Messages', value: stats.messages, icon: '📬', color: '#fbbf24' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Dashboard</h1>
        <p style={{ color: 'var(--wa-text-muted)' }}>Welcome to XVerse admin panel. Manage all your website content from here.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((card) => (
          <div key={card.label} className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.5rem' }}>{card.icon}</span>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: card.color }} />
            </div>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--wa-text-primary)', lineHeight: 1 }}>
              {card.value}
            </p>
            <p style={{ color: 'var(--wa-text-muted)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {card.label}
            </p>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Quick Actions</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <a href="/admin/services" className="admin-btn admin-btn-primary">+ Add Service</a>
          <a href="/admin/projects" className="admin-btn admin-btn-primary">+ Add Project</a>
          <a href="/admin/team" className="admin-btn admin-btn-primary">+ Add Team Member</a>
          <a href="/admin/blog" className="admin-btn admin-btn-primary">+ Write Blog Post</a>
          <a href="/" target="_blank" className="admin-btn admin-btn-ghost">View Website →</a>
        </div>
      </div>
    </div>
  );
}
