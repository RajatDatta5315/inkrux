import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  // TODO: Fetch from Neon DB when DATABASE_URL is set
  return NextResponse.json([]);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, content, tag } = body;
    if (!title || !content || !tag) {
      return NextResponse.json({ error: 'title, content, tag required' }, { status: 400 });
    }
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 80) + '-' + Date.now();
    // TODO: INSERT INTO articles table via Neon DB
    return NextResponse.json({ success: true, slug });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
