"use client";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

const AUTO_ADVANCE_MS = 6500;

export function SocialProof({ copy }: { copy: Dictionary["socialProof"] }) {
  const testimonials = copy.testimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + testimonials.length) % testimonials.length),
    [testimonials.length]
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, go, index]);

  return (
    <section
      aria-label={copy.heading}
      className="border-t border-line bg-subtle"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page section">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">{copy.eyebrow}</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">
            {copy.heading}
          </AnimatedHeading>
          <p className="mt-5 text-lead text-muted">{copy.lead}</p>
        </Reveal>

        <Reveal
          delay={0.05}
          className="relative mx-auto mt-14 max-w-4xl"
          y={12}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-line bg-paper p-7 md:p-10"
            role="region"
            aria-roledescription="carousel"
            aria-live="polite"
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <Quote
              aria-hidden
              className="absolute right-6 top-6 h-9 w-9 text-line md:right-8 md:top-8 md:h-11 md:w-11"
              strokeWidth={1.25}
            />

            {/* Every quote shares one grid cell, so the card is always as tall
                as the longest quote and its height never changes as it cycles.
                Only the active quote is opaque; the rest stay transparent but
                still occupy the cell to hold the height. */}
            <div className="grid">
              {testimonials.map((t, i) => {
                const isActive = i === index;
                const tInitials = t.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2);
                return (
                  <motion.blockquote
                    key={t.name}
                    aria-hidden={!isActive}
                    className="col-start-1 row-start-1"
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0, y: isActive || reduce ? 0 : 8 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    style={{ pointerEvents: isActive ? "auto" : "none" }}
                  >
                    <p className="pr-10 font-display text-[clamp(1.375rem,1.8vw+0.75rem,1.95rem)] leading-snug text-ink text-balance md:pr-14">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <footer className="mt-6 flex items-center gap-3">
                      <div
                        aria-hidden
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-subtle font-display text-sm text-ink"
                      >
                        {tInitials}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-ink">{t.name}</div>
                        <div className="text-xs text-muted">{t.role}</div>
                      </div>
                    </footer>
                  </motion.blockquote>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink"
              >
                <ArrowLeft className="h-4 w-4" strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-ink transition-colors hover:border-ink"
              >
                <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
              </button>
            </div>

            <div
              className="flex items-center gap-2"
              role="tablist"
              aria-label="Select testimonial"
            >
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${testimonials.length}`}
                  aria-selected={i === index}
                  role="tab"
                  className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                    i === index ? "w-7 bg-ink" : "w-1.5 bg-line hover:bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
