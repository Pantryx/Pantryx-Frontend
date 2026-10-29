import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  copy: Dictionary["pricing"];
  cta: Dictionary["cta"];
};

export function Pricing({ copy, cta }: Props) {
  return (
    <section id="pricing" className="section border-t border-line">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl">
          <div className="eyebrow">{copy.eyebrow}</div>
        </Reveal>

        <Reveal delay={0.05} className="mx-auto mt-12 max-w-3xl rounded-3xl border border-line bg-paper p-8 md:p-10">
          {/* Stacked on mobile: at 375px the price and its caption can't share a
              baseline without the caption hanging awkwardly off the descender. */}
          <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-3">
            <span className="font-display text-[clamp(2.75rem,11vw,4rem)] leading-none">{copy.price}</span>
          </div>
          <p className="mt-4 text-sm text-muted">{copy.cardNote}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {copy.included.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0" strokeWidth={2.25} />
                {i}
              </li>
            ))}
          </ul>

          <div className="mt-10" data-inline-cta>
            <AppStoreButton label={cta.appStore} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
