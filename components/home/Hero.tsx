"use client";

import { motion, type Variants } from "framer-motion";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { HeroHeadline } from "@/components/home/HeroHeadline";
import { HeroStat } from "@/components/home/HeroStat";
import type { Dictionary } from "@/lib/i18n/types";
import {
  DURATION,
  EASE_OUT_EXPO,
  HERO_CADENCE,
  heroSlotDelay,
} from "@/lib/motion/tokens";

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: HERO_CADENCE.step / 1000,
      delayChildren: HERO_CADENCE.delay / 1000,
    },
  },
};

/**
 * Headline-block children take their delay from an explicit slot rather than
 * their position, because the headline between them is no longer a motion
 * component for framer to count. See HERO_CADENCE.
 */
const slotItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: (slot: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.hero / 1000,
      ease: EASE_OUT_EXPO,
      delay: heroSlotDelay(slot) / 1000,
    },
  }),
};

/** The stats row is uniform, so it can still lean on the parent's stagger. */
const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.hero / 1000, ease: EASE_OUT_EXPO },
  },
};

type Props = {
  copy: Dictionary["hero"];
  cta: Dictionary["cta"];
};

export function Hero({ copy, cta }: Props) {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-32">
      <div className="container-page pb-20 md:pb-28">
        <motion.div initial="hidden" animate="show" className="mx-auto max-w-4xl text-center">
          <motion.div
            variants={slotItem}
            custom={0}
            className="eyebrow inline-flex items-center gap-2"
          >
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            {copy.eyebrow}
          </motion.div>

          <HeroHeadline headline={copy.headline} />

          <motion.p
            variants={slotItem}
            custom={2}
            className="mt-8 mx-auto max-w-2xl text-lead text-muted"
          >
            {copy.sub}
          </motion.p>

          <motion.div
            variants={slotItem}
            custom={3}
            className="mt-10 mx-auto w-full max-w-md"
            data-inline-cta
          >
            <AppStoreButton label={cta.appStore} />
            <p className="mt-3 text-xs text-muted">{copy.ctaNote}</p>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-20 mx-auto grid grid-cols-3 gap-4 border-t border-line pt-10 text-sm md:mt-28 md:max-w-3xl md:gap-12"
        >
          {copy.stats.map((stat, i) => (
            <motion.li key={stat.label} variants={item} className="text-center">
              <div className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
                <HeroStat value={stat.value} index={i} />
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-[0.05em] text-muted md:text-xs md:tracking-[0.14em]">
                {stat.label}
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
