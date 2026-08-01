import { cn } from "@/lib/utils";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, className, id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-ice/80">{label}</span>
      <input
        id={inputId}
        className={cn(
          "w-full border border-ice/15 bg-ice/5 px-3.5 py-2.5 text-ice placeholder:text-ice/35 outline-none transition focus:border-yellow",
          error && "border-orange-bright",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-orange-bright">{error}</span> : null}
    </label>
  );
}
