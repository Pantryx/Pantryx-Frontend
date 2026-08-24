type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * A soft device frame around an app screenshot. Kept deliberately minimal —
 * a thin bezel, rounded corners, and a theme-tinted shadow — so the screens
 * read as "app store" captures rather than heavy skeuomorphic phones.
 * Uses a plain <img> so local screenshots and SVG placeholders both work
 * without any next/image domain config.
 */
export function PhoneFrame({ src, alt, className, priority }: Props) {
  return (
    <div
      className={`w-full overflow-hidden rounded-[1.35rem] shadow-[0_36px_70px_-38px_rgb(var(--ink)/0.35)] ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}
