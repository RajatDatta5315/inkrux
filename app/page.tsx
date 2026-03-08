'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { TrendingUp, Clock, Tag, ArrowRight, Zap, Globe, Code2 } from 'lucide-react';

const TAGS = ['All', 'AI', 'SaaS', 'Indie Hacking', 'Development', 'Marketing', 'Growth'];

const PLACEHOLDER_ARTICLES = [
  { id: '1', slug: 'how-i-built-saas-in-a-weekend', title: 'How I Built a SaaS in 48 Hours and Got 100 Users', excerpt: 'A raw, honest breakdown of the stack, the launch strategy, and why moving fast beats perfect every time.', author: 'Rajat', author_handle: 'rajat', tag: 'Indie Hacking', read_time: 6, views: 2341, created_at: '2026-03-01' },
  { id: '2', slug: 'geo-optimization-for-ai-crawlers', title: 'GEO: The Next SEO — How to Get Cited by AI Search', excerpt: 'Generative Engine Optimization is real. Here is exactly how to make your SaaS visible to GPTBot, Claude-Web, and PerplexityBot.', author: 'Rajat', author_handle: 'rajat', tag: 'Marketing', read_time: 8, views: 5890, created_at: '2026-02-28' },
  { id: '3', slug: 'autonomous-agents-2026', title: 'Autonomous AI Agents Are Not Hype — They Are Here', excerpt: 'I spent 6 months building 24 autonomous agents. This is what I learned about reliability, prompting, and when agents actually work.', author: 'Rajat', author_handle: 'rajat', tag: 'AI', read_time: 10, views: 9100, created_at: '2026-02-25' },
  { id: '4', slug: 'cloudflare-workers-the-only-backend-you-need', title: 'Cloudflare Workers: The Only Backend You Need in 2026', excerpt: 'Why I moved all 24 of my projects to Cloudflare Workers, D1, and KV — and why the edge is the future.', author: 'Rajat', author_handle: 'rajat', tag: 'Development', read_time: 7, views: 3200, created_at: '2026-02-20' },
  { id: '5', slug: 'programmatic-seo-infinite-content', title: 'Programmatic SEO: Generate 10,000 Landing Pages Automatically', excerpt: 'The exact strategy behind KRYVLAYER — how to use templates, keywords, and AI to build an infinite SEO engine.', author: 'Rajat', author_handle: 'rajat', tag: 'Growth', read_time: 9, views: 4400, created_at: '2026-02-15' },
  { id: '6', slug: 'saas-marketing-automation-2026', title: 'Full-Stack SaaS Marketing Automation Stack for 2026', excerpt: 'Reddit bots, X agents, GEO tools, email shock sequences — here is the exact marketing OS I am building across KRYV.', author: 'Rajat', author_handle: 'rajat', tag: 'SaaS', read_time: 11, views: 6700, created_at: '2026-02-10' },
];

