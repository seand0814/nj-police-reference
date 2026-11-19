import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ShareButton from "@/components/ShareButton";
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
  const shareText = [c.title, c.summary, ...(c.groups ?? []).slice(0, 3).map((g) => "• " + g.name), "Quick reference only. Follow department policy."]
    .filter(Boolean)
    .join("\n");

  return (
    <>
      <RecordVisit id={"go:" + c.id} />
      <PageHeader
        back={{ href: "/s/checklists", label: "Checklists & Go-Bys" }}
        icon={isFlow ? "branch" : c.kind === "template" ? "template" : "checklist"}
        iconBg="bg-emerald-600"
        eyebrow={isFlow ? "Decision go-by" : c.kind === "template" ? "Report template" : "Checklist"}
        title={c.title}
        subtitle={c.summary}
        actions={<ShareButton title={c.title} text={shareText} path={`/go/${c.id}`} />}
      />

      {isFlow && c.start && c.nodes ? <FlowView start={c.start} nodes={c.nodes} /> : null}
      {c.kind === "checklist" && c.groups ? <ChecklistView id={c.id} groups={c.groups} /> : null}
      {c.kind === "template" && c.groups ? <TemplateView title={c.title} groups={c.groups} /> : null}

      <p className="mt-6 rounded-2xl bg-slate-100 p-4 text-xs text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">{c.note}</p>
    </>
  );
}
