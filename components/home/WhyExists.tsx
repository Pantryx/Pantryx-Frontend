import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/types";

export function WhyExists({ copy }: { copy: Dictionary["whyExists"] }) {
  return (
    <section className="border-y border-line bg-subtle">
      <div className="container-page section">
        <Reveal y={0} className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="eyebrow">{copy.eyebrow}</div>
            <AnimatedHeading className="mt-3 text-display-3 text-balance">
              {copy.heading.text}{" "}
              <em className="italic text-muted">{copy.heading.em}</em>
            </AnimatedHeading>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lead text-muted">{copy.body}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
