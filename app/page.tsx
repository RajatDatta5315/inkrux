'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Terminal, Zap, BookOpen } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.inkrux.kryv.network';

const TAGS = ['All', 'AI', 'SaaS', 'Dev', 'Indie Hacking', 'Marketing', 'Growth'];

const TAG_META: Record<string, { bg: string; text: string; border: string }> = {
  AI:            { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.75)', border: 'rgba(255,255,255,0.12)' },
  SaaS:          { bg: 'rgba(255,255,255,0.04)', text: 'rgba(255,255,255,0.6)',  border: 'rgba(255,255,255,0.09)' },
  Dev:           { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.75)', border: 'rgba(255,255,255,0.12)' },
  'Indie Hacking':{ bg: 'rgba(255,255,255,0.04)', text: 'rgba(255,255,255,0.5)', border: 'rgba(255,255,255,0.08)' },
  Marketing:     { bg: 'rgba(255,255,255,0.04)', text: 'rgba(255,255,255,0.55)', border: 'rgba(255,255,255,0.09)' },
  Growth:        { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.6)',  border: 'rgba(255,255,255,0.1)' },
};

const SAMPLE: any[] = [
  { id:'1', slug:'first-100-users-zero-spend', title:'How I got my first 100 users without spending a dollar', tag:'Indie Hacking', author:'Rajat', created_at:'2026-03-01', views:1240, read_time:6 },
  { id:'2', slug:'ai-agents-replacing-sdr-2027', title:'AI agents will replace SDRs by 2027 — the numbers already show it', tag:'AI', author:'Rajat', created_at:'2026-03-03', views:3400, read_time:8 },
  { id:'3', slug:'cloudflare-workers-over-aws', title:'Why I run every backend on Cloudflare Workers instead of AWS', tag:'Dev', author:'Rajat', created_at:'2026-03-05', views:891, read_time:5 },
  { id:'4', slug:'geo-beats-seo-2026', title:'GEO will matter more than SEO. Here is the full playbook for 2026.', tag:'Marketing', author:'Rajat', created_at:'2026-03-07', views:2100, read_time:7 },
  { id:'5', slug:'charged-99-before-code', title:'I charged $99 before writing a single line of code', tag:'SaaS', author:'Rajat', created_at:'2026-03-08', views:5600, read_time:4 },
  { id:'6', slug:'llms-txt-every-saas', title:'Every SaaS in 2026 needs an llms.txt. Here is why and how.', tag:'AI', author:'Rajat', created_at:'2026-03-08', views:1800, read_time:5 },
];

function TagBadge({ tag }: { tag: string }) {
  const m = TAG_META[tag] || { bg: 'rgba(255,255,255,0.05)', text: 'rgba(255,255,255,0.35)', border: 'rgba(255,255,255,0.1)' };
  return <span style={{ background: m.bg, color: m.text, border: `1px solid ${m.border}` }} className="tag">{tag}</span>;
}

