import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JobStatus } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isOverdue(dueDate: string, status: JobStatus): boolean {
  if (status === "Completed") return false;
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return dueDate < todayStr;
}

export function isDueToday(dueDate: string): boolean {
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  return dueDate === todayStr;
}

export function formatDate(dueDate: string): string {
  const date = new Date(dueDate);
  if (isNaN(date.getTime())) return dueDate;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
