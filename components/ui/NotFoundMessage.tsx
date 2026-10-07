"use client";

import { Link } from "@/components/i18n/Link";
import { useMessages } from "@/lib/i18n/client";

/**
 * Body of the 404 pages. A client component because `not-found.tsx` receives
 * no route params — the locale comes from the layout's `LocaleProvider`.
 */
export function NotFoundMessage({ kind }: { kind: "notFound" | "recipeNotFound" }) {
  const copy = useMessages()[kind];
  return (
    <section className="section pt-28 md:pt-32">
      <div className="container-page mx-auto max-w-md text-center">
        <div className="eyebrow">{copy.eyebrow}</div>
        <h1 className="mt-3 font-display text-display-3">{copy.title}</h1>
        <p className="mt-4 text-sm text-muted">{copy.body}</p>
        <Link href="/" className="mt-8 inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-paper">
          {copy.cta}
        </Link>
      </div>
    </section>
  );
}
