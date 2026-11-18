"use client";

import Link from "next/link";
import { useIndex, type IndexItem } from "@/lib/useIndex";
import { KEYS, useStoredList } from "@/lib/useStoredList";
import { DeviceNote, PageTitle } from "@/components/ui";

export default function SavedPage() {
  const { items: ids, loaded } = useStoredList<string>(KEYS.bookmarks);
  const { items: index } = useIndex();
  const byId = new Map<string, IndexItem>((index ?? []).map((i: IndexItem) => [i.id, i] as const));

  return (
    <>
      <PageTitle sub="Tap ☆ on any entry to save it here">Saved</PageTitle>
      <DeviceNote />
      {loaded && ids.length === 0 ? <p className="text-slate-500">No saved entries yet.</p> : null}
      <ul className="space-y-2">
        {ids.map((id) => {
          const it = byId.get(id);
          return (
            <li key={id}>
              <Link href={`/entry/${id}`} className="block rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div className="font-medium">{it?.t ?? id}</div>
                {it?.c ? <div className="text-sm text-slate-500">{it.c}</div> : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
