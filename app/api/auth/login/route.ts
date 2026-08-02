import { NextRequest, NextResponse } from 'next/server';
import { createSessionToken, SESSION_COOKIE, SESSION_MAX_AGE } from '@/lib/session';

export async function POST(req: NextRequest) {
  let password = '';
  try {
    const body = await req.json();
    password = body?.password ?? '';
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const adminPassword = process.env.ADMIN_PASSWORD || 'AhmadRaza@2025';

  if (password !== adminPassword) {
    return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
  }

  const token = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  });
  return res;
}
