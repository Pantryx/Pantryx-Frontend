"use client";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/site";

const AUTO_ADVANCE_MS = 6500;

export function SocialProof() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  const go = useCallback(
    (delta: number) =>
      setIndex((i) => (i + delta + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = window.setInterval(() => go(1), AUTO_ADVANCE_MS);
    return () => window.clearInterval(id);
  }, [paused, reduce, go, index]);

  const active = testimonials[index];
  const initials = active.name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

  return (
    <section
      aria-label="What early testers are saying"
      className="border-t border-line bg-subtle"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-page section">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">Built in the open</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">
            What early testers are saying.
          </AnimatedHeading>
          <p className="mt-5 text-lead text-muted">
            A few unfiltered reactions from people cooking with Pantryx during private beta.
          </p>
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

            <div className="min-h-[200px] sm:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={active.name}
                  initial={{ opacity: 0, y: reduce ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduce ? 0 : -10 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-display text-[clamp(1.375rem,1.8vw+0.75rem,1.95rem)] leading-snug text-ink text-balance">
                    &ldquo;{active.quote}&rdquo;
                  </p>
                  <footer className="mt-6 flex items-center gap-3">
                    <div
                      aria-hidden
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-subtle font-display text-sm text-ink"
                    >
                      {initials}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-ink">{active.name}</div>
                      <div className="text-xs text-muted">{active.role}</div>
                    </div>
                  </footer>
                </motion.blockquote>
              </AnimatePresence>
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
