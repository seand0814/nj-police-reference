"""Non-statute topics, written in original language from general knowledge (2026-11-18).
Not yet checked against sources: every entry carries source_verified=False."""

T = {}
def t(i, citation, points, notes=(), grade=""):
    T[i] = dict(citation=citation, key_points=list(points), officer_notes=list(notes), grade_or_penalty=grade)

# ---------------- USE OF FORCE & SEARCH ----------------
t("uof-ag-policy", "NJ Attorney General Use of Force Policy (current revision)", [
 "Officers must use only the force that is objectively reasonable, necessary and proportional to the threat, and must stop once the threat ends.",
 "De-escalation is required when it is safe: time, distance, cover, communication and additional resources.",
 "Deadly force is a last resort, only when the officer reasonably believes it is immediately necessary to protect the officer or another from imminent death or serious bodily injury.",
 "Chokeholds and neck restraints are treated as deadly force.",
 "Shooting at or from a moving vehicle is prohibited except where deadly force is otherwise authorized and no reasonable alternative exists.",
 "Officers have a duty to intervene to stop excessive force by another officer and to report it.",
 "Render or request medical aid after force is used, and report force through the state's use of force reporting system.",
], ["Your department policy and training may be stricter; follow the strictest applicable rule."])

t("search-patdown", "Terry v. Ohio, 392 U.S. 1 (1968); Minnesota v. Dickerson, 508 U.S. 366 (1993)", [
 "A frisk requires specific, articulable facts that the person is armed and dangerous; reasonable suspicion of a crime alone is not enough.",
 "A frisk is limited to a pat-down of outer clothing for weapons.",
 "Plain feel: an item whose identity as contraband is immediately apparent may be seized; manipulating an object to identify it goes too far.",
 "A search incident to arrest requires a lawful custodial arrest and covers the person and the area within immediate control.",
 "Document the facts that supported the frisk before and separately from what was found.",
])

t("traffic-stops", "Fourth Amendment; N.J. Const. art. I, para. 7; NJ case law", [
 "A stop requires reasonable suspicion of a motor vehicle violation or criminal activity.",
 "The stop may last only as long as needed to handle the violation; extending it requires new reasonable suspicion (Rodriguez v. United States, 575 U.S. 348 (2015); State v. Dunbar, 229 N.J. 521 (2017) for canine sniffs).",
 "Drivers may be ordered out of the vehicle (Pennsylvania v. Mimms). In NJ, ordering a passenger out requires specific facts that warrant heightened caution (State v. Smith, 134 N.J. 599 (1994)).",
 "In NJ, a consent search of a vehicle requires reasonable suspicion first, and the person must be told of the right to refuse (State v. Carty, 170 N.J. 632 (2002)).",
 "NJ auto exception: a roadside warrantless search is allowed when probable cause arises spontaneously and unforeseeably (State v. Witt, 223 N.J. 409 (2015)).",
], ["Activate body-worn camera per AG directive; complete stop data reporting as required."])

t("traffic-stops-high-risk", "General tactical principles; follow agency training", [
 "Use when there is reason to believe occupants are armed or dangerous (felony vehicle, armed suspect, BOLO match).",
 "Plan before initiating: wait for backup, choose a location with cover and good lighting, and notify dispatch.",
 "Position vehicles to create cover; officers stay behind cover and do not approach the vehicle.",
 "One officer gives commands, clearly and one at a time; others cover.",
 "Order occupants out one at a time, hands visible, walking backward to officers for control and handcuffing.",
 "Clear the vehicle only after all known occupants are secured.",
], ["Commands must be given in a language the occupants understand; see the Spanish phrase entry."])

# ---------------- DWI & DRUGS ----------------
t("dwi-phases", "NHTSA DWI Detection and SFST curriculum", [
 "Phase 1, vehicle in motion: observe driving cues (weaving, drifting, speed problems, braking problems, judgment errors) and the manner of stopping.",
 "Phase 2, personal contact: observe and smell the driver, note speech, eyes, dexterity in producing documents, and answers to questions.",
 "Phase 3, pre-arrest screening: standardized field sobriety tests and, where available, a preliminary breath test.",
 "Write down specific observations at each phase; they support probable cause.",
], [], "")

t("alcotest", "NJ breath testing procedures; State v. Chun, 194 N.J. 54 (2008)", [
 "Breath tests are given only by a certified operator using the approved instrument and procedures.",
 "A 20-minute observation period is required before testing; the subject must not eat, drink, smoke, vomit or place anything in the mouth.",
 "Read the AG standard statement on breath testing exactly as written before requesting samples.",
 "An ambiguous or conditional answer is treated as a refusal (see 39:4-50.4a).",
 "Preserve the instrument printouts and record the observation period start and end times.",
], ["Confirm the instrument model and current procedures with your agency's breath test coordinator."])

