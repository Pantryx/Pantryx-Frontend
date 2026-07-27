/** Marks every word span produced by `splitWords`. */
export const WORD_CLASS = "anime-word";

const isWhitespace = (value: string) => /^\s+$/.test(value);

function splitTextNode(node: Text, words: HTMLElement[]) {
  // Capturing split keeps the whitespace runs as their own entries.
  const parts = node.data.split(/(\s+)/).filter((part) => part.length > 0);
  if (parts.length === 0) return;

  const fragment = document.createDocumentFragment();

  for (const part of parts) {
    if (isWhitespace(part)) {
      // Left as a plain text node, so the heading's textContent is unchanged and
      // the browser can still break lines here.
      fragment.appendChild(document.createTextNode(part));
      continue;
    }

    const span = document.createElement("span");
    span.className = WORD_CLASS;
    // Required for transforms to apply to inline content.
    span.style.display = "inline-block";
    span.textContent = part;
    words.push(span);
    fragment.appendChild(span);
  }

  node.parentNode?.replaceChild(fragment, node);
}

function walk(node: Node, words: HTMLElement[]) {
  // Snapshot first — splitTextNode replaces nodes as we go.
  for (const child of Array.from(node.childNodes)) {
    if (child.nodeType === Node.TEXT_NODE) {
      splitTextNode(child as Text, words);
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      walk(child, words);
    }
  }
}

/**
 * Wrap every word of an element in its own inline-block span, descending into
 * nested inline elements, and return the spans in reading order.
 *
 * anime.js ships `splitText`, but it only splits an element's own text nodes:
 * a child element is treated as one atomic "word" and wrapped whole. Every
 * display heading on this site puts a clause in `<em>`/`<span>` for the muted
 * italic treatment, so `splitText` would either leave that clause unanimated or
 * — if you split the child first and then the host — wrap the already-split
 * child again, animating it twice at once. Splitting at the text-node level
 * sidesteps that, keeps `<em>`/`<br>` exactly where they were, and preserves
 * ordinary spaces (`splitText`'s `includeSpaces` swaps them for U+00A0, which
 * quietly changes textContent).
 */
export function splitWords(el: HTMLElement): {
  words: HTMLElement[];
  revert: () => void;
} {
  const original = el.cloneNode(true);
  const words: HTMLElement[] = [];

  walk(el, words);

  return {
    words,
    revert: () => {
      el.replaceChildren(...Array.from(original.childNodes));
    },
  };
}
