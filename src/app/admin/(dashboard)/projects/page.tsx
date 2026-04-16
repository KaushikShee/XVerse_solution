'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string; title: string; category: string; description: string; tags: string[];
  bgColor1: string; bgColor2: string; iconColor: string; liveLink: string; order: number;
}

const empty: Omit<Project, 'id'> = { title: '', category: '', description: '', tags: [], bgColor1: '#1a1a2e', bgColor2: '#16213e', iconColor: '#6366f1', liveLink: '', order: 1 };

export default function AdminProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [editing, setEditing] = useState<Partial<Project> & { tagsStr?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);

  const load = async () => { const r = await fetch('/api/projects', { cache: 'no-store' }); setItems(await r.json()); setLoading(false); };

  const handleSave = async () => {
    if (!editing) return;
    const tags = editing.tagsStr ? editing.tagsStr.split(',').map((t: string) => t.trim()).filter(Boolean) : editing.tags || [];
    const method = editing.id ? 'PUT' : 'POST';
    await fetch('/api/projects', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, tags }) });
    setEditing(null); load();
  };

  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/projects?id=${id}`, { method: 'DELETE' }); load(); };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Projects</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Manage your portfolio projects</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setEditing({ ...empty, tagsStr: '' })}>+ Add Project</button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 550, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{editing.id ? 'Edit' : 'Add'} Project</h2>
            {[
              { label: 'Title', key: 'title', type: 'text' },
              { label: 'Category', key: 'category', type: 'text' },
              { label: 'Tags (comma-separated)', key: 'tagsStr', type: 'text', placeholder: 'React, Node.js, AWS' },
              { label: 'Live Link', key: 'liveLink', type: 'text' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{f.label}</label>
                <input className="admin-form-input" value={(editing as Record<string, string>)[f.key] || ''} onChange={e => setEditing({...editing, [f.key]: e.target.value})} placeholder={f.placeholder || ''} />
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Description</label>
              <textarea className="admin-form-textarea" value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
              {['bgColor1', 'bgColor2', 'iconColor'].map(k => (
                <div key={k}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{k}</label>
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
          <thead><tr><th>Title</th><th>Category</th><th>Tags</th><th>Order</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{item.title}</td>
                <td>{item.category}</td>
                <td>{item.tags.join(', ')}</td>
                <td>{item.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setEditing({ ...item, tagsStr: item.tags.join(', ') })}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No projects yet.</p>}
      </div>
    </div>
  );
}
