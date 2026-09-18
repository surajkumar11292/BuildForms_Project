"use client";

import { Search, X, ArrowUpDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  totalFilteredCount?: number;
  totalCount?: number;
}

const sortLabels: Record<string, string> = {
  "dueDate-asc": "Due Date (Earliest)",
  "dueDate-desc": "Due Date (Latest)",
  "qty-desc": "Quantity (High to Low)",
  "qty-asc": "Quantity (Low to High)",
};

const statusLabels: Record<string, string> = {
  All: "All Statuses",
  Pending: "Pending",
  "In Progress": "In Progress",
  Delayed: "Delayed",
  Completed: "Completed",
};

export function FilterBar({
  search,
  onSearchChange,
  status,
  onStatusChange,
  sortBy,
  onSortChange,
  totalFilteredCount,
  totalCount,
}: FilterBarProps) {
  const isFiltered = search.trim() !== "" || status !== "All";

  const handleReset = () => {
    onSearchChange("");
    onStatusChange("All");
    onSortChange("dueDate-asc");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-faint)] pointer-events-none" />
        <Input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Filter work orders..."
          className="pl-9 pr-8 h-9 text-sm bg-[var(--surface)] border-[var(--border)] text-[var(--text)] placeholder:text-[var(--text-faint)] focus-visible:ring-1 focus-visible:ring-[var(--ring)]"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-faint)] hover:text-[var(--text)] p-0.5 rounded transition-colors"
            title="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex items-center gap-1.5">
          <Filter className="h-3.5 w-3.5 text-[var(--text-faint)] hidden sm:inline-block" />
          <Select value={status} onValueChange={(val) => onStatusChange(val || "All")}>
            <SelectTrigger className="h-9 min-w-[140px] text-xs bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
              <SelectValue placeholder="All Statuses">
                {statusLabels[status] ?? "All Statuses"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
              <SelectItem value="All">All Statuses</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Delayed">Delayed</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-1.5">
          <ArrowUpDown className="h-3.5 w-3.5 text-[var(--text-faint)] hidden sm:inline-block" />
          <Select value={sortBy} onValueChange={(val) => onSortChange(val || "dueDate-asc")}>
            <SelectTrigger className="h-9 min-w-[175px] text-xs bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
              <SelectValue placeholder="Sort order">
                {sortLabels[sortBy] ?? "Sort order"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-[var(--surface)] border-[var(--border)] text-[var(--text)]">
              <SelectItem value="dueDate-asc">Due Date (Earliest)</SelectItem>
              <SelectItem value="dueDate-desc">Due Date (Latest)</SelectItem>
              <SelectItem value="qty-desc">Quantity (High to Low)</SelectItem>
              <SelectItem value="qty-asc">Quantity (Low to High)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="h-9 text-xs text-[var(--text-dim)] hover:text-[var(--text)] hover:bg-[var(--surface-2)]"
          >
            Reset
          </Button>
        )}

        {typeof totalFilteredCount === "number" && typeof totalCount === "number" && (
          <div className="text-xs text-[var(--text-faint)] font-mono ml-1 hidden md:block">
            {totalFilteredCount} of {totalCount} jobs
          </div>
        )}
      </div>
    </div>
  );
}
