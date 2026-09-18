"use client";

import { useState, useEffect, useRef } from "react";
import { Job, JobStatus } from "@/lib/types";
import { formatDate, isOverdue } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Calendar,
  Cpu,
  Hash,
  Package,
  Check,
  AlertCircle,
} from "lucide-react";

interface JobDetailSheetProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onStatusUpdate: (id: string, status: JobStatus) => void;
}

export function JobDetailSheet({
  job,
  open,
  onClose,
  onStatusUpdate,
}: JobDetailSheetProps) {
  const [selectedStatus, setSelectedStatus] = useState<JobStatus>("Pending");
  const [isSaved, setIsSaved] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (job) {
      setSelectedStatus(job.status);
      setIsSaved(false);
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
    }
  }, [job, open]);

  if (!job) return null;

  const overdue = isOverdue(job.dueDate, job.status);

  const handleSave = () => {
    onStatusUpdate(job.id, selectedStatus);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <SheetContent
        ref={scrollRef}
        side="right"
        className="w-full sm:max-w-md bg-[var(--surface)] text-[var(--text)] border-l border-[var(--border)] p-6 overflow-y-auto"
      >
        <SheetHeader className="p-0 gap-1 text-left">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-dim)] border border-[var(--border)]">
              <Hash className="h-3 w-3" />
              {job.id}
            </span>
            <StatusBadge status={job.status} size="sm" />
          </div>
          <SheetTitle className="text-xl font-bold tracking-tight text-[var(--text)] mt-1.5">
            {job.product}
          </SheetTitle>
          <SheetDescription className="text-xs text-[var(--text-dim)]">
            Job specifications and machine status.
          </SheetDescription>
        </SheetHeader>

        <Separator className="my-5 bg-[var(--border)]" />

        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-dim)]">
            Specifications
          </h4>

          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                <Building2 className="h-3.5 w-3.5 text-[var(--text-faint)]" />
                <span>Customer</span>
              </div>
              <p className="mt-1 font-semibold text-xs text-[var(--text)] truncate">
                {job.customer}
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                <Package className="h-3.5 w-3.5 text-[var(--text-faint)]" />
                <span>Quantity</span>
              </div>
              <p className="mt-1 font-mono font-bold text-sm text-[var(--text)]">
                {job.quantity.toLocaleString()}{" "}
                <span className="text-[11px] font-normal text-[var(--text-dim)]">units</span>
              </p>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                <Calendar className="h-3.5 w-3.5 text-[var(--text-faint)]" />
                <span>Due Date</span>
              </div>
              <div className="mt-1 flex items-center gap-1.5">
                {overdue && (
                  <AlertCircle className="h-3.5 w-3.5 text-[var(--danger)] shrink-0" />
                )}
                <p
                  className={`font-mono text-xs font-bold ${
                    overdue ? "text-[var(--danger)]" : "text-[var(--text)]"
                  }`}
                >
                  {formatDate(job.dueDate)}
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] p-3">
              <div className="flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                <Cpu className="h-3.5 w-3.5 text-[var(--text-faint)]" />
                <span>Machine</span>
              </div>
              <p className="mt-1 font-mono font-bold text-xs text-[var(--text)]">
                {job.machine}
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-5 bg-[var(--border)]" />

        <div className="space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-dim)]">
            Notes
          </h4>

          <div className="w-full text-xs font-sans bg-[var(--surface-2)] border border-[var(--border)] text-[var(--text)] rounded-lg leading-relaxed p-3.5">
            {job.notes || "No notes recorded."}
          </div>
        </div>

        <Separator className="my-5 bg-[var(--border)]" />

        <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-4">
          <h4 className="text-xs font-bold text-[var(--text)]">
            Update Status
          </h4>

          <div className="flex items-center gap-2 pt-1">
            <div className="flex-1">
              <Select
                value={selectedStatus}
                onValueChange={(val) => {
                  if (val) setSelectedStatus(val as JobStatus);
                }}
              >
                <SelectTrigger className="w-full h-9 bg-[var(--surface)] border-[var(--border)] text-xs text-[var(--text)]">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="In Progress">In Progress</SelectItem>
                  <SelectItem value="Delayed">Delayed</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              type="button"
              onClick={handleSave}
              disabled={selectedStatus === job.status}
              className="h-9 px-4 text-xs font-semibold bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-[var(--primary-foreground)] shrink-0 disabled:opacity-50"
            >
              {isSaved ? (
                <span className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> Updated
                </span>
              ) : (
                "Save Status"
              )}
            </Button>
          </div>

          {isSaved && (
            <p className="text-[11px] text-[var(--credit)] font-medium flex items-center gap-1 mt-1">
              <Check className="h-3 w-3" /> Status updated.
            </p>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
