import { NextRequest, NextResponse } from 'next/server';
import { getSingleton, setSingleton, isDbConfigured } from '@/lib/db';
import { isAuthed } from '@/lib/session';
import { defaultStats } from '@/lib/data';

export async function GET() {
  const data = await getSingleton('stats', defaultStats);
  return NextResponse.json({ data, configured: isDbConfigured() });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'DB_NOT_CONFIGURED', message: 'Persistent storage is not set up yet. See README for setup steps.' },
      { status: 503 }
    );
  }
  const body = await req.json();
  await setSingleton('stats', body);
  return NextResponse.json({ data: body });
}
