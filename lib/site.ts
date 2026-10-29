export const site = {
  name: "Pantryx",
  /** Full App Store listing title, used where the store name should be shown verbatim. */
  appStoreName: "AI Recipes & Pantry: Pantryx",
  tagline: "Stop staring at the fridge. Decide dinner in 60 seconds.",
  description:
    "Pantryx scans what you already have and turns it into dishes you can cook tonight — no shopping, no guesswork.",
  /** The App Store listing — the primary CTA on every page. */
  appStoreUrl: "https://apps.apple.com/us/app/ai-recipes-pantry-pantryx/id6761001136",
  /** Numeric App Store id, kept in step with `appStoreUrl`. Drives the Safari Smart App Banner. */
  appStoreId: "6761001136",
  contactEmail: "communication.pantryx@gmail.com",
  url: "https://pantryx.org",
} as const;

export const social = [
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/pantryx.app" },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@pantryx.app" },
  { id: "threads", label: "Threads", href: "https://www.threads.com/@pantryx.app" },
] as const;

export type SocialId = (typeof social)[number]["id"];

// `key` maps each item to its label in the i18n `chrome` dictionary; the hrefs
// stay here as the single source of truth for the routes.
export const nav = {
  primary: [
    { href: "/", key: "home" },
    { href: "/product", key: "product" },
    { href: "/help", key: "help" },
  ],
  legal: [
    { href: "/privacy", key: "privacy" },
    { href: "/terms", key: "terms" },
  ],
} as const;

/**
 * The comparison matrix: which capability each app has. The booleans are
 * language-independent data; the human-readable row labels live in the i18n
 * dictionaries, keyed by `id` (see `ComparisonRowId`). Keep this order in step
 * with the dictionaries' `comparison.rowLabels` so the table reads top to bottom
 * as written.
 */
export const comparisonRows = [
  { id: "aiScan", pantryx: true, whisk: false, mealime: false, supercook: false, yummly: false },
  { id: "usesWhatYouHave", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { id: "guidedCooking", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
  { id: "matchesTaste", pantryx: true, whisk: true, mealime: true, supercook: false, yummly: true },
  { id: "free", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { id: "noAds", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
] as const;
