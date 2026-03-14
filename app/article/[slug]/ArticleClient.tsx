'use client';
import React from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import { ArrowLeft, Clock, Eye, Calendar } from 'lucide-react';

// Full article content — real articles about the KRYV ecosystem
const ARTICLES: Record<string, any> = {
  'building-30-saas-in-one-year': {
    title: 'I built 30 SaaS products in one year. Here is every lesson.',
    excerpt: 'Most founders spend two years on one product. I built thirty in one year — not because I am fast, but because I built systems that build products for me.',
    tag: 'Indie Hacking', author: 'Rajat', readTime: 9, views: 5800,
    date: 'March 8, 2026',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&q=80',
    content: `
## Why thirty products in one year

Most founders I know are building one product. They have been building it for two years. They have a landing page. They have a waitlist. They are still refining the onboarding.

I went the other direction. Thirty products in twelve months. Not because I am reckless — because I made a deliberate decision that volume beats perfection at the early stage.

Here is what I learned.

## The KRYV Architecture

Every product I build runs on the same infrastructure. Cloudflare Workers for the backend. Next.js or Vite React for the frontend. Neon PostgreSQL or Cloudflare D1 for the database. Groq for AI. Resend for email.

This means every new product I start has zero infrastructure cost to begin with. I clone a template. I change the name, the domain, the specific AI prompt. I ship in a day.

The KRYV empire — what I call the network of 30 products — is not thirty separate companies. It is one organism with thirty surfaces.

## The three products that matter most

**VELQA** is my GEO optimization tool. GEO means Generative Engine Optimization — making sure AI crawlers from OpenAI, Anthropic, and Perplexity understand your product. VELQA audits your site, generates llms.txt, robots.txt for AI, and schema files, and opens GitHub pull requests automatically. Zero manual work.

**KRYVLayer** is programmatic SEO at scale. Connect your domain, and KRYVLayer generates thousands of landing pages — one per keyword cluster. Google sees depth. Your traffic compounds.

**VIGILIS** is my false conversation detector. It watches AI responses in real time and flags when models hallucinate or contradict established facts. Running 24/7 on my Linux machine.

## What actually drives growth

Not features. Distribution.

I built NodeMeld — a SaaS hunt platform — specifically to list all my own products. Every product I build gets listed on a platform I also own. Every article I write on INKRUX links to the relevant product. Every VELQA optimization improves the GEO score for the entire KRYV network.

The ecosystem feeds itself.

## The mistake I made most often

Spending too long on UI before validating demand. The prettiest products I built got the least traction. The ugliest one — a simple API endpoint with a landing page — made money in week one.

## What year two looks like

Fewer new products. Deeper builds on the ones that have traction. The architecture is already in place. Now it is about depth, not breadth.

If you are building in 2026, the meta-lesson is this: build your infrastructure once, then build products on top of it infinitely.
`,
  },
  'geo-beats-seo-2026-full-playbook': {
    title: 'GEO will matter more than SEO by 2027. Here is the full playbook.',
    excerpt: 'When someone asks ChatGPT to recommend a SaaS tool, they do not see your Google ranking. They see what the AI knows about you.',
    tag: 'Marketing', author: 'Rajat', readTime: 8, views: 4200,
    date: 'March 7, 2026',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    content: `
## The shift nobody is talking about loudly enough

In 2023, if you wanted traffic, you needed to rank on Google. In 2026, that is still true — but something new is happening. An increasing percentage of discovery now happens through AI interfaces.

Someone opens ChatGPT and asks: "What is the best programmatic SEO tool?" They do not see a list of blue links. They see a paragraph that mentions specific tools by name, with context.

If your product is not in that paragraph, you are invisible to that user.

This is GEO — Generative Engine Optimization. And it is not a future concern. It is happening now.

## The five GEO signals that matter

**1. llms.txt** — This is the most important file you can add to your site in 2026. Modeled after robots.txt, it tells AI crawlers exactly what your product does, who it is for, and what permissions you grant. OpenAI's GPTBot, Anthropic's Claude-Web, and Perplexity all read this file. If you do not have one, write one today.

**2. Structured schema.org markup** — JSON-LD schema on your product pages tells AI what category your product falls into, what problem it solves, and what the pricing is. This is how AI can confidently recommend you.

**3. AI-crawler-specific robots.txt rules** — The default robots.txt does not include rules for GPTBot, Claude-Web, PerplexityBot, or Amazonbot. Add them explicitly. Allow them on your important pages.

**4. Semantic depth** — AI crawlers do not just read your homepage. They read your documentation, your blog, your help center. The more depth you have on a topic, the more confidently an AI will cite you as authoritative.

**5. Mentions in trusted sources** — When other sites link to you and describe what you do, AI crawlers aggregate that signal. GitHub READMEs, technical blogs, and developer documentation are high-weight sources.

## How VELQA automates all of this

VELQA is the tool I built to solve this for myself, then turned into a product. You connect your GitHub repo. VELQA audits your site for all five signals. For each missing file, it opens a real GitHub Pull Request with the correct content already written.

You review the PR. You merge it. Your GEO score goes up.

The Cloudflare Worker runs on a six-hour cron — but it checks first whether my VIGILIS system on my Linux machine already ran a monitoring cycle. If it did, the cron skips. Your PC runs primary; the cloud runs as backup.

## The compounding effect

GEO compounds faster than SEO. When an AI recommends you once and a user has a good experience, the AI is more likely to recommend you again. The feedback loop is faster than Google's crawl cycle.

Start now. Add llms.txt. Add the AI crawler rules to robots.txt. The tools to do this automatically already exist.
`,
  },
  'why-cloudflare-workers-beats-aws': {
    title: 'Why I moved every backend to Cloudflare Workers and never looked back',
    excerpt: 'Zero cold starts. Edge deployment in 160+ cities. D1, KV, R2, AI — all in one platform.',
    tag: 'Dev', author: 'Rajat', readTime: 6, views: 3100,
    date: 'March 6, 2026',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    content: `
## The infrastructure problem for indie builders

Running a SaaS on AWS is expensive in time before it is expensive in money. You configure EC2 instances or Lambda functions. You set up VPCs. You manage IAM roles. You wire up RDS. You pay for idle compute.

For a solo founder building thirty products, this is death by configuration.

Cloudflare Workers solves this entirely.

## What the stack looks like

Every KRYV backend is a Cloudflare Worker. The Worker runs in V8 isolates at the edge — no servers, no containers, no cold starts. Request latency is measured in single-digit milliseconds globally.

For storage: D1 is Cloudflare's SQLite database at the edge. KV is global key-value storage with sub-millisecond reads. R2 is object storage with no egress fees.

For AI: Cloudflare AI runs Llama 3.1 at the edge without any additional API keys. But for most KRYV products, I use Groq's API — their Llama-3.3-70b inference is faster than anything else on the market at the price point.

## The deployment model that changed everything

\`\`\`bash
wrangler deploy
\`\`\`

That is the entire deployment pipeline. No Docker. No CI/CD configuration. No container registry. One command, deployed globally in under thirty seconds.

When I update VELQA's backend, it is live worldwide before I have closed the terminal.

## The cost model

The free tier covers most early-stage products entirely. 100,000 Worker requests per day. 5 million KV reads. 25 million D1 rows per day. For a product with under 1,000 daily active users, the cost is zero.

When you start paying, it is $5 per month for 10 million Worker requests. Compare that to the minimum cost of running anything on AWS that is actually production-ready.

## What I gave up

SQL joins are limited in D1 compared to full PostgreSQL. For complex relational data, I use Neon PostgreSQL via their serverless driver — it works fine from a Worker.

Cloudflare Workers are not ideal for long-running background jobs. For anything over 30 seconds, I run it on my Linux machine (where VIGILIS lives) or use a Cloudflare Queue with a separate consumer Worker.

But for the vast majority of API endpoints that indie SaaS products need? Workers are the right choice.
`,
  },
  'llms-txt-the-geo-file-every-saas-needs': {
    title: 'llms.txt: the GEO file every SaaS needs and almost nobody has',
    excerpt: 'AI crawlers from OpenAI, Anthropic, and Perplexity read llms.txt before anything else. If you do not have one, you are invisible to them.',
    tag: 'AI', author: 'Rajat', readTime: 5, views: 7400,
    date: 'March 5, 2026',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    content: `
## What is llms.txt

llms.txt is a plain text file that lives at the root of your website — accessible at \`yourdomain.com/llms.txt\`. It tells AI language models and crawlers who you are, what your product does, and what you want them to know about you.

Think of it as robots.txt, but for AI — except instead of saying "do not crawl this", it says "here is exactly what to understand about me."

## Why it matters now

OpenAI's GPTBot, Anthropic's ClaudeBot, and Perplexity's crawler all read this file when they index your site. The content you put in llms.txt directly influences how AI systems describe your product when users ask about it.

If you do not have llms.txt, AI crawlers guess what your product does based on your homepage text, your meta descriptions, and whatever they can scrape. The result is often incomplete or wrong.

With a well-written llms.txt, you control the narrative.

## What to put in it

Here is a real example from VELQA:

\`\`\`
# VELQA — GEO Optimization for AI Crawlers

> VELQA helps SaaS products optimize for Generative Engine Optimization (GEO).
> It audits sites, generates llms.txt and robots.txt files, and opens GitHub PRs automatically.

## Product
VELQA is available at https://velqa.kryv.network
Part of the KRYV Network — https://kryv.network

## What We Do
- GEO audit: analyze sites for AI crawler visibility
- Auto-generate llms.txt, robots.txt, schema.json
- Open GitHub Pull Requests with generated files
- Continuous monitoring every 6 hours

## AI Crawler Permissions
GPTBot: Allow
ClaudeBot: Allow
PerplexityBot: Allow
anthropic-ai: Allow
Amazonbot: Allow
\`\`\`

The format is simple: a short description, your URL, what you do, and explicit permissions for AI crawlers.

## The slms.txt extension

Some KRYV products also ship \`slms.txt\` — Small Language Model Summary — a 50-word ultra-compressed description for smaller models with limited context windows. This is not a standard yet, but we are betting it becomes one.

## How to generate yours automatically

VELQA generates this file for you. Connect your GitHub repo at velqa.kryv.network, and it will write the llms.txt based on your site content and open a PR. Takes thirty seconds.
`,
  },
  'how-velqa-auto-creates-geo-prs': {
    title: 'How VELQA autonomously creates GitHub PRs for GEO optimization',
    excerpt: 'Connect your repo. VELQA audits your site, then opens a real GitHub Pull Request with llms.txt, robots.txt, and schema.json already written.',
    tag: 'AI', author: 'Rajat', readTime: 5, views: 2100,
    date: 'March 4, 2026',
    image: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=1200&q=80',
    content: `
## The problem with manual GEO optimization

Most SaaS founders know they should add llms.txt. Most have not done it. Not because they do not care — because it is one more thing on an already overwhelming list.

VELQA exists to make GEO a zero-effort process.

## How the autonomous loop works

**Step 1: OAuth connection.** You sign in with GitHub through VELQA's portal. Using the KRYV OAuth app (Client ID Ov23li2oOtJSQKCUwIRr — shared across all KRYV products), VELQA gets read/write access to your repositories.

**Step 2: Audit.** VELQA checks your site for three files: \`public/llms.txt\`, \`public/robots.txt\` with AI crawler rules, and \`public/schema.json\`. For each missing file, it logs a gap.

**Step 3: Generation.** Using Groq's Llama-3.3-70b, VELQA generates the correct content for each missing file — customized to your product's actual domain, brand name, and description.

**Step 4: Pull Request.** VELQA creates a new branch on your repo (\`velqa-llms-txt-{sha}\`), commits the generated file with a clear commit message, and opens a Pull Request. The PR includes a description explaining what the file does and why it improves your GEO score.

**Step 5: You merge.** The PR is waiting in your GitHub. You review it, optionally edit the content, and merge. Done.

## The 6-hour monitoring cycle

VELQA's Cloudflare Worker runs on a cron trigger every six hours. It loops through all connected repos and checks whether new GEO gaps have appeared — for example, if someone deleted a file or if new AI crawler standards have emerged.

If VIGILIS on my Linux machine ran a monitoring cycle in the last two hours, the cron skips — the PC is the primary runner, Cloudflare is the backup.

## What this means for your GEO score

In testing, adding llms.txt, an AI-aware robots.txt, and schema.json improved visibility in Perplexity and Claude responses by a measurable margin within two weeks of indexing.

The files are small. The implementation takes thirty seconds through VELQA. The payoff compounds over time.
`,
  },
  'charged-99-before-writing-code': {
    title: 'I charged $99 before writing a single line of code. It worked.',
    excerpt: 'The biggest mistake founders make is building before validating. Here is the exact process I used to collect money for a product that did not exist yet.',
    tag: 'SaaS', author: 'Rajat', readTime: 4, views: 6200,
    date: 'March 3, 2026',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
    content: `
## The validation trap

Most founders build for six months, then try to sell. They have a polished product. They have spent 800 hours on it. And then they discover that nobody wants to pay for it.

The correct order is: find pain, ask for money, then build.

## What I did

For KryvLayer — the programmatic SEO tool — I wrote a landing page in one evening. No product existed. The landing page described what the product would do: connect your domain, and it generates thousands of SEO landing pages using AI.

I added a "Get Early Access" button with a $99 one-time charge. I ran three days of Twitter posts — not ads, just posts — describing the problem. Twelve people paid.

Twelve people paying $99 for something that does not exist yet is the strongest validation signal I know.

## Why it works

When someone pays money for a product that does not exist, they are making a commitment based on the problem, not the solution. They are saying: this problem is real enough to me that I will pay before seeing the answer.

That is a different and more meaningful signal than "I would probably use this if it were free."

## The technical minimum

For KryvLayer, the MVP that I built for those first twelve users was not the full product. It was a Google Sheet connected to GPT-4 via Zapier. For each domain they submitted, I manually ran a prompt that generated 20 landing pages as HTML files.

The infrastructure — Cloudflare Workers, Neon DB, the full dashboard — came later, after I knew the demand was real.

## What to take from this

Build a landing page with a checkout before you write any code. If nobody pays, you save six months of your life. If people pay, you have both validation and initial revenue to fund the build.

The product does not need to exist. The problem needs to be real.
`,
  },
  'nodemeld-autonomous-saas-discovery': {
    title: 'NodeMeld: building a SaaS hunt with autonomous AI discovery',
    excerpt: 'Product Hunt is curated by humans. NodeMeld is curated by agents. Every hour, it scrapes Reddit, HN, and product directories — adding new SaaS automatically.',
    tag: 'Growth', author: 'Rajat', readTime: 6, views: 1800,
    date: 'March 2, 2026',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
    content: `
## Why I built a Product Hunt competitor

Product Hunt is still the dominant platform for SaaS launches. But it has a problem: it is human-curated, which means it misses 95% of indie launches. Most SaaS products never get submitted. Most that are submitted never get featured.

NodeMeld solves this by removing the human from the discovery loop.

## How the autonomous ingestion works

Every hour, a Cloudflare Worker runs a scraping cycle. It checks:

- r/SaaS, r/Entrepreneur, r/indiehackers on Reddit — new posts with product links
- Hacker News "Show HN" posts from the last 24 hours
- GitHub trending repositories in the SaaS category
- Product directories that expose public APIs

For each new product found, Groq's Llama-3.3-70b generates a standardized description, extracts the pricing model and category, and attempts to fetch the logo via Clearbit.

The product is then inserted into the NodeMeld D1 database and appears on nodemeld.kryv.network within the hour.

## GitHub OAuth for founders

Any founder can claim their product listing on NodeMeld. They click "Claim" on their product card, which redirects them to GitHub OAuth through the KRYV central OAuth app. After authorization, VELQA's backend exchanges the code and returns the GitHub token to NodeMeld.

Once claimed, the founder can edit their logo, description, pricing, and category directly from the NodeMeld UI.

## The KRYV network effect

NodeMeld is not just a discovery platform. It is also a distribution channel for every KRYV product. All 30 KRYV products are listed on NodeMeld. Every visitor to NodeMeld sees the full KRYV ecosystem.

INKRUX articles link to relevant NodeMeld listings. VELQA users discover KryvLayer through NodeMeld. Each product feeds the others.

This is the compounding architecture. No single product needs massive traction on its own. The network creates traction collectively.
`,
  },
  'programmatic-seo-10000-pages-kryvlayer': {
    title: 'From 0 to 10,000 landing pages with KryvLayer',
    excerpt: 'Google rewards sites with depth. KryvLayer generates thousands of SEO-optimized pages for your domain — one for every keyword cluster your competitors rank for.',
    tag: 'Marketing', author: 'Rajat', readTime: 7, views: 2900,
    date: 'March 1, 2026',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    content: `
## Why programmatic SEO works

The core insight of programmatic SEO is that Google's ranking algorithm rewards topical authority. A site with 10,000 pages covering every variation of a keyword cluster outranks a site with one perfect page, everything else being equal.

Traditional content teams cannot write 10,000 pages. They can write 50, maybe 100.

KryvLayer generates 10,000 in an afternoon.

## How it works technically

You connect your domain to KryvLayer and point it to a subdomain or subdirectory — for example, \`seo.yoursite.com\`. You give KryvLayer your website URL and business name.

KryvLayer then:

1. Crawls your competitor sites using SCRAPYR (our extraction engine) to identify keyword clusters they rank for
2. Uses Groq's Llama-3.3-70b to generate unique, useful content for each keyword variant
3. Creates a page for each keyword at a clean URL on your domain
4. Generates a sitemap.xml for all created pages and submits it to Google Search Console

The pages are not thin keyword-stuffed spam. They are useful, specific pages. "Best CRM for real estate agents in Mumbai" produces a page with actual information about CRM selection for that context.

## DNS setup

You add either a CNAME record (for subdomains) or an A record (for subdirectories) pointing to KryvLayer's edge network. KryvLayer serves all generated pages from that subdomain.

The DNS verification step in the add-domain wizard checks whether the record has propagated and confirms the connection before starting generation.

## Results

In testing with an early user who connected their SaaS documentation subdomain, organic impressions increased by roughly 3x within eight weeks of Google re-crawling the site. Pages generated around long-tail queries began ranking in positions 4-12 for queries that the site had zero visibility on before.

The compounding effect is why this matters. Each page generates a small number of visits. 10,000 pages generating ten visits each is 100,000 monthly visits. That number grows as Google indexes more of the pages over time.

## Getting started

KryvLayer is at kryvlayer.kryv.network. The free tier allows one domain with up to 100 pages. Paid plans start at $29/month for unlimited domains and unlimited page generation.
`,
  },
};


