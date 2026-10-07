import type { Locale } from "@/lib/i18n/config";
import type { LegalDocument } from "@/lib/legal/meta";
import { privacySections } from "@/lib/legal/privacy-sections";
import { privacySectionsUk } from "@/lib/legal/privacy-sections.uk";
import { termsSections } from "@/lib/legal/terms-sections";
import { termsSectionsUk } from "@/lib/legal/terms-sections.uk";
import type { LegalSection } from "@/lib/legal/types";

type LegalText = {
  sections: readonly LegalSection[];
  /** Language the sections are written in, when it isn't the page's own. */
  lang: Locale;
};

/** Each legal document in each language. */
export const legalSections: Record<LegalDocument, Record<Locale, LegalText>> = {
  privacy: {
    en: { sections: privacySections, lang: "en" },
    uk: { sections: privacySectionsUk, lang: "uk" },
  },
  terms: {
    en: { sections: termsSections, lang: "en" },
    uk: { sections: termsSectionsUk, lang: "uk" },
  },
};