function ArticleCard({ a, i, featured }: { a: any; i: number; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/article/${a.slug}`} className="animate-up"
        style={{ display: 'block', gridColumn: '1 / -1', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '36px 40px', position: 'relative', overflow: 'hidden', animationDelay: '0ms', transition: 'border-color 0.2s' }}
        onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)'}
        onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'}>
        {/* subtle top accent line */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em', textTransform: 'uppercase' }}>Featured</span>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
          <TagBadge tag={a.tag} />
        </div>
        <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', color: '#fff', fontWeight: 400, letterSpacing: '-0.02em', lineHeight: 1.25, maxWidth: 680, marginBottom: 20 }}>
          {a.title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>by {a.author}</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>{a.read_time}min</span>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace" }}>{a.views?.toLocaleString()} views</span>
        </div>
      </Link>
    );
  }
  return (
    <Link href={`/article/${a.slug}`} className="group animate-up"
      style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '24px', animationDelay: `${i * 50}ms`, transition: 'border-color 0.2s, background 0.2s' }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.045)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.07)'; (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'; }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <TagBadge tag={a.tag} />
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.18)', fontFamily: "'JetBrains Mono', monospace" }}>{a.read_time}m</span>
      </div>
      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.2rem', color: '#f0f0f5', fontWeight: 400, letterSpacing: '-0.01em', lineHeight: 1.35, flex: 1, marginBottom: 16 }}>
        {a.title}
      </h2>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>@{a.author}</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)', fontFamily: "'JetBrains Mono', monospace" }}>{a.views?.toLocaleString()}</span>
        </div>
        <ArrowRight size={14} style={{ color: 'rgba(255,255,255,0.2)', transition: 'color 0.2s, transform 0.2s' }} />
      </div>
    </Link>
  );
}

export default function Home() {
  const [articles, setArticles] = useState<any[]>(SAMPLE);
  const [tag, setTag] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API}/api/articles`).then(r => r.json())
      .then(d => { if (Array.isArray(d) && d.length) setArticles([...d, ...SAMPLE]); })
      .catch(() => {});
  }, []);

  const filtered = articles.filter(a => {
    const matchTag = tag === 'All' || a.tag === tag;
    const q = search.toLowerCase();
    return matchTag && (!q || a.title.toLowerCase().includes(q) || a.author?.toLowerCase().includes(q));
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative' }}>
      <div className="ambient-top" />

      {/* NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', background: 'rgba(6,6,9,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1060, margin: '0 auto', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Terminal size={12} color="rgba(255,255,255,0.7)" />
            </div>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, fontSize: 14, color: '#fff', letterSpacing: '0.04em' }}>INKRUX</span>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>/ for builders</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Link href="/newsletter" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', padding: '6px 12px', borderRadius: 6, border: '1px solid rgba(255,255,255,0.07)' }}>
              <BookOpen size={13} style={{ display: 'inline', marginRight: 5, verticalAlign: 'middle' }} />Newsletter
            </Link>
            <Link href="/write" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 6, fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none' }}>
              Write →
            </Link>
          </div>
        </div>
      </nav>

      <main style={{ maxWidth: 1060, margin: '0 auto', padding: '56px 24px 80px', position: 'relative', zIndex: 1 }}>
        {/* Hero */}
        <div style={{ marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '4px 12px', background: 'rgba(88,196,255,0.06)', border: '1px solid rgba(88,196,255,0.16)', borderRadius: 4, marginBottom: 20 }}>
            <Zap size={11} color="#58c4ff" />
            <span style={{ fontSize: 11, color: '#58c4ff', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em', textTransform: 'uppercase' }}>Real signal from people who ship</span>
          </div>
          <h1 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.1, color: '#fff', marginBottom: 16 }}>
            Technical writing<br /><span className="grad-accent">for builders.</span>
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', maxWidth: 440 }}>
            No paywalls. No fluff. AI, SaaS, indie hacking — written by founders actively building in the KRYV ecosystem.
          </p>
        </div>

        {/* Search + filters */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 36, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.22)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px 10px 34px', color: '#f0f0f5', fontSize: 13, outline: 'none', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                style={{ padding: '6px 12px', borderRadius: 6, border: `1px solid ${tag === t ? 'rgba(88,196,255,0.35)' : 'rgba(255,255,255,0.07)'}`, background: tag === t ? 'rgba(88,196,255,0.1)' : 'transparent', color: tag === t ? '#58c4ff' : 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: "'JetBrains Mono', monospace" }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'rgba(255,255,255,0.2)', fontSize: 13 }}>
            Nothing found. <Link href="/write" style={{ color: '#58c4ff', textDecoration: 'none' }}>Write it →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 12 }}>
            {featured && <ArticleCard a={featured} i={0} featured />}
            {rest.map((a, i) => <ArticleCard key={a.id || a.slug} a={a} i={i} />)}
          </div>
        )}

        {/* CTA */}
        <div style={{ marginTop: 64, padding: '40px', textAlign: 'center', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)', width: 300, height: 120, background: 'radial-gradient(ellipse, rgba(88,196,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
          </div>
          <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: '1.8rem', fontWeight: 400, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>
            Share what you're building
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginBottom: 24, fontFamily: "'JetBrains Mono', monospace" }}>
            Write for the INKRUX audience — builders who actually ship.
          </p>
          <Link href="/write" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 28px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, textDecoration: 'none', fontSize: 14, fontWeight: 700, color: '#fff' }}>
            Write an article <ArrowRight size={14} />
          </Link>
        </div>
      </main>
    </div>
  );
}
