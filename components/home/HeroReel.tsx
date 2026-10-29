"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * The hero product reel — a muted, looping clip of the app in motion.
 *
 * Playback is driven here rather than with the `autoplay` attribute so two
 * rules hold: it never plays for someone who asked for reduced motion (the
 * poster stays), and it only runs while it's on screen (an off-screen loop is
 * wasted battery and decode). The poster is a real app frame, so even when the
 * video never plays the hero still shows the product.
 */
export function HeroReel({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[1.75rem] bg-[#fffdf8] shadow-[0_44px_80px_-42px_rgb(var(--ink)/0.5)]",
        className
      )}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label="Pantryx app in motion: scan your fridge, get recipes you can cook"
        className="block h-auto w-full"
      />
    </div>
  );
}
