import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { helpGroupIds, helpGroups } from "@/lib/content";
import type { Qa } from "@/lib/i18n/dictionaries/en";
import { pageMetadata } from "@/lib/i18n/metadata";
import { getDictionary, pageLocale, type LocaleParams } from "@/lib/i18n/server";
import { site } from "@/lib/site";

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const locale = await pageLocale(props);
  const { title, description } = getDictionary(locale).help.meta;
  return pageMetadata({ locale, path: "/help", title, description });
}

export default async function HelpPage(props: LocaleParams) {
  const { help: copy } = getDictionary(await pageLocale(props));
  const groups = helpGroupIds.map((id) => {
    const group = copy.groups[id];
    const questions: Record<string, Qa> = group.questions;
    return {
      id,
      title: group.title,
      items: (helpGroups[id] as readonly string[]).map((questionId) => ({ id: questionId, ...questions[questionId] })),
    };
  });

  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <div className="eyebrow">{copy.eyebrow}</div>
            <h1 className="mt-3 text-display-2 text-balance">{copy.title}</h1>
            <p className="mt-5 text-lead text-muted">{copy.lead}</p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-12">
            {groups.map((g, gi) => (
              <Reveal key={g.id} delay={gi * 0.05}>
                <h2 className="font-display text-2xl text-ink">{g.title}</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {g.items.map((it) => (
                    <li key={it.id} className="py-5">
                      <div className="font-medium text-ink">{it.q}</div>
                      <p className="mt-2 text-muted">{it.a}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal className="rounded-2xl border border-line bg-subtle p-8 text-center">
              <h2 className="font-display text-2xl text-ink">{copy.stillStuck.title}</h2>
              <p className="mt-3 text-muted">{copy.stillStuck.body}</p>
              <a
                href={`mailto:${site.contactEmail}`}
                className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-ink-soft"
              >
                {site.contactEmail}
              </a>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
