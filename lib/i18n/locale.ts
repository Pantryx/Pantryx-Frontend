export const LOCALES = ["en", "uk", "pl"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie that remembers the visitor's explicit language choice. */
export const LOCALE_COOKIE = "pantryx-lang";

/** Self-labelling names — a language names itself, so these never get translated. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  pl: "Polski",
};

/** Compact codes for the navbar trigger. */
export const LOCALE_CODES: Record<Locale, string> = {
  en: "EN",
  uk: "УК",
  pl: "PL",
};

function isLocale(value: string | null | undefined): value is Locale {
  return value != null && (LOCALES as readonly string[]).includes(value);
}

/**
 * Picks the best supported language from an `Accept-Language` header, honouring
 * the q-weights the way browsers send them. Lifted from the recipe locale
 * resolver so the Home page detects languages the same way shared recipes do.
 */
function localeFromAcceptLanguage(header: string | null | undefined): Locale | null {
  const tags = (header ?? "")
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      return { tag, quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter(({ tag, quality }) => tag.length > 0 && quality > 0)
    .sort((first, second) => second.quality - first.quality);

  for (const { tag } of tags) {
    const primary = tag.split("-")[0]?.toLowerCase();
    if (isLocale(primary)) return primary;
  }

  return null;
}

/**
 * Server-side resolution: an explicit cookie wins; otherwise fall back to the
 * browser's `Accept-Language`, then English.
 */
export function resolveLocale(
  cookieValue: string | null | undefined,
  acceptLanguage: string | null | undefined
): Locale {
  if (isLocale(cookieValue)) return cookieValue;
  return localeFromAcceptLanguage(acceptLanguage) ?? DEFAULT_LOCALE;
}

/**
 * Client-side resolution for the picker's current-language label. Mirrors
 * {@link resolveLocale} using the cookie and `navigator.language`, so the label
 * always matches whatever the server rendered.
 */
export function detectClientLocale(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;

  const cookieMatch = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${LOCALE_COOKIE}=`));
  const cookieValue = cookieMatch?.split("=")[1];
  if (isLocale(cookieValue)) return cookieValue;

  const languages =
    typeof navigator !== "undefined"
      ? navigator.languages ?? [navigator.language]
      : [];
  for (const tag of languages) {
    const primary = tag?.split("-")[0]?.toLowerCase();
    if (isLocale(primary)) return primary;
  }

  return DEFAULT_LOCALE;
}
