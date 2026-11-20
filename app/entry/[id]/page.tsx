import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allEntries, comparisonsFor, entrySection, getEntry, sectionSequence, type Entry } from "@/lib/content";
import { fullTextUrl, gradeBadge, sectionBySlug } from "@/lib/sections";
import EntryActionBar from "@/components/EntryActionBar";
import Icon, { type IconName } from "@/components/Icon";
import PageHeader from "@/components/PageHeader";
import ElementsChecklist from "@/components/ElementsChecklist";
import SpeakList from "@/components/SpeakList";
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

function Heading({ icon, children }: { icon: IconName; children: React.ReactNode }) {
  return (
    <h2 className="mb-2 flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
      <Icon name={icon} size={16} className="text-navy-700 dark:text-gold-300" /> {children}
    </h2>
  );
}

const CARD = "overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]";

function List({ title, icon, items }: { title: string; icon: IconName; items: string[] }) {
  if (!items?.length) return null;
  return (
    <section className="mt-5">
      <Heading icon={icon}>{title}</Heading>
      <ul className={CARD}>
        {items.map((t, i) => {
          // Lines like "Holding: ..." or "Scenario: ..." get a bold label.
          const m = t.match(/^([A-Z][A-Za-z ]{2,20}):\s+([\s\S]*)$/);
          return (
            <li key={i} className="flex gap-3 border-b border-slate-100 p-4 leading-relaxed last:border-0 dark:border-white/5">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
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

const LONG_GRADE: Record<string, string> = {
  "1st°": "1st degree crime",
  "2nd°": "2nd degree crime",
  "3rd°": "3rd degree crime",
  "4th°": "4th degree crime",
  DP: "Disorderly persons offense",
  PDP: "Petty disorderly persons offense",
  MV: "Motor vehicle violation",
  "By value": "Graded by value",
  Contempt: "Contempt",
};

function Table({ table }: { table: NonNullable<Entry["table"]> }) {
  return (
    <section className="mt-5">
      <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-ink-900">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-100 dark:bg-slate-800">
            <tr>
              {table.columns.map((c, i) => (
                <th key={i} className={"px-3 py-2 font-semibold " + (i === 0 ? "sticky left-0 bg-slate-100 dark:bg-slate-800" : "")}>{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((r, i) => (
              <tr key={i} className="border-t border-slate-100 dark:border-slate-800">
                {r.map((cell, j) => (
                  <td key={j} className={"px-3 py-2 " + (j === 0 ? "sticky left-0 bg-white font-semibold dark:bg-slate-900" : "")}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {table.note ? <p className="mt-2 text-xs text-slate-500">{table.note}</p> : null}
    </section>
  );
}

function Faq({ items }: { items: NonNullable<Entry["faq"]> }) {
  return (
    <section className="mt-5">
      <Heading icon="help">Questions &amp; answers</Heading>
      <div className={CARD}>
        {items.map((f, i) => (
          <details key={i} className="group border-b border-slate-100 last:border-0 dark:border-white/5">
            <summary className="flex min-h-[56px] cursor-pointer list-none items-start gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
              <span className="min-w-0 flex-1 font-semibold leading-snug">{f.q}</span>
              <Icon name="chevronRight" size={18} className="mt-0.5 shrink-0 text-slate-400 transition-transform group-open:rotate-90" />
            </summary>
            <div className="px-4 pb-4 leading-relaxed text-slate-700 dark:text-slate-300">
              {f.box ? (
                <span className="mb-1.5 inline-block rounded-md bg-navy-800 px-2 py-0.5 font-mono text-[11px] font-bold text-gold-300">Box {f.box}</span>
              ) : null}
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

function DocLinks({ links }: { links: NonNullable<Entry["links"]> }) {
  return (
    <div className="mb-4 space-y-2">
      {links.map((l, i) => (
        <a
          key={i}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className={
            "flex min-h-[56px] items-center gap-3 rounded-2xl px-4 shadow-sm active:scale-[0.99] " +
            (i === 0
              ? "bg-navy-800 text-white"
              : "border border-slate-200/80 bg-white dark:border-white/10 dark:bg-white/[0.04]")
          }
        >
          <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl " + (i === 0 ? "bg-gold-400 text-navy-900" : "bg-navy-800 text-gold-300")}>
            <Icon name="file" size={18} />
          </span>
          <span className="flex-1 font-semibold">{l.label}</span>
          <Icon name="external" size={18} className={i === 0 ? "text-white/70" : "text-slate-400"} />
        </a>
      ))}
    </div>
  );
}

function Subsections({ items, url }: { items: NonNullable<Entry["subsections"]>; url: string | null }) {
  return (
    <section className="mt-5">
      <Heading icon="list">Subsections</Heading>
      <ul className={CARD}>
        {items.map((it, i) => {
          const b = gradeBadge(it.grade);
          return (
            <li key={i} className="flex gap-3 border-b border-slate-100 p-4 last:border-0 dark:border-white/5">
              <span className="mt-0.5 h-fit shrink-0 rounded-lg bg-navy-800 px-2 py-0.5 font-mono text-xs font-bold text-gold-300">
                {it.label}
              </span>
              <div className="min-w-0 flex-1">
                <p className="leading-snug">{it.text}</p>
                {it.grade ? (
                  <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <GradeBadge badge={b} /> {b && it.grade.length <= 12 ? null : it.grade}
                  </p>
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-slate-500">
        Plain-language summary, not yet verified.{" "}
        {url ? <a href={url} target="_blank" rel="noopener noreferrer" className="font-medium text-brand underline dark:text-brand-dark">Read the exact wording ›</a> : null}
      </p>
    </section>
  );
}

export default async function EntryPage({ params }: { params: Params }) {
  const entry = getEntry((await params).id);
  if (!entry) notFound();
  const section = sectionBySlug(entrySection(entry))!;
  const badge = gradeBadge(entry.grade_or_penalty, entry.citation);
  const compares = comparisonsFor(entry.id);
  const related = entry.related.map((id) => getEntry(id)).filter((x) => x !== null);
  const verified = entry.source_verified && entry.last_verified;
  const textUrl = entry.source_type === "statute" ? fullTextUrl(entry.citation) : null;
  const seq = sectionSequence(section.slug);
  const pos = seq.findIndex((x) => x.row.id === entry.id);
  const prev = pos > 0 ? seq[pos - 1].row : null;
  const next = pos >= 0 && pos < seq.length - 1 ? seq[pos + 1].row : null;
  const groupName = pos >= 0 ? seq[pos].group : "";
  const groupRows = seq.filter((x) => x.group === groupName);
  const posInGroup = groupRows.findIndex((x) => x.row.id === entry.id);
  const isCharge = entry.source_type === "statute" && !!badge && !["Info", "Defense", "Penalty", "Confirm", "Enhancer"].includes(badge.label);
  const shareText = [
    entry.title,
    [entry.citation, entry.grade_or_penalty].filter(Boolean).join(" · "),
    ...entry.key_points.slice(0, 2).map((k) => "• " + k),
    "Quick reference only. Verify against the official source.",
  ].filter(Boolean).join("\n");
  const chargeText = isCharge
    ? [`${entry.citation} – ${entry.title} – ${LONG_GRADE[badge!.label] ?? badge!.label}`, entry.key_points[0] ?? ""].filter(Boolean).join("\n")
    : "";

  return (
    <article>
      <RecordVisit id={entry.id} />
      <PageHeader
        back={{ href: `/s/${section.slug}`, label: section.name }}
        eyebrow={entry.citation ? <span className="font-mono normal-case tracking-normal">{entry.citation}</span> : section.short}
        title={entry.title}
      />

      {entry.links?.length ? <DocLinks links={entry.links} /> : null}

      {entry.category === "Medical" ? (
        <p className="mb-4 flex gap-2 rounded-2xl bg-red-50 p-4 font-semibold text-red-800 dark:bg-red-950 dark:text-red-200"><Icon name="alert" size={20} className="shrink-0" /> {CPR_BANNER}</p>
      ) : null}

      {entry.grade_or_penalty ? (
        <section className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
          <div className="flex items-center justify-between gap-2">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Grade / Penalty</h2>
            <GradeBadge badge={badge} large />
          </div>
          <p className="mt-2 font-medium text-slate-900 dark:text-slate-100">{entry.grade_or_penalty}</p>
          {entry.grade_review ? (
            <p className="mt-3 rounded-lg bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 dark:bg-amber-950 dark:text-amber-200">
              Grade under review — confirm before charging.
            </p>
          ) : null}
        </section>
      ) : null}

      {textUrl ? (
        <a
          href={textUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex min-h-[56px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 shadow-sm active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.04]"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300"><Icon name="book" size={18} /></span>
          <span className="flex-1">
            <span className="block font-semibold">Full statute text</span>
            <span className="block text-xs text-slate-500">Every subsection, word for word (Justia, unofficial copy)</span>
          </span>
          <Icon name="external" size={18} className="text-slate-400" />
        </a>
      ) : null}

      {entry.subsections?.length ? <Subsections items={entry.subsections} url={textUrl} /> : null}
      {entry.elements?.length ? <ElementsChecklist elements={entry.elements} /> : null}
      {entry.table ? <Table table={entry.table} /> : null}

      {entry.speak ? (
        <section className="mt-5">
          <Heading icon="speaker">Tap the speaker to hear it</Heading>
          <SpeakList lines={entry.key_points} />
          <List title="Notes" icon="badge" items={entry.officer_notes} />
        </section>
      ) : entry.source_type === "case" ? (
        <>
          <List title="The ruling" icon="gavel" items={entry.key_points} />
          <List title="In the field" icon="badge" items={entry.officer_notes} />
        </>
      ) : (
        <>
          <List title="Key points" icon="pin" items={entry.key_points} />
          <List title="Officer notes" icon="badge" items={entry.officer_notes} />
          {entry.faq?.length ? <Faq items={entry.faq} /> : null}
        </>
      )}

      {compares.length ? (
        <section className="mt-5">
          <Heading icon="compare">Compare</Heading>
          <div className="space-y-2">
            {compares.map((c) => (
              <Link
                key={c.id}
                href={`/compare/${c.id}`}
                className="flex min-h-[56px] items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-sm active:scale-[0.99] dark:border-white/10 dark:bg-white/[0.04]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300"><Icon name="compare" size={18} /></span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold leading-tight">{c.title}</span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400">{c.summary}</span>
                </span>
                <Icon name="chevronRight" size={18} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {related.length ? (
        <section className="mt-5">
          <Heading icon="branch">Related</Heading>
          <ul className="flex flex-wrap gap-2">
            {related.map((r) => (
              <li key={r!.id}>
                <Link href={`/entry/${r!.id}`} className="inline-flex min-h-[40px] items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-navy-800 shadow-sm active:scale-95 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-100">
                  {r!.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {prev || next ? (
        <nav aria-label="Previous and next" className="mt-8">
          {groupName ? (
            <p className="mb-2 text-center text-xs text-slate-500">
              {groupName} · {posInGroup + 1} of {groupRows.length}
            </p>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            {prev ? (
              <Link href={prev.href} className="flex min-h-[64px] flex-col justify-center rounded-2xl border border-slate-200/80 bg-white px-3 py-2 shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04]">
                <span className="text-xs font-semibold text-slate-500">‹ Previous</span>
                <span className="line-clamp-2 text-sm font-medium leading-snug">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={next.href} className="flex min-h-[64px] flex-col justify-center rounded-2xl border border-slate-200/80 bg-white px-3 py-2 text-right shadow-sm active:scale-[0.98] dark:border-white/10 dark:bg-white/[0.04]">
                <span className="text-xs font-semibold text-slate-500">Next ›</span>
                <span className="line-clamp-2 text-sm font-medium leading-snug">{next.title}</span>
              </Link>
            ) : <span />}
          </div>
        </nav>
      ) : null}

      <EntryActionBar
        id={entry.id}
        title={entry.title}
        path={`/entry/${entry.id}`}
        shareText={shareText}
        copy={
          isCharge
            ? { text: chargeText, label: "Copy charge" }
            : entry.source_type === "case"
              ? { text: [entry.title, entry.citation, entry.key_points[0]].filter(Boolean).join("\n"), label: "Copy cite" }
              : { text: shareText, label: "Copy" }
        }
        prev={prev ? { href: prev.href, title: prev.title } : null}
        next={next ? { href: next.href, title: next.title } : null}
      />

      <footer className="mt-6 space-y-2 rounded-2xl bg-slate-100 p-4 text-sm text-slate-600 dark:bg-white/[0.04] dark:text-slate-400">
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
