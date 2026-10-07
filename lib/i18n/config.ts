/**
 * Locale configuration shared by the middleware, server components and client
 * components alike — so it must stay free of server-only or React imports.
 */
export const locales = ["en", "uk"] as const;

export type Locale = (typeof locales)[number];

/** Served without a URL prefix; every other locale lives under `/<locale>/…`. */
export const defaultLocale: Locale = "en";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (locales as readonly string[]).includes(value);
}

/**
 * Written only when someone picks a language in the switcher. Its presence is
 * what stops the middleware from second-guessing that choice with the
 * browser's Accept-Language.
 */
export const LOCALE_COOKIE = "pantryx-locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

type LocaleMeta = {
  /** The language's own name for itself, as listed in the switcher. */
  nativeName: string;
  /** Compact label on the switcher trigger. */
  shortLabel: string;
  /** BCP 47 tag handed to `Intl` formatters. */
  intl: string;
  /** Open Graph `og:locale` value. */
  og: string;
};

export const localeMeta: Record<Locale, LocaleMeta> = {
  en: { nativeName: "English", shortLabel: "EN", intl: "en-US", og: "en_US" },
  uk: { nativeName: "Українська", shortLabel: "УКР", intl: "uk-UA", og: "uk_UA" },
};
