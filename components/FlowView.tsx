"use client";

import Link from "next/link";
import { useState } from "react";
import type { FlowNode } from "@/lib/content";
import { btnGhostCls } from "./ui";

const TONES = {
  red: "border-red-600 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100",
  amber: "border-amber-500 bg-amber-50 text-amber-900 dark:bg-amber-950 dark:text-amber-100",
  green: "border-emerald-600 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100",
  blue: "border-blue-600 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
};

type Answer = { q: string; a: "Yes" | "No" };

/** Yes/No decision guide. Shows each answer so far and lets the user step back. */
export default function FlowView({ start, nodes }: { start: string; nodes: Record<string, FlowNode> }) {
  const [path, setPath] = useState<string[]>([start]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const current = nodes[path[path.length - 1]];

  function go(next: string, a?: Answer) {
    setPath([...path, next]);
    if (a) setAnswers([...answers, a]);
  }
  function back() {
    if (path.length <= 1) return;
    const prev = nodes[path[path.length - 2]];
    setPath(path.slice(0, -1));
    // Leaving a question recorded an answer; leaving a result via "Continue" did not.
    if (prev && "q" in prev) setAnswers(answers.slice(0, -1));
  }
  function restart() {
    setPath([start]);
    setAnswers([]);
  }

  if (!current) return <p className="text-red-600">This go-by is missing a step.</p>;

  return (
    <div>
      {answers.length ? (
        <ol className="mb-4 space-y-1.5">
          {answers.map((a, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
              <span className={"mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[11px] font-bold " + (a.a === "Yes" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100" : "bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200")}>
                {a.a}
              </span>
              <span>{a.q}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {"q" in current ? (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Question {answers.length + 1}</p>
          <h2 className="mt-1 text-xl font-bold leading-snug">{current.q}</h2>
          {current.help ? <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{current.help}</p> : null}
          <div className="mt-5 grid grid-cols-2 gap-3">
            <button type="button" onClick={() => go(current.yes, { q: current.q, a: "Yes" })} className="min-h-[56px] rounded-2xl bg-emerald-600 text-lg font-bold text-white active:scale-95">
              Yes
            </button>
            <button type="button" onClick={() => go(current.no, { q: current.q, a: "No" })} className="min-h-[56px] rounded-2xl bg-slate-700 text-lg font-bold text-white active:scale-95 dark:bg-slate-600">
              No
            </button>
          </div>
        </section>
      ) : (
        <section className={"rounded-2xl border-l-8 p-5 shadow-sm " + TONES[current.tone]}>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Result</p>
          <h2 className="mt-1 text-2xl font-extrabold leading-tight">{current.result}</h2>
          <ul className="mt-3 space-y-2">
            {current.points.map((p, i) => (
              <li key={i} className="flex gap-2"><span aria-hidden>•</span><span>{p}</span></li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {current.next ? (
              <button type="button" onClick={() => go(current.next!)} className="min-h-[44px] rounded-xl bg-slate-900 px-4 font-semibold text-white dark:bg-white dark:text-slate-900">
                Continue ›
              </button>
            ) : null}
            {current.link ? (
              <Link href={current.link} className="inline-flex min-h-[44px] items-center rounded-xl bg-white/70 px-4 font-semibold text-slate-900 dark:bg-slate-900/60 dark:text-white">
                Open reference ›
              </Link>
            ) : null}
          </div>
        </section>
      )}

      <div className="mt-4 flex gap-2">
        <button type="button" onClick={back} disabled={path.length <= 1} className={btnGhostCls + " flex-1"}>‹ Back</button>
        <button type="button" onClick={restart} className={btnGhostCls + " flex-1"}>Start over</button>
      </div>
    </div>
  );
}
