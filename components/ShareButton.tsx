"use client";

import { useState } from "react";
import Icon from "./Icon";
import { haptic } from "@/lib/haptics";

type Props = { title: string; text: string; path: string; variant?: "light" | "plain" };

/**
 * Opens the phone's share sheet (Messages, Mail, AirDrop, etc.) with a short summary and a link.
 * Where sharing isn't available, copies the same text to the clipboard instead.
 */
export default function ShareButton({ title, text, path, variant = "light" }: Props) {
  const [copied, setCopied] = useState(false);

  async function share() {
    haptic();
    const url = window.location.origin + path;
    const body = `${text}\n\n${url}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, text, url });
        return;
      }
    } catch (e) {
      if ((e as Error).name === "AbortError") return; // user closed the share sheet
    }
    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  const cls =
    variant === "light"
      ? "border-white/25 bg-white/10 text-white"
      : "border-slate-300 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";

  return (
    <button
      type="button"
      onClick={share}
      aria-label={copied ? "Copied to clipboard" : `Share ${title}`}
      className={"flex h-11 min-w-[44px] items-center justify-center gap-1.5 rounded-xl border px-3 text-sm font-semibold active:scale-95 " + cls}
    >
      <Icon name={copied ? "check" : "share"} size={18} />
      <span className="sr-only sm:not-sr-only">{copied ? "Copied" : "Share"}</span>
    </button>
  );
}
