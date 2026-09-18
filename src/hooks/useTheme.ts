"use client";

import { useEffect, useState, useCallback } from "react";

export type Theme = "light" | "dark" | "system";

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("system");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem("pcd-theme") as Theme) || "system";
    setTheme(saved);
    setMounted(true);
  }, []);

  const applyTheme = useCallback((t: Theme) => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (t === "dark") {
      root.classList.add("dark");
    } else if (t === "light") {
      root.classList.add("light");
    } else {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.matches) {
        root.classList.add("dark");
      }
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    applyTheme(theme);
    localStorage.setItem("pcd-theme", theme);

    if (theme === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => {
        applyTheme("system");
      };

      if (mq.addEventListener) {
        mq.addEventListener("change", handler);
      } else if ((mq as any).addListener) {
        (mq as any).addListener(handler);
      }

      return () => {
        if (mq.removeEventListener) {
          mq.removeEventListener("change", handler);
        } else if ((mq as any).removeListener) {
          (mq as any).removeListener(handler);
        }
      };
    }
  }, [theme, mounted, applyTheme]);

  return { theme, setTheme, mounted };
}
