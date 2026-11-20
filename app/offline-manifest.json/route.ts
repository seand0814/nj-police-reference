import { allChecklists, allComparisons, allEntries } from "@/lib/content";
import { SECTIONS } from "@/lib/sections";

export const dynamic = "force-static";

/** Every page in the app, for "Download for offline". The version changes with each deploy. */
export function GET() {
  const urls = [
    "/", "/search", "/ask", "/more", "/az", "/saved", "/notes", "/contacts", "/radio-codes", "/tools", "/tools/points", "/compare",
    "/search-index.json", "/manifest.webmanifest", "/icon-192.png", "/apple-touch-icon.png", "/logo-1024.png",
    ...SECTIONS.map((s) => `/s/${s.slug}`),
    ...allChecklists().map((c) => `/go/${c.id}`),
    ...allComparisons().map((c) => `/compare/${c.id}`),
    ...allEntries().map((e) => `/entry/${e.id}`),
  ];
  const version = process.env.NEXT_PUBLIC_BUILD_ID || "dev";
  return Response.json({ version, urls });
}
