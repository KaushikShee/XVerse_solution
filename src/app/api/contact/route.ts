import { readDbAsync, writeDbAsync, generateId } from '@/lib/db';
import { jsonResponse } from '@/lib/api-utils';

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
    return jsonResponse({ success: true, message: 'Thank you! Your message has been sent.' }, 201);
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to submit' }, 500);
  }
}

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.contactSubmissions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to fetch' }, 500);
  }
}
