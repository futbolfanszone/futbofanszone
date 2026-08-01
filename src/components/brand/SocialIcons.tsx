import { Instagram, Youtube } from "lucide-react";
import { SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3 6.34 6.34 0 0 0 9.5 21.64a6.34 6.34 0 0 0 6.34-6.34V8.77a8.19 8.19 0 0 0 4.76 1.52V6.84a4.86 4.86 0 0 1-.99-.15z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.717-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

const LINKS = [
  { href: SOCIAL.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL.tiktok, label: "TikTok", Icon: TikTokIcon },
  { href: SOCIAL.youtube, label: "YouTube", Icon: Youtube },
  { href: SOCIAL.twitter, label: "X (Twitter)", Icon: XIcon },
] as const;

type Props = {
  className?: string;
  iconClassName?: string;
  /** show text labels next to icons */
  labeled?: boolean;
};

export function SocialIcons({
  className,
  iconClassName = "h-5 w-5",
  labeled = false,
}: Props) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {LINKS.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className={cn(
            "inline-flex items-center gap-2 text-ice/70 transition hover:text-yellow",
            labeled && "border border-ice/20 px-4 py-2 text-sm uppercase tracking-wide hover:border-yellow",
          )}
        >
          <Icon className={iconClassName} />
          {labeled ? label : null}
        </a>
      ))}
    </div>
  );
}
