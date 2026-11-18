import Link from "next/link";
import { allEntries, sectionCounts } from "@/lib/content";
import RecentList from "@/components/RecentList";
import { DISCLAIMER } from "@/components/ui";

const QUICK = [
  { href: "/go/dv-arrest", icon: "🏠", label: "DV arrest?", cls: "bg-fuchsia-100 text-fuchsia-900 dark:bg-fuchsia-950 dark:text-fuchsia-100" },
  { href: "/go/dwi-arrest", icon: "🍺", label: "DWI checklist", cls: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100" },
  { href: "/go/consent-search", icon: "🚗", label: "Consent search?", cls: "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100" },
  { href: "/tools", icon: "🧮", label: "Grade calculator", cls: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" },
];

export default function Home() {
  const sections = sectionCounts();
  const total = allEntries().length;

  return (
    <>
      <header className="-mx-4 -mt-6 mb-5 bg-gradient-to-br from-slate-900 via-blue-950 to-blue-800 px-4 pb-7 pt-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-200">New Jersey</p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight">Police Reference</h1>
        <p className="mt-1 text-sm text-blue-100">{total} statutes &amp; topics · checklists · go-bys</p>
        <Link
          href="/search"
          className="mt-5 flex min-h-[52px] items-center gap-2 rounded-2xl bg-white/95 px-4 text-slate-500 shadow-lg"
        >
          <span aria-hidden>🔎</span> Search a charge, statute or topic…
        </Link>
      </header>

      <section className="mb-6">
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Quick access</h2>
        <div className="grid grid-cols-4 gap-2">
          {QUICK.map((q) => (
            <Link key={q.href} href={q.href} className={"flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-2xl px-1 text-center active:scale-95 " + q.cls}>
              <span aria-hidden className="text-2xl">{q.icon}</span>
              <span className="text-[11px] font-semibold leading-tight">{q.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <RecentList />

      <section>
        <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">Browse</h2>
        <div className="grid grid-cols-2 gap-3">
          {sections.map((s, i) => (
            <Link
              key={s.slug}
              href={`/s/${s.slug}`}
              className={
                "relative flex min-h-[112px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-white shadow-md active:scale-[0.98] " +
                s.tile +
                (i < 2 ? " col-span-2 min-h-[96px]" : "")
              }
            >
              <span aria-hidden className="absolute -right-2 -top-2 text-6xl opacity-20">{s.icon}</span>
              <span aria-hidden className="text-2xl">{s.icon}</span>
              <span>
                <span className="block text-base font-bold leading-tight">{s.name}</span>
                <span className="block text-xs text-white/85">{s.count} · {s.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <p className="mt-8 text-center text-xs text-slate-500">{DISCLAIMER}</p>
    </>
  );
}
