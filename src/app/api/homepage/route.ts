import { readDbAsync, writeDbAsync } from '@/lib/db';
import { isAuthenticated } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const db = await readDbAsync();
    return jsonResponse(db.homepageContent);
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to fetch' }, 500);
  }
}

export async function PUT(request: Request) {
  try {
    if (!(await isAuthenticated())) return jsonResponse({ error: 'Unauthorized' }, 401);
    const body = await request.json();
    const db = await readDbAsync();
    db.homepageContent = { ...db.homepageContent, ...body };
    await writeDbAsync(db);
    return jsonResponse(db.homepageContent);
  } catch (error) {
    console.error('Error:', error);
    return jsonResponse({ error: 'Failed to update' }, 500);
  }
}
