'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import { Rss, Check, Zap, Globe, Code2 } from 'lucide-react';

export default function NewsletterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubscribe = async () => {
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#09090d' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ width: '64px', height: '64px', background: '#22c55e', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <Rss size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.04em' }}>INKRUX Weekly</h1>
          <p style={{ fontSize: '16px', color: '#666', lineHeight: 1.7 }}>
            Every Sunday. 3-5 articles on AI, SaaS, and indie hacking from people who are actually shipping.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '40px' }}>
          {[{ icon: <Zap size={16} color="#ec4899" />, label: 'Weekly drops', value: 'Every Sunday' }, { icon: <Globe size={16} color="#22c55e" />, label: 'Subscribers', value: '2,400+' }, { icon: <Code2 size={16} color="#06b6d4" />, label: 'No spam', value: 'Ever' }].map((s, i) => (
            <div key={i} style={{ padding: '16px', background: '#101018', border: '1px solid #1a1a2e', borderRadius: '12px', textAlign: 'center' }}>
              <div style={{ marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff' }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: '#555', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {status === 'success' ? (
          <div style={{ padding: '32px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '16px', textAlign: 'center' }}>
            <Check size={32} color="#22c55e" style={{ margin: '0 auto 16px', display: 'block' }} />
            <h2 style={{ color: '#fff', margin: '0 0 8px' }}>You are in!</h2>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>First issue arrives this Sunday. Check your spam folder just in case.</p>
          </div>
        ) : (
          <div style={{ background: '#101018', border: '1px solid #1a1a2e', borderRadius: '16px', padding: '32px' }}>
            <input
              type="email" placeholder="your@email.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
              style={{ width: '100%', background: '#09090d', border: '1px solid #1a1a2e', borderRadius: '10px', padding: '14px 16px', fontSize: '14px', color: '#e0e0e0', outline: 'none', marginBottom: '12px', fontFamily: 'inherit' }}
            />
            <button onClick={handleSubscribe}
              style={{ width: '100%', padding: '14px', background: '#22c55e', borderRadius: '10px', border: 'none', fontSize: '14px', fontWeight: 700, color: '#fff', cursor: 'pointer', fontFamily: 'inherit' }}>
              {status === 'loading' ? 'Joining...' : 'Subscribe Free →'}
            </button>
            <p style={{ fontSize: '11px', color: '#444', textAlign: 'center', margin: '12px 0 0' }}>
              No spam. Unsubscribe anytime. Built on KRYV Network.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
