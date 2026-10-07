import type { Metadata } from "next";
import { localeMeta, type Locale } from "@/lib/i18n/config";
import { languageAlternates, localizedPath } from "@/lib/i18n/paths";
import { getDictionary } from "@/lib/i18n/server";
import { site } from "@/lib/site";

type PageMetadataInput = {
  locale: Locale;
  /** The page's unprefixed path, e.g. `/help`. */
  path: string;
  /** Page title; the layout's template appends " · Pantryx". Omit on the home page. */
  title?: string;
  /** Social-card title; defaults to "<title> · Pantryx", or the site title on the home page. */
  socialTitle?: string;
  description: string;
  type?: "website" | "article";
  extra?: Metadata;
};

/**
 * Per-page metadata: canonical URL, hreflang alternates, and complete Open
 * Graph / Twitter blocks.
 *
 * The social-card images are listed explicitly. A page that sets its own
 * `openGraph` replaces the layout's whole block, and with it the images Next
 * attaches from `opengraph-image.tsx` — which is how /meal-planner used to
 * share without a preview.
 */
export function pageMetadata({
  locale,
  path,
  title,
  socialTitle,
  description,
  type = "website",
  extra,
}: PageMetadataInput): Metadata {
  const { meta } = getDictionary(locale);
  const cardTitle = socialTitle ?? (title ? `${title} · ${site.name}` : `${site.name} — ${meta.tagline}`);
  const url = localizedPath(locale, path);
  const image = { width: 1200, height: 630, alt: `${site.appStoreName} — ${meta.tagline}`, type: "image/png" };
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      title: cardTitle,
      description,
      url,
      siteName: site.name,
      type,
      locale: localeMeta[locale].og,
      alternateLocale: Object.entries(localeMeta)
        .filter(([other]) => other !== locale)
        .map(([, other]) => other.og),
      images: [{ url: `/${locale}/opengraph-image`, ...image }],
    },
    twitter: {
      card: "summary_large_image",
      title: cardTitle,
      description,
      images: [{ url: `/${locale}/twitter-image`, ...image }],
    },
    ...extra,
  };
}
