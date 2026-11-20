"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useIndex, type IndexItem } from "@/lib/useIndex";
import { gradeBadge } from "@/lib/sections";
import { haptic } from "@/lib/haptics";
import Icon from "./Icon";
import { GradeBadge } from "./ui";
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

function Card({ r, starred }: { r: IndexItem; starred?: boolean }) {
  const badge = r.s === "case-law" || r.s === "checklists" ? null : gradeBadge(r.g, r.c);
  return (
    <Link
      href={r.u}
      onClick={() => haptic()}
      className="flex min-h-[76px] w-[10rem] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04]"
    >
      <span className="line-clamp-2 text-[14px] font-semibold leading-snug">{r.t}</span>
      <span className="mt-1.5 flex items-center justify-between gap-1">
        <span className="truncate font-mono text-[11px] text-slate-500">{(r.c || "").replace(/^N\.J\.S\.A\.\s*/, "").replace(/\s*\(as amended.*$/, "")}</span>
        {starred ? <Icon name="starFill" size={13} className="shrink-0 text-gold-400" /> : <GradeBadge badge={badge} />}
      </span>
    </Link>
  );
}

function Strip({ title, rows, starred, action }: { title: string; rows: IndexItem[]; starred?: boolean; action?: React.ReactNode }) {
  return (
    <section className="mb-6">
      <div className="mb-2.5 flex items-end justify-between">
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{title}</h2>
        {action}
      </div>
      <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
        {rows.map((r) => (
          <Card key={r.id} r={r} starred={starred} />
        ))}
      </div>
    </section>
  );
}

/** Your starred entries and recently viewed pages, shown at the top of Home once you have any. */
export default function RecentList() {
  const { items: recent, loaded: l1 } = useStoredList<string>(KEYS.recent);
  const { items: stars, loaded: l2 } = useStoredList<string>(KEYS.bookmarks);
  const { items: index } = useIndex();
  if (!l1 || !l2 || !index || (!recent.length && !stars.length)) return null;
  const byId = new Map(index.map((i) => [i.id, i] as const));
  const starRows = stars.map((id) => byId.get(id)).filter((x): x is IndexItem => !!x);
  const recentRows = recent
    .filter((id) => !stars.includes(id))
    .map((id) => byId.get(id))
    .filter((x): x is IndexItem => !!x)
    .slice(0, 8);
  return (
    <>
      {starRows.length ? (
        <Strip
          title="Starred"
          rows={starRows}
          starred
          action={<Link href="/saved" className="text-sm font-semibold text-brand dark:text-brand-dark">See all</Link>}
        />
      ) : null}
      {recentRows.length ? <Strip title="Jump back in" rows={recentRows} /> : null}
    </>
  );
}
