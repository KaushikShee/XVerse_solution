import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { readDbAsync, writeDbAsync, generateId, type AdminUser } from './db';

const JWT_SECRET = process.env.JWT_SECRET || 'xverse-super-secret-key-2024';
const TOKEN_NAME = 'xverse_admin_token';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(userId: string, email: string): string {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): { userId: string; email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; email: string };
    return decoded;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value || null;
}

export async function getCurrentUser(): Promise<AdminUser | null> {
  const token = await getAuthToken();
  if (!token) return null;

  const decoded = verifyToken(token);
  if (!decoded) return null;

  const db = await readDbAsync();
  return db.users.find(u => u.id === decoded.userId) || null;
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

export async function ensureAdminExists(): Promise<void> {
  const db = await readDbAsync();
  if (db.users.length === 0) {
    const email = process.env.ADMIN_EMAIL || 'admin@xverse.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const passwordHash = await hashPassword(password);

    db.users.push({
      id: generateId(),
      email,
      passwordHash,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date().toISOString(),
    });
    await writeDbAsync(db);
  }
}
