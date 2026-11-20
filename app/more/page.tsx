import Link from "next/link";
import Icon, { type IconName } from "@/components/Icon";
import { LogoMark } from "@/components/Logo";
import OfflineManager from "@/components/OfflineManager";
import PageHeader from "@/components/PageHeader";
import ThemeToggle, { TextSizePicker } from "@/components/ThemeToggle";
import { DISCLAIMER } from "@/components/ui";

const LINKS: { href: string; label: string; sub: string; icon: IconName; bg: string }[] = [
  { href: "/az", label: "A–Z Index", sub: "Every entry, alphabetical", icon: "az", bg: "bg-slate-600" },
  { href: "/saved", label: "Saved", sub: "Your starred entries", icon: "starFill", bg: "bg-amber-500" },
  { href: "/s/case-law", label: "Case Law", sub: "Rulings with field scenarios", icon: "gavel", bg: "bg-indigo-600" },
  { href: "/notes", label: "My Notes", sub: "Private, on this phone", icon: "note", bg: "bg-sky-600" },
  { href: "/contacts", label: "Phone Numbers", sub: "Your agency contacts", icon: "phone", bg: "bg-emerald-600" },
  { href: "/radio-codes", label: "Radio Codes", sub: "Your department's codes", icon: "radio", bg: "bg-violet-600" },
  { href: "/tools", label: "Calculators", sub: "Grade by value and more", icon: "calculator", bg: "bg-rose-600" },
];

const CARD = "rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-white/[0.04]";

export default function MorePage() {
  return (
    <>
      <PageHeader eyebrow="Tools & settings" title="More" />

      <ul className={CARD + " overflow-hidden"}>
        {LINKS.map((l) => (
          <li key={l.href} className="border-b border-slate-100 last:border-0 dark:border-white/5">
            <Link href={l.href} className="flex min-h-[60px] items-center gap-3 px-4 py-2.5 active:bg-slate-50 dark:active:bg-white/5">
              <span className={"flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white " + l.bg}>
                <Icon name={l.icon} size={18} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold leading-tight">{l.label}</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">{l.sub}</span>
              </span>
              <Icon name="chevronRight" size={18} className="text-slate-300 dark:text-slate-600" />
            </Link>
          </li>
        ))}
      </ul>

      <section id="offline" className={CARD + " mt-5 scroll-mt-4 p-4"}>
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Offline use</h2>
        <OfflineManager />
        <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Pages you open are also saved automatically. If you use the Home Screen icon, download from inside that app; it keeps
          its own copy separate from Safari. Ask AI always needs a connection.
        </p>
      </section>

      <section className={CARD + " mt-4 p-4"}>
        <h2 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Appearance</h2>
        <div className="mt-3">
          <ThemeToggle />
        </div>
        <h3 className="mb-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">Text size</h3>
        <TextSizePicker />
        <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
          Night turns the whole screen red and dim so it won&apos;t wreck your night vision in a dark car. You can also flip
          it on and off with the moon button at the top of the Home screen.
        </p>
      </section>

      <section className={CARD + " mt-4 flex gap-3 p-4 text-sm"}>
        <LogoMark size={40} className="shrink-0" />
        <div>
          <h2 className="font-semibold">Add to Home Screen</h2>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            In Safari, tap Share, then &ldquo;Add to Home Screen&rdquo; to open this like an app. If you added it before,
            remove the old shortcut and add it again to get the new icon.
          </p>
        </div>
      </section>

      <section className={CARD + " mt-4 space-y-2 p-4 text-sm"}>
        <h2 className="flex items-center gap-2 font-semibold">
          <Icon name="alert" size={16} className="text-amber-600" /> About the content
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Entries marked &ldquo;Not yet verified&rdquo; have not been checked against the official source. Grades marked
          &ldquo;under review&rdquo; (amber dot) need confirmation before charging. Checklists and go-bys don&apos;t replace
          your department&apos;s policy.
        </p>
        <p className="font-medium">{DISCLAIMER}</p>
      </section>
    </>
  );
}
