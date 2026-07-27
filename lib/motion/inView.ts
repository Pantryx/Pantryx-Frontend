import { REVEAL_MARGIN } from "./tokens";

/**
 * Fire `run` the first time `el` enters the viewport, then stop observing.
 *
 * Defaults to the same margin framer-motion's `Reveal` uses, which is what lets
 * an anime.js heading and its `Reveal` wrapper start on the same scroll line
 * rather than 80px apart.
 *
 * Callers are expected to put their targets in the "before" state up front, so
 * an element that is already on screen at mount — a deep link to `/#compare`,
 * say — animates in on arrival instead of appearing and then resetting.
 *
 * Returns a cleanup function.
 */
export function observeOnce(
  el: Element,
  run: () => void,
  rootMargin: string = REVEAL_MARGIN
): () => void {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      observer.disconnect();
      run();
    },
    { rootMargin }
  );

  observer.observe(el);
  return () => observer.disconnect();
}
