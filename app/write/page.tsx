'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function WriteContent() {
  const params = useSearchParams();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (params.get('title')) {
      setTitle(params.get('title') || '');
      setSlug(params.get('slug') || '');
      setExcerpt(params.get('excerpt') || '');
      setBody(params.get('body') || '');
      setTags(params.get('tags') || '');
    }
  }, [params]);

  const copyAll = () => {
    const full = `---\ntitle: ${title}\nslug: ${slug}\nexcerpt: ${excerpt}\ntags: [${tags}]\n---\n\n${body}`;
    const ta = document.createElement('textarea');
    ta.value = full;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#040405', fontFamily: "'Sora', sans-serif", padding: '48px 24px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#040405', fontFamily: "'JetBrains Mono', monospace" }}>IX</div>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em' }}>INK<span style={{ color: '#22c55e' }}>RUX</span></span>
          </a>
          <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.3)', marginLeft: 4 }}>/ Write</span>
        </div>

        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: 8 }}>
          {title ? '✅ Article received from RYDEN' : 'Submit an Article'}
        </h1>
        {title && <p style={{ fontSize: 13, color: 'rgba(240,240,240,0.4)', marginBottom: 32 }}>Your RYDEN-generated article is pre-filled below. Review, copy, and add it to the INKRUX codebase.</p>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Title</label>
            <input value={title} onChange={e => setTitle(e.target.value)}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', fontSize: 14, fontWeight: 700, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Slug</label>
              <input value={slug} onChange={e => setSlug(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', fontSize: 12, outline: 'none', fontFamily: "'JetBrains Mono', monospace", boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Tags (comma-separated)</label>
              <input value={tags} onChange={e => setTags(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', fontSize: 12, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Excerpt (2-sentence hook)</label>
            <textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>Article Body (Markdown)</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} rows={20}
              style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '14px 16px', color: '#f0f0f0', fontSize: 12, outline: 'none', fontFamily: "'JetBrains Mono', monospace", resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={copyAll}
              style={{ flex: 1, padding: '13px', background: submitted ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, color: '#22c55e', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
              {submitted ? '✅ Full Article Copied!' : '📋 Copy Full Article (Frontmatter + Body)'}
            </button>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 18px' }}>
            <div style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>To publish this article:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['1', `Open: inkrux/app/article/${slug || 'your-slug'}/page.tsx`],
                ['2', 'Copy this article and paste it into the articles array in route.ts'],
                ['3', 'Also add it to app/api/feed.xml/route.ts for RSS'],
                ['4', 'git add -A && git commit -m "feat: new article" && git push'],
                ['5', 'Vercel auto-deploys in ~30 seconds'],
              ].map(([n, step]) => (
                <div key={n} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#22c55e', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                  <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.4)', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.5 }}>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WritePage() {
  return (
    <Suspense fallback={<div style={{ background: '#040405', minHeight: '100vh' }} />}>
      <WriteContent />
    </Suspense>
  );
}
