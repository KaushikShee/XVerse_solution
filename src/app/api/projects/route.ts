import { NextResponse } from 'next/server';
import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = await readDbAsync();
    return NextResponse.json(db.projects.sort((a, b) => a.order - b.order));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = await readDbAsync();
    const project = {
      id: generateId(),
      title: body.title || '',
      category: body.category || '',
      description: body.description || '',
      tags: body.tags || [],
      bgColor1: body.bgColor1 || '#1a1a2e',
      bgColor2: body.bgColor2 || '#16213e',
      iconColor: body.iconColor || '#6366f1',
      liveLink: body.liveLink || '',
      order: body.order || db.projects.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    db.projects.push(project);
    await writeDbAsync(db);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const db = await readDbAsync();
    const index = db.projects.findIndex(p => p.id === body.id);
    if (index === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    db.projects[index] = { ...db.projects[index], ...body, updatedAt: new Date().toISOString() };
    await writeDbAsync(db);
    return NextResponse.json(db.projects[index]);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });
    const db = await readDbAsync();
    db.projects = db.projects.filter(p => p.id !== id);
    await writeDbAsync(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
