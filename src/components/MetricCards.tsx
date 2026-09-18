import { Job } from "@/lib/types";
import { isDueToday } from "@/lib/utils";
import { ClipboardList, AlertTriangle, Clock, CheckCircle2 } from "lucide-react";

interface MetricCardsProps {
  jobs: Job[];
}

export function MetricCards({ jobs }: MetricCardsProps) {
  const totalJobs = jobs.length;
  const delayedJobs = jobs.filter((j) => j.status === "Delayed").length;
  const dueTodayJobs = jobs.filter((j) => isDueToday(j.dueDate) && j.status !== "Completed").length;
  const completedJobs = jobs.filter((j) => j.status === "Completed").length;
  const activeMachinesCount = new Set(jobs.map((j) => j.machine)).size;

  const metrics = [
    {
      label: "Total Work Orders",
      value: totalJobs,
      subtext: `${activeMachinesCount} active machines`,
      icon: ClipboardList,
      accentColor: "text-[var(--text)]",
      iconBg: "bg-[var(--surface-2)]",
      borderHover: "hover:border-[var(--border-strong)]",
    },
    {
      label: "Delayed Work Orders",
      value: delayedJobs,
      subtext: delayedJobs > 0 ? "Requires attention" : "All orders on schedule",
      icon: AlertTriangle,
      accentColor: "text-[var(--danger)]",
      iconBg: "bg-[var(--danger-bg)]",
      borderHover: "hover:border-[var(--danger)]",
      highlight: delayedJobs > 0,
    },
    {
      label: "Due Today",
      value: dueTodayJobs,
      subtext: `${dueTodayJobs} orders due today`,
      icon: Clock,
      accentColor: "text-[var(--gold)]",
      iconBg: "bg-[color-mix(in_srgb,var(--gold)_12%,transparent)]",
      borderHover: "hover:border-[var(--gold)]",
    },
    {
      label: "Completed",
      value: completedJobs,
      subtext: "Ready for dispatch",
      icon: CheckCircle2,
      accentColor: "text-[var(--credit)]",
      iconBg: "bg-[var(--credit-bg)]",
      borderHover: "hover:border-[var(--credit)]",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((m) => {
        const Icon = m.icon;
        return (
          <div
            key={m.label}
            className={`group relative overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-[var(--shadow)] transition-all duration-200 hover:-translate-y-0.5 ${m.borderHover}`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-wider text-[var(--text-dim)] uppercase">
                  {m.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold tracking-tight text-[var(--text)]">
                    {m.value}
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-dim)] font-mono">jobs</span>
                </div>
              </div>
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${m.iconBg} ${m.accentColor}`}
              >
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-3 text-xs font-medium text-[var(--text-dim)] flex items-center gap-1.5">
              {m.highlight && (
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--danger)] animate-pulse" />
              )}
              {m.subtext}
            </p>
          </div>
        );
      })}
    </div>
  );
}
