import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const PUBLISH_SECRET = process.env.INKRUX_PUBLISH_SECRET || 'kryv-internal-2026';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { secret, title, slug, excerpt, body: articleBody, tags, author, image } = body;

    if (secret !== PUBLISH_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!title || !slug || !articleBody) {
      return NextResponse.json({ error: 'title, slug, body required' }, { status: 400 });
    }

    const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    if (!dbUrl) {
      return NextResponse.json({ 
        success: true, 
        warning: 'DATABASE_URL not set — article queued but not persisted. Add it in Vercel.',
        slug 
      });
    }

    const sql = neon(dbUrl);
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id SERIAL PRIMARY KEY, slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL, excerpt TEXT, body TEXT NOT NULL,
        tags TEXT DEFAULT '', author TEXT DEFAULT 'Rajat',
        image TEXT DEFAULT '', published_at TIMESTAMP DEFAULT NOW(), views INTEGER DEFAULT 0
      )
    `;
    await sql`
      INSERT INTO articles (slug, title, excerpt, body, tags, author, image)
      VALUES (${slug}, ${title}, ${excerpt || ''}, ${articleBody}, ${(tags || []).join(',')}, ${author || 'Rajat'}, ${image || ''})
      ON CONFLICT (slug) DO UPDATE SET title=EXCLUDED.title, excerpt=EXCLUDED.excerpt, body=EXCLUDED.body, tags=EXCLUDED.tags, image=EXCLUDED.image
    `;

    return NextResponse.json({ success: true, slug, url: `https://inkrux.kryv.network/article/${slug}` });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'INKRUX Publish API v1.0' });
}
