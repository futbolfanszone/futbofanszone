import type { Metadata } from "next";
import { ContactForm } from "@/components/forms/ContactForm";
import { SITE, SOCIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${SITE.name}.`,
};

export default function ContactPage() {
  return (
    <div className="section-pad mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
          Contact
        </p>
        <h1 className="mt-2 font-display text-5xl text-ice md:text-6xl">
          Let&apos;s talk
        </h1>
        <p className="mt-4 text-ice/65">
          Press, partnerships, show ideas, or general questions — send a message
          or reach us directly.
        </p>
        <ul className="mt-8 space-y-3 text-ice/75">
          <li>
            <span className="text-ice/40">Email</span>
            <br />
            <a href={`mailto:${SITE.email}`} className="hover:text-yellow">
              {SITE.email}
            </a>
          </li>
          <li>
            <span className="text-ice/40">Phone</span>
            <br />
            <a
              href={`tel:${SITE.phone.replace(/\D/g, "")}`}
              className="hover:text-yellow"
            >
              {SITE.phone}
            </a>
          </li>
          <li>
            <span className="text-ice/40">Social</span>
            <br />
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow"
            >
              Instagram
            </a>
            {" · "}
            <a
              href={SOCIAL.tiktok}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow"
            >
              TikTok
            </a>
            {" · "}
            <a
              href={SOCIAL.youtube}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow"
            >
              YouTube
            </a>
            {" · "}
            <a
              href={SOCIAL.twitter}
              target="_blank"
              rel="noreferrer"
              className="hover:text-yellow"
            >
              X / Twitter
            </a>
          </li>
        </ul>
      </div>
      <ContactForm />
    </div>
  );
}
