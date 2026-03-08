import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INKRUX — Dark Articles for Builders',
  description: 'The article and newsletter platform for indie hackers, SaaS builders, and AI developers. Built on KRYV Network.',
  keywords: ['indie hacking', 'SaaS', 'AI', 'developer articles', 'newsletter'],
  manifest: '/manifest.json',
  themeColor: '#7c3aed',
  openGraph: {
    title: 'INKRUX — Dark Articles for Builders',
    description: 'No paywalls. No fluff. Pure builder signal.',
    type: 'website',
    url: 'https://inkrux.kryv.network',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7c3aed" />
      </head>
      <body>{children}</body>
    </html>
  );
}