t("dre-evaluation", "NHTSA/IACP Drug Evaluation and Classification Program (public overview)", [
 "A certified Drug Recognition Expert follows a standardized 12-step evaluation.",
 "Steps: breath alcohol test; interview of the arresting officer; preliminary exam and first pulse; eye exams (HGN, vertical gaze nystagmus, lack of convergence); divided attention tests; vital signs and second pulse; dark room pupil exam; muscle tone; check for injection sites and third pulse; statements; opinion of the evaluator; toxicology sample.",
 "Seven drug categories: cannabis, CNS depressants, CNS stimulants, dissociative anesthetics, hallucinogens, inhalants and narcotic analgesics.",
], ["Request a DRE early when impairment is not explained by the breath result."])

t("drug-inhalants", "General drug-recognition knowledge (confirm against DEA publications)", [
 "Examples: solvents, aerosols, glue, paint, gasoline, nitrous oxide, computer duster.",
 "Signs: chemical odor on breath or clothing, paint or residue on face, hands or nose, slurred speech, dizziness, poor coordination, watery eyes, nausea.",
 "Danger: sudden cardiac death can occur even on first use; suffocation is also a risk.",
], ["Possession or use to become intoxicated is covered by N.J.S.A. 2C:35-10.4."])

t("drug-terminology", "General law enforcement usage", [
 "Bundle: a group of 10 bags of heroin or fentanyl. Brick: 50 bags (5 bundles).",
 "Eight ball: about 3.5 grams (1/8 ounce). Zip: an ounce.",
 "Pressed pills / M30s: counterfeit tablets made to look like oxycodone, frequently containing fentanyl.",
 "Tranq: xylazine, a veterinary sedative often mixed with fentanyl; it is not reversed by naloxone.",
 "Dab / wax / shatter: concentrated cannabis extracts.",
 "Works / rig: injection equipment.",
 "Stamp: the brand marking printed on bags of heroin or fentanyl.",
], ["Slang changes quickly and varies by region; record the exact words used."])

t("drug-pharmaceuticals", "General knowledge (confirm against DEA publications)", [
 "Opioids: oxycodone, hydrocodone, morphine, codeine (including promethazine-codeine syrup), buprenorphine, methadone, tramadol.",
 "Benzodiazepines: alprazolam, clonazepam, diazepam, lorazepam.",
 "Stimulants: amphetamine salts, methylphenidate.",
 "Other commonly misused: gabapentin, carisoprodol, zolpidem.",
 "Possession outside the original container is limited by N.J.S.A. 2C:35-24; non-CDS prescription drugs fall under 2C:35-10.5.",
])

# ---------------- CASE LAW & LEGAL TERMS ----------------
t("miranda", "Miranda v. Arizona, 384 U.S. 436 (1966); NJ case law", [
 "Warnings are required before custodial interrogation: the person is in custody (or its functional equivalent) and is being questioned or exposed to words or actions likely to draw an incriminating response.",
 "Core rights: to remain silent; that anything said can be used in court; to have a lawyer present before and during questioning; to have a lawyer appointed if one cannot be afforded; to stop answering at any time.",
 "NJ requires the State to prove a knowing, voluntary and intelligent waiver beyond a reasonable doubt.",
 "Question-first, warn-later tactics are prohibited (State v. O'Neill, 193 N.J. 148 (2007)).",
 "An ambiguous request for a lawyer or to stop requires the officer to stop and clarify before going on.",
], ["Read from your agency's approved card or form and record the waiver."])

t("case-uof", "U.S. Supreme Court", [
 "Graham v. Connor, 490 U.S. 386 (1989): force is judged by objective reasonableness from the view of a reasonable officer on the scene, considering severity of the crime, immediate threat, and active resistance or flight.",
 "Tennessee v. Garner, 471 U.S. 1 (1985): deadly force may not be used to stop a fleeing suspect unless there is probable cause the suspect poses a significant threat of death or serious physical injury.",
 "Scott v. Harris, 550 U.S. 372 (2007): reasonableness of ending a dangerous high-speed chase by force is judged on the facts, including the risk to the public.",
], ["NJ policy is stricter than these constitutional minimums; see the AG Use of Force Policy entry."])

