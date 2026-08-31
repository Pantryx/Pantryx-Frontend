"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppleMark } from "@/components/ui/AppleMark";
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
          // The scrim needs enough run-up to fade the page out behind the pill;
          // at pt-8 body text was still legible right up against its edge.
          className="sticky-cta safe-bottom pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-paper via-paper/95 to-transparent px-4 pt-14 md:hidden"
        >
          <StickyPill />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * A bar that permanently occupies the bottom of every phone screen has to do
 * something when tapped. Invites go out by email, so it points at the waitlist
 * form — from another route that has to be an absolute path, or the hash
 * resolves against a page with no #waitlist on it and the tap does nothing.
 *
 * It stays fully opaque: a translucent bar lets the page scroll through it.
 */
function StickyPill() {
  const pathname = usePathname();
  const href = pathname === "/" ? "#waitlist" : "/#waitlist";

  return (
    <a
      href={href}
      aria-label="Get your Pantryx beta invite by email"
      className="pointer-events-auto flex items-center justify-center gap-3 rounded-full bg-ink px-5 py-4 text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-out-expo active:scale-[0.97]"
    >
      <AppleMark className="h-5 w-5" />
      <span className="text-sm font-medium">Get your beta invite</span>
    </a>
  );
}
