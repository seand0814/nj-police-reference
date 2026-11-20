"use client";

import Link from "next/link";
import GradeBadge from "./GradeBadge";
import Icon, { type IconName } from "./Icon";
import RowActions from "./RowActions";
import type { Badge } from "@/lib/sections";
import { openSheet } from "@/lib/sheet";
import { useLongPress } from "@/lib/useLongPress";

/** A tappable list row: badge, title, citation. */
export default function RowLink({
  href,
  title,
  citation,
  badge,
  review,
  icon,
}: {
  href: string;
  title: string;
  citation?: string;
  badge?: Badge | null;
  review?: boolean;
  icon?: IconName;
}) {
  const press = useLongPress(() => openSheet(<RowActions href={href} title={title} citation={citation} badge={badge} />));
  return (
    <Link
      href={href}
      {...press}
      className="flex min-h-[56px] items-center gap-3 px-4 py-2.5 active:bg-slate-100 dark:active:bg-white/5"
    >
      {icon ? (
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-600/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-400">
          <Icon name={icon} size={17} />
        </span>
      ) : null}
      <span className="min-w-0 flex-1">
        <span className="block font-medium leading-snug">{title}</span>
        {citation ? <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{citation}</span> : null}
      </span>
      {review ? <span title="Grade under review" aria-label="Grade under review" className="h-2 w-2 shrink-0 rounded-full bg-amber-500" /> : null}
      <GradeBadge badge={badge ?? null} />
      <Icon name="chevronRight" size={16} className="shrink-0 text-slate-300 dark:text-slate-600" />
    </Link>
  );
}

