"""Writes content/checklists/*.json. Original content written 2026-11-18 from general knowledge.
Every checklist tells the user to follow agency policy; none has been checked against official sources yet."""
import json, os

OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "content", "checklists")
os.makedirs(OUT, exist_ok=True)

def S(text, detail="", link=""):
    d = {"text": text}
    if detail: d["detail"] = detail
    if link: d["link"] = link
    return d

ITEMS = []

# ======================= CHECKLISTS =======================
ITEMS.append(dict(id="dv-response", kind="checklist", title="Domestic Violence Call", sections=["domestic-violence", "checklists"],
 summary="On-scene steps for a domestic violence call, from arrival to the DV report.",
 groups=[
  dict(name="Arrival & safety", steps=[
   S("Stage and approach with backup; check call history and prior DV at the address"),
   S("Separate the parties, out of sight and hearing of each other"),
   S("Check for injuries and request EMS when needed"),
   S("Ask about weapons in the home and on the parties"),
   S("Body-worn camera on for the entire contact"),
  ]),
  dict(name="Determine what happened", steps=[
   S("Confirm a DV relationship", "Current or former spouse or household member, child in common or expected, or dating relationship (2C:25-19)", "/entry/njsa-2c-25-19"),
   S("Identify the offense (predicate act) and whether probable cause exists"),
   S("Interview each party and witnesses separately, including children if appropriate"),
   S("Check the DV central registry for existing restraining orders"),
   S("If both parties are injured, identify the primary aggressor", "Compare injuries, history and self-defense"),
  ]),
  dict(name="Arrest decision", steps=[
   S("Run the mandatory arrest go-by", "Injury, warrant, order violation or weapon = mandatory arrest", "/go/dv-arrest"),
   S("Do not arrest a victim who used reasonable force in self-defense"),
  ]),
  dict(name="Weapons", steps=[
   S("Seize weapons that put the victim at risk of serious bodily injury"),
   S("With any firearm, also seize the FPIC and handgun purchase permits"),
   S("Inventory seized items in the DV report and forward per county prosecutor procedure"),
  ]),
  dict(name="Victim services", steps=[
   S("Give the victim written notice of rights, in a language they understand"),
   S("Explain the TRO process and help with an application if requested"),
   S("Photograph injuries and the scene"),
   S("Provide the NJ DV hotline and local victim advocate information", "NJ DV Hotline: 1-800-572-7233"),
   S("If children were present or harmed, follow policy for notifying DCP&P"),
  ]),
  dict(name="Paperwork", steps=[
   S("Complete the DV offense report for every DV incident, even with no arrest"),
   S("Sign complaints as required; note bail or release conditions"),
   S("Notify a supervisor per policy"),
  ]),
 ]))

ITEMS.append(dict(id="dwi-arrest", kind="checklist", title="DWI Stop & Arrest", sections=["dwi-drugs", "checklists"],
 summary="From the first driving cue to the summonses.",
 groups=[
  dict(name="Before the stop", steps=[
   S("Note driving cues: weaving, drifting, speed changes, braking problems, judgment errors", "", "/entry/dwi-phases"),
   S("Note how the vehicle stops"),
  ]),
  dict(name="Personal contact", steps=[
   S("Observe and note odor, eyes, speech, dexterity with documents, answers to questions"),
   S("Ask about drinking, drugs, medical conditions, and when last eaten and slept"),
   S("Body-worn camera on and positioned to record the tests"),
  ]),
  dict(name="Field sobriety tests", steps=[
   S("Check the surface, lighting, footwear and weather"),
   S("Horizontal Gaze Nystagmus", "", "/entry/sfst-hgn"),
   S("Walk and Turn", "", "/entry/sfst-walk-turn"),
   S("One Leg Stand", "", "/entry/sfst-one-leg-stand"),
  ]),
  dict(name="Arrest & transport", steps=[
   S("Arrest when probable cause exists; search incident to arrest"),
   S("Arrange for the vehicle: impound for 12 hours per 39:4-50.23", "", "/entry/njsa-39-4-50-23"),
   S("Check for passengers 17 or younger (39:4-50.15)", "", "/entry/njsa-39-4-50-15"),
  ]),
  dict(name="At headquarters", steps=[
   S("Start and record the 20-minute observation period", "", "/entry/alcotest"),
   S("Read the AG standard statement exactly as written"),
   S("Breath test by a certified operator; keep the printouts"),
   S("Refusal or conditional answer: document it and charge 39:4-50.4a", "", "/entry/njsa-39-4-50-4a"),
   S("If impairment doesn't match the breath result, request a DRE", "", "/entry/dre-evaluation"),
   S("Blood draw needs a warrant unless an exigency exists (Missouri v. McNeely)"),
  ]),
  dict(name="Summonses & release", steps=[
   S("Issue summonses: 39:4-50 and related violations", "", "/entry/njsa-39-4-50"),
   S("Complete the drinking-driver / alcohol influence report"),
   S("Release only to a responsible adult per policy"),
  ]),
 ]))

