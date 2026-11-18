"use client";

import { useState } from "react";
import { KEYS, newId, useStoredList } from "@/lib/useStoredList";
import { DeviceNote, PageTitle, btnCls, btnGhostCls, inputCls } from "@/components/ui";

type Contact = { id: string; name: string; phone: string; notes: string };

export default function ContactsPage() {
  const { items, save } = useStoredList<Contact>(KEYS.contacts);
  const [form, setForm] = useState({ name: "", phone: "", notes: "" });
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    save([...items, { id: newId(), name: form.name.trim(), phone: form.phone.trim(), notes: form.notes.trim() }]);
    setForm({ name: "", phone: "", notes: "" });
  }

  return (
    <>
      <PageTitle>My Phone Numbers</PageTitle>
      <DeviceNote />
      <form onSubmit={add} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name (e.g. Prosecutor on-call)" maxLength={200} className={inputCls} />
        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} type="tel" placeholder="Phone" maxLength={50} className={inputCls} />
        <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Notes" maxLength={2000} className={inputCls} />
        <button className={btnCls}>Add</button>
      </form>
      <ul className="mt-4 space-y-2">
        {sorted.map((c) => (
          <li key={c.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="min-w-0">
              <div className="font-medium">{c.name}</div>
              {c.phone ? <a href={`tel:${c.phone.replace(/[^\d+]/g, "")}`} className="text-brand underline dark:text-brand-dark">{c.phone}</a> : null}
              {c.notes ? <div className="text-sm text-slate-500">{c.notes}</div> : null}
            </div>
            <button type="button" onClick={() => confirm(`Delete ${c.name}?`) && save(items.filter((x) => x.id !== c.id))} className={btnGhostCls} aria-label={`Delete ${c.name}`}>✕</button>
          </li>
        ))}
      </ul>
    </>
  );
}
