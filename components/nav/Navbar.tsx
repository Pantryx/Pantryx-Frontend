"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/lib/site";
import { JoinBetaButton } from "@/components/ui/JoinBetaButton";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/nav/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const legalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setLegalOpen(false);
  }, [pathname]);

  // The dropdown opens on hover but can also be opened by click or keyboard,
  // and in those cases moving the mouse away never closes it. Escape and an
  // outside press are the two exits people reach for.
  useEffect(() => {
    if (!legalOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setLegalOpen(false);
      legalRef.current?.querySelector("button")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (legalRef.current?.contains(event.target as Node)) return;
      setLegalOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [legalOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-3 focus:py-2 focus:text-sm focus:text-paper"
      >
        Skip to content
      </a>
      <header
        className={clsx(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out-expo",
          scrolled
            ? "border-b border-line bg-paper/80 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.25)] backdrop-blur-md"
            : "border-b border-transparent bg-paper/0"
        )}
      >
        <div
          className={clsx(
            "container-page flex items-center justify-between transition-[height] duration-300 ease-out-expo",
            scrolled ? "h-14" : "h-16"
          )}
        >
          <Link href="/" className="group flex items-center gap-2" aria-label="Pantryx home">
            <Logo />
            <span className="font-display text-xl leading-none text-ink">{site.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {nav.primary.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "relative rounded-full px-4 py-2 text-sm transition-colors",
                  pathname === item.href ? "text-ink" : "text-muted hover:text-ink"
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute inset-x-4 -bottom-0.5 h-px bg-ink" />
                )}
              </Link>
            ))}
            <div
              ref={legalRef}
              className="relative"
              onMouseEnter={() => setLegalOpen(true)}
              onMouseLeave={() => setLegalOpen(false)}
            >
              <button
                onClick={() => setLegalOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={legalOpen}
                className={clsx(
                  "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors",
                  nav.legal.some((l) => l.href === pathname)
                    ? "text-ink"
                    : "text-muted hover:text-ink"
                )}
              >
                Legal
                <ChevronDown
                  className={clsx("h-3.5 w-3.5 transition-transform", legalOpen && "rotate-180")}
                  strokeWidth={2}
                />
              </button>
              {/* Scales from the trigger, not from its own centre — a popover
                  that grows out of the middle of nowhere reads as unanchored. */}
              <div
                className={clsx(
                  "absolute right-0 top-full w-56 origin-top-right pt-2 transition-[transform,opacity] duration-200 ease-out-expo",
                  legalOpen
                    ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                    : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
                )}
                role="menu"
              >
                <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-[0_16px_40px_-20px_rgba(0,0,0,0.2)]">
                  {nav.legal.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-3 text-sm text-muted transition-colors hover:bg-subtle hover:text-ink"
                      role="menuitem"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* The CTA holds its space from the start and only fades in, so the
              nav doesn't reflow the moment you begin scrolling. */}
          <div className="hidden items-center gap-2 md:flex">
            <div
              className={clsx(
                "origin-right transition-[transform,opacity] duration-300 ease-out-expo motion-reduce:transition-opacity",
                scrolled
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
              )}
              aria-hidden={!scrolled}
            >
              <JoinBetaButton size="compact" inline={false} />
            </div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}

function Logo() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M2 2h10v3H2V2zm0 4.5h10V9H2V6.5zM2 10.5h6V13H2v-2.5z" fill="currentColor" />
      </svg>
    </span>
  );
}
