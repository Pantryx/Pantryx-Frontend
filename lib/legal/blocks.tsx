import type { ReactNode } from "react";

/** Building blocks shared by every language's legal documents. */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-2 pl-5">
      {items.map((text, i) => (
        <li key={i}>{text}</li>
      ))}
    </ul>
  );
}

export function Subheading({ children }: { children: ReactNode }) {
  return <h3 className="font-display text-xl text-ink">{children}</h3>;
}
