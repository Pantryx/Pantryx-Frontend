"use client";

import { usePathname } from "next/navigation";
import { Check, Globe } from "lucide-react";
import clsx from "clsx";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { localeMeta, locales } from "@/lib/i18n/config";
import { localizedPath, stripLocale } from "@/lib/i18n/paths";
import { followLocaleLink } from "@/lib/i18n/switch";

/** Language choice inside the mobile menu: every option visible, one tap each. */
export function LanguageOptions({ onSameLanguage }: { onSameLanguage: () => void }) {
  const locale = useLocale();
  const t = useMessages().language;
  const pathname = stripLocale(usePathname()).pathname;

  return (
    <nav aria-label={t.label} className="mt-10">
      <div className="eyebrow flex items-center gap-2">
        <Globe className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
        {t.heading}
      </div>
      <ul className="mt-3 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {locales.map((target) => {
          const active = target === locale;
          return (
            <li key={target}>
              <a
                href={localizedPath(target, pathname)}
                hrefLang={target}
                lang={target}
                aria-current={active ? "true" : undefined}
                onClick={(event) => {
                  if (followLocaleLink(event, target, locale)) onSameLanguage();
                }}
                className={clsx(
                  "flex items-center justify-between px-4 py-4 text-base transition-colors",
                  active ? "bg-subtle text-ink" : "text-muted"
                )}
              >
                {localeMeta[target].nativeName}
                {active && <Check className="h-4 w-4" strokeWidth={2} aria-hidden />}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
