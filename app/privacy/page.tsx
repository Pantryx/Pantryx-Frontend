import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Pantryx collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      kind="privacy"
      title="Privacy Policy"
      intro="Plain-English summary of what data Pantryx collects, why, and what you control. The final legal wording will be reviewed by counsel before public launch."
      lastUpdated="TBD"
      sections={[
        {
          id: "overview",
          title: "Overview",
          body: (
            <>
              <p>
                Pantryx is built around a simple principle: collect as little data as possible, and
                let you delete anything we do store. This page explains what we keep and why.
              </p>
              <p>
                <strong>[TBD]</strong> — final wording pending legal review.
              </p>
            </>
          ),
        },
        {
          id: "data-we-collect",
          title: "Data we collect",
          body: (
            <>
              <p>
                <strong>Pantry photos.</strong> Used to identify ingredients in your fridge.
              </p>
              <p>
                <strong>Account information.</strong> If you create an account: email, device
                identifier, and optional dietary preferences.
              </p>
              <p>
                <strong>Usage data.</strong> Anonymized app events to understand which features
                are used, and to improve reliability.
              </p>
              <p>
                <strong>[TBD]</strong> — detailed categories.
              </p>
            </>
          ),
        },
        {
          id: "how-we-use-it",
          title: "How we use it",
          body: (
            <>
              <p>
                To detect ingredients, suggest dishes, run guided cook mode, and answer your cooking
                questions. We do not sell your data. We do not train public AI models on your
                photos.
              </p>
              <p>
                <strong>[TBD]</strong>
              </p>
            </>
          ),
        },
        {
          id: "retention",
          title: "Data retention",
          body: (
            <p>
              Pantry data is kept while your account is active. Photos are processed and not kept
              longer than needed to identify your pantry. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "your-rights",
          title: "Your rights",
          body: (
            <>
              <p>
                You can access, export, or delete your data at any time from Settings. You can
                also contact us at{" "}
                <a href={`mailto:${site.contactEmail}`} className="underline">
                  {site.contactEmail}
                </a>
                .
              </p>
              <p>
                <strong>[TBD]</strong> — jurisdiction-specific rights (GDPR, CCPA, etc.).
              </p>
            </>
          ),
        },
        {
          id: "third-parties",
          title: "Third parties",
          body: (
            <p>
              We use a small number of infrastructure providers (hosting, analytics, AI inference).
              The list will be published here. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "children",
          title: "Children",
          body: (
            <p>
              Pantryx is not directed at children under 13. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: (
            <p>
              If we make material changes, we'll notify you in-app and update the date at the top of
              this page. <strong>[TBD]</strong>
            </p>
          ),
        },
        {
          id: "contact",
          title: "Contact",
          body: (
            <p>
              Questions? Email{" "}
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
