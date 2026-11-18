"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useIndex } from "@/lib/useIndex";
import { KEYS, useStoredList } from "@/lib/useStoredList";

/** Records a visit (call from an entry or go-by page). */
export function RecordVisit({ id }: { id: string }) {
  const { items, save, loaded } = useStoredList<string>(KEYS.recent);
  useEffect(() => {
    if (!loaded) return;
    if (items[0] === id) return;
    save([id, ...items.filter((x) => x !== id)].slice(0, 12));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loaded, id]);
  return null;
}

/** Horizontal strip of recently viewed entries for the home page. */
export default function RecentList() {
  const { items: ids, loaded } = useStoredList<string>(KEYS.recent);
  const { items: index } = useIndex();
  if (!loaded || ids.length === 0 || !index) return null;
  const byId = new Map(index.map((i) => [i.id, i] as const));
  const rows = ids.map((id) => byId.get(id)).filter((x) => x !== undefined);
  if (!rows.length) return null;
  return (
    <section className="mb-6">
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Recently viewed</h2>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {rows.map((r) => (
          <Link
            key={r!.id}
            href={r!.u}
            className="flex min-h-[60px] w-40 shrink-0 flex-col justify-center rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="line-clamp-2 text-sm font-medium leading-snug">{r!.t}</span>
            {r!.c ? <span className="truncate text-[11px] text-slate-500">{r!.c}</span> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
