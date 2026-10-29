import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppStoreButton } from "@/components/ui/AppStoreButton";
import { Fragment } from "react";
import type { Dictionary } from "@/lib/i18n/types";

type Props = {
  copy: Dictionary["finalCTA"];
  cta: Dictionary["cta"];
};

export function FinalCTA({ copy, cta }: Props) {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal y={0} className="mx-auto max-w-3xl text-center">
          <AnimatedHeading className="text-display-1 text-balance">
            {copy.heading.text}{" "}
            <em className="italic text-muted">{copy.heading.em}</em>
          </AnimatedHeading>
          <p className="mt-6 text-lead text-muted">{copy.lead}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted">
            {copy.badges.map((badge, i) => (
              <Fragment key={badge}>
                {i > 0 && <span className="opacity-40">·</span>}
                <span>{badge}</span>
              </Fragment>
            ))}
          </div>

          {/* data-inline-cta pulls the sticky bar down off this button. */}
          <div
            data-inline-cta
            className="mx-auto mt-12 max-w-sm border-t border-line pt-10"
          >
            <AppStoreButton label={cta.appStore} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
