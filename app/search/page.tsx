"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useIndex, type IndexItem } from "@/lib/useIndex";
import { cleanSpoken, prepare, rescue, search } from "@/lib/searchLogic";
import { gradeBadge } from "@/lib/sections";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import VoiceButton from "@/components/VoiceButton";
import { RowLink } from "@/components/ui";

const SUGGESTIONS = ["shoplifting", "2C:12-1", "DUI", "hit and run", "TRO", "resisting", "weed", "consent search"];

const FILTERS: { id: string; label: string; match: (s: string) => boolean }[] = [
  { id: "all", label: "All", match: () => true },
  { id: "crimes", label: "Crimes", match: (s) => s === "criminal-code" },
  { id: "mv", label: "Motor Vehicle", match: (s) => s === "motor-vehicle" },
  { id: "cases", label: "Case Law", match: (s) => s === "case-law" },
  { id: "go", label: "Go-Bys", match: (s) => s === "checklists" },
  { id: "other", label: "Other", match: (s) => !["criminal-code", "motor-vehicle", "case-law", "checklists"].includes(s) },
];

const STATE_KEY = "njpr.search";

function iconFor(id: string) {
  if (id.startsWith("cmp:")) return "compare" as const;
  if (id.startsWith("go:")) return "checklist" as const;
  return undefined;
}

function badgeFor(r: IndexItem) {
  if (r.s === "case-law" || r.s === "checklists") return null;
  return gradeBadge(r.g, r.c);
}

export default function SearchPage() {
  const { items, error } = useIndex();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("all");

  // Coming back from a result restores the search you had.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(STATE_KEY) || "null");
      if (saved) {
        setQ(saved.q ?? "");
        setFilter(saved.filter ?? "all");
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      sessionStorage.setItem(STATE_KEY, JSON.stringify({ q, filter }));
    } catch {}
  }, [q, filter]);

  const prepared = useMemo(() => (items ? prepare(items) : null), [items]);
  const found = useMemo(() => (prepared && q.trim() ? (search(prepared, q) as IndexItem[]) : []), [prepared, q]);
  const fix = useMemo(() => (prepared && q.trim() && !found.length ? rescue(prepared, q) : null), [prepared, q, found.length]);
  const all = found.length ? found : ((fix?.results as IndexItem[]) ?? []);

  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f.id, all.filter((r) => f.match(r.s)).length])), [all]);
  // A filter with no matches for the current words falls back to All.
  const active = (counts[filter] && FILTERS.find((f) => f.id === filter)) || FILTERS[0];
  const results = all.filter((r) => active.match(r.s));

  return (
    <>
      <PageHeader eyebrow="Charges, citations, grades, go-bys" title="Search">
        <div className="relative mt-4">
          <Icon name="search" size={20} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type or tap the mic"
            aria-label="Search"
            className="h-[54px] w-full rounded-2xl border-0 bg-white pl-12 pr-14 text-[17px] text-slate-900 shadow-xl shadow-black/20 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-gold-400"
            autoFocus
            enterKeyHint="search"
          />
          <VoiceButton onText={(t) => setQ(cleanSpoken(t))} />
        </div>
      </PageHeader>

      {q && all.length ? (
        <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4">
          {FILTERS.map((f) =>
            f.id === "all" || counts[f.id] ? (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={active.id === f.id}
                className={
                  "flex min-h-[38px] shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold active:scale-95 " +
                  (active.id === f.id
                    ? "border-navy-800 bg-navy-800 text-white dark:border-gold-400 dark:bg-gold-400 dark:text-navy-900"
                    : "border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200")
                }
              >
                {f.label}
                <span className={"text-xs " + (active.id === f.id ? "opacity-80" : "text-slate-400")}>{counts[f.id]}</span>
              </button>
            ) : null
          )}
        </div>
      ) : null}

      {error ? <p className="mt-3 text-sm text-red-600">Could not load search. Check your connection and reload.</p> : null}
      {!items && !error ? <p className="mt-3 text-sm text-slate-500">Loading…</p> : null}

      {!q ? (
        <>
          <p className="mb-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Try</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQ(s)}
                className="min-h-[40px] rounded-full border border-slate-200 bg-white px-4 text-sm font-medium shadow-sm active:scale-95 dark:border-white/10 dark:bg-white/[0.04]"
              >
                {s}
              </button>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
            Typos, shorthand (DUI, TRO, DWS, PWID) and plain English (&ldquo;assault on a police officer&rdquo;) all work.{" "}
            <Link href="/az" className="font-semibold text-brand dark:text-brand-dark">Browse A–Z</Link>
          </p>
        </>
      ) : null}

      {q && items && !found.length && fix ? (
        <div className="mb-3 rounded-2xl border border-gold-400/40 bg-gold-300/15 p-3 text-sm">
          {fix.kind === "spelling" ? (
            <>
              No results for &ldquo;{q}&rdquo;. Did you mean{" "}
              <button type="button" onClick={() => setQ(fix.query)} className="font-bold text-navy-800 underline dark:text-gold-300">
                {fix.query}
              </button>
              ? Showing those results.
            </>
          ) : (
            <>Nothing matched every word. Showing the closest matches.</>
          )}
        </div>
      ) : null}

      {q && items && !all.length ? (
        <div className="mt-6 text-center">
          <p className="font-semibold">No results for &ldquo;{q}&rdquo;</p>
          <p className="mt-1 text-sm text-slate-500">Try fewer words, a statute number, or ask the AI.</p>
          <Link href="/ask" className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-navy-800 px-4 font-semibold text-white">
            <Icon name="chat" size={18} /> Ask AI instead
          </Link>
        </div>
      ) : null}

      {results.length ? (
        <>
          <p className="mb-2 text-xs text-slate-500">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:divide-white/5 dark:border-white/10 dark:bg-white/[0.04]">
            {results.map((r) => (
              <li key={r.id}>
                <RowLink href={r.u} title={r.t} citation={[r.c, r.k].filter(Boolean).join(" · ")} icon={iconFor(r.id)} badge={badgeFor(r)} />
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </>
  );
}
