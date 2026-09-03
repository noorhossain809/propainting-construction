import { cn } from "@/lib/utils";

type LoaderProps = {
  /** Spinner size */
  size?: "sm" | "md" | "lg";
  /** Optional text under the spinner */
  label?: string;
  /** Extra classes for the wrapper */
  className?: string;
};

const SIZES: Record<NonNullable<LoaderProps["size"]>, string> = {
  sm: "h-6 w-6 border-2",
  md: "h-10 w-10 border-[3px]",
  lg: "h-16 w-16 border-4",
};

/**
 * Branded loading spinner — a navy track with an amber spinning arc,
 * matching the Pro Painting Construction palette (#0B2653 / amber-500).
 */
export function Loader({ size = "md", label, className }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("flex flex-col items-center justify-center gap-3", className)}
    >
      <span
        className={cn(
          "inline-block animate-spin rounded-full border-[#0B2653]/15 border-t-amber-500",
          SIZES[size]
        )}
      />
      {label && (
        <span className="text-sm font-medium tracking-wide text-muted-foreground">
          {label}
        </span>
      )}
      <span className="sr-only">Loading…</span>
    </div>
  );
}

export default Loader;
