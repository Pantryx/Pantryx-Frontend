"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import clsx from "clsx";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { MobileMenu } from "@/components/nav/MobileMenu";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

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
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out-expo",
          scrolled
            ? "border-b border-line bg-paper/80 backdrop-blur-md"
            : "border-b border-transparent bg-paper/0"
        )}
      >
        <div className="container-page flex h-16 items-center justify-between">
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
              <div
                className={clsx(
                  "absolute right-0 top-full w-56 pt-2 transition-all duration-200",
                  legalOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
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

          <div className="hidden items-center gap-2 md:flex">
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
