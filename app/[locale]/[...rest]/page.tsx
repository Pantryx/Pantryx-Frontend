import { notFound } from "next/navigation";

/**
 * Sends unknown URLs to `[locale]/not-found.tsx`. There is no root
 * `app/layout.tsx` (the root layout is per locale), so without this catch-all
 * Next would answer them with its unstyled built-in 404.
 */
export default function UnknownPage() {
  notFound();
}
