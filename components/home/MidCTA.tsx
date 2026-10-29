import { Reveal } from "@/components/ui/Reveal";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  copy: Dictionary["midCTA"];
  cta: Dictionary["cta"];
};

export function MidCTA({ copy, cta }: Props) {
  return (
    <section className="border-y border-line bg-subtle text-ink">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-14 md:flex-row md:py-16">
        <Reveal className="max-w-xl">
          <h3 className="font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-tight text-balance">
            {copy.heading.text} <span className="text-muted">{copy.heading.em}</span>
          </h3>
        </Reveal>
        <Reveal delay={0.05} className="w-full md:w-auto">
          {/* data-inline-cta keeps the sticky mobile bar off this button while it's
              on screen — see useStickyCtaVisibility. */}
          <div data-inline-cta>
            <AppStoreButton className="w-full md:w-auto" label={cta.appStore} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
