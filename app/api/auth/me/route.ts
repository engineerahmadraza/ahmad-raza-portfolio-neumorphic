import { NextRequest, NextResponse } from 'next/server';
import { isAuthed } from '@/lib/session';
import { isDbConfigured } from '@/lib/db';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    loggedIn: isAuthed(req),
    dbConfigured: isDbConfigured(),
  });
}
