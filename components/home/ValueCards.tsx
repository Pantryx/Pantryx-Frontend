import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { valueCards } from "@/lib/site";

export function ValueCards() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">Why Pantryx</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">
            Three quiet wins, every week.
          </AnimatedHeading>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {valueCards.map((v, i) => (
            <Reveal
              key={v.title}
              delay={i * 0.05}
              className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-8 transition-colors duration-300 hover:border-ink"
            >
              <div className="font-display text-[11px] tracking-[0.3em] text-muted">0{i + 1}</div>
              <h3 className="mt-6 font-display text-2xl leading-tight text-ink">{v.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted">{v.copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
