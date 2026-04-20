"use client";

import { useEffect, useState } from "react";
import { Monitor, Moon, Sun } from "lucide-react";
import clsx from "clsx";

type Pref = "light" | "dark" | "system";

const STORAGE_KEY = "pantryx-theme";

function systemIsDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

function applyPref(pref: Pref) {
  if (typeof document === "undefined") return;
  const isDark = pref === "dark" || (pref === "system" && systemIsDark());
  document.documentElement.classList.toggle("dark", isDark);
}

let transitionTimeout: number | undefined;

function applyPrefWithTransition(pref: Pref) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.classList.add("theme-transition");

  // Apply the theme on the next frame so the transition class is registered first.
  window.requestAnimationFrame(() => {
    applyPref(pref);
  });

  window.clearTimeout(transitionTimeout);
  transitionTimeout = window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 400);
}

type Props = {
  className?: string;
};

export function ThemeToggle({ className }: Props) {
  const [pref, setPref] = useState<Pref>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem(STORAGE_KEY) as Pref | null) ?? "system";
    setPref(stored);
    setMounted(true);

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = () => {
      if ((localStorage.getItem(STORAGE_KEY) as Pref | null) === "system") {
        applyPrefWithTransition("system");
      }
    };
    mq.addEventListener("change", onSystemChange);
    return () => mq.removeEventListener("change", onSystemChange);
  }, []);

  const cycle = () => {
    const next: Pref =
      pref === "system" ? "light" : pref === "light" ? "dark" : "system";
    setPref(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
    applyPrefWithTransition(next);
  };

  // Reserve space before hydration so the nav doesn't jump.
  if (!mounted) {
    return <div className={clsx("h-10 w-10", className)} aria-hidden />;
  }

  const Icon = pref === "dark" ? Moon : pref === "light" ? Sun : Monitor;
  const label =
    pref === "dark"
      ? "Dark mode"
      : pref === "light"
      ? "Light mode"
      : "System theme";

  return (
    <button
      type="button"
      onClick={cycle}
      aria-label={`Theme: ${label}. Click to change.`}
      title={label}
      className={clsx(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink",
        className
      )}
    >
      <Icon className="h-[17px] w-[17px]" strokeWidth={1.75} />
    </button>
  );
}
