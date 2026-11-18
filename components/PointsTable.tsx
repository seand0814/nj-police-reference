"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { inputCls } from "./ui";

export type PointsRow = { id: string; cite: string; title: string; points: number | null; pointsText: string; penalty: string };

export default function PointsTable({ rows }: { rows: PointsRow[] }) {
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"points" | "cite">("points");
  const collator = useMemo(() => new Intl.Collator("en", { numeric: true }), []);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    const list = rows.filter((r) => !t || `${r.cite} ${r.title}`.toLowerCase().includes(t));
    return [...list].sort((a, b) =>
      sort === "points" ? (b.points ?? -1) - (a.points ?? -1) || collator.compare(a.cite, b.cite) : collator.compare(a.cite, b.cite)
    );
  }, [rows, q, sort, collator]);

  return (
    <div>
      <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Filter, e.g. speed, 4-97, signal" className={inputCls} />
      <div className="mt-3 grid grid-cols-2 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        {(["points", "cite"] as const).map((s) => (
          <button key={s} type="button" onClick={() => setSort(s)} aria-pressed={sort === s}
            className={"min-h-[40px] rounded-lg text-sm font-semibold " + (sort === s ? "bg-white shadow dark:bg-slate-950" : "text-slate-600 dark:text-slate-300")}>
            {s === "points" ? "Most points first" : "By statute"}
          </button>
        ))}
      </div>
      <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
        {shown.map((r) => (
          <li key={r.id}>
            <Link href={`/entry/${r.id}`} className="flex min-h-[60px] items-center gap-3 px-4 py-2.5 active:bg-slate-100 dark:active:bg-slate-800">
              <span className={"flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl text-sm font-extrabold leading-none " +
                (r.points === null ? "bg-slate-100 text-slate-500 dark:bg-slate-800" : r.points >= 5 ? "bg-red-600 text-white" : r.points >= 3 ? "bg-orange-500 text-white" : "bg-amber-300 text-amber-950")}>
                {r.points === null ? "—" : r.points}
                <span className="text-[9px] font-semibold">{r.points === null ? "" : "pts"}</span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-medium leading-snug">{r.title}</span>
                <span className="block truncate text-xs text-slate-500">{r.cite}{r.pointsText ? ` · ${r.pointsText}` : ""}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
