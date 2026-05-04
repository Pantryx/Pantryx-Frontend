import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type Section = { id: string; title: string; body: ReactNode };

type Props = {
  kind: "privacy" | "terms";
  title: string;
  intro: string;
  lastUpdated: string;
  sections: Section[];
};

export function LegalLayout({ kind, title, intro, lastUpdated, sections }: Props) {
  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-12">
            {/* Anchor nav: narrow column, hugging the left edge of the container */}
            <aside className="hidden lg:block">
              <nav className="sticky top-28 text-sm">
                <div className="eyebrow mb-3">On this page</div>
                <ul className="space-y-2">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="text-muted transition-colors hover:text-ink"
                      >
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Hero + article share one max width and horizontal centering */}
            <div className="min-w-0">
              <Reveal when="mount" className="mx-auto max-w-3xl">
                <div className="eyebrow">Legal</div>
                <h1 className="mt-3 text-display-2 text-balance">{title}</h1>
                <p className="mt-5 text-lead text-muted">{intro}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
                  Last updated: {lastUpdated}
                </div>
                <div className="mt-4 flex gap-4 text-sm">
                  <Link
                    href="/privacy"
                    className={kind === "privacy" ? "text-ink underline" : "text-muted hover:text-ink"}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className={kind === "terms" ? "text-ink underline" : "text-muted hover:text-ink"}
                  >
                    Terms of Use
                  </Link>
                </div>
              </Reveal>

              <div className="mx-auto mt-12 max-w-3xl">
                <article className="text-[15px] leading-relaxed text-muted">
                  {sections.map((s, i) => (
                    <Reveal
                      when="mount"
                      key={s.id}
                      delay={i * 0.03}
                      id={s.id}
                      className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
                    >
                      <h2 className="font-display text-2xl text-ink">{s.title}</h2>
                      <div className="mt-4 space-y-4">{s.body}</div>
                    </Reveal>
                  ))}
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
