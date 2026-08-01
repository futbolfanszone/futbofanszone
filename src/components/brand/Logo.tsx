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
  full: {
    width: 5334,
    height: 3000,
    frameClassName: "aspect-[1.61] w-28 md:w-32",
    imageClassName:
      "-left-[41.8%] -top-[28.2%] h-[163%] w-[180%] max-w-none",
  },
  badge: {
    width: 5334,
    height: 3000,
    frameClassName: "aspect-[0.66] w-10 md:w-11",
    imageClassName:
      "-left-[162%] -top-[10%] h-[143%] w-[385%] max-w-none",
  },
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
    <span
      className={cn(
        "relative inline-block shrink-0 overflow-hidden",
        size.frameClassName,
        className,
      )}
    >
      <Image
        src={src}
        alt={BRAND.name}
        width={size.width}
        height={size.height}
        priority={priority}
        sizes={mark === "full" ? "(max-width: 768px) 224px, 360px" : "72px"}
        className={cn("absolute object-contain", size.imageClassName)}
      />
    </span>
  );

  if (href === null) return image;

  return (
    <Link
      href={href}
      aria-label={BRAND.name}
      className="inline-flex items-center rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-yellow"
    >
      {image}
    </Link>
  );
}
