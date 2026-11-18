import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allEntries, getEntry, slugify } from "@/lib/content";
import BookmarkButton from "@/components/BookmarkButton";
import { CPR_BANNER, DISCLAIMER } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return allEntries().map((e) => ({ id: e.id }));
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const e = getEntry((await params).id);
  return { title: e ? `${e.title} · NJ Police Reference` : "Not found" };
}

function List({ title, items }: { title: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-5">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">{title}</h2>
      <ul className="mt-2 space-y-2">
        {items.map((t, i) => (
          <li key={i} className="rounded-lg bg-white p-3 leading-relaxed shadow-sm dark:bg-slate-900">{t}</li>
        ))}
      </ul>
    </section>
  );
}

export default async function EntryPage({ params }: { params: Params }) {
  const entry = getEntry((await params).id);
  if (!entry) notFound();
  const related = entry.related.map((id) => getEntry(id)).filter((x) => x !== null);
  const verified = entry.source_verified && entry.last_verified;

  return (
    <article>
      <Link href={`/c/${slugify(entry.category)}`} className="text-sm text-brand dark:text-brand-dark">← {entry.category}</Link>

      <header className="mt-2 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold leading-tight">{entry.title}</h1>
          {entry.citation ? <p className="mt-1 font-mono text-sm text-slate-600 dark:text-slate-300">{entry.citation}</p> : null}
        </div>
        <BookmarkButton id={entry.id} />
      </header>

      {entry.category === "Medical" ? (
        <p className="mt-4 rounded-lg bg-red-50 p-3 font-semibold text-red-800 dark:bg-red-950 dark:text-red-200">{CPR_BANNER}</p>
      ) : null}

      {entry.grade_or_penalty ? (
        <section className="mt-4 rounded-xl border-l-4 border-brand bg-blue-50 p-4 dark:bg-blue-950">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-300">Grade / Penalty</h2>
          <p className="mt-1 font-medium">{entry.grade_or_penalty}</p>
          {entry.grade_review ? (
            <p className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-300">Grade under review — confirm before charging.</p>
          ) : null}
        </section>
      ) : null}

      <List title="Key points" items={entry.key_points} />
      <List title="Officer notes" items={entry.officer_notes} />

      {related.length ? (
        <section className="mt-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Related</h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r!.id}>
                <Link href={`/entry/${r!.id}`} className="inline-block rounded-full border border-slate-300 px-3 py-2 text-sm dark:border-slate-700">{r!.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="mt-8 space-y-2 border-t border-slate-200 pt-4 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
        <p>
          <span className="font-semibold">Source: </span>
          {entry.source_url ? (
            <a href={entry.source_url} target="_blank" rel="noopener noreferrer" className="text-brand underline dark:text-brand-dark">{entry.citation || "View source"}</a>
          ) : (
            entry.citation || "—"
          )}
        </p>
        <p>
          <span className="font-semibold">Last verified: </span>
          {verified ? new Date(entry.last_verified + "T12:00:00").toLocaleDateString("en-US") : "Not yet verified"}
        </p>
        <p className="font-medium">{DISCLAIMER}</p>
      </footer>
    </article>
  );
}
