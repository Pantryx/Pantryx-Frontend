import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

const included = [
  "AI fridge scanner",
  "Pantry-based dish ideas",
  "Guided cook mode",
  "Live cooking chat",
  "Dietary preferences & allergies",
  "All features included while we're free",
];

export function Pricing() {
  return (
    <section id="pricing" className="section border-t border-line">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-2xl text-center">
          <div className="eyebrow">Pricing</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">One plan. Free.</AnimatedHeading>
          <p className="mt-5 text-lead text-muted">
            Pantryx is free while we grow. Every feature, no credit card. If we add subscriptions,
            we&apos;ll spell out price and what&apos;s included before you pay.
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-12 max-w-xl rounded-3xl border border-line bg-paper p-8 md:p-10">
          {/* Stacked on mobile: at 375px the price and its caption can't share a
              baseline without the caption hanging awkwardly off the descender. */}
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
            <span className="font-display text-[clamp(2.75rem,11vw,4rem)] leading-none">Free</span>
            <span className="text-sm text-muted">today · subscriptions later</span>
          </div>
          <p className="mt-4 text-sm text-muted">
            No card required · Delete your account anytime.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.25} />
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <AppStoreBadge />
            <span className="text-xs text-muted">iPhone · iOS 16+</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
