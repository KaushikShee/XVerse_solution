'use client';

import { useEffect, useState } from 'react';

interface BlogPost {
  id: string; title: string; slug: string; excerpt: string; content: string; author: string; status: string; createdAt: string;
}

const empty = { title: '', slug: '', excerpt: '', content: '', author: 'Admin', status: 'draft' };

export default function AdminBlogPage() {
  const [items, setItems] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { load(); }, []);
  const load = async () => { const r = await fetch('/api/blog'); setItems(await r.json()); setLoading(false); };
  const handleSave = async () => {
    if (!editing) return;
    const slug = editing.slug || editing.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '';
    const method = editing.id ? 'PUT' : 'POST';
    await fetch('/api/blog', { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...editing, slug }) });
    setEditing(null); load();
  };
  const handleDelete = async (id: string) => { if (!confirm('Delete?')) return; await fetch(`/api/blog?id=${id}`, { method: 'DELETE' }); load(); };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Blog Posts</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Create and manage blog articles</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setEditing(empty)}>+ New Post</button>
      </div>

      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 650, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>{editing.id ? 'Edit' : 'New'} Blog Post</h2>
            {[
              { label: 'Title', key: 'title' },
              { label: 'Slug (auto-generated)', key: 'slug' },
              { label: 'Author', key: 'author' },
            ].map(f => (
              <div key={f.key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>{f.label}</label>
                <input className="admin-form-input" value={(editing as Record<string, string>)[f.key] || ''} onChange={e => setEditing({...editing, [f.key]: e.target.value})} />
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Excerpt</label>
              <textarea className="admin-form-textarea" style={{ minHeight: 60 }} value={editing.excerpt || ''} onChange={e => setEditing({...editing, excerpt: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Content (HTML)</label>
              <textarea className="admin-form-textarea" style={{ minHeight: 200 }} value={editing.content || ''} onChange={e => setEditing({...editing, content: e.target.value})} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Status</label>
              <select className="admin-form-select" value={editing.status || 'draft'} onChange={e => setEditing({...editing, status: e.target.value})}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
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
          <thead><tr><th>Title</th><th>Author</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
          <tbody>
            {items.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{p.title}</td>
                <td>{p.author}</td>
                <td>
                  <span style={{
                    padding: '0.25rem 0.75rem', borderRadius: 20, fontSize: '0.75rem', fontWeight: 600,
                    background: p.status === 'published' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(251, 191, 36, 0.1)',
                    color: p.status === 'published' ? '#10b981' : '#fbbf24',
                    border: `1px solid ${p.status === 'published' ? 'rgba(16, 185, 129, 0.3)' : 'rgba(251, 191, 36, 0.3)'}`,
                  }}>
                    {p.status}
                  </span>
                </td>
                <td>{new Date(p.createdAt).toLocaleDateString()}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(p)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {items.length === 0 && <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No blog posts yet.</p>}
      </div>
    </div>
  );
}
