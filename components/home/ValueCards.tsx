import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { valueCardIds } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function ValueCards({ copy }: { copy: Dictionary["home"]["valueCards"] }) {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">{copy.eyebrow}</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">{copy.heading}</AnimatedHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valueCardIds.map((id, i) => (
            <Reveal
              key={id}
              delay={i * 0.05}
              className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-8 transition-colors duration-300 hover:border-ink"
            >
              <div className="font-display text-[11px] tracking-[0.3em] text-muted">0{i + 1}</div>
              <h3 className="mt-6 font-display text-2xl leading-tight text-ink">{copy.cards[id].title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{copy.cards[id].copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
