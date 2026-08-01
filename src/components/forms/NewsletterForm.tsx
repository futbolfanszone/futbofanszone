"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Props = {
  source?: string;
  className?: string;
  compact?: boolean;
};

export function NewsletterForm({
  source = "website",
  className,
  compact = false,
}: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, website: "" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setStatus("ok");
      setMessage(data.message || "Check your inbox to confirm.");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Unable to subscribe");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("w-full", className)}
      noValidate
    >
      <div
        className={cn(
          "flex gap-2",
          compact ? "flex-col sm:flex-row" : "flex-col sm:flex-row",
        )}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          className="min-w-0 flex-1 border border-ice/20 bg-navy-deep/60 px-4 py-3 text-ice placeholder:text-ice/40 outline-none focus:border-yellow"
          aria-label="Email address"
        />
        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />
        <Button type="submit" size="lg" disabled={status === "loading"}>
          {status === "loading" ? "Joining…" : "Join the list"}
        </Button>
      </div>
      {message ? (
        <p
          className={cn(
            "mt-3 text-sm",
            status === "ok" ? "text-green-bright" : "text-orange-bright",
          )}
        >
          {message}
        </p>
      ) : (
        <p className="mt-3 text-xs text-ice/45">
          Weekly fan takes. Unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
