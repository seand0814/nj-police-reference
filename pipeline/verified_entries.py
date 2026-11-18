"""Hand-written entries whose substance was confirmed against a public source
during Phase 1 (2026-11-18). All wording is original; nothing is taken from the ebook."""

CS = "https://law.counselstack.com/statute/nj/"
DEA = "https://getsmartaboutdrugs.gov/sites/default/files/2025-03/Drugs-Abuse-2024.pdf"
DEA_CITE = "DEA, Drugs of Abuse: A DEA Resource Guide (2024 ed.)"
SFST_URL = "https://www.nj.gov/lps/hts/downloads/SFST_Procedures.pdf"
SFST_CITE = "NHTSA SFST procedures form, published by NJ Division of Highway Traffic Safety"

V = [
 # ---------------- CRIMINAL LAW ----------------
 dict(id="njsa-2c-12-1a", category="Criminal Law", title="Simple Assault",
  source_type="statute", citation="N.J.S.A. 2C:12-1(a)",
  source_url="https://www.allianceforhope.org/strangulation-legislation/new-jersey/laws/new-jersey-strangulation-law",
  grade_or_penalty="Disorderly persons offense; drops to petty disorderly persons if the fight or scuffle was entered into by mutual consent.",
  key_points=[
   "a(1): tries to cause bodily injury, or causes it purposely, knowingly or recklessly.",
   "a(2): causes bodily injury through negligence while using a deadly weapon.",
   "a(3): uses physical menace to try to make someone fear imminent serious bodily injury.",
   "Bodily injury means physical pain, illness or any impairment of physical condition (N.J.S.A. 2C:11-1(a)).",
  ],
  officer_notes=[
   "Document the injury or the pain the victim describes; pain alone can satisfy bodily injury.",
   "Ask both parties whether the fight was mutual; it changes the grade.",
   "If the victim is a protected class (officer, EMS, health care worker, DV victim and others) review aggravated assault under 2C:12-1(b).",
  ], related=["njsa-2c-12-1b","njsa-2c-25-21"]),

 dict(id="njsa-2c-12-3", category="Criminal Law", title="Terroristic Threats",
  source_type="statute", citation="N.J.S.A. 2C:12-3", source_url=CS+"2C%3A12-3",
  grade_or_penalty="Third degree under (a) or (b). Subsection (a) becomes second degree if committed during a declared national, State or county emergency.",
  key_points=[
   "(a) Threatening any crime of violence aimed at terrorizing someone, forcing an evacuation of a building, assembly place or transit facility, or causing serious public inconvenience.",
   "(b) Threatening to kill someone to put them in imminent fear of death, where the circumstances would reasonably make the victim believe the threat is immediate and likely to be carried out.",
   "Emergency upgrade is strict liability: the State only proves the emergency existed.",
   "Reckless-disregard prosecutions under (a) are limited by State v. Fair (2024): see the related case entry.",
  ],
  officer_notes=[
   "Record the exact words used and how the victim reacted.",
   "For (b), note facts showing the threat seemed immediate and likely (weapon, proximity, history).",
  ], related=["case-state-v-fair-2024","njsa-2c-33-4"]),

 dict(id="njsa-2c-33-4", category="Criminal Law", title="Harassment",
  source_type="statute", citation="N.J.S.A. 2C:33-4", source_url=CS+"2C%3A33-4",
  grade_or_penalty="Petty disorderly persons offense. Fourth degree if the actor was then serving a prison term or on parole/probation for an indictable conviction, or knowingly aimed the conduct at a current or former judge over the judge's public duties.",
  key_points=[
   "Requires a purpose to harass.",
   "(a) Communications that are anonymous, at extremely inconvenient hours, in offensively coarse language, or otherwise likely to annoy or alarm. Venue can be where sent or where received.",
   "(b) Striking, kicking, shoving or other offensive touching, or threatening to.",
   "(c) Any other course of alarming conduct or repeated acts meant to alarm or seriously annoy.",
  ],
  officer_notes=[
   "Capture screenshots, call logs and timestamps for subsection (a) cases.",
   "Check parole/probation status; it can make the offense a crime.",
  ], related=["njsa-2c-33-4-1","njsa-2c-12-3"]),

 dict(id="njsa-2c-33-4-1", category="Criminal Law", title="Cyber-Harassment",
  source_type="statute", citation="N.J.S.A. 2C:33-4.1", source_url=CS+"2C%3A33-4.1",
  grade_or_penalty="Fourth degree. Third degree when an adult 21+ pretends to be a minor to cyber-harass a minor.",
  key_points=[
   "Online communication through any electronic device or social network, made with purpose to harass.",
   "Covers: threatening injury to a person or property; knowingly sending or posting lewd, indecent or obscene material to or about someone, intending emotional harm or fear; threatening any crime against a person or property.",
   "Juveniles under 16 may be ordered, with a parent, into a cyber-harassment program; a parent who ignores that order is a disorderly person.",
  ],
  officer_notes=[
   "Preserve the account, URL and post before it is deleted; request preservation from the platform.",
  ], related=["njsa-2c-33-4"]),

 dict(id="njsa-2c-18-3", category="Criminal Law", title="Criminal Trespass",
  source_type="statute", citation="N.J.S.A. 2C:18-3", source_url=CS+"2C%3A18-3",
  grade_or_penalty="(a) Disorderly persons, or fourth degree in a dwelling, school or school property, utility property, research/power/water/sewage/hazardous-chemical facility, or an airport sterile or operational area. (b) Petty disorderly persons. (c) Fourth degree.",
  key_points=[
   "(a) Unlicensed entry: entering, or secretly remaining in, a structure (or research facility, utility property, airport secure area) knowing you have no right to.",
   "(b) Defiant trespass: entering or staying after notice, given in person, by posting reasonably likely to be seen, or by fencing or an enclosure meant to keep people out.",
   "(c) Peering: looking into a dwelling window or opening, without permission, to invade privacy where an occupant would expect not to be seen.",
   "Defenses: the structure was abandoned; it was open to the public and the actor followed the access conditions; or the actor reasonably believed the owner would allow it.",
  ],
  officer_notes=[
   "For defiant trespass, document how notice was given and by whom.",
  ], related=[]),

 dict(id="njsa-2c-29-1", category="Criminal Law", title="Obstructing Administration of Law",
  source_type="statute", citation="N.J.S.A. 2C:29-1", source_url=CS+"2C%3A29-1",
  grade_or_penalty="Disorderly persons; fourth degree if it obstructs the detection, investigation or prosecution of a crime.",
  key_points=[
   "Acting purposely to obstruct, impair or pervert the administration of law or another government function, or to stop a public servant from performing a lawful official act.",
   "The means must be flight, intimidation, force, violence, physical interference or obstacle, or some independently unlawful act.",
   "Does not cover simply failing to perform a non-official legal duty, or avoiding compliance without affirmative interference.",
  ],
  officer_notes=[
   "Articulate the specific physical act or unlawful means; refusal to talk alone is not enough.",
  ], related=["njsa-2c-29-2"]),

 dict(id="njsa-2c-25-21", category="Domestic Violence", title="DV Arrest, Complaint and Weapon Seizure",
  source_type="statute", citation="N.J.S.A. 2C:25-21",
  source_url="https://www.njcourts.gov/sites/default/files/courts/municipal/legislation/fornjcourtsl2021c358.pdf",
  grade_or_penalty="Procedure statute (no grade).",
  key_points=[
   "Arrest and sign a complaint are MANDATORY when probable cause of DV exists and: the victim shows signs of injury; a warrant is in effect; there is probable cause a served restraining order was violated (2C:29-9); or a weapon (2C:39-1) was involved.",
   "Otherwise, arrest and/or signing a complaint is discretionary when probable cause of DV exists.",
   "Signs of injury are read broadly and include pain or impaired condition; if both parties are hurt, weigh comparative injuries, DV history and other factors to find the primary victim.",
   "A victim who used reasonable force in self-defense may not be arrested or charged for it.",
   "Ask whether weapons are on the premises; seize any weapon that puts the victim at risk of serious bodily injury, and with a firearm also seize the FPIC and handgun purchase permits. Send items to the county prosecutor and inventory them in the DV report.",
  ],
  officer_notes=[
   "If the victim has no copy of the order, confirm it with the issuing agency.",
   "Follow the AG Domestic Violence Procedures Manual for reporting and victim notice.",
  ], related=["njsa-2c-12-1a"]),

 # ---------------- DRUGS (LAW) ----------------
 dict(id="njsa-2c-35-10", category="DWI & Drugs", title="CDS Possession / Under the Influence",
  source_type="statute", citation="N.J.S.A. 2C:35-10",
  source_url="https://lis.njleg.state.nj.us/nxt/gateway.dll/statutes%2F1%2F2777%2F3236",
  grade_or_penalty="a(1) Schedule I-IV: third degree. a(2) Schedule V: fourth degree. a(3) over 6 oz marijuana or over 17 g hashish: fourth degree. a(4) 6 oz or less / 17 g or less: no penalty. a(5) psilocybin 1 oz or less: disorderly persons. (b) and (c): disorderly persons.",
  key_points=[
   "Knowingly or purposely obtaining or possessing (actual or constructive) CDS or an analog without a valid prescription.",
   "Marijuana/hashish odor (fresh or burnt) is NOT reasonable articulable suspicion to search for an a(3)(b) violation.",
   "Use or being under the influence of CDS (not marijuana/hashish) is a DP offense; the specific drug need not be identified if symptoms prove influence.",
   "Failing to voluntarily turn CDS over to the nearest officer is a separate DP offense.",
   "Offenses under a(1)-(3) in a school zone carry at least 100 hours of community service if no prison term.",
  ],
  officer_notes=[
   "Quarterly reporting applies to a(3)(b) violations; follow your agency's UCR process.",
   "Cannabis possession questions: also review 2C:35-10a and current AG cannabis directives.",
  ], related=["njsa-2c-35-24","drug-schedules-federal"]),

 dict(id="njsa-2c-35-24", category="DWI & Drugs", title="Prescription Drugs Outside Original Container",
  source_type="statute", citation="N.J.S.A. 2C:35-24", source_url=CS+"2C%3A35-24",
  grade_or_penalty="Disorderly persons offense.",
  key_points=[
   "Lawfully prescribed CDS must be kept in the container it was dispensed in.",
   "Up to a 10-day supply may be carried in another container if, on an officer's request, the person gives the name and address of the prescriber or dispensing pharmacist.",
  ],
  officer_notes=["Get the prescriber/pharmacy information before charging."],
  related=["njsa-2c-35-10"]),

 # ---------------- DWI ----------------
 dict(id="njsa-39-4-50", category="DWI & Drugs", title="Driving While Intoxicated",
  source_type="statute", citation="N.J.S.A. 39:4-50 (as amended by P.L.2023, c.191)",
  source_url="https://pub.njleg.gov/Bills/2022/PL23/191_.HTM",
  grade_or_penalty="Motor vehicle offense. 1st: $250-$400 (BAC .08-<.10) or $300-$500 (.10+), 12-48 hrs IDRC, up to 30 days jail, interlock (BAC .15+: forfeiture 3 months after interlock install). 2nd: $500-$1,000, 30 days community service, 48 hrs-90 days jail, 1-2 yr forfeiture + interlock. 3rd+: $1,000, 180 days jail (up to 90 may be inpatient rehab), 8 yr forfeiture + interlock.",
  key_points=[
   "Operating a motor vehicle under the influence of alcohol, a narcotic, hallucinogenic or habit-producing drug, or with a BAC of 0.08% or more.",
   "Also applies to an owner or person in control who lets an impaired driver operate.",
   "Drug-impaired first offense: 7 months to 1 year license forfeiture.",
   "P.L.2023, c.191 (approved Dec. 21, 2023) expanded interlock use and added interlock credits.",
  ],
  officer_notes=[
   "Penalties are for court reference; confirm current figures before quoting them to a defendant.",
  ], related=["njsa-39-4-50-4a","sfst-hgn","sfst-walk-turn","sfst-one-leg-stand"]),

 dict(id="njsa-39-4-50-4a", category="DWI & Drugs", title="Refusal to Submit to Breath Test",
  source_type="statute", citation="N.J.S.A. 39:4-50.4a (as amended by P.L.2023, c.191)",
  source_url="https://pub.njleg.gov/Bills/2022/PL23/191_.HTM",
  grade_or_penalty="1st: $300-$500, forfeiture until interlock installed. 2nd: $500-$1,000, 1-2 yr forfeiture + interlock. 3rd+: $1,000, 8 yr forfeiture + interlock. Second and later refusal forfeitures run consecutive to the DWI forfeiture.",
  key_points=[
   "Court must find, by a preponderance: probable cause the person drove or was in actual physical control on a public or quasi-public road while impaired (alcohol, drugs, or cannabis); that the person was arrested, if appropriate; and that the person refused when asked.",
   "Implied consent itself is in N.J.S.A. 39:4-50.2; cite the correct section on the summons.",
  ],
  officer_notes=[
   "Read the AG standard statement exactly as written and document the response.",
  ], related=["njsa-39-4-50"]),

 # ---------------- CASE LAW ----------------
 dict(id="case-state-v-fair-2024", category="Case Law & Legal Terms", title="State v. Fair (N.J. 2024)",
  source_type="case", citation="State v. Fair, N.J. Supreme Court, No. A-20-22, decided Jan. 16, 2024",
  source_url="https://njcourts.gov/system/files/court-opinions/2024/a_20_22.pdf",
  grade_or_penalty="",
  key_points=[
   "Recklessness can support a true-threats prosecution under 2C:12-3(a), but there is also an objective test: a reasonable person in the victim's position would have seen the message as threatening violence.",
   "Subsections (a) and (b) of 2C:12-3 are separate, alternative crimes; a jury must agree unanimously on which one was committed.",
  ],
  officer_notes=["When charging, specify 2C:12-3(a) or (b) rather than 'a and/or b'."],
  related=["njsa-2c-12-3"]),

 # ---------------- SFST ----------------
 dict(id="sfst-hgn", category="DWI & Drugs", title="SFST: Horizontal Gaze Nystagmus",
  source_type="federal_pub", citation=SFST_CITE, source_url=SFST_URL, grade_or_penalty="",
  key_points=[
   "Before testing: remove eyeglasses; check pupil size, equal tracking and resting nystagmus.",
   "Three clues in each eye (six in all): no smooth pursuit; distinct and sustained nystagmus at maximum deviation; nystagmus starting before 45 degrees.",
   "Check for vertical gaze nystagmus as well.",
  ],
  officer_notes=["Follow your current SFST certification training for administration and scoring."],
  related=["sfst-walk-turn","sfst-one-leg-stand","njsa-39-4-50"]),

 dict(id="sfst-walk-turn", category="DWI & Drugs", title="SFST: Walk and Turn",
  source_type="federal_pub", citation=SFST_CITE, source_url=SFST_URL, grade_or_penalty="",
  key_points=[
   "Instruction stance is heel-to-toe on a line; the subject takes nine heel-to-toe steps, turns with a series of small steps, and takes nine steps back, arms down, watching feet and counting aloud.",
   "Confirm the subject understands; repeat only the part they did not understand.",
   "Eight clues: losing balance during instructions; starting too early; stopping while walking; missing heel-to-toe; stepping off the line; raising arms for balance; turning improperly; wrong number of steps.",
  ],
  officer_notes=["Note surface, lighting, footwear and weather in your report."],
  related=["sfst-hgn","sfst-one-leg-stand"]),

 dict(id="sfst-one-leg-stand", category="DWI & Drugs", title="SFST: One Leg Stand",
  source_type="federal_pub", citation=SFST_CITE, source_url=SFST_URL, grade_or_penalty="",
  key_points=[
   "Subject raises either foot about six inches, toe pointed, legs straight, looks at the raised foot and counts aloud by thousands until told to stop.",
   "Four clues: swaying; raising arms for balance; hopping; putting the foot down.",
  ],
  officer_notes=["Record which foot was raised and when each clue occurred."],
  related=["sfst-hgn","sfst-walk-turn"]),

 # ---------------- DRUG RECOGNITION (DEA) ----------------
 dict(id="drug-schedules-federal", category="DWI & Drugs", title="Federal Drug Schedules I-V",
  source_type="federal_pub", citation=DEA_CITE+", pp. 9-10; 21 U.S.C. 812", source_url=DEA, grade_or_penalty="",
  key_points=[
   "I: high abuse potential, no accepted U.S. medical use, not accepted as safe under supervision (e.g., heroin, LSD, marijuana federally).",
   "II: high abuse potential, accepted medical use (possibly restricted), can cause severe dependence (e.g., fentanyl, morphine, methadone, hydrocodone, cocaine, methamphetamine, PCP).",
   "III: lower abuse potential than I-II; moderate/low physical or high psychological dependence (e.g., some barbiturates).",
   "IV: lower than III; limited dependence (e.g., alprazolam, clonazepam, diazepam).",
   "V: lowest; limited dependence relative to IV.",
  ],
  officer_notes=["NJ schedules and grading are in N.J.S.A. 2C:35; federal and state schedules can differ (cannabis is the main example)."],
  related=["njsa-2c-35-10"]),

 dict(id="drug-opioids", category="DWI & Drugs", title="Narcotic Analgesics (Opioids)",
  source_type="federal_pub", citation=DEA_CITE+", pp. 52-54", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Examples: fentanyl, heroin, morphine, hydrocodone, methadone.",
   "Signs: drowsiness or nodding, constricted pupils, slowed breathing, nausea or vomiting, flushing, dry mouth, heavy limbs.",
   "Overdose: slow or shallow breathing, bluish lips/nails/skin, cold clammy skin, stupor, convulsions, coma. Pinpoint pupils plus coma plus breathing depression points to opioid poisoning.",
  ],
  officer_notes=["Treat as a medical emergency: request EMS and follow your agency's naloxone policy."],
  related=["drug-depressants"]),

 dict(id="drug-stimulants", category="DWI & Drugs", title="CNS Stimulants",
  source_type="federal_pub", citation=DEA_CITE+", pp. 65-69", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Examples: cocaine, methamphetamine.",
   "Signs: dilated pupils, raised pulse and blood pressure, restlessness, irritability, anxiety, insomnia, little appetite, fast breathing, overheating.",
   "Heavy or chronic use can bring paranoia, hallucinations and violent behavior; a crash of exhaustion and depression follows use.",
   "Danger signs: irregular heartbeat, very high body temperature, seizures, stroke, cardiac arrest.",
  ],
  officer_notes=["Overheating plus agitation is a medical emergency; request EMS early."],
  related=[]),

 dict(id="drug-depressants", category="DWI & Drugs", title="CNS Depressants",
  source_type="federal_pub", citation=DEA_CITE+", p. 73", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Examples: benzodiazepines such as alprazolam, clonazepam, diazepam; some barbiturates.",
   "Signs: sleepiness, relaxed mood, poor coordination, confusion; sometimes amnesia, irritability or hostility.",
   "Overdose: extreme drowsiness, slowed breathing, coma. Mixing with opioids sharply raises the risk of fatal breathing failure.",
  ],
  officer_notes=["Ask about alcohol or opioid use alongside; combined depression is the main danger."],
  related=["drug-opioids"]),

 dict(id="drug-hallucinogens", category="DWI & Drugs", title="Hallucinogens",
  source_type="federal_pub", citation=DEA_CITE+", pp. 84-86", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Examples: LSD, psilocybin mushrooms.",
   "Signs: distorted sense of time, space and body; mood swings; impaired judgment; dilated pupils, higher pulse and temperature, sweating, tremors (LSD); nausea, weakness and poor coordination (psilocybin).",
   "Possible panic, paranoia or psychosis; LSD flashbacks can occur long after use.",
  ],
  officer_notes=["Lower stimulation, keep the person safe from injury, and request EMS if distressed."],
  related=["drug-dissociatives"]),

 dict(id="drug-dissociatives", category="DWI & Drugs", title="Dissociative Anesthetics (PCP, Ketamine)",
  source_type="federal_pub", citation=DEA_CITE+", pp. 79, 83", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Signs (ketamine): feeling detached or out of control, distorted sight and sound, rapid eye movement, dilated pupils, drooling, tearing, muscle stiffness, possible unresponsiveness.",
   "Severe overdose (PCP or ketamine): breathing depression, seizures, coma, death from respiratory arrest.",
  ],
  officer_notes=["Watch breathing closely for anyone who becomes unresponsive."],
  related=["drug-hallucinogens"]),

 dict(id="drug-cannabis", category="DWI & Drugs", title="Cannabis",
  source_type="federal_pub", citation=DEA_CITE+", pp. 90-92", source_url=DEA, grade_or_penalty="",
  key_points=[
   "Signs: bloodshot eyes, raised pulse, increased appetite, sedation, impaired coordination, poor memory and problem-solving, distorted time perception; anxiety or panic in some users.",
   "No overdose deaths are reported, but emergency visits involving edibles are rising.",
  ],
  officer_notes=["In NJ, odor alone does not justify a search for possession (see 2C:35-10); impaired driving is still a 39:4-50 offense."],
  related=["njsa-2c-35-10","njsa-39-4-50"]),
]

