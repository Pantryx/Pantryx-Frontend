"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { stripLocale } from "@/lib/i18n/paths";
import { EASE_OUT_EXPO } from "@/lib/motion/tokens";

export function PageTransition({ children }: { children: ReactNode }) {
  // Normalised so the key matches between the prerender (`/en/…`) and the browser.
  const pathname = stripLocale(usePathname()).pathname;
  return (
    <motion.main
      id="main"
      key={pathname}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      {children}
    </motion.main>
  );
}
