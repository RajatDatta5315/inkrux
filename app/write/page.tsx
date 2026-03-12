'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

const RELAY_API = 'https://scrapyr-api.rajatdatta90000.workers.dev';

function WriteContent() {
  const params = useSearchParams();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const relayId = params.get('relay');
    if (relayId) {
      setLoading(true);
      fetch(`${RELAY_API}/relay/${relayId}`)
        .then(r => r.json())
        .then(data => {
          if (data.article) {
            const a = data.article;
            setTitle(a.title || ''); setSlug(a.slug || '');
            setExcerpt(a.excerpt || ''); setBody(a.body || '');
            setTags(Array.isArray(a.tags) ? a.tags.join(', ') : (a.tags || ''));
          }
        }).catch(() => {}).finally(() => setLoading(false));
    } else if (params.get('title')) {
      setTitle(params.get('title') || ''); setSlug(params.get('slug') || '');
      setExcerpt(params.get('excerpt') || ''); setBody(params.get('body') || '');
      setTags(params.get('tags') || '');
    }
  }, [params]);

  const copyAll = () => {
    const full = `---\ntitle: ${title}\nslug: ${slug}\nexcerpt: ${excerpt}\ntags: [${tags}]\n---\n\n${body}`;
    try { navigator.clipboard.writeText(full).then(() => { setCopied(true); setTimeout(() => setCopied(false), 3000); }); }
    catch {
      const ta = document.createElement('textarea');
      ta.value = full; ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
      document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
      setCopied(true); setTimeout(() => setCopied(false), 3000);
    }
  };

  const label: React.CSSProperties = { fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'block', marginBottom: 6 };
  const input: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', fontSize: 13, outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };

  return (
    <div style={{ minHeight: '100vh', background: '#040405', fontFamily: "'Sora', sans-serif", padding: '48px 24px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, width: 'fit-content' }}>
          <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#040405', fontFamily: "'JetBrains Mono', monospace" }}>IX</div>
          <span style={{ fontSize: 15, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em' }}>INK<span style={{ color: '#22c55e' }}>RUX</span></span>
          <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.3)', marginLeft: 4 }}>/ Publish</span>
        </a>

        {loading && <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(240,240,240,0.3)', fontSize: 13 }}>⚡ Loading article from RYDEN...</div>}

        {!loading && (
          <>
            <div style={{ marginBottom: 24 }}>
              <h1 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: 6 }}>{title || 'New Article'}</h1>
              {title && <p style={{ fontSize: 12, color: '#22c55e', fontFamily: "'JetBrains Mono',monospace" }}>✅ Article from RYDEN — review, edit, then copy to publish</p>}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div><span style={label}>Title</span><input value={title} onChange={e => setTitle(e.target.value)} style={{ ...input, fontSize: 14, fontWeight: 700 }} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div><span style={label}>Slug</span><input value={slug} onChange={e => setSlug(e.target.value)} style={{ ...input, fontFamily: "'JetBrains Mono',monospace" }} /></div>
                <div><span style={label}>Tags</span><input value={tags} onChange={e => setTags(e.target.value)} placeholder="saas, ai, geo" style={input} /></div>
              </div>
              <div><span style={label}>Excerpt</span><textarea value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} style={{ ...input, resize: 'vertical' as const }} /></div>
              <div><span style={label}>Body (Markdown)</span>
                <textarea value={body} onChange={e => setBody(e.target.value)} rows={20} style={{ ...input, fontFamily: "'JetBrains Mono',monospace", resize: 'vertical' as const, lineHeight: 1.7 }} />
              </div>
              <button onClick={copyAll} style={{ width: '100%', padding: '14px', background: copied ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, color: '#22c55e', fontSize: 14, fontWeight: 800, cursor: 'pointer', fontFamily: 'inherit' }}>
                {copied ? '✅ Copied! Paste into INKRUX article file' : '📋 Copy Full Article (Frontmatter + Body)'}
              </button>
              <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 18px' }}>
                <div style={{ fontSize: 11, color: 'rgba(240,240,240,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>To publish:</div>
                {[['1', `Open: inkrux/app/article/${slug || 'your-slug'}/page.tsx`], ['2','Add to articles array in inkrux/app/api/feed.xml/route.ts'], ['3','git commit -m "feat: add article" && git push'], ['4','Vercel deploys in ~30s ✓']].map(([n, s]) => (
                  <div key={n} style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#22c55e', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{n}</span>
                    <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.4)', fontFamily: "'JetBrains Mono',monospace" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
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
