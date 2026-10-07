import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Accented } from "@/components/ui/Accented";
import { Reveal } from "@/components/ui/Reveal";
import { featureIds } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function Features({ copy }: { copy: Dictionary["home"]["features"] }) {
  return (
    <section id="features" className="section border-t border-line">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">{copy.eyebrow}</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">
            <Accented copy={copy.heading} />
          </AnimatedHeading>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {featureIds.map((id, i) => {
            const feature = copy.items[id];
            return (
              <Reveal key={id} delay={i * 0.05} className="bg-paper p-8 md:p-10">
                <div className="eyebrow">{feature.kicker}</div>
                <h3 className="mt-3 text-display-3 leading-tight text-balance">{feature.title}</h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{feature.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
