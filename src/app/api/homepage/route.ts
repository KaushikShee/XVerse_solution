import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = readDb();
    return NextResponse.json(db.homepageContent);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    const body = await request.json();
    const db = readDb();
    db.homepageContent = { ...db.homepageContent, ...body };
    writeDb(db);
    return NextResponse.json(db.homepageContent);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
