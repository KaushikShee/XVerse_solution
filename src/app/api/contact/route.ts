import { NextResponse } from 'next/server';
import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const db = await readDbAsync();
    const submission = {
      id: generateId(),
      name: body.name || '',
      email: body.email || '',
      subject: body.subject || '',
      message: body.message || '',
      createdAt: new Date().toISOString(),
      read: false,
    };
    db.contactSubmissions.push(submission);
    await writeDbAsync(db);
    return NextResponse.json({ success: true, message: 'Thank you! Your message has been sent.' }, { status: 201 });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to submit' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = await readDbAsync();
    return NextResponse.json(db.contactSubmissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
