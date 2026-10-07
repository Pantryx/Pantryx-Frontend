import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { HowItWorksRail } from "@/components/home/HowItWorksRail";
import { Reveal } from "@/components/ui/Reveal";
import { howItWorksStepIds } from "@/lib/content";
import type { Dictionary } from "@/lib/i18n/dictionaries/en";

export function HowItWorks({ copy }: { copy: Dictionary["home"]["howItWorks"] }) {
  return (
    <section id="how-it-works" className="section">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">{copy.eyebrow}</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">{copy.heading}</AnimatedHeading>
          <p className="mt-5 text-lead text-muted">{copy.lead}</p>
        </Reveal>

        <div className="relative mt-16">
          <HowItWorksRail />
          <ol className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
            {howItWorksStepIds.map((id, i) => (
              <Reveal key={id} delay={i * 0.05} as="li" className="relative text-center">
                <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper font-display text-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="mt-5 font-display text-lg leading-tight text-ink">{copy.steps[id].title}</div>
                <div className="mt-2 text-sm leading-relaxed text-muted">{copy.steps[id].copy}</div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
