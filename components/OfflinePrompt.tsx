"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Icon from "./Icon";
import { fetchManifest } from "./OfflineManager";
import { readOfflineState } from "@/lib/offline";

const DISMISS_KEY = "njpr.offlinePrompt";

/** Home screen nudge: download for offline the first time, or update the offline copy after new content ships. */
export default function OfflinePrompt() {
  const [mode, setMode] = useState<"first" | "update" | null>(null);

  useEffect(() => {
    if (!("caches" in window) || !navigator.onLine) return;
    const saved = readOfflineState();
    if (!saved) {
      try {
        if (!localStorage.getItem(DISMISS_KEY)) setMode("first");
      } catch {}
      return;
    }
    fetchManifest().then((m) => {
      if (m && m.version !== saved.version) setMode("update");
    });
  }, []);

  if (!mode) return null;
  return (
    <div className="mb-6 flex items-center gap-3 rounded-2xl border border-gold-400/50 bg-gold-300/15 p-3.5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-navy-800 text-gold-300">
        <Icon name="file" size={20} />
      </span>
      <Link href="/more#offline" className="min-w-0 flex-1">
        <span className="block text-sm font-semibold">{mode === "first" ? "Use it with no signal" : "Updates ready for offline"}</span>
        <span className="block text-xs text-slate-600 dark:text-slate-400">
          {mode === "first" ? "Download everything to this phone (best on Wi-Fi)" : "Tap to update your offline copy"}
        </span>
      </Link>
      {mode === "first" ? (
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            setMode(null);
            try {
              localStorage.setItem(DISMISS_KEY, "1");
            } catch {}
          }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500"
        >
          <Icon name="close" size={18} />
        </button>
      ) : (
        <Icon name="chevronRight" size={18} className="text-slate-400" />
      )}
    </div>
  );
}
