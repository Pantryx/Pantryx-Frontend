"use client";

import { useId, useState, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import clsx from "clsx";
import { beta, site } from "@/lib/site";
import { EASE_OUT_EXPO } from "@/lib/motion/tokens";

type Status = "idle" | "submitting" | "done" | "error";

type Props = {
  className?: string;
  /** `center` matches FinalCTA's centred column; `start` suits the mobile menu. */
  align?: "start" | "center";
};

export function WaitlistForm({ className, align = "start" }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const reduce = useReducedMotion();
  const inputId = useId();
  const errorId = `${inputId}-error`;

  const centred = align === "center";

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    setStatus("submitting");
    setMessage(null);
    setShowFallback(false);

    try {
      const response = await fetch("/api/site/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await response.json().catch(() => ({}));

      if (response.ok) {
        setStatus("done");
        return;
      }

      setStatus("error");
      setMessage(body.error ?? "Something went wrong. Try again.");
      // 501 means no collector is wired up yet — offer the address instead of
      // asking the visitor to keep retrying a form that cannot succeed.
      setShowFallback(body.fallback === "mailto");
    } catch {
      setStatus("error");
      setMessage("We couldn't reach the server. Check your connection and try again.");
    }
  }

  if (status === "done") {
    return (
      <motion.p
        initial={{ opacity: 0, y: reduce ? 0 : 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        className={clsx(
          "flex items-center gap-2 text-sm text-ink",
          centred && "justify-center",
          className
        )}
      >
        <Check className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
        {beta.waitlistSuccess}
      </motion.p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={clsx("w-full max-w-sm", centred && "mx-auto", className)}
    >
      <label htmlFor={inputId} className="block text-xs text-muted">
        {beta.waitlistCopy}
      </label>

      <div className="mt-2.5 flex gap-2">
        <input
          id={inputId}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          disabled={status === "submitting"}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="h-11 min-w-0 flex-1 rounded-full border border-line bg-paper px-4 text-sm text-ink transition-colors duration-200 placeholder:text-muted hover:border-muted focus:border-ink focus:outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-paper transition-[transform,background-color] duration-300 ease-out-expo hover:bg-ink-soft active:scale-[0.97] disabled:opacity-60"
        >
          {status === "submitting" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin" strokeWidth={2.25} aria-hidden />
          )}
          {status === "submitting" ? "Sending" : "Notify me"}
        </button>
      </div>

      <AnimatePresence initial={false}>
        {status === "error" && message && (
          <motion.p
            key="error"
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="overflow-hidden text-xs text-muted"
          >
            <span className="mt-2 block">
              {message}
              {showFallback && (
                <>
                  {" "}
                  <a
                    href={`mailto:${site.contactEmail}?subject=Pantryx%20beta%20waitlist`}
                    className="text-ink underline underline-offset-2"
                  >
                    Email us instead
                  </a>
                  .
                </>
              )}
            </span>
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
