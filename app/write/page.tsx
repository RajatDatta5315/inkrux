'use client';
import { useState } from 'react';
import Navbar from '../../components/Navbar';
import { Send, Eye, Edit3 } from 'lucide-react';

const TAGS = ['AI', 'SaaS', 'Indie Hacking', 'Development', 'Marketing', 'Growth'];

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState('');

  const handlePublish = async () => {
    if (!title || !content || !tag) { setStatus('Fill all fields'); return; }
    setStatus('publishing');
    try {
      const res = await fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content, tag })
      });
      setStatus(res.ok ? 'published' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#09090d' }}>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#fff', margin: 0 }}>Write an Article</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setPreview(!preview)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', border: '1px solid #1a1a2e', borderRadius: '8px', background: 'transparent', color: '#aaa', fontSize: '12px', cursor: 'pointer', fontFamily: 'inherit' }}>
              {preview ? <><Edit3 size={12} /> Edit</> : <><Eye size={12} /> Preview</>}
            </button>
            <button onClick={handlePublish}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '8px', border: 'none', color: '#fff', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>
              <Send size={12} /> {status === 'publishing' ? 'Publishing...' : status === 'published' ? '✓ Published!' : 'Publish'}
            </button>
          </div>
        </div>

        <div style={{ background: '#101018', border: '1px solid #1a1a2e', borderRadius: '16px', padding: '32px' }}>
          <input
            placeholder="Article title..."
            value={title} onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', background: 'transparent', border: 'none', fontSize: '28px', fontWeight: 900, color: '#fff', outline: 'none', marginBottom: '20px', fontFamily: 'inherit' }}
          />

          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
            {TAGS.map(t => (
              <button key={t} onClick={() => setTag(t)}
                style={{ padding: '6px 14px', borderRadius: '20px', border: `1px solid ${tag === t ? '#7c3aed' : '#1a1a2e'}`, background: tag === t ? 'rgba(124,58,237,0.15)' : 'transparent', fontSize: '11px', color: tag === t ? '#7c3aed' : '#555', cursor: 'pointer', fontFamily: 'inherit' }}>
                {t}
              </button>
            ))}
          </div>

          {preview ? (
            <div style={{ minHeight: '400px', color: '#aaa', lineHeight: 1.8, fontSize: '15px', whiteSpace: 'pre-wrap' }}>
              {content || <span style={{ color: '#333' }}>Nothing to preview yet...</span>}
            </div>
          ) : (
            <textarea
              placeholder="Write your article in Markdown...

## Start with a hook
Tell them what they will learn in the first sentence.

## The Meat
Share the real insight. Be specific. Give examples."
              value={content} onChange={(e) => setContent(e.target.value)}
              style={{ width: '100%', minHeight: '500px', background: 'transparent', border: 'none', color: '#e0e0e0', outline: 'none', fontSize: '15px', lineHeight: 1.8, resize: 'vertical', fontFamily: 'inherit' }}
            />
          )}
        </div>

        <div style={{ marginTop: '16px', padding: '12px 16px', background: '#101018', border: '1px solid #1a1a2e', borderRadius: '10px', fontSize: '11px', color: '#555' }}>
          Tip: Use Markdown formatting. ## for headings, **bold**, `code`, - for lists
        </div>
      </div>
    </div>
  );
}
