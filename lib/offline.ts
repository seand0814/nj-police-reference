/** Shared names for the offline cache (used by the page and by public/sw.js; keep in sync). */
export const STATIC_CACHE = "njpr-static-v1";
export const PAGES_CACHE = "njpr-pages-v1";
export const OFFLINE_KEY = "njpr.offline";

export type OfflineManifest = { version: string; urls: string[] };
export type OfflineState = { version: string; pages: number; bytes: number; at: string };

export function readOfflineState(): OfflineState | null {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_KEY) || "null");
  } catch {
    return null;
  }
}

/** Script, style and font files a page needs, found in its HTML. */
export function assetUrls(html: string): string[] {
  const out = new Set<string>();
  for (const m of html.matchAll(/\/_next\/static\/[^"'\s)\\]+/g)) out.add(m[0]);
  return [...out];
}

/**
 * Saves every page (and the files each page needs) into the browser's cache so the app works with no signal.
 * Runs in the page, so keep the screen open until it finishes.
 */
export async function downloadAll(manifest: OfflineManifest, onProgress: (done: number, total: number, bytes: number) => void) {
  const pages = await caches.open(PAGES_CACHE);
  const statics = await caches.open(STATIC_CACHE);
  const seen = new Set<string>();
  let done = 0;
  let bytes = 0;
  let failed = 0;
  const queue = [...manifest.urls];

  async function saveAsset(url: string) {
    if (seen.has(url)) return;
    seen.add(url);
    if (await statics.match(url)) return;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const blob = await res.clone().blob();
        bytes += blob.size;
        await statics.put(url, res);
      }
    } catch {}
  }

  async function worker() {
    for (let url = queue.shift(); url !== undefined; url = queue.shift()) {
      try {
        const res = await fetch(url, { cache: "no-cache" });
        if (!res.ok) throw new Error(String(res.status));
        const isHtml = (res.headers.get("content-type") || "").includes("text/html");
        const body = await res.clone().blob();
        bytes += body.size;
        await pages.put(url, res);
        if (isHtml) for (const a of assetUrls(await body.text())) await saveAsset(a);
      } catch {
        failed++;
      }
      done++;
      onProgress(done, manifest.urls.length, bytes);
    }
  }

  await Promise.all(Array.from({ length: 6 }, worker));
  return { pages: done - failed, failed, bytes };
}
