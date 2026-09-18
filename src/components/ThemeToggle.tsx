"use client";

import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="theme-toggle-pill opacity-0" aria-hidden="true">
        <div className="w-[84px] h-[28px]" />
      </div>
    );
  }

  return (
    <div className="theme-toggle-pill" role="group" aria-label="Theme selection">
      <button
        onClick={() => setTheme("light")}
        className={`theme-toggle-btn ${theme === "light" ? "active" : ""}`}
        title="Light Mode"
        type="button"
        aria-pressed={theme === "light"}
      >
        <Sun size={14} />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`theme-toggle-btn ${theme === "dark" ? "active" : ""}`}
        title="Dark Mode"
        type="button"
        aria-pressed={theme === "dark"}
      >
        <Moon size={14} />
      </button>
      <button
        onClick={() => setTheme("system")}
        className={`theme-toggle-btn ${theme === "system" ? "active" : ""}`}
        title="System Theme"
        type="button"
        aria-pressed={theme === "system"}
      >
        <Monitor size={14} />
      </button>
    </div>
  );
}
