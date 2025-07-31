import { join } from "path";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    join(__dirname, "src/**/*.{ts,tsx,js,jsx}"),
    join(__dirname, "src/app/**/*.{ts,tsx,js,jsx}"),
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",
        secondary: "#6EE7B7",
        accent: "#F59E42",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
