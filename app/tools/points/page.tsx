import Link from "next/link";
import { allEntries } from "@/lib/content";
import { parseCite } from "@/lib/sections";
import PointsTable, { type PointsRow } from "@/components/PointsTable";
import { PageTitle } from "@/components/ui";

export const metadata = { title: "Title 39 Points & Penalties · NJ Police Reference" };

export default function PointsPage() {
  const rows: PointsRow[] = allEntries()
    .filter((e) => e.source_type === "statute" && parseCite(e.citation)?.title === "39" && e.grade_or_penalty)
    .map((e) => {
      const g = e.grade_or_penalty ?? "";
      const nums = [...g.matchAll(/(\d+)\s*points?\b/gi)].map((m) => Number(m[1]));
      const tiers = /points?:/i.test(g) || nums.length > 1;
      return {
        id: e.id,
        cite: (e.citation ?? "").replace(/^N\.J\.S\.A\.\s*/, "").replace(/\s*\(.*$/, ""),
        title: e.title,
        points: nums.length ? Math.max(...nums) : /points?:/i.test(g) ? 5 : null,
        pointsText: tiers ? "points vary — open entry" : /no points/i.test(g) ? "no points" : "",
        penalty: g,
      };
    })
    .filter((r) => r.points !== null || /\$|fine|forfeit|points/i.test(r.penalty));

  return (
    <>
      <Link href="/s/motor-vehicle" className="text-sm text-brand dark:text-brand-dark">← Motor Vehicle</Link>
      <PageTitle sub="MVC points by violation, from the app's Title 39 entries">Points & Penalties</PageTitle>
      <p className="mb-3 rounded-xl bg-amber-50 p-3 text-xs text-amber-900 dark:bg-amber-950 dark:text-amber-100">
        Points and fines here come from entries that are not yet verified. Fines vary by court and are set by statute and the
        statewide violations schedule. Confirm before quoting them to a driver.
      </p>
      <PointsTable rows={rows} />
    </>
  );
}
