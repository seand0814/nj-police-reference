import type { Metadata } from "next";
import Link from "next/link";
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
      <header className={"-mx-4 -mt-6 mb-5 bg-gradient-to-br px-4 pb-6 pt-6 text-white " + section.tile}>
        <Link href="/" className="text-sm text-white/80">← Home</Link>
        <div className="mt-3 flex items-center gap-3">
          <span aria-hidden className="text-4xl">{section.icon}</span>
          <div>
            <h1 className="text-2xl font-bold leading-tight">{section.name}</h1>
            <p className="text-sm text-white/85">{count} {slug === "checklists" ? "guides" : "entries"} · {section.blurb}</p>
          </div>
        </div>
      </header>

      {tools.length ? (
        <section className="mb-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Go-bys & checklists</h2>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {tools.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className={"flex min-h-[64px] w-44 shrink-0 flex-col justify-center rounded-2xl border-l-4 bg-white px-3 py-2 shadow-sm dark:bg-slate-900 " + section.accent}
              >
                <span className="text-xs font-semibold">{t.kind === "flow" ? "🔀 Decision go-by" : t.kind === "template" ? "📝 Report template" : "☑️ Checklist"}</span>
                <span className="text-sm font-medium leading-snug text-slate-800 dark:text-slate-100">{t.title}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {slug === "motor-vehicle" ? (
        <Link href="/tools/points" className="mb-4 flex min-h-[56px] items-center justify-between rounded-2xl border-l-4 border-blue-600 bg-white px-4 shadow-sm dark:bg-slate-900">
          <span className="font-semibold">🎯 Points & penalties table</span>
          <span aria-hidden className="text-slate-400">›</span>
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
