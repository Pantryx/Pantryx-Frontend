import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";
import { site } from "@/lib/site";

const base = site.url.replace(/\/$/, "");

/**
 * Splits a locale prefix off a pathname: `/uk/help` gives `uk` and `/help`.
 *
 * Strips the default locale too. Static pages are prerendered at `/en/…`, so
 * `usePathname()` reports `/en/help` during the server render and `/help` in
 * the browser — anything that compares pathnames must go through here first or
 * it will hydrate differently.
 */
export function stripLocale(pathname: string): { locale: Locale | null; pathname: string } {
  const segment = pathname.split("/")[1];
  if (!isLocale(segment)) return { locale: null, pathname };
  const rest = pathname.slice(segment.length + 1);
  return { locale: segment, pathname: rest === "" ? "/" : rest };
}

/**
 * Prefixes an unprefixed internal href for a locale, keeping any query and
 * hash: `/#features` becomes `/uk#features`. External, `mailto:` and
 * fragment-only hrefs pass through untouched, as does every default-locale href.
 */
export function localizedPath(locale: Locale, href: string): string {
  if (locale === defaultLocale || !href.startsWith("/") || href.startsWith("//")) return href;
  const [, path, suffix] = /^([^?#]*)(.*)$/.exec(href) as RegExpExecArray;
  return `/${locale}${path === "/" ? "" : path}${suffix}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${base}${localizedPath(locale, path)}`;
}

/**
 * hreflang alternates for one page, keyed the way Next's `alternates.languages`
 * and the sitemap expect. `x-default` points at the default locale, which is
 * also where a visitor with no matching language ends up.
 */
export function languageAlternates(path: string, { absolute = false } = {}): Record<string, string> {
  const resolve = (locale: Locale) => (absolute ? absoluteUrl(locale, path) : localizedPath(locale, path));
  return {
    ...Object.fromEntries(locales.map((locale) => [locale, resolve(locale)])),
    "x-default": resolve(defaultLocale),
  };
}
