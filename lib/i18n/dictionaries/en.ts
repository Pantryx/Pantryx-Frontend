import type {
  ComparisonRowId,
  FaqId,
  FeatureId,
  FinalCtaChipId,
  FooterProductLinkId,
  HelpGroupId,
  HelpQuestionId,
  HeroStatId,
  HowItWorksStepId,
  MealPlannerHighlightId,
  NavId,
  PricingItemId,
  ProductStepId,
  TestimonialId,
  ValueCardId,
} from "@/lib/content";

/*
 * The English dictionary is the source of truth for the shape of every other
 * language: `Dictionary` is derived from it, and each translation is declared
 * `satisfies Dictionary`, so a missing or extra key fails the build.
 *
 * - Placeholders are written `{name}` and filled with `fmt()`.
 * - Headings with an emphasised clause are split into `lead` and `accent`; the
 *   markup stays in the components.
 * - The `chrome` namespace is sent to the browser, so it holds plain strings
 *   only. Functions are allowed in namespaces used on the server.
 */

export type Qa = { q: string; a: string };

/** A sentence whose second part is set in muted italics. */
export type Accented = { lead: string; accent: string };

type HelpGroupsCopy = {
  [G in HelpGroupId]: { title: string; questions: Record<HelpQuestionId<G>, Qa> };
};

export type SocialProofCopy = {
  eyebrow: string;
  heading: string;
  lead: string;
  regionLabel: string;
  previous: string;
  next: string;
  select: string;
  /** `{index}` of `{total}`. */
  show: string;
  quoteOpen: string;
  quoteClose: string;
  testimonials: Record<TestimonialId, { quote: string; name: string; role: string }>;
};

const socialProof: SocialProofCopy = {
  eyebrow: "Built in the open",
  heading: "What early testers are saying.",
  lead: "A few unfiltered reactions from people cooking with Pantryx.",
  regionLabel: "What early testers are saying",
  previous: "Previous testimonial",
  next: "Next testimonial",
  select: "Select testimonial",
  show: "Show testimonial {index} of {total}",
  quoteOpen: "“",
  quoteClose: "”",
  testimonials: {
    maya: {
      quote:
        "I scanned my fridge, it found a dish I'd never have thought of, and I cooked it in under 25 minutes. That's the whole pitch.",
      name: "Maya R.",
      role: "Weeknight cook · Brooklyn, NY",
    },
    tom: {
      quote:
        "With two kids underfoot, I just scan the fridge and Pantryx hands me something I can actually make tonight — no more staring at the shelves.",
      name: "Tom K.",
      role: "Dad of two · Austin, TX",
    },
    priya: {
      quote: "Half my groceries used to go bad. Pantryx basically pays for itself — which is funny, because it's free.",
      name: "Priya S.",
      role: "Freelance designer · Berlin",
    },
    jordan: {
      quote: "It's the first time 'what's for dinner?' stopped being a daily negotiation.",
      name: "Jordan M.",
      role: "Weeknight cook · London",
    },
    sofia: {
      quote: "After a 12-hour shift I just want someone to tell me what to cook. Pantryx does exactly that.",
      name: "Sofia L.",
      role: "Medical resident · Toronto",
    },
  },
};

