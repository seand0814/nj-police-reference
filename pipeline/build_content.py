"""Builds content/topic_map.json, content/entries/*.json and content/PROVENANCE.md.
The ebook is used only to list topic names and statute numbers."""
import json, re, os, sys
sys.path.insert(0, os.path.dirname(__file__))
from verified_entries import V
from data_topics import T

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "work", "ebook_raw.txt")
OUT = os.path.join(ROOT, "content")
ENT = os.path.join(OUT, "entries")

raw = open(RAW, encoding="utf8").read()
cites = re.findall(r'\b(2C|39|4|30):(\d+[A-Za-z]?)-(\d+(?:\.\d+)?[A-Za-z]?)', raw)
seen, statutes = set(), []
for t, ch, sec in cites:
    key = f"{t}:{ch.lower()}-{sec.lower()}"
    if key not in seen:
        seen.add(key); statutes.append((t, ch.lower(), sec.lower()))

def cat_for(t, ch, sec):
    t = t.upper()
    if t == "39":
        return "DWI & Drugs" if sec.startswith("50") and ch == "4" else "Motor Vehicle"
    if t == "4": return "Criminal Law"
    if t == "30": return "Investigations"
    n = int(re.match(r'\d+', ch).group())
    if n in (35, 36): return "DWI & Drugs"
    if n == 25: return "Domestic Violence"
    if n == 24: return "Juveniles"
    if n in (2, 3): return "Use of Force & Search"
    return "Criminal Law"

def sid(t, ch, sec):
    return "njsa-" + f"{t}-{ch}-{sec}".lower().replace(".", "-")

