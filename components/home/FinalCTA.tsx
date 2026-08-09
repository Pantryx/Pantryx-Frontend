import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JoinBetaButton } from "@/components/ui/JoinBetaButton";
import { WaitlistForm } from "@/components/ui/WaitlistForm";
import { beta } from "@/lib/site";

export function FinalCTA() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl text-center">
          <AnimatedHeading className="text-display-1 text-balance">
            Tonight&apos;s dinner is <em className="italic text-muted">one photo away.</em>
          </AnimatedHeading>
          <p className="mt-6 text-lead text-muted">
            No shopping list. No subscription. Just open the fridge.
          </p>
          <div className="mt-10 flex justify-center">
            <JoinBetaButton />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted">
            <span>Free</span>
            <span className="opacity-40">·</span>
            <span>No credit card</span>
            <span className="opacity-40">·</span>
            <span>Private by default</span>
          </div>

          {/* scroll-mt clears the fixed navbar when the sticky bar links here. */}
          <div
            id="waitlist"
            className="mx-auto mt-12 max-w-sm scroll-mt-24 border-t border-line pt-10"
          >
            <p className="font-display text-lg text-ink">{beta.waitlistTitle}</p>
            <WaitlistForm align="center" className="mt-4 text-left" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
