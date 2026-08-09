"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AppleMark } from "@/components/ui/AppleMark";
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

const PILL =
  "pointer-events-auto flex items-center justify-center gap-3 rounded-full bg-ink px-5 py-4 text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] transition-transform duration-200 ease-out-expo active:scale-[0.97]";

/**
 * A bar that permanently occupies the bottom of every phone screen has to do
 * something when tapped. While the TestFlight invite is still closed it points
 * at the waitlist instead of rendering a dead, dimmed pill — and it stays fully
 * opaque either way, since a translucent bar lets the page scroll through it.
 */
function StickyPill() {
  const open = site.testFlightUrl.length > 0;

  if (!open) {
    return (
      <a href="#waitlist" aria-label="Get notified when the Pantryx beta opens" className={PILL}>
        <AppleMark className="h-5 w-5" />
        <span className="text-sm font-medium">Get notified when the beta opens</span>
      </a>
    );
  }

  return (
    <Link
      href={site.testFlightUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Join the Pantryx beta on TestFlight"
      className={PILL}
    >
      <AppleMark className="h-5 w-5" />
      <span className="text-sm font-medium">Join the beta · Free</span>
    </Link>
  );
}
