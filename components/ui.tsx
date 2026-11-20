import Link from "next/link";
import type { ReactNode } from "react";
import type { Badge } from "@/lib/sections";
import Icon, { type IconName } from "./Icon";
import PageHeader from "./PageHeader";

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

/** Navy page header for the More-tab pages (notes, contacts, tools, A–Z…). */
export function PageTitle({ children, sub, back = { href: "/more", label: "More" } }: { children: ReactNode; sub?: ReactNode; back?: { href: string; label: string } | null }) {
  return <PageHeader back={back ?? undefined} title={children} subtitle={sub} />;
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

export { default as GradeBadge } from "./GradeBadge";
export { default as RowLink } from "./RowLink";

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
