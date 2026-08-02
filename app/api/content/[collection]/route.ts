import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { getCollection, addItem, isDbConfigured } from '@/lib/db';
import { isAuthed } from '@/lib/session';
import { defaultProjects, defaultExperience, defaultResearch } from '@/lib/data';

const SEEDS: Record<string, any[]> = {
  projects: defaultProjects,
  experience: defaultExperience,
  research: defaultResearch,
};

type Ctx = { params: Promise<{ collection: string }> };

export async function GET(req: NextRequest, ctx: Ctx) {
  const { collection } = await ctx.params;
  const seed = SEEDS[collection];
  if (!seed) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  const data = await getCollection(collection, seed);
  return NextResponse.json({ data, configured: isDbConfigured() });
}

export async function POST(req: NextRequest, ctx: Ctx) {
  const { collection } = await ctx.params;
  const seed = SEEDS[collection];
  if (!seed) return NextResponse.json({ error: 'Unknown collection' }, { status: 404 });

  if (!isAuthed(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  if (!isDbConfigured()) {
    return NextResponse.json(
      { error: 'DB_NOT_CONFIGURED', message: 'Persistent storage is not set up yet. See README for setup steps.' },
      { status: 503 }
    );
  }

  const body = await req.json();
  const item = { ...body, id: randomUUID() };
  const saved = await addItem(collection, item, seed);
  return NextResponse.json({ data: saved });
}
