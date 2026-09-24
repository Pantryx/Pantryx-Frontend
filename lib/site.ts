export const site = {
  name: "Pantryx",
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

export const nav = {
  primary: [
    { href: "/", label: "Home" },
    { href: "/product", label: "Product" },
    { href: "/help", label: "Help" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
  ],
} as const;

export const howItWorks = [
  { n: "01", title: "Scan your fridge", copy: "Point your camera. One photo." },
  { n: "02", title: "Confirm the pantry", copy: "Review your ingredients and make quick adjustments if needed." },
  { n: "03", title: "Get dish ideas", copy: "Only meals you can actually make right now." },
  { n: "04", title: "Choose one", copy: "Pick by time, preference, or your favorites." },
  { n: "05", title: "Cook in guided mode", copy: "Follow along, step by step." },
  { n: "06", title: "Your recipe is ready", copy: "Rate it, save it to favorites, or share it." },
] as const;

export const features = [
  {
    kicker: "AI scanner",
    title: "Snap once. No typing.",
    body:
      "The scanner identifies ingredients from a single photo and builds your pantry for you. Works on messy, half-full, real-life fridges.",
  },
  {
    kicker: "Pantry-based suggestions",
    title: "Only dishes you can actually make.",
    body:
      "Recipes matched to what you have — and what you like.",
  },
  {
    kicker: "Guided cook mode",
    title: "Your phone becomes a sous chef.",
    body:
      "Step-by-step instructions that help you follow the recipe as you cook.",
  },
  {
    kicker: "Your pantry",
    title: "Know what's in your kitchen.",
    body:
      "Keep your ingredients in one place and use them as the starting point for your next meal.",
  },
] as const;

export const comparisonRows = [
  { label: "AI scan of your real fridge", pantryx: true, whisk: false, mealime: false, supercook: false, yummly: false },
  { label: "Uses what you already have", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { label: "Guided step-by-step cooking", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
  { label: "Matches your taste and diet", pantryx: true, whisk: true, mealime: true, supercook: false, yummly: true },
  { label: "Free (no paywalled features)", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { label: "No ad clutter", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
] as const;

export const comparisonApps = ["Pantryx", "Whisk", "Mealime", "SuperCook", "Yummly"] as const;

export const valueCards = [
  {
    title: "Waste less food",
    copy: "Households throw out roughly 30% of the groceries they buy. Pantryx helps you cook them before they go bad.",
  },
  {
    title: "Skip decision fatigue",
    copy: "No more 20-minute fridge stares. Get three good ideas in under a minute.",
  },
  {
    title: "Cook something different",
    copy: "Discover recipes that match what you have and what you like, from familiar favorites to something new.",
  },
] as const;

// PLACEHOLDER CONTENT — replace with real, permissioned quotes from
// early testers. Keep first-name-initial format
// unless you have explicit consent to show full names.
export const testimonials = [
  {
    quote:
      "I scanned my fridge, it found a dish I'd never have thought of, and I cooked it in under 25 minutes. That's the whole pitch.",
    name: "Maya R.",
    role: "Weeknight cook · Brooklyn, NY",
  },
  {
    quote:
      "With two kids underfoot, I just scan the fridge and Pantryx hands me something I can actually make tonight — no more staring at the shelves.",
    name: "Tom K.",
    role: "Dad of two · Austin, TX",
  },
  {
    quote:
      "Half my groceries used to go bad. Pantryx basically pays for itself — which is funny, because it's free.",
    name: "Priya S.",
    role: "Freelance designer · Berlin",
  },
  {
    quote:
      "It's the first time 'what's for dinner?' stopped being a daily negotiation.",
    name: "Jordan M.",
    role: "Weeknight cook · London",
  },
  {
    quote:
      "After a 12-hour shift I just want someone to tell me what to cook. Pantryx does exactly that.",
    name: "Sofia L.",
    role: "Medical resident · Toronto",
  },
] as const;

export const faq = [
  {
    q: "Does it really recognize my fridge?",
    a: "Yes. The scanner handles real, messy, half-full fridges — not just staged ones. You always get a chance to fix anything it misreads before it suggests dishes.",
  },
  {
    q: "What if it misses an ingredient?",
    a: "Tap to add or remove anything in the confirm step. Your pantry is always under your control.",
  },
  {
    q: "Is my data private?",
    a: "To identify ingredients, your photo — and nothing else — is sent to our AI provider, OpenAI. It isn't used to train their models, uploaded photos are deleted within 24 hours, and you can delete your pantry and account any time.",
  },
  {
    q: "Does it work with my diet?",
    a: "You can set dietary preferences (vegetarian, gluten-free, allergies, etc.) and Pantryx filters suggestions to match.",
  },
  {
    q: "Do I need an account to use it?",
    a: "No — you can enter as a guest and start scanning right away. Create a free account whenever you want to save your pantry, preferences, and cooking history and sync them across devices. No credit card required.",
  },
] as const;
