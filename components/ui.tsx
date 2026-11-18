import Link from "next/link";
import type { ReactNode } from "react";

export const DISCLAIMER =
  "Reference only. Verify against current statute, AG directives, and your department's policy.";
export const CPR_BANNER = "Follow your current CPR/First Aid certification training.";

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 " +
  "focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30 " +
  "dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

export const btnCls =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg bg-brand px-4 py-2 font-semibold text-white " +
  "hover:bg-blue-800 disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-500";

export const btnGhostCls =
  "inline-flex min-h-[44px] items-center justify-center rounded-lg border border-slate-300 px-4 py-2 font-medium " +
  "text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800";

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
    "block rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900";
  return href ? (
    <Link href={href} className={cls + " hover:border-brand dark:hover:border-blue-500"}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}

export function DeviceNote() {
  return (
    <p className="mb-4 rounded-lg bg-slate-100 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400">
      Saved on this device only. Clearing Safari website data removes it.
    </p>
  );
}
