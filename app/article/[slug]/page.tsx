import type { Metadata } from 'next';
import ArticleClient from './ArticleClient';

// Articles metadata map for generateMetadata (server-side only)
const ARTICLE_META: Record<string, { title: string; excerpt: string; image: string; date: string; author: string }> = {
  'building-30-saas-in-one-year': {
    title: 'I built 30 SaaS products in one year. Here is every lesson.',
    excerpt: 'Most founders spend two years on one product. I built thirty in one year.',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    date: '2026-02-14', author: 'Rajat',
  },
  'geo-is-replacing-seo': {
    title: 'GEO is replacing SEO. Here is what actually works.',
    excerpt: 'Generative Engine Optimization is not a trend. It is the new surface area where products get discovered.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80',
    date: '2026-01-28', author: 'Rajat',
  },
  'cloudflare-workers-saas-stack': {
    title: 'Why I run 30 SaaS products on Cloudflare Workers.',
    excerpt: 'No EC2. No Docker. No Kubernetes. Every KRYV product runs on Cloudflare Workers.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
    date: '2026-01-15', author: 'Rajat',
  },
  'llama-groq-vs-gpt4': {
    title: 'Llama 3.3 on Groq vs GPT-4: the real comparison for builders.',
    excerpt: 'Speed, cost, output quality — which model should you actually build on?',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    date: '2026-01-05', author: 'Rajat',
  },
  'nodemeld-economy': {
    title: 'NodeMeld Economy: How I am building a marketplace that pays users to try SaaS.',
    excerpt: 'Performance marketing is broken. Here is how we are fixing it.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
    date: '2025-12-20', author: 'Rajat',
  },
  'saas-distribution-not-product': {
    title: 'Your SaaS will die from distribution, not product quality.',
    excerpt: 'The graveyard of indie SaaS is filled with great products nobody found.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    date: '2025-12-08', author: 'Rajat',
  },
  'kryv-network-architecture': {
    title: 'How I architected a 30-product empire on one brain.',
    excerpt: 'NEHIRA, shared auth, shared data — the technical and product decisions behind the KRYV empire.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
    date: '2025-11-30', author: 'Rajat',
  },
  'indie-hacker-monetization': {
    title: 'How indie hackers actually make money in 2026.',
    excerpt: 'Subscriptions are saturated. Here are the models working right now.',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&q=80',
    date: '2025-11-18', author: 'Rajat',
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const meta = ARTICLE_META[slug];
  if (!meta) return { title: 'Not Found — INKRUX' };
  return {
    title: `${meta.title} — INKRUX`,
    description: meta.excerpt,
    icons: {
      icon: '/favicon-32x32.png',
      apple: '/apple-touch-icon.png',
    },
    openGraph: {
      title: meta.title, description: meta.excerpt,
      type: 'article', url: `https://inkrux.kryv.network/article/${slug}`,
      images: [{ url: meta.image, width: 1200, height: 630 }],
      publishedTime: meta.date, authors: [meta.author],
    },
    twitter: { card: 'summary_large_image', title: meta.title, description: meta.excerpt, images: [meta.image] },
  };
}

export function generateStaticParams() {
  return Object.keys(ARTICLE_META).map(slug => ({ slug }));
}

export default function ArticlePage() {
  return <ArticleClient />;
}
