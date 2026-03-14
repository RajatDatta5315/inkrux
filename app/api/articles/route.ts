import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  const dbUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) {
    return NextResponse.json({ articles: [], source: 'no-db' }, { headers: CORS });
  }

  try {
    const sql = neon(dbUrl);
    await sql`CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY, slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL, excerpt TEXT, body TEXT NOT NULL,
      tags TEXT DEFAULT '', author TEXT DEFAULT 'Rajat',
      image TEXT DEFAULT '', published_at TIMESTAMP DEFAULT NOW(), views INTEGER DEFAULT 0
    )`;

    if (slug) {
      // Single article by slug
      const rows = await sql`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`;
      if (!rows.length) return NextResponse.json({ article: null }, { headers: CORS });
      const a = rows[0];
      return NextResponse.json({
        article: {
          slug: a.slug, title: a.title, excerpt: a.excerpt, content: a.body,
          tag: (a.tags || '').split(',')[0] || 'SaaS', author: a.author || 'Rajat',
          readTime: Math.max(3, Math.ceil((a.body || '').split(' ').length / 200)),
          views: a.views || 0, date: new Date(a.published_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
          image: a.image || 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
        }
      }, { headers: CORS });
    }

    // List all articles
    const rows = await sql`SELECT slug, title, excerpt, tags, author, image, published_at, views FROM articles ORDER BY published_at DESC LIMIT 50`;
    return NextResponse.json({
      articles: rows.map((a: any) => ({
        slug: a.slug, title: a.title, excerpt: a.excerpt,
        tag: (a.tags || '').split(',')[0] || 'SaaS', author: a.author || 'Rajat',
        readTime: 5, views: a.views || 0,
        date: new Date(a.published_at).toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' }),
        image: a.image || 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
      }))
    }, { headers: CORS });
  } catch (e: any) {
    return NextResponse.json({ articles: [], error: e.message }, { status: 500, headers: CORS });
  }
}
