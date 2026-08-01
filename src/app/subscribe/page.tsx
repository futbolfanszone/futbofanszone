import type { Metadata } from "next";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Subscribe",
  description: `Join the ${SITE.name} weekly newsletter.`,
};

export default function SubscribePage() {
  return (
    <div className="section-pad mx-auto max-w-xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        Newsletter
      </p>
      <h1 className="mt-2 font-display text-5xl text-ice md:text-6xl">
        Join the list
      </h1>
      <p className="mt-4 text-ice/65">
        Weekly drops: show invites, fan takes, and what&apos;s next for{" "}
        {SITE.name}. Confirm your email after signing up.
      </p>
      <div className="mt-8">
        <NewsletterForm source="subscribe-page" />
      </div>
    </div>
  );
}