ITEMS.append(dict(id="uof-reporting", kind="checklist", title="After a Use of Force", sections=["force-search", "checklists"],
 summary="What to do once the scene is safe after any reportable use of force.",
 groups=[
  dict(name="Immediately", steps=[
   S("Render first aid and request EMS for anyone injured or complaining of injury"),
   S("Notify a supervisor right away"),
   S("Intervene and report if you saw another officer use excessive force", "Duty to intervene under the AG Use of Force Policy", "/entry/uof-ag-policy"),
  ]),
  dict(name="Evidence", steps=[
   S("Preserve body-worn camera and in-car video; tag the recordings"),
   S("Photograph injuries to the subject and officers"),
   S("Identify and interview witnesses"),
   S("Collect and preserve any weapons or physical evidence"),
  ]),
  dict(name="Reporting", steps=[
   S("Complete the use of force report in the state reporting system within your agency's deadline"),
   S("Write a detailed narrative: the threat, resistance, de-escalation tried, force used and why, and when force stopped"),
   S("Follow your agency's policy for any discharge of a weapon, serious injury or death (prosecutor notification)"),
  ]),
 ]))

ITEMS.append(dict(id="death-investigation", kind="checklist", title="Unattended or Suspicious Death", sections=["investigations", "checklists"],
 summary="First-officer steps at a death scene.", groups=[
  dict(name="First minutes", steps=[
   S("Confirm death; request EMS if there is any doubt"),
   S("Secure the scene and start an entry log"),
   S("Do not move or cover the body unless necessary; note anything EMS moved"),
   S("Notify a supervisor and detectives per policy"),
  ]),
  dict(name="Observe and record", steps=[
   S("Position of the body, injuries, clothing"),
   S("Lividity, rigor and body temperature", "", "/entry/postmortem"),
   S("Weapons, medications, notes, drug items"),
   S("Doors, windows, lights, thermostat, mail and newspapers"),
   S("Photograph before anything is touched"),
  ]),
  dict(name="Information", steps=[
   S("Who found the decedent, and when the person was last known alive"),
   S("Medical history, physician and medications"),
   S("Notify the county medical examiner", "Violent, suspicious, sudden or unattended deaths are reportable", "/entry/death-investigations"),
   S("Next-of-kin notification in person when possible"),
  ]),
 ]))

ITEMS.append(dict(id="missing-person", kind="checklist", title="Missing Person Report", sections=["investigations", "checklists"],
 summary="Take the report immediately; there is no waiting period.", groups=[
  dict(name="Take the report", steps=[
   S("Accept the report immediately, no waiting period", "", "/entry/missing-persons"),
   S("Recent photo, physical description and clothing last worn"),
   S("Phone number, carrier, social media accounts, vehicle and plate"),
   S("Medical needs, medications, cognitive conditions"),
   S("Where last seen, with whom, and places the person might go"),
  ]),
  dict(name="Assess risk", steps=[
   S("High risk: young child, elderly or impaired, medical need, suicide risk, or suspected abduction"),
   S("High-risk cases: notify a supervisor right away and start an active search"),
  ]),
  dict(name="Search and enter", steps=[
   S("Search the home and property where last seen, even if family already did"),
   S("Enter persons under 21 into NCIC without delay (federal law: within two hours)"),
   S("AMBER Alert requests go through NJ State Police when criteria are met"),
   S("Canvass, check video, contact friends, school or work, and hospitals"),
  ]),
 ]))

