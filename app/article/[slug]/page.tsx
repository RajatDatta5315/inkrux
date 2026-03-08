'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { Clock, ArrowLeft, Share2, Eye } from 'lucide-react';

const ARTICLES: any = {
  'how-i-built-saas-in-a-weekend': {
    title: 'How I Built a SaaS in 48 Hours and Got 100 Users',
    content: `## The Premise\n\nBuilding fast is a skill. Not recklessness — pure, deliberate speed.\n\nIn February 2026, I set a constraint: one weekend, one SaaS, one launch. No planning paralysis.\n\n## The Stack\n\nSpeed starts with your stack. I defaulted to what I know:\n\n- **Next.js** — fast UI development\n- **Cloudflare Workers + D1** — zero cold starts, generous free tier\n- **Groq + Llama 3.3** — faster than OpenAI for 90% of use cases\n\n## Day 1: Idea to Working Product\n\nSaturday morning. Coffee. Three problems I personally had. Picked the one I could explain in one sentence.\n\nBy 11 PM I had a working demo. Not pretty. But **it worked**.\n\n## Day 2: Polish and Launch\n\nSunday was launch day. Fixed embarrassing bugs. Added a clear landing page. Wrote one honest Reddit post. Posted to HN at 8 AM EST.\n\n## The Result\n\n100 signups in 24 hours. Not viral. But **100 real people** who wanted what I built.\n\n## What I Learned\n\nThe version you ship will always be worse than the version in your head. That gap is where you lose. Ship the bad version. Fix it based on what real users tell you.`,
    tag: 'Indie Hacking', author: 'Rajat', author_handle: 'rajat', read_time: 6, views: 2341, created_at: '2026-03-01',
  },
  'geo-optimization-for-ai-crawlers': {
    title: 'GEO: The Next SEO — How to Get Cited by AI Search',
    content: `## What is GEO?\n\nGenerative Engine Optimization is the practice of making your content discoverable and citable by AI systems like ChatGPT, Perplexity, and Claude.\n\nTraditional SEO optimizes for rankings. GEO optimizes for **citations**.\n\n## The Four Pillars\n\n- **llms.txt** — A new standard file at your domain root that tells AI crawlers about your product\n- **JSON-LD Schema** — Structured data that gives AI systems entity authority\n- **AI robots.txt** — Explicitly allow GPTBot, Claude-Web, PerplexityBot\n- **Answer-First Content** — Write 40-60 word direct answers under each heading\n\n## Why It Matters\n\nWhen someone asks an AI "what is the best tool for X" — the AI does not rank 10 blue links. It **cites one or two sources**. GEO is how you become that source.\n\n## How I Built VELQA for This\n\nVELQA (velqa.kryv.network) automates GEO for any SaaS. It generates your llms.txt, JSON-LD schemas, and AI-optimized robots.txt in seconds.`,
    tag: 'Marketing', author: 'Rajat', author_handle: 'rajat', read_time: 8, views: 5890, created_at: '2026-02-28',
  },
};

function renderContent(content: string) {
  const lines = content.split('\n\n');
  return lines.map((block, i) => {
    if (block.startsWith('## ')) return <h2 key={i} style={{ fontSize: '22px', fontWeight: 900, color: '#fff', borderLeft: '3px solid #7c3aed', paddingLeft: '1rem', margin: '2rem 0 1rem' }}>{block.slice(3)}</h2>;
    if (block.startsWith('### ')) return <h3 key={i} style={{ fontSize: '18px', fontWeight: 800, color: '#e0e0e0', margin: '1.5rem 0 0.75rem' }}>{block.slice(4)}</h3>;
    if (block.includes('\n- ')) {
      const items = block.split('\n').filter(l => l.startsWith('- '));
      return <ul key={i} style={{ margin: '0 0 1rem', paddingLeft: '1.5rem' }}>{items.map((item, j) => <li key={j} style={{ color: '#aaa', marginBottom: '8px', lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: item.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>') }} />)}</ul>;
    }
    return <p key={i} style={{ color: '#aaa', lineHeight: 1.8, marginBottom: '1.2rem' }} dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>').replace(/`(.+?)`/g, '<code style="background:#1a1a2e;padding:2px 6px;borderRadius:4px;color:#06b6d4;fontSize:0.875em">$1</code>') }} />;
  });
}

export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const article = ARTICLES[slug];
  const tagColors: any = { AI: '#06b6d4', SaaS: '#7c3aed', 'Indie Hacking': '#ec4899', Development: '#10b981', Marketing: '#f59e0b', Growth: '#ef4444' };

  if (!article) return (
    <div style={{ minHeight: '100vh', background: '#09090d' }}>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '80px auto', padding: '0 20px', textAlign: 'center' }}>
        <div style={{ fontSize: '60px', marginBottom: '16px' }}>404</div>
        <h1 style={{ color: '#fff' }}>Article not found</h1>
        <Link href="/" style={{ color: '#7c3aed' }}>← Back to INKRUX</Link>
      </div>
    </div>
  );

  const color = tagColors[article.tag] || '#7c3aed';
  return (
    <div style={{ minHeight: '100vh', background: '#09090d' }}>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#555', textDecoration: 'none', marginBottom: '32px' }}>
          <ArrowLeft size={12} /> Back
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '4px 12px', background: `${color}20`, border: `1px solid ${color}40`, borderRadius: '20px', color }}>{article.tag}</span>
          <span style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10} /> {article.read_time} min</span>
          <span style={{ fontSize: '11px', color: '#555', display: 'flex', alignItems: 'center', gap: '4px' }}><Eye size={10} /> {article.views.toLocaleString()}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, color: '#fff', margin: '0 0 20px', lineHeight: 1.2, letterSpacing: '-0.03em' }}>{article.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderTop: '1px solid #1a1a2e', borderBottom: '1px solid #1a1a2e', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#fff' }}>{article.author[0]}</div>
            <div>
              <div style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>{article.author}</div>
              <div style={{ fontSize: '11px', color: '#555' }}>@{article.author_handle} · {new Date(article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </div>
        <div>{renderContent(article.content)}</div>
        <div style={{ marginTop: '60px', padding: '32px', background: '#101018', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '16px', textAlign: 'center' }}>
          <div style={{ fontSize: '11px', color: '#7c3aed', marginBottom: '8px', fontWeight: 700, letterSpacing: '2px' }}>INKRUX NEWSLETTER</div>
          <h3 style={{ color: '#fff', margin: '0 0 8px', fontSize: '18px' }}>Get articles like this weekly</h3>
          <Link href="/newsletter" style={{ display: 'inline-flex', padding: '12px 24px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '10px', textDecoration: 'none', fontSize: '12px', fontWeight: 700, color: '#fff', marginTop: '16px' }}>
            Subscribe Free →
          </Link>
        </div>
      </div>
    </div>
  );
}
