import { Link } from "@/components/i18n/Link";
import { Reveal } from "@/components/ui/Reveal";
import { defaultLocale, type Locale } from "@/lib/i18n/config";
import { fmt, formatDate } from "@/lib/i18n/format";
import { localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/server";
import { legalLastUpdated, type LegalDocument } from "@/lib/legal/meta";
import { legalSections } from "@/lib/legal/sections";

type Props = {
  locale: Locale;
  kind: LegalDocument;
};

export function LegalLayout({ locale, kind }: Props) {
  const { legal: copy, chrome } = getDictionary(locale);
  const { title, intro } = copy[kind];
  const { sections, lang } = legalSections[kind][locale];
  const lastUpdated = formatDate(locale, legalLastUpdated[kind]);

  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <div className="lg:grid lg:grid-cols-[minmax(0,10.5rem)_minmax(0,1fr)] lg:gap-x-8 xl:gap-x-12">
            {/* Anchor nav: narrow column, hugging the left edge of the container */}
            <aside className="hidden lg:block">
              <nav className="sticky top-28 text-sm">
                <div className="eyebrow mb-3">{copy.onThisPage}</div>
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
                <div className="eyebrow">{copy.eyebrow}</div>
                <h1 className="mt-3 text-display-2 text-balance">{title}</h1>
                <p className="mt-5 text-lead text-muted">{intro}</p>
                <div className="mt-4 text-xs uppercase tracking-[0.16em] text-muted">
                  {fmt(copy.lastUpdated, { date: lastUpdated })}
                </div>
                {copy.translationNotice ? (
                  <p className="mt-4 max-w-2xl rounded-xl border border-line bg-subtle px-4 py-3 text-sm text-muted">
                    {copy.translationNotice.text}{" "}
                    {/* A plain link: reading the original is not a change of language preference. */}
                    <a href={localizedPath(defaultLocale, `/${kind}`)} hrefLang={defaultLocale} className="text-ink underline">
                      {copy.translationNotice.link}
                    </a>
                  </p>
                ) : null}
                <div className="mt-4 flex gap-4 text-sm">
                  <Link
                    href="/privacy"
                    className={kind === "privacy" ? "text-ink underline" : "text-muted hover:text-ink"}
                  >
                    {chrome.nav.privacy}
                  </Link>
                  <Link
                    href="/terms"
                    className={kind === "terms" ? "text-ink underline" : "text-muted hover:text-ink"}
                  >
                    {chrome.nav.terms}
                  </Link>
                </div>
              </Reveal>

              <div className="mx-auto mt-12 max-w-3xl">
                <article
                  lang={lang === locale ? undefined : lang}
                  className="text-[15px] leading-relaxed text-muted"
                >
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
