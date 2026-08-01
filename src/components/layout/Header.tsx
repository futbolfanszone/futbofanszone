"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-deep/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Logo variant="light" mark="full" priority className="max-w-[180px] md:max-w-none" />

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
          className="text-ice md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open ? (
        <nav className="border-t border-white/10 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "text-base font-medium uppercase tracking-wide text-ice/80",
                  pathname === link.href && "text-yellow",
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit bg-yellow px-4 py-2 text-sm font-bold uppercase tracking-wide text-navy-deep"
            >
              Join the list
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
