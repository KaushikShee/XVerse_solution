import { NextResponse } from 'next/server';
import { readDbAsync, writeDbAsync } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';

export async function GET() {
  try {
    const db = await readDbAsync();
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
    const db = await readDbAsync();
    db.homepageContent = { ...db.homepageContent, ...body };
    await writeDbAsync(db);
    return NextResponse.json(db.homepageContent);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
