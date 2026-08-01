"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:h-20 md:px-6">
        <Logo variant="light" mark="full" priority className="w-24 md:w-28" />

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium uppercase tracking-wide text-ice/70 transition hover:text-yellow",
                pathname === link.href && "text-yellow",
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/subscribe"
            className="bg-yellow px-4 py-2 text-sm font-bold uppercase tracking-wide text-navy-deep transition hover:bg-yellow-deep"
          >
            Join the list
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-12 w-12 items-center justify-center border border-ice/15 bg-ice/5 text-ice transition active:scale-95 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="fixed inset-x-0 bottom-0 top-[4.5rem] overflow-y-auto bg-navy-deep md:hidden">
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="mx-auto flex min-h-full max-w-lg flex-col px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-5"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-green-bright">
              Explore Futbol Fans Zone
            </p>
            <div className="flex flex-col border-t border-ice/10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex min-h-14 items-center justify-between border-b border-ice/10 text-xl font-bold uppercase tracking-wide text-ice/80 transition active:bg-ice/5",
                  pathname === link.href && "text-yellow",
                )}
              >
                <span>{link.label}</span>
                <ArrowUpRight className="h-5 w-5 text-ice/35" />
              </Link>
            ))}
            </div>
            <Link
              href="/subscribe"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-14 w-full items-center justify-center bg-yellow px-6 text-base font-bold uppercase tracking-wide text-navy-deep active:bg-yellow-deep"
            >
              Join the list
            </Link>
            <p className="mt-auto pt-8 text-sm leading-relaxed text-ice/45">
              Fan-first football stories, debate, quizzes, and match energy.
            </p>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
