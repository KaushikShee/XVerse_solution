'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: string; clientName: string; clientPosition: string; companyName: string;
  reviewText: string; starRating: number; avatarInitials: string; avatarColor1: string; avatarColor2: string; order: number;
}

const empty: Omit<Testimonial, 'id'> = { clientName: '', clientPosition: '', companyName: '', reviewText: '', starRating: 5, avatarInitials: '', avatarColor1: '#6366f1', avatarColor2: '#8b5cf6', order: 1 };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const r = await fetch('/api/testimonials', { cache: 'no-store' }); setItems(await r.json()); setLoading(false); };
  const handleSave = async () => {
    if (!editing) return;
    const initials = editing.avatarInitials || (editing.clientName ? editing.clientName.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : '');
    const method = editing.id ? 'PUT' : 'POST';
    await fetch('/api/testimonials', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, avatarInitials: initials }) });
    setEditing(null); load();
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/testimonials?id=${id}`, { method: 'DELETE' }); load(); };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Testimonials</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Manage client testimonials</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setEditing(empty)}>+ Add Testimonial</button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{editing.id ? 'Edit' : 'Add'} Testimonial</h2>
            {[
              { label: 'Client Name', key: 'clientName' },
              { label: 'Position', key: 'clientPosition' },
              { label: 'Company', key: 'companyName' },
              { label: 'Initials', key: 'avatarInitials', placeholder: 'Auto-generated if empty' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{f.label}</label>
                <input className="admin-form-input" value={(editing as Record<string, string>)[f.key] || ''} onChange={e => setEditing({...editing, [f.key]: e.target.value})} placeholder={f.placeholder || ''} />
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Review Text</label>
              <textarea className="admin-form-textarea" value={editing.reviewText || ''} onChange={e => setEditing({...editing, reviewText: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Star Rating (1-5)</label>
              <input className="admin-form-input" type="number" min="1" max="5" value={editing.starRating || 5} onChange={e => setEditing({...editing, starRating: parseInt(e.target.value)})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {['avatarColor1', 'avatarColor2'].map(k => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{k.includes('1') ? 'Color 1' : 'Color 2'}</label>
                  <input type="color" value={(editing as Record<string, string>)[k] || '#6366f1'} onChange={e => setEditing({...editing, [k]: e.target.value})} style={{ width: '100%', height: 40, background: 'transparent', border: '1px solid var(--wa-border)', borderRadius: 8, cursor: 'pointer' }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="admin-btn admin-btn-primary" onClick={handleSave}>Save</button>
              <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ overflow: 'auto' }}>
        <table className="admin-table">
          <thead><tr><th>Client</th><th>Company</th><th>Rating</th><th>Review</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{t.clientName}</td>
                <td>{t.companyName}</td>
                <td style={{ color: '#fbbf24' }}>{'★'.repeat(t.starRating)}</td>
                <td style={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.reviewText}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(t)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(t.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No testimonials yet.</p>}
      </div>
    </div>
  );
}
