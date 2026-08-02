import { NextRequest, NextResponse } from 'next/server';
import { deleteItem, isDbConfigured } from '@/lib/db';
import { isAuthed } from '@/lib/session';
import type { Message } from '@/lib/data';

const EMPTY: Message[] = [];

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(req: NextRequest, ctx: Ctx) {
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await ctx.params;
  if (!isDbConfigured()) return NextResponse.json({ error: 'DB_NOT_CONFIGURED' }, { status: 503 });
  await deleteItem('messages', id, EMPTY);
  return NextResponse.json({ ok: true });
}
