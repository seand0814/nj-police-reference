import Link from "next/link";
import { DISCLAIMER, PageTitle } from "@/components/ui";

const LINKS = [
  { href: "/az", label: "A–Z Index", icon: "🔤", cls: "bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-slate-100" },
  { href: "/saved", label: "Saved Entries", icon: "⭐", cls: "bg-yellow-100 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100" },
  { href: "/s/case-law", label: "Case Law Library", icon: "📜", cls: "bg-indigo-100 text-indigo-900 dark:bg-indigo-950 dark:text-indigo-100" },
  { href: "/notes", label: "My Notes", icon: "📝", cls: "bg-sky-100 text-sky-900 dark:bg-sky-950 dark:text-sky-100" },
  { href: "/contacts", label: "My Phone Numbers", icon: "📞", cls: "bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100" },
  { href: "/radio-codes", label: "Radio Codes", icon: "📻", cls: "bg-violet-100 text-violet-900 dark:bg-violet-950 dark:text-violet-100" },
  { href: "/tools", label: "Calculators", icon: "🧮", cls: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100" },
];

export default function MorePage() {
  return (
    <>
      <PageTitle>More</PageTitle>
      <div className="grid grid-cols-2 gap-3">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className={"flex min-h-[96px] flex-col justify-between rounded-2xl p-4 active:scale-[0.98] " + l.cls}>
            <span aria-hidden className="text-3xl">{l.icon}</span>
            <span className="font-bold">{l.label}</span>
          </Link>
        ))}
      </div>
      <section className="mt-6 space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">📲 Add to Home Screen</h2>
        <p className="text-slate-600 dark:text-slate-400">In Safari, tap Share, then “Add to Home Screen” to open this like an app.</p>
      </section>
      <section className="mt-4 space-y-2 rounded-2xl border border-slate-200 bg-white p-4 text-sm shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">ℹ️ About the content</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Entries marked “Not yet verified” have not been checked against the official source. Grades marked “under review”
          (amber dot) need confirmation before charging. Checklists and go-bys don&apos;t replace your department&apos;s policy.
        </p>
        <p className="font-medium">{DISCLAIMER}</p>
      </section>
    </>
  );
}
