"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Scroll offsets that gate the sticky mobile CTA.
 *
 * The gap between them is a hysteresis band: once the bar is shown it only
 * hides again after the reader scrolls a real distance back toward the top.
 * A single threshold made the bar slide in and out repeatedly whenever a
 * finger wobbled — or iOS momentum bounced — across that one point.
 */
export const SHOW_AT_Y = 560;
export const HIDE_AT_Y = 360;

/** Every inline beta CTA carries this attribute. */
export const INLINE_CTA_SELECTOR = "[data-beta-cta]";

/** Height of the fixed navbar — a badge scrolled under it isn't really visible. */
const NAVBAR_HEIGHT = 64;

/**
 * Decides whether the sticky mobile beta bar should be on screen.
 *
 * It is shown only when the reader is past the gate *and* no inline beta
 * badge is in view. The second condition is what keeps the bar from covering
 * the real badge in the pricing/final CTA sections, and it means the bar has
 * no hard-coded knowledge of the page it sits on.
 */
export function useStickyCtaVisibility(): boolean {
  const pathname = usePathname();
  const [pastGate, setPastGate] = useState(false);
  // Assume a badge is on screen until the observer reports otherwise, so the
  // bar can never flash during the first frames after hydration.
  const [inlineCtaInView, setInlineCtaInView] = useState(true);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      const y = window.scrollY;
      setPastGate((shown) => (shown ? y > HIDE_AT_Y : y > SHOW_AT_Y));
    };

    // Scroll fires far more often than we can paint; coalesce to one read per frame.
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Re-scan on navigation: the page body is replaced on route change, so the
  // previous route's badges are gone by the time this runs.
  useEffect(() => {
    const badges = Array.from(document.querySelectorAll(INLINE_CTA_SELECTOR));
    if (badges.length === 0) {
      setInlineCtaInView(false);
      return;
    }

    const onScreen = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onScreen.add(entry.target);
          else onScreen.delete(entry.target);
        }
        setInlineCtaInView(onScreen.size > 0);
      },
      { rootMargin: `-${NAVBAR_HEIGHT}px 0px 0px 0px` }
    );

    badges.forEach((badge) => observer.observe(badge));
    return () => observer.disconnect();
  }, [pathname]);

  return pastGate && !inlineCtaInView;
}
