export type SiteEventName =
  | "recipe_link_page_viewed"
  | "recipe_link_open_in_app_tapped"
  | "recipe_link_app_store_tapped";

export type SiteEventProperties = Record<string, string | number | boolean>;

/**
 * One random id per page load: the funnel is counted without cookies, storage,
 * or anything that follows a visitor across pages.
 */
const pageLoadIdentifier =
  typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;

/** Fire-and-forget; `sendBeacon` survives the navigation an app-open or App Store tap starts. */
export function trackSiteEvent(event: SiteEventName, properties: SiteEventProperties = {}) {
  const body = JSON.stringify({ event, distinctId: pageLoadIdentifier, properties });
  try {
    if (navigator.sendBeacon?.("/api/site/events", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/site/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {}
}