t("case-rs-pc", "U.S. Supreme Court and NJ Supreme Court", [
 "Terry v. Ohio (1968): a brief investigative stop requires reasonable, articulable suspicion of criminal activity.",
 "Illinois v. Wardlow, 528 U.S. 119 (2000): unprovoked flight in a high-crime area can contribute to reasonable suspicion.",
 "Florida v. J.L., 529 U.S. 266 (2000): an anonymous tip that someone has a gun, without corroboration of its reliability, is not enough to stop and frisk.",
 "Probable cause means a well-grounded suspicion that a crime has been committed, judged on the totality of the circumstances (Illinois v. Gates, 462 U.S. 213 (1983)).",
 "NJ: no good-faith exception to the exclusionary rule (State v. Novembrino, 105 N.J. 95 (1987)).",
])

t("case-searches", "U.S. Supreme Court and NJ Supreme Court", [
 "Mapp v. Ohio, 367 U.S. 643 (1961): evidence from unconstitutional searches is excluded in state courts.",
 "Chimel v. California, 395 U.S. 752 (1969): search incident to arrest is limited to the person and the area within immediate control.",
 "Arizona v. Gant, 556 U.S. 332 (2009): vehicle search incident to arrest only if the arrestee can reach the passenger area or it is reasonable to believe evidence of the arrest offense is inside.",
 "Payton v. New York, 445 U.S. 573 (1980): a warrant is needed to enter a home for a routine arrest absent exigency or consent.",
 "Riley v. California, 573 U.S. 373 (2014): a warrant is generally needed to search a cell phone seized on arrest.",
 "Missouri v. McNeely, 569 U.S. 141 (2013): alcohol dissipation alone does not create an exigency for a warrantless blood draw.",
 "State v. Johnson, 68 N.J. 349 (1975): NJ consent searches require that the person knew of the right to refuse.",
 "State v. Edmonds, 211 N.J. 117 (2012): emergency-aid entry requires an objectively reasonable basis to believe an emergency requires immediate help.",
])

t("us-constitution", "U.S. Constitution; N.J. Constitution", [
 "4th Amendment: protects against unreasonable searches and seizures; warrants require probable cause.",
 "5th Amendment: protects against compelled self-incrimination and double jeopardy; guarantees due process.",
 "6th Amendment: right to counsel, speedy and public trial, jury, and to confront witnesses.",
 "8th Amendment: bars excessive bail and fines and cruel and unusual punishment.",
 "14th Amendment: applies due process and equal protection to the states.",
 "N.J. Const. art. I, para. 7 parallels the 4th Amendment but NJ courts often read it to give broader protection.",
])

t("legal-terms", "Original definitions; see cited statutes", [
 "Purposely / knowingly / recklessly / negligently: the four culpability levels in N.J.S.A. 2C:2-2.",
 "Bodily injury: physical pain, illness or any impairment of physical condition (2C:11-1).",
 "Significant bodily injury: temporary loss of a bodily function or of any of the five senses (2C:11-1).",
 "Serious bodily injury: substantial risk of death, serious permanent disfigurement, or protracted loss or impairment of a body part or organ (2C:11-1).",
 "Deadly weapon: anything that in the manner used or intended is known to be capable of producing death or serious bodily injury (2C:11-1).",
 "Constructive possession: knowledge of an item plus the intent and ability to control it, even without physical possession.",
 "Disorderly persons offense: up to 6 months jail; petty disorderly persons: up to 30 days. Crimes: 1st degree 10-20 years, 2nd 5-10, 3rd 3-5, 4th up to 18 months (2C:43-6).",
 "Reasonable suspicion: specific, articulable facts suggesting criminal activity. Probable cause: a well-grounded belief a crime occurred and the person committed it.",
 "Exigent circumstances: an emergency that makes getting a warrant impractical (danger to life, destruction of evidence, hot pursuit).",
])

# ---------------- INVESTIGATIONS ----------------
t("death-investigations", "County Medical Examiner reporting (N.J.S.A. 52:17B-86); general practice", [
 "Violent, suspicious, sudden or unattended deaths must be reported to the county medical examiner.",
 "Confirm death and check for signs of life; request EMS if there is any doubt.",
 "Secure the scene, limit entry, and start an entry log; do not move or cover the body unless necessary.",
 "Note the position of the body, injuries, lividity and rigor, weapons, medications, notes, doors and windows, lights, temperature.",
 "Identify the last person to see the decedent and when; collect medical history and physician information.",
 "Notify a supervisor and detectives per policy; next-of-kin notification is done in person when possible.",
])

