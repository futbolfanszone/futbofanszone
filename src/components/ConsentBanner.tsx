"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";

const KEY = "ffz_consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (stored) return;

    const timeout = window.setTimeout(() => setVisible(true), 0);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ice/10 bg-navy-deep/95 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ice/70">
          We use basic analytics cookies to understand traffic. See our{" "}
          <Link href="/privacy" className="text-yellow underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="grid grid-cols-2 gap-2 md:flex">
          <Button
            variant="secondary"
            className="min-h-12"
            onClick={() => {
              window.localStorage.setItem(KEY, "denied");
              setVisible(false);
            }}
          >
            Decline
          </Button>
          <Button
            className="min-h-12"
            onClick={() => {
              window.localStorage.setItem(KEY, "accepted");
              setVisible(false);
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
