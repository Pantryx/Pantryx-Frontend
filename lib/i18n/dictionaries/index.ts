import type { Locale } from "@/lib/i18n/locale";
import type { Dictionary } from "@/lib/i18n/types";
import { en } from "@/lib/i18n/dictionaries/en";
import { uk } from "@/lib/i18n/dictionaries/uk";
import { pl } from "@/lib/i18n/dictionaries/pl";

const dictionaries: Record<Locale, Dictionary> = { en, uk, pl };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
