import { JobStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
  size?: "sm" | "md";
}

const statusConfig: Record<
  JobStatus,
  {
    container: string;
    dot: string;
  }
> = {
  Pending: {
    container: "bg-[var(--surface-2)] text-[var(--text-dim)] border-[var(--border)]",
    dot: "bg-[var(--text-faint)]",
  },
  "In Progress": {
    container: "bg-[var(--surface-2)] text-[var(--text)] border-[var(--border)]",
    dot: "bg-sky-400",
  },
  Delayed: {
    container: "bg-[var(--danger-bg)] text-[var(--danger)] border-[color-mix(in_srgb,var(--danger)_30%,transparent)]",
    dot: "bg-[var(--danger)]",
  },
  Completed: {
    container: "bg-[var(--credit-bg)] text-[var(--credit)] border-[color-mix(in_srgb,var(--credit)_30%,transparent)]",
    dot: "bg-[var(--credit)]",
  },
};

export function StatusBadge({ status, className, size = "sm" }: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig.Pending;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium transition-colors select-none",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs",
        config.container,
        className
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", config.dot)} />
      {status}
    </span>
  );
}
