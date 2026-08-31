"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

type Props = { open: boolean; onClose: () => void };

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    // Read by globals.css to pull the sticky beta bar out of the layout
    // (and out of the tab order) while the menu is up.
    document.body.dataset.menuOpen = "true";

    // The panel claims `aria-modal`, so Tab has to stay inside it — otherwise
    // focus walks onto the page behind, which is still rendered and scrollable
    // to a screen reader even though it looks covered.
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const items = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || !panelRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    // Wait a frame so the panel is mounted before focus moves into it.
    const raf = requestAnimationFrame(() =>
      panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus()
    );

    return () => {
      document.body.style.overflow = prev;
      delete document.body.dataset.menuOpen;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-paper md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex h-16 items-center justify-between px-5">
            <span className="font-display text-xl">{site.name}</span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line"
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>
          </div>
          <motion.div
            className="px-5 pt-8"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col">
              {[...nav.primary, ...nav.legal].map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="block py-5 font-display text-3xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex flex-col gap-3 pb-10">
              <WaitlistForm />
              <p className="text-xs text-muted">
                iOS beta · Free · Private by default
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
