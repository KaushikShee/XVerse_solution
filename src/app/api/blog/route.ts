import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.blogPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
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
    const post = {
      id: generateId(),
      title: body.title || '',
      slug: body.slug || body.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || '',
      excerpt: body.excerpt || '',
      content: body.content || '',
      author: body.author || 'Admin',
      status: body.status || 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.blogPosts.push(post);
    await writeDbAsync(db);
    return jsonResponse(post, 201);
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
    const index = db.blogPosts.findIndex(p => p.id === body.id);
    if (index === -1) return jsonResponse({ error: 'Not found' }, 404);
    db.blogPosts[index] = { ...db.blogPosts[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return jsonResponse(db.blogPosts[index]);
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
    db.blogPosts = db.blogPosts.filter(p => p.id !== id);
    await writeDbAsync(db);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to delete' }, 500);
  }
}
