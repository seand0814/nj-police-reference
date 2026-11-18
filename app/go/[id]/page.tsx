import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allChecklists, getChecklist } from "@/lib/content";
import ChecklistView from "@/components/ChecklistView";
import FlowView from "@/components/FlowView";
import TemplateView from "@/components/TemplateView";
import { RecordVisit } from "@/components/RecentList";

export const dynamicParams = false;

export function generateStaticParams() {
  return allChecklists().map((c) => ({ id: c.id }));
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const c = getChecklist((await params).id);
  return { title: c ? `${c.title} · NJ Police Reference` : "Not found" };
}

export default async function GoByPage({ params }: { params: Params }) {
  const c = getChecklist((await params).id);
  if (!c) notFound();
  const isFlow = c.kind === "flow";

  return (
    <>
      <RecordVisit id={"go:" + c.id} />
      <header className="-mx-4 -mt-6 mb-5 bg-gradient-to-br from-emerald-600 to-teal-700 px-4 pb-6 pt-6 text-white">
        <Link href="/s/checklists" className="text-sm text-white/85">← Checklists & Go-Bys</Link>
        <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-emerald-100">{isFlow ? "🔀 Decision go-by" : c.kind === "template" ? "📝 Report template" : "☑️ Checklist"}</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight">{c.title}</h1>
        <p className="mt-1 text-sm text-white/90">{c.summary}</p>
      </header>

      {isFlow && c.start && c.nodes ? <FlowView start={c.start} nodes={c.nodes} /> : null}
      {c.kind === "checklist" && c.groups ? <ChecklistView id={c.id} groups={c.groups} /> : null}
      {c.kind === "template" && c.groups ? <TemplateView title={c.title} groups={c.groups} /> : null}

      <p className="mt-6 rounded-2xl bg-slate-100 p-4 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400">{c.note}</p>
    </>
  );
}
