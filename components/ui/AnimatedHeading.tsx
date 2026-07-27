"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate } from "animejs/animation";
import { set, stagger } from "animejs/utils";
import { ANIME_EASE } from "@/lib/motion/anime";
import { prefersReducedMotion, isDesktopViewport } from "@/lib/motion/env";
import { observeOnce } from "@/lib/motion/inView";
import { splitWords } from "@/lib/motion/splitWords";
import { DURATION, STAGGER } from "@/lib/motion/tokens";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Extra lead-in before the first word, in ms. */
  delay?: number;
};

/**
 * A heading whose words rise into place one after another as it scrolls in.
 *
 * Pair it with `y={0}` on the surrounding `Reveal`: the wrapper then fades the
 * whole block (eyebrow, heading, paragraph) while the heading's words supply the
 * vertical motion — once, at the right granularity, instead of the block and the
 * words both sliding.
 *
 * Word-level only. Splitting a display serif per character costs its kerning and
 * multiplies the node count for an effect that isn't legible at this size.
 */
export function AnimatedHeading({
  children,
  className,
  as: Tag = "h2",
  delay = 0,
}: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    // Under reduced motion we never split at all, so the DOM stays exactly as
    // React rendered it — nothing to un-mangle for screen readers or copy/paste.
    if (!el || prefersReducedMotion()) return;

    let split: ReturnType<typeof splitWords> | null = null;
    let stopObserving: (() => void) | undefined;

    try {
      split = splitWords(el);
      const words = split.words;
      set(words, { opacity: 0, y: 12 });

      stopObserving = observeOnce(el, () => {
        animate(words, {
          opacity: [0, 1],
          y: [12, 0],
          duration: DURATION.word,
          ease: ANIME_EASE,
          delay: stagger(isDesktopViewport() ? STAGGER.word : STAGGER.wordMobile, {
            start: delay,
          }),
        });
      });
    } catch {
      // Splitting is decorative. If it throws, leave the heading as plain text
      // rather than stranding it invisible.
      split?.revert();
      split = null;
    }

    return () => {
      stopObserving?.();
      split?.revert();
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
