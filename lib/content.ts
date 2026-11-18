import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  HUB_GROUPS,
  HUB_STATUTES,
  MV_TYPES,
  OFFENSE_TYPES,
  SECTIONS,
  chapterLabel,
  gradeBadge,
  mvType,
  offenseType,
  parseCite,
  sectionOf,
  type Badge,
} from "./sections";

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
  section?: string;
  group?: string;
};

export type Step = { text: string; detail?: string; link?: string };
export type FlowNode =
  | { q: string; help?: string; yes: string; no: string }
  | { result: string; tone: "red" | "amber" | "green" | "blue"; points: string[]; link?: string; next?: string };
export type Checklist = {
  id: string;
  kind: "checklist" | "flow";
  title: string;
  sections: string[];
  summary: string;
  note: string;
  groups?: { name: string; steps: Step[] }[];
  start?: string;
  nodes?: Record<string, FlowNode>;
};

/** One row in a list: enough to render a title, citation and grade badge. */
export type Row = { id: string; href: string; title: string; citation: string; badge: Badge | null; review: boolean; kind?: string };
export type Group = { name: string; rows: Row[] };

/** Compact record used by search, Saved and Recent. */
export type IndexItem = { id: string; u: string; t: string; c: string; k: string; g: string; x: string };

const collator = new Intl.Collator("en", { numeric: true, sensitivity: "base" });
let entryCache: Entry[] | null = null;
let checklistCache: Checklist[] | null = null;

function readJsonDir<T>(sub: string): T[] {
  const dir = join(process.cwd(), "content", sub);
  return readdirSync(dir)
    .filter((f: string) => f.endsWith(".json"))
    .map((f: string) => JSON.parse(readFileSync(join(dir, f), "utf8")) as T);
}

/** Every published entry (entries marked VERIFY are hidden), sorted by citation then title. */
export function allEntries(): Entry[] {
  if (entryCache) return entryCache;
  const list = readJsonDir<Entry>("entries")
    .filter((e: Entry) => e.status !== "VERIFY")
    .sort((a: Entry, b: Entry) => collator.compare(a.citation || a.title, b.citation || b.title));
  entryCache = list;
  return list;
}

export function allChecklists(): Checklist[] {
  if (checklistCache) return checklistCache;
  const list = readJsonDir<Checklist>("checklists").sort((a: Checklist, b: Checklist) =>
    a.kind === b.kind ? a.title.localeCompare(b.title) : a.kind === "flow" ? -1 : 1
  );
  checklistCache = list;
  return list;
}

export function getEntry(id: string) {
  return allEntries().find((e) => e.id === id) ?? null;
}
export function getChecklist(id: string) {
  return allChecklists().find((c) => c.id === id) ?? null;
}

export function entrySection(e: Entry) {
  return sectionOf(e);
}

function toRow(e: Entry): Row {
  return {
    id: e.id,
    href: `/entry/${e.id}`,
    title: e.title,
    citation: e.citation ?? "",
    badge: gradeBadge(e.grade_or_penalty, e.citation),
    review: !!e.grade_review,
  };
}

function checklistRow(c: Checklist): Row {
  return {
    id: c.id,
    href: `/go/${c.id}`,
    title: c.title,
    citation: c.kind === "flow" ? "Decision go-by" : "Checklist",
    badge: null,
    review: false,
    kind: c.kind,
  };
}

function bucket(rows: { key: string; row: Row }[], order: readonly string[]): Group[] {
  const map = new Map<string, Row[]>();
  for (const { key, row } of rows) {
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(row);
  }
  const keys = [...order.filter((k) => map.has(k)), ...[...map.keys()].filter((k) => !order.includes(k))];
  return keys.map((name) => ({ name, rows: map.get(name)! }));
}

export function sectionEntries(slug: string) {
  return allEntries().filter((e) => entrySection(e) === slug);
}

