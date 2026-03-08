'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Pen, Search, Menu, X, Rss } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(9,9,13,0.9)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(124,58,237,0.15)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '28px', height: '28px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pen size={14} color="white" />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 900, letterSpacing: '-0.05em', color: '#fff' }}>INK<span style={{ color: '#7c3aed' }}>RUX</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/write" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'linear-gradient(135deg, #7c3aed, #ec4899)', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 700, color: '#fff', letterSpacing: '0.05em' }}>
            <Pen size={12} /> Write
          </Link>
          <Link href="/newsletter" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', color: '#aaa', letterSpacing: '0.05em' }}>
            <Rss size={12} /> Subscribe
          </Link>
        </div>
      </div>
    </nav>
  );
}
