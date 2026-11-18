import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

export type Entry = {
  id: string;
  category: string;
  title: string;
  source_type: string | null;
  citation: string | null;
  source_url: string | null;
  grade_or_penalty: string | null;
  key_points: string[];
  officer_notes: string[];
  related: string[];
  status: string;
  source_verified?: boolean;
  grade_review?: boolean;
  last_verified: string | null;
};

/** Compact record used by search and the Saved page. */
export type IndexItem = {
  id: string;
  t: string; // title
  c: string; // citation
  k: string; // category
  g: string; // grade
  x: string; // searchable text (key points + notes)
};

export const CATEGORY_ORDER = [
  "Criminal Law",
  "Motor Vehicle",
  "DWI & Drugs",
  "Use of Force & Search",
  "Investigations",
  "Domestic Violence",
  "Juveniles",
  "Case Law & Legal Terms",
  "Operations & ICS",
  "Hazmat",
  "Medical",
  "Spanish",
  "Tools",
];

export function slugify(category: string) {
  return category.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });

let cache: Entry[] | null = null;

/** Reads every entry JSON at build time. Entries still marked VERIFY are left out. */
export function allEntries(): Entry[] {
  if (cache) return cache;
  const dir = join(process.cwd(), "content", "entries");
  const list: Entry[] = readdirSync(dir)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => JSON.parse(readFileSync(join(dir, f), "utf8")) as Entry)
    .filter((e: Entry) => e.status !== "VERIFY")
    .sort((a: Entry, b: Entry) => collator.compare(a.citation || a.title, b.citation || b.title));
  cache = list;
  return list;
}

export function getEntry(id: string) {
  return allEntries().find((e) => e.id === id) ?? null;
}

export function categories() {
  const counts = new Map<string, number>();
  for (const e of allEntries()) counts.set(e.category, (counts.get(e.category) ?? 0) + 1);
  const ordered = CATEGORY_ORDER.filter((c) => counts.has(c));
  const rest = [...counts.keys()].filter((c) => !CATEGORY_ORDER.includes(c)).sort();
  return [...ordered, ...rest].map((name) => ({ name, slug: slugify(name), count: counts.get(name)! }));
}

export function categoryBySlug(slug: string) {
  return categories().find((c) => c.slug === slug) ?? null;
}

export function searchIndex(): IndexItem[] {
  return allEntries().map((e) => ({
    id: e.id,
    t: e.title,
    c: e.citation ?? "",
    k: e.category,
    g: e.grade_or_penalty ?? "",
    x: [...e.key_points, ...e.officer_notes].join(" "),
  }));
}