NONLAW = [  # (id, category, title, source_type, planned_source)
 ("uof-ag-policy", "Use of Force & Search", "Use of Force", "directive", "NJ AG Use of Force Policy (current)"),
 ("search-patdown", "Use of Force & Search", "Pat-Down and Search", "directive", "NJ AG directives + case law"),
 ("traffic-stops", "Use of Force & Search", "Traffic Stops", "directive", "NJ AG directives + case law"),
 ("traffic-stops-high-risk", "Use of Force & Search", "High-Risk Vehicle Stops", "directive", "NJ AG directives / agency policy"),
 ("dwi-phases", "DWI & Drugs", "DWI Detection Phases", "federal_pub", "NHTSA DWI Detection & SFST Participant Manual"),
 ("alcotest", "DWI & Drugs", "Alcotest / Breath Testing", "directive", "NJ AG directives / NJSP Alcotest procedures"),
 ("dre-evaluation", "DWI & Drugs", "Drug Recognition Evaluation Overview", "federal_pub", "NHTSA DRE public materials"),
 ("drug-inhalants", "DWI & Drugs", "Inhalants", "federal_pub", "DEA Drugs of Abuse (2024)"),
 ("drug-terminology", "DWI & Drugs", "Drug Terminology", "federal_pub", "DEA publications"),
 ("drug-pharmaceuticals", "DWI & Drugs", "Commonly Misused Pharmaceuticals", "federal_pub", "DEA Drugs of Abuse (2024)"),
 ("miranda", "Case Law & Legal Terms", "Miranda Warnings", "case", "Miranda v. Arizona, 384 U.S. 436 (1966) + NJ standard language"),
 ("case-uof", "Case Law & Legal Terms", "Case Law: Use of Force", "case", "U.S./NJ Supreme Court opinions"),
 ("case-rs-pc", "Case Law & Legal Terms", "Case Law: Reasonable Suspicion & Probable Cause", "case", "U.S./NJ Supreme Court opinions"),
 ("case-searches", "Case Law & Legal Terms", "Case Law: Searches", "case", "U.S./NJ Supreme Court opinions"),
 ("us-constitution", "Case Law & Legal Terms", "U.S. Constitution: Key Amendments", "statute", "U.S. Constitution text"),
 ("legal-terms", "Case Law & Legal Terms", "Legal Terms", "original", "Original definitions citing statutes"),
 ("death-investigations", "Investigations", "Death Investigations", "directive", "NJ AG directives + original checklist"),
 ("postmortem", "Investigations", "Post-Mortem Indicators", "original", "Public forensic references"),
 ("sex-crimes-investigation", "Investigations", "Sex Crimes Investigation", "directive", "NJ AG Standards for Providing Services to Victims of Sexual Assault"),
 ("burglary-robbery-investigation", "Investigations", "Burglary & Robbery Response", "original", "Original checklist"),
 ("psych-crises", "Investigations", "Psychological Crises", "directive", "NJ AG directives; N.J.S.A. 30:4-27.1 et seq."),
 ("missing-persons", "Investigations", "Missing Persons", "directive", "NJ AG missing persons directive"),
 ("admonishments", "Investigations", "Admonishments", "original", "Original"),
 ("dv-procedures", "Domestic Violence", "DV Response Procedures", "directive", "NJ AG Domestic Violence Procedures Manual"),
 ("ics", "Operations & ICS", "Incident Command System", "federal_pub", "FEMA NIMS/ICS"),
 ("terrorism-awareness", "Operations & ICS", "Terrorism Awareness", "federal_pub", "DHS/FBI public guidance"),
 ("peel-principles", "Operations & ICS", "Peel's Principles", "original", "Historical principles (public domain)"),
 ("radio-pursuits", "Operations & ICS", "Radio: Pursuits", "directive", "NJ AG Vehicular Pursuit Policy"),
 ("hotlines", "Operations & ICS", "Hotlines & Agency Numbers", "federal_pub", "Official agency websites only"),
 ("hazmat-erg", "Hazmat", "Using the Emergency Response Guidebook", "federal_pub", "PHMSA Emergency Response Guidebook"),
 ("cpr-first-aid", "Medical", "CPR / First Aid Quick Reference", "federal_pub", "MedlinePlus/NIH, CDC; link to AHA & Red Cross"),
]
FEATURES = ["My Notes (user feature)", "My Phone Numbers (user feature)", "Radio Codes editor (user feature, APCO plain-language note)"]
SKIPPED = ["Oath of Honor", "Mission and Motto", "10 Fatal Errors", "Shotgun", "AR-15", "Semi-Automatic", "Taser"]

verified = {e["id"]: e for e in V}
# verified entries that replace a statute topic
alias = {"njsa-2c-12-1": "njsa-2c-12-1a"}

topic_map, entries = [], {}

def load_data(fn):
    out = {}
    for line in open(os.path.join(os.path.dirname(__file__), fn), encoding="utf8"):
        line = line.rstrip("\n")
        if not line.strip() or line.startswith("#"): continue
        c, title, grade, pts, flag = line.split("|")
        out[c.strip().lower()] = dict(title=title.strip(), grade=grade.strip(),
            points=[x.strip() for x in pts.split(";;") if x.strip()], review=flag.strip() == "R")
    return out
DATA = {**load_data("data_2c.txt"), **load_data("data_other.txt")}
# book sub-cites that map onto a single statute entry
MERGE = {"2c:35-10a": "njsa-2c-35-10", "2c:35-10b": "njsa-2c-35-10", "2c:35-10c": "njsa-2c-35-10",
         "2c:14-2c": "njsa-2c-14-2", "2c:29-2b": "njsa-2c-29-2", "2c:14-3a": "njsa-2c-14-3",
         "2c:14-3b": "njsa-2c-14-3", "2c:14-4a": "njsa-2c-14-4", "2c:12-1": "njsa-2c-12-1a",
         "39:4-50": "njsa-39-4-50", "39:4-50.4a": "njsa-39-4-50-4a"}
