"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Open state for a navbar dropdown. The dropdowns open on hover but can also
 * be opened by click or keyboard, and in those cases moving the mouse away
 * never closes them — so Escape (which returns focus to the trigger) and a
 * press outside are the two exits people reach for.
 */
export function useDismissableMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      ref.current?.querySelector("button")?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (ref.current?.contains(event.target as Node)) return;
      setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return { ref, open, setOpen };
}
