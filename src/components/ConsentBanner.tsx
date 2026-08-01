"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/Button";

const KEY = "ffz_consent";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (!stored) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-ice/10 bg-navy-deep/95 p-4 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-ice/70">
          We use basic analytics cookies to understand traffic. See our{" "}
          <Link href="/privacy" className="text-yellow underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              window.localStorage.setItem(KEY, "denied");
              setVisible(false);
            }}
          >
            Decline
          </Button>
          <Button
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
