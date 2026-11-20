import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allComparisons, getComparison, getEntry } from "@/lib/content";
import { gradeBadge } from "@/lib/sections";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import ShareButton from "@/components/ShareButton";
import { DISCLAIMER, GradeBadge } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return allComparisons().map((c) => ({ id: c.id }));
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = getComparison((await params).id);
  return { title: c ? `${c.title} · NJ Police Reference` : "Not found" };
}

export default async function ComparisonPage({ params }: { params: Params }) {
  const c = getComparison((await params).id);
  if (!c) notFound();
  const n = c.charges.length;
  const shareText = [
    c.title,
    ...c.rows.filter((r) => r.decider).map((r) => `${r.label}: ` + c.charges.map((ch, i) => `${ch.label} – ${r.cells[i]}`).join(" | ")),
    c.tip ?? "",
    "Quick reference only. Verify against the statute.",
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <PageHeader
        back={{ href: "/compare", label: "Which charge?" }}
        eyebrow="Side by side"
        title={c.title}
        subtitle={c.summary}
        actions={<ShareButton title={c.title} text={shareText} path={`/compare/${c.id}`} />}
      />

      {/* Charge headers: tap to open the full entry */}
      <div className={"sticky top-[calc(2.75rem+env(safe-area-inset-top))] z-10 -mx-4 mb-3 grid gap-2 bg-[#f4f6fa]/95 px-4 py-2 backdrop-blur dark:bg-ink-950/95 " + (n === 3 ? "grid-cols-3" : "grid-cols-2")}>
        {c.charges.map((ch, i) => {
          const e = getEntry(ch.entry);
          return (
            <Link
              key={i}
              href={`/entry/${ch.entry}`}
              className="flex min-h-[58px] flex-col justify-center rounded-xl border border-slate-200/80 bg-white px-2.5 py-1.5 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.06]"
            >
              <span className="text-[13px] font-bold leading-tight">{ch.label}</span>
              <span className="mt-0.5 flex items-center gap-1 font-mono text-[10.5px] text-slate-500">
                {ch.cite}
                {n < 3 && e ? <GradeBadge badge={gradeBadge(e.grade_or_penalty, e.citation)} /> : null}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="space-y-2.5">
        {c.rows.map((r, ri) => (
          <section
            key={ri}
            className={
              "overflow-hidden rounded-2xl border shadow-sm " +
              (r.decider
                ? "border-gold-400/70 bg-gold-300/10 dark:border-gold-400/40 dark:bg-gold-400/[0.06]"
                : "border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.04]")
            }
          >
            <h2 className="flex items-center gap-2 px-3.5 pt-3 text-[12px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
              {r.label}
              {r.decider ? (
                <span className="rounded-full bg-gold-400 px-2 py-0.5 text-[10px] font-bold tracking-wide text-navy-900">Deciding factor</span>
              ) : null}
            </h2>
            <div className={"grid gap-px p-1.5 " + (n === 3 ? "grid-cols-3" : "grid-cols-2")}>
              {r.cells.map((cell, i) => (
                <p key={i} className="px-2 py-1.5 text-[13.5px] leading-snug">
                  {cell}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      {c.tip ? (
        <p className="mt-4 flex gap-2.5 rounded-2xl bg-navy-800 p-4 text-sm leading-relaxed text-white">
          <Icon name="badge" size={20} className="shrink-0 text-gold-300" />
          <span>{c.tip}</span>
        </p>
      ) : null}

      {c.flow ? (
        <Link
          href={`/go/${c.flow}`}
          className="mt-3 flex min-h-[56px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.04]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white"><Icon name="branch" size={18} /></span>
          <span className="flex-1 font-semibold">Still not sure? Answer a few questions</span>
          <Icon name="chevronRight" size={18} className="text-slate-400" />
        </Link>
      ) : null}

      <p className="mt-6 rounded-2xl bg-slate-100 p-4 text-xs text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
        {c.note} {DISCLAIMER}
      </p>
    </>
  );
}
