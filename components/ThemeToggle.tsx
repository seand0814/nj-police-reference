"use client";

import { useEffect, useState } from "react";
import Icon, { type IconName } from "./Icon";
import { THEME_KEY, applyTheme, type ThemeChoice } from "@/lib/theme";

function useTheme() {
  const [theme, setTheme] = useState<ThemeChoice>("auto");
  useEffect(() => {
    try {
      setTheme((localStorage.getItem(THEME_KEY) as ThemeChoice) || "auto");
    } catch {}
  }, []);
  // In Auto, follow the phone's light/dark setting as it changes.
  useEffect(() => {
    if (theme !== "auto") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const on = () => applyTheme("auto");
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [theme]);
  function choose(t: ThemeChoice) {
    setTheme(t);
    try {
      localStorage.setItem(THEME_KEY, t);
    } catch {}
    applyTheme(t);
  }
  return { theme, choose };
}

const OPTIONS: { value: ThemeChoice; label: string; icon: IconName }[] = [
  { value: "auto", label: "Auto", icon: "auto" },
  { value: "light", label: "Light", icon: "sun" },
  { value: "dark", label: "Dark", icon: "moon" },
  { value: "night", label: "Night", icon: "eye" },
];

/** Full four-way picker (used on the More page). */
export default function ThemeToggle() {
  const { theme, choose } = useTheme();
  return (
    <div role="radiogroup" aria-label="Appearance" className="grid grid-cols-4 gap-1 rounded-2xl bg-slate-200/70 p-1 dark:bg-slate-800">
      {OPTIONS.map((o) => (
        <button
          key={o.value}
          type="button"
          role="radio"
          aria-checked={theme === o.value}
          onClick={() => choose(o.value)}
          className={
            "flex min-h-[56px] flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold transition " +
            (theme === o.value ? "bg-white text-slate-900 shadow-sm dark:bg-ink-950 dark:text-white" : "text-slate-600 dark:text-slate-300")
          }
        >
          <Icon name={o.icon} size={20} />
          {o.label}
        </button>
      ))}
    </div>
  );
}

/** One-tap Night mode switch (used in the home header). */
export function NightButton() {
  const { theme, choose } = useTheme();
  const on = theme === "night";
  return (
    <button
      type="button"
      onClick={() => choose(on ? "auto" : "night")}
      aria-pressed={on}
      aria-label={on ? "Turn off night mode" : "Turn on night mode"}
      className={
        "flex h-11 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition active:scale-95 " +
        (on ? "border-red-400/60 bg-red-500/20 text-red-200" : "border-white/20 bg-white/10 text-white/90")
      }
    >
      <Icon name="moon" size={16} />
      {on ? "Night on" : "Night"}
    </button>
  );
}
