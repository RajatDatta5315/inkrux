import { MetadataRoute } from 'next';

const SITE = 'https://inkrux.kryv.network';

const SLUGS = [
  'building-30-saas-in-one-year',
  'geo-beats-seo-2026-full-playbook',
  'why-cloudflare-workers-beats-aws',
  'llms-txt-the-geo-file-every-saas-needs',
  'how-velqa-auto-creates-geo-prs',
  'charged-99-before-writing-code',
  'nodemeld-autonomous-saas-discovery',
  'programmatic-seo-10000-pages-kryvlayer',
];

const TAGS = ['growth', 'ai', 'saas', 'geo', 'distribution', 'cloudflare'];

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = SLUGS.map(slug => ({
    url: `${SITE}/article/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const tags = TAGS.map(tag => ({
    url: `${SITE}/tag/${tag}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [
    { url: SITE, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE}/newsletter`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    ...articles,
    ...tags,
  ];
}
