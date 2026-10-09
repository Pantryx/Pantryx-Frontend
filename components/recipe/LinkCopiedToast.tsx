"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  isVisible: boolean;
  message: string;
};

/** Portalled to `body`: the page transition wrapper's transform would otherwise anchor `fixed` to it. */
export function LinkCopiedToast({ isVisible, message }: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      role="status"
      aria-live="polite"
      data-testid="link-copied-toast"
      className={`pointer-events-none fixed inset-x-4 bottom-6 z-50 mx-auto max-w-sm transition-all duration-300 ease-out-expo ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      {isVisible ? (
        <div className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-sm text-paper shadow-[0_18px_50px_-12px_rgba(0,0,0,0.35)]">
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
          </svg>
          <span>{message}</span>
        </div>
      ) : null}
    </div>,
    document.body
  );
}
