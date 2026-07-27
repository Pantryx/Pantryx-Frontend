"use client";

import { useEffect, useRef } from "react";
import { animate } from "animejs/animation";
import { round } from "animejs/utils";
import { ANIME_EASE } from "@/lib/motion/anime";
import { prefersReducedMotion } from "@/lib/motion/env";
import { DURATION, heroSlotDelay } from "@/lib/motion/tokens";

/** Splits "30%" into 30 and "%", "60s" into 60 and "s", "0" into 0 and "". */
function parseStat(value: string): { target: number; suffix: string } {
  const match = /^(\d+)(.*)$/.exec(value);
  if (!match) return { target: 0, suffix: value };
  return { target: Number(match[1]), suffix: match[2] };
}

/** Counting starts once the stats row itself has finished arriving. */
const START = heroSlotDelay(3) + 150;

type Props = { value: string; index: number };

/**
 * The big number in a hero stat, counting up to its value.
 *
 * Rendered inside the existing `motion.li`, which framer still owns: this only
 * ever writes `textContent`, so the two never touch the same property. The
 * server renders the final value, which is what search engines and no-JS
 * readers get.
 */
export function HeroStat({ value, index }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const { target, suffix } = parseStat(value);

  useEffect(() => {
    const el = ref.current;
    // Counting 0 -> 0 renders "0" for a second while allocating a tween. The
    // stat is "0 subscriptions" and counting *down* to it would imply
    // subscriptions being taken away, so it simply stays put.
    if (!el || target === 0 || prefersReducedMotion()) return;

    const counter = { value: 0 };
    el.textContent = `0${suffix}`;

    const animation = animate(counter, {
      value: target,
      duration: DURATION.counter,
      ease: ANIME_EASE,
      delay: START + index * 80,
      modifier: round(0),
      onUpdate: () => {
        el.textContent = `${counter.value}${suffix}`;
      },
      onComplete: () => {
        el.textContent = `${target}${suffix}`;
      },
    });

    return () => {
      animation.revert();
      el.textContent = value;
    };
  }, [target, suffix, index, value]);

  // tabular-nums keeps the digits from shifting width as they climb.
  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
