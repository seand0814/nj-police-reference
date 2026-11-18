"use client";

import { useState } from "react";
import { KEYS, newId, useStoredList } from "@/lib/useStoredList";
import { DeviceNote, PageTitle, btnCls, btnGhostCls, inputCls } from "@/components/ui";

type Note = { id: string; title: string; body: string; updated: number };

export default function NotesPage() {
  const { items, save } = useStoredList<Note>(KEYS.notes);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const sorted = [...items].sort((a, b) => b.updated - a.updated);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    save([{ id: newId(), title: title.trim().slice(0, 200), body: body.slice(0, 20000), updated: Date.now() }, ...items]);
    setTitle("");
    setBody("");
  }

  function update(id: string, patch: Partial<Note>) {
    save(items.map((n) => (n.id === id ? { ...n, ...patch, updated: Date.now() } : n)));
  }

  return (
    <>
      <PageTitle>My Notes</PageTitle>
      <DeviceNote />
      <form onSubmit={add} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" maxLength={200} className={inputCls} />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Note" rows={4} className={inputCls} />
        <button className={btnCls}>Add note</button>
      </form>
      <ul className="mt-4 space-y-3">
        {sorted.map((n) => (
          <li key={n.id}>
            <details className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <summary className="flex min-h-[48px] cursor-pointer items-center px-4 font-medium">{n.title}</summary>
              <div className="space-y-2 border-t border-slate-100 p-4 dark:border-slate-800">
                <input
                  defaultValue={n.title}
                  maxLength={200}
                  onBlur={(e) => e.target.value.trim() && update(n.id, { title: e.target.value.trim() })}
                  className={inputCls}
                />
                <textarea defaultValue={n.body} rows={6} onBlur={(e) => update(n.id, { body: e.target.value })} className={inputCls} />
                <p className="text-xs text-slate-500">Changes save when you tap outside the box.</p>
                <button type="button" onClick={() => confirm("Delete this note?") && save(items.filter((x) => x.id !== n.id))} className={btnGhostCls}>
                  Delete
                </button>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
