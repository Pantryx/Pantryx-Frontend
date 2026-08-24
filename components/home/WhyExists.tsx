import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";

export function WhyExists() {
  return (
    <section className="border-y border-line bg-subtle">
      <div className="container-page section">
        <Reveal y={0} className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-5">
            <div className="eyebrow">Why this exists</div>
            <AnimatedHeading className="mt-3 text-display-3 text-balance">
              You don&apos;t need more recipes. <em className="italic text-muted">You need the right one.</em>
            </AnimatedHeading>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lead text-muted">
              When you already have food at home, another endless recipe catalogue doesn&apos;t solve
              the problem. Pantryx matches your ingredients and preferences to recipes that are
              realistic to make right now.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
