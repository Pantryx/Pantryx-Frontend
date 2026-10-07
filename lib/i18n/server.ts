import "server-only";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { en, type Dictionary } from "@/lib/i18n/dictionaries/en";
import { uk } from "@/lib/i18n/dictionaries/uk";

const dictionaries = { en, uk } satisfies Record<Locale, Dictionary>;

/**
 * The whole dictionary for a locale. Server-only: pages pass the parts a
 * component needs down as props, and the layout hands the `chrome` namespace
 * to `LocaleProvider` for the client — so the full set never ships to the browser.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type LocaleParams = { params: Promise<{ locale: string }> };

/**
 * The validated locale from a page's params. The middleware only routes known
 * locales into `app/[locale]`, so the 404 is a backstop.
 */
export async function pageLocale({ params }: LocaleParams): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return locale;
}
