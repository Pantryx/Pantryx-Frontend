"use client";

import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { faqIds } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function FAQ({ copy }: { copy: Dictionary["home"]["faq"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section border-t border-line">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">{copy.eyebrow}</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">{copy.heading}</AnimatedHeading>
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          <ul className="divide-y divide-line border-y border-line">
            {faqIds.map((id, i) => {
              const item = copy.items[id];
              const isOpen = open === i;
              return (
                <li key={id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-ink"
                  >
                    <span className="font-display text-xl leading-tight text-ink">
                      {item.q}
                    </span>
                    <Plus
                      className={`mt-1 h-5 w-5 shrink-0 text-ink transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                      strokeWidth={1.75}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-base leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
