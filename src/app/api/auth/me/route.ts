import { getCurrentUser } from '@/lib/auth';
import { jsonResponse } from '@/lib/api-utils';

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return jsonResponse({ authenticated: false }, 401);
    }
    return jsonResponse({
      authenticated: true,
      user: { email: user.email, name: user.name, role: user.role },
    });
  } catch {
    return jsonResponse({ authenticated: false }, 401);
  }
}
