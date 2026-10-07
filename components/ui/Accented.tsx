import type { Accented as AccentedCopy } from "@/lib/i18n/dictionaries/en";

type Props = {
  copy: AccentedCopy;
  /** The accent's element; `em` reads as emphasis, `span` is purely visual. */
  as?: "em" | "span";
  className?: string;
};

/**
 * A sentence whose second clause is set apart — muted italics in most
 * headings. Translations keep the split in `lead`/`accent`, so the markup (and
 * the word-by-word animation that walks into it) stays here, not in strings.
 */
export function Accented({ copy, as: Tag = "em", className = "italic text-muted" }: Props) {
  return (
    <>
      {`${copy.lead} `}
      <Tag className={className}>{copy.accent}</Tag>
    </>
  );
}
