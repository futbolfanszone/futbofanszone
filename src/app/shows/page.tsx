import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SHOWS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shows",
  description: "Fan Quiz, Debate Desk, Match Reaction — and more formats from Futbol Fans Zone.",
};

export default function ShowsPage() {
  return (
    <div className="section-pad mx-auto max-w-6xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        Shows
      </p>
      <h1 className="mt-2 max-w-2xl font-display text-5xl text-ice md:text-6xl">
        Formats that capture the passion
      </h1>
      <p className="mt-4 max-w-xl text-ice/65">
        Original fan-first shows built for debate, chaos, and culture. Apply to
        appear — we pick the best applicants for each episode.
      </p>

      <div className="mt-12 space-y-6">
        {SHOWS.map((show, index) => (
          <article
            key={show.slug}
            className="grid gap-6 border border-ice/10 bg-navy/40 p-6 md:grid-cols-[120px_1fr_auto] md:items-center md:p-8"
          >
            <p className="font-display text-5xl text-yellow/40">
              {String(index + 1).padStart(2, "0")}
            </p>
            <div>
              <h2 className="font-display text-4xl text-ice">{show.title}</h2>
              <p className="mt-3 max-w-2xl text-ice/65">{show.blurb}</p>
            </div>
            <Link
              href={`/apply?type=${show.applyType}`}
              className="inline-flex items-center justify-center gap-2 bg-yellow px-5 py-3 text-sm font-semibold text-navy-deep hover:bg-yellow-deep"
            >
              {show.cta} <ArrowRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
