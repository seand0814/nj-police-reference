"use client";

import { useMemo, useState } from "react";
import { useIndex, type IndexItem } from "@/lib/useIndex";
import { PageTitle, RowLink, inputCls } from "@/components/ui";

const norm = (s: string) => s.toLowerCase().replace(/n\.?j\.?s\.?a\.?/g, "").replace(/\s+/g, " ").trim();

function score(item: IndexItem, terms: string[]) {
  const title = norm(item.t);
  const cite = norm(item.c);
  const rest = norm(`${item.k} ${item.g} ${item.x}`);
  let s = item.id.startsWith("go:") ? 2 : 0;
  for (const term of terms) {
    if (cite.includes(term)) s += cite.startsWith(term) || cite.includes(" " + term) ? 12 : 8;
    else if (title.includes(term)) s += title.startsWith(term) ? 10 : 6;
    else if (rest.includes(term)) s += 1;
    else return 0; // every term must match somewhere
  }
  return s;
}

const SUGGESTIONS = ["shoplifting", "2C:12-1", "DWI", "careless", "domestic violence", "resisting", "seat belt", "consent search"];

export default function SearchPage() {
  const { items, error } = useIndex();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const terms = norm(q).split(" ").filter(Boolean);
    if (!items || terms.length === 0) return [];
    return items
      .map((it) => ({ it, s: score(it, terms) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 80)
      .map((r) => r.it);
  }, [items, q]);

  return (
    <>
      <PageTitle sub="Charges, citations, grades, checklists">Search</PageTitle>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. shoplifting, 2C:20-11, careless"
        className={inputCls + " text-lg"}
        autoFocus
        enterKeyHint="search"
      />
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
