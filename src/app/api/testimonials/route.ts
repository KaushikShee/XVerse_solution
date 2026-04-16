import { NextResponse } from 'next/server';
import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = await readDbAsync();
    return NextResponse.json(db.testimonials.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const db = await readDbAsync();
    const index = db.testimonials.findIndex(t => t.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    db.testimonials[index] = { ...db.testimonials[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return NextResponse.json(db.testimonials[index]);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const db = await readDbAsync();
    db.testimonials = db.testimonials.filter(t => t.id !== id);
    await writeDbAsync(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
