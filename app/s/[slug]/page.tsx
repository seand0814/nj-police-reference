import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import { notFound } from "next/navigation";
import { sectionCounts, sectionGroups } from "@/lib/content";
import { SECTIONS, sectionBySlug } from "@/lib/sections";
import GroupedList from "@/components/GroupedList";
import { BadgeLegend } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ slug: s.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const s = sectionBySlug((await params).slug);
  return { title: s ? `${s.name} · NJ Police Reference` : "Not found" };
}

export default async function SectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const section = sectionBySlug(slug);
  if (!section) notFound();
  const { byType, byChapter, tools } = sectionGroups(slug);
  const count = sectionCounts().find((s) => s.slug === slug)?.count ?? 0;
  const isStatutes = slug === "criminal-code" || slug === "motor-vehicle" || slug === "other-statutes";
  const short = byType.reduce((n, g) => n + g.rows.length, 0) <= 20;

  return (
    <>
      <PageHeader
        back={{ href: "/", label: "Home" }}
        icon={section.icon}
        iconBg={section.iconBg}
        eyebrow={`${count} ${slug === "checklists" ? "guides" : "entries"}`}
        title={section.name}
        subtitle={section.blurb}
      />

      {tools.length ? (
        <section className="mb-5">
          <h2 className="mb-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Go-bys &amp; checklists</h2>
          <div className="no-scrollbar -mx-4 flex gap-2.5 overflow-x-auto px-4 pb-1">
            {tools.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="flex min-h-[76px] w-48 shrink-0 flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
                  <Icon name={t.kind === "flow" ? "branch" : t.kind === "template" ? "template" : "checklist"} size={14} />
                  {t.kind === "flow" ? "Decision go-by" : t.kind === "template" ? "Report template" : "Checklist"}
                </span>
                <span className="mt-1 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100">{t.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {slug === "criminal-code" || slug === "checklists" ? (
        <Link href="/compare" className="mb-4 flex min-h-[60px] items-center gap-3 rounded-2xl bg-gradient-to-r from-navy-800 to-navy-900 px-4 text-white shadow-md active:scale-[0.99]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-navy-900"><Icon name="help" size={18} /></span>
          <span className="flex-1">
            <span className="block font-semibold">Which charge fits?</span>
            <span className="block text-xs text-white/70">Yes/no helpers and side-by-side comparisons</span>
          </span>
          <Icon name="chevronRight" size={18} className="text-white/60" />
        </Link>
      ) : null}

      {slug === "motor-vehicle" ? (
        <Link href="/tools/points" className="mb-4 flex min-h-[56px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.04]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white"><Icon name="list" size={18} /></span>
          <span className="flex-1 font-semibold">Points &amp; penalties table</span>
          <Icon name="chevronRight" size={18} className="text-slate-400" />
        </Link>
      ) : null}

      {isStatutes ? <div className="mb-3"><BadgeLegend /></div> : null}

      <GroupedList
        byType={byType}
        byChapter={byChapter}
        placeholder={isStatutes ? "Filter by name or number, e.g. 20-11" : "Filter this section…"}
        openAll={short}
      />
    </>
  );
}
