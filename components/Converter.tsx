"use client";

import { useState } from "react";
import { inputCls } from "./ui";

type Conv = { label: string; from: string; to: string; fn: (x: number) => number };

const CONVERSIONS: Conv[] = [
  { label: "Weight", from: "ounces", to: "grams", fn: (x) => x * 28.3495 },
  { label: "Weight", from: "grams", to: "ounces", fn: (x) => x / 28.3495 },
  { label: "Weight", from: "pounds", to: "kilograms", fn: (x) => x * 0.453592 },
  { label: "Weight", from: "kilograms", to: "pounds", fn: (x) => x / 0.453592 },
  { label: "Length", from: "inches", to: "centimeters", fn: (x) => x * 2.54 },
  { label: "Length", from: "feet", to: "meters", fn: (x) => x * 0.3048 },
  { label: "Length", from: "meters", to: "feet", fn: (x) => x / 0.3048 },
  { label: "Distance", from: "miles", to: "kilometers", fn: (x) => x * 1.609344 },
  { label: "Speed", from: "mph", to: "feet per second", fn: (x) => x * 1.46667 },
  { label: "Speed", from: "mph", to: "km/h", fn: (x) => x * 1.609344 },
  { label: "Temperature", from: "°C", to: "°F", fn: (x) => (x * 9) / 5 + 32 },
  { label: "Temperature", from: "°F", to: "°C", fn: (x) => ((x - 32) * 5) / 9 },
];

export default function Converter() {
  const [i, setI] = useState(0);
  const [val, setVal] = useState("1");
  const c = CONVERSIONS[i];
  const n = parseFloat(val);
  const out = Number.isFinite(n) ? c.fn(n) : NaN;

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <label className="block space-y-1">
        <span className="text-sm font-medium">Conversion</span>
        <select value={i} onChange={(e) => setI(Number(e.target.value))} className={inputCls}>
          {CONVERSIONS.map((c, idx) => (
            <option key={idx} value={idx}>{`${c.label}: ${c.from} → ${c.to}`}</option>
          ))}
        </select>
      </label>
      <label className="block space-y-1">
        <span className="text-sm font-medium">{c.from}</span>
        <input inputMode="decimal" value={val} onChange={(e) => setVal(e.target.value)} className={inputCls} />
      </label>
      <p className="text-2xl font-bold" aria-live="polite">
        {Number.isFinite(out) ? `${out.toLocaleString("en-US", { maximumFractionDigits: 3 })} ${c.to}` : "—"}
      </p>
    </div>
  );
}