export const en = {
  meta: {
    tagline: "Stop staring at the fridge. Decide dinner in 60 seconds.",
    description:
      "Pantryx scans what you already have and turns it into dishes you can cook tonight — no shopping, no guesswork.",
  },

  chrome: {
    skipToContent: "Skip to content",
    homeLabel: "Pantryx home",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menu: "Menu",
    legal: "Legal",
    nav: {
      home: "Home",
      product: "Product",
      help: "Help",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
    } satisfies Record<NavId, string>,
    mobileMenuNote: "iPhone · Free · Private by default",
    theme: {
      /** `{label}` is one of the three below. */
      button: "Theme: {label}. Click to change.",
      dark: "Dark mode",
      light: "Light mode",
      system: "System theme",
    },
    language: {
      /** Accessible name of the switcher: "Language: English". */
      label: "Language",
      /** Heading above the choices in the mobile menu. */
      heading: "Language",
    },
    appStore: {
      label: "Download on the App Store",
      ariaLabel: "Download Pantryx on the App Store",
    },
    notFound: {
      eyebrow: "404",
      title: "This page doesn't exist",
      body: "The link may be broken, or the page may have moved.",
      cta: "Back to Pantryx",
    },
    recipeNotFound: {
      eyebrow: "Pantryx",
      title: "This recipe isn't available",
      body: "The link may be incomplete, or the recipe was private to the person who shared it.",
      cta: "Explore Pantryx",
    },
  },

  footer: {
    tagline: "You don't need more recipes. You need the right one.",
    productTitle: "Product",
    legalTitle: "Legal",
    contactTitle: "Contact",
    productLinks: {
      home: "Home",
      product: "Product",
      features: "Features",
      pricing: "Pricing",
      help: "Help",
    } satisfies Record<FooterProductLinkId, string>,
    /** `{year}`, `{name}`. */
    rights: "© {year} {name}. All rights reserved.",
    builtInTheOpen: "Built in the open · iOS",
    /** `{name}` on `{network}`. */
    socialLabel: "{name} on {network}",
  },

  home: {
    hero: {
      eyebrow: "Now on the App Store · iOS",
      headline: {
        lead: "Stop staring at the fridge.",
        accent: "Decide dinner in 60 seconds.",
      } satisfies Accented,
      lead: "Pantryx scans what you already have and turns it into dishes you can actually cook tonight.",
      smallPrint: "Free on iPhone · no credit card · no account needed",
      /** `value` must start with its number: the counter animates it. */
      stats: {
        speed: { value: "60s", label: "from pantry to recipe" },
        timeSaved: { value: "2H", label: "saves per week" },
        subscriptions: { value: "0", label: "subscriptions" },
      } satisfies Record<HeroStatId, { value: string; label: string }>,
    },

    whyExists: {
      eyebrow: "Why this exists",
      heading: { lead: "You don't need more recipes.", accent: "You need the right one." } satisfies Accented,
      body:
        "When you already have food at home, another endless recipe catalogue doesn't solve the problem. Pantryx matches your ingredients and preferences to recipes that are realistic to make right now.",
    },

    howItWorks: {
      eyebrow: "How it works",
      heading: "Six steps from fridge photo to dinner on the table.",
      lead: "Every step is designed to be tappable, skippable, and under a minute.",
      steps: {
        scan: { title: "Scan your fridge", copy: "Point your camera. One photo." },
        confirm: { title: "Confirm the pantry", copy: "Review your ingredients and make quick adjustments if needed." },
        ideas: { title: "Get dish ideas", copy: "Only meals you can actually make right now." },
        choose: { title: "Choose one", copy: "Pick by time, preference, or your favorites." },
        cook: { title: "Cook in guided mode", copy: "Follow along, step by step." },
        ready: { title: "Your recipe is ready", copy: "Rate it, save it to favorites, or share it." },
      } satisfies Record<HowItWorksStepId, { title: string; copy: string }>,
    },

    features: {
      eyebrow: "Features",
      heading: {
        lead: "Built around the one question:",
        accent: "what can I cook with this?",
      } satisfies Accented,
      items: {
        scanner: {
          kicker: "AI scanner",
          title: "Snap once. No typing.",
          body:
            "The scanner identifies ingredients from a single photo and builds your pantry for you. Works on messy, half-full, real-life fridges.",
        },
        suggestions: {
          kicker: "Pantry-based suggestions",
          title: "Only dishes you can actually make.",
          body: "Recipes matched to what you have — and what you like.",
        },
        cookMode: {
          kicker: "Guided cook mode",
          title: "Your phone becomes a sous chef.",
          body: "Step-by-step instructions that help you follow the recipe as you cook.",
        },
        pantry: {
          kicker: "Your pantry",
          title: "Know what's in your kitchen.",
          body: "Keep your ingredients in one place and use them as the starting point for your next meal.",
        },
      } satisfies Record<FeatureId, { kicker: string; title: string; body: string }>,
    },

    comparison: {
      eyebrow: "Pantryx vs other apps",
      heading: {
        lead: "Most recipe apps ask:",
        accent: "what do you feel like eating?",
      } satisfies Accented,
      lead: {
        lead: "Pantryx asks a better question:",
        accent: "what can you actually cook right now?",
      } satisfies Accented,
      capability: "Capability",
      youBadge: "You",
      rows: {
        fridgeScan: "AI scan of your real fridge",
        usesWhatYouHave: "Uses what you already have",
        guidedCooking: "Guided step-by-step cooking",
        tasteAndDiet: "Matches your taste and diet",
        free: "Free (no paywalled features)",
        noAds: "No ad clutter",
      } satisfies Record<ComparisonRowId, string>,
    },

    midCta: {
      heading: { lead: "Your fridge is already full.", accent: "Let it cook something." } satisfies Accented,
    },

    valueCards: {
      eyebrow: "Why Pantryx",
      heading: "Three quiet wins, every week.",
      cards: {
        lessWaste: {
          title: "Waste less food",
          copy: "Households throw out roughly 30% of the groceries they buy. Pantryx helps you cook them before they go bad.",
        },
        noDecisionFatigue: {
          title: "Skip decision fatigue",
          copy: "No more 20-minute fridge stares. Get three good ideas in under a minute.",
        },
        somethingDifferent: {
          title: "Cook something different",
          copy: "Discover recipes that match what you have and what you like, from familiar favorites to something new.",
        },
      } satisfies Record<ValueCardId, { title: string; copy: string }>,
    },

    /** `null` hides the section for a language. */
    socialProof: socialProof as SocialProofCopy | null,

    pricing: {
      eyebrow: "Pricing",
      heading: "One plan. Free.",
      lead:
        "Pantryx is free while we grow. Every feature, no credit card. If we add subscriptions, we'll spell out price and what's included before you pay.",
      price: "Free",
      priceNote: "today · subscriptions later",
      terms: "No card required · Delete your account anytime.",
      included: {
        scanner: "AI fridge scanner",
        dishIdeas: "Pantry-based dish ideas",
        cookMode: "Guided cook mode",
        saveShare: "Save & share recipes",
        diet: "Dietary preferences & allergies",
        shoppingList: "Shopping list",
      } satisfies Record<PricingItemId, string>,
      requirements: "iPhone · iOS 26.2 or later",
    },

    faq: {
      eyebrow: "Questions",
      heading: "The things people ask before they join.",
      items: {
        recognition: {
          q: "Does it really recognize my fridge?",
          a: "Yes. The scanner handles real, messy, half-full fridges — not just staged ones. You always get a chance to fix anything it misreads before it suggests dishes.",
        },
        missedIngredient: {
          q: "What if it misses an ingredient?",
          a: "Tap to add or remove anything in the confirm step. Your pantry is always under your control.",
        },
        privacy: {
          q: "Is my data private?",
          a: "To identify ingredients, your photo — and nothing else — is sent to our AI provider, OpenAI. It isn't used to train their models, uploaded photos are deleted within 24 hours, and you can delete your pantry and account any time.",
        },
        diet: {
          q: "Does it work with my diet?",
          a: "You can set dietary preferences (vegetarian, gluten-free, allergies, etc.) and Pantryx filters suggestions to match.",
        },
        account: {
          q: "Do I need an account to use it?",
          a: "No — you can enter as a guest and start scanning right away. Create a free account whenever you want to save your pantry, preferences, and cooking history and sync them across devices. No credit card required.",
        },
      } satisfies Record<FaqId, Qa>,
    },

    finalCta: {
      heading: { lead: "Tonight's dinner is", accent: "one photo away." } satisfies Accented,
      lead: "No guesswork. No subscription. Just open the fridge.",
      chips: {
        free: "Free",
        noCard: "No credit card",
        private: "Private by default",
      } satisfies Record<FinalCtaChipId, string>,
    },
  },

  product: {
    meta: {
      title: "Product",
      description: "See how Pantryx works — from a photo of your fridge to dinner, in six steps.",
    },
    eyebrow: "The scan flow",
    /** One sentence per line; the heading is sized so the longest fits the column. */
    heroLines: ["Your kitchen.", "Your ingredients.", "Your next meal."],
    lead:
      "Pantryx helps you figure out what to cook from the food you already have. It matches your ingredients and preferences with recipes you'll actually want to make, then guides you from your first ingredient to the finished meal.",
    smallPrint: "Six steps · under a minute · free on iPhone",
    heroAlts: {
      recipe: "The recipe detail screen",
      cooking: "The guided cooking screen",
      done: "The finished-dish screen",
    },
    steps: {
      scan: {
        kicker: "Scan",
        title: "Start with a photo",
        copy: "Open the scanner and capture what you have.",
        alt: "Pantryx camera framing a fridge shelf",
      },
      processing: {
        kicker: "Processing",
        title: "Pantryx reads it",
        copy: "And identifies what's in the photo to build your pantry in a few seconds.",
        alt: "Pantryx identifying ingredients from the photo",
      },
      results: {
        kicker: "Results",
        title: "Recipes you can cook",
        copy: "Get recipes based on your ingredients and preferences, then choose the one you want to make.",
        alt: "A list of recipes matched to your scan",
      },
      choose: {
        kicker: "Choose",
        title: "Take a closer look",
        copy:
          "Open a recipe to see the full details, adjust the servings, review the ingredients and steps, and add any missing ingredients to your shopping list before you cook.",
        alt: "The Avocado Salad recipe detail screen",
      },
      cook: {
        kicker: "Cook",
        title: "Cook it step by step",
        copy: "Guided steps walk you through the whole recipe, at your own pace, until it's ready.",
        alt: "Guided cooking, one step at a time",
      },
      done: {
        kicker: "Done",
        title: "Dinner is ready",
        copy: "Rate it, save it to favorites, or share it — then cook it again in one tap.",
        alt: "The finished dish with rate, save and share",
      },
    } satisfies Record<ProductStepId, { kicker: string; title: string; copy: string; alt: string }>,
  },

  mealPlanner: {
    meta: { title: "Meal Planner" },
    eyebrow: "Meal Planner",
    title: "What's for Dinner? Sorted.",
    description: "Plan the week around what's already in your fridge with the Pantryx Meal Planner.",
    highlights: {
      weekAtAGlance: {
        title: "Your week at a glance",
        body: "Breakfast, lunch, and dinner for every day, up to two weeks ahead.",
      },
      builtOnPantry: {
        title: "Built on your pantry",
        body: "Plan around the ingredients you already have, so less goes to waste.",
      },
      addFromRecipe: {
        title: "Add from any recipe",
        body: "Drop a recipe into any meal slot straight from its page in one tap.",
      },
    } satisfies Record<MealPlannerHighlightId, { title: string; body: string }>,
  },

  help: {
    meta: {
      title: "Help & FAQ",
      description: "Answers to common questions about Pantryx.",
    },
    eyebrow: "Help center",
    title: "How can we help?",
    lead: "Quick answers for the questions we get most. Still stuck? Email us — we read every message.",
    groups: {
      gettingStarted: {
        title: "Getting started",
        questions: {
          requirements: {
            q: "What do I need to use Pantryx?",
            a: "An iPhone running iOS 26.2 or later. You can start straight away as a guest — no account required — or create a free Pantryx account to save your pantry and sync across devices. No credit card required.",
          },
          withoutAccount: {
            q: "Can I use Pantryx without an account?",
            a: "Yes. You can enter as a guest and start scanning and cooking right away. Create a free account whenever you want to save your pantry, preferences, and cooking history so they stay with you.",
          },
          guestData: {
            q: "If I start as a guest, do I keep my data when I create an account?",
            a: "Yes. When you create a free account, the pantry and preferences from your guest session carry over so you don't have to start from scratch.",
          },
          download: {
            q: "Where can I download Pantryx?",
            a: 'Pantryx is free on the App Store for iPhone. Search for "Pantryx" or use any Download button on this site.',
          },
          android: {
            q: "Is there an Android version?",
            a: "Not yet — Pantryx is iOS-only for now.",
          },
          scanDuration: {
            q: "How long does a scan take?",
            a: "Around 10 seconds from opening the camera to seeing your detected pantry.",
          },
        },
      },
      scanning: {
        title: "Scanning",
        questions: {
          scannerMisses: {
            q: "What if the scanner misses something?",
            a: "After the scan you'll see a confirm screen. Tap to add, remove, or rename anything before you get dish ideas.",
          },
          messyFridge: {
            q: "Does it work with a messy fridge?",
            a: "Yes — that's explicitly what it's built for. You don't need to arrange anything.",
          },
        },
      },
      cookingMode: {
        title: "Cooking mode",
        questions: {
          guidedMode: {
            q: "Is there a guided cooking mode?",
            a: "Yes. Guided cook mode walks you through the recipe one step at a time with large, easy-to-read type, so it's simple to follow along while you cook.",
          },
        },
      },
      videoImport: {
        title: "Import from video",
        questions: {
          videoToRecipe: {
            q: "Can I turn a recipe video into a recipe?",
            a: "Yes. Paste a link to a cooking video and Pantryx pulls out the ingredients and steps so you can cook it in the app.",
          },
          platforms: {
            q: "Which platforms are supported?",
            a: "TikTok, Instagram Reels, and YouTube videos.",
          },
          importLimit: {
            q: "Is there a limit on how many videos I can import?",
            a: "Yes — you can import up to 10 videos per day and 30 per week. The counters reset automatically, so you're back to a full allowance the next day and the next week.",
          },
        },
      },
      recipesPreferences: {
        title: "Recipes & preferences",
        questions: {
          dietAllergies: {
            q: "Can I set dietary preferences or allergies?",
            a: "Yes. Set preferences like vegetarian, gluten-free, or specific allergies, and Pantryx filters dish suggestions to match.",
          },
          saveShare: {
            q: "Can I save or share recipes?",
            a: "Yes. Rate a recipe, save it to your favorites, or share it with a link so others can open it too.",
          },
        },
      },
      pantryShopping: {
        title: "Pantry & shopping list",
        questions: {
          whatIsPantry: {
            q: "What is the pantry?",
            a: "Your pantry is the running list of ingredients you have at home. Pantryx builds it automatically from your scans, and it's what your dish suggestions are matched against — so the recipes you see are ones you can actually make right now.",
          },
          editPantry: {
            q: "Can I edit my pantry manually?",
            a: "Yes. Add, rename, or remove items in your pantry any time — you don't have to scan. It stays fully under your control.",
          },
          whatIsShoppingList: {
            q: "What is the shopping list?",
            a: "The shopping list keeps track of the ingredients you still need to buy. When a recipe calls for something that isn't in your pantry, you can add the missing items to your shopping list before you cook.",
          },
          shoppingListItems: {
            q: "How do items get onto my shopping list?",
            a: "Add the missing ingredients from a recipe in one tap, or add anything manually. As you restock, move items into your pantry so they're ready for your next set of suggestions.",
          },
        },
      },
      accountData: {
        title: "Account & data",
        questions: {
          sync: {
            q: "Does my pantry sync across devices?",
            a: "Yes — with a free account, your pantry, preferences, and cooking history sync so they're available wherever you sign in.",
          },
          deleteData: {
            q: "How do I delete my data?",
            a: "Settings → Account → Delete account. Your pantry, history, and photos are removed.",
          },
          aiTraining: {
            q: "Do you train AI models on my photos?",
            a: "No. Photos are used to identify ingredients for your pantry. See the Privacy Policy for specifics.",
          },
        },
      },
      troubleshooting: {
        title: "Troubleshooting",
        questions: {
          notRecognizing: {
            q: "The scanner isn't recognizing my items.",
            a: "Try better lighting and open the fridge fully. If it still struggles, add items manually — and please email us so we can improve detection.",
          },
          somethingElse: {
            q: "Something else?",
            a: "Reach out — we actually read every message.",
          },
        },
      },
    } satisfies HelpGroupsCopy,
    stillStuck: {
      title: "Still stuck?",
      body: "We reply within a day or two.",
    },
  },

  legal: {
    eyebrow: "Legal",
    onThisPage: "On this page",
    /** `{date}`. */
    lastUpdated: "Last updated: {date}",
    privacy: {
      title: "Privacy Policy",
      description: "How Pantryx collects, uses, and protects your data.",
      intro:
        "Operated by Volodymyr Mendyk. This policy explains how we collect, use, store, share, and protect personal data when you use Pantryx, including your rights under the GDPR and other applicable laws.",
    },
    terms: {
      title: "Terms of Use",
      description: "The terms that govern your use of Pantryx.",
      intro:
        "Operated by Volodymyr Mendyk. These Terms of Use govern your use of the Pantryx mobile application and related services.",
    },
    /** Shown above a translated policy; `null` for the original language. */
    translationNotice: null as { text: string; link: string } | null,
  },

  /** Shared recipe pages and their link-preview image. */
  recipe: {
    eyebrow: "Recipe on Pantryx",
    openInApp: "Open in Pantryx",
    stepsInApp: "Step-by-step cooking is waiting in the app.",
    ingredients: "Ingredients",
    minutes: (count: number) => `${count} min`,
    servings: (count: number) => `Serves ${count}`,
    getTheApp: "Don't have Pantryx yet?",
    downloadOnAppStore: "Download on the App Store",
    metaDescription: (minutes: number, servings: number) => `${minutes} min · serves ${servings}`,
    previewBadge: "Cook in Pantryx",
  },

  og: {
    kicker: "AI FRIDGE SCANNER",
    headline: "Decide dinner in 60 seconds.",
    subline: "Snap your fridge. Cook what you already have — tonight.",
    cta: "Free on the App Store",
    /** Headline size in px; tuned so the headline fits its 470px column. */
    headlineSize: 88,
  },
};

export type Dictionary = typeof en;
export type ChromeMessages = Dictionary["chrome"];