missing = []
def add_statute(key):
    i = "njsa-" + key.replace(":", "-").replace(".", "-")
    d = DATA[key]
    t, rest = key.split(":")
    ch, sec = rest.split("-", 1)
    if key == "2c:12-1b": sec = "1(b)"
    cite = f"N.J.S.A. {t.upper()}:{ch.upper()}-{sec}"
    e = dict(id=i, category=cat_for(*re.match(r'(2c|39|4|30):(\d+[a-z]?)-(.*)', key).groups()),
             title=d["title"], source_type="statute", citation=cite, source_url="",
             grade_or_penalty=d["grade"], key_points=d["points"], officer_notes=[], related=[],
             status="DRAFT", source_verified=False, grade_review=d["review"], last_verified=None)
    if e["category"] == "Criminal Law" and key.startswith("2c:12-1b"): pass
    entries[i] = e
    topic_map.append(dict(id=i, category=e["category"], title=e["title"], source_type="statute",
                          planned_source=cite + " (written from general knowledge; confirm)"))
done = set()
for t, ch, sec in statutes:
    key = f"{t.lower()}:{ch}-{sec}"
    if key in MERGE or MERGE.get(key):
        continue
    if key in DATA:
        add_statute(key); done.add(key)
    else:
        missing.append(key)
for key in DATA:
    if key not in done: add_statute(key)
print("statute cites with no data:", missing)
for i, c, title, st, src in NONLAW:
    topic_map.append(dict(id=i, category=c, title=title, source_type=st, planned_source=src))
    d = T.get(i)
    entries[i] = dict(id=i, category=c, title=title, source_type=st,
                      citation=d["citation"] if d else "", source_url="",
                      grade_or_penalty=d["grade_or_penalty"] if d else "",
                      key_points=d["key_points"] if d else [], officer_notes=d["officer_notes"] if d else [],
                      related=[], status="DRAFT" if d else "VERIFY", source_verified=False,
                      grade_review=False, last_verified=None)

for e in V:
    if e["id"] not in {x["id"] for x in topic_map}:
        topic_map.append(dict(id=e["id"], category=e["category"], title=e["title"],
                              source_type=e["source_type"], planned_source=e["citation"]))
    entries[e["id"]] = dict(e, status="DRAFT", source_verified=True, grade_review=False, last_verified="2026-11-18")

os.makedirs(ENT, exist_ok=True)
for f in os.listdir(ENT): os.remove(os.path.join(ENT, f))
for i, e in entries.items():
    json.dump(e, open(os.path.join(ENT, f"{i}.json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)

json.dump(dict(categories=["Criminal Law","Motor Vehicle","DWI & Drugs","Use of Force & Search","Investigations",
    "Domestic Violence","Juveniles","Case Law & Legal Terms","Operations & ICS","Hazmat","Medical","Spanish","Tools",
    "Department Weapons"], topics=topic_map, user_features=FEATURES,
    skipped=SKIPPED, placeholder_category="Department Weapons — add from your agency's training materials"),
    open(os.path.join(OUT, "topic_map.json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)

with open(os.path.join(OUT, "PROVENANCE.md"), "w", encoding="utf8") as p:
    p.write("# Content provenance\n\nThe ebook was used only to list topic names and statute numbers. "
            "No ebook text, tables, diagrams or examples were used in any entry.\n\n"
            "| id | status | source used | ebook text used |\n|---|---|---|---|\n")
    for i in sorted(entries):
        e = entries[i]
        src = ("Confirmed: " + e["citation"] + (f" ({e['source_url']})" if e["source_url"] else "")) if e.get("source_verified") \
              else ("Written from general knowledge of NJ law; not yet checked against a source" if e["status"] == "DRAFT" else "None yet (substance blank)")
        p.write(f"| {i} | {e['status']} | {src} | No |\n")

from collections import Counter
print("topics:", len(topic_map), "entries:", len(entries))
print(Counter(e["status"] for e in entries.values()))
print(Counter(e["category"] for e in entries.values()))
