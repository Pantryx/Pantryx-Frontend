import { Check, Minus } from "lucide-react";
import { AnimatedHeading } from "@/components/ui/AnimatedHeading";
import { ComparisonChecks } from "@/components/home/ComparisonChecks";
import { Reveal } from "@/components/ui/Reveal";
import { comparisonRows } from "@/lib/site";

const apps = [
  { key: "pantryx" as const, label: "Pantryx", highlight: true },
  { key: "whisk" as const, label: "Whisk", highlight: false },
  { key: "mealime" as const, label: "Mealime", highlight: false },
  { key: "supercook" as const, label: "SuperCook", highlight: false },
  { key: "yummly" as const, label: "Yummly", highlight: false },
];

export function Comparison() {
  return (
    <section id="compare" className="section border-t border-line">
      <div className="container-page">
        <ComparisonChecks />
        <Reveal y={0} className="mx-auto max-w-3xl text-center">
          <div className="eyebrow">Pantryx vs other apps</div>
          <AnimatedHeading className="mt-3 text-display-2 text-balance">
            Most recipe apps ask: <em className="italic text-muted">what do you feel like eating?</em>
          </AnimatedHeading>
          <p className="mt-5 text-lead text-muted">
            Pantryx asks a better question: <em className="italic">what can you actually cook right now?</em>
          </p>
        </Reveal>

        {/* Desktop table */}
        <Reveal className="mt-16 hidden overflow-hidden rounded-2xl border border-line md:block">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-subtle">
                <th className="w-[38%] px-6 py-5 font-medium text-muted" scope="col">
                  Capability
                </th>
                {apps.map((a) => (
                  <th
                    key={a.key}
                    scope="col"
                    className={`px-4 py-5 text-center font-display text-lg ${
                      a.highlight ? "text-ink" : "text-muted"
                    }`}
                  >
                    {a.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.label} className="border-t border-line">
                  <th scope="row" className="px-6 py-5 text-left font-normal text-ink">
                    {row.label}
                  </th>
                  {apps.map((a) => {
                    const yes = row[a.key];
                    return (
                      <td
                        key={a.key}
                        className={`px-4 py-5 text-center ${
                          a.highlight ? "bg-subtle" : ""
                        }`}
                      >
                        {yes ? (
                          <Check
                            // Only the Pantryx column draws itself in.
                            data-draw-check={a.highlight ? "table" : undefined}
                            className="mx-auto h-5 w-5 text-ink"
                            strokeWidth={2.25}
                          />
                        ) : (
                          <Minus className="mx-auto h-5 w-5 text-line" strokeWidth={2} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* Mobile: stacked per-app cards (Pantryx first) */}
        <div className="mt-12 space-y-4 md:hidden">
          {apps.map((a, idx) => (
            <Reveal
              key={a.key}
              delay={idx * 0.04}
              className={`rounded-2xl border p-5 ${
                a.highlight ? "border-ink bg-subtle" : "border-line bg-paper"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="font-display text-xl">{a.label}</div>
                {a.highlight && (
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-paper">
                    You
                  </span>
                )}
              </div>
              <ul className="mt-4 space-y-2">
                {comparisonRows.map((row) => {
                  const yes = row[a.key];
                  return (
                    <li
                      key={row.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      {yes ? (
                        <Check
                          data-draw-check={a.highlight ? "card" : undefined}
                          className="mt-0.5 h-4 w-4 shrink-0 text-ink"
                          strokeWidth={2.5}
                        />
                      ) : (
                        <Minus className="mt-0.5 h-4 w-4 shrink-0 text-line" strokeWidth={2} />
                      )}
                      <span className={yes ? "text-ink" : "text-muted"}>{row.label}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
