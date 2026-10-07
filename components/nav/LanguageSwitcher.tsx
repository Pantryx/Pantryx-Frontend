"use client";

import { usePathname } from "next/navigation";
import { Check, ChevronDown, Globe } from "lucide-react";
import clsx from "clsx";
import { useDismissableMenu } from "@/components/nav/useDismissableMenu";
import { useLocale, useMessages } from "@/lib/i18n/client";
import { localeMeta, locales } from "@/lib/i18n/config";
import { localizedPath, stripLocale } from "@/lib/i18n/paths";
import { followLocaleLink } from "@/lib/i18n/switch";

/**
 * Desktop language menu. Behaves like the Legal dropdown next to it: opens on
 * hover, click or keyboard; closes on Escape, an outside press or leaving it.
 * Languages are listed by their own names, never by flags — a language is not
 * a country.
 */
export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useMessages().language;
  const pathname = stripLocale(usePathname()).pathname;
  const { ref, open, setOpen } = useDismissableMenu();

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t.label}: ${localeMeta[locale].nativeName}`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-xs font-medium tracking-[0.08em] text-ink transition-colors hover:border-ink"
      >
        <Globe className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        <span>{localeMeta[locale].shortLabel}</span>
        <ChevronDown
          className={clsx("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          strokeWidth={2}
          aria-hidden
        />
      </button>
      <div
        className={clsx(
          "absolute right-0 top-full w-44 origin-top-right pt-2 transition-[transform,opacity] duration-200 ease-out-expo",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
        )}
        role="menu"
        aria-label={t.label}
      >
        <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]">
          {locales.map((target) => {
            const active = target === locale;
            return (
              <a
                key={target}
                href={localizedPath(target, pathname)}
                hrefLang={target}
                lang={target}
                role="menuitemradio"
                aria-checked={active}
                tabIndex={open ? undefined : -1}
                onClick={(event) => {
                  if (followLocaleLink(event, target, locale)) setOpen(false);
                }}
                className={clsx(
                  "flex items-center justify-between gap-3 px-4 py-3 text-sm transition-colors hover:bg-subtle hover:text-ink",
                  active ? "text-ink" : "text-muted"
                )}
              >
                {localeMeta[target].nativeName}
                {active && <Check className="h-4 w-4" strokeWidth={2} aria-hidden />}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
