import type { RecipeLanguage } from "@/lib/recipe/recipeLanguage";

export type RecipeShareCopy = {
  eyebrow: string;
  openInApp: string;
  stepsInApp: string;
  ingredients: string;
  minutes: (count: number) => string;
  servings: (count: number) => string;
  getTheApp: string;
  downloadOnAppStore: string;
  metaDescription: (minutes: number, servings: number) => string;
  previewBadge: string;
};

export const recipeShareCopy: Record<RecipeLanguage, RecipeShareCopy> = {
  en: {
    eyebrow: "Recipe on Pantryx",
    openInApp: "Open in Pantryx",
    stepsInApp: "Step-by-step cooking is waiting in the app.",
    ingredients: "Ingredients",
    minutes: (count) => `${count} min`,
    servings: (count) => `Serves ${count}`,
    getTheApp: "Don't have Pantryx yet?",
    downloadOnAppStore: "Download on the App Store",
    metaDescription: (minutes, servings) => `${minutes} min · serves ${servings}`,
    previewBadge: "Cook in Pantryx",
  },
  uk: {
    eyebrow: "Рецепт у Pantryx",
    openInApp: "Відкрити в Pantryx",
    stepsInApp: "Покрокове приготування чекає на вас у застосунку.",
    ingredients: "Інгредієнти",
    minutes: (count) => `${count} хв`,
    servings: (count) => `Порцій: ${count}`,
    getTheApp: "Ще немає Pantryx?",
    downloadOnAppStore: "Завантажити в App Store",
    metaDescription: (minutes, servings) => `${minutes} хв · порцій: ${servings}`,
    previewBadge: "Готуйте в Pantryx",
  },
};
