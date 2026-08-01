import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About",
  description: `The story behind ${SITE.name} — fan-first football media.`,
};

export default function AboutPage() {
  return (
    <div className="section-pad mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        About
      </p>
      <h1 className="mt-2 font-display text-5xl text-ice md:text-6xl">
        Built by fans. Powered by culture.
      </h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ice/70">
        <p>
          {SITE.name} is a fan media brand for people who live the game —
          not just watch it. We create debate, quiz formats, match reactions,
          and the conversations that happen on the terrace, in the group chat,
          and after the final whistle.
        </p>
        <p>
          Inspired by the energy of the world&apos;s biggest fan networks, we&apos;re
          building a home for opinion, personality, and community — with shows
          you can join, a newsletter that keeps you close, and merch on the way.
        </p>
        <p>
          Want to be part of it? Apply to appear on a show, join the crew, or
          simply get on the list.
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/apply"
          className="bg-yellow px-6 py-3 font-semibold text-navy-deep hover:bg-yellow-deep"
        >
          Apply now
        </Link>
        <Link
          href="/subscribe"
          className="border border-ice/25 px-6 py-3 font-semibold text-ice hover:border-yellow hover:text-yellow"
        >
          Join the list
        </Link>
      </div>
    </div>
  );
}
