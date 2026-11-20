"use client";

import Link from "next/link";
import type { Step } from "@/lib/content";
import { KEYS, useStoredList } from "@/lib/useStoredList";
import { haptic } from "@/lib/haptics";

type Props = { id: string; groups: { name: string; steps: Step[] }[] };

/** Tap-to-check list. Checks are kept on this device so a call can be resumed. */
export default function ChecklistView({ id, groups }: Props) {
  const { items: done, save } = useStoredList<string>(KEYS.checks + id);
  const total = groups.reduce((n, g) => n + g.steps.length, 0);
  const count = done.length;
  const pct = total ? Math.round((count / total) * 100) : 0;

  function toggle(key: string) {
    haptic();
    save(done.includes(key) ? done.filter((k) => k !== key) : [...done, key]);
  }

  return (
    <div>
      <div className="sticky top-[calc(2.75rem+env(safe-area-inset-top))] z-10 -mx-4 mb-4 bg-[#f4f6fa]/95 px-4 py-3 backdrop-blur dark:bg-ink-950/95">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold">{count} of {total} done</span>
          <button type="button" onClick={() => save([])} className="rounded-lg px-3 py-1 text-sm font-medium text-brand dark:text-brand-dark">
            Reset
          </button>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="space-y-4">
        {groups.map((g, gi) => (
          <section key={g.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 text-sm font-bold dark:bg-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-xs text-white">{gi + 1}</span>
              {g.name}
            </h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {g.steps.map((s, si) => {
                const key = `${gi}.${si}`;
                const on = done.includes(key);
                return (
                  <li key={key} className="flex items-start gap-3 px-4 py-3">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={on}
                      aria-label={s.text}
                      onClick={() => toggle(key)}
                      className={
                        "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 text-sm font-bold transition " +
                        (on ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 dark:border-slate-600")
                      }
                    >
                      {on ? "✓" : ""}
                    </button>
                    <div className="min-w-0 flex-1">
                      <button type="button" onClick={() => toggle(key)} className={"text-left leading-snug " + (on ? "text-slate-400 line-through" : "")}>
                        {s.text}
                      </button>
                      {s.detail ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{s.detail}</p> : null}
                      {s.link ? (
                        <Link href={s.link} className="mt-1 inline-block text-sm font-medium text-brand dark:text-brand-dark">
                          Open reference ›
                        </Link>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
