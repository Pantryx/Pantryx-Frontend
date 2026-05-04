"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "header";
  id?: string;
  /** `inView` (default): animate when scrolled into view. `mount`: animate on mount (e.g. legal pages). */
  when?: "inView" | "mount";
};

export function Reveal({
  children,
  delay = 0,
  className,
  y = 16,
  as = "div",
  id,
  when = "inView",
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay,
      },
    },
  };

  if (when === "mount") {
    return (
      <MotionTag id={id} className={className} initial="hidden" animate="show" variants={variants}>
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
