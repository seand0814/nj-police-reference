"use client";

import { useIndex, type IndexItem } from "@/lib/useIndex";
import { KEYS, useStoredList } from "@/lib/useStoredList";
import { DeviceNote, PageTitle, RowLink } from "@/components/ui";

export default function SavedPage() {
  const { items: ids, loaded } = useStoredList<string>(KEYS.bookmarks);
  const { items: index } = useIndex();
  const byId = new Map<string, IndexItem>((index ?? []).map((i: IndexItem) => [i.id, i] as const));

  return (
    <>
      <PageTitle sub="Tap the star on any entry to save it here">Saved</PageTitle>
      <DeviceNote />
      {loaded && ids.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700">
          <p className="text-3xl">⭐</p>
          <p className="mt-2">No saved entries yet.</p>
        </div>
      ) : null}
      {ids.length ? (
        <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {ids.map((id) => {
            const it = byId.get(id);
            return (
              <li key={id}>
                <RowLink href={it?.u ?? `/entry/${id}`} title={it?.t ?? id} citation={it?.c} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </>
  );
}
