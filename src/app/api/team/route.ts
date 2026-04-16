import { NextResponse } from 'next/server';
import { readDb, writeDb, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = readDb();
    return NextResponse.json(db.teamMembers.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const db = readDb();
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
    writeDb(db);
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to create' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const db = readDb();
    const index = db.teamMembers.findIndex(m => m.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    db.teamMembers[index] = { ...db.teamMembers[index], ...body, updatedAt: new Date().toISOString() };
    writeDb(db);
    return NextResponse.json(db.teamMembers[index]);
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
    const db = readDb();
    db.teamMembers = db.teamMembers.filter(m => m.id !== id);
    writeDb(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
