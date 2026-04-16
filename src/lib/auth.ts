import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'xverse-super-secret-key-2024';
const TOKEN_NAME = 'xverse_admin_token';

// Admin info interface for JWT payload
export interface AdminInfo {
  email: string;
  name: string;
  role: 'admin' | 'editor';
}

// Keep AdminUser export for backward compatibility
export type AdminUser = AdminInfo & { id: string; passwordHash: string; createdAt: string; };

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(email: string): string {
  return jwt.sign(
    { email, name: 'Admin', role: 'admin' },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): AdminInfo | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminInfo;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(TOKEN_NAME)?.value || null;
}

/**
 * Get current user from JWT token alone — no DB lookup needed.
 */
export async function getCurrentUser(): Promise<AdminInfo | null> {
  const token = await getAuthToken();
  if (!token) return null;
  return verifyToken(token);
}

/**
 * Check if the request is from an authenticated admin.
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return user !== null;
}

/**
 * Verify login credentials directly against environment variables.
 * No database needed — credentials come from Vercel env vars.
 */
export async function verifyLogin(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@xverse.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  return email === adminEmail && password === adminPassword;
}
