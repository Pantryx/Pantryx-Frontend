import { isLocale, locales } from "@/lib/i18n/config";
import { ogContentType, ogSize, renderOgImage } from "@/lib/ogImage";
import { site } from "@/lib/site";

// Language-neutral on purpose: a per-locale alt would need generateImageMetadata,
// which changes the image URL. Pages set a localized alt through pageMetadata().
export const alt = site.appStoreName;
export const size = ogSize;
export const contentType = ogContentType;

/** Rendered at build time: the card reads its fonts and images from disk. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Image routes get `params` as a plain object, unlike pages.
export default function TwitterImage({ params }: { params: { locale: string } }) {
  return renderOgImage(isLocale(params.locale) ? params.locale : "en");
}
