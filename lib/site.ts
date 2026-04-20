export const site = {
  name: "Pantryx",
  tagline: "Stop staring at the fridge. Decide dinner in 60 seconds.",
  description:
    "Pantryx scans what you already have and turns it into dishes you can cook tonight — no shopping, no guesswork.",
  appStoreUrl: "#", // TODO: replace with real App Store URL
  contactEmail: "hello@pantryx.app", // TODO: replace with real support address
  url: "https://pantryx.app",
} as const;

export const nav = {
  primary: [
    { href: "/", label: "Home" },
    { href: "/help", label: "Help" },
  ],
  legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
} as const;

export const howItWorks = [
  { n: "01", title: "Scan your fridge", copy: "Point your camera. One photo." },
  { n: "02", title: "Confirm the pantry", copy: "Tap to fix anything the AI got wrong." },
  { n: "03", title: "Get dish ideas", copy: "Only meals you can actually make right now." },
  { n: "04", title: "Choose one", copy: "Pick by time, mood, or what's going bad first." },
  { n: "05", title: "Cook in guided mode", copy: "Hands-free, step by step." },
  { n: "06", title: "Ask while cooking", copy: "Timers, substitutions, whatever you need." },
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
      "No more recipes that need three things you don't have. Pantryx ranks ideas by what's in your kitchen right now.",
  },
  {
    kicker: "Guided cook mode",
    title: "Your phone becomes a sous chef.",
    body:
      "Step-by-step instructions, large type, voice-friendly. Designed to be used while your hands are covered in oil.",
  },
  {
    kicker: "Cooking chat",
    title: "Ask anything, mid-recipe.",
    body:
      "Out of garlic? Need a substitution? Overcooked the pasta? Pantryx answers in context of what you're making.",
  },
] as const;

export const comparisonRows = [
  { label: "AI scan of your real fridge", pantryx: true, whisk: false, mealime: false, supercook: false, yummly: false },
  { label: "Uses what you already have", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { label: "Guided step-by-step cooking", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
  { label: "Real-time cooking chat", pantryx: true, whisk: false, mealime: false, supercook: false, yummly: false },
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
    title: "Cook with confidence",
    copy: "Guided mode and a live cooking chat mean you're never stuck, even with unfamiliar ingredients.",
  },
] as const;

// PLACEHOLDER CONTENT — replace with real, permissioned quotes from
// private-beta testers before public launch. Keep first-name-initial format
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
      "Guided mode is the first cooking app my hands-full, kid-on-hip self actually sticks with.",
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
    a: "Photos are processed to identify ingredients and are not used to train public models. You can delete your pantry and account any time.",
  },
  {
    q: "Does it work with my diet?",
    a: "You can set dietary preferences (vegetarian, gluten-free, allergies, etc.) and Pantryx filters suggestions to match.",
  },
  {
    q: "Will it stay free?",
    a: "During MVP, every feature is free. If we ever introduce a paid tier, core scanning and dish suggestions will stay free.",
  },
  {
    q: "Do I need an account to use it?",
    a: "Yes — you'll create a free account the first time you open the app. It takes a few seconds, no credit card required, and it's what lets your pantry, preferences, and cooking history sync across devices.",
  },
] as const;
