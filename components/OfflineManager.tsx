"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { haptic } from "@/lib/haptics";
import { OFFLINE_KEY, PAGES_CACHE, STATIC_CACHE, downloadAll, readOfflineState, type OfflineManifest, type OfflineState } from "@/lib/offline";

function mb(bytes: number) {
  return bytes >= 1e6 ? `${(bytes / 1e6).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1e3))} KB`;
}

export async function fetchManifest(): Promise<OfflineManifest | null> {
  try {
    const r = await fetch("/offline-manifest.json", { cache: "no-store" });
    return r.ok ? await r.json() : null;
  } catch {
    return null;
  }
}

/** "Download for offline" card on the More page. */
export default function OfflineManager() {
  const [supported, setSupported] = useState(true);
  const [saved, setSaved] = useState<OfflineState | null>(null);
  const [latest, setLatest] = useState<string | null>(null);
  const [progress, setProgress] = useState<{ done: number; total: number; bytes: number } | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    setSupported("caches" in window && "serviceWorker" in navigator);
    setSaved(readOfflineState());
    fetchManifest().then((m) => setLatest(m?.version ?? null));
  }, []);

  async function download() {
    setMsg("");
    const m = await fetchManifest();
    if (!m) {
      setMsg("Couldn't reach the server. Connect to Wi-Fi or data and try again.");
      return;
    }
    try {
      await navigator.storage?.persist?.();
    } catch {}
    setProgress({ done: 0, total: m.urls.length, bytes: 0 });
    const r = await downloadAll(m, (done, total, bytes) => setProgress({ done, total, bytes }));
    const state: OfflineState = { version: m.version, pages: r.pages, bytes: r.bytes, at: new Date().toISOString() };
    try {
      localStorage.setItem(OFFLINE_KEY, JSON.stringify(state));
    } catch {}
    setSaved(state);
    setLatest(m.version);
    setProgress(null);
    haptic("success");
    setMsg(r.failed ? `Saved ${r.pages} pages. ${r.failed} didn't download; tap Update to retry.` : "Done. The whole app now works with no signal.");
  }

  async function remove() {
    if (!confirm("Remove the offline copy from this phone?")) return;
    await Promise.all([caches.delete(PAGES_CACHE), caches.delete(STATIC_CACHE)]);
    try {
      localStorage.removeItem(OFFLINE_KEY);
    } catch {}
    setSaved(null);
    setMsg("Offline copy removed. Pages you open will still be saved as you go.");
  }

  if (!supported) {
    return <p className="text-sm text-slate-600 dark:text-slate-400">This browser can&apos;t save the app for offline use. Update iOS or open it in Safari.</p>;
  }

  const busy = progress !== null;
  const outdated = !!saved && !!latest && saved.version !== latest;
  const pct = progress ? Math.round((progress.done / Math.max(1, progress.total)) * 100) : 0;

  return (
    <div>
      <div className="flex items-start gap-3">
        <span className={"flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white " + (saved && !outdated ? "bg-emerald-600" : "bg-navy-800")}>
          <Icon name={saved && !outdated ? "check" : "file"} size={20} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold">
            {busy ? "Downloading…" : saved ? (outdated ? "Update available" : "Saved for offline") : "Not downloaded yet"}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {saved && !busy
              ? `${saved.pages} pages · ${mb(saved.bytes)} · ${new Date(saved.at).toLocaleDateString("en-US")}`
              : "Every statute, case, checklist and go-by on this phone. Best on Wi-Fi."}
          </p>
        </div>
      </div>

      {busy ? (
        <div className="mt-3">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
            <div className="h-full rounded-full bg-gold-400 transition-all" style={{ width: pct + "%" }} />
          </div>
          <p className="mt-1.5 text-xs text-slate-500">
            {progress!.done} of {progress!.total} · {mb(progress!.bytes)} · keep this screen open
          </p>
        </div>
      ) : (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={download}
            className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-navy-800 px-4 text-sm font-semibold text-white active:scale-[0.98] dark:bg-gold-400 dark:text-navy-900"
          >
            <Icon name="file" size={17} /> {saved ? (outdated ? "Update offline copy" : "Re-download") : "Download for offline"}
          </button>
          {saved ? (
            <button type="button" onClick={remove} className="min-h-[44px] rounded-xl border border-slate-300 px-4 text-sm font-medium dark:border-white/15">
              Remove
            </button>
          ) : null}
        </div>
      )}
      {msg ? <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300">{msg}</p> : null}
    </div>
  );
}
