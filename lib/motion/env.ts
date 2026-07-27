import { MD_QUERY } from "./tokens";

/**
 * Synchronous reads for use *inside* imperative anime.js effects, where a hook
 * value isn't available.
 *
 * In React render, prefer framer-motion's `useReducedMotion()` — it is already
 * in the bundle and already used by Reveal, SocialProof and StickyMobileCTA.
 */

/**
 * The reduced-motion block in globals.css only zeroes CSS durations; it has no
 * effect on JS-driven animation. Every anime.js effect has to check this itself.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isDesktopViewport(): boolean {
  return typeof window !== "undefined" && window.matchMedia(MD_QUERY).matches;
}
