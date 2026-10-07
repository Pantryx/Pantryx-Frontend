"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { set, stagger } from "animejs/utils";
import { ANIME_EASE } from "@/lib/motion/anime";
import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion/env";
import { splitWords } from "@/lib/motion/splitWords";
import { DURATION, STAGGER, heroSlotDelay } from "@/lib/motion/tokens";
import type { Accented } from "@/lib/i18n/dictionaries/en";

const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Slot 1 of the hero cadence — between the eyebrow and the supporting copy. */
const START = heroSlotDelay(1);

/**
 * The hero headline, lifted out of framer's variant tree so anime.js can reveal
 * it word by word.
 *
 * Duration, travel and curve match the framer `item` variant its siblings still
 * use, so the line reads as the same entrance — just resolved a word at a time
 * instead of all at once.
 */
export function HeroHeadline({ copy }: { copy: Accented }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reveal before anything that can throw. The server renders this at
    // opacity 0 (exactly as framer did), so a failure past this point degrades
    // to "no animation" rather than an invisible headline.
    el.style.opacity = "1";
    if (prefersReducedMotion()) return;

    let split: ReturnType<typeof splitWords> | null = null;

    try {
      split = splitWords(el);
      set(split.words, { opacity: 0, y: 14 });
      animate(split.words, {
        opacity: [0, 1],
        y: [14, 0],
        duration: DURATION.hero,
        ease: ANIME_EASE,
        delay: stagger(isDesktopViewport() ? STAGGER.word : STAGGER.wordMobile, {
          start: START,
        }),
      });
    } catch {
      split?.revert();
      split = null;
      el.style.opacity = "1";
    }

    return () => {
      split?.revert();
    };
  }, []);

  return (
    <>
      <noscript>
        <style>{`[data-hero-headline]{opacity:1 !important}`}</style>
      </noscript>
      <h1
        ref={ref}
        data-hero-headline
        // Ukrainian runs ~40% wider than English; a little smaller (with room
        // from the wider column in Hero) keeps one sentence per line on desktop.
        className="mt-6 text-display-1 text-balance [&:lang(uk)]:text-[clamp(2.5rem,5.6vw+0.5rem,5rem)]"
        style={{ opacity: 0 }}
      >
        {copy.lead}
        <br />
        <span className="italic text-muted">{copy.accent}</span>
      </h1>
    </>
  );
}
