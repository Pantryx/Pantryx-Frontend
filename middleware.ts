import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE } from "@/lib/i18n/config";
import { localeFromAcceptLanguage } from "@/lib/i18n/negotiate";

/**
 * Locale routing. English is served unprefixed and every other locale under
 * `/<locale>/…`; internally every page lives under `app/[locale]`.
 *
 * - `/en/…` is redirected to its unprefixed URL, so each page has one address.
 * - `/<locale>/…` passes straight through.
 * - An unprefixed request is rewritten to `/en/…` — unless it is someone
 *   arriving from outside the site whose preferred language is another locale,
 *   who is redirected there instead. Preference is the switcher's cookie when
 *   set, otherwise Accept-Language. That keeps today's behaviour for shared
 *   recipe links (the recipient's language wins, not the sharer's).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segment = pathname.split("/")[1];

  if (segment === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (isLocale(segment)) return NextResponse.next();

  if (isEntryNavigation(request)) {
    const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const preferred = isLocale(cookie) ? cookie : localeFromAcceptLanguage(request.headers.get("accept-language"));
    if (preferred && preferred !== defaultLocale) {
      const url = request.nextUrl.clone();
      url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
      const response = NextResponse.redirect(url, 307);
      // Depends on the visitor's cookie and headers, so no shared cache may keep it.
      response.headers.set("Cache-Control", "private, no-store");
      return response;
    }
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

/**
 * A document request from outside the site: a typed URL, a bookmark, or a link
 * in another app. Navigation inside the site — router fetches, prefetches and
 * same-origin page loads — is never redirected, so a visitor who follows an
 * English link from a Ukrainian page stays on English.
 */
function isEntryNavigation(request: NextRequest): boolean {
  if (request.method !== "GET" && request.method !== "HEAD") return false;
  // Router fetches and prefetches don't ask for HTML. (Next strips its own
  // `RSC` header before middleware runs, so that can't be checked here.)
  if (!request.headers.get("accept")?.includes("text/html")) return false;
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite) return fetchSite !== "same-origin";
  // Browsers without Fetch Metadata (Safari before 16.4) still send a Referer.
  const referer = request.headers.get("referer");
  if (!referer) return true;
  try {
    // Compared by Host header: `nextUrl` normalises the hostname (127.0.0.1 → localhost).
    return new URL(referer).host !== request.headers.get("host");
  } catch {
    return true;
  }
}

export const config = {
  // Everything except API routes, Next internals, Vercel's analytics endpoint,
  // files with an extension (sitemap.xml, robots.txt, .well-known/*, public/),
  // and the prefixed social-card routes Next links to from page metadata.
  matcher: ["/((?!api|_next|__nextjs|_vercel|(?:en|uk)/(?:opengraph|twitter)-image|.*\\..*).*)"],
};
