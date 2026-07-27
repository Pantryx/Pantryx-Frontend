/**
 * Shared motion vocabulary.
 *
 * Two animation libraries drive this site — framer-motion owns the declarative
 * work (scroll reveals, route transitions, enter/exit) and anime.js owns the
 * imperative work (text splitting, number tweening, SVG draw-on). They must look
 * like one system, so every duration, easing and trigger point comes from here.
 *
 * Deliberately free of imports so server components and both libraries can read
 * it without dragging anything into their bundle.
 */

/**
 * The site's only bespoke curve, in framer-motion's array form. Same value as
 * Tailwind's `ease-out-expo` (tailwind.config.ts) and the theme-transition rule
 * in globals.css. anime.js needs it as a function — see `ANIME_EASE` in ./anime.
 */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/**
 * Matches `viewport.margin` in components/ui/Reveal.tsx. anime.js effects reuse
 * this for their own IntersectionObserver so a heading's words and the `Reveal`
 * wrapper around them fire on the same scroll position instead of 80px apart.
 */
export const REVEAL_MARGIN = "-80px";

/** Tailwind's `md`. Keep in sync if the breakpoint ever moves. */
export const MD_QUERY = "(min-width: 768px)";

export const DURATION = {
  /** Hero word reveal — matches the framer `item` variant it replaces. */
  hero: 800,
  /** Section heading word reveal — matches Reveal's own 0.7s. */
  word: 700,
  counter: 1100,
  draw: 520,
  rail: 800,
} as const;

/**
 * The hero entrance cadence, as explicit slots rather than child order.
 *
 * Slot 0 eyebrow · 1 headline · 2 copy · 3 CTA row. framer's `staggerChildren`
 * counts only *motion* children, so once the headline became a plain element
 * driven by anime.js it would have silently pulled the copy and CTA a step
 * earlier. Numbering the slots by hand keeps the rhythm fixed no matter which
 * library owns which line.
 */
export const HERO_CADENCE = { delay: 100, step: 80 } as const;

export function heroSlotDelay(slot: number): number {
  return HERO_CADENCE.delay + slot * HERO_CADENCE.step;
}

export const STAGGER = {
  word: 34,
  /** Tighter on phones so a headline doesn't outstay its welcome. */
  wordMobile: 26,
  check: 60,
} as const;
