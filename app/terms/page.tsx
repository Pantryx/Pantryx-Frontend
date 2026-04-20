import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern your use of Pantryx.",
};

export default function TermsPage() {
  return (
    <LegalLayout
      kind="terms"
      title="Terms & Conditions"
      intro="A plain-English scaffold of the terms that govern your use of Pantryx. Final wording is pending legal review."
      lastUpdated="TBD"
      sections={[
        {
          id: "acceptance",
          title: "Acceptance of terms",
          body: (
            <p>
              By downloading or using Pantryx, you agree to these terms. If you don't agree, please
              don't use the app. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "account",
          title: "Your account",
          body: (
            <p>
              You're responsible for keeping your account credentials secure and for activity under
              your account. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "acceptable-use",
          title: "Acceptable use",
          body: (
            <>
              <p>
                Pantryx is for personal cooking use. You agree not to misuse it — including scraping,
                reverse engineering, or attempting to disrupt the service. <strong>[TBD]</strong>
              </p>
            </>
          ),
        },
        {
          id: "ai-output",
          title: "AI suggestions & cooking",
          body: (
            <p>
              Pantryx suggests dishes based on what its scanner detects. Ingredient detection and
              dish suggestions are provided as-is. <strong>Always use common sense</strong> when
              cooking — check allergens, food safety, and doneness yourself. Pantryx is not a
              substitute for medical or dietary advice. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "content",
          title: "Your content",
          body: (
            <p>
              You retain ownership of photos and data you submit. You grant us a limited license to
              process that content so we can operate the service for you. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "pricing",
          title: "Pricing",
          body: (
            <p>
              Pantryx is free during the MVP. If we introduce paid tiers later, core features
              referenced in our marketing will remain free unless explicitly changed, with notice.
              <strong> [TBD]</strong>
            </p>
          ),
        },
        {
          id: "termination",
          title: "Termination",
          body: (
            <p>
              You can delete your account at any time. We may suspend or terminate accounts that
              violate these terms. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "liability",
          title: "Liability",
          body: (
            <p>
              To the maximum extent permitted by law, Pantryx is provided "as is" without warranties.
              Our liability is limited as described here. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "governing-law",
          title: "Governing law",
          body: (
            <p>
              These terms are governed by <strong>[jurisdiction TBD]</strong>. Disputes will be
              resolved in its courts unless otherwise required by law.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes",
          body: (
            <p>
              We may update these terms. Material changes will be announced in-app and the date at
              the top of this page will change. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions about these terms? Email{" "}
              <a href={`mailto:${site.contactEmail}`} className="underline">
                {site.contactEmail}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
