import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Props = {
  variant?: "light" | "dark";
  /** crest + wordmark vs crest only */
  mark?: "full" | "badge";
  href?: string | null;
  className?: string;
  priority?: boolean;
};

const SIZES = {
  full: { width: 220, height: 72, className: "h-10 w-auto md:h-12" },
  badge: { width: 56, height: 64, className: "h-10 w-auto md:h-11" },
} as const;

export function Logo({
  variant = "light",
  mark = "full",
  href = "/",
  className,
  priority = false,
}: Props) {
  const src =
    mark === "badge"
      ? variant === "light"
        ? BRAND.assets.badgeLight
        : BRAND.assets.badgeDark
      : variant === "light"
        ? BRAND.assets.logoLight
        : BRAND.assets.logoDark;

  const size = SIZES[mark];

  const image = (
    <Image
      src={src}
      alt={BRAND.name}
      width={size.width}
      height={size.height}
      priority={priority}
      className={cn(size.className, "object-contain", className)}
    />
  );

  if (href === null) return image;

  return (
    <Link href={href} aria-label={BRAND.name} className="inline-flex items-center">
      {image}
    </Link>
  );
}
