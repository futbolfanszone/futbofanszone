import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="section-pad mx-auto max-w-3xl prose-invert">
      <h1 className="font-display text-5xl text-ice">Privacy Policy</h1>
      <div className="mt-8 space-y-4 text-ice/70">
        <p>
          {SITE.name} (&quot;we&quot;) collects information you provide when you
          subscribe to our newsletter, submit an application, or contact us —
          typically your name, email, phone number, and message content.
        </p>
        <p>
          We use this information to send newsletters (with your consent),
          review show/job applications, respond to inquiries, and improve the
          site. We do not sell your personal information.
        </p>
        <p>
          Email subscriptions use a double opt-in confirmation. You can
          unsubscribe at any time via the link in our emails.
        </p>
        <p>
          We may use basic analytics cookies if you accept our consent banner.
          Contact us at{" "}
          <a href={`mailto:${SITE.email}`} className="text-yellow">
            {SITE.email}
          </a>{" "}
          for privacy requests.
        </p>
        <p className="text-sm text-ice/40">Last updated: August 2026</p>
      </div>
    </div>
  );
}
