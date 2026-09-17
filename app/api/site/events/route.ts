import { NextResponse } from "next/server";
import type { SiteEventName } from "@/lib/analytics/trackSiteEvent";

/**
 * Forwards the shared-recipe funnel to PostHog from the server, so the page
 * ships no analytics SDK and sets no cookies. Without `POSTHOG_API_KEY` (local
 * development, Playwright) events are accepted and dropped.
 */

const allowedEvents = new Set<SiteEventName>([
  "recipe_link_page_viewed",
  "recipe_link_open_in_app_tapped",
  "recipe_link_app_store_tapped",
]);

const posthogHost = (process.env.POSTHOG_HOST ?? "https://eu.i.posthog.com").replace(/\/+$/, "");

type IncomingEvent = {
  event?: unknown;
  distinctId?: unknown;
  properties?: unknown;
};

function sanitizedProperties(raw: unknown): Record<string, string | number | boolean> {
  if (typeof raw !== "object" || raw === null) return {};
  const entries = Object.entries(raw).filter(
    ([key, value]) =>
      key.length <= 40 &&
      !key.startsWith("$") &&
      (typeof value === "number" || typeof value === "boolean" || (typeof value === "string" && value.length <= 100))
  );
  return Object.fromEntries(entries.slice(0, 10));
}

export async function POST(request: Request) {
  let incoming: IncomingEvent;
  try {
    incoming = await request.json();
  } catch {
    return NextResponse.json({ error: "Expected a JSON body." }, { status: 400 });
  }

  const { event, distinctId } = incoming;
  if (
    typeof event !== "string" ||
    !allowedEvents.has(event as SiteEventName) ||
    typeof distinctId !== "string" ||
    distinctId.length === 0 ||
    distinctId.length > 64
  ) {
    return NextResponse.json({ error: "Unknown event." }, { status: 400 });
  }

  const apiKey = process.env.POSTHOG_API_KEY;
  if (!apiKey) return new NextResponse(null, { status: 204 });

  try {
    await fetch(`${posthogHost}/i/v0/e/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api_key: apiKey,
        event,
        distinct_id: distinctId,
        properties: {
          ...sanitizedProperties(incoming.properties),
          platform: "web",
          $process_person_profile: false,
        },
      }),
    });
  } catch {}

  return new NextResponse(null, { status: 204 });
}
