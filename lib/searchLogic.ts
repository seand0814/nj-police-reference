/** Search scoring used by the Search page. Pure functions, no React, so it can be tested on its own. */

export type SearchItem = { id: string; u: string; t: string; c: string; k: string; g: string; x: string; s?: string };

/** Whole-phrase shorthand, applied before the query is split into words. */
const PHRASES: [RegExp, string][] = [
  [/\bhit\s*(and|&|n)\s*run\b/g, "leaving scene"],
  [/\bdriving while suspended\b/g, "suspended"],
  [/\brestraining order\b/g, "restraining"],
  [/\bstop and frisk\b/g, "frisk"],
];

/** Word shorthand and slang → words that appear in the content. A term matches if any alternative matches. */
const SYNONYMS: Record<string, string[]> = {
  dui: ["dwi", "intoxicated"],
  drunk: ["dwi", "intoxicated"],
  tro: ["restraining", "tro"],
  fro: ["restraining", "final"],
  dws: ["suspended", "revoked"],
  pwid: ["distribute", "distribution"],
  uof: ["force"],
  bwc: ["body-worn", "camera"],
  dv: ["domestic"],
  erpo: ["erpo", "extreme risk"],
  saspa: ["saspa", "sexual assault survivor"],
  cds: ["cds", "controlled dangerous"],
  weed: ["marijuana", "cannabis"],
  pot: ["marijuana", "cannabis"],
  marijuana: ["marijuana", "cannabis"],
  gun: ["firearm", "handgun", "weapon", "gun"],
  guns: ["firearm", "handgun", "weapon", "gun"],
  knife: ["knife", "weapon"],
  texting: ["handheld", "wireless", "texting"],
  cellphone: ["handheld", "cell phone"],
  speeding: ["speed"],
  tint: ["windshield", "window", "obstructed"],
  uninsured: ["insurance", "uninsured"],
  mischief: ["mischief"],
  b_and_e: ["burglary"],
  fleeing: ["eluding", "flight"],
  eluding: ["eluding"],
  "302": ["screening", "commitment"],
  emt: ["ems", "emergency medical"],
  police: ["police", "law enforcement", "officer"],
  cop: ["police", "law enforcement", "officer"],
  cops: ["police", "law enforcement", "officer"],
  officer: ["officer", "police", "law enforcement"],
  stole: ["theft", "stolen", "steal"],
  stealing: ["theft", "steal"],
  steal: ["theft", "steal"],
  choking: ["strangulation", "strangle", "choke"],
  choked: ["strangulation", "strangle", "choke"],
  breaking: ["burglary", "breaking"],
  car: ["car", "vehicle", "conveyance"],
  vehicle: ["vehicle", "car", "conveyance"],
  threat: ["threat", "threats", "threaten"],
  threats: ["threat", "threats", "threaten"],
  ems: ["ems", "emergency medical"],
};

export const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/n\.?\s?j\.?\s?s\.?\s?a\.?/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Filler words dropped from multi-word queries ("assault on a police officer"). */
const STOP = new Set(["a", "an", "the", "of", "on", "in", "to", "for", "with", "by", "at", "from", "into", "against", "is", "was", "what", "whats", "how", "do", "i", "my", "someone", "somebody", "person", "charge", "nj"]);

/** Spoken citations: "two c twenty dash eleven" style dictation becomes "2c 20-11". */
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

/** "twenty one" / "twenty-one" / "eleven" → digits, so spoken statute numbers match. */
function spokenNumbers(s: string) {
  return s
    .replace(new RegExp(`\\b(${TENS.slice(2).join("|")})[\\s-]+(${ONES.slice(1, 10).join("|")})\\b`, "g"), (_, t, o) => String(TENS.indexOf(t) * 10 + ONES.indexOf(o)))
    .replace(new RegExp(`\\b(${TENS.slice(2).join("|")})\\b`, "g"), (t) => String(TENS.indexOf(t) * 10))
    .replace(new RegExp(`\\b(${ONES.join("|")})\\b`, "g"), (o) => String(ONES.indexOf(o)));
}

export function cleanSpoken(q: string) {
  return spokenNumbers(q.toLowerCase())
    .replace(/\b2\s*c\b/g, "2c")
    .replace(/\s*\b(dash|hyphen)\b\s*/g, "-")
    .replace(/\s*\bcolon\b\s*/g, ":")
    .replace(/[.?!]+$/, "")
    .trim();
}

function words(q: string): string[] {
  let s = norm(q);
  for (const [re, rep] of PHRASES) s = s.replace(re, rep);
  const all = s.split(" ").filter(Boolean);
  const kept = all.filter((t) => !STOP.has(t));
  return kept.length ? kept : all;
}

export function queryTerms(q: string): string[][] {
  return words(q)
    .map((t) => {
      const syn = SYNONYMS[t];
      return syn ? [...new Set([t, ...syn])] : [t];
    });
}

