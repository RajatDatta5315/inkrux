'use client';
import { useEffect, useState, Suspense } from 'react';

function WriteContent() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [source, setSource] = useState<'ryden' | 'manual'>('manual');
  const [copyStatus, setCopyStatus] = useState('');
  const [prStatus, setPrStatus] = useState('');

  useEffect(() => {
    // Try reading from base64 hash fragment first (RYDEN passes article here)
    const hash = window.location.hash.slice(1);
    if (hash) {
      try {
        const decoded = JSON.parse(decodeURIComponent(atob(hash)));
        if (decoded.title) {
          setTitle(decoded.title || '');
          setSlug(decoded.slug || '');
          setExcerpt(decoded.excerpt || '');
          setBody(decoded.body || '');
          setTags(Array.isArray(decoded.tags) ? decoded.tags.join(', ') : decoded.tags || '');
          setSource('ryden');
          // Clean URL
          window.history.replaceState(null, '', window.location.pathname);
        }
      } catch {}
    }
    // Also try URL params fallback
    const params = new URLSearchParams(window.location.search);
    if (!hash && params.get('title')) {
      setTitle(params.get('title') || '');
      setSlug(params.get('slug') || '');
      setExcerpt(params.get('excerpt') || '');
      setBody(params.get('body') || '');
      setTags(params.get('tags') || '');
      setSource('ryden');
    }
  }, []);

  const copy = (text: string, label: string) => {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    setCopyStatus(`✅ ${label} copied!`);
    setTimeout(() => setCopyStatus(''), 2500);
  };

  const copyGitPushCommand = () => {
    const tagList = tags.split(',').map(t => t.trim()).filter(Boolean);
    const ts = new Date().toISOString().split('T')[0];
    const cmd = `# 1. Add article entry to app/article/[slug]/ArticleClient.tsx
# Slug: ${slug}

# 2. Then push:
git add -A && git commit -m "feat: new article — ${title}" && git push origin main

# Vercel deploys in ~30s → live at:
# https://inkrux.kryv.network/article/${slug}`;
    copy(cmd, 'Git commands');
  };

  const copyArticleEntry = () => {
    const tagList = tags.split(',').map(t => `'${t.trim()}'`).filter(Boolean).join(', ');
    const wordCount = body.split(' ').length;
    const readMin = Math.ceil(wordCount / 200);
    const entry = `  '${slug}': {
    title: '${title.replace(/'/g, "\\'")}',
    date: '${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}',
    readTime: '${readMin}m read',
    views: Math.floor(Math.random() * 900 + 200),
    tag: ${tagList.split(', ')[0] || "'saas'"},
    excerpt: '${excerpt.replace(/'/g, "\\'")}',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    author: 'Rajat',
    content: \`${body.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`,
  },`;
    copy(entry, 'Article entry');
  };

  const s = { fontFamily: "'Sora', sans-serif" };

  return (
    <div style={{ minHeight: '100vh', background: '#040405', ...s, padding: '40px 24px 80px' }}>
      <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: 780, margin: '0 auto' }}>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, background: '#22c55e', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#040405', fontFamily: "'JetBrains Mono',monospace" }}>IX</div>
            <span style={{ fontSize: 15, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em' }}>INK<span style={{ color: '#22c55e' }}>RUX</span></span>
          </a>
          <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.25)' }}>/ Write</span>
          {source === 'ryden' && (
            <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', background: 'rgba(0,243,255,0.08)', border: '1px solid rgba(0,243,255,0.2)', borderRadius: 100, fontSize: 10, color: '#00f3ff', fontFamily: "'JetBrains Mono',monospace" }}>
              ⚡ FROM RYDEN
            </span>
          )}
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: 6 }}>
          {source === 'ryden' ? '✅ Article received from RYDEN' : 'Publish Article to INKRUX'}
        </h1>
        <p style={{ fontSize: 13, color: 'rgba(240,240,240,0.35)', marginBottom: 28, lineHeight: 1.6 }}>
          {source === 'ryden'
            ? 'Your RYDEN article is ready. Copy the entry and paste it into ArticleClient.tsx, then push.'
            : 'Fill in article details below, then copy the entry and paste into INKRUX ArticleClient.tsx.'}
        </p>

        {copyStatus && (
          <div style={{ marginBottom: 16, padding: '10px 16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 10, fontSize: 13, color: '#22c55e', fontWeight: 700 }}>
            {copyStatus}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Title" value={title} onChange={setTitle} large />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Slug (URL)" value={slug} onChange={setSlug} mono />
            <Field label="Tags (comma separated)" value={tags} onChange={setTags} />
          </div>
          <Field label="Excerpt" value={excerpt} onChange={setExcerpt} rows={2} />
          <Field label="Body (Markdown)" value={body} onChange={setBody} rows={22} mono />
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 20 }}>
          <button onClick={copyArticleEntry}
            style={{ padding: '13px', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 12, color: '#22c55e', fontSize: 13, fontWeight: 800, cursor: 'pointer', ...s }}>
            📋 Copy Article Entry
          </button>
          <button onClick={copyGitPushCommand}
            style={{ padding: '13px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: 12, color: '#818cf8', fontSize: 13, fontWeight: 800, cursor: 'pointer', ...s }}>
            🚀 Copy Git Command
          </button>
        </div>

        {/* Instructions */}
        <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '18px 20px' }}>
          <div style={{ fontSize: 11, color: 'rgba(240,240,240,0.3)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, fontFamily: "'JetBrains Mono',monospace" }}>How to publish:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              ['1', 'Click "Copy Article Entry" above'],
              ['2', 'Open terminal → nano ~/kryv-empire/inkrux/app/article/[slug]/ArticleClient.tsx'],
              ['3', 'Find the ARTICLES object, paste your entry at the top'],
              ['4', 'Also add slug to app/sitemap.ts SLUGS array'],
              ['5', 'git add -A && git commit -m "feat: article — ' + (slug || 'your-slug') + '" && git push'],
              ['6', '✅ Live at inkrux.kryv.network/article/' + (slug || 'your-slug') + ' in ~30s'],
            ].map(([n, step]) => (
              <div key={n} style={{ display: 'flex', gap: 10 }}>
                <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: '#22c55e', fontWeight: 800, flexShrink: 0 }}>{n}</span>
                <span style={{ fontSize: 12, color: 'rgba(240,240,240,0.4)', fontFamily: "'JetBrains Mono',monospace", lineHeight: 1.6 }}>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, rows, mono, large }: {
  label: string; value: string; onChange: (v: string) => void;
  rows?: number; mono?: boolean; large?: boolean;
}) {
  const base = {
    width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10, padding: '11px 14px', color: '#f0f0f0', outline: 'none',
    fontFamily: mono ? "'JetBrains Mono',monospace" : "'Sora',sans-serif",
    fontSize: large ? 14 : 12, boxSizing: 'border-box' as const, lineHeight: 1.6,
  };
  return (
    <div>
      <div style={{ fontSize: 10, color: 'rgba(240,240,240,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6, fontFamily: "'JetBrains Mono',monospace" }}>{label}</div>
      {rows
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={rows} style={{ ...base, resize: 'vertical' }} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={base} />
      }
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
