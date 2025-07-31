"use client";

import { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function ThemeToggle() {
  /** This is a public component to switch between dark and light modes. */
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  // PUBLIC_INTERFACE
  function toggleTheme() {
    setTheme((t) => {
      const newTheme = t === "light" ? "dark" : "light";
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newTheme;
    });
  }

  return (
    <button
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-background border border-foreground/10 shadow-sm hover:bg-primary hover:text-white dark:hover:bg-secondary dark:hover:text-foreground transition-colors"
      onClick={toggleTheme}
      type="button"
    >
      {theme === "light" ? (
        <>
          <span aria-hidden="true">🌙</span> Dark
        </>
      ) : (
        <>
          <span aria-hidden="true">☀️</span> Light
        </>
      )}
    </button>
  );
}