t("postmortem", "General forensic reference (estimates only)", [
 "Livor mortis (lividity): pooling of blood in low areas; begins within about 30 minutes to 2 hours and becomes fixed around 8 to 12 hours. Lividity inconsistent with position suggests the body was moved.",
 "Rigor mortis: stiffening that begins in small muscles about 2 to 6 hours after death, is complete around 12 hours, and fades over roughly 24 to 48 hours.",
 "Algor mortis: body cooling, roughly 1 to 1.5 degrees F per hour under normal conditions.",
 "Temperature, clothing, body size, activity before death and environment all change these timelines significantly.",
], ["Time of death is determined by the medical examiner; record observations, not conclusions."])

t("sex-crimes-investigation", "NJ AG standards for sexual assault response; general practice", [
 "Ensure safety and medical care first; contact the county Sexual Assault Response Team (SART).",
 "Victims may receive a forensic exam without reporting to police; respect their choice.",
 "Preserve evidence: ask the victim not to bathe, change clothes, eat, drink or use the bathroom if possible, and bag clothing in paper.",
 "Forensic evidence is best collected within 5 days of the assault.",
 "Use a trauma-informed approach: a brief initial interview for immediate facts, with a detailed interview by trained investigators later.",
 "Notify the county prosecutor's sex crimes unit per county policy.",
])

t("burglary-robbery-investigation", "General practice", [
 "Check for suspects still on scene before clearing; set up a perimeter on fresh calls.",
 "Robbery: get a fast description of suspects, weapon, direction and vehicle out to dispatch; protect the victim and witnesses.",
 "Identify point of entry and exit; protect tool marks, footwear impressions, fingerprints and DNA areas.",
 "Collect video from the scene and nearby businesses and homes promptly.",
 "List stolen property with serial numbers for NCIC entry and pawn checks.",
 "Separate witnesses before taking statements.",
])

t("psych-crises", "N.J.S.A. 30:4-27.1 et seq.; NJ AG guidance; de-escalation training", [
 "Treat as a medical crisis: slow down, create distance and time, and use calm, simple language.",
 "Request a mental health responder or crisis team where available (for example, ARRIVE Together programs).",
 "An officer may take a person to a screening service when there is reasonable ground to believe they meet the commitment standard (30:4-27.6).",
 "Dangerous to self or others means a substantial likelihood of harm in the reasonably foreseeable future, based on recent behavior.",
 "Check for weapons and ask about recent medication or substance use.",
], ["Remember the 988 Suicide & Crisis Lifeline for follow-up resources."])

t("missing-persons", "NJ AG missing persons directive; federal law (34 U.S.C. 41307)", [
 "Accept missing person reports immediately; there is no waiting period.",
 "Children under 21 must be entered in NCIC without delay (federal law requires within two hours).",
 "Collect a recent photo, description, clothing, phone and social media accounts, vehicle, medical needs, and places the person may go.",
 "Treat high-risk cases urgently: young children, elderly or cognitively impaired persons, medical needs, suspected abduction, or suicide risk.",
 "AMBER Alert requests go through the NJ State Police when criteria are met (abducted child in danger with enough descriptive information).",
 "Search the home and property where the person was last seen, even if family says they already did.",
])

t("admonishments", "Original guidance", [
 "Give warnings in plain language, once clearly, and repeat if needed; note the time and the exact words used.",
 "Trespass notice: tell the person they are not allowed on the property, who authorized the notice, and that returning will lead to a charge (supports 2C:18-3(b)).",
 "Dispersal order: identify yourself, order the crowd to leave, give a direction and reasonable time, and warn of arrest (supports 2C:33-1 and 2C:33-7).",
 "Disorderly conduct warnings: ask the person to stop the specific behavior before charging when safe to do so.",
 "Record warnings on body-worn camera and in your report.",
])

# ---------------- DOMESTIC VIOLENCE ----------------
t("dv-procedures", "NJ AG Domestic Violence Procedures Manual; N.J.S.A. 2C:25-17 et seq.", [
 "Determine whether the parties have a qualifying relationship and whether a predicate offense occurred.",
 "Apply mandatory arrest rules (2C:25-21); otherwise arrest is discretionary with probable cause.",
 "Give the victim written notice of their rights, including the right to seek a temporary restraining order and to file a criminal complaint.",
 "Help the victim apply for a TRO through the court (municipal court after hours).",
 "Ask about and seize weapons as required; seize FPIC and permits with any firearm.",
 "Complete the DV offense report for every incident, even with no arrest.",
 "Check for existing restraining orders in the DV central registry.",
])

# ---------------- OPERATIONS & ICS ----------------
t("ics", "FEMA National Incident Management System / Incident Command System", [
 "The first arriving officer assumes command until relieved, names the incident and sets up an Incident Command Post.",
 "Command staff: Public Information Officer, Safety Officer, Liaison Officer.",
 "General staff sections: Operations, Planning, Logistics, Finance/Administration.",
 "Span of control: 3 to 7 people per supervisor; 5 is optimal.",
 "Unified command is used when several agencies or jurisdictions share responsibility.",
 "Use plain language on the radio, set a staging area, and document transfer of command.",
])

