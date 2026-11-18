"""New reference entries (2026-11-18): charging/CJR, juveniles, cannabis and underage alcohol,
AG directive summaries, the DRE drug matrix, and Spanish Miranda. Original wording from general
knowledge; NOT yet verified against official sources."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "content", "entries")

def W(i, title, citation, section, group, key_points, officer_notes=(), category="Investigations", related=(), **extra):
    e = dict(id=i, category=category, title=title, source_type=extra.pop("source_type", "directive"), citation=citation,
             source_url="", grade_or_penalty="", key_points=list(key_points), officer_notes=list(officer_notes),
             related=list(related), status="DRAFT", source_verified=False, grade_review=False, last_verified=None,
             section=section, group=group, **extra)
    json.dump(e, open(os.path.join(D, i + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)
    return i

S = "arrest-juveniles"
made = []

# ---------------- Charging & Criminal Justice Reform ----------------
G = "Charging & Criminal Justice Reform"
made.append(W("cjr-overview", "Criminal Justice Reform: How Charging Works",
  "Criminal Justice Reform Act, N.J.S.A. 2A:162-15 et seq.; AG Law Enforcement Directive on CJR (current revision)", S, G, [
  "Since January 1, 2017, pretrial release is decided by risk, not by money bail, in nearly all cases.",
  "Two charging paths: a complaint-summons (CDR-1), where the person is released and told to appear in court, or a complaint-warrant (CDR-2), where the person is held for a release decision by a judge.",
  "The AG directive sets when a warrant is presumed (generally serious and violent crimes) and the factors that can justify a warrant for other charges: risk of not appearing, danger to the community or a victim, and risk of obstructing justice.",
  "A judge must find probable cause before a complaint-warrant issues.",
  "For warrant arrests, a Public Safety Assessment (PSA) is generated from criminal history and court records. It scores risk of failure to appear and new criminal activity and flags new violent criminal activity.",
  "The prosecutor decides whether to seek pretrial detention; the court holds a detention hearing.",
], [
  "Follow your county prosecutor's charging guidelines on which offenses need prior approval for a warrant application.",
  "Write the probable cause statement (affidavit of probable cause) with specific facts, not conclusions.",
  "Disorderly persons offenses are usually charged on a summons.",
]))

# ---------------- Juveniles ----------------
G = "Juveniles"
made.append(W("juvenile-custody", "Juveniles in Custody",
  "Code of Juvenile Justice, N.J.S.A. 2A:4A-20 et seq.; AG juvenile guidelines", S, G, [
  "A juvenile is a person under 18. Juvenile matters go to the Family Part, not adult criminal court, unless waived.",
  "When a juvenile is taken into custody, notify a parent or guardian promptly.",
  "Keep juveniles out of sight and sound of adult detainees; don't hold them in adult cells.",
  "Contact juvenile intake or the on-call Family Part judge for any detention decision; most juveniles are released to a parent or guardian.",
  "Fingerprinting and photographing juveniles is limited to what the law allows; juvenile records are confidential.",
  "Consider a stationhouse adjustment for minor first-time offenses.",
], ["Your agency's juvenile officer or detective bureau usually handles follow-up."], related=["juvenile-interrogation", "stationhouse-adjustment"]))

made.append(W("juvenile-interrogation", "Questioning Juveniles",
  "State v. Presha, 163 N.J. 304 (2000); J.D.B. v. North Carolina, 564 U.S. 261 (2011); R. 3:17", S, G, [
  "Give Miranda warnings in age-appropriate language and, whenever possible, with a parent or guardian present.",
  "Presha: a parent's absence is a highly significant factor. For a juvenile under 14, a statement taken without a parent present is generally inadmissible unless the parent was unwilling or truly unavailable.",
  "Age matters to whether a juvenile is in custody (J.D.B.); assume custody sooner with young people.",
  "Do not use the parent as an interrogator or discourage the parent from being present.",
  "Record custodial interrogations as required by Court Rule 3:17.",
], ["Note who was present, how rights were explained, and the juvenile's responses."], related=["case-jdb-v-north-carolina", "miranda"]))

made.append(W("stationhouse-adjustment", "Stationhouse Adjustments",
  "AG Guidelines for Stationhouse Adjustment of Juvenile Delinquency Offenses", S, G, [
  "An alternative to filing a juvenile complaint for minor offenses, handled at the police department.",
  "Requires the juvenile's and parent's agreement and, where there is a victim, the victim's input or consent.",
  "Conditions can include restitution, community service, an apology, or counseling referral.",
  "It is not a conviction; if the juvenile completes the terms, no complaint is filed.",
  "Not appropriate for serious or violent offenses or certain categories excluded by the guidelines.",
], ["Use your agency's stationhouse adjustment form and keep records as the guidelines require."]))

made.append(W("juvenile-curfew", "Juvenile Curfew",
  "N.J.S.A. 40:48-2.52 (municipal juvenile curfew ordinances); local ordinance", S, G, [
  "Municipalities may adopt juvenile curfew ordinances; there is no single statewide curfew.",
  "Check your town's ordinance for hours, ages and exceptions (work, school or religious events, accompanied by a parent, emergencies).",
  "Typical handling: identify the juvenile, contact a parent or guardian, and release to them. Ordinances may allow penalties against parents.",
], ["Record the ordinance section on any complaint."]))

# ---------------- Cannabis & Alcohol ----------------
G = "Cannabis & Underage Alcohol"
made.append(W("cannabis-adults", "Adult Cannabis: What Officers Can and Can't Do",
  "CREAMMA, N.J.S.A. 24:6I-31 et seq.; N.J.S.A. 2C:35-10(a)(3)-(4)", S, G, [
  "Adults 21 and older may lawfully buy cannabis from licensed dispensaries.",
  "Possession of 6 ounces or less of marijuana (17 grams or less of hashish) carries no penalty; more than that is a 4th degree crime.",
  "The odor of cannabis (burnt or raw), possession of an amount that carries no penalty, or possession near cash or multiple containers is not, by itself, reasonable suspicion to stop or search.",
  "Growing cannabis at home without a license remains illegal.",
  "Driving while impaired by cannabis is DWI under 39:4-50; use a DRE where available.",
  "Local ordinances govern public consumption and penalties for it.",
], ["Sales without a license and possession with intent to distribute are still crimes (2C:35-5)."], related=["njsa-2c-35-10", "drug-cannabis", "njsa-39-4-50"]))

made.append(W("underage-cannabis-alcohol", "Under 21: Cannabis and Alcohol Warnings",
  "N.J.S.A. 2C:33-15 (as amended in 2021)", S, G, [
  "Persons under 21 who possess or consume alcohol or cannabis are not arrested or fined; they receive progressive warnings.",
  "1st violation: written warning. 2nd: written warning, plus notice to a parent or guardian if under 18 and information about community services. 3rd and later: written warning and referral to community services, with parent notice if under 18.",
  "Odor of alcohol or cannabis alone is not a basis to search, and officers may not ask for consent to search for this violation.",
  "Body-worn cameras must be on during these encounters.",
  "Officers may not take the juvenile into custody for this violation alone.",
], ["Use the warning forms and tracking system your agency is required to use."], related=["njsa-2c-33-15", "cannabis-adults"]))

# ---------------- AG Directives & Policies ----------------
G = "AG Directives & Policies"
made.append(W("ag-body-worn-cameras", "Body-Worn Cameras",
  "N.J.S.A. 40A:14-118.3 et seq.; AG body-worn camera directive (current revision)", S, G, [
  "Uniformed patrol officers must wear and use body-worn cameras.",
  "Activate at the start of calls for service, stops, investigative encounters and any use of force; keep recording until the encounter ends.",
  "Tell people they are being recorded when it is safe and practical.",
  "Special limits apply in schools, places of worship, health care settings and with confidential informants, unless enforcement action is taking place.",
  "Rules restrict reviewing footage before writing reports in certain incidents, such as uses of force; follow your agency's policy.",
  "Failing to record when required can affect evidence and lead to discipline.",
], ["If you forget to activate, document why and when you started recording."]))
made.append(W("ag-immigrant-trust", "Immigrant Trust Directive",
  "AG Directive 2018-6 (revised 2019)", S, G, [
  "Officers may not stop, question, arrest, search or detain anyone based solely on actual or suspected immigration status.",
  "Do not ask about immigration status unless it is necessary to investigate a serious offense and relevant to it.",
  "Limits assistance with federal civil immigration enforcement and honoring civil detainers, with exceptions for certain serious offenses.",
  "Cooperation with federal authorities on criminal investigations continues.",
  "Victims and witnesses must be informed of protections such as U and T visa certifications where applicable.",
], ["Questions about a specific detainer go to your supervisor and the county prosecutor."]))
made.append(W("ag-eyewitness-id", "Eyewitness Identification Procedures",
  "AG Guidelines for Photo and Live Lineup Identification Procedures; State v. Henderson, 208 N.J. 208 (2011)", S, G, [
  "Use blind or blinded administration: the person showing the lineup should not know which person is the suspect.",
  "Tell the witness the perpetrator may or may not be in the lineup and that the investigation continues either way.",
  "Fillers should match the witness's description; show one suspect per lineup.",
  "Record the witness's own words of confidence immediately; do not give feedback.",
  "Showups are allowed only shortly after the event and are inherently suggestive; document the circumstances and instructions given.",
], ["Record the whole procedure on video when possible."], related=["case-state-v-henderson"]))
made.append(W("ag-recording-interrogations", "Recording Custodial Interrogations",
  "N.J. Court Rule 3:17", S, G, [
  "Custodial interrogations in a place of detention must be electronically recorded when the person is suspected of murder, manslaughter, kidnapping, robbery, aggravated sexual assault, sexual assault and other listed serious crimes.",
  "Exceptions exist (for example, the suspect refuses to be recorded, or the statement is spontaneous), and they must be documented.",
  "If an unexcused recording is missing, the court may exclude the statement or give the jury a cautionary instruction.",
], ["When in doubt, record."], related=["miranda", "juvenile-interrogation"]))
made.append(W("ag-erpo", "Extreme Risk Protective Orders (ERPO)",
  "Extreme Risk Protective Order Act, N.J.S.A. 2C:58-20 et seq.; AG ERPO directive", S, G, [
  "A family or household member, or a law enforcement officer, may petition for a temporary ERPO when a person poses a significant danger of injuring themselves or others with a firearm.",
  "Factors include recent threats or violence, violations of restraining orders, reckless firearm use, substance abuse and recent acquisition of firearms.",
  "A temporary order requires surrender of firearms, ammunition and firearms permits; a final hearing follows within the time the statute sets.",
  "Officers serving an order should seize firearms covered by it and may seek a search warrant if the respondent does not comply.",
], ["Consult your agency's ERPO coordinator and the county prosecutor."], related=["njsa-2c-58-26"]))
made.append(W("ag-internal-affairs", "Accepting Citizen Complaints",
  "AG Internal Affairs Policy & Procedures", S, G, [
  "Accept complaints about officer conduct from anyone, at any time, in any form: in person, by phone, in writing, or anonymously.",
  "Do not discourage, delay or refuse to take a complaint, and do not ask about the complainant's immigration status.",
  "Give the complainant information on how the complaint will be handled.",
  "Forward the complaint to internal affairs or a supervisor as your agency requires.",
]))
made.append(W("ag-strip-search", "Strip and Body Cavity Searches",
  "N.J.S.A. 2A:161A-1 et seq.; AG strip search guidelines", S, G, [
  "A person detained or arrested for a non-indictable offense may not be strip searched unless there is a warrant or consent, or a statutory exception applies (such as reasonable suspicion of a weapon, CDS or evidence, with supervisory authorization).",
  "Body cavity searches require a search warrant and must be done by medical personnel.",
  "Searches must be done in private by officers of the same sex, and documented.",
], ["Confirm the exact exceptions and authorization rules in your agency's policy before any strip search."]))
made.append(W("ag-bias-free-policing", "Bias-Free Policing",
  "AG directives prohibiting racially influenced policing", S, G, [
  "Officers may not consider race, ethnicity, national origin, religion, gender, sexual orientation or similar characteristics in deciding whom to stop, question, search or arrest, except as part of a specific suspect description.",
  "Stops and post-stop actions are documented for data reporting.",
  "Supervisors review stop and search data for patterns.",
]))

# ---------------- Drug recognition matrix ----------------
made.append(W("drug-matrix", "Drug Recognition Signs Chart",
  "NHTSA/IACP Drug Evaluation and Classification Program (DRE) matrix", "dwi-drugs", "Drug Recognition", [
  "Typical signs by drug category, as taught in DRE training. Individual results vary.",
  "HGN = horizontal gaze nystagmus; VGN = vertical gaze nystagmus; LOC = lack of convergence.",
], ["Signs are indicators, not proof. Request a certified DRE and toxicology."], category="DWI & Drugs",
  source_type="federal_pub",
  table=dict(columns=["Category", "HGN", "VGN", "LOC", "Pupils", "Pulse", "Blood pressure", "Body temp", "Muscle tone"],
             rows=[
               ["CNS depressants", "Present", "Present*", "Present", "Normal**", "Down", "Down", "Normal", "Flaccid"],
               ["CNS stimulants", "None", "None", "None", "Dilated", "Up", "Up", "Up", "Rigid"],
               ["Hallucinogens", "None", "None", "None", "Dilated", "Up", "Up", "Up", "Rigid"],
               ["Dissociative anesthetics", "Present", "Present", "Present", "Normal", "Up", "Up", "Up", "Rigid"],
               ["Narcotic analgesics", "None", "None", "None", "Constricted", "Down", "Down", "Down", "Normal/Flaccid"],
               ["Inhalants", "Present", "Present*", "Present", "Normal**", "Up", "Up/Down", "Up/Down/Normal", "Normal/Flaccid"],
               ["Cannabis", "None", "None", "Present", "Dilated", "Up", "Up", "Normal", "Normal"],
             ],
             note="* VGN at high doses for that person. ** Some depressants and inhalants can dilate pupils. Based on the DRE program's general indicators; not yet checked against the current NHTSA manual."),
  related=["dre-evaluation", "drug-depressants", "drug-stimulants", "drug-hallucinogens", "drug-dissociatives", "drug-opioids", "drug-inhalants", "drug-cannabis"]))

# ---------------- Spanish Miranda ----------------
made.append(W("spanish-miranda", "Miranda Rights in Spanish (Reference)",
  "Reference translation; use your agency's approved Spanish rights form", "quick-reference", "Procedures & Reference", [
  "You have the right to remain silent. | Usted tiene el derecho de permanecer callado.",
  "Anything you say can and will be used against you in a court of law. | Cualquier cosa que diga puede y será usada en su contra en un tribunal de justicia.",
  "You have the right to talk to a lawyer and to have a lawyer present before and during any questioning. | Tiene derecho a consultar con un abogado y a tenerlo presente antes y durante cualquier interrogatorio.",
  "If you cannot afford a lawyer, one will be appointed for you before any questioning, if you wish. | Si no puede pagar un abogado, se le nombrará uno antes de cualquier interrogatorio, si así lo desea.",
  "You can decide at any time to exercise these rights and not answer questions or make statements. | Puede decidir en cualquier momento ejercer estos derechos y no contestar preguntas ni hacer declaraciones.",
  "Do you understand each of these rights? | ¿Entiende cada uno de estos derechos?",
  "Having these rights in mind, do you wish to talk to us now? | Teniendo en cuenta estos derechos, ¿desea hablar con nosotros ahora?",
], [
  "For any interrogation, use your department's approved Spanish rights form and a qualified interpreter. This translation is for reference and has not been verified.",
  "Record the warnings and the response on video.",
], category="Spanish", source_type="original", speak=True, related=["miranda", "spanish-field-phrases"]))

# Spanish field phrases get the play buttons too
p = os.path.join(D, "spanish-field-phrases.json"); d = json.load(open(p, encoding="utf8")); d["speak"] = True
json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)

print(len(made), "entries written")
