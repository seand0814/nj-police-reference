"use client";

import { KEYS, useStoredList } from "@/lib/useStoredList";
import Icon from "./Icon";

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
      className={
        "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border active:scale-95 " +
        (on ? "border-gold-400/60 bg-gold-400/20 text-gold-300" : "border-white/25 bg-white/10 text-white")
      }
    >
      <Icon name={on ? "starFill" : "star"} size={20} />
    </button>
  );
}
