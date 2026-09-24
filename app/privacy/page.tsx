import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { privacySections } from "@/lib/legal/privacy-sections";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pantryx collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      kind="privacy"
      title="Privacy Policy"
      intro="Operated by Volodymyr Mendyk. This policy explains how we collect, use, store, share, and protect personal data when you use Pantryx, including your rights under the GDPR and other applicable laws."
      lastUpdated="September 24, 2026"
      sections={privacySections}
    />
  );
}
