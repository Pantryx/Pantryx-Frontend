"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * The hero product reel — a muted, looping clip of the app in motion.
 *
 * Loading is handled so the frame never looks empty or snaps:
 *  - the poster (a real app frame) is the LCP, shown instantly and cheaply;
 *  - a soft shimmer sweeps the frame while the first video frames arrive;
 *  - the clip crossfades in over the poster once it's actually rendering.
 *
 * Memory stays lean: `preload="none"` plus a lazily-attached `src` mean the
 * browser allocates no decode buffer and makes no request until the frame nears
 * the viewport, and playback pauses the moment it scrolls away. The clip is
 * 540p with no audio track, so the decoded footprint is small to begin with.
 * Reduced motion keeps the still poster and never loads the clip at all.
 */
export function HeroReel({ src, poster, className }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlaying = () => setPlaying(true);
    video.addEventListener("playing", onPlaying);

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return () => video.removeEventListener("playing", onPlaying);
    }

    let attached = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Attach the source only when the frame nears the viewport, so the
          // decode buffer and network request are deferred past first paint.
          if (!attached) {
            attached = true;
            video.src = src;
          }
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25, rootMargin: "200px 0px" }
    );
    io.observe(video);

    return () => {
      io.disconnect();
      video.removeEventListener("playing", onPlaying);
    };
  }, [src]);

  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[1.75rem] bg-[#fffdf8] shadow-[0_44px_80px_-42px_rgb(var(--ink)/0.5)]",
        className
      )}
    >
      <img
        src={poster}
        alt=""
        aria-hidden
        className={clsx(
          "block h-auto w-full transition-opacity duration-700 ease-out motion-reduce:transition-none",
          playing && "opacity-0"
        )}
      />

      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        aria-label="Pantryx app in motion: scan your fridge, get recipes you can cook"
        className={clsx(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out",
          playing ? "opacity-100" : "opacity-0"
        )}
      />

      {!playing && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 motion-reduce:hidden"
          style={{
            background:
              "linear-gradient(105deg, transparent 38%, rgb(var(--ink) / 0.07) 50%, transparent 62%)",
            backgroundSize: "220% 100%",
            animation: "heroReelShimmer 1.8s linear infinite",
          }}
        />
      )}

      <style>{`@keyframes heroReelShimmer{0%{background-position:160% 0}100%{background-position:-60% 0}}`}</style>
    </div>
  );
}
