"use client";

import type { Step } from "@/lib/content";
import CopyCharge from "./CopyCharge";

/** Shows a report outline and copies it as plain text for pasting into a report system. */
export default function TemplateView({ title, groups }: { title: string; groups: { name: string; steps: Step[] }[] }) {
  const text = [
    title.toUpperCase(),
    "",
    ...groups.flatMap((g) => [g.name.toUpperCase() + ":", ...g.steps.map((s) => `- ${s.text}: `), ""]),
  ].join("\n");

  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3 rounded-2xl bg-slate-100 p-3 dark:bg-slate-900">
        <p className="text-sm text-slate-600 dark:text-slate-400">Copy the outline, paste it into your report, and fill in each line.</p>
        <CopyOutline text={text} />
      </div>
      <div className="space-y-4">
        {groups.map((g, gi) => (
          <section key={g.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="flex items-center gap-2 bg-slate-100 px-4 py-2.5 text-sm font-bold dark:bg-slate-800">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-xs text-white">{gi + 1}</span>
              {g.name}
            </h2>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {g.steps.map((s, si) => (
                <li key={si} className="flex gap-3 px-4 py-3">
                  <span aria-hidden className="text-slate-400">✎</span>
                  <span>{s.text}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function CopyOutline({ text }: { text: string }) {
  return (
    <span className="shrink-0 [&_button]:whitespace-nowrap">
      <CopyCharge text={text} label="Copy outline" />
    </span>
  );
}
