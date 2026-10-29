"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe } from "lucide-react";
import clsx from "clsx";
import {
  LOCALE_CODES,
  LOCALE_LABELS,
  LOCALES,
  type Locale,
} from "@/lib/i18n/locale";
import { useSetLocale } from "@/lib/i18n/useSetLocale";

/**
 * Navbar language switcher. Switching is rare, so the copy swap itself is
 * instant (a server re-render, not an entrance). Only the small popover
 * animates, and it borrows the Legal dropdown's motion so it reads as part of
 * the same nav rather than a bolted-on control.
 *
 * `compact` drops the chevron for the mobile top bar, where it sits beside the
 * other round controls and space is tight. `initialLocale` is the locale the
 * server resolved, so the trigger renders the right code with no flash or
 * placeholder.
 */
export function LanguagePicker({
  className,
  compact = false,
  initialLocale,
}: {
  className?: string;
  compact?: boolean;
  initialLocale: Locale;
}) {
  const setLocale = useSetLocale();
  const [current, setCurrent] = useState<Locale>(initialLocale);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector("button")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const choose = (locale: Locale) => {
    setOpen(false);
    if (locale === current) return;
    setCurrent(locale);
    setLocale(locale);
  };

  return (
    <div
      ref={ref}
      className={clsx("relative", className)}
      // Hover-to-open matches the Legal dropdown on desktop, but on touch a tap
      // fires a transient mouseenter *and* a click that fight each other — so the
      // compact (mobile) trigger is a clean tap-to-toggle with no hover.
      onMouseEnter={compact ? undefined : () => setOpen(true)}
      onMouseLeave={compact ? undefined : () => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Language: ${LOCALE_LABELS[current]}. Change language.`}
        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line px-3 text-sm text-muted transition-[color,border-color,transform] duration-200 ease-out-expo hover:border-ink hover:text-ink active:scale-[0.97]"
      >
        <Globe className="h-[17px] w-[17px]" strokeWidth={1.75} />
        <span className="font-medium">{LOCALE_CODES[current]}</span>
        {!compact && (
          <ChevronDown
            className={clsx("h-3.5 w-3.5 transition-transform duration-200", open && "rotate-180")}
            strokeWidth={2}
          />
        )}
      </button>

      {/* Scales from the trigger (top-right), never from scale(0); under reduced
          motion only the opacity cue remains. */}
      <div
        className={clsx(
          "absolute right-0 top-full w-44 origin-top-right pt-2 transition-[transform,opacity] duration-200 ease-out-expo motion-reduce:transition-opacity motion-reduce:transform-none",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
        )}
        role="menu"
      >
        <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]">
          {LOCALES.map((locale) => {
            const active = locale === current;
            return (
              <button
                key={locale}
                type="button"
                onClick={() => choose(locale)}
                role="menuitemradio"
                aria-checked={active}
                className={clsx(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors active:scale-[0.99]",
                  active ? "text-ink" : "text-muted hover:bg-subtle hover:text-ink"
                )}
              >
                {LOCALE_LABELS[locale]}
                {active && <Check className="h-4 w-4" strokeWidth={2.25} />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
