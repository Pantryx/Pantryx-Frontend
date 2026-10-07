import { localeMeta, type Locale } from "@/lib/i18n/config";

/** Fills `{name}` placeholders: `fmt("Show {n} of {total}", { n: 1, total: 5 })`. */
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/**
 * Plural forms, named by CLDR category. English needs only `one` and `other`;
 * Ukrainian also needs `few` (2–4, 22–24…) and `many` (5–20, 25–30…).
 */
export type PluralForms = { one: string; few?: string; many?: string; other: string };

const pluralRules = new Map<Locale, Intl.PluralRules>();

/** Picks the form for `count` and fills its `{count}` placeholder. */
export function plural(locale: Locale, count: number, forms: PluralForms): string {
  let rules = pluralRules.get(locale);
  if (!rules) {
    rules = new Intl.PluralRules(localeMeta[locale].intl);
    pluralRules.set(locale, rules);
  }
  const category = rules.select(count) as keyof PluralForms;
  return fmt(forms[category] ?? forms.other, { count });
}

/** A calendar date such as "September 24, 2026" / "24 вересня 2026 р.", from an ISO `YYYY-MM-DD`. */
export function formatDate(locale: Locale, isoDate: string): string {
  return new Intl.DateTimeFormat(localeMeta[locale].intl, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}
