import Link from "next/link";
import { allChecklists, allEntries, getEntry, sectionCounts } from "@/lib/content";
import { gradeBadge } from "@/lib/sections";
import Icon, { type IconName } from "@/components/Icon";
import { Wordmark } from "@/components/Logo";
import OfflinePrompt from "@/components/OfflinePrompt";
import RecentList from "@/components/RecentList";
import { NightButton } from "@/components/ThemeToggle";
import { DISCLAIMER, GradeBadge } from "@/components/ui";

const QUICK: { href: string; icon: IconName; label: string; tint: string }[] = [
  { href: "/ask", icon: "chat", label: "Ask AI", tint: "bg-sky-600" },
  { href: "/compare", icon: "help", label: "Which charge?", tint: "bg-emerald-600" },
  { href: "/go/dv-arrest", icon: "house", label: "DV arrest?", tint: "bg-fuchsia-600" },
  { href: "/go/dwi-arrest", icon: "glass", label: "DWI checklist", tint: "bg-amber-500" },
];

/** Hand-picked everyday charges (no usage tracking, so this list is curated). */
const COMMON = [
  "njsa-2c-12-1a", "njsa-2c-12-1b", "njsa-2c-20-11", "njsa-2c-20-3", "njsa-2c-33-4", "njsa-2c-33-2", "njsa-2c-29-2",
  "njsa-2c-29-9", "njsa-2c-35-10", "njsa-2c-18-3", "njsa-2c-17-3", "njsa-39-4-50", "njsa-39-3-40", "njsa-39-4-97",
];

function SectionHeading({ children, action }: { children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="mb-2.5 flex items-end justify-between">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">{children}</h2>
      {action}
    </div>
  );
}

export default function Home() {
  const sections = sectionCounts();
  const total = allEntries().length;
  const guides = allChecklists().length;
  const common = COMMON.map((id) => getEntry(id)).filter((e) => e !== null);

  return (
    <>
      {/* Hero */}
      <header className="relative -mx-4 -mt-6 mb-6 overflow-hidden bg-gradient-to-b from-navy-900 via-navy-900 to-navy-800 px-4 pb-7 pt-[max(1.75rem,env(safe-area-inset-top))] text-white">
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="relative flex items-start justify-between gap-3">
          <Wordmark />
          <NightButton />
        </div>
        <p className="relative mt-4 text-sm text-white/70">
          {total} statutes, cases &amp; topics · {guides} checklists and go-bys
        </p>
        <Link
          href="/search"
          className="relative mt-4 flex min-h-[54px] items-center gap-3 rounded-2xl bg-white px-4 text-slate-500 shadow-xl shadow-black/20 active:scale-[0.99]"
        >
          <Icon name="search" size={20} className="text-navy-800" />
          <span className="text-[15px]">Search a charge, statute or topic</span>
        </Link>
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/70 to-transparent" />
      </header>

      <RecentList />

      {/* Quick access */}
      <section className="mb-7">
        <div className="grid grid-cols-4 gap-2.5">
          {QUICK.map((q) => (
            <Link key={q.href} href={q.href} className="flex flex-col items-center gap-1.5 active:scale-95">
              <span className={"flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md shadow-slate-900/10 " + q.tint}>
                <Icon name={q.icon} size={24} />
              </span>
              <span className="text-center text-[11.5px] font-semibold leading-tight text-slate-700 dark:text-slate-300">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Common charges */}
      <section className="mb-7">
        <SectionHeading action={<Link href="/az" className="text-sm font-semibold text-brand dark:text-brand-dark">A–Z index</Link>}>
          Common charges
        </SectionHeading>
        <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
          {common.map((e) => (
            <Link
              key={e!.id}
              href={`/entry/${e!.id}`}
              className="flex min-h-[84px] w-[10.5rem] shrink-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04]"
            >
              <span className="line-clamp-2 text-[14px] font-semibold leading-snug">{e!.title}</span>
              <span className="mt-2 flex items-center justify-between gap-1">
                <span className="truncate font-mono text-[11px] text-slate-500">
                  {(e!.citation ?? "").replace(/^N\.J\.S\.A\.\s*/, "").replace(/\s*\(as amended.*$/, "")}
                </span>
                <GradeBadge badge={gradeBadge(e!.grade_or_penalty, e!.citation)} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <OfflinePrompt />

      {/* Sections */}
      <section>
        <SectionHeading>Browse</SectionHeading>
        <div className="grid grid-cols-2 gap-2.5">
          {sections.map((s, i) => (
            <Link
              key={s.slug}
              href={`/s/${s.slug}`}
              className={
                "group flex rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04] " +
                (i < 2 ? "col-span-2 items-center gap-3.5" : "min-h-[118px] flex-col justify-between")
              }
            >
              <span className={"flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white " + s.iconBg}>
                <Icon name={s.icon} size={22} />
              </span>
              <span className={i < 2 ? "min-w-0 flex-1" : "mt-3"}>
                <span className="block text-[15px] font-semibold leading-tight">{s.name}</span>
                <span className="mt-0.5 block text-xs leading-snug text-slate-500 dark:text-slate-400">
                  {s.count} · {s.blurb}
                </span>
              </span>
              {i < 2 ? <Icon name="chevronRight" size={18} className="text-slate-300 dark:text-slate-600" /> : null}
            </Link>
          ))}
        </div>
      </section>

      <p className="mx-auto mt-8 max-w-sm text-center text-xs leading-relaxed text-slate-500">{DISCLAIMER}</p>
    </>
  );
}
