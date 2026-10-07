import type { Locale } from "@/lib/i18n/config";
import { parseAcceptLanguage } from "@/lib/i18n/negotiate";

export type MeasurementSystem = "metric" | "imperial";

const imperialRegions = new Set(["US", "LR", "MM"]);

/**
 * Metric or imperial amounts for a recipe page. The page's language comes from
 * its URL (which the middleware picks from the visitor's own preferences, not
 * the sharer's); units still follow the visitor's browser: Ukrainian is always
 * metric, English is imperial only when the first English tag names a country
 * that uses it (`en-US`).
 */
export function measurementSystemFor(locale: Locale, acceptLanguage: string | null): MeasurementSystem {
  if (locale !== "en") return "metric";
  const english = parseAcceptLanguage(acceptLanguage).find(({ language }) => language === "en");
  return english?.region && imperialRegions.has(english.region) ? "imperial" : "metric";
}
