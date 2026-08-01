import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Shop",
  description: `${SITE.name} merch — coming soon.`,
};

export default function ShopPage() {
  return (
    <div className="section-pad mx-auto max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        Merch
      </p>
      <h1 className="mt-2 font-display text-5xl text-ice md:text-7xl">
        Shop coming soon
      </h1>
      <p className="mt-4 text-ice/65">
        Kits, drops, and fan gear are on the way. Join the list so you hear
        about the first release first.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/subscribe"
          className="bg-yellow px-6 py-3 font-semibold text-navy-deep hover:bg-yellow-deep"
        >
          Notify me
        </Link>
        <Link
          href="/contact"
          className="border border-ice/25 px-6 py-3 font-semibold text-ice hover:border-yellow hover:text-yellow"
        >
          Wholesale / collab
        </Link>
      </div>
    </div>
  );
}
