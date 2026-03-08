# INKRUX ⚡

> Dark article & newsletter platform for indie hackers, SaaS builders, and AI developers.

**Part of the KRYV Empire** · [inkrux.kryv.network](https://inkrux.kryv.network)

## Stack
- **Next.js 15** (App Router) — deployed on Vercel
- **Neon DB** (PostgreSQL) — article + subscriber storage
- **Resend** — welcome emails + weekly newsletter delivery
- **Tailwind CSS** — dark KRYV-style UI

## Setup

```bash
cp .env.example .env.local
# Fill in DATABASE_URL and RESEND_API_KEY
npm install
npm run dev
```

## Features
- ✅ Article publishing (Markdown)
- ✅ Newsletter subscription with welcome email
- ✅ Tag/category filtering
- ✅ Dark KRYV aesthetic
- 🔧 DB persistence (add Neon DATABASE_URL)
- 🔧 Weekly newsletter automation
- 🔧 Author profiles

## Env Vars
| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL URL |
| `RESEND_API_KEY` | Resend API key for email |
| `NEXT_PUBLIC_SITE_URL` | Your site URL |

## DB Schema (Neon)
```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  tag TEXT NOT NULL,
  author TEXT DEFAULT 'anonymous',
  views INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```
