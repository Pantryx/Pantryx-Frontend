/**
 * Site configuration that is the same in every language. Words shown to
 * people live in the dictionaries (lib/i18n/dictionaries); the structure of
 * the content in lib/content.ts.
 */
export const site = {
  name: "Pantryx",
  /** Full App Store listing title, used where the store name should be shown verbatim. */
  appStoreName: "AI Recipes & Pantry: Pantryx",
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
