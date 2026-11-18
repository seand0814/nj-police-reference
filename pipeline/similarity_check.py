"""Flags entries that share 8-word sequences with the ebook text.
Text inside entries' "quote" fields (marked statute/constitution quotations) is ignored.
Usage: python3 scripts/similarity_check.py [--threshold 3]"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
N = 8
THRESHOLD = int(sys.argv[sys.argv.index("--threshold") + 1]) if "--threshold" in sys.argv else 3

def words(s):
    return re.findall(r"[a-z0-9]+", s.lower())

def shingles(ws):
    return {" ".join(ws[i:i + N]) for i in range(len(ws) - N + 1)}

book = shingles(words(open(os.path.join(ROOT, "work", "ebook_raw.txt"), encoding="utf8").read()))

def entry_text(e):
    parts = [e.get("title", ""), e.get("grade_or_penalty", "")]
    parts += e.get("key_points", []) + e.get("officer_notes", [])
    return parts  # "quote" field, if ever added, is deliberately excluded

flagged, checked = [], 0
d = os.path.join(ROOT, "content", "entries")
for f in sorted(os.listdir(d)):
    e = json.load(open(os.path.join(d, f), encoding="utf8"))
    if e.get("status") != "DRAFT":
        continue
    checked += 1
    hits = set()
    for part in entry_text(e):
        hits |= shingles(words(part)) & book
    if len(hits) >= 1:
        print(f"{e['id']}: {len(hits)} shared 8-word sequence(s)")
        for h in sorted(hits): print("   ", h)
    if len(hits) >= THRESHOLD:
        flagged.append(e["id"])

print(f"\nChecked {checked} DRAFT entries against {len(book)} ebook shingles. "
      f"Flagged (>= {THRESHOLD}): {len(flagged)} {flagged}")
sys.exit(1 if flagged else 0)
