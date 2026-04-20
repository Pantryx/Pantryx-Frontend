"use client";

import { motion } from "framer-motion";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="container-page pb-20 md:pb-28">
        <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl">
          <motion.div variants={item} className="eyebrow inline-flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ink" />
            Now in early access · iOS
          </motion.div>

          <motion.h1 variants={item} className="mt-6 text-display-1 text-balance">
            Stop staring at the fridge.
            <br />
            <span className="italic text-muted">Decide dinner in 60&nbsp;seconds.</span>
          </motion.h1>

          <motion.p variants={item} className="mt-8 max-w-2xl text-lead text-muted">
            Pantryx scans what you already have and turns it into dishes you can cook tonight —
            no shopping, no guesswork.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
          >
            <AppStoreBadge />
            <div className="text-sm text-muted">Free · 10-second scan · Delete anytime</div>
          </motion.div>
        </motion.div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          animate="show"
          className="mt-20 grid grid-cols-3 gap-6 border-t border-line pt-10 text-sm md:mt-28 md:max-w-3xl md:gap-12"
        >
          {[
            ["30%", "less food waste"],
            ["60s", "to dinner idea"],
            ["0", "subscriptions"],
          ].map(([big, small]) => (
            <motion.li key={small} variants={item}>
              <div className="font-display text-[clamp(2rem,4vw,3rem)] leading-none text-ink">
                {big}
              </div>
              <div className="mt-3 text-xs uppercase tracking-[0.14em] text-muted">{small}</div>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
