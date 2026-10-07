import type { ReactNode } from "react";

export type LegalSection<Id extends string = string> = { id: Id; title: string; body: ReactNode };

/**
 * One section per id, in the ids' order. Every translation of a document is
 * declared `satisfies SectionsFor<…Ids>`, so all languages share the same
 * sections and anchors — which is what lets the language switcher carry
 * `#data-retention` across.
 */
export type SectionsFor<Ids extends readonly string[]> = { [K in keyof Ids]: LegalSection<Ids[K]> };
