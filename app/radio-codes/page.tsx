"use client";

import { useState } from "react";
import { KEYS, newId, useStoredList } from "@/lib/useStoredList";
import { DeviceNote, PageTitle, btnCls, btnGhostCls, inputCls } from "@/components/ui";

type Code = { id: string; code: string; meaning: string };
const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

export default function RadioCodesPage() {
  const { items, save } = useStoredList<Code>(KEYS.radio);
  const [code, setCode] = useState("");
  const [meaning, setMeaning] = useState("");
  const sorted = [...items].sort((a, b) => collator.compare(a.code, b.code));

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!code.trim() || !meaning.trim()) return;
    save([...items, { id: newId(), code: code.trim().slice(0, 30), meaning: meaning.trim().slice(0, 300) }]);
    setCode("");
    setMeaning("");
  }

  return (
    <>
      <PageTitle sub="Enter your agency's codes">Radio Codes</PageTitle>
      <DeviceNote />
      <p className="mb-4 rounded-lg bg-slate-100 p-3 text-sm text-slate-700 dark:bg-slate-900 dark:text-slate-300">
        10-codes differ between agencies. APCO and NIMS recommend plain language for multi-agency radio traffic.
      </p>
      <form onSubmit={add} className="flex flex-col gap-2 sm:flex-row">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Code (e.g. 10-4)" maxLength={30} className={inputCls + " sm:w-40"} />
        <input value={meaning} onChange={(e) => setMeaning(e.target.value)} placeholder="Meaning" maxLength={300} className={inputCls} />
        <button className={btnCls}>Add</button>
      </form>
      <table className="mt-4 w-full overflow-hidden rounded-xl bg-white text-left dark:bg-slate-900">
        <tbody>
          {sorted.map((c) => (
            <tr key={c.id} className="border-b border-slate-100 last:border-0 dark:border-slate-800">
              <td className="whitespace-nowrap p-3 font-mono font-semibold">{c.code}</td>
              <td className="p-3">{c.meaning}</td>
              <td className="p-2 text-right">
                <button type="button" onClick={() => save(items.filter((x) => x.id !== c.id))} className={btnGhostCls} aria-label={`Delete ${c.code}`}>✕</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
