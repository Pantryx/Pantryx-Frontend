import { isLocale, type Locale } from "@/lib/i18n/config";

export type LanguageTag = { language: string; region: string | undefined };

/** An `Accept-Language` header as tags in preference order, dropping `q=0`. */
export function parseAcceptLanguage(header: string | null): LanguageTag[] {
  return (header ?? "")
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
      const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
      return { tag, quality: Number.isFinite(quality) ? quality : 0 };
    })
    .filter(({ tag, quality }) => tag.length > 0 && quality > 0)
    .sort((first, second) => second.quality - first.quality)
    .map(({ tag }) => {
      const [language, region] = tag.split("-");
      return { language: language.toLowerCase(), region: region?.toUpperCase() };
    });
}

/** The visitor's most preferred language that the site is translated into, if any. */
export function localeFromAcceptLanguage(header: string | null): Locale | null {
  for (const { language } of parseAcceptLanguage(header)) {
    if (isLocale(language)) return language;
  }
  return null;
}
