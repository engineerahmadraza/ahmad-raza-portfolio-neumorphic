import { NextRequest, NextResponse } from 'next/server';
import { updateItem, deleteItem, isDbConfigured } from '@/lib/db';
import { isAuthed } from '@/lib/session';
import { defaultProjects, defaultExperience, defaultResearch } from '@/lib/data';

const SEEDS: Record<string, any[]> = {
  projects: defaultProjects,
  experience: defaultExperience,
  research: defaultResearch,
};

type Ctx = { params: Promise<{ collection: string; id: string }> };

function dbErrorResponse() {
  return NextResponse.json(
    { error: 'DB_NOT_CONFIGURED', message: 'Persistent storage is not set up yet. See README for setup steps.' },
    { status: 503 }
  );
}

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const { collection, id } = await ctx.params;
  const seed = SEEDS[collection];
  if (!seed) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return dbErrorResponse();

  const patch = await req.json();
  const updated = await updateItem(collection, id, patch, seed);
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json({ data: updated });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const { collection, id } = await ctx.params;
  const seed = SEEDS[collection];
  if (!seed) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });
  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isDbConfigured()) return dbErrorResponse();

  await deleteItem(collection, id, seed);
  return NextResponse.json({ ok: true });
}
