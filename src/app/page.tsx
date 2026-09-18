"use client";

import { useState, useEffect, useCallback } from "react";
import { Factory, Loader2, AlertTriangle, RefreshCw } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MetricCards } from "@/components/MetricCards";
import { FilterBar } from "@/components/FilterBar";
import { JobsTable } from "@/components/JobsTable";
import { JobDetailSheet } from "@/components/JobDetailSheet";
import { Button } from "@/components/ui/button";
import { Job, JobStatus } from "@/lib/types";

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate-asc");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const loadJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/jobs");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data: Job[] = await res.json();
      setJobs(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load work orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const handleStatusUpdate = (id: string, status: JobStatus) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status } : job))
    );
    setSelectedJob((prev) =>
      prev?.id === id ? { ...prev, status } : prev
    );
  };

  const filteredJobs = jobs
    .filter((j) => {
      if (statusFilter !== "All" && j.status !== statusFilter) return false;
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return (
        j.id.toLowerCase().includes(q) ||
        j.product.toLowerCase().includes(q) ||
        j.customer.toLowerCase().includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "dueDate-asc") return a.dueDate.localeCompare(b.dueDate);
      if (sortBy === "dueDate-desc") return b.dueDate.localeCompare(a.dueDate);
      if (sortBy === "qty-desc") return b.quantity - a.quantity;
      if (sortBy === "qty-asc") return a.quantity - b.quantity;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[var(--border)] bg-[var(--appbar-bg)] px-6 py-3.5 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[var(--surface-2)] border border-[var(--border)] flex items-center justify-center text-[var(--text)]">
            <Factory className="h-4 w-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-[var(--text)]">
            Production Control
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-dim)] font-mono hidden sm:inline-block">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "short",
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </span>
          <ThemeToggle />
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text)]">
            Factory Floor Overview
          </h1>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="h-7 w-7 animate-spin text-[var(--text)]" />
            <p className="text-xs text-[var(--text-dim)] font-mono">
              Loading work orders...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-xl border border-[var(--danger)] bg-[var(--danger-bg)] p-6 max-w-lg mx-auto text-center space-y-3">
            <div className="w-10 h-10 rounded-full bg-[var(--surface)] text-[var(--danger)] flex items-center justify-center mx-auto shadow-sm">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--text)]">
                Failed to load work orders
              </h3>
              <p className="text-xs text-[var(--text-dim)] mt-1">{error}</p>
            </div>
            <Button
              onClick={loadJobs}
              variant="outline"
              size="sm"
              className="gap-2 text-xs bg-[var(--surface)] hover:bg-[var(--surface-2)]"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </Button>
          </div>
        )}

        {!loading && !error && (
          <>
            <MetricCards jobs={jobs} />

            <FilterBar
              search={search}
              onSearchChange={setSearch}
              status={statusFilter}
              onStatusChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalFilteredCount={filteredJobs.length}
              totalCount={jobs.length}
            />

            <JobsTable
              jobs={filteredJobs}
              selectedId={selectedJob?.id ?? null}
              onSelect={setSelectedJob}
            />
          </>
        )}

        {selectedJob && (
          <JobDetailSheet
            job={selectedJob}
            open={!!selectedJob}
            onClose={() => setSelectedJob(null)}
            onStatusUpdate={handleStatusUpdate}
          />
        )}
      </main>
    </div>
  );
}
