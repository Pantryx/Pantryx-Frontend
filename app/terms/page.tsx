import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { termsSections } from "@/lib/legal/terms-sections";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms that govern your use of Pantryx.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      kind="terms"
      title="Terms of Use"
      intro="Operated by Volodymyr Mendyk. These Terms of Use govern your use of the Pantryx mobile application and related services."
      lastUpdated="September 24, 2026"
      sections={termsSections}
    />
  );
}
