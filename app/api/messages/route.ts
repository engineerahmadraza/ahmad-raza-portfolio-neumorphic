import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getCollection, addItem, isDbConfigured } from '@/lib/db';
import { isAuthed } from '@/lib/session';
import type { Message } from '@/lib/data';

const EMPTY: Message[] = [];

// Public: anyone can submit the contact form.
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, subject, message } = body || {};
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }
  if (!isDbConfigured()) {
    // Storage not set up — accept gracefully so the form doesn't feel broken,
    // but let the client know it wasn't actually saved.
    return NextResponse.json({ ok: true, saved: false });
  }
  const item: Message = {
    id: randomUUID(),
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    subject: String(subject || '(No subject)').slice(0, 300),
    message: String(message).slice(0, 5000),
    createdAt: new Date().toISOString(),
  };
  await addItem('messages', item, EMPTY);
  return NextResponse.json({ ok: true, saved: true });
}

// Admin only: view inbox.
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const data = await getCollection('messages', EMPTY);
  return NextResponse.json({ data: data.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1)), configured: isDbConfigured() });
}
