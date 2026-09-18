"use client";

import { Job } from "@/lib/types";
import { formatDate, isOverdue } from "@/lib/utils";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, SearchX, Cpu } from "lucide-react";

interface JobsTableProps {
  jobs: Job[];
  selectedId: string | null;
  onSelect: (job: Job) => void;
}

export function JobsTable({ jobs, selectedId, onSelect }: JobsTableProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] shadow-[var(--shadow)] overflow-hidden">
      <div className="overflow-x-auto">
        <Table className="w-full text-left">
          <TableHeader className="bg-[var(--surface-2)] border-b border-[var(--border)]">
            <TableRow className="border-none hover:bg-transparent">
              <TableHead className="w-28 py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider font-mono">
                Job ID
              </TableHead>
              <TableHead className="py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                Product Name
              </TableHead>
              <TableHead className="py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                Customer
              </TableHead>
              <TableHead className="w-28 py-3.5 px-4 text-right text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider font-mono">
                Quantity
              </TableHead>
              <TableHead className="w-36 py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider font-mono">
                Due Date
              </TableHead>
              <TableHead className="w-32 py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                Status
              </TableHead>
              <TableHead className="w-28 py-3.5 px-4 text-xs font-bold text-[var(--text-dim)] uppercase tracking-wider">
                Machine
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobs.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={7} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center gap-2.5 max-w-sm mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[var(--surface-2)] flex items-center justify-center text-[var(--text-faint)]">
                      <SearchX className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-semibold text-[var(--text)]">
                      No work orders found
                    </p>
                    <p className="text-xs text-[var(--text-dim)]">
                      No orders match the current search or filters.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const isSelected = selectedId === job.id;
                const overdue = isOverdue(job.dueDate, job.status);

                return (
                  <TableRow
                    key={job.id}
                    onClick={() => onSelect(job)}
                    className={`cursor-pointer border-b border-[var(--border)] transition-colors ${
                      isSelected
                        ? "bg-[var(--surface-3)] hover:bg-[var(--surface-3)]"
                        : "hover:bg-[var(--surface-2)]"
                    }`}
                  >
                    <TableCell className="py-3.5 px-4 font-mono text-xs font-semibold text-[var(--text)]">
                      {job.id}
                    </TableCell>

                    <TableCell className="py-3.5 px-4">
                      <span className="font-semibold text-sm text-[var(--text)]">
                        {job.product}
                      </span>
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-xs text-[var(--text-dim)] font-medium">
                      {job.customer}
                    </TableCell>

                    <TableCell className="py-3.5 px-4 text-right font-mono text-xs text-[var(--text)] font-bold">
                      {job.quantity.toLocaleString()}
                    </TableCell>

                    <TableCell className="py-3.5 px-4 font-mono text-xs">
                      {overdue ? (
                        <div className="flex items-center gap-1.5 text-[var(--danger)] font-bold">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                          <span>{formatDate(job.dueDate)}</span>
                        </div>
                      ) : (
                        <span className="text-[var(--text-dim)] font-medium">
                          {formatDate(job.dueDate)}
                        </span>
                      )}
                    </TableCell>

                    <TableCell className="py-3.5 px-4">
                      <StatusBadge status={job.status} size="sm" />
                    </TableCell>

                    <TableCell className="py-3.5 px-4">
                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--surface-2)] border border-[var(--border)] text-xs font-mono font-medium text-[var(--text-dim)]">
                        <Cpu className="h-3 w-3 text-[var(--text-faint)]" />
                        {job.machine}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
