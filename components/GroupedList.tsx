"use client";

import { useEffect, useMemo, useState } from "react";
import type { Group } from "@/lib/content";
import { KEYS } from "@/lib/useStoredList";
import { RowLink, inputCls } from "./ui";

type Props = {
  byType: Group[];
  byChapter?: Group[];
  typeLabel?: string;
  chapterLabel?: string;
  placeholder?: string;
  /** Open every group by default (good for short sections). */
  openAll?: boolean;
};

export default function GroupedList({
  byType,
  byChapter,
  typeLabel = "By offense type",
  chapterLabel = "By chapter",
  placeholder = "Filter this section…",
  openAll,
}: Props) {
  const [view, setView] = useState<"type" | "chapter">("type");
  const [q, setQ] = useState("");

  // Remember the user's preferred Criminal Code view on this device.
  useEffect(() => {
    if (!byChapter) return;
    try {
      const saved = window.localStorage.getItem(KEYS.ccView);
      if (saved === "chapter" || saved === "type") setView(saved);
    } catch {}
  }, [byChapter]);

  function choose(v: "type" | "chapter") {
    setView(v);
    try {
      window.localStorage.setItem(KEYS.ccView, v);
    } catch {}
  }

  const groups = view === "chapter" && byChapter ? byChapter : byType;
  const term = q.trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!term) return groups;
    return groups
      .map((g) => ({
        ...g,
        rows: g.rows.filter((r) => `${r.title} ${r.citation}`.toLowerCase().includes(term) || g.name.toLowerCase().includes(term)),
      }))
      .filter((g) => g.rows.length);
  }, [groups, term]);

  return (
    <div>
      {byChapter ? (
        <div role="tablist" aria-label="Organize by" className="mb-3 grid grid-cols-2 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
          {(["type", "chapter"] as const).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => choose(v)}
              className={
                "min-h-[40px] rounded-lg text-sm font-semibold transition " +
                (view === v ? "bg-white text-slate-900 shadow dark:bg-slate-950 dark:text-white" : "text-slate-600 dark:text-slate-300")
              }
            >
              {v === "type" ? typeLabel : chapterLabel}
            </button>
          ))}
        </div>
      ) : null}

      <div className="sticky top-0 z-10 -mx-4 bg-slate-50/95 px-4 py-2 backdrop-blur dark:bg-slate-950/95">
        <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={placeholder} className={inputCls} />
      </div>

      {term && filtered.length === 0 ? <p className="mt-4 text-sm text-slate-500">No matches in this section.</p> : null}

      <div className="mt-4 space-y-3">
        {filtered.map((g) => (
          <details
            key={view + g.name}
            open={!!term || openAll || filtered.length === 1}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <summary className="flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
              <span>{g.name}</span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {g.rows.length}
                </span>
                <span aria-hidden className="text-slate-400 transition group-open:rotate-90">›</span>
              </span>
            </summary>
            <ul className="divide-y divide-slate-100 border-t border-slate-100 dark:divide-slate-800 dark:border-slate-800">
              {g.rows.map((r) => (
                <li key={r.id}>
                  <RowLink
                    href={r.href}
                    title={r.title}
                    citation={r.citation}
                    badge={r.badge}
                    review={r.review}
                    icon={r.kind === "flow" ? "🔀" : r.kind === "checklist" ? "☑️" : r.kind === "template" ? "📝" : undefined}
                  />
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
