import Link from "next/link";
import type { ReactNode } from "react";
import type { Badge } from "@/lib/sections";
import Icon, { type IconName } from "./Icon";

export const DISCLAIMER =
  "Reference only. Verify against current statute, AG directives, and your department's policy.";
export const CPR_BANNER = "Follow your current CPR/First Aid certification training.";

export const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm " +
  "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 " +
  "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

export const btnCls =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand px-4 py-2 font-semibold text-white shadow-sm " +
  "active:scale-[0.98] hover:bg-blue-800 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500";

export const btnGhostCls =
  "inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium " +
  "text-slate-700 active:scale-[0.98] hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800";

export function PageTitle({ children, sub }: { children: ReactNode; sub?: ReactNode }) {
  return (
    <header className="mb-4">
      <h1 className="text-2xl font-bold tracking-tight">{children}</h1>
      {sub ? <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{sub}</p> : null}
    </header>
  );
}

export function Card({ href, children }: { href?: string; children: ReactNode }) {
  const cls =
    "block rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900";
  return href ? (
    <Link href={href} className={cls + " active:scale-[0.99] hover:border-brand dark:hover:border-blue-500"}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function GradeBadge({ badge, large }: { badge: Badge | null; large?: boolean }) {
  if (!badge) return null;
  return (
    <span
      className={
        "inline-flex shrink-0 items-center justify-center rounded-full font-bold " +
        (large ? "px-3 py-1 text-sm " : "min-w-[3.25rem] px-2 py-0.5 text-[11px] ") +
        badge.cls
      }
    >
      {badge.label}
    </span>
  );
}

/** A tappable list row: badge, title, citation. */
export function RowLink({
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
  return (
    <Link
      href={href}
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

export function DeviceNote() {
  return (
    <p className="mb-4 flex items-center gap-2 rounded-xl bg-slate-100 p-3 text-xs text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
      <Icon name="lock" size={14} className="shrink-0" /> Saved on this device only. Clearing Safari website data removes it.
    </p>
  );
}

export function BadgeLegend() {
  const items = [
    ["1st°", "bg-red-600 text-white"],
    ["2nd°", "bg-orange-500 text-white"],
    ["3rd°", "bg-amber-400 text-amber-950"],
    ["4th°", "bg-yellow-200 text-yellow-900"],
    ["DP", "bg-blue-500 text-white"],
    ["PDP", "bg-sky-200 text-sky-900"],
    ["MV", "bg-slate-600 text-white"],
  ];
  return (
    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
      {items.map(([l, c]) => (
        <span key={l} className={"rounded-full px-2 py-0.5 font-bold " + c}>{l}</span>
      ))}
      <span className="ml-1 inline-flex items-center gap-1 text-slate-500">
        <span className="h-2 w-2 rounded-full bg-amber-500" /> under review
      </span>
    </div>
  );
}