function ArticleCard({ article, featured = false }: { article: any; featured?: boolean }) {
  const tagColors: any = { AI: '#06b6d4', SaaS: '#7c3aed', 'Indie Hacking': '#ec4899', Development: '#10b981', Marketing: '#f59e0b', Growth: '#ef4444' };
  const color = tagColors[article.tag] || '#7c3aed';

  if (featured) {
    return (
      <Link href={`/article/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div style={{ background: '#101018', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '20px', padding: '32px', position: 'relative', overflow: 'hidden', cursor: 'pointer', transition: 'border-color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)')}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.2)')}>
          <div style={{ position: 'absolute', top: 0, right: 0, width: '300px', height: '300px', background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`, pointerEvents: 'none' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <span style={{ fontSize: '10px', fontWeight: 700, padding: '4px 10px', background: `${color}20`, border: `1px solid ${color}40`, borderRadius: '20px', color }}>{article.tag}</span>
            <span style={{ fontSize: '10px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> {article.read_time} min read</span>
            <span style={{ fontSize: '10px', color: '#555' }}>· {article.views.toLocaleString()} views</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: '#fff', margin: '0 0 12px', lineHeight: 1.3, letterSpacing: '-0.02em' }}>{article.title}</h2>
          <p style={{ fontSize: '14px', color: '#888', lineHeight: 1.7, margin: '0 0 20px' }}>{article.excerpt}</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12px', color: '#666' }}>by <span style={{ color: '#aaa' }}>@{article.author_handle}</span> · {new Date(article.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#7c3aed', fontWeight: 700 }}>Read <ArrowRight size={12} /></div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/article/${article.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
      <div style={{ background: '#101018', border: '1px solid #1a1a2e', borderRadius: '14px', padding: '20px', cursor: 'pointer', transition: 'border-color 0.2s' }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(124,58,237,0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1a1a2e')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', background: `${color}20`, borderRadius: '20px', color }}>{article.tag}</span>
          <span style={{ fontSize: '9px', color: '#444' }}>{article.read_time}m</span>
        </div>
        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#e0e0e0', margin: '0 0 8px', lineHeight: 1.4 }}>{article.title}</h3>
        <p style={{ fontSize: '11px', color: '#666', lineHeight: 1.6, margin: '0 0 12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{article.excerpt}</p>
        <div style={{ fontSize: '10px', color: '#444' }}>@{article.author_handle} · {article.views.toLocaleString()} views</div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [activeTag, setActiveTag] = useState('All');
  const [email, setEmail] = useState('');
  const [subStatus, setSubStatus] = useState('');

  const filtered = activeTag === 'All' ? PLACEHOLDER_ARTICLES : PLACEHOLDER_ARTICLES.filter(a => a.tag === activeTag);

  const handleSubscribe = async () => {
    if (!email.includes('@')) return;
    try {
      await fetch('/api/newsletter', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      setSubStatus('subscribed');
      setEmail('');
    } catch { setSubStatus('error'); }
  };

  const stats = [
    { icon: <Globe size={16} color="#7c3aed" />, label: 'Articles', value: '120+' },
    { icon: <Zap size={16} color="#ec4899" />, label: 'Subscribers', value: '2.4K' },
    { icon: <Code2 size={16} color="#06b6d4" />, label: 'Builders', value: '800+' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#09090d' }}>
      <Navbar />

      {/* Hero */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '20px', fontSize: '11px', color: '#7c3aed', marginBottom: '24px' }}>
            <Zap size={11} /> Built for Indie Hackers, SaaS Builders & AI Devs
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 6vw, 72px)', fontWeight: 900, color: '#fff', margin: '0 0 16px', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
            Dark articles for<br />
            <span style={{ background: 'linear-gradient(135deg, #7c3aed, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>serious builders</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#666', maxWidth: '500px', margin: '0 auto 40px', lineHeight: 1.7 }}>
            Real insights on AI, SaaS, and indie hacking. No fluff. No paywalls. Just signal from people shipping products.
          </p>

          {/* Subscribe bar */}
          <div style={{ display: 'flex', gap: '8px', maxWidth: '420px', margin: '0 auto' }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              style={{ flex: 1, background: '#101018', border: '1px solid #1a1a2e', borderRadius: '10px', padding: '12px 16px', fontSize: '13px', color: '#e0e0e0', outline: 'none', fontFamily: 'inherit' }}
            />
            <button onClick={handleSubscribe}
              style={{ padding: '12px 20px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '10px', border: 'none', fontSize: '12px', fontWeight: 700, color: '#fff', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
              {subStatus === 'subscribed' ? '✓ Joined!' : 'Subscribe Free'}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 20px', background: '#101018', border: '1px solid #1a1a2e', borderRadius: '12px' }}>
              {s.icon}
              <div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '9px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tags filter */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setActiveTag(tag)}
              style={{ padding: '8px 16px', borderRadius: '20px', border: `1px solid ${activeTag === tag ? '#7c3aed' : '#1a1a2e'}`, background: activeTag === tag ? 'rgba(124,58,237,0.15)' : 'transparent', fontSize: '12px', color: activeTag === tag ? '#7c3aed' : '#555', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, transition: 'all 0.2s' }}>
              {tag}
            </button>
          ))}
        </div>

        {/* Featured article */}
        {filtered.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <ArticleCard article={filtered[0]} featured />
          </div>
        )}

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {filtered.slice(1).map(article => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Write CTA */}
        <div style={{ margin: '60px 0', padding: '40px', background: '#101018', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '20px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: '0 0 12px' }}>Share what you are building</h2>
          <p style={{ fontSize: '14px', color: '#666', margin: '0 0 24px' }}>Write for the INKRUX audience — 2,400 builders who actually ship.</p>
          <Link href="/write" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '12px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
            <Pen size={14} /> Start Writing
          </Link>
        </div>
      </div>
    </div>
  );
}
