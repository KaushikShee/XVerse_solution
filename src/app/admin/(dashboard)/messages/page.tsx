'use client';

import { useEffect, useState } from 'react';

interface Message {
  id: string; name: string; email: string; subject: string; message: string; createdAt: string; read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => {
    const r = await fetch('/api/contact', { cache: 'no-store' });
    setMessages(await r.json());
    setLoading(false);
  };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Messages</h1>
        <p style={{ color: 'var(--wa-text-muted)' }}>Contact form submissions ({messages.length})</p>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 550, width: '100%' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Message Details</h2>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>From</span>
              <p style={{ color: 'var(--wa-text-primary)', fontWeight: 600 }}>{selected.name} ({selected.email})</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Subject</span>
              <p style={{ color: 'var(--wa-text-primary)', fontWeight: 600 }}>{selected.subject}</p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Date</span>
              <p style={{ color: 'var(--wa-text-secondary)' }}>{new Date(selected.createdAt).toLocaleString()}</p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--wa-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Message</span>
              <p style={{ color: 'var(--wa-text-secondary)', lineHeight: 1.7, marginTop: '0.5rem', background: 'var(--wa-bg-dark)', padding: '1rem', borderRadius: 8 }}>{selected.message}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>Reply via Email</a>
              <button className="admin-btn admin-btn-ghost" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ overflow: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Name</th><th>Email</th><th>Subject</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {messages.map(m => (
              <tr key={m.id} style={{ cursor: 'pointer' }} onClick={() => setSelected(m)}>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{m.name}</td>
                <td>{m.email}</td>
                <td>{m.subject}</td>
                <td>{new Date(m.createdAt).toLocaleDateString()}</td>
                <td>
                  <button className="admin-btn admin-btn-ghost" onClick={(e) => { e.stopPropagation(); setSelected(m); }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {messages.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No messages yet.</p>}
      </div>
    </div>
  );
}