ITEMS.append(dict(id="sexual-assault-response", kind="checklist", title="Sexual Assault Initial Response", sections=["investigations", "checklists"],
 summary="A victim-centered first response.", groups=[
  dict(name="Safety & care", steps=[
   S("Ensure safety and medical care first"),
   S("Contact the county Sexual Assault Response Team (SART/SANE)", "", "/entry/sex-crimes-investigation"),
   S("Explain that a forensic exam is available even without reporting to police"),
  ]),
  dict(name="Evidence", steps=[
   S("Ask the victim, if possible, not to bathe, change, eat, drink or use the bathroom"),
   S("Collect clothing in paper bags, not plastic"),
   S("Secure the scene and note any electronic evidence (messages, video)"),
  ]),
  dict(name="Interview", steps=[
   S("Brief initial interview only: what happened, suspect info, location, time"),
   S("Leave the detailed interview to trained investigators"),
   S("Notify the county prosecutor's sex crimes unit per county policy"),
  ]),
 ]))

ITEMS.append(dict(id="mv-crash", kind="checklist", title="Motor Vehicle Crash", sections=["motor-vehicle", "checklists"],
 summary="Scene management through the crash report.", groups=[
  dict(name="Scene safety", steps=[
   S("Position the vehicle to protect the scene; lights on"),
   S("Check for injuries and request EMS and fire as needed"),
   S("Look for hazards: fuel, fire, wires, hazmat placards", "", "/entry/hazmat-erg"),
   S("Set up traffic control"),
  ]),
  dict(name="Investigate", steps=[
   S("Identify drivers, passengers and witnesses; exchange information"),
   S("Check licenses, registrations and insurance"),
   S("Watch for signs of impairment", "", "/go/dwi-arrest"),
   S("Photograph vehicles, final rest positions, debris and road marks"),
   S("If a driver left the scene, get the vehicle description and direction", "", "/entry/njsa-39-4-129"),
  ]),
  dict(name="Wrap up", steps=[
   S("Arrange tows and clear debris"),
   S("Complete the NJTR-1 crash report"),
   S("Issue summonses where the facts support them"),
  ]),
 ]))

ITEMS.append(dict(id="shoplifting", kind="checklist", title="Shoplifting Arrest", sections=["criminal-code", "checklists"],
 summary="Grading depends on the full retail value.", groups=[
  dict(name="On scene", steps=[
   S("Confirm what security saw: selection, concealment, passing the last point of sale"),
   S("Get the full retail value of all items", "", "/tools"),
   S("Collect video and the store's written statement"),
   S("Check for prior shoplifting convictions"),
  ]),
  dict(name="Charge", steps=[
   S("Grade by value: DP under $200; 4th degree $200-$500; 3rd degree $500 to $75,000; 2nd degree $75,000+", "", "/entry/njsa-2c-20-11"),
   S("Return or photograph merchandise per store and agency policy"),
  ]),
 ]))

ITEMS.append(dict(id="psych-transport", kind="checklist", title="Mental Health Screening Transport", sections=["investigations", "checklists"],
 summary="Taking a person to a screening service.", groups=[
  dict(name="Steps", steps=[
   S("Make the scene safe and slow things down; request a crisis team if available", "", "/entry/psych-crises"),
   S("Decide whether there are reasonable grounds for screening", "", "/go/mental-health"),
   S("Pat down for weapons before transport"),
   S("Transport to the designated screening service; brief the screener"),
   S("Document observations, statements and behavior that supported the decision"),
  ]),
 ]))

