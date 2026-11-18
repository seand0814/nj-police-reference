"use client";

import { useState } from "react";

/** Copies a ready-to-paste charge line, e.g. "N.J.S.A. 2C:20-11 – Shoplifting – graded by value". */
export default function CopyCharge({ text, label = "Copy charge" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("done");
    } catch {
      // Older browsers: fall back to a hidden textarea.
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        setState(ok ? "done" : "fail");
      } catch {
        setState("fail");
      }
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white active:scale-95 dark:bg-white dark:text-slate-900"
    >
      <span aria-hidden>{state === "done" ? "✓" : "📋"}</span>
      {state === "done" ? "Copied" : state === "fail" ? "Copy failed" : label}
    </button>
  );
}
