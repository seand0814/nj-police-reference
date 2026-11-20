import type { Metadata } from "next";
import Link from "next/link";
import { allChecklists, allComparisons } from "@/lib/content";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = { title: "Which Charge? · NJ Police Reference" };

const CARD =
  "flex min-h-[64px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.04]";

export default function ComparePage() {
  const helpers = allChecklists().filter((c) => c.id.startsWith("which-") && c.sections.includes("criminal-code"));
  const comps = allComparisons();
  return (
    <>
      <PageHeader
        back={{ href: "/", label: "Home" }}
        icon="help"
        iconBg="bg-emerald-600"
        eyebrow="Charge helpers"
        title="Which Charge Fits?"
        subtitle="Answer a few yes/no questions, or compare similar charges side by side."
      />

      <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Answer questions</h2>
      <div className="mb-7 grid grid-cols-2 gap-2.5">
        {helpers.map((c) => (
          <Link key={c.id} href={`/go/${c.id}`} className="flex min-h-[104px] flex-col justify-between rounded-2xl bg-gradient-to-br from-navy-800 to-navy-900 p-3.5 text-white shadow-md active:scale-[0.98]">
            <Icon name="branch" size={20} className="text-gold-300" />
            <span>
              <span className="block font-semibold leading-tight">{c.title}</span>
              <span className="mt-0.5 block text-xs leading-snug text-white/70">{c.summary}</span>
            </span>
          </Link>
        ))}
      </div>

      <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Side by side</h2>
      <div className="space-y-2">
        {comps.map((c) => (
          <Link key={c.id} href={`/compare/${c.id}`} className={CARD}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
              <Icon name="compare" size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold leading-tight">{c.title}</span>
              <span className="block text-xs text-slate-500 dark:text-slate-400">{c.summary}</span>
            </span>
            <Icon name="chevronRight" size={18} className="text-slate-400" />
          </Link>
        ))}
      </div>
    </>
  );
}
