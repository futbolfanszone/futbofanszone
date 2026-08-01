import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialIcons } from "@/components/brand/SocialIcons";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-navy-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Logo variant="light" mark="full" className="max-w-[200px]" />
          <p className="mt-4 max-w-xs font-chant text-lg text-ice/80">
            {SITE.tagline}
          </p>
          <SocialIcons className="mt-5" />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ice/40">
            Explore
          </p>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm uppercase tracking-wide text-ice/70 hover:text-yellow"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ice/40">
            Contact
          </p>
          <ul className="mt-4 space-y-2 text-sm text-ice/70">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-yellow">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\D/g, "")}`}
                className="hover:text-yellow"
              >
                {SITE.phone}
              </a>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-yellow">
                Privacy
              </Link>
              {" · "}
              <Link href="/terms" className="hover:text-yellow">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-ice/40">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
