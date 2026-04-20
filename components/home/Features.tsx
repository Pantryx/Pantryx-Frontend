import { Reveal } from "@/components/ui/Reveal";
import { features } from "@/lib/site";

export function Features() {
  return (
    <section id="features" className="section border-t border-line">
      <div className="container-page">
        <Reveal className="mx-auto max-w-3xl">
          <div className="eyebrow">Features</div>
          <h2 className="mt-3 text-display-2 text-balance">
            Built around the one question: <em className="italic text-muted">what can I cook with this?</em>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05} className="bg-paper p-8 md:p-10">
              <div className="eyebrow">{f.kicker}</div>
              <h3 className="mt-3 text-display-3 leading-tight text-balance">{f.title}</h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-muted">{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
