"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useIndex, type IndexItem } from "@/lib/useIndex";
import { PageTitle, inputCls } from "@/components/ui";

const norm = (s: string) => s.toLowerCase().replace(/n\.?j\.?s\.?a\.?/g, "").replace(/\s+/g, " ").trim();

function score(item: IndexItem, terms: string[]) {
  const title = norm(item.t);
  const cite = norm(item.c);
  const rest = norm(`${item.k} ${item.g} ${item.x}`);
  let s = 0;
  for (const term of terms) {
    if (cite.includes(term)) s += cite.startsWith(term) || cite.includes(" " + term) ? 12 : 8;
    else if (title.includes(term)) s += title.startsWith(term) ? 10 : 6;
    else if (rest.includes(term)) s += 1;
    else return 0; // every term must match somewhere
  }
  return s;
}

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
      .slice(0, 60)
      .map((r) => r.it);
  }, [items, q]);

  return (
    <>
      <PageTitle sub="Titles, citations, grades and key points">Search</PageTitle>
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="e.g. shoplifting, 2C:20-11, careless"
        className={inputCls}
        autoFocus
        enterKeyHint="search"
      />
      {error ? <p className="mt-3 text-sm text-red-600">Could not load search. Check your connection and reload.</p> : null}
      {!items && !error ? <p className="mt-3 text-sm text-slate-500">Loading…</p> : null}
      {q && items ? <p className="mt-3 text-sm text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</p> : null}
      <ul className="mt-3 space-y-2">
        {results.map((r) => (
          <li key={r.id}>
            <Link href={`/entry/${r.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="font-medium">{r.t}</div>
              <div className="text-sm text-slate-500">{[r.c, r.k].filter(Boolean).join(" · ")}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
