"""Protective order guidance (2026-11-18): DV TRO/FRO, serving and enforcing orders, weapons after DV,
ERPO (expanded), SASPA orders, no-contact release conditions, Nicole's Law; plus 2C:25-28 and 2C:25-29
statute entries. Original wording from general knowledge; NOT yet verified."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "content", "entries")

def W(i, title, citation, section, group, key_points, officer_notes=(), related=(), source_type="directive", category="Domestic Violence", grade=""):
    e = dict(id=i, category=category, title=title, source_type=source_type, citation=citation, source_url="",
             grade_or_penalty=grade, key_points=list(key_points), officer_notes=list(officer_notes), related=list(related),
             status="DRAFT", source_verified=False, grade_review=False, last_verified=None, section=section, group=group)
    json.dump(e, open(os.path.join(D, i + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)
    return i

DV = "domestic-violence"
RO = "Restraining Orders (TRO/FRO)"
made = []

made.append(W("dv-tro-guide", "Temporary Restraining Orders (TRO)",
 "N.J.S.A. 2C:25-28; AG Domestic Violence Procedures Manual", DV, RO, [
 "Who can get one: a victim of domestic violence as defined in 2C:25-19, meaning a qualifying relationship plus a predicate act.",
 "Where: during court hours, the victim files in the Superior Court, Family Part. After hours, on weekends and holidays, police help the victim apply to an on-call municipal or Superior Court judge, usually by phone or video from the police department.",
 "Standard: the judge may issue a TRO without the defendant present (ex parte) when it is needed to protect the victim's life, health or well-being.",
 "Typical relief: no contact or communication; barring the defendant from the residence (exclusive possession to the victim); barring the defendant from the victim's work, school or other places; temporary custody; emergency money relief; and seizure of weapons, firearms and firearms permits.",
 "A TRO lasts until the final hearing, which is generally held within 10 days (2C:25-29).",
 "A TRO is a civil order. The victim can seek a TRO, file a criminal complaint, or both; one does not require the other.",
 "Only the defendant can violate the order. The victim cannot be charged with violating their own order, even if they initiate contact.",
], [
 "Explain the process neutrally. Do not discourage an application or predict the outcome.",
 "Give the victim a copy of the TRO and explain when and where the final hearing will be.",
 "Serve the defendant as soon as possible and record the time of service.",
 "Run the after-hours TRO checklist.",
], related=["njsa-2c-25-28", "njsa-2c-25-29", "dv-fro-guide", "dv-serving-enforcing"]))

made.append(W("dv-fro-guide", "Final Restraining Orders (FRO)",
 "N.J.S.A. 2C:25-29; Silver v. Silver, 387 N.J. Super. 112 (App. Div. 2006)", DV, RO, [
 "The final hearing is held in the Superior Court, Family Part, generally within 10 days of the complaint. Both sides may testify and present evidence.",
 "Two-part test (Silver v. Silver): the court must find a predicate act of domestic violence by a preponderance of the evidence, and that a restraining order is needed to protect the victim from immediate danger or further abuse.",
 "The judge weighs the history of domestic violence between the parties, immediate danger to person or property, and the best interests of the victim and any child.",
 "An FRO has no expiration date. It stays in effect until a judge dissolves it.",
 "An FRO bars the defendant from possessing or buying firearms, under both NJ law and federal law (18 U.S.C. 922(g)(8)).",
 "Relief can include everything available in a TRO plus counseling, support, rent or mortgage payments, and parenting time conditions.",
], [
 "FRO information appears in the DV central registry; check it on every DV call.",
 "Violations are enforced like TRO violations: probable cause means mandatory arrest.",
], related=["dv-tro-guide", "njsa-2c-25-29", "njsa-2c-29-9"]))

made.append(W("dv-serving-enforcing", "Serving and Enforcing Restraining Orders",
 "N.J.S.A. 2C:25-28, 2C:25-31; 18 U.S.C. 2265 (full faith and credit)", DV, RO, [
 "Serve the defendant in person as soon as possible; give a copy and explain the terms.",
 "Complete the return of service and make sure service is entered in the registry.",
 "If the order directs seizure of weapons, follow its terms, including any search it authorizes; seize firearms permits and FPIC.",
 "Enforcement: when there is probable cause that the defendant violated a restraining order, the officer must arrest and charge contempt (2C:29-9). If the conduct is also a crime, charge that too.",
 "Out-of-state and tribal protection orders get full faith and credit: enforce them as if they were NJ orders, even if not registered in NJ, as long as the order appears valid.",
 "The victim's consent or invitation does not make contact lawful for the defendant.",
], ["Notify the victim once the order has been served."], related=["njsa-2c-29-9", "njsa-2c-25-31", "dv-tro-guide"]))

made.append(W("dv-weapons-after", "Weapons Seized on DV Calls: What Happens Next",
 "N.J.S.A. 2C:25-21(d); AG DV Procedures Manual", DV, RO, [
 "Seized weapons, firearms, FPIC and permits are inventoried in the DV report and sent to the county prosecutor as the county requires.",
 "The prosecutor decides whether to petition the court to forfeit the weapons or keep the owner from regaining them; the statute sets a deadline for that petition.",
 "Weapons are not returned while a restraining order that prohibits them is in effect.",
 "The owner may apply for return through the court; the prosecutor can object.",
], ["Confirm your county prosecutor's forfeiture timeline and paperwork."], related=["njsa-2c-25-21"]))

# ---- statutes 2C:25-28 and 2C:25-29 (Criminal Code, chapter 25) ----
made.append(W("njsa-2c-25-28", "Filing a DV Complaint for a Restraining Order (TRO)",
 "N.J.S.A. 2C:25-28", None, None, [
 "A victim may file a civil complaint alleging domestic violence in the Superior Court, Family Part, where the act occurred, where the defendant lives, or where the victim lives or is sheltered.",
 "When the court is closed, the victim may apply to a designated judge with police assistance.",
 "The judge may issue an ex parte TRO when needed to protect the victim's life, health or well-being.",
 "The TRO can include the same types of relief as a final order, plus seizure of weapons.",
 "Filing a civil complaint does not prevent filing a criminal complaint for the same act.",
], [], related=["dv-tro-guide", "njsa-2c-25-29"], source_type="statute", category="Domestic Violence", grade="Procedure (no grade)"))

made.append(W("njsa-2c-25-29", "Final Hearing and Relief (FRO)",
 "N.J.S.A. 2C:25-29", None, None, [
 "A final hearing is held in the Family Part, generally within 10 days of the filing of the complaint.",
 "The plaintiff must prove the allegations by a preponderance of the evidence.",
 "The court considers the history of domestic violence, immediate danger, financial circumstances, and the best interests of the victim and any child.",
 "Relief includes restraints on contact and from places, exclusive possession of the residence, custody and parenting time, support, counseling, and a prohibition on firearms.",
], [], related=["dv-fro-guide", "njsa-2c-25-28"], source_type="statute", category="Domestic Violence", grade="Procedure (no grade)"))

# ---- ERPO & other protective orders (Arrest, Juveniles & Directives section) ----
AJ = "arrest-juveniles"
PO = "Protective Orders (ERPO, SASPA)"

made.append(W("ag-erpo", "Extreme Risk Protective Orders (ERPO): Full Guide",
 "Extreme Risk Protective Order Act of 2018, N.J.S.A. 2C:58-20 et seq.; AG ERPO directive", AJ, PO, [
 "Purpose: temporarily remove firearms and ammunition from a person who poses a significant danger of injuring themselves or others by having or buying a firearm. It is not a criminal charge.",
 "Who may petition: a family or household member, or a law enforcement officer or agency.",
 "Temporary ERPO (TERPO): the petitioner files a sworn petition. A judge may issue it the same day without the respondent present if there is good cause to believe the respondent poses an immediate and present danger.",
 "Factors include: threats or acts of violence toward self or others; violations of restraining orders; prior DV, stalking or violent offenses; reckless use or display of a firearm; drug or alcohol abuse; and recent acquisition of firearms or ammunition.",
 "On service, the respondent must immediately surrender firearms, ammunition, the FPIC and handgun purchase permits. If there is probable cause firearms are being kept, officers may seek a search warrant.",
 "Final ERPO (FERPO): a hearing is held within the time the statute sets (about 10 days). The petitioner must prove by a preponderance of the evidence that the respondent poses a significant danger. A FERPO stays in effect until the court terminates it.",
 "Violating an ERPO is a crime.",
 "The AG directive requires officers to consider an ERPO on calls showing firearm-related risk (DV, threats, mental health crises) and to tell family members how to petition.",
], [
 "Write the petition with specific facts: dates, words used, behavior, firearms known.",
 "Check firearm records and permits before serving.",
 "Coordinate with your agency's ERPO coordinator and the county prosecutor.",
 "An ERPO can be sought alongside a DV restraining order or a mental health screening.",
], related=["njsa-2c-58-26", "njsa-2c-58-27", "njsa-2c-58-28"], category="Investigations"))

made.append(W("saspa-orders", "Sexual Assault Survivor Protection Act Orders",
 "Sexual Assault Survivor Protection Act of 2015, N.J.S.A. 2C:14-13 et seq.", AJ, PO, [
 "For victims of nonconsensual sexual contact, sexual penetration, lewdness, or an attempt at any of these, who do not qualify for a DV restraining order (no DV relationship).",
 "The victim may apply for a temporary protective order without the respondent present, followed by a final hearing.",
 "Relief includes no contact, staying away from the victim's home, work, school and other places, and other protections.",
 "No criminal complaint is required to apply.",
 "Violating the order is contempt (2C:29-9).",
], ["Help the victim apply the same way you would for a TRO, following your court's after-hours procedure."], related=["njsa-2c-14-2", "njsa-2c-14-3", "njsa-2c-29-9"], category="Investigations"))

made.append(W("no-contact-conditions", "No-Contact Conditions of Pretrial Release",
 "Criminal Justice Reform Act, N.J.S.A. 2A:162-15 et seq.; N.J.S.A. 2C:29-9", AJ, PO, [
 "When releasing a defendant, a judge can order no contact with the victim or witnesses as a condition of release.",
 "In DV cases, violating these conditions can be charged as contempt under 2C:29-9(b).",
 "The prosecutor can also move to revoke release when conditions are violated.",
 "Check release conditions in the court system when a victim reports contact.",
], related=["cjr-overview", "njsa-2c-29-9"], category="Investigations"))

made.append(W("nicoles-law", "Nicole's Law: Orders Protecting Sex Offense Victims",
 "Nicole's Law, N.J.S.A. 2C:44-8 and 2C:14-12", AJ, PO, [
 "Lets a court restrain a person charged with or convicted of a sex offense from contacting the victim, including as a condition of release and after conviction.",
 "A conviction-based order can remain in effect until the court ends it.",
 "Violating the order is contempt (2C:29-9).",
], ["Confirm the order's terms in court records before enforcing."], related=["saspa-orders", "njsa-2c-29-9"], category="Investigations"))

# Give the existing DV procedures entry its own group name
p = os.path.join(D, "dv-procedures.json"); d = json.load(open(p, encoding="utf8")); d["group"] = "Response Procedures"
json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)

# Drop the None placeholders for statute entries (they place themselves by citation)
for i in ("njsa-2c-25-28", "njsa-2c-25-29"):
    p = os.path.join(D, i + ".json"); d = json.load(open(p, encoding="utf8"))
    d.pop("section", None); d.pop("group", None)
    json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)

print(len(made), "entries written")