/** Levenshtein distance with an early exit once it exceeds max. */
export function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      cur.push(v);
      if (v < rowMin) rowMin = v;
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

/** Short terms (3 letters or fewer, like "tro" or "dws") must match a whole word, not part of one. */
function has(hay: string, t: string) {
  if (t.length > 3) return hay.includes(t);
  const esc = t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${esc}([^a-z0-9]|$)`).test(hay);
}

function fuzzyIn(term: string, words: string[]) {
  if (term.length < 4 || /\d/.test(term)) return false;
  const max = term.length >= 9 ? 2 : 1;
  return words.some((w) => w.length >= 3 && editDistance(term, w.slice(0, term.length + max), max) <= max);
}

type Prepared = { item: SearchItem; title: string; cite: string; rest: string; titleWords: string[] };

export function prepare(items: SearchItem[]): Prepared[] {
  return items.map((item) => {
    const title = norm(item.t);
    return {
      item,
      title,
      cite: norm(item.c),
      rest: norm(`${item.k} ${item.g} ${item.x}`),
      titleWords: `${title} ${norm(item.k)}`.split(/[^a-z0-9]+/).filter(Boolean),
    };
  });
}

/** Every query term (or one of its synonyms) must match somewhere. Exact title/citation matches rank highest; typo matches rank lower. */
export function score(p: Prepared, terms: string[][]): number {
  let s = p.item.id.startsWith("go:") ? 2 : 0;
  for (const alts of terms) {
    let best = 0;
    for (const t of alts) {
      let v = 0;
      // Statute numbers rank highest in the citation; plain words rank highest in the title.
      if (/\d/.test(t) && has(p.cite, t)) v = p.cite.startsWith(t) || p.cite.includes(" " + t) ? 12 : 8;
      else if (has(p.title, t)) v = p.title.startsWith(t) ? 10 : 6;
      else if (has(p.cite, t)) v = 5;
      else if (has(p.rest, t)) v = 1;
      else if (fuzzyIn(t, p.titleWords)) v = 4;
      if (v > best) best = v;
    }
    if (best === 0) return 0;
    s += best;
  }
  return s;
}

export function search(prepared: Prepared[], q: string, limit = 80): SearchItem[] {
  const terms = queryTerms(q);
  if (!terms.length) return [];
  return prepared
    .map((p) => ({ p, s: score(p, terms) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s || a.p.title.length - b.p.title.length)
    .slice(0, limit)
    .map((r) => r.p.item);
}

/** Closest known word for a misspelled term, or null. */
function closest(term: string, vocab: Map<string, number>): string | null {
  if (term.length < 4 || /\d/.test(term)) return null;
  const max = term.length >= 7 ? 2 : 1;
  let best: string | null = null;
  let bestD = max + 1;
  let bestN = 0;
  for (const [w, n] of vocab) {
    if (Math.abs(w.length - term.length) > max) continue;
    const d = editDistance(term, w, max);
    if (d < bestD || (d === bestD && n > bestN)) {
      best = w;
      bestD = d;
      bestN = n;
    }
  }
  return bestD <= max ? best : null;
}

const vocabCache = new WeakMap<Prepared[], Map<string, number>>();
function vocabulary(prepared: Prepared[]) {
  let v = vocabCache.get(prepared);
  if (!v) {
    v = new Map();
    for (const p of prepared) for (const w of p.titleWords) if (w.length >= 3) v.set(w, (v.get(w) ?? 0) + 1);
    vocabCache.set(prepared, v);
  }
  return v;
}

/**
 * When a search finds nothing: a spelling fix ("Did you mean…?") if one finds results,
 * otherwise the results with one word left out.
 */
export function rescue(prepared: Prepared[], q: string): { kind: "spelling" | "partial"; query: string; results: SearchItem[] } | null {
  const ws = words(q);
  if (!ws.length) return null;
  const vocab = vocabulary(prepared);
  let changed = false;
  const fixed = ws.map((w) => {
    if (vocab.has(w) || SYNONYMS[w]) return w;
    const c = closest(w, vocab);
    if (c && c !== w) {
      changed = true;
      return c;
    }
    return w;
  });
  if (changed) {
    const query = fixed.join(" ");
    const results = search(prepared, query);
    if (results.length) return { kind: "spelling", query, results };
  }
  if (ws.length > 1) {
    // Rank by how many of the words match, then by score.
    const terms = queryTerms(q);
    const scored = prepared
      .map((p) => {
        let hits = 0;
        let total = 0;
        for (const t of terms) {
          const v = score(p, [t]);
          if (v > 0) {
            hits++;
            total += v;
          }
        }
        return { p, hits, total };
      })
      .filter((r) => r.hits > 0)
      .sort((a, b) => b.hits - a.hits || b.total - a.total || a.p.title.length - b.p.title.length)
      .slice(0, 40);
    if (scored.length) return { kind: "partial", query: q, results: scored.map((r) => r.p.item) };
  }
  return null;
}
