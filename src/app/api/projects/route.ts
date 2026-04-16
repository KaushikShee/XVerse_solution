import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.projects.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to fetch' }, 500);
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) return jsonResponse({ error: 'Unauthorized' }, 401);
    const body = await request.json();
    const db = await readDbAsync();
    const project = {
      id: generateId(),
      title: body.title || '',
      category: body.category || '',
      description: body.description || '',
      tags: Array.isArray(body.tags) ? body.tags : (body.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      bgColor1: body.bgColor1 || '#1a1a2e',
      bgColor2: body.bgColor2 || '#16213e',
      iconColor: body.iconColor || '#6366f1',
      liveLink: body.liveLink || '#',
      order: body.order || db.projects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.projects.push(project);
    await writeDbAsync(db);
    return jsonResponse(project, 201);
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to create' }, 500);
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) return jsonResponse({ error: 'Unauthorized' }, 401);
    const body = await request.json();
    const db = await readDbAsync();
    const index = db.projects.findIndex(p => p.id === body.id);
    if (index === -1) return jsonResponse({ error: 'Not found' }, 404);
    if (typeof body.tags === 'string') {
      body.tags = body.tags.split(',').map((t: string) => t.trim()).filter(Boolean);
    }
    db.projects[index] = { ...db.projects[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return jsonResponse(db.projects[index]);
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to update' }, 500);
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAuthenticated())) return jsonResponse({ error: 'Unauthorized' }, 401);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return jsonResponse({ error: 'ID required' }, 400);
    const db = await readDbAsync();
    db.projects = db.projects.filter(p => p.id !== id);
    await writeDbAsync(db);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to delete' }, 500);
  }
}
