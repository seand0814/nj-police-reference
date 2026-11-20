"use client";

import { useState } from "react";
import Icon from "./Icon";
import { copyText } from "@/lib/copy";
import { haptic } from "@/lib/haptics";

/** Copies a ready-to-paste charge line, e.g. "N.J.S.A. 2C:20-11 – Shoplifting – graded by value". */
export default function CopyCharge({ text, label = "Copy charge" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "fail">("idle");

  async function copy() {
    const ok = await copyText(text);
    setState(ok ? "done" : "fail");
    if (ok) haptic("success");
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-navy-800 px-4 text-sm font-semibold text-white active:scale-95 dark:bg-gold-400 dark:text-navy-900"
    >
      <Icon name={state === "done" ? "check" : "copy"} size={17} />
      {state === "done" ? "Copied" : state === "fail" ? "Copy failed" : label}
    </button>
  );
}
