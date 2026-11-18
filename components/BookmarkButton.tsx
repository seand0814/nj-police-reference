"use client";

import { KEYS, useStoredList } from "@/lib/useStoredList";

export default function BookmarkButton({ id }: { id: string }) {
  const { items, save, loaded } = useStoredList<string>(KEYS.bookmarks);
  const on = items.includes(id);
  return (
    <button
      type="button"
      disabled={!loaded}
      onClick={() => save(on ? items.filter((x) => x !== id) : [id, ...items])}
      aria-label={on ? "Remove from Saved" : "Save"}
      aria-pressed={on}
      className="min-h-[44px] min-w-[44px] shrink-0 rounded-lg border border-slate-300 text-xl dark:border-slate-700"
    >
      {on ? "★" : "☆"}
    </button>
  );
}
