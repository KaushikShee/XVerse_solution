'use client';

import { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  order: number;
}

const emptyService: Omit<Service, 'id'> = { title: '', icon: '💻', description: '', order: 1 };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [editing, setEditing] = useState<Partial<Service> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadServices(); }, []);

  const loadServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    setServices(data);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const method = editing.id ? 'PUT' : 'POST';
    await fetch('/api/services', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setEditing(null);
    loadServices();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    loadServices();
  };

  if (loading) return <p style={{ color: 'var(--wa-text-muted)' }}>Loading...</p>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.25rem' }}>Services</h1>
          <p style={{ color: 'var(--wa-text-muted)' }}>Manage your service offerings</p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setEditing(emptyService)}>
          + Add Service
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ maxWidth: 500, width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>
              {editing.id ? 'Edit Service' : 'Add Service'}
            </h2>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Title</label>
              <input className="admin-form-input" value={editing.title || ''} onChange={e => setEditing({...editing, title: e.target.value})} placeholder="Service title" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Icon (Emoji)</label>
              <input className="admin-form-input" value={editing.icon || ''} onChange={e => setEditing({...editing, icon: e.target.value})} placeholder="💻" />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--wa-text-primary)' }}>Description</label>
              <textarea className="admin-form-textarea" value={editing.description || ''} onChange={e => setEditing({...editing, description: e.target.value})} placeholder="Service description..." />
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

      {/* Table */}
      <div className="admin-card" style={{ overflow: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Icon</th>
              <th>Title</th>
              <th>Description</th>
              <th>Order</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td style={{ fontSize: '1.5rem' }}>{service.icon}</td>
                <td style={{ fontWeight: 600, color: 'var(--wa-text-primary)' }}>{service.title}</td>
                <td style={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{service.description}</td>
                <td>{service.order}</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="admin-btn admin-btn-ghost" onClick={() => setEditing(service)}>Edit</button>
                    <button className="admin-btn admin-btn-danger" onClick={() => handleDelete(service.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {services.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--wa-text-muted)' }}>No services yet.</p>
        )}
      </div>
    </div>
  );
}