# Original content that needs no external source
SPANISH = dict(id="spanish-field-phrases", category="Spanish", title="Spanish Field Phrases",
 source_type="original", citation="Original phrase list", source_url="", grade_or_penalty="",
 key_points=[
  "Show me your hands. | Muéstreme las manos.",
  "Freeze! | ¡Quieto! / ¡Quieta!",
  "Put your hands on your head. | Ponga las manos sobre la cabeza.",
  "Turn around slowly. | Dese la vuelta despacio.",
  "Get on your knees. | Arrodíllese.",
  "Turn off the engine. | Apague el motor.",
  "Keep your hands on the wheel. | Mantenga las manos en el volante.",
  "Step out of the vehicle. | Salga del vehículo.",
  "Do you have any weapons? | ¿Tiene armas?",
  "Are you hurt? | ¿Está herido? / ¿Está herida?",
  "Do you need an ambulance? | ¿Necesita una ambulancia?",
  "Do you speak English? | ¿Habla inglés?",
  "What is your name? | ¿Cómo se llama?",
  "When were you born? (date) | ¿En qué fecha nació?",
  "Driver's license, registration and insurance, please. | Licencia, registro y seguro, por favor.",
  "Wait here. | Espere aquí.",
  "What is your address? | ¿Cuál es su dirección?",
  "Calm down. | Cálmese.",
  "Who did this? | ¿Quién hizo esto?",
  "Which way did they go? | ¿Hacia dónde se fueron?",
  "Describe the person. | Describa a la persona.",
  "You are under arrest. | Está arrestado. / Está arrestada.",
  "An interpreter is coming. | Viene un intérprete.",
 ],
 officer_notes=[
  "NEEDS REVIEW by a native Spanish speaker before release.",
  "For interviews, statements and Miranda, use a qualified interpreter or language line, not this list.",
 ], related=[])

CONVERSIONS = dict(id="tool-conversions", category="Tools", title="Measurement Conversions",
 source_type="original", citation="Standard unit definitions", source_url="", grade_or_penalty="",
 key_points=[
  "1 inch = 2.54 cm; 1 foot = 0.3048 m; 1 mile = 1.609 km.",
  "1 pound = 453.6 g; 1 ounce (avoirdupois) = 28.35 g; 1 kg = 2.205 lb.",
  "6 oz marijuana is about 170 g (relevant to 2C:35-10 thresholds).",
  "Speed: 1 mph = 1.467 ft/sec; feet per second = mph x 1.467.",
  "Temperature: F = C x 9/5 + 32.",
 ],
 officer_notes=["In the app this becomes an interactive converter."], related=["njsa-2c-35-10"])

V += [SPANISH, CONVERSIONS]
