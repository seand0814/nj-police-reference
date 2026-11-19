import type { IconName } from "@/components/Icon";
import Link from "next/link";
import { allChecklists, allEntries } from "@/lib/content";
import { gradeBadge } from "@/lib/sections";
import { PageTitle, RowLink } from "@/components/ui";

export const metadata = { title: "A–Z Index · NJ Police Reference" };

type Item = { key: string; href: string; title: string; sub: string; badge: ReturnType<typeof gradeBadge>; icon?: IconName };

const LETTERS = ["#", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

function letterOf(title: string) {
  const c = title.replace(/^(the|a|an)\s+/i, "").trim().charAt(0).toUpperCase();
  return /[A-Z]/.test(c) ? c : "#";
}

export default function AZPage() {
  const items: Item[] = [
    ...allEntries().map((e) => ({
      key: e.id,
      href: `/entry/${e.id}`,
      title: e.title,
      sub: e.citation ?? "",
      badge: e.source_type === "case" ? null : gradeBadge(e.grade_or_penalty, e.citation),
    })),
    ...allChecklists().map((c) => ({
      key: "go:" + c.id,
      href: `/go/${c.id}`,
      title: c.title,
      sub: c.kind === "flow" ? "Decision go-by" : c.kind === "template" ? "Report template" : "Checklist",
      badge: null,
      icon: c.kind === "flow" ? "branch" : c.kind === "template" ? "template" : "checklist",
    })),
  ];
  const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
  items.sort((a, b) => collator.compare(a.title.replace(/^(the|a|an)\s+/i, ""), b.title.replace(/^(the|a|an)\s+/i, "")));

  const groups = new Map<string, Item[]>();
  for (const it of items) {
    const l = letterOf(it.title);
    if (!groups.has(l)) groups.set(l, []);
    groups.get(l)!.push(it);
  }

  return (
    <>
      <PageTitle sub={`${items.length} entries, checklists and go-bys`}>A–Z Index</PageTitle>

      {/* Letter bar: fixed down the right edge for one-thumb jumping */}
      <nav
        aria-label="Jump to letter"
        className="fixed right-0.5 top-1/2 z-10 flex -translate-y-1/2 flex-col items-center rounded-full bg-white/90 px-1 py-1 shadow-md backdrop-blur dark:bg-slate-900/90"
      >
        {LETTERS.map((l) =>
          groups.has(l) ? (
            <a key={l} href={`#L-${l}`} className="block px-1 text-[11px] font-bold leading-[1.35] text-brand dark:text-brand-dark">
              {l}
            </a>
          ) : (
            <span key={l} className="block px-1 text-[11px] leading-[1.35] text-slate-300 dark:text-slate-700">{l}</span>
          )
        )}
      </nav>

      <div className="space-y-5 pr-6">
        {LETTERS.filter((l) => groups.has(l)).map((l) => (
          <section key={l} id={`L-${l}`} className="scroll-mt-4">
            <h2 className="sticky top-0 z-[5] -mx-4 bg-slate-50/95 px-4 py-1.5 text-lg font-extrabold text-slate-700 backdrop-blur dark:bg-slate-950/95 dark:text-slate-200">
              {l}
            </h2>
            <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {groups.get(l)!.map((it) => (
                <li key={it.key}>
                  <RowLink href={it.href} title={it.title} citation={it.sub} badge={it.badge} icon={it.icon} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="mt-6 text-center text-sm">
        <Link href="/search" className="text-brand dark:text-brand-dark">Search instead ›</Link>
      </p>
    </>
  );
}
