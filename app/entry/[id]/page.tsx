import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allEntries, entrySection, getEntry } from "@/lib/content";
import { gradeBadge, sectionBySlug } from "@/lib/sections";
import BookmarkButton from "@/components/BookmarkButton";
import { RecordVisit } from "@/components/RecentList";
import { CPR_BANNER, DISCLAIMER, GradeBadge } from "@/components/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return allEntries().map((e) => ({ id: e.id }));
}

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const e = getEntry((await params).id);
  return { title: e ? `${e.title} · NJ Police Reference` : "Not found" };
}

function List({ title, icon, items }: { title: string; icon: string; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-5">
      <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
        <span aria-hidden>{icon}</span> {title}
      </h2>
      <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {items.map((t, i) => {
          // Lines like "Holding: ..." or "Scenario: ..." get a bold label.
          const m = t.match(/^([A-Z][A-Za-z ]{2,20}):\s+([\s\S]*)$/);
          return (
            <li key={i} className="flex gap-3 border-b border-slate-100 p-4 leading-relaxed last:border-0 dark:border-slate-800">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
              {m ? (
                <span>
                  <span className="mb-0.5 block text-xs font-bold uppercase tracking-wide text-slate-500">{m[1]}</span>
                  {m[2]}
                </span>
              ) : (
                <span>{t}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default async function EntryPage({ params }: { params: Params }) {
  const entry = getEntry((await params).id);
  if (!entry) notFound();
  const section = sectionBySlug(entrySection(entry))!;
  const badge = gradeBadge(entry.grade_or_penalty, entry.citation);
  const related = entry.related.map((id) => getEntry(id)).filter((x) => x !== null);
  const verified = entry.source_verified && entry.last_verified;

  return (
    <article>
      <RecordVisit id={entry.id} />
      <header className={"-mx-4 -mt-6 bg-gradient-to-br px-4 pb-5 pt-6 text-white " + section.tile}>
        <Link href={`/s/${section.slug}`} className="text-sm text-white/85">← {section.name}</Link>
        <div className="mt-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {entry.citation ? <p className="font-mono text-sm text-white/90">{entry.citation}</p> : null}
            <h1 className="mt-1 text-2xl font-bold leading-tight">{entry.title}</h1>
          </div>
          <BookmarkButton id={entry.id} />
        </div>
      </header>

      {entry.category === "Medical" ? (
        <p className="mt-4 rounded-2xl bg-red-50 p-4 font-semibold text-red-800 dark:bg-red-950 dark:text-red-200">⚠️ {CPR_BANNER}</p>
      ) : null}

      {entry.grade_or_penalty ? (
        <section className={"mt-4 rounded-2xl border-l-4 bg-white p-4 shadow-sm dark:bg-slate-900 " + section.accent}>
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-xs font-semibold uppercase tracking-wide">Grade / Penalty</h2>
            <GradeBadge badge={badge} large />
          </div>
          <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{entry.grade_or_penalty}</p>
          {entry.grade_review ? (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              ⚠️ Grade under review — confirm before charging.
            </p>
          ) : null}
        </section>
      ) : null}

      {entry.source_type === "case" ? (
        <>
          <List title="The ruling" icon="⚖️" items={entry.key_points} />
          <List title="In the field" icon="👮" items={entry.officer_notes} />
        </>
      ) : (
        <>
          <List title="Key points" icon="📌" items={entry.key_points} />
          <List title="Officer notes" icon="👮" items={entry.officer_notes} />
        </>
      )}

      {related.length ? (
        <section className="mt-5">
          <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">🔗 Related</h2>
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r!.id}>
                <Link href={`/entry/${r!.id}`} className={"inline-flex min-h-[40px] items-center rounded-full px-4 text-sm font-medium " + section.chip}>
                  {r!.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <footer className="mt-8 space-y-2 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">
        <p>
          <span className="font-semibold">Source: </span>
          {entry.source_url ? (
            <a href={entry.source_url} target="_blank" rel="noopener noreferrer" className="text-brand underline dark:text-brand-dark">
              {entry.citation || "View source"}
            </a>
          ) : (
            entry.citation || "—"
          )}
        </p>
        <p>
          <span className="font-semibold">Last verified: </span>
          {verified ? (
            <span className="text-emerald-700 dark:text-emerald-400">✓ {new Date(entry.last_verified + "T12:00:00").toLocaleDateString("en-US")}</span>
          ) : (
            "Not yet verified"
          )}
        </p>
        <p className="font-medium">{DISCLAIMER}</p>
      </footer>
    </article>
  );
}