export default function ArticleClient() {
  const params = useParams();
  const slug = params.slug as string;
  const [article, setArticle] = React.useState<any>(ARTICLES[slug] || null);
  const [loading, setLoading] = React.useState(!ARTICLES[slug]);

  React.useEffect(() => {
    if (ARTICLES[slug]) { setArticle(ARTICLES[slug]); return; }
    fetch(`/api/articles?slug=${encodeURIComponent(slug)}`)
      .then(r => r.json())
      .then(data => { if (data.article) setArticle(data.article); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight:'100vh', background:'#040405', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontSize:13, color:'rgba(240,240,240,0.3)', fontFamily:"'JetBrains Mono',monospace" }}>Loading...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={{ minHeight:'100vh', background:'#040405', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ textAlign:'center' }}>
          <div style={{ fontSize:14, color:'rgba(240,240,240,0.4)', fontFamily:"'JetBrains Mono',monospace", marginBottom:16 }}>ARTICLE_NOT_FOUND</div>
          <Link href="/" style={{ color:'#22c55e', textDecoration:'none', fontSize:13 }}>← Back to articles</Link>
        </div>
      </div>
    );
  }

  const renderContent = (md: string) => {
    return md
      .replace(/^## (.+)$/gm, '<h2 class="serif" style="font-size:1.9rem;font-weight:600;color:#f0f0f0;margin:2.5rem 0 1rem;letter-spacing:-0.02em;line-height:1.2">$1</h2>')
      .replace(/^### (.+)$/gm, '<h3 class="serif" style="font-size:1.4rem;font-weight:500;color:rgba(240,240,240,0.9);margin:2rem 0 0.75rem;line-height:1.3">$1</h3>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#f0f0f0;font-weight:700">$1</strong>')
      .replace(/`([^`]+)`/g, '<code style="font-family:\'JetBrains Mono\',monospace;font-size:12.5px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:4px;padding:2px 7px;color:#22c55e">$1</code>')
      .replace(/```([\s\S]+?)```/gm, '<pre style="background:#0a0a0c;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:20px 24px;overflow-x:auto;margin:1.75rem 0"><code style="font-family:\'JetBrains Mono\',monospace;font-size:12.5px;color:rgba(240,240,240,0.8);line-height:1.8;white-space:pre">$1</code></pre>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:2px solid #22c55e;padding-left:1.5rem;margin:2rem 0;color:rgba(240,240,240,0.5);font-style:italic;font-family:\'Cormorant Garamond\',serif;font-size:1.25rem;line-height:1.6">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li style="margin-bottom:0.4rem;color:rgba(240,240,240,0.78)">$1</li>')
      .split('\n\n').map(p => {
        if (p.trim().startsWith('<')) return p;
        if (p.trim().startsWith('-') || p.trim().match(/^<li/)) return `<ul style="padding-left:1.4rem;margin-bottom:1.5rem">${p}</ul>`;
        return `<p style="margin-bottom:1.5rem;color:rgba(240,240,240,0.78);line-height:1.85">${p}</p>`;
      }).join('\n');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image,
    author: { '@type': 'Person', name: article.author },
    publisher: { '@type': 'Organization', name: 'INKRUX', url: 'https://inkrux.kryv.network' },
    datePublished: article.date,
    mainEntityOfPage: `https://inkrux.kryv.network/article/${slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="ambient" />
      <Navbar />
      <main style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px', position: 'relative', zIndex: 1 }}>
        <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(240,240,240,0.35)', textDecoration:'none', marginBottom:40, fontFamily:"'Sora',sans-serif", fontWeight:600 }}>
          <ArrowLeft size={13} /> All Articles
        </Link>

        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:24 }}>
          <span style={{ display:'inline-flex', alignItems:'center', fontSize:9, fontFamily:"'JetBrains Mono',monospace", fontWeight:600, letterSpacing:'0.12em', textTransform:'uppercase', padding:'3px 9px', borderRadius:4, background:'rgba(34,197,94,0.08)', color:'#22c55e', border:'1px solid rgba(34,197,94,0.22)' }}>{article.tag}</span>
          <span style={{ fontSize:11, color:'rgba(240,240,240,0.28)', fontFamily:"'JetBrains Mono',monospace", display:'flex', alignItems:'center', gap:4 }}><Clock size={10}/>{article.readTime}m read</span>
          <span style={{ fontSize:11, color:'rgba(240,240,240,0.28)', fontFamily:"'JetBrains Mono',monospace", display:'flex', alignItems:'center', gap:4 }}><Eye size={10}/>{article.views.toLocaleString()}</span>
          <span style={{ fontSize:11, color:'rgba(240,240,240,0.25)', fontFamily:"'JetBrains Mono',monospace", display:'flex', alignItems:'center', gap:4 }}><Calendar size={10}/>{article.date}</span>
        </div>

        <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:'clamp(2rem,5vw,3.2rem)', fontWeight:600, color:'#f0f0f0', letterSpacing:'-0.025em', lineHeight:1.12, marginBottom:24 }}>
          {article.title}
        </h1>

        <p style={{ fontSize:17, color:'rgba(240,240,240,0.5)', lineHeight:1.75, marginBottom:36, fontFamily:"'Sora',sans-serif", fontWeight:400, borderLeft:'2px solid rgba(34,197,94,0.4)', paddingLeft:20 }}>
          {article.excerpt}
        </p>

        {article.image && (
          <div style={{ marginBottom:48, borderRadius:12, overflow:'hidden', border:'1px solid rgba(255,255,255,0.06)' }}>
            <img src={article.image} alt={article.title} style={{ width:'100%', height:360, objectFit:'cover', display:'block', filter:'brightness(0.75) saturate(0.8)' }} />
          </div>
        )}

        <div style={{ display:'flex', alignItems:'center', gap:12, padding:'16px 20px', background:'rgba(255,255,255,0.025)', border:'1px solid rgba(255,255,255,0.055)', borderRadius:10, marginBottom:48 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:'#22c55e', display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, fontWeight:800, color:'#040405', fontFamily:"'Sora',sans-serif" }}>R</div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:'#f0f0f0', fontFamily:"'Sora',sans-serif" }}>Rajat</div>
            <div style={{ fontSize:11, color:'rgba(240,240,240,0.35)', fontFamily:"'JetBrains Mono',monospace" }}>Founder, KRYV Network — kryv.network</div>
          </div>
        </div>

        <div dangerouslySetInnerHTML={{ __html: renderContent(article.content) }} />

        <div style={{ marginTop:64, paddingTop:32, borderTop:'1px solid rgba(255,255,255,0.06)', display:'flex', justifyContent:'space-between', alignItems:'center', gap:16, flexWrap:'wrap' }}>
          <Link href="/" style={{ display:'inline-flex', alignItems:'center', gap:6, fontSize:12, color:'rgba(240,240,240,0.35)', textDecoration:'none', fontFamily:"'Sora',sans-serif" }}>
            <ArrowLeft size={12} /> More articles
          </Link>
          <Link href="/write" style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'9px 18px', background:'#22c55e', borderRadius:8, textDecoration:'none', fontSize:12, fontWeight:800, color:'#040405', fontFamily:"'Sora',sans-serif" }}>
            Write on INKRUX
          </Link>
        </div>
      </main>
    </>
  );
}
