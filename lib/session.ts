import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

const SECRET = process.env.SESSION_SECRET || 'dev-only-insecure-secret-please-set-SESSION_SECRET';
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const SESSION_COOKIE = 'admin_session';

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('hex');
}

export function createSessionToken(): string {
  const expires = Date.now() + MAX_AGE_SECONDS * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token) return false;
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = sign(payload);
  try {
    const sigBuf = Buffer.from(sig, 'hex');
    const expBuf = Buffer.from(expected, 'hex');
    if (sigBuf.length !== expBuf.length) return false;
    if (!timingSafeEqual(sigBuf, expBuf)) return false;
  } catch {
    return false;
  }
  const expires = Number(payload);
  if (Number.isNaN(expires) || Date.now() > expires) return false;
  return true;
}

export function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}

export const SESSION_MAX_AGE = MAX_AGE_SECONDS;
