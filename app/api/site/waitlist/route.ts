import { NextResponse } from "next/server";

/**
 * Beta waitlist signup.
 *
 * Lives under /api/site/ because next.config.ts proxies the rest of /api/* to
 * the Heroku backend before the filesystem is consulted; the rewrite carves out
 * this prefix so the handler is reachable.
 *
 * Storage is deliberately somebody else's problem: WAITLIST_WEBHOOK_URL points
 * at whatever collects the address (Formspree, Buttondown, Zapier, a Google
 * Form). With no webhook configured the route answers 501 and the form falls
 * back to a mailto link, so the input is never a black hole.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let email: unknown;

  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL.test(email.trim())) {
    return NextResponse.json(
      { error: "That doesn't look like an email address." },
      { status: 400 }
    );
  }

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "The waitlist isn't connected yet.", fallback: "mailto" },
      { status: 501 }
    );
  }

  try {
    const upstream = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ email: email.trim(), source: "pantryx.org" }),
      // Don't let a slow collector hold the request open indefinitely.
      signal: AbortSignal.timeout(8_000),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "We couldn't save that just now. Try again in a moment." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "We couldn't save that just now. Try again in a moment." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
