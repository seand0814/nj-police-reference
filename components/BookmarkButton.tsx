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
      className="min-h-[44px] min-w-[44px] shrink-0 rounded-xl border border-white/40 bg-white/15 text-xl text-white active:scale-95"
    >
      {on ? "★" : "☆"}
    </button>
  );
}
