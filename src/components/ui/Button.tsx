import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "green" | "orange";
  size?: "md" | "lg";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-bold uppercase tracking-wide transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow",
        size === "md" && "px-5 py-2.5 text-sm",
        size === "lg" && "px-7 py-3.5 text-base",
        variant === "primary" &&
          "bg-yellow text-navy-deep hover:bg-yellow-deep hover:-translate-y-0.5",
        variant === "secondary" &&
          "border border-ice/25 bg-ice/5 text-ice hover:border-yellow hover:text-yellow",
        variant === "ghost" && "text-ice/80 hover:text-yellow",
        variant === "green" &&
          "bg-green-bright text-navy-deep hover:bg-green hover:-translate-y-0.5",
        variant === "orange" &&
          "bg-orange-bright text-ice hover:bg-orange hover:-translate-y-0.5",
        className,
      )}
      {...props}
    />
  );
}
