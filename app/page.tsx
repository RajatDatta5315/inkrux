'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { ArrowRight, Eye, Clock } from 'lucide-react';

const TAGS = ['All', 'AI', 'SaaS', 'Dev', 'Indie Hacking', 'Marketing', 'Growth'];

// Real articles about KRYV Network and the builder ecosystem
const ARTICLES: any[] = [
  {
    id:'1', slug:'building-30-saas-in-one-year',
    title:'I built 30 SaaS products in one year. Here is every lesson.',
    excerpt:'Most founders spend two years on one product. I spent one year on thirty. Not because I am fast — because I built systems that build products for me.',
    tag:'Indie Hacking', author:'Rajat', readTime:9, views:5800,
    date:'Mar 8, 2026', featured:true,
    image:'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
  },
  {
    id:'2', slug:'geo-beats-seo-2026-full-playbook',
    title:'GEO will matter more than SEO by 2027. Here is the full playbook.',
    excerpt:'When someone asks ChatGPT or Perplexity to recommend a SaaS tool, they do not see your Google ranking. They see what the AI knows about you. GEO is how you control that.',
    tag:'Marketing', author:'Rajat', readTime:8, views:4200,
    date:'Mar 7, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    id:'3', slug:'why-cloudflare-workers-beats-aws',
    title:'Why I moved every backend to Cloudflare Workers and never looked back',
    excerpt:'Zero cold starts. Edge deployment in 160+ cities. D1, KV, R2, AI — all in one platform. AWS had its time. For indie SaaS in 2026, Cloudflare Workers is the obvious choice.',
    tag:'Dev', author:'Rajat', readTime:6, views:3100,
    date:'Mar 6, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    id:'4', slug:'llms-txt-the-geo-file-every-saas-needs',
    title:'llms.txt: the GEO file every SaaS needs and almost nobody has',
    excerpt:'In 2026, AI crawlers from OpenAI, Anthropic, and Perplexity read llms.txt before anything else. If you do not have one, you are invisible to them. Here is exactly what to write.',
    tag:'AI', author:'Rajat', readTime:5, views:7400,
    date:'Mar 5, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  },
  {
    id:'5', slug:'how-velqa-auto-creates-geo-prs',
    title:'How VELQA autonomously creates GitHub PRs for GEO optimization',
    excerpt:'Connect your repo. VELQA audits your site for missing AI crawler files, then opens a real GitHub Pull Request with llms.txt, robots.txt, and schema.json already written. Zero manual work.',
    tag:'AI', author:'Rajat', readTime:5, views:2100,
    date:'Mar 4, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=800&q=80',
  },
  {
    id:'6', slug:'charged-99-before-writing-code',
    title:'I charged $99 before writing a single line of code. It worked.',
    excerpt:'The biggest mistake founders make is building before validating. Here is the exact process I used to collect money for a product that did not exist yet — and why it was the right move.',
    tag:'SaaS', author:'Rajat', readTime:4, views:6200,
    date:'Mar 3, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    id:'7', slug:'nodemeld-autonomous-saas-discovery',
    title:'NodeMeld: building a SaaS hunt with autonomous AI discovery',
    excerpt:'Product Hunt is curated by humans. NodeMeld is curated by agents. Every hour, it scrapes Reddit, HN, and product directories — adds new SaaS automatically, no human in the loop.',
    tag:'Growth', author:'Rajat', readTime:6, views:1800,
    date:'Mar 2, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
  },
  {
    id:'8', slug:'programmatic-seo-10000-pages-kryvlayer',
    title:'From 0 to 10,000 landing pages with KryvLayer',
    excerpt:'Google rewards sites with depth. KryvLayer generates thousands of SEO-optimized pages for your domain — one for every keyword cluster your competitors rank for. Here is how it works.',
    tag:'Marketing', author:'Rajat', readTime:7, views:2900,
    date:'Mar 1, 2026', featured:false,
    image:'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
];

const TAG_COLORS: Record<string,{text:string;border:string;bg:string}> = {
  AI:           {text:'#22c55e', border:'rgba(34,197,94,0.22)', bg:'rgba(34,197,94,0.08)'},
  SaaS:         {text:'rgba(240,240,240,0.7)', border:'rgba(255,255,255,0.1)', bg:'rgba(255,255,255,0.04)'},
  Dev:          {text:'rgba(240,240,240,0.7)', border:'rgba(255,255,255,0.1)', bg:'rgba(255,255,255,0.04)'},
  'Indie Hacking':{text:'rgba(240,240,240,0.65)', border:'rgba(255,255,255,0.08)', bg:'rgba(255,255,255,0.03)'},
  Marketing:    {text:'rgba(240,240,240,0.7)', border:'rgba(255,255,255,0.1)', bg:'rgba(255,255,255,0.04)'},
  Growth:       {text:'rgba(240,240,240,0.7)', border:'rgba(255,255,255,0.1)', bg:'rgba(255,255,255,0.04)'},
};

function Tag({ tag }: { tag: string }) {
  const c = TAG_COLORS[tag] || {text:'rgba(240,240,240,0.5)',border:'rgba(255,255,255,0.08)',bg:'rgba(255,255,255,0.03)'};
  return <span style={{ display:'inline-flex',alignItems:'center',fontSize:9,fontFamily:"'JetBrains Mono',monospace",fontWeight:600,letterSpacing:'0.12em',textTransform:'uppercase',padding:'3px 9px',borderRadius:4,background:c.bg,color:c.text,border:`1px solid ${c.border}` }}>{tag}</span>;
}

export default function Home() {
  const [activeTag, setActiveTag] = useState('All');
  const filtered = activeTag === 'All' ? ARTICLES : ARTICLES.filter(a => a.tag === activeTag);
  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== (featured?.id));

  return (
    <>
      <div className="ambient" />
      <Navbar />
      <main style={{ maxWidth:1140,margin:'0 auto',padding:'48px 24px 96px',position:'relative',zIndex:1 }}>

        {/* Hero headline */}
        <div style={{ marginBottom:48, maxWidth:620 }}>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(2.8rem,6vw,4rem)',fontWeight:600,letterSpacing:'-0.03em',lineHeight:1.1,color:'#f0f0f0',marginBottom:16 }}>
            Articles for people<br /><span style={{ color:'#22c55e' }}>building the future.</span>
          </h1>
          <p style={{ fontSize:15,color:'rgba(240,240,240,0.42)',fontFamily:"'Sora',sans-serif",lineHeight:1.7 }}>
            Deep reads on AI, SaaS, and building in public. No paywalls. No fluff. Pure builder signal from the KRYV Network.
          </p>
        </div>

        {/* Tag filter */}
        <div style={{ display:'flex',gap:6,flexWrap:'wrap',marginBottom:40 }}>
          {TAGS.map(t => (
            <button key={t} onClick={() => setActiveTag(t)}
              className={`pill${activeTag===t?' active':''}`}>{t}</button>
          ))}
        </div>

        {/* Featured article */}
        {featured && (
          <Link href={`/article/${featured.slug}`} style={{ display:'block',textDecoration:'none',marginBottom:24 }}
            className="up">
            <div style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.055)',borderRadius:14,overflow:'hidden',display:'grid',gridTemplateColumns:'1fr 400px',transition:'border-color 0.18s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.11)'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.055)'}>
              <div style={{ padding:'40px 48px',display:'flex',flexDirection:'column',justifyContent:'space-between' }}>
                <div>
                  <div style={{ display:'flex',alignItems:'center',gap:10,marginBottom:20 }}>
                    <span style={{ fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:'#22c55e',letterSpacing:'0.15em',textTransform:'uppercase' }}>Featured</span>
                    <span style={{ width:3,height:3,borderRadius:'50%',background:'rgba(255,255,255,0.15)',display:'inline-block' }} />
                    <Tag tag={featured.tag} />
                  </div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'clamp(1.6rem,3vw,2.4rem)',fontWeight:600,color:'#f0f0f0',letterSpacing:'-0.02em',lineHeight:1.2,marginBottom:16 }}>
                    {featured.title}
                  </h2>
                  <p style={{ fontSize:14,color:'rgba(240,240,240,0.42)',lineHeight:1.75,maxWidth:480 }}>{featured.excerpt}</p>
                </div>
                <div style={{ display:'flex',alignItems:'center',gap:16,marginTop:28 }}>
                  <span style={{ fontSize:11,color:'rgba(240,240,240,0.35)',fontFamily:"'JetBrains Mono',monospace" }}>@{featured.author}</span>
                  <span style={{ fontSize:11,color:'rgba(240,240,240,0.25)',fontFamily:"'JetBrains Mono',monospace",display:'flex',alignItems:'center',gap:4 }}><Clock size={10}/>{featured.readTime}m</span>
                  <span style={{ fontSize:11,color:'rgba(240,240,240,0.25)',fontFamily:"'JetBrains Mono',monospace",display:'flex',alignItems:'center',gap:4 }}><Eye size={10}/>{featured.views.toLocaleString()}</span>
                  <span style={{ marginLeft:'auto',fontSize:12,color:'#22c55e',display:'flex',alignItems:'center',gap:5,fontWeight:700,fontFamily:"'Sora',sans-serif" }}>Read <ArrowRight size={13}/></span>
                </div>
              </div>
              <div style={{ position:'relative',overflow:'hidden' }}>
                {featured.image && <img src={featured.image} alt={featured.title} style={{ width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(0.7) saturate(0.8)' }} />}
              </div>
            </div>
          </Link>
        )}

        {/* Article grid */}
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16 }}>
          {rest.map((a,i) => (
            <Link key={a.id} href={`/article/${a.slug}`} style={{ textDecoration:'none' }} className="up">
              <article style={{ background:'rgba(255,255,255,0.025)',border:'1px solid rgba(255,255,255,0.055)',borderRadius:12,overflow:'hidden',height:'100%',display:'flex',flexDirection:'column',transition:'border-color 0.18s,background 0.18s',animationDelay:`${i*40}ms` }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.1)';(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.038)'}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(255,255,255,0.055)';(e.currentTarget as HTMLElement).style.background='rgba(255,255,255,0.025)'}}>
                {a.image && (
                  <div style={{ height:160,overflow:'hidden',flexShrink:0 }}>
                    <img src={a.image} alt={a.title} style={{ width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.65) saturate(0.7)',transition:'transform 0.4s,filter 0.3s' }}
                      onMouseEnter={e=>{(e.currentTarget as HTMLImageElement).style.transform='scale(1.04)';(e.currentTarget as HTMLImageElement).style.filter='brightness(0.75) saturate(0.85)'}}
                      onMouseLeave={e=>{(e.currentTarget as HTMLImageElement).style.transform='scale(1)';(e.currentTarget as HTMLImageElement).style.filter='brightness(0.65) saturate(0.7)'}} />
                  </div>
                )}
                <div style={{ padding:'22px 24px',flex:1,display:'flex',flexDirection:'column' }}>
                  <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14 }}>
                    <Tag tag={a.tag} />
                    <span style={{ fontSize:9,color:'rgba(240,240,240,0.22)',fontFamily:"'JetBrains Mono',monospace" }}>{a.readTime}m read</span>
                  </div>
                  <h2 style={{ fontFamily:"'Cormorant Garamond',serif",fontSize:'1.22rem',fontWeight:600,color:'#f0f0f0',letterSpacing:'-0.01em',lineHeight:1.35,flex:1,marginBottom:16 }}>
                    {a.title}
                  </h2>
                  <p style={{ fontSize:12,color:'rgba(240,240,240,0.38)',lineHeight:1.65,marginBottom:18,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden' }}>
                    {a.excerpt}
                  </p>
                  <div style={{ display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'auto' }}>
                    <div style={{ display:'flex',alignItems:'center',gap:10 }}>
                      <span style={{ fontSize:11,color:'rgba(240,240,240,0.28)',fontFamily:"'JetBrains Mono',monospace" }}>@{a.author}</span>
                      <span style={{ fontSize:11,color:'rgba(240,240,240,0.18)',fontFamily:"'JetBrains Mono',monospace",display:'flex',alignItems:'center',gap:3 }}><Eye size={9}/>{a.views.toLocaleString()}</span>
                    </div>
                    <ArrowRight size={14} style={{ color:'rgba(240,240,240,0.25)' }} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