t("terrorism-awareness", "DHS and FBI public guidance", [
 "Watch for pre-attack indicators: surveillance of a target, testing security, acquiring supplies (such as chemicals or weapons), dry runs, and unusual questions about security.",
 "Report suspicious activity based on behavior, not appearance, through your agency's suspicious activity reporting process.",
 "At an explosion or attack scene, consider secondary devices: control the perimeter and stage away from the obvious approaches.",
 "Coordinate with the NJ Regional Operations Intelligence Center and the FBI Joint Terrorism Task Force through your chain of command.",
])

t("peel-principles", "Principles attributed to Sir Robert Peel (1829); public domain", [
 "Police exist to prevent crime and disorder.",
 "Police effectiveness depends on public approval of police actions.",
 "Public cooperation comes from willing respect for the law.",
 "The more force needed, the less public cooperation police receive.",
 "Police earn public favor through impartial service, not by catering to opinion.",
 "Physical force is used only when persuasion and warning are insufficient, and only as much as needed.",
 "Officers are members of the community, paid to do full-time what every citizen has a duty to do.",
 "Police should not take over the powers of the courts.",
 "Success is measured by how little crime and disorder exist, not by how much police activity is visible.",
])

t("radio-pursuits", "NJ AG Vehicular Pursuit Policy (current revision)", [
 "Pursuits are permitted only in limited situations defined by the AG policy, generally for serious violent crimes and when the danger of letting the suspect flee outweighs the danger of the pursuit.",
 "Notify dispatch immediately: unit, location, direction, speed, vehicle description, reason for the pursuit, and number of occupants.",
 "A supervisor must monitor the pursuit and can terminate it at any time.",
 "Limit the number of pursuing units as set by the policy.",
 "Terminate when the risk becomes too great, the suspect is identified for later arrest, or communication is lost.",
], ["Read the current AG policy; it was substantially tightened in recent revisions."])

t("hotlines", "Well-known national and NJ numbers (confirm each before release)", [
 "Emergency: 911.",
 "988 Suicide & Crisis Lifeline: call or text 988.",
 "Poison Control: 1-800-222-1222.",
 "NJ Domestic Violence Hotline: 1-800-572-7233 (1-800-572-SAFE).",
 "NJ child abuse reporting (DCP&P): 1-877-652-2873 (1-877-NJ ABUSE).",
 "National Human Trafficking Hotline: 1-888-373-7888.",
 "National Center for Missing & Exploited Children: 1-800-843-5678.",
 "FBI tips: 1-800-225-5324 (1-800-CALL-FBI).",
 "CHEMTREC (hazardous materials): 1-800-424-9300.",
], ["Add local numbers in My Phone Numbers."])

t("hazmat-erg", "PHMSA Emergency Response Guidebook (current edition)", [
 "Approach from upwind, uphill and upstream; stay back and use binoculars to read placards.",
 "Identify the material by the 4-digit UN/NA number or name, and do not walk into or touch any spill.",
 "Yellow pages: look up by ID number. Blue pages: look up by name. Both point to an orange guide page.",
 "Orange pages: the guide for potential hazards, public safety and emergency response.",
 "Green pages: initial isolation and protective action distances for highlighted materials.",
 "Isolate the area, deny entry, and request fire and hazmat resources; call CHEMTREC for help.",
], ["Keep the current ERG in the vehicle or use the official ERG app."])

# ---------------- MEDICAL ----------------
t("cpr-first-aid", "General public guidance; follow your current CPR/First Aid certification. AHA: heart.org; Red Cross: redcross.org", [
 "Make sure the scene is safe, check responsiveness and breathing, and call for EMS and an AED.",
 "Adult CPR: push hard and fast in the center of the chest, about 2 to 2.4 inches deep, 100 to 120 compressions per minute, allowing full recoil.",
 "If trained and willing, give 2 breaths after every 30 compressions; otherwise give continuous compressions.",
 "Use the AED as soon as it arrives and follow its prompts; minimize pauses in compressions.",
 "Severe bleeding: apply direct pressure; use a tourniquet 2 to 3 inches above the wound on a limb if pressure fails.",
 "Suspected opioid overdose: give naloxone per agency policy, support breathing, and continue CPR if needed.",
 "Choking (responsive adult): abdominal thrusts until the object comes out or the person becomes unresponsive, then start CPR.",
], ["Follow your current CPR/First Aid certification training."])