export function sectionCounts() {
  const counts = new Map<string, number>();
  for (const e of allEntries()) counts.set(entrySection(e), (counts.get(entrySection(e)) ?? 0) + 1);
  counts.set("checklists", allChecklists().length);
  return SECTIONS.map((s) => ({ ...s, count: counts.get(s.slug) ?? 0 }));
}

/** Groups for a section. The Criminal Code has two views; everything else has one. */
export function sectionGroups(slug: string): { byType: Group[]; byChapter?: Group[]; tools: Row[] } {
  const entries = sectionEntries(slug);
  const tools = slug === "checklists" ? [] : allChecklists().filter((c) => c.sections.includes(slug)).map(checklistRow);

  if (slug === "checklists") {
    const all = allChecklists();
    return {
      byType: [
        { name: "Decision Go-Bys", rows: all.filter((c) => c.kind === "flow").map(checklistRow) },
        { name: "Checklists", rows: all.filter((c) => c.kind === "checklist").map(checklistRow) },
      ],
      tools: [],
    };
  }

  if (slug === "criminal-code") {
    const parsed = entries.flatMap((e) => {
      const c = parseCite(e.citation);
      return c ? [{ e, c }] : [];
    });
    const byType = bucket(parsed.map(({ e, c }) => ({ key: e.group || offenseType(c), row: toRow(e) })), OFFENSE_TYPES);
    const chapters = [...new Set(parsed.map((x) => x.c.chapter))].sort((a, b) => a - b).map(chapterLabel);
    const byChapter = bucket(parsed.map(({ e, c }) => ({ key: chapterLabel(c.chapter), row: toRow(e) })), chapters);
    return { byType, byChapter, tools };
  }

  if (slug === "motor-vehicle") {
    const rows = entries.map((e) => {
      const c = parseCite(e.citation);
      return { key: e.group || (c ? mvType(c) : "Moving Violations"), row: toRow(e) };
    });
    return { byType: bucket(rows, MV_TYPES), tools };
  }

  if (slug === "other-statutes") {
    const rows = entries.map((e) => ({
      key: parseCite(e.citation)?.title === "30" ? "Mental Health Screening (Title 30)" : "Animal Cruelty (Title 4)",
      row: toRow(e),
    }));
    return { byType: bucket(rows, ["Animal Cruelty (Title 4)", "Mental Health Screening (Title 30)"]), tools };
  }

  // Hub sections: named groups, then related statutes that live in other sections.
  const rows = entries.map((e) => ({ key: e.group || HUB_GROUPS[e.id] || "Procedures & Reference", row: toRow(e) }));
  const groups = bucket(rows, [...new Set(Object.values(HUB_GROUPS)), "Procedures & Reference"]);
  const filter = HUB_STATUTES[slug];
  if (filter) {
    const related = allEntries().filter((e) => {
      const c = e.source_type === "statute" ? parseCite(e.citation) : null;
      return c !== null && filter(c) && entrySection(e) !== slug;
    });
    if (related.length) groups.push({ name: "Related Statutes", rows: related.map(toRow) });
  }
  return { byType: groups, tools };
}

export function searchIndex(): IndexItem[] {
  const entries = allEntries().map((e) => ({
    id: e.id,
    u: `/entry/${e.id}`,
    t: e.title,
    c: e.citation ?? "",
    k: e.category,
    g: e.grade_or_penalty ?? "",
    x: [...e.key_points, ...e.officer_notes].join(" "),
  }));
  const lists = allChecklists().map((c) => ({
    id: "go:" + c.id,
    u: `/go/${c.id}`,
    t: c.title,
    c: c.kind === "flow" ? "Decision go-by" : "Checklist",
    k: "Checklists & Go-Bys",
    g: "",
    x: [
      c.summary,
      ...(c.groups ?? []).flatMap((g) => g.steps.map((s) => s.text)),
      ...Object.values(c.nodes ?? {}).map((n) => ("q" in n ? n.q : n.result)),
    ].join(" "),
  }));
  return [...lists, ...entries];
}
