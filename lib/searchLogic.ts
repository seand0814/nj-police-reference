/** Search scoring used by the Search page. Pure functions, no React, so it can be tested on its own. */

export type SearchItem = { id: string; u: string; t: string; c: string; k: string; g: string; x: string };

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
  ems: ["ems", "emergency medical"],
};

export const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/n\.?\s?j\.?\s?s\.?\s?a\.?/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export function queryTerms(q: string): string[][] {
  let s = norm(q);
  for (const [re, rep] of PHRASES) s = s.replace(re, rep);
  return s
    .split(" ")
    .filter(Boolean)
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
      if (has(p.cite, t)) v = p.cite.startsWith(t) || p.cite.includes(" " + t) ? 12 : 8;
      else if (has(p.title, t)) v = p.title.startsWith(t) ? 10 : 6;
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
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((r) => r.p.item);
}
