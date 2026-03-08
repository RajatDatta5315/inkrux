'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Pen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.inkrux.kryv.network';

const TAGS = ['All', 'AI', 'SaaS', 'Indie Hacking', 'Development', 'Marketing', 'Growth'];

const TAG_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  AI:            { bg: 'rgba(124,58,237,0.1)',  text: '#a78bfa', border: 'rgba(124,58,237,0.25)' },
  SaaS:          { bg: 'rgba(6,182,212,0.1)',   text: '#22d3ee', border: 'rgba(6,182,212,0.25)'  },
  'Indie Hacking':{ bg: 'rgba(236,72,153,0.1)', text: '#f472b6', border: 'rgba(236,72,153,0.25)' },
  Development:   { bg: 'rgba(34,197,94,0.1)',   text: '#4ade80', border: 'rgba(34,197,94,0.25)'  },
  Marketing:     { bg: 'rgba(251,146,60,0.1)',  text: '#fb923c', border: 'rgba(251,146,60,0.25)'  },
  Growth:        { bg: 'rgba(250,204,21,0.1)',  text: '#fbbf24', border: 'rgba(250,204,21,0.25)'  },
};

const SAMPLE_ARTICLES = [
  { id: '1', slug: 'how-i-got-100-users-without-ads', title: 'How I got my first 100 users without spending a dollar on ads', tag: 'Indie Hacking', author: 'Rajat', created_at: '2026-03-01', views: 1240, read_time: 6 },
  { id: '2', slug: 'ai-agents-replacing-sdr', title: 'AI agents will replace SDRs by 2027 — here is why', tag: 'AI', author: 'Rajat', created_at: '2026-03-03', views: 3400, read_time: 8 },
  { id: '3', slug: 'building-saas-cloudflare-workers', title: 'Why I build every backend on Cloudflare Workers (not AWS)', tag: 'Development', author: 'Rajat', created_at: '2026-03-05', views: 891, read_time: 5 },
  { id: '4', slug: 'geo-optimization-2026', title: 'GEO will be more important than SEO by 2026. Here is the playbook.', tag: 'Marketing', author: 'Rajat', created_at: '2026-03-07', views: 2100, read_time: 7 },
  { id: '5', slug: 'revenue-before-product', title: 'I charged $99 before writing a single line of code', tag: 'SaaS', author: 'Rajat', created_at: '2026-03-08', views: 5600, read_time: 4 },
];

function TagBadge({ tag }: { tag: string }) {
  const c = TAG_COLORS[tag] || { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.4)', border: 'rgba(255,255,255,0.1)' };
  return (
    <span style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }} className="tag">
      {tag}
    </span>
  );
}

function ArticleCard({ article, index }: { article: any; index: number }) {
  return (
    <Link href={`/article/${article.slug}`} style={{ animationDelay: `${index * 60}ms` }}
      className="group block rounded-2xl glass p-6 hover:bg-white/[0.045] transition-all duration-300 hover:-translate-y-0.5 animate-up">
      <div className="flex items-start justify-between gap-4 mb-4">
        <TagBadge tag={article.tag} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
          {article.read_time}m read · {article.views?.toLocaleString()} views
        </span>
      </div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.3rem', color: '#fff', lineHeight: 1.35, fontWeight: 400, letterSpacing: '-0.01em', marginBottom: '1rem' }}
        className="group-hover:text-purple-300 transition-colors">
        {article.title}
      </h2>
      <div className="flex items-center justify-between">
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>
          by {article.author} · {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <ArrowRight size={15} className="text-purple-500 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
      </div>
    </Link>
  );
}

function FeaturedCard({ article }: { article: any }) {
  return (
    <Link href={`/article/${article.slug}`}
      className="group block col-span-full rounded-2xl overflow-hidden relative animate-up"
      style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.12), rgba(236,72,153,0.08))', border: '1px solid rgba(124,58,237,0.2)', padding: '40px 44px', minHeight: 220 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 80% 50%, rgba(124,58,237,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div className="relative z-10">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em', textTransform: 'uppercase' }}>Featured</span>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(255,255,255,0.2)' }} />
          <TagBadge tag={article.tag} />
        </div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.4rem, 3vw, 2rem)', color: '#fff', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, maxWidth: 640, marginBottom: 20 }}
          className="group-hover:text-purple-200 transition-colors">
          {article.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>by {article.author}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{article.read_time}m read</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }}>{article.views?.toLocaleString()} views</span>
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [articles, setArticles] = useState<any[]>(SAMPLE_ARTICLES);
  const [tag, setTag] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/articles`)
      .then(r => r.json())
      .then(data => { if (Array.isArray(data) && data.length > 0) setArticles([...data, ...SAMPLE_ARTICLES]); })
      .catch(() => {});
  }, []);

  const filtered = articles.filter(a => {
    const matchTag = tag === 'All' || a.tag === tag;
    const q = search.toLowerCase();
    const matchSearch = !q || a.title.toLowerCase().includes(q) || a.author?.toLowerCase().includes(q);
    return matchTag && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      <div className="ambient-1" /><div className="ambient-2" />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', background: 'rgba(5,5,10,0.75)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg, #7c3aed, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 13, color: '#fff' }}>IX</span>
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 17, letterSpacing: '-0.03em', color: '#fff' }}>INKRUX</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.12em', textTransform: 'uppercase', marginLeft: 4 }}>for builders</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/newsletter" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', padding: '7px 14px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.07)' }}>Newsletter</Link>
            <Link href="/write" style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: 10, fontSize: 13, fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
              <Pen size={13} /> Write
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1100, margin: '0 auto', padding: '52px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero headline */}
        <div style={{ marginBottom: 52, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: 100, marginBottom: 20 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
            <span style={{ fontSize: 11, color: 'rgba(124,58,237,0.9)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Real insights from people who ship</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.4rem, 6vw, 4.2rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
            Articles for the<br /><span className="grad">builders of tomorrow</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 480, margin: '0 auto' }}>
            No paywalls. No fluff. Indie hacking, AI, SaaS — written by founders who are actively shipping.
          </p>
        </div>

        {/* Search + Tags */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 36, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.25)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '10px 14px 10px 36px', color: '#fff', fontSize: 13, outline: 'none' }} />
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                style={{ padding: '7px 14px', borderRadius: 100, border: `1px solid ${tag === t ? 'rgba(124,58,237,0.5)' : 'rgba(255,255,255,0.08)'}`, background: tag === t ? 'rgba(124,58,237,0.15)' : 'transparent', color: tag === t ? '#a78bfa' : 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Articles grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
            No articles found. <Link href="/write" style={{ color: '#7c3aed', textDecoration: 'none' }}>Write the first one →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
            {featured && <FeaturedCard article={featured} />}
            {rest.map((a, i) => <ArticleCard key={a.id || a.slug} article={a} index={i} />)}
          </div>
        )}

        {/* Write CTA */}
        <div style={{ marginTop: 72, padding: '48px 40px', textAlign: 'center' }} className="glass-vivid rounded-2xl">
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '2rem', fontWeight: 400, color: '#fff', marginBottom: 12, letterSpacing: '-0.02em' }}>
            Share what you're building
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)', marginBottom: 28 }}>
            Write for the INKRUX audience — builders who actually ship.
          </p>
          <Link href="/write" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: 12, textDecoration: 'none', fontSize: 14, fontWeight: 700, color: '#fff', boxShadow: '0 8px 32px rgba(124,58,237,0.3)' }}>
            <Pen size={15} /> Start Writing
          </Link>
        </div>
      </main>
    </div>
  );
}
