import { Card, DISCLAIMER, PageTitle } from "@/components/ui";

const LINKS = [
  { href: "/contacts", label: "My Phone Numbers" },
  { href: "/radio-codes", label: "Radio Codes" },
  { href: "/tools", label: "Conversions" },
  { href: "/saved", label: "Saved entries" },
];

export default function MorePage() {
  return (
    <>
      <PageTitle>More</PageTitle>
      <div className="grid gap-2">
        {LINKS.map((l) => (
          <Card key={l.href} href={l.href}><span className="font-medium">{l.label}</span></Card>
        ))}
      </div>
      <section className="mt-6 space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">Add to Home Screen</h2>
        <p className="text-slate-600 dark:text-slate-400">In Safari, tap Share, then “Add to Home Screen” to open this like an app.</p>
      </section>
      <section className="mt-4 space-y-2 rounded-xl border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold">About the content</h2>
        <p className="text-slate-600 dark:text-slate-400">
          Entries marked “Not yet verified” have not been checked against the official source. Grades marked “under review”
          need confirmation before charging.
        </p>
        <p className="font-medium">{DISCLAIMER}</p>
      </section>
    </>
  );
}
