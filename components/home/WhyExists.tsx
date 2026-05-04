import { Reveal } from "@/components/ui/Reveal";

export function WhyExists() {
  return (
    <section className="border-y border-line bg-subtle">
      <div className="container-page section">
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <div className="eyebrow">Why this exists</div>
            <h2 className="mt-3 text-display-3 text-balance">
              The average household throws out roughly <em className="italic text-muted">30% of the food it buys.</em>
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="text-lead text-muted">
              Most of it isn&apos;t laziness — it&apos;s not knowing what to cook before things go bad.
              Pantryx fixes that with a 10-second scan and a dish idea you can actually make with
              what&apos;s already in your fridge.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
