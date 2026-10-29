import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { LOCALE_COOKIE, resolveLocale } from "@/lib/i18n/locale";
import { getHelpDictionary } from "@/lib/i18n/help";

async function resolveHelpLocale() {
  const [cookieStore, headerList] = await Promise.all([cookies(), headers()]);
  return resolveLocale(cookieStore.get(LOCALE_COOKIE)?.value, headerList.get("accept-language"));
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = getHelpDictionary(await resolveHelpLocale());
  return { title: meta.title, description: meta.description };
}

export default async function HelpPage() {
  const dict = getHelpDictionary(await resolveHelpLocale());

  return (
    <div className="pt-28 md:pt-32">
      <section className="section">
        <div className="container-page">
          <Reveal className="mx-auto max-w-3xl">
            <div className="eyebrow">{dict.eyebrow}</div>
            <h1 className="mt-3 text-display-2 text-balance">{dict.heading}</h1>
            <p className="mt-5 text-lead text-muted">{dict.lead}</p>
          </Reveal>

          <div className="mx-auto mt-14 grid max-w-3xl gap-12">
            {dict.groups.map((g, gi) => (
              <Reveal key={g.title} delay={gi * 0.05}>
                <h2 className="font-display text-2xl text-ink">{g.title}</h2>
                <ul className="mt-5 divide-y divide-line border-y border-line">
                  {g.items.map((it) => (
                    <li key={it.q} className="py-5">
                      <div className="font-medium text-ink">{it.q}</div>
                      <p className="mt-2 text-muted">{it.a}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}

            <Reveal className="rounded-2xl border border-line bg-subtle p-8 text-center">
              <h2 className="font-display text-2xl text-ink">{dict.stillStuck.heading}</h2>
              <p className="mt-3 text-muted">{dict.stillStuck.body}</p>
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
