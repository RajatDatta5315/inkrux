import { NextResponse } from 'next/server';

const SITE_URL = 'https://inkrux.kryv.network';
const SITE_TITLE = 'INKRUX — The KRYV Builder Blog';
const SITE_DESCRIPTION = 'AI, SaaS, GEO, and indie building from the KRYV Network.';

const ARTICLES = [
  {
    slug: 'building-30-saas-in-one-year',
    title: 'I built 30 SaaS products in one year. Here is every lesson.',
    excerpt: 'Most founders spend two years on one product. I built thirty in one year — not because I am fast, but because I built systems that build products for me.',
    tag: 'Indie Hacking',
    author: 'Rajat',
    date: 'Sat, 08 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=1200&q=80',
  },
  {
    slug: 'geo-beats-seo-2026-full-playbook',
    title: 'GEO will matter more than SEO by 2027. Here is the full playbook.',
    excerpt: 'When someone asks ChatGPT to recommend a SaaS tool, they do not see your Google ranking. They see what the AI knows about you.',
    tag: 'Marketing',
    author: 'Rajat',
    date: 'Fri, 07 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
  },
  {
    slug: 'why-cloudflare-workers-beats-aws',
    title: 'Why I moved every backend to Cloudflare Workers and never looked back',
    excerpt: 'Zero cold starts. Edge deployment in 160+ cities. D1, KV, R2, AI — all in one platform.',
    tag: 'Dev',
    author: 'Rajat',
    date: 'Thu, 06 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
  },
  {
    slug: 'llms-txt-the-geo-file-every-saas-needs',
    title: 'llms.txt: the GEO file every SaaS needs and almost nobody has',
    excerpt: 'AI crawlers from OpenAI, Anthropic, and Perplexity read llms.txt before anything else. If you do not have one, you are invisible to them.',
    tag: 'AI',
    author: 'Rajat',
    date: 'Wed, 05 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
  },
  {
    slug: 'how-velqa-auto-creates-geo-prs',
    title: 'How VELQA autonomously creates GitHub PRs for GEO optimization',
    excerpt: 'Connect your repo. VELQA audits your site, then opens a real GitHub Pull Request with llms.txt, robots.txt, and schema.json already written.',
    tag: 'AI',
    author: 'Rajat',
    date: 'Tue, 04 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1618401479427-c8ef9465fbe1?w=1200&q=80',
  },
  {
    slug: 'charged-99-before-writing-code',
    title: 'I charged $99 before writing a single line of code. It worked.',
    excerpt: 'The biggest mistake founders make is building before validating. Here is the exact process I used to collect money for a product that did not exist yet.',
    tag: 'SaaS',
    author: 'Rajat',
    date: 'Mon, 03 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80',
  },
  {
    slug: 'nodemeld-autonomous-saas-discovery',
    title: 'NodeMeld: building a SaaS hunt with autonomous AI discovery',
    excerpt: 'Product Hunt is curated by humans. NodeMeld is curated by agents. Every hour, it scrapes Reddit, HN, and product directories — adding new SaaS automatically.',
    tag: 'Growth',
    author: 'Rajat',
    date: 'Sun, 02 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
  },
  {
    slug: 'programmatic-seo-10000-pages-kryvlayer',
    title: 'From 0 to 10,000 landing pages with KryvLayer',
    excerpt: 'Google rewards sites with depth. KryvLayer generates thousands of SEO-optimized pages for your domain — one for every keyword cluster your competitors rank for.',
    tag: 'Marketing',
    author: 'Rajat',
    date: 'Sat, 01 Mar 2026 08:00:00 GMT',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
  },
];

export async function GET() {
  const items = ARTICLES.map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${SITE_URL}/article/${a.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/article/${a.slug}</guid>
      <description><![CDATA[${a.excerpt}]]></description>
      <pubDate>${a.date}</pubDate>
      <author>rajat@kryv.network (${a.author})</author>
      <category>${a.tag}</category>
      <enclosure url="${a.image}" type="image/jpeg" length="0"/>
      <source url="${SITE_URL}/api/feed.xml">${SITE_TITLE}</source>
    </item>`).join('');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en-US</language>
    <managingEditor>rajat@kryv.network (Rajat)</managingEditor>
    <webMaster>rajat@kryv.network (Rajat)</webMaster>
    <lastBuildDate>${ARTICLES[0].date}</lastBuildDate>
    <atom:link href="${SITE_URL}/api/feed.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${SITE_URL}/og-image.png</url>
      <title>${SITE_TITLE}</title>
      <link>${SITE_URL}</link>
    </image>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
