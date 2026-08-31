import { Reveal } from "@/components/ui/Reveal";
import { WaitlistForm } from "@/components/ui/WaitlistForm";

export function MidCTA() {
  return (
    <section className="border-y border-line bg-subtle text-ink">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-14 md:flex-row md:py-16">
        <Reveal className="max-w-xl">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-balance">
            Your fridge is already full. <span className="text-muted">Let it cook something.</span>
          </h3>
        </Reveal>
        <Reveal delay={0.05} className="w-full md:w-auto">
          {/* data-beta-cta keeps the sticky mobile bar off this form while it's
              on screen — see useStickyCtaVisibility. */}
          <div data-beta-cta>
            <WaitlistForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
