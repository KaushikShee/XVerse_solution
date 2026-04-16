import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.services.sort((a, b) => a.order - b.order));
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
    const service = {
      id: generateId(),
      title: body.title || '',
      icon: body.icon || '💡',
      description: body.description || '',
      order: body.order || db.services.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.services.push(service);
    await writeDbAsync(db);
    return jsonResponse(service, 201);
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
    const index = db.services.findIndex(s => s.id === body.id);
    if (index === -1) return jsonResponse({ error: 'Not found' }, 404);
    db.services[index] = { ...db.services[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return jsonResponse(db.services[index]);
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
    db.services = db.services.filter(s => s.id !== id);
    await writeDbAsync(db);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to delete' }, 500);
  }
}
