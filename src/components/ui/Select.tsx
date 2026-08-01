import { cn } from "@/lib/utils";
import { SelectHTMLAttributes } from "react";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
};

export function Select({
  label,
  error,
  options,
  className,
  id,
  ...props
}: Props) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-ice/80">{label}</span>
      <select
        id={inputId}
        className={cn(
          "w-full border border-ice/15 bg-navy-deep px-3.5 py-2.5 text-ice outline-none transition focus:border-yellow",
          error && "border-orange-bright",
          className,
        )}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error ? <span className="text-xs text-orange-bright">{error}</span> : null}
    </label>
  );
}
