/**
 * A heading split into its plain lead-in and its emphasised tail. The component
 * owns the styling (italic muted `<em>`, or a muted `<span>` in MidCTA); the
 * dictionary only carries the two text parts, so translations stay free of
 * markup and the word-split animation keeps working unchanged.
 */
export type Emphasis = { text: string; em: string };

/** Stable ids for the comparison rows; the boolean matrix lives in `lib/site.ts`. */
export type ComparisonRowId =
  | "aiScan"
  | "usesWhatYouHave"
  | "guidedCooking"
  | "matchesTaste"
  | "free"
  | "noAds";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  chrome: {
    skipToContent: string;
    nav: { home: string; product: string; help: string };
    /** The Legal dropdown trigger label. */
    legal: string;
    legalItems: { privacy: string; terms: string };
    menu: { open: string; close: string; title: string };
  };
  cta: {
    /** Primary App Store button label. */
    appStore: string;
  };
  hero: {
    eyebrow: string;
    headline: { line1: string; line2: string };
    sub: string;
    ctaNote: string;
    stats: { value: string; label: string }[];
  };
  whyExists: {
    eyebrow: string;
    heading: Emphasis;
    body: string;
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    lead: string;
    steps: { n: string; title: string; copy: string }[];
  };
  features: {
    eyebrow: string;
    heading: Emphasis;
    items: { kicker: string; title: string; body: string }[];
  };
  comparison: {
    eyebrow: string;
    heading: Emphasis;
    lead: Emphasis;
    capability: string;
    youBadge: string;
    rowLabels: Record<ComparisonRowId, string>;
  };
  midCTA: {
    heading: Emphasis;
  };
  valueCards: {
    eyebrow: string;
    heading: string;
    items: { title: string; copy: string }[];
  };
  socialProof: {
    eyebrow: string;
    heading: string;
    lead: string;
    testimonials: { quote: string; name: string; role: string }[];
  };
  pricing: {
    eyebrow: string;
    heading: string;
    lead: string;
    included: string[];
    price: string;
    priceNote: string;
    cardNote: string;
    platformNote: string;
  };
  faq: {
    eyebrow: string;
    heading: string;
    items: { q: string; a: string }[];
  };
  finalCTA: {
    heading: Emphasis;
    lead: string;
    badges: string[];
  };
  footer: {
    tagline: string;
    columns: { product: string; legal: string; contact: string };
    links: { home: string; product: string; features: string; pricing: string; help: string };
    legalLinks: { privacy: string; terms: string };
    /** Follows "© {year} {name}." on the bottom bar. */
    rights: string;
  };
};
