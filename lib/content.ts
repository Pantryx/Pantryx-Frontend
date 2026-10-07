/**
 * The structure of the site's content: ids, display order, links, images and
 * other facts that don't change between languages. The words themselves live
 * in the dictionaries (lib/i18n/dictionaries), keyed by these ids — so every
 * language shows the same items in the same order, and TypeScript rejects a
 * dictionary that is missing one.
 */

export const navLinks = {
  primary: [
    { id: "home", href: "/" },
    { id: "product", href: "/product" },
    { id: "help", href: "/help" },
  ],
  legal: [
    { id: "privacy", href: "/privacy" },
    { id: "terms", href: "/terms" },
  ],
} as const;

export type NavId = (typeof navLinks)[keyof typeof navLinks][number]["id"];

export const footerProductLinks = [
  { id: "home", href: "/" },
  { id: "product", href: "/product" },
  { id: "features", href: "/#features" },
  { id: "pricing", href: "/#pricing" },
  { id: "help", href: "/help" },
] as const;

export type FooterProductLinkId = (typeof footerProductLinks)[number]["id"];

export const heroStatIds = ["speed", "timeSaved", "subscriptions"] as const;
export type HeroStatId = (typeof heroStatIds)[number];

export const howItWorksStepIds = ["scan", "confirm", "ideas", "choose", "cook", "ready"] as const;
export type HowItWorksStepId = (typeof howItWorksStepIds)[number];

export const featureIds = ["scanner", "suggestions", "cookMode", "pantry"] as const;
export type FeatureId = (typeof featureIds)[number];

export const comparisonApps = [
  { key: "pantryx", label: "Pantryx", highlight: true },
  { key: "whisk", label: "Whisk", highlight: false },
  { key: "mealime", label: "Mealime", highlight: false },
  { key: "supercook", label: "SuperCook", highlight: false },
  { key: "yummly", label: "Yummly", highlight: false },
] as const;

export type ComparisonAppKey = (typeof comparisonApps)[number]["key"];

export const comparisonRows = [
  { id: "fridgeScan", pantryx: true, whisk: false, mealime: false, supercook: false, yummly: false },
  { id: "usesWhatYouHave", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { id: "guidedCooking", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
  { id: "tasteAndDiet", pantryx: true, whisk: true, mealime: true, supercook: false, yummly: true },
  { id: "free", pantryx: true, whisk: false, mealime: false, supercook: true, yummly: false },
  { id: "noAds", pantryx: true, whisk: false, mealime: true, supercook: false, yummly: false },
] as const satisfies readonly ({ id: string } & Record<ComparisonAppKey, boolean>)[];

export type ComparisonRowId = (typeof comparisonRows)[number]["id"];

export const valueCardIds = ["lessWaste", "noDecisionFatigue", "somethingDifferent"] as const;
export type ValueCardId = (typeof valueCardIds)[number];

// PLACEHOLDER CONTENT — the quotes in the English dictionary are stand-ins to
// be replaced with real, permissioned quotes from early testers. Keep the
// first-name-initial format unless you have explicit consent for full names.
export const testimonialIds = ["maya", "tom", "priya", "jordan", "sofia"] as const;
export type TestimonialId = (typeof testimonialIds)[number];

export const pricingItemIds = ["scanner", "dishIdeas", "cookMode", "saveShare", "diet", "shoppingList"] as const;
export type PricingItemId = (typeof pricingItemIds)[number];

export const faqIds = ["recognition", "missedIngredient", "privacy", "diet", "account"] as const;
export type FaqId = (typeof faqIds)[number];

export const finalCtaChipIds = ["free", "noCard", "private"] as const;
export type FinalCtaChipId = (typeof finalCtaChipIds)[number];

export const productSteps = [
  { id: "scan", src: "/product/01-camera.webp" },
  { id: "processing", src: "/product/02-processing.webp" },
  { id: "results", src: "/product/03-results.webp" },
  { id: "choose", src: "/product/04-recipe.webp" },
  { id: "cook", src: "/product/05-cooking.webp" },
  { id: "done", src: "/product/06-done.webp" },
] as const;

export type ProductStepId = (typeof productSteps)[number]["id"];

export const mealPlannerHighlightIds = ["weekAtAGlance", "builtOnPantry", "addFromRecipe"] as const;
export type MealPlannerHighlightId = (typeof mealPlannerHighlightIds)[number];

/** Help-centre groups in display order, each with its questions in order. */
export const helpGroups = {
  gettingStarted: ["requirements", "withoutAccount", "guestData", "download", "android", "scanDuration"],
  scanning: ["scannerMisses", "messyFridge"],
  cookingMode: ["guidedMode"],
  videoImport: ["videoToRecipe", "platforms", "importLimit"],
  recipesPreferences: ["dietAllergies", "saveShare"],
  pantryShopping: ["whatIsPantry", "editPantry", "whatIsShoppingList", "shoppingListItems"],
  accountData: ["sync", "deleteData", "aiTraining"],
  troubleshooting: ["notRecognizing", "somethingElse"],
} as const;

export type HelpGroupId = keyof typeof helpGroups;
export type HelpQuestionId<G extends HelpGroupId> = (typeof helpGroups)[G][number];
export const helpGroupIds = Object.keys(helpGroups) as HelpGroupId[];
