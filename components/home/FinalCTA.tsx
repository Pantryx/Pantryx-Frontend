import { Reveal } from "@/components/ui/Reveal";
import { AppStoreBadge } from "@/components/ui/AppStoreBadge";

export function FinalCTA() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-1 text-balance">
            Tonight&apos;s dinner is <em className="italic text-muted">one photo away.</em>
          </h2>
          <p className="mt-6 text-lead text-muted">
            No shopping list. No subscription. Just open the fridge.
          </p>
          <div className="mt-10 flex justify-center">
            <AppStoreBadge />
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.16em] text-muted">
            <span>Free</span>
            <span className="opacity-40">·</span>
            <span>No credit card</span>
            <span className="opacity-40">·</span>
            <span>Private by default</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
