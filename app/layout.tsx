import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INKRUX — Articles for Builders',
  description: 'Deep articles on AI, SaaS, and building in public. Written by KRYV Network founders. No fluff, no paywalls.',
  keywords: ['indie hacking', 'SaaS', 'AI', 'developer articles', 'GEO', 'startup'],
  manifest: '/manifest.json',
  themeColor: '#040405',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/logo.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  openGraph: {
    title: 'INKRUX — Articles for Builders',
    description: 'Deep articles on AI, SaaS, and building in public.',
    type: 'website',
    url: 'https://inkrux.kryv.network',
    siteName: 'INKRUX',
    images: [{ url: '/logo.png', width: 512, height: 512 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INKRUX — Articles for Builders',
    description: 'Deep articles on AI, SaaS, and building in public.',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#040405" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
