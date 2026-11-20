import { allChecklists, allEntries, type Entry } from "./content";

const STOP = new Set(
  "a an and are as at be by can could do does for from had has have how i if in is it its me my of on or our should so that the their them then there these they this to under was we what when where which who why will with would you your".split(" ")
);

function terms(q: string) {
  return q
    .toLowerCase()
    .replace(/n\.?j\.?s\.?a\.?/g, " ")
    .split(/[^a-z0-9:.\-]+/)
    .map((t) => t.replace(/^[.\-:]+|[.\-:]+$/g, ""))
    .filter((t) => t.length > 2 && !STOP.has(t));
}

function entryText(e: Entry) {
  return [e.title, e.citation, e.grade_or_penalty, ...e.key_points, ...e.officer_notes, ...(e.faq ?? []).flatMap((f) => [f.q, f.a])].filter(Boolean).join(" ").toLowerCase();
}

let docs: { e: Entry; title: string; body: string }[] | null = null;
let df: Map<string, number> | null = null;

const stem = (t: string) => (t.length > 4 && t.endsWith("s") && !t.endsWith("ss") ? t.slice(0, -1) : t);

/** Picks the app entries most related to the question, to ground the assistant's answer. Rare words count more. */
export function relevantContext(question: string, max = 8): string {
  const ts = [...new Set(terms(question).map(stem))];
  if (!ts.length) return "";
  if (!docs) {
    docs = allEntries().map((e) => ({ e, title: `${e.title} ${e.citation ?? ""}`.toLowerCase(), body: entryText(e) }));
    df = new Map();
  }
  const N = docs.length;
  const weight = (t: string) => {
    if (!df!.has(t)) df!.set(t, docs!.filter((d) => d.body.includes(t) || d.title.includes(t)).length);
    return Math.log((N + 1) / (df!.get(t)! + 1));
  };
  const scored = docs
    .map(({ e, title, body }) => {
      let s = 0;
      let matched = 0;
      for (const t of ts) {
        const w = weight(t);
        if (title.includes(t)) s += 3 * w;
        else if (body.includes(t)) s += w;
        else continue;
        matched++;
      }
      // Favor entries that cover more of the question's words.
      return { e, s: s * (matched / ts.length) ** 2 };
    })
    .filter((x) => x.s > 1)
    .sort((a, b) => b.s - a.s)
    .slice(0, max);

  const blocks = scored.map(({ e }) =>
    [
      `### ${e.title}${e.citation ? ` (${e.citation})` : ""}`,
      e.grade_or_penalty ? `Grade/penalty: ${e.grade_or_penalty}${e.grade_review ? " [grade flagged for review]" : ""}` : "",
      ...e.key_points.map((k) => `- ${k}`),
      ...e.officer_notes.map((k) => `- ${k}`),
      ...(e.faq ?? []).map((f) => `- Q: ${f.q} A: ${f.a}`),
      `Verified against source: ${e.source_verified ? "yes" : "no"}. App link: /entry/${e.id}`,
    ]
      .filter(Boolean)
      .join("\n")
  );

  const lists = allChecklists()
    .filter((c) => ts.some((t) => `${c.title} ${c.summary}`.toLowerCase().includes(t)))
    .slice(0, 2)
    .map((c) => `### Go-by: ${c.title}\n${c.summary}\nApp link: /go/${c.id}`);

  return [...blocks, ...lists].join("\n\n");
}
