import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Send welcome email via Resend
    const RESEND_KEY = process.env.RESEND_API_KEY;
    if (RESEND_KEY) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${RESEND_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'INKRUX <hello@inkrux.kryv.network>',
          to: [email],
          subject: '⚡ Welcome to INKRUX — Dark articles for builders',
          html: `
            <div style="background:#09090d;color:#e0e0e0;font-family:monospace;padding:40px 20px;max-width:600px;margin:0 auto;">
              <h1 style="color:#7c3aed;font-size:32px;font-weight:900;letter-spacing:-0.04em;margin:0 0 8px;">INK<span style="color:#ec4899">RUX</span></h1>
              <p style="color:#666;font-size:13px;margin:0 0 32px;">Dark articles for serious builders</p>
              <h2 style="color:#fff;margin:0 0 16px;">You are in.</h2>
              <p style="color:#aaa;line-height:1.7;">Every Sunday you will get 3-5 articles from indie hackers, SaaS builders, and AI developers who are actually shipping.</p>
              <p style="color:#aaa;line-height:1.7;">No fluff. No paywalls. Just signal.</p>
              <a href="https://inkrux.kryv.network" style="display:inline-block;margin:24px 0;padding:14px 28px;background:linear-gradient(135deg,#7c3aed,#ec4899);color:white;text-decoration:none;border-radius:10px;font-weight:700;font-size:13px;">Read Latest Articles →</a>
              <p style="color:#333;font-size:11px;margin-top:40px;">INKRUX by KRYV Network · <a href="#" style="color:#333;">Unsubscribe</a></p>
            </div>`
        })
      });
    }

    // TODO: Save to Neon DB
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
