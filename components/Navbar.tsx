'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PenLine, Rss, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav style={{ position:'sticky',top:0,zIndex:100,background:'rgba(4,4,5,0.92)',backdropFilter:'blur(20px)',WebkitBackdropFilter:'blur(20px)',borderBottom:'1px solid rgba(255,255,255,0.055)' }}>
        <div style={{ maxWidth:1140,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:58 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration:'none',display:'flex',alignItems:'center',gap:10 }}>
            <div style={{ width:30,height:30,background:'#22c55e',borderRadius:7,display:'flex',alignItems:'center',justifyContent:'center' }}>
              <span style={{ fontFamily:"'JetBrains Mono',monospace",fontWeight:700,fontSize:12,color:'#040405',letterSpacing:'-0.05em' }}>IX</span>
            </div>
            <span style={{ fontFamily:"'Sora',sans-serif",fontSize:16,fontWeight:800,letterSpacing:'-0.04em',color:'#f0f0f0' }}>
              INK<span style={{ color:'#22c55e' }}>RUX</span>
            </span>
          </Link>

          {/* Nav links */}
          <div style={{ display:'flex',alignItems:'center',gap:6 }}>
            <Link href="/newsletter" style={{ display:'flex',alignItems:'center',gap:5,padding:'7px 14px',border:'1px solid rgba(255,255,255,0.06)',borderRadius:8,textDecoration:'none',fontSize:12,color:'rgba(240,240,240,0.45)',fontFamily:"'Sora',sans-serif",fontWeight:600,transition:'all 0.15s' }}
              onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.12)';(e.currentTarget as HTMLElement).style.color='rgba(240,240,240,0.75)'}}
              onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.06)';(e.currentTarget as HTMLElement).style.color='rgba(240,240,240,0.45)'}}>
              <Rss size={11} /> Subscribe
            </Link>
            <Link href="/write" style={{ display:'flex',alignItems:'center',gap:6,padding:'7px 16px',background:'#22c55e',borderRadius:8,textDecoration:'none',fontSize:12,fontWeight:800,color:'#040405',fontFamily:"'Sora',sans-serif",letterSpacing:'0.01em' }}>
              <PenLine size={12} /> Write
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
