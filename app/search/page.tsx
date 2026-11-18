"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useIndex } from "@/lib/useIndex";
import { prepare, search } from "@/lib/searchLogic";
import { PageTitle, RowLink, inputCls } from "@/components/ui";

const SUGGESTIONS = ["shoplifting", "2C:12-1", "DUI", "hit and run", "TRO", "resisting", "weed", "consent search"];

export default function SearchPage() {
  const { items, error } = useIndex();
  const [q, setQ] = useState("");

  const prepared = useMemo(() => (items ? prepare(items) : null), [items]);
  const results = useMemo(() => (prepared && q.trim() ? search(prepared, q) : []), [prepared, q]);

  return (
    <>
      <PageTitle sub="Charges, citations, grades, checklists">Search</PageTitle>
      <div className="sticky top-0 z-10 -mx-4 bg-slate-50/95 px-4 py-2 backdrop-blur dark:bg-slate-950/95">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. shoplifting, 2C:20-11, careless"
        className={inputCls + " text-lg"}
        autoFocus
        enterKeyHint="search"
      />
      </div>
      <p className="mt-1 text-xs text-slate-500">
        Typos and shorthand work (DUI, TRO, DWS, PWID). Prefer to browse? <Link href="/az" className="font-medium text-brand dark:text-brand-dark">A–Z index ›</Link>
      </p>
      {error ? <p className="mt-3 text-sm text-red-600">Could not load search. Check your connection and reload.</p> : null}
      {!items && !error ? <p className="mt-3 text-sm text-slate-500">Loading…</p> : null}

      {!q ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => setQ(s)} className="min-h-[40px] rounded-full bg-slate-200 px-4 text-sm font-medium dark:bg-slate-800">
              {s}
            </button>
          ))}
        </div>
      ) : null}

      {q && items ? <p className="mt-3 text-sm text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</p> : null}
      {results.length ? (
        <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {results.map((r) => (
            <li key={r.id}>
              <RowLink href={r.u} title={r.t} citation={[r.c, r.k].filter(Boolean).join(" · ")} icon={r.id.startsWith("go:") ? "✅" : undefined} />
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}
