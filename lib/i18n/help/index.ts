import type { Locale } from "@/lib/i18n/locale";
import type { HelpDictionary } from "@/lib/i18n/help/types";
import { helpEn } from "@/lib/i18n/help/en";
import { helpUk } from "@/lib/i18n/help/uk";
import { helpPl } from "@/lib/i18n/help/pl";

const helpDictionaries: Record<Locale, HelpDictionary> = {
  en: helpEn,
  uk: helpUk,
  pl: helpPl,
};

export function getHelpDictionary(locale: Locale): HelpDictionary {
  return helpDictionaries[locale];
}
