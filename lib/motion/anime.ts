import { cubicBezier } from "animejs/easings/cubic-bezier";

/**
 * The site's shared curve, in the form anime.js v4 wants.
 *
 * It must be the *function*, not the string `"cubicBezier(0.16, 1, 0.3, 1)"` —
 * v4.5 removed the string syntax. Passing a string logs a console warning and
 * silently falls back to linear, which reads as subtly wrong rather than broken.
 *
 * Same curve as `EASE_OUT_EXPO` (framer) and Tailwind's `ease-out-expo`.
 */
export const ANIME_EASE = cubicBezier(0.16, 1, 0.3, 1);
