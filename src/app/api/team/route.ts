import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.teamMembers.sort((a, b) => a.order - b.order));
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
    const member = {
      id: generateId(),
      name: body.name || '',
      role: body.role || '',
      bio: body.bio || '',
      initials: body.initials || (body.name ? body.name.split(' ').map((w: string) => w[0]).join('').toUpperCase().slice(0, 2) : ''),
      color1: body.color1 || '#6366f1',
      color2: body.color2 || '#8b5cf6',
      linkedin: body.linkedin || '',
      github: body.github || '',
      twitter: body.twitter || '',
      order: body.order || db.teamMembers.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.teamMembers.push(member);
    await writeDbAsync(db);
    return jsonResponse(member, 201);
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
    const index = db.teamMembers.findIndex(m => m.id === body.id);
    if (index === -1) return jsonResponse({ error: 'Not found' }, 404);
    db.teamMembers[index] = { ...db.teamMembers[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return jsonResponse(db.teamMembers[index]);
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
    db.teamMembers = db.teamMembers.filter(m => m.id !== id);
    await writeDbAsync(db);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to delete' }, 500);
  }
}
