import type { Dictionary } from "@/lib/i18n/types";

export const en: Dictionary = {
  meta: {
    title: "Pantryx — Stop staring at the fridge. Decide dinner in 60 seconds.",
    description:
      "Pantryx scans what you already have and turns it into dishes you can cook tonight — no shopping, no guesswork.",
  },
  chrome: {
    skipToContent: "Skip to content",
    nav: { home: "Home", product: "Product", help: "Help" },
    legal: "Legal",
    legalItems: { privacy: "Privacy Policy", terms: "Terms of Use" },
    menu: { open: "Open menu", close: "Close menu", title: "Menu" },
  },
  cta: {
    appStore: "Download on the App Store",
  },
  hero: {
    eyebrow: "Now on the App Store · iOS",
    headline: {
      line1: "Stop staring at the fridge.",
      line2: "Decide dinner in 60 seconds.",
    },
    sub: "Pantryx scans what you already have and turns it into dishes you can actually cook tonight.",
    ctaNote: "Free on iPhone · no credit card · no account needed",
    stats: [
      { value: "60s", label: "from pantry to recipe" },
      { value: "2H", label: "saves per week" },
      { value: "0", label: "subscriptions" },
    ],
  },
  whyExists: {
    eyebrow: "Why this exists",
    heading: {
      text: "You don’t need more recipes.",
      em: "You need the right one.",
    },
    body: "When you already have food at home, another endless recipe catalogue doesn’t solve the problem. Pantryx matches your ingredients and preferences to recipes that are realistic to make right now.",
  },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Six steps from fridge photo to dinner on the table.",
    lead: "Every step is designed to be tappable, skippable, and under a minute.",
    steps: [
      { n: "01", title: "Scan your fridge", copy: "Point your camera. One photo." },
      {
        n: "02",
        title: "Confirm the pantry",
        copy: "Review your ingredients and make quick adjustments if needed.",
      },
      { n: "03", title: "Get dish ideas", copy: "Only meals you can actually make right now." },
      { n: "04", title: "Choose one", copy: "Pick by time, preference, or your favorites." },
      { n: "05", title: "Cook in guided mode", copy: "Follow along, step by step." },
      {
        n: "06",
        title: "Your recipe is ready",
        copy: "Rate it, save it to favorites, or share it.",
      },
    ],
  },
  features: {
    eyebrow: "Features",
    heading: {
      text: "Built around the one question:",
      em: "what can I cook with this?",
    },
    items: [
      {
        kicker: "AI scanner",
        title: "Snap once. No typing.",
        body: "The scanner identifies ingredients from a single photo and builds your pantry for you. Works on messy, half-full, real-life fridges.",
      },
      {
        kicker: "Pantry-based suggestions",
        title: "Only dishes you can actually make.",
        body: "Recipes matched to what you have — and what you like.",
      },
      {
        kicker: "Guided cook mode",
        title: "Your phone becomes a sous chef.",
        body: "Step-by-step instructions that help you follow the recipe as you cook.",
      },
      {
        kicker: "Your pantry",
        title: "Know what’s in your kitchen.",
        body: "Keep your ingredients in one place and use them as the starting point for your next meal.",
      },
    ],
  },
  comparison: {
    eyebrow: "Pantryx vs other apps",
    heading: {
      text: "Most recipe apps ask:",
      em: "what do you feel like eating?",
    },
    lead: {
      text: "Pantryx asks a better question:",
      em: "what can you actually cook right now?",
    },
    capability: "Capability",
    youBadge: "You",
    rowLabels: {
      aiScan: "AI scan of your real fridge",
      usesWhatYouHave: "Uses what you already have",
      guidedCooking: "Guided step-by-step cooking",
      matchesTaste: "Matches your taste and diet",
      free: "Free (no paywalled features)",
      noAds: "No ad clutter",
    },
  },
  midCTA: {
    heading: {
      text: "Your fridge is already full.",
      em: "Let it cook something.",
    },
  },
  valueCards: {
    eyebrow: "Why Pantryx",
    heading: "Three quiet wins, every week.",
    items: [
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
    ],
  },
  socialProof: {
    eyebrow: "Built in the open",
    heading: "What early testers are saying.",
    lead: "A few unfiltered reactions from people cooking with Pantryx.",
    testimonials: [
      {
        quote:
          "I scanned my fridge, it found a dish I’d never have thought of, and I cooked it in under 25 minutes. That’s the whole pitch.",
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
          "Half my groceries used to go bad. Pantryx basically pays for itself — which is funny, because it’s free.",
        name: "Priya S.",
        role: "Freelance designer · Berlin",
      },
      {
        quote: "It’s the first time ‘what’s for dinner?’ stopped being a daily negotiation.",
        name: "Jordan M.",
        role: "Weeknight cook · London",
      },
      {
        quote:
          "After a 12-hour shift I just want someone to tell me what to cook. Pantryx does exactly that.",
        name: "Sofia L.",
        role: "Medical resident · Toronto",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    heading: "One plan. Free.",
    lead: "Pantryx is free while we grow. Every feature, no credit card. If we add subscriptions, we’ll spell out price and what’s included before you pay.",
    included: [
      "AI fridge scanner",
      "Pantry-based dish ideas",
      "Guided cook mode",
      "Save & share recipes",
      "Dietary preferences & allergies",
      "Shopping list",
    ],
    price: "Free",
    priceNote: "today · subscriptions later",
    cardNote: "No card required · Delete your account anytime.",
    platformNote: "iPhone · iOS 18 or later",
  },
  faq: {
    eyebrow: "Questions",
    heading: "The things people ask before they join.",
    items: [
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
        a: "To identify ingredients, your photo — and nothing else — is sent to our AI provider, OpenAI. It isn’t used to train their models, uploaded photos are deleted within 24 hours, and you can delete your pantry and account any time.",
      },
      {
        q: "Does it work with my diet?",
        a: "You can set dietary preferences (vegetarian, gluten-free, allergies, etc.) and Pantryx filters suggestions to match.",
      },
      {
        q: "Do I need an account to use it?",
        a: "No — you can enter as a guest and start scanning right away. Create a free account whenever you want to save your pantry, preferences, and cooking history and sync them across devices. No credit card required.",
      },
    ],
  },
  finalCTA: {
    heading: {
      text: "Tonight’s dinner is",
      em: "one photo away.",
    },
    lead: "No guesswork. No subscription. Just open the fridge.",
    badges: ["Free", "No credit card", "Private by default"],
  },
  footer: {
    tagline: "You don’t need more recipes. You need the right one.",
    columns: { product: "Product", legal: "Legal", contact: "Contact" },
    links: {
      home: "Home",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      help: "Help",
    },
    legalLinks: { privacy: "Privacy Policy", terms: "Terms of Use" },
    rights: "All rights reserved.",
  },
};
