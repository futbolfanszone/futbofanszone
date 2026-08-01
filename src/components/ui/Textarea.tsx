import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes } from "react";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ label, error, className, id, ...props }: Props) {
  const inputId = id || props.name;
  return (
    <label className="block space-y-1.5" htmlFor={inputId}>
      <span className="text-sm font-medium text-ice/80">{label}</span>
      <textarea
        id={inputId}
        className={cn(
          "min-h-32 w-full resize-y border border-ice/15 bg-ice/5 px-3.5 py-2.5 text-ice placeholder:text-ice/35 outline-none transition focus:border-yellow",
          error && "border-orange-bright",
          className,
        )}
        {...props}
      />
      {error ? <span className="text-xs text-orange-bright">{error}</span> : null}
    </label>
  );
}
