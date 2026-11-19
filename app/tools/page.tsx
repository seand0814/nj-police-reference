import Link from "next/link";
import Converter from "@/components/Converter";
import GradeCalculator from "@/components/GradeCalculator";
import { PageTitle } from "@/components/ui";

export default function ToolsPage() {
  return (
    <>
      <PageTitle sub="Value-based grading and unit conversions">Tools</PageTitle>
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Grade by value</h2>
      <GradeCalculator />
      <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">Title 39</h2>
      <Link href="/tools/points" className="flex min-h-[56px] items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 font-semibold shadow-sm dark:border-slate-800 dark:bg-slate-900">
        Points & penalties table <span aria-hidden className="text-slate-400">›</span>
      </Link>
      <h2 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">Conversions</h2>
      <Converter />
      <p className="mt-3 text-sm text-slate-500">Marijuana threshold reference: 6 oz ≈ 170 g; 17 g hashish ≈ 0.6 oz.</p>
    </>
  );
}
