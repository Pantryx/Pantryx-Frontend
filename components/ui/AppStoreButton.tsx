"use client";

import clsx from "clsx";
import { AppleMark } from "@/components/ui/AppleMark";
import { useMessages } from "@/lib/i18n/client";
import { site } from "@/lib/site";

type Props = {
  className?: string;
};

/** The primary call to action on every page: the Pantryx App Store listing. */
export function AppStoreButton({ className }: Props) {
  const t = useMessages().appStore;
  return (
    <a
      href={site.appStoreUrl}
      aria-label={t.ariaLabel}
      className={clsx(
        "inline-flex h-12 items-center justify-center gap-3 rounded-full bg-ink px-6 text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)] transition-[transform,background-color] duration-300 ease-out-expo hover:bg-ink-soft active:scale-[0.97]",
        className
      )}
    >
      <AppleMark className="h-5 w-5" />
      <span className="text-sm font-medium">{t.label}</span>
    </a>
  );
}
