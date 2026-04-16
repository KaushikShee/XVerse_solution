import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.testimonials.sort((a, b) => a.order - b.order));
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
    const testimonial = {
      id: generateId(),
      clientName: body.clientName || '',
      clientPosition: body.clientPosition || '',
      companyName: body.companyName || '',
      reviewText: body.reviewText || '',
      starRating: body.starRating || 5,
      avatarInitials: body.avatarInitials || '',
      avatarColor1: body.avatarColor1 || '#6366f1',
      avatarColor2: body.avatarColor2 || '#8b5cf6',
      order: body.order || db.testimonials.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.testimonials.push(testimonial);
    await writeDbAsync(db);
    return jsonResponse(testimonial, 201);
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
    const index = db.testimonials.findIndex(t => t.id === body.id);
    if (index === -1) return jsonResponse({ error: 'Not found' }, 404);
    db.testimonials[index] = { ...db.testimonials[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return jsonResponse(db.testimonials[index]);
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
    db.testimonials = db.testimonials.filter(t => t.id !== id);
    await writeDbAsync(db);
    return jsonResponse({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to delete' }, 500);
  }
}
