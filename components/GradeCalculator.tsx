"use client";

import Link from "next/link";
import { useState } from "react";
import { inputCls } from "./ui";

type Tier = { min: number; max: number; label: string; cls: string };
type Calc = { key: string; name: string; cite: string; href: string; tiers: Tier[]; note?: string; review?: boolean };

const RED = "bg-orange-500 text-white";
const AMB = "bg-amber-400 text-amber-950";
const YEL = "bg-yellow-200 text-yellow-900";
const BLU = "bg-blue-500 text-white";
const INF = Number.POSITIVE_INFINITY;

const CALCS: Calc[] = [
  {
    key: "theft", name: "Theft / Shoplifting", cite: "2C:20-2, 2C:20-11", href: "/entry/njsa-2c-20-2",
    tiers: [
      { min: 75000, max: INF, label: "2nd degree", cls: RED },
      { min: 500.01, max: 75000, label: "3rd degree", cls: AMB },
      { min: 200, max: 500, label: "4th degree", cls: YEL },
      { min: 0, max: 200, label: "Disorderly persons", cls: BLU },
    ],
    note: "Theft of a firearm, motor vehicle, vessel, horse, airplane or CDS is 3rd degree regardless of value; extortion is 2nd degree.",
  },
  {
    key: "checks", name: "Bad Checks", cite: "2C:21-5", href: "/entry/njsa-2c-21-5",
    tiers: [
      { min: 75000, max: INF, label: "2nd degree", cls: RED },
      { min: 1000, max: 75000, label: "3rd degree", cls: AMB },
      { min: 200, max: 1000, label: "4th degree", cls: YEL },
      { min: 0, max: 200, label: "Disorderly persons", cls: BLU },
    ],
  },
  {
    key: "mischief", name: "Criminal Mischief", cite: "2C:17-3", href: "/entry/njsa-2c-17-3", review: true,
    tiers: [
      { min: 75000, max: INF, label: "2nd degree", cls: RED },
      { min: 2000, max: 75000, label: "3rd degree", cls: AMB },
      { min: 500.01, max: 2000, label: "4th degree", cls: YEL },
      { min: 0, max: 500.01, label: "Disorderly persons", cls: BLU },
    ],
    note: "Certain targets (such as utilities, schools or research facilities) can raise the grade regardless of amount.",
  },
];

function grade(c: Calc, v: number) {
  return c.tiers.find((t) => v >= t.min && v < t.max) ?? c.tiers[c.tiers.length - 1];
}

export default function GradeCalculator() {
  const [k, setK] = useState("theft");
  const [val, setVal] = useState("");
  const c = CALCS.find((x) => x.key === k)!;
  const n = parseFloat(val.replace(/[$,\s]/g, ""));
  const t = Number.isFinite(n) && n >= 0 ? grade(c, n) : null;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-200 p-1 dark:bg-slate-800">
        {CALCS.map((x) => (
          <button
            key={x.key}
            type="button"
            onClick={() => setK(x.key)}
            aria-pressed={k === x.key}
            className={"min-h-[44px] rounded-lg px-1 text-xs font-semibold " + (k === x.key ? "bg-white shadow dark:bg-slate-950" : "text-slate-600 dark:text-slate-300")}
          >
            {x.name}
          </button>
        ))}
      </div>
      <label className="block space-y-1">
        <span className="text-sm font-medium">Total value ($)</span>
        <input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} placeholder="e.g. 649.99" className={inputCls + " text-2xl font-bold"} />
      </label>
      <div className="flex min-h-[64px] items-center justify-between rounded-xl bg-slate-50 px-4 dark:bg-slate-950">
        <span className="text-sm text-slate-500">N.J.S.A. {c.cite}</span>
        {t ? <span className={"rounded-full px-4 py-1.5 text-lg font-extrabold " + t.cls}>{t.label}</span> : <span className="text-slate-400">Enter a value</span>}
      </div>
      {c.note ? <p className="text-sm text-slate-600 dark:text-slate-400">{c.note}</p> : null}
      {c.review ? <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">⚠️ Thresholds under review — confirm before charging.</p> : null}
      <Link href={c.href} className="inline-block text-sm font-medium text-brand dark:text-brand-dark">Open the statute ›</Link>
    </div>
  );
}
