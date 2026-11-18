/**
 * How entries are organized in the app. Everything here is derived from each entry's
 * citation and category, so the 610 content files don't need to change. An entry JSON
 * can override placement with optional "section" and "group" fields.
 */

export type Section = {
  slug: string;
  name: string;
  short: string;
  icon: string;
  blurb: string;
  /** Tailwind classes (written out in full so Tailwind keeps them). */
  tile: string;
  accent: string;
  chip: string;
};

export const SECTIONS: Section[] = [
  { slug: "criminal-code", name: "Criminal Code (2C)", short: "2C Crimes", icon: "⚖️", blurb: "Crimes and offenses by type or chapter",
    tile: "from-rose-600 to-red-700", accent: "border-rose-600 text-rose-700 dark:text-rose-300", chip: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200" },
  { slug: "motor-vehicle", name: "Motor Vehicle (Title 39)", short: "Title 39", icon: "🚓", blurb: "Moving violations, licensing, equipment and more",
    tile: "from-blue-600 to-indigo-700", accent: "border-blue-600 text-blue-700 dark:text-blue-300", chip: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200" },
  { slug: "checklists", name: "Checklists & Go-Bys", short: "Go-Bys", icon: "✅", blurb: "Step-by-step checklists and decision guides",
    tile: "from-emerald-600 to-teal-700", accent: "border-emerald-600 text-emerald-700 dark:text-emerald-300", chip: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200" },
  { slug: "dwi-drugs", name: "DWI & Drugs", short: "DWI & Drugs", icon: "🍺", blurb: "SFSTs, breath testing, drug recognition",
    tile: "from-amber-500 to-orange-600", accent: "border-amber-500 text-amber-700 dark:text-amber-300", chip: "bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200" },
  { slug: "domestic-violence", name: "Domestic Violence", short: "DV", icon: "🏠", blurb: "Procedures, mandatory arrest, DV statutes",
    tile: "from-fuchsia-600 to-pink-700", accent: "border-fuchsia-600 text-fuchsia-700 dark:text-fuchsia-300", chip: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950 dark:text-fuchsia-200" },
  { slug: "arrest-juveniles", name: "Arrest, Juveniles & Directives", short: "Arrest & AG", icon: "🚔", blurb: "Charging, juveniles, cannabis, AG directives",
    tile: "from-sky-500 to-cyan-700", accent: "border-sky-500 text-sky-700 dark:text-sky-300", chip: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-200" },
  { slug: "force-search", name: "Use of Force & Search", short: "Force & Search", icon: "🛡️", blurb: "AG force policy, stops, frisks, searches",
    tile: "from-violet-600 to-purple-700", accent: "border-violet-600 text-violet-700 dark:text-violet-300", chip: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-200" },
  { slug: "case-law", name: "Case Law Library", short: "Case Law", icon: "📜", blurb: "Key U.S. and NJ cases with field scenarios",
    tile: "from-indigo-600 to-slate-700", accent: "border-indigo-600 text-indigo-700 dark:text-indigo-300", chip: "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-200" },
  { slug: "investigations", name: "Investigations", short: "Investigations", icon: "🔍", blurb: "Deaths, missing persons, crises, sex crimes",
    tile: "from-teal-600 to-cyan-700", accent: "border-teal-600 text-teal-700 dark:text-teal-300", chip: "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200" },
  { slug: "operations", name: "Operations, ICS & Hazmat", short: "Operations", icon: "📡", blurb: "Incident command, pursuits, hazmat, terrorism",
    tile: "from-orange-600 to-red-600", accent: "border-orange-600 text-orange-700 dark:text-orange-300", chip: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-200" },
  { slug: "medical", name: "Medical", short: "Medical", icon: "🩺", blurb: "CPR and first aid quick reference",
    tile: "from-red-500 to-rose-600", accent: "border-red-500 text-red-700 dark:text-red-300", chip: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200" },
  { slug: "quick-reference", name: "Spanish & Quick Reference", short: "Quick Ref", icon: "🗣️", blurb: "Spanish phrases, hotlines, conversions",
    tile: "from-lime-600 to-green-700", accent: "border-lime-600 text-lime-700 dark:text-lime-300", chip: "bg-lime-100 text-lime-800 dark:bg-lime-950 dark:text-lime-200" },
  { slug: "other-statutes", name: "Animals & Mental Health", short: "Other Laws", icon: "🐾", blurb: "Title 4 animal cruelty, Title 30 screening",
    tile: "from-slate-600 to-slate-800", accent: "border-slate-500 text-slate-700 dark:text-slate-300", chip: "bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200" },
];

export function sectionBySlug(slug: string) {
  return SECTIONS.find((s) => s.slug === slug) ?? null;
}

// ---------------- citation parsing ----------------
export type Cite = { title: string; chapter: number; letter: string; section: number; sub: number; raw: string };

export function parseCite(citation: string | null | undefined): Cite | null {
  if (!citation) return null;
  const m = citation.match(/\b(2C|39|4|30):(\d+)([A-Za-z]?)-(\d+)(?:\.(\d+))?/i);
  if (!m) return null;
  return {
    title: m[1].toUpperCase(),
    chapter: Number(m[2]),
    letter: (m[3] || "").toUpperCase(),
    section: Number(m[4]),
    sub: m[5] ? Number(m[5]) : 0,
    raw: m[0],
  };
}

/**
 * Link to the full text of a statute (all subsections) on Justia's free copy of the NJ statutes.
 * Letter suffixes: kept for Title 39 and after a decimal (real sections like 39:4-14.3b, 2C:35-5.3a);
 * dropped after a whole-number 2C/Title 4 section, where they usually mean a subsection (2C:14-3a, 4:22-17c).
 */
export function fullTextUrl(citation: string | null | undefined): string | null {
  if (!citation) return null;
  const m = citation.match(/\b(2C|39|4|30):(\d+[A-Za-z]?)-(\d+)(?:\.(\d+))?([A-Za-z]?)/i);
  if (!m) return null;
  const title = m[1].toLowerCase();
  const chapter = m[2].toLowerCase();
  const keepLetter = !!m[5] && (title === "39" || !!m[4]);
  const section = m[3] + (m[4] ? "-" + m[4] : "") + (keepLetter ? m[5].toLowerCase() : "");
  return `https://law.justia.com/codes/new-jersey/title-${title}/section-${title}-${chapter}-${section}/`;
}

// ---------------- section placement ----------------
type Placeable = { id: string; category: string; citation: string | null; source_type?: string | null; section?: string };

export function sectionOf(e: Placeable): string {
  if (e.section) return e.section;
  // Only statute entries are placed by citation; other entries may mention a statute in their source line.
  const c = e.source_type === "statute" ? parseCite(e.citation) : null;
  if (c?.title === "2C") return "criminal-code";
  if (c?.title === "39") return "motor-vehicle";
  if (c?.title === "4" || c?.title === "30") return "other-statutes";
  switch (e.category) {
    case "DWI & Drugs": return "dwi-drugs";
    case "Use of Force & Search": return "force-search";
    case "Domestic Violence": return "domestic-violence";
    case "Case Law & Legal Terms": return "case-law";
    case "Investigations": return "investigations";
    case "Operations & ICS":
    case "Hazmat": return e.id === "hotlines" ? "quick-reference" : "operations";
    case "Medical": return "medical";
    case "Spanish":
    case "Tools": return "quick-reference";
    default: return "case-law";
  }
}

// ---------------- 2C: chapter names ----------------
export const CHAPTERS_2C: Record<number, string> = {
  2: "General Principles of Liability",
  3: "Justification (Use of Force)",
  5: "Inchoate Crimes (Attempt, Conspiracy)",
  7: "Sex Offender Registration",
  11: "Criminal Homicide",
  12: "Assault, Endangering, Threats",
  13: "Kidnapping and Related Offenses",
  14: "Sexual Offenses",
  15: "Robbery",
  16: "Bias Crimes",
  17: "Arson, Criminal Mischief",
  18: "Burglary and Criminal Intrusion",
  20: "Theft and Related Offenses",
  21: "Forgery and Fraudulent Practices",
  22: "Disturbing Human Remains",
  24: "Offenses Against Family, Children, Incompetents",
  25: "Domestic Violence",
  28: "Perjury and Falsification",
  29: "Obstructing Government, Escape",
  30: "Misconduct in Office",
  33: "Riot, Disorderly Conduct, Related Offenses",
  34: "Public Indecency",
  35: "Controlled Dangerous Substances",
  36: "Drug Paraphernalia",
  37: "Gambling",
  38: "Terrorism",
  39: "Firearms and Weapons",
  40: "Miscellaneous Offenses",
  58: "Firearms Licensing",
};

export function chapterLabel(ch: number) {
  return `Chapter ${ch} · ${CHAPTERS_2C[ch] ?? "Other"}`;
}

// ---------------- 2C: offense types ----------------
export const OFFENSE_TYPES = [
  "Homicide",
  "Assault, Threats & Stalking",
  "Kidnapping, Luring & Trafficking",
  "Sex Offenses",
  "Robbery & Carjacking",
  "Burglary & Trespass",
  "Theft & Shoplifting",
  "Fraud, Forgery & Identity Theft",
  "Arson & Criminal Mischief",
  "Drug Offenses",
  "Weapons & Firearms",
  "Domestic Violence",
  "Children & Family",
  "Obstruction, Escape & Official Misconduct",
  "Public Order & Bias",
  "Terrorism",
  "Defenses & General Principles",
] as const;

export function offenseType(c: Cite): string {
  const { chapter: ch, section: s } = c;
  if (ch === 40 && s === 22) return "Homicide";
  if (ch === 20 && (s === 1 || s === 25 || s === 31 || s === 34 || s === 36 || s === 37 || s === 39)) return "Fraud, Forgery & Identity Theft";
  const byChapter: Record<number, string> = {
    2: "Defenses & General Principles", 3: "Defenses & General Principles", 5: "Defenses & General Principles",
    7: "Sex Offenses", 11: "Homicide", 12: "Assault, Threats & Stalking", 13: "Kidnapping, Luring & Trafficking",
    14: "Sex Offenses", 15: "Robbery & Carjacking", 16: "Public Order & Bias", 17: "Arson & Criminal Mischief",
    18: "Burglary & Trespass", 20: "Theft & Shoplifting", 21: "Fraud, Forgery & Identity Theft", 22: "Public Order & Bias",
    24: "Children & Family", 25: "Domestic Violence", 28: "Obstruction, Escape & Official Misconduct",
    29: "Obstruction, Escape & Official Misconduct", 30: "Obstruction, Escape & Official Misconduct",
    33: "Public Order & Bias", 34: "Sex Offenses", 35: "Drug Offenses", 36: "Drug Offenses", 37: "Public Order & Bias",
    38: "Terrorism", 39: "Weapons & Firearms", 40: "Public Order & Bias", 58: "Weapons & Firearms",
  };
  return byChapter[ch] ?? "Public Order & Bias";
}

// ---------------- Title 39: types ----------------
export const MV_TYPES = [
  "Moving Violations",
  "DWI, Alcohol & Drugs in Vehicles",
  "Crashes & Leaving the Scene",
  "Licensing & Driver Documents",
  "Registration, Plates & Insurance",
  "Seat Belts & Child Seats",
  "Equipment & Lighting",
  "Pedestrians",
  "Bicycles, Skates & Scooters",
  "Motorcycles, Mopeds & ATVs",
  "Commercial Vehicles & CDL",
  "Parking & Abandoned Vehicles",
] as const;

export function mvType(c: Cite): string {
  const { chapter: ch, letter: L, section: s, sub } = c;
  if (ch === 3 && L === "C") return "Motorcycles, Mopeds & ATVs";
  if (ch === 3 && L === "B") return "Commercial Vehicles & CDL";
  if (ch === 3 && L === "A") return "Equipment & Lighting";
  if (ch === 5 && L === "A") return "Licensing & Driver Documents";
  if (ch === 6 || ch === 8 || ch === 10) return "Registration, Plates & Insurance";
  if (ch === 5) return "Licensing & Driver Documents";

  if (ch === 3) {
    if (s === 10 && sub >= 1 && sub <= 26) return "Commercial Vehicles & CDL";
    if (s === 10 && (sub === 31 || sub === 34)) return "Motorcycles, Mopeds & ATVs";
    if (s === 20) return "Commercial Vehicles & CDL";
    if (s === 76 && sub === 2) return "Seat Belts & Child Seats";
    if (s === 76 && sub >= 3) return "Motorcycles, Mopeds & ATVs";
    if (s >= 46 && s <= 86) return "Equipment & Lighting";
    if (s >= 23 && s <= 24) return "Equipment & Lighting";
    if ([4, 6, 18, 21, 26, 27, 32, 33, 34, 35].includes(s)) return "Registration, Plates & Insurance";
    return "Licensing & Driver Documents";
  }

  if (ch === 4) {
    if (s === 50 || s === 51 || (s === 49 && sub === 1)) return "DWI, Alcohol & Drugs in Vehicles";
    if (s === 129 || s === 130 || (s === 56 && sub === 8)) return "Crashes & Leaving the Scene";
    if (s === 56 && sub >= 1) return "Parking & Abandoned Vehicles";
    if ((s >= 135 && s <= 139) || s === 207) return "Parking & Abandoned Vehicles";
    if (s === 14 && (sub === 3 || sub === 30)) return "Motorcycles, Mopeds & ATVs";
    if (s === 31 && sub === 1) return "Motorcycles, Mopeds & ATVs";
    if ((s >= 10 && s <= 14) || s === 203) return "Bicycles, Skates & Scooters";
    if ((s >= 32 && s <= 41) || s === 117) return "Pedestrians";
    if (s === 75 || s === 77 || s === 78 || (s === 128 && sub === 11)) return "Commercial Vehicles & CDL";
    if (s === 60) return "Equipment & Lighting";
    return "Moving Violations";
  }
  return "Moving Violations";
}

// ---------------- hub sections: named groups ----------------
/** Group names for non-statute sections, keyed by entry id. Anything not listed falls into "General". */
export const HUB_GROUPS: Record<string, string> = {
  "dwi-phases": "Field Sobriety & Testing", "sfst-hgn": "Field Sobriety & Testing", "sfst-walk-turn": "Field Sobriety & Testing",
  "sfst-one-leg-stand": "Field Sobriety & Testing", alcotest: "Field Sobriety & Testing", "dre-evaluation": "Field Sobriety & Testing",
  "drug-schedules-federal": "Drug Recognition", "drug-opioids": "Drug Recognition", "drug-stimulants": "Drug Recognition",
  "drug-depressants": "Drug Recognition", "drug-hallucinogens": "Drug Recognition", "drug-dissociatives": "Drug Recognition",
  "drug-cannabis": "Drug Recognition", "drug-inhalants": "Drug Recognition", "drug-pharmaceuticals": "Drug Recognition",
  "drug-terminology": "Drug Recognition",
  "uof-ag-policy": "Use of Force", "search-patdown": "Stops & Searches", "traffic-stops": "Stops & Searches",
  "traffic-stops-high-risk": "Stops & Searches",
  miranda: "Interviews & Miranda", "case-uof": "Case Law", "case-rs-pc": "Case Law", "case-searches": "Case Law",
  "case-state-v-fair-2024": "Case Law", "us-constitution": "Constitution & Terms", "legal-terms": "Constitution & Terms",
  ics: "Incident Command", "radio-pursuits": "Pursuits", "hazmat-erg": "Hazmat", "terrorism-awareness": "Terrorism",
  "peel-principles": "Principles",
};

/** Display order for groups in the Case Law section. */
export const CASE_GROUPS = [
  "Stops & Reasonable Suspicion",
  "Frisks & Pat-Downs",
  "Motor Vehicle Stops",
  "Vehicle Searches",
  "Search Incident to Arrest",
  "Homes, Exigency & Emergency Aid",
  "Consent Searches",
  "Plain View, Dogs & Technology",
  "Phones, Data & Privacy",
  "DWI & Chemical Tests",
  "Interrogation & Miranda",
  "Use of Force",
  "Evidence, Exclusion & ID",
  "Threats & Speech",
  "Constitution & Terms",
  "Overviews",
];

/** Display order for groups in the Arrest, Juveniles & Directives section. */
export const ARREST_GROUPS = ["Charging & Criminal Justice Reform", "Protective Orders (ERPO, SASPA)", "Juveniles", "Cannabis & Underage Alcohol", "AG Directives & Policies"];

/** Display order for groups in the Domestic Violence section. */
export const DV_GROUPS = ["Response Procedures", "Restraining Orders (TRO/FRO)"];

/** Statutes shown as a "Related statutes" group inside hub sections (they also stay in their own section). */
export const HUB_STATUTES: Record<string, (c: Cite) => boolean> = {
  "domestic-violence": (c) => c.title === "2C" && (c.chapter === 25 || (c.chapter === 12 && c.section === 10) || (c.chapter === 29 && c.section === 9)),
  "dwi-drugs": (c) =>
    (c.title === "39" && c.chapter === 4 && (c.section === 50 || c.section === 51 || (c.section === 49 && c.sub === 1))) ||
    (c.title === "2C" && c.chapter === 35 && (c.section === 10 || c.section === 24)) ||
    (c.title === "2C" && c.chapter === 36 && c.section === 2),
  "force-search": (c) => c.title === "2C" && c.chapter === 3,
  investigations: (c) => c.title === "30",
  "arrest-juveniles": (c) => c.title === "2C" && c.chapter === 33 && c.section === 15,
};

// ---------------- grade badges ----------------
export type Badge = { label: string; cls: string };

const BADGE_RULES: { re: RegExp; label: string; cls: string }[] = [
  { re: /1st degree|first degree/i, label: "1st°", cls: "bg-red-600 text-white" },
  { re: /2nd degree|second degree/i, label: "2nd°", cls: "bg-orange-500 text-white" },
  { re: /3rd degree|third degree/i, label: "3rd°", cls: "bg-amber-400 text-amber-950" },
  { re: /4th degree|fourth degree/i, label: "4th°", cls: "bg-yellow-200 text-yellow-900" },
  { re: /petty disorderly/i, label: "PDP", cls: "bg-sky-200 text-sky-900" },
  { re: /disorderly persons/i, label: "DP", cls: "bg-blue-500 text-white" },
  { re: /graded by value/i, label: "By value", cls: "bg-amber-400 text-amber-950" },
  { re: /motor vehicle (violation|offense)/i, label: "MV", cls: "bg-slate-600 text-white" },
  { re: /contempt/i, label: "Contempt", cls: "bg-yellow-200 text-yellow-900" },
  { re: /penalty provision|civil penalty/i, label: "Penalty", cls: "bg-slate-300 text-slate-800" },
  { re: /defense|justification|exemption|immunity/i, label: "Defense", cls: "bg-emerald-200 text-emerald-900" },
  { re: /no criminal penalty|warnings?\b/i, label: "Warning", cls: "bg-emerald-200 text-emerald-900" },
  { re: /twice the authorized term|enhancement/i, label: "Enhancer", cls: "bg-orange-200 text-orange-900" },
  { re: /procedure|definition|no grade|sentencing|provision/i, label: "Info", cls: "bg-slate-200 text-slate-700" },
];

/** Picks the grade mentioned first in the text, e.g. "2nd degree; 1st degree if armed" shows 2nd°. */
export function gradeBadge(grade: string | null | undefined, citation?: string | null): Badge | null {
  if (!grade) return null;
  // Title 39 penalties written as fines ("$200 fine...") are motor vehicle offenses.
  if (/^\s*(N\.J\.S\.A\.\s*)?39:/.test(citation ?? "") && !/disorderly|degree/i.test(grade) && /\$\d|fine|forfeit/i.test(grade))
    return { label: "MV", cls: "bg-slate-600 text-white" };
  let best: { idx: number; rule: (typeof BADGE_RULES)[number] } | null = null;
  for (const rule of BADGE_RULES) {
    const m = grade.match(rule.re);
    if (m && m.index !== undefined && (best === null || m.index < best.idx)) best = { idx: m.index, rule };
  }
  if (!best) return /confirm/i.test(grade) ? { label: "Confirm", cls: "bg-slate-200 text-slate-700" } : null;
  // "Petty disorderly" also matches "disorderly persons" later; earliest match already wins.
  return { label: best.rule.label, cls: best.rule.cls };
}
