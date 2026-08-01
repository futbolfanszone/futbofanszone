import type { Metadata } from "next";
import { Suspense } from "react";
import { ApplyForm } from "@/components/forms/ApplyForm";

export const metadata: Metadata = {
  title: "Apply",
  description:
    "Apply to be on Futbol Fans Zone — quiz contestants, jobs, and general show appearances.",
};

export default function ApplyPage() {
  return (
    <div className="section-pad mx-auto max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-yellow">
        Applications
      </p>
      <h1 className="mt-2 font-display text-5xl text-ice md:text-6xl">
        Want to be on the show?
      </h1>
      <p className="mt-4 text-ice/65">
        Fill out the form below. We review every application and pick who comes
        on — quiz contestants, crew roles, and guest spots.
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-ice/50">Loading form…</p>}>
          <ApplyForm />
        </Suspense>
      </div>
    </div>
  );
}
