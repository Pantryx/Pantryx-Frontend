/** ISO dates of the last substantive change to each document; formatted per locale. */
export const legalLastUpdated = {
  privacy: "2026-09-24",
  terms: "2026-09-24",
} as const;

export type LegalDocument = keyof typeof legalLastUpdated;
