"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { useStickyCtaVisibility } from "@/lib/hooks/useStickyCtaVisibility";

export function StickyMobileCTA() {
  const visible = useStickyCtaVisibility();
  const reduceMotion = useReducedMotion();
  const slide = reduceMotion ? 0 : 80;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: slide, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: slide, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          // pointer-events-none on the wrapper so the transparent top of the
          // scrim doesn't swallow taps meant for the page behind it.
          className="sticky-cta safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-paper via-paper/85 to-transparent px-4 pt-8 md:hidden"
        >
          <Link
            href={site.appStoreUrl}
            aria-label="Download Pantryx on the App Store"
            className="pointer-events-auto flex items-center justify-center gap-3 rounded-full bg-ink px-5 py-4 text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)]"
          >
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
            >
              <path d="M17.56 12.77c-.03-3.07 2.5-4.54 2.62-4.62-1.43-2.09-3.66-2.38-4.44-2.41-1.89-.19-3.69 1.11-4.64 1.11-.97 0-2.44-1.08-4.01-1.05-2.06.03-3.96 1.2-5.02 3.04-2.14 3.71-.55 9.21 1.54 12.22 1.02 1.47 2.23 3.13 3.83 3.07 1.54-.06 2.12-1 3.98-1 1.86 0 2.38 1 4.01.97 1.66-.03 2.71-1.5 3.72-2.98 1.17-1.71 1.66-3.37 1.69-3.46-.04-.02-3.24-1.25-3.28-4.89z M14.49 3.9c.84-1.03 1.41-2.45 1.25-3.87-1.21.05-2.69.82-3.57 1.85-.79.91-1.48 2.37-1.29 3.76 1.35.11 2.74-.7 3.61-1.74z" />
            </svg>
            <span className="text-sm font-medium">Download on the App Store · Free</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
