import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Terms",
};

export default function TermsPage() {
  return (
    <div className="section-pad mx-auto max-w-3xl">
      <h1 className="font-display text-5xl text-ice">Terms of Use</h1>
      <div className="mt-8 space-y-4 text-ice/70">
        <p>
          By using {SITE.name} ({SITE.url}), you agree to use the site lawfully
          and not submit abusive, fraudulent, or infringing content via our
          forms.
        </p>
        <p>
          Submitting an application does not guarantee selection for a show or
          role. We may update these terms as the platform grows.
        </p>
        <p>
          Questions? Email{" "}
          <a href={`mailto:${SITE.email}`} className="text-yellow">
            {SITE.email}
          </a>
          .
        </p>
        <p className="text-sm text-ice/40">Last updated: August 2026</p>
      </div>
    </div>
  );
}
