"use client";

import Link from "next/link";
import RowActions from "./RowActions";
import type { Badge } from "@/lib/sections";
import { haptic } from "@/lib/haptics";
import { openSheet } from "@/lib/sheet";

type Item = { id: string; title: string; citation: string; badge: Badge | null; points: string[] };

/** Related entries: tap for a quick preview sheet instead of leaving the page. */
export default function RelatedChips({ items }: { items: Item[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((r) => (
        <li key={r.id}>
          <Link
            href={`/entry/${r.id}`}
            onClick={(e) => {
              e.preventDefault();
              haptic();
              openSheet(<RowActions href={`/entry/${r.id}`} title={r.title} citation={r.citation} badge={r.badge} points={r.points} />);
            }}
            className="inline-flex min-h-[40px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-navy-800 shadow-sm active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100"
          >
            {r.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
