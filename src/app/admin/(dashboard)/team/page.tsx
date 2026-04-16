'use client';

import { useEffect, useState } from 'react';

interface TeamMember {
  id: string; name: string; role: string; bio: string; initials: string;
  color1: string; color2: string; linkedin: string; github: string; twitter: string; order: number;
}

const empty: Omit<TeamMember, 'id'> = { name: '', role: '', bio: '', initials: '', color1: '#6366f1', color2: '#8b5cf6', linkedin: '', github: '', twitter: '', order: 1 };

export default function AdminTeamPage() {
  const [items, setItems] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState<Partial<TeamMember> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const r = await fetch('/api/team'); setItems(await r.json()); setLoading(false); };
  const handleSave = async () => {
    if (!editing) return;
    const initials = editing.initials || (editing.name ? editing.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : '');
    const method = editing.id ? 'PUT' : 'POST';
    await fetch('/api/team', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, initials }) });
    setEditing(null); load();
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/team?id=${id}`, { method: 'DELETE' }); load(); };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Team Members</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Manage your team</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setEditing(empty)}>+ Add Member</button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{editing.id ? 'Edit' : 'Add'} Team Member</h2>
            {[
              { label: 'Name', key: 'name' },
              { label: 'Role', key: 'role' },
              { label: 'Initials', key: 'initials', placeholder: 'Auto-generated if empty' },
              { label: 'LinkedIn URL', key: 'linkedin' },
              { label: 'GitHub URL', key: 'github' },
              { label: 'Twitter URL', key: 'twitter' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{f.label}</label>
                <input className="admin-form-input" value={(editing as Record<string, string>)[f.key] || ''} onChange={e => setEditing({...editing, [f.key]: e.target.value})} placeholder={f.placeholder || ''} />
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Bio</label>
              <textarea className="admin-form-textarea" value={editing.bio || ''} onChange={e => setEditing({...editing, bio: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {['color1', 'color2'].map(k => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Avatar {k === 'color1' ? 'Color 1' : 'Color 2'}</label>
                  <input type="color" value={(editing as Record<string, string>)[k] || '#6366f1'} onChange={e => setEditing({...editing, [k]: e.target.value})} style={{ width: '100%', height: 40, background: 'transparent', border: '1px solid var(--wa-border)', borderRadius: 8, cursor: 'pointer' }} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Order</label>
              <input className="admin-form-input" type="number" value={editing.order || 1} onChange={e => setEditing({...editing, order: parseInt(e.target.value)})} />
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
          <thead><tr><th>Avatar</th><th>Name</th><th>Role</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(m => (
              <tr key={m.id}>
                <td>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: `linear-gradient(135deg, ${m.color1}, ${m.color2})`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '0.875rem' }}>
                    {m.initials}
                  </div>
                </td>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{m.name}</td>
                <td>{m.role}</td>
                <td>{m.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(m)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(m.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No team members yet.</p>}
      </div>
    </div>
  );
}
