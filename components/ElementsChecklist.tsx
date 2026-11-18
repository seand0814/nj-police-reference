"use client";

import { useState } from "react";

/** Tap each element as you confirm probable cause for it. Not saved: resets when you leave the page. */
export default function ElementsChecklist({ elements }: { elements: string[] }) {
  const [done, setDone] = useState<number[]>([]);
  const required = elements.filter((e) => !/^(OR\b|Note\b|Record\b|Determine\b|Identify\b|Document\b|Intent evidence\b|Check\b|For\b)/.test(e));
  const doneRequired = done.filter((i) => required.includes(elements[i])).length;
  const allMet = required.length > 0 && doneRequired === required.length;

  function toggle(i: number) {
    setDone(done.includes(i) ? done.filter((x) => x !== i) : [...done, i]);
  }

  return (
    <section className="mt-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
          <span aria-hidden>✅</span> Elements to prove
        </h2>
        {done.length ? (
          <button type="button" onClick={() => setDone([])} className="text-sm font-medium text-brand dark:text-brand-dark">Reset</button>
        ) : null}
      </div>
      <ul className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {elements.map((el, i) => {
          const on = done.includes(i);
          const isAlt = /^OR\b/.test(el);
          const isNote = !required.includes(el) && !isAlt;
          return (
            <li key={i} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => toggle(i)}
                className="flex w-full items-start gap-3 px-4 py-3 text-left"
              >
                <span
                  className={
                    "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 text-xs font-bold " +
                    (on ? "border-emerald-600 bg-emerald-600 text-white" : "border-slate-300 dark:border-slate-600")
                  }
                >
                  {on ? "✓" : ""}
                </span>
                <span className={"leading-snug " + (isNote ? "text-sm italic text-slate-500 " : "") + (isAlt ? "text-slate-700 dark:text-slate-300 " : "")}>
                  {el}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      <p className={"mt-2 rounded-xl px-3 py-2 text-sm font-medium " + (allMet ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" : "bg-slate-100 text-slate-600 dark:bg-slate-900 dark:text-slate-400")}>
        {allMet
          ? "All listed elements checked. Confirm alternatives (OR) and grading facts."
          : `${doneRequired} of ${required.length} elements checked`}
      </p>
      <p className="mt-1 text-xs text-slate-500">Elements are a plain-language guide, not yet verified against the statute or model jury charges.</p>
    </section>
  );
}
