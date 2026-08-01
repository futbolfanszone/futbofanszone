import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Partners",
  description: `Work with ${SITE.name} — sponsorships and brand partnerships.`,
};

export default function PartnersPage() {
  return (
    <div className="section-pad mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
          Partnerships
        </p>
        <h1 className="mt-2 font-display text-5xl text-ice md:text-6xl">
          Work with real fans
        </h1>
        <p className="mt-4 text-ice/65">
          Flexible partnership models for brands that want to show up where fans
          actually live — shows, socials, newsletter, and experiences.
        </p>
        <ul className="mt-8 space-y-4 text-ice/70">
          <li className="border-l-2 border-accent pl-4">
            Sponsored segments & branded content
          </li>
          <li className="border-l-2 border-accent pl-4">
            Newsletter & community activations
          </li>
          <li className="border-l-2 border-accent pl-4">
            Event & watch-party collaborations
          </li>
        </ul>
      </div>
      <div>
        <h2 className="font-display text-3xl text-ice">Brief our team</h2>
        <p className="mt-2 mb-6 text-sm text-ice/55">
          Tell us about your brand and goals — we&apos;ll follow up.
        </p>
        <ContactForm defaultSubject="Partnership inquiry" />
      </div>
    </div>
  );
}
