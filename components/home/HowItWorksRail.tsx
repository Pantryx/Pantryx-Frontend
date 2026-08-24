"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { set } from "animejs/utils";
import { ANIME_EASE } from "@/lib/motion/anime";
import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion/env";
import { observeOnce } from "@/lib/motion/inView";
import { DURATION } from "@/lib/motion/tokens";

/**
 * The hairline connecting the six numbered steps, drawing itself left to right
 * as the section arrives.
 *
 * It's a 1px div rather than an SVG, so this scales it on the X axis instead of
 * animating `stroke-dashoffset` — visually identical for a straight line, but
 * compositor-only and with no markup to introduce.
 */
export function HowItWorksRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    // `hidden lg:block` keeps this off phones and the 2-row tablet grid, where a
    // single full-width line would only span the top row; don't animate a
    // display:none node either way.
    if (!el || !isDesktopViewport() || prefersReducedMotion()) return;

    set(el, { scaleX: 0 });

    const stop = observeOnce(el.parentElement ?? el, () => {
      animate(el, {
        scaleX: [0, 1],
        duration: DURATION.rail,
        ease: ANIME_EASE,
      });
    });

    return () => {
      stop();
      set(el, { scaleX: 1 });
    };
  }, []);

  return (
    <div
      ref={ref}
      data-rail
      className="pointer-events-none absolute left-0 right-0 top-[28px] hidden h-px origin-left bg-line lg:block"
    />
  );
}
