import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#1d4ed8", dark: "#7ab0ff" },
        navy: { 900: "#0c1834", 800: "#132652", 700: "#1a3470" },
        gold: { 300: "#f5d68c", 400: "#e2b24a", 500: "#c99a32" },
        ink: { 950: "#0a0f1c", 900: "#111827" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
