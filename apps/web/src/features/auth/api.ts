import type { UserRole } from './session';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api/v1';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  mustChangePassword?: boolean;
}

const WAKE_STATUSES = new Set([502, 503, 504]);
const WAKE_ATTEMPTS = 6;
const WAKE_DELAY_MS = 10_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function loginRequest(email: string, password: string, onWaking?: () => void): Promise<AuthUser> {
  for (let attempt = 1; ; attempt += 1) {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (WAKE_STATUSES.has(response.status) && attempt < WAKE_ATTEMPTS) {
      onWaking?.();
      await wait(WAKE_DELAY_MS);
      continue;
    }

    const body = await response.json().catch(() => null);

    if (response.ok) return body.user as AuthUser;

    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    if (response.status === 401) throw new Error('Invalid email or password.');
    if (response.status === 429) throw new Error(message ?? 'Too many sign-in attempts. Wait a minute and try again.');
    if (WAKE_STATUSES.has(response.status)) throw new Error('The server is starting up. Please try again in a minute.');
    throw new Error(message ?? `Sign-in failed (error ${response.status}). Please try again.`);
  }
}

export async function changePasswordRequest(currentPassword: string, newPassword: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/auth/change-password`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    const message = Array.isArray(body?.message) ? body.message[0] : body?.message;
    throw new Error(message ?? 'Could not change the password.');
  }
}

export async function logoutRequest(): Promise<void> {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  }).catch(() => undefined);
}