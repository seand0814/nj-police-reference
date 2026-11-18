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

# ======================= MORE CHECKLISTS =======================
ITEMS.append(dict(id="arrest-processing", kind="checklist", title="Arrest Processing", sections=["arrest-juveniles", "checklists"],
 summary="From the street to the charging decision under Criminal Justice Reform.", groups=[
  dict(name="At the scene", steps=[
   S("Search incident to arrest; secure property and evidence"),
   S("Confirm identity and check for warrants and restraining orders"),
   S("Note injuries and request medical attention if needed"),
  ]),
  dict(name="At headquarters", steps=[
   S("Miranda before any custodial questioning; record as required", "", "/entry/ag-recording-interrogations"),
   S("Fingerprints and photographs for indictable offenses (Live Scan)"),
   S("Collect DNA where the law requires it for the arrest charge"),
   S("Allow a phone call per agency policy"),
  ]),
  dict(name="Charging", steps=[
   S("Decide complaint-summons or complaint-warrant under the AG directive and county guidelines", "", "/entry/cjr-overview"),
   S("Get prosecutor approval where your county requires it"),
   S("Write a specific affidavit of probable cause"),
   S("Warrant: submit to a judge; the PSA is generated for the release decision"),
   S("Summons: serve the defendant and release with the court date"),
  ]),
  dict(name="Wrap up", steps=[
   S("Victim notification and rights information where required"),
   S("Property and evidence logged and secured"),
   S("Reports completed and BWC footage tagged"),
  ]),
 ]))

ITEMS.append(dict(id="juvenile-custody-checklist", kind="checklist", title="Juvenile in Custody", sections=["arrest-juveniles", "checklists"],
 summary="Steps for a person under 18 taken into custody.", groups=[
  dict(name="Steps", steps=[
   S("Confirm age and identity", "", "/entry/juvenile-custody"),
   S("Notify a parent or guardian as soon as possible; document the time"),
   S("Keep the juvenile out of sight and sound of adult detainees"),
   S("Questioning: Miranda with a parent present whenever possible (Presha)", "", "/entry/juvenile-interrogation"),
   S("Consider a stationhouse adjustment for a minor offense", "", "/entry/stationhouse-adjustment"),
   S("Contact juvenile intake or the on-call Family judge about detention"),
   S("Release to a parent or guardian, or transport as ordered"),
   S("Complete juvenile complaint and reports; keep records confidential"),
  ]),
 ]))

ITEMS.append(dict(id="search-warrant-affidavit", kind="checklist", title="Search Warrant Affidavit", sections=["force-search", "checklists"],
 summary="What a strong NJ search warrant application includes.", groups=[
  dict(name="The affiant", steps=[
   S("Your training and experience relevant to this investigation"),
  ]),
  dict(name="Probable cause", steps=[
   S("Specific facts, with dates, showing a crime was committed"),
   S("Facts linking the evidence to the place to be searched (nexus)"),
   S("Recent information; explain why it is not stale"),
   S("Informants: basis of knowledge, reliability, and how you corroborated them (totality of the circumstances)"),
   S("NJ has no good-faith exception: the affidavit must stand on its own", "", "/entry/case-state-v-novembrino"),
  ]),
  dict(name="Particularity", steps=[
   S("Exact description of the place: address, building, unit, vehicles, people"),
   S("Specific list of items to be seized"),
   S("Digital devices: say what data you want and why"),
  ]),
  dict(name="Special requests", steps=[
   S("No-knock entry: specific facts showing danger or destruction of evidence"),
   S("Nighttime execution, if needed, with reasons"),
  ]),
  dict(name="Before and after", steps=[
   S("Prosecutor review per county policy"),
   S("Execute within the time the warrant allows (R. 3:5-5)"),
   S("Leave a copy and receipt; complete the inventory and return"),
  ]),
 ]))

ITEMS.append(dict(id="erpo-petition", kind="checklist", title="Extreme Risk Protective Order", sections=["arrest-juveniles", "checklists"],
 summary="Petitioning for and serving a temporary ERPO.", groups=[
  dict(name="Petition", steps=[
   S("Identify the danger: recent threats, violence, order violations, reckless firearm use, substance abuse", "", "/entry/ag-erpo"),
   S("Check firearm records and permits for the respondent"),
   S("Complete the petition with specific, sworn facts"),
   S("Notify a supervisor and the ERPO coordinator or prosecutor"),
  ]),
  dict(name="Service", steps=[
   S("Serve the temporary order and explain its terms"),
   S("Take custody of firearms, ammunition and permits covered by the order"),
   S("If the respondent won't comply, seek a search warrant"),
   S("Give receipts and complete the return of service"),
  ]),
 ]))

ITEMS.append(dict(id="building-search", kind="checklist", title="Building Search", sections=["operations", "checklists"],
 summary="Searching a building for a suspect, such as after an alarm with signs of entry.", groups=[
  dict(name="Before entry", steps=[
   S("Set a perimeter covering all exits"),
   S("Get the layout and keyholder information if possible"),
   S("Request K-9; give a loud K-9 or police announcement and wait"),
   S("Team of at least two; agree on a plan and radio channel"),
  ]),
  dict(name="Searching", steps=[
   S("Move slowly using cover; clear corners by slicing the pie"),
   S("Clear one room at a time; check closets, ceilings, under furniture"),
   S("Mark or call out cleared areas"),
   S("Keep one officer covering while another searches"),
  ]),
  dict(name="After", steps=[
   S("Document point of entry, damage and evidence"),
   S("Notify the owner or keyholder and secure the building"),
  ]),
 ]))

ITEMS.append(dict(id="serve-restraining-order", kind="checklist", title="Serving a Restraining Order", sections=["domestic-violence", "checklists"],
 summary="Service of a TRO or final restraining order.", groups=[
  dict(name="Steps", steps=[
   S("Confirm the order and its conditions in the DV registry"),
   S("Serve in person; give the respondent a copy"),
   S("Explain the terms: no contact, locations, and consequences of violation"),
   S("Seize weapons, firearms, FPIC and permits as the order directs"),
   S("Arrange supervised retrieval of belongings if the order allows"),
   S("Complete the return of service and enter it in the registry"),
   S("Notify the victim that the order was served"),
  ]),
 ]))

# ======================= REPORT TEMPLATES =======================
ITEMS.append(dict(id="template-dwi-report", kind="template", title="DWI Report Outline", sections=["dwi-drugs", "checklists"],
 summary="A fill-in outline for a DWI narrative. Copy it into your report.", groups=[
  dict(name="Vehicle in motion", steps=[S("Date, time, location, weather, lighting, road"), S("Driving behavior observed (specific cues)"), S("How the vehicle stopped")]),
  dict(name="Personal contact", steps=[S("Odor, eyes, speech, face"), S("Handling of documents"), S("Statements about drinking, drugs, last meal, sleep"), S("Medical conditions, injuries, footwear")]),
  dict(name="Field sobriety tests", steps=[S("Surface and conditions"), S("HGN: clues in each eye"), S("Walk and Turn: clues observed"), S("One Leg Stand: clues observed")]),
  dict(name="Arrest and testing", steps=[S("Time of arrest and basis for probable cause"), S("Observation period start and end times"), S("Standard statement read; response"), S("Breath results or refusal; DRE if requested")]),
  dict(name="Wrap up", steps=[S("Vehicle impound and release information"), S("Summonses issued"), S("Release to responsible adult"), S("BWC and in-car video recorded")]),
 ]))
ITEMS.append(dict(id="template-dv-report", kind="template", title="Domestic Violence Report Outline", sections=["domestic-violence", "checklists"],
 summary="A fill-in outline for a DV narrative.", groups=[
  dict(name="Call", steps=[S("Dispatch information and time of arrival"), S("Who was present on arrival and their condition")]),
  dict(name="Relationship", steps=[S("Relationship between the parties (qualifies under 2C:25-19?)"), S("Children present")]),
  dict(name="Statements", steps=[S("Victim statement (in their words)"), S("Suspect statement"), S("Witness statements")]),
  dict(name="Evidence", steps=[S("Injuries observed and photographed"), S("Scene condition, damage"), S("Weapons on scene and seized; FPIC and permits")]),
  dict(name="Actions", steps=[S("History and existing orders checked"), S("Arrest decision and basis (mandatory or discretionary)"), S("Victim rights notice given; TRO assistance"), S("DCP&P notification if applicable")]),
 ]))
ITEMS.append(dict(id="template-uof-report", kind="template", title="Use of Force Narrative Outline", sections=["force-search", "checklists"],
 summary="Covers what reviewers look for under Graham and the AG policy.", groups=[
  dict(name="Why you were there", steps=[S("Call or reason for contact; what you knew beforehand")]),
  dict(name="The threat", steps=[S("Severity of the suspected offense"), S("Specific words and actions showing a threat to you or others"), S("Resistance or flight, described specifically")]),
  dict(name="De-escalation", steps=[S("Commands, warnings, time, distance, cover, additional resources used or why not feasible")]),
  dict(name="Force used", steps=[S("Each type of force, in order, and why it was necessary and proportional"), S("When force stopped and why")]),
  dict(name="After", steps=[S("Medical aid offered or given; injuries"), S("Supervisor notification; BWC; witnesses; photos")]),
 ]))

# ======================= PROTECTIVE ORDERS =======================
ITEMS.append(dict(id="which-protective-order", kind="flow", title="Which Protective Order Fits?", sections=["domestic-violence", "arrest-juveniles", "checklists"],
 summary="Points the victim or family to the right order: DV TRO, SASPA, ERPO or release conditions.", start="rel",
 nodes={
  "rel": dict(q="Is there a DV relationship between the parties?", help="Current or former spouse or household member, child in common or expected, or a dating relationship.", yes="pred", no="sex"),
  "pred": dict(q="Did a DV predicate act occur (assault, harassment, threats, stalking, criminal mischief, etc.)?", yes="tro", no="nopred"),
  "tro": dict(result="DV restraining order (TRO)", tone="green", points=["Help the victim apply for a TRO (Family Part, or the on-call judge after hours).", "Run the mandatory arrest go-by if an offense occurred.", "If firearms are a concern, an ERPO can also be sought."], link="/entry/dv-tro-guide"),
  "nopred": dict(result="No TRO basis yet", tone="blue", points=["Document the incident and relationship.", "Give the victim DV rights information and resources.", "If firearms pose a danger, consider an ERPO."], link="/entry/dv-procedures"),
  "sex": dict(q="Was the person a victim of nonconsensual sexual contact, penetration or lewdness (or an attempt)?", yes="saspa", no="gun"),
  "saspa": dict(result="Sexual Assault Survivor Protection Act order", tone="green", points=["Help the victim apply for a temporary protective order.", "No criminal complaint is required.", "Contact SART and the county prosecutor per policy."], link="/entry/saspa-orders"),
  "gun": dict(q="Does someone pose a significant danger to themselves or others by having a firearm?", yes="erpo", no="charge"),
  "erpo": dict(result="Extreme Risk Protective Order (ERPO)", tone="amber", points=["A family or household member or an officer may petition.", "A temporary order can issue the same day.", "On service, firearms, ammunition and permits must be surrendered."], link="/entry/ag-erpo"),
  "charge": dict(q="Is there a pending criminal charge against the person causing the problem?", yes="nocontact", no="other"),
  "nocontact": dict(result="No-contact release conditions", tone="blue", points=["Check whether a judge set no-contact conditions.", "Report violations to the prosecutor; in DV cases, they can be charged as contempt."], link="/entry/no-contact-conditions"),
  "other": dict(result="Criminal complaint or civil options", tone="blue", points=["If there is probable cause, consider harassment (2C:33-4) or stalking (2C:12-10).", "A stalking conviction acts as a restraining order (2C:12-10.1).", "Refer the person to victim services and civil legal resources."], link="/entry/njsa-2c-12-10"),
 }))

ITEMS.append(dict(id="tro-after-hours", kind="checklist", title="After-Hours TRO Application", sections=["domestic-violence", "checklists"],
 summary="Helping a DV victim get a temporary restraining order when the court is closed.", groups=[
  dict(name="Prepare", steps=[
   S("Confirm the DV relationship and a predicate act", "", "/entry/dv-tro-guide"),
   S("Check the DV registry for existing orders and prior history"),
   S("Explain the TRO process neutrally; don't discourage or promise outcomes"),
   S("Ask what relief the victim wants: no contact, residence, custody, places to stay away from"),
   S("Ask about weapons and firearms the defendant has access to"),
  ]),
  dict(name="Application", steps=[
   S("Complete the TRO application with the victim's account in their own words"),
   S("Contact the on-call judge per your court's procedure; the victim gives sworn testimony"),
   S("Record the time the TRO is granted and the judge's name"),
  ]),
  dict(name="After it's granted", steps=[
   S("Give the victim a copy and the final hearing date and location"),
   S("Serve the defendant as soon as possible", "", "/go/serve-restraining-order"),
   S("Seize weapons and permits as the order directs", "", "/entry/dv-weapons-after"),
   S("Enter the order and service in the registry; complete reports"),
   S("Give the victim safety planning and hotline information", "NJ DV Hotline: 1-800-572-7233"),
  ]),
 ]))

for it in ITEMS:
    it["note"] = "Follow your department's policy and current AG directives. Not yet verified against official sources."
    json.dump(it, open(os.path.join(OUT, it["id"] + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)
print(len(ITEMS), "written")
