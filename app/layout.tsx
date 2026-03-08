import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'INKRUX — Dark Articles for Builders',
  description: 'The article and newsletter platform for indie hackers, SaaS builders, and AI developers. Built on KRYV Network.',
  keywords: ['indie hacking', 'SaaS', 'AI', 'developer articles', 'newsletter'],
  openGraph: {
    title: 'INKRUX',
    description: 'Dark articles for builders',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