# ======================= DECISION GO-BYS (flows) =======================
ITEMS.append(dict(id="dv-arrest", kind="flow", title="Is This a Mandatory DV Arrest?", sections=["domestic-violence", "checklists"],
 summary="Walks through N.J.S.A. 2C:25-21.", start="rel",
 nodes={
  "rel": dict(q="Is there a domestic violence relationship?", help="Current or former spouse or household member, child in common or expected, or dating relationship.", yes="pc", no="notdv"),
  "pc": dict(q="Is there probable cause that a DV offense (predicate act) was committed?", help="Assault, harassment, threats, criminal mischief, contempt, stalking and the other offenses listed in 2C:25-19.", yes="injury", no="nopc"),
  "injury": dict(q="Does the victim show signs of injury caused by the DV?", help="Read broadly: includes complaints of pain or impairment, not just visible marks.", yes="must", no="warrant"),
  "warrant": dict(q="Is there a warrant in effect for the suspect?", yes="must", no="order"),
  "order": dict(q="Is there probable cause a served restraining order was violated?", yes="must", no="weapon"),
  "weapon": dict(q="Was a weapon involved?", yes="must", no="may"),
  "must": dict(result="MANDATORY ARREST", tone="red", points=["Arrest the suspect and sign a criminal complaint.", "Seize weapons at risk, plus FPIC and permits with any firearm.", "Give the victim notice of rights and complete the DV report."], link="/entry/njsa-2c-25-21"),
  "may": dict(result="Arrest is discretionary", tone="amber", points=["You may arrest and/or sign a complaint based on probable cause.", "Still seize weapons when needed and complete the DV report.", "Give the victim notice of rights and explain the TRO process."], link="/entry/njsa-2c-25-21"),
  "nopc": dict(result="No probable cause for a DV offense", tone="blue", points=["Complete the DV offense report anyway.", "Give the victim notice of rights, including the right to seek a TRO."]),
  "notdv": dict(result="Not covered by the DV Act", tone="blue", points=["Handle any offense under regular criminal law.", "Document the relationship facts in your report."]),
 }))

ITEMS.append(dict(id="consent-search", kind="flow", title="Can I Ask for Consent to Search the Car?", sections=["force-search", "checklists"],
 summary="New Jersey rules for motor vehicle consent searches.", start="stop",
 nodes={
  "stop": dict(q="Was the stop lawful (reasonable suspicion of a violation or crime)?", yes="pc", no="nostop"),
  "pc": dict(q="Did probable cause to search arise spontaneously and unforeseeably at the scene?", help="For example, contraband in plain view during the stop.", yes="witt", no="ras"),
  "ras": dict(q="Do you have reasonable, articulable suspicion that a search will reveal evidence of a crime?", help="Required before even asking for consent (State v. Carty).", yes="ask", no="noask"),
  "witt": dict(result="Automobile exception may apply", tone="green", points=["A warrantless roadside search is allowed when probable cause arises spontaneously and unforeseeably (State v. Witt).", "No consent needed. Document the facts that created probable cause.", "If the car is towed first, get a warrant."], link="/entry/traffic-stops"),
  "ask": dict(result="You may request consent", tone="green", points=["Tell the person they have the right to refuse.", "They may withdraw consent and may watch the search.", "Use your agency's consent-to-search form and record on BWC."], link="/entry/traffic-stops"),
  "noask": dict(result="Do not ask for consent", tone="red", points=["Without reasonable suspicion, a consent request is not allowed in NJ.", "Finish the stop without extending it."], link="/entry/traffic-stops"),
  "nostop": dict(result="Stop is not supported", tone="red", points=["Without reasonable suspicion, the stop and anything found may be suppressed."]),
 }))

ITEMS.append(dict(id="mental-health", kind="flow", title="Mental Health Crisis: Screening or Not?", sections=["investigations", "checklists"],
 summary="Deciding on a screening transport under N.J.S.A. 30:4-27.6.", start="danger",
 nodes={
  "danger": dict(q="Is anyone in immediate danger right now?", yes="safety", no="grounds"),
  "safety": dict(result="Make the scene safe first", tone="red", points=["Use time, distance and cover; request backup and EMS.", "Follow the AG Use of Force Policy.", "Once safe, continue to the screening decision."], link="/entry/uof-ag-policy", next="grounds"),
  "grounds": dict(q="Are there reasonable grounds to believe the person is dangerous to self, others or property because of mental illness?", help="Based on what you observe or on a screener's certificate.", yes="transport", no="voluntary"),
  "transport": dict(result="Transport to a screening service", tone="amber", points=["Take the person into custody for screening (30:4-27.6).", "Pat down for weapons before transport.", "Document the specific behavior and statements."], link="/entry/njsa-30-4-27-6"),
  "voluntary": dict(result="Offer voluntary help", tone="green", points=["Offer voluntary evaluation or a crisis team.", "Share the 988 Suicide & Crisis Lifeline.", "Document the contact and any referrals."], link="/entry/psych-crises"),
 }))

for it in ITEMS:
    it["note"] = "Follow your department's policy and current AG directives. Not yet verified against official sources."
    json.dump(it, open(os.path.join(OUT, it["id"] + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)
print(len(ITEMS), "written")
