import Link from "next/link";
import { allEntries, categories } from "@/lib/content";
import { Card, DISCLAIMER } from "@/components/ui";

export default function Home() {
  const cats = categories();
  const total = allEntries().length;
  return (
    <>
      <header className="mb-5">
        <h1 className="text-2xl font-bold tracking-tight">NJ Police Reference</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{total} topics · statutes with grading, DWI, drugs, case law and procedures</p>
      </header>
      <Link
        href="/search"
        className="mb-5 flex min-h-[48px] items-center rounded-xl border border-slate-300 bg-white px-4 text-slate-500 dark:border-slate-700 dark:bg-slate-900"
      >
        🔎 Search statutes, citations, topics…
      </Link>
      <div className="grid gap-3 sm:grid-cols-2">
        {cats.map((c) => (
          <Card key={c.slug} href={`/c/${c.slug}`}>
            <div className="flex items-center justify-between">
              <span className="font-semibold">{c.name}</span>
              <span className="text-sm text-slate-500">{c.count}</span>
            </div>
          </Card>
        ))}
        <Card>
          <div className="font-semibold">Department Weapons</div>
          <p className="mt-1 text-sm text-slate-500">Add from your agency&apos;s training materials.</p>
        </Card>
      </div>
      <p className="mt-8 text-center text-xs text-slate-500">{DISCLAIMER}</p>
    </>
  );
}
