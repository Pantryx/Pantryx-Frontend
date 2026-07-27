"use client";

import { useEffect } from "react";
import { animate } from "animejs/animation";
import { createDrawable } from "animejs/svg";
import { stagger } from "animejs/utils";
import { ANIME_EASE } from "@/lib/motion/anime";
import { isDesktopViewport, prefersReducedMotion } from "@/lib/motion/env";
import { observeOnce } from "@/lib/motion/inView";
import { DURATION, STAGGER } from "@/lib/motion/tokens";

/**
 * Strokes on the six Pantryx checkmarks when the comparison scrolls into view.
 *
 * Renders nothing. Its targets are `<td>` and `<li>` descendants that no React
 * component can wrap without producing invalid table markup, so it drives them
 * by selector instead — which also lets `Comparison` stay a server component.
 *
 * Only the Pantryx column animates. The other four apps' marks, and every
 * `Minus`, stay static: drawing all thirty would turn a quiet accent into
 * confetti, and cost thirty stroke repaints to do it.
 */
export function ComparisonChecks() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    // Both the desktop table and the mobile cards are always in the DOM, hidden
    // from each other by CSS. Pick the one actually on screen so we never
    // animate twelve icons.
    const variant = isDesktopViewport() ? "table" : "card";
    const paths = Array.from(
      document.querySelectorAll<SVGPathElement>(
        `[data-draw-check="${variant}"] path`
      )
    );
    if (paths.length === 0) return;

    const section = document.getElementById("compare");
    if (!section) return;

    const drawables = createDrawable(paths);
    let animation: ReturnType<typeof animate> | null = null;

    // Retract before the section arrives, so the marks draw rather than appear
    // and then reset. Deep-linking to /#compare therefore draws them on arrival.
    //
    // Set through the proxy's own setAttribute rather than utils.set: the
    // `draw` value is applied by the proxy, and createDrawable only retracts
    // for itself on the first call per element (it guards on `pathLength`), so
    // React's StrictMode remount would otherwise leave the marks fully drawn.
    const setDraw = (value: string) => {
      for (const drawable of drawables) drawable.setAttribute("draw", value);
    };

    setDraw("0 0");

    const stop = observeOnce(section, () => {
      animation = animate(drawables, {
        draw: ["0 0", "0 1"],
        duration: DURATION.draw,
        ease: ANIME_EASE,
        delay: stagger(STAGGER.check),
      });
    });

    return () => {
      stop();
      animation?.revert();
      setDraw("0 1");
    };
  }, []);

  return null;
}
