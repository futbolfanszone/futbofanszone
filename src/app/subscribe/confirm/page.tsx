import type { Metadata } from "next";
import Link from "next/link";
import { confirmSubscription } from "@/lib/subscribe";

export const metadata: Metadata = {
  title: "Confirm subscription",
};

type Props = {
  searchParams: Promise<{ token?: string }>;
};

export default async function ConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const result = token
    ? await confirmSubscription(token)
    : { ok: false as const, message: "Missing confirmation token." };

  return (
    <div className="section-pad mx-auto max-w-xl text-center">
      <h1 className="font-display text-5xl text-ice md:text-6xl">
        {result.ok ? "You're confirmed" : "Confirmation issue"}
      </h1>
      <p className="mt-4 text-ice/65">{result.message}</p>
      <Link
        href="/"
        className="mt-8 inline-block bg-yellow px-6 py-3 font-semibold text-navy-deep hover:bg-yellow-deep"
      >
        Back home
      </Link>
    </div>
  );
}
