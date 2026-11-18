"""Writes content/entries/case-*.json: a case law library for NJ officers.
Original summaries and scenarios written 2026-11-18 from general legal knowledge.
NOT yet checked against the opinions; every entry is marked source_verified=false."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "content", "entries")

CASES = []
def C(slug, title, cite, group, holding, scenario, takeaway, nj=""):
    kp = ["Holding: " + holding]
    if nj: kp.append("New Jersey: " + nj)
    CASES.append(dict(slug=slug, title=title, cite=cite, group=group, key_points=kp,
                      officer_notes=["Scenario: " + scenario, "Takeaway: " + takeaway]))

# ---------------- Stops & Reasonable Suspicion ----------------
G = "Stops & Reasonable Suspicion"
C("terry-v-ohio", "Terry v. Ohio (1968)", "Terry v. Ohio, 392 U.S. 1 (1968)", G,
  "Police may briefly stop a person on reasonable, articulable suspicion of criminal activity, and may frisk outer clothing for weapons if they reasonably suspect the person is armed and dangerous.",
  "You watch two men take turns walking past a jewelry store window a dozen times and conferring at the corner. You stop them to ask questions.",
  "Write down the specific facts that made you suspicious; a hunch is not enough.")
C("illinois-v-wardlow", "Illinois v. Wardlow (2000)", "Illinois v. Wardlow, 528 U.S. 119 (2000)", G,
  "Unprovoked, headlong flight on seeing police in a high-crime area can support reasonable suspicion for a stop.",
  "A man in an area known for open-air drug sales sees your marked unit and sprints away. You may stop him to investigate.",
  "Presence in a high-crime area alone is not enough; flight plus location can be.")
C("florida-v-jl", "Florida v. J.L. (2000)", "Florida v. J.L., 529 U.S. 266 (2000)", G,
  "An anonymous tip that a person at a location has a gun, with nothing showing the tipster's reliability or knowledge, does not justify a stop and frisk.",
  "An unknown caller says a young man in a plaid shirt at a bus stop has a gun. You see him, but nothing he does is suspicious.",
  "Corroborate an anonymous tip with your own observations before acting.")
C("navarette-v-california", "Navarette v. California (2014)", "Navarette v. California, 572 U.S. 393 (2014)", G,
  "A 911 caller's eyewitness report that a specific vehicle ran her off the road was reliable enough to justify a stop for suspected drunk driving.",
  "A 911 caller reports a silver pickup with a given plate just forced her onto the shoulder. You locate it minutes later on the same road and stop it.",
  "Contemporaneous, eyewitness 911 reports of dangerous driving carry weight; document the call details.")
C("california-v-hodari-d", "California v. Hodari D. (1991)", "California v. Hodari D., 499 U.S. 621 (1991)", G,
  "Federally, a person who flees is not seized until he submits or is physically restrained, so items he throws while running are not the fruit of a seizure.",
  "A youth runs as you approach and tosses a bag of drugs before you catch him.",
  "In NJ, do not rely on this rule: NJ looks at when a reasonable person would feel not free to leave.",
  nj="Rejected by State v. Tucker, 136 N.J. 158 (1994): a seizure occurs when police conduct would lead a reasonable person to believe they are not free to leave.")
C("state-v-tucker", "State v. Tucker (N.J. 1994)", "State v. Tucker, 136 N.J. 158 (1994)", G,
  "Under the NJ Constitution, a person is seized when an officer's words or actions would make a reasonable person believe they are not free to leave, even if they have not submitted. Flight alone, without reasonable suspicion beforehand, did not justify the chase.",
  "You chase a teen who ran when your car turned the corner, with no other suspicious facts. He drops drugs during the chase.",
  "In NJ the chase can be the seizure; you need reasonable suspicion before you pursue.")
C("state-v-shaw", "State v. Shaw (N.J. 2012)", "State v. Shaw, 213 N.J. 398 (2012)", G,
  "Officers executing a warrant for one person may not detain someone else simply because he is nearby or shares a general characteristic with the wanted person.",
  "Looking for a wanted man described only by race, you stop a different man walking out of the same building.",
  "Detain only people who actually match a specific description or about whom you have independent suspicion.")
C("state-v-nyema", "State v. Nyema (N.J. 2022)", "State v. Nyema, 249 N.J. 509 (2022)", G,
  "A vague description (race and gender of suspects, without more) did not provide reasonable suspicion to stop a vehicle.",
  "After a robbery, dispatch reports two Black men fled. You stop the first car you see with two Black male occupants.",
  "Stops based on a description need more than race and gender; look for clothing, vehicle, direction, timing and other details.")
C("hiibel-v-nevada", "Hiibel v. Sixth Judicial District Court (2004)", "Hiibel v. Sixth Judicial Dist. Court of Nev., 542 U.S. 177 (2004)", G,
  "A state law requiring a person lawfully stopped on reasonable suspicion to state their name did not violate the Fourth or Fifth Amendment.",
  "During a valid Terry stop you ask for the person's name and they refuse.",
  "Whether refusal to give a name is itself an offense depends on state law; check NJ law and your prosecutor's guidance before charging.")
C("florida-v-bostick", "Florida v. Bostick (1991)", "Florida v. Bostick, 501 U.S. 429 (1991)", G,
  "Approaching people and asking questions or for consent is not a seizure if a reasonable person would feel free to decline or end the encounter.",
  "You board a bus at a terminal and politely ask passengers for permission to search their bags, telling them they can refuse.",
  "Keep field inquiries non-coercive: no blocking exits, no demands, no retained ID.")
C("state-v-rosario", "State v. Rosario (N.J. 2017)", "State v. Rosario, 229 N.J. 263 (2017)", G,
  "Pulling in behind a parked car in a driveway and activating overhead lights turned an encounter into an investigative detention that required reasonable suspicion.",
  "You see a woman sitting in a parked car at night, pull your unit behind it and turn on your overheads to check on her.",
  "Lights and blocking a car's exit can create a seizure; have reasonable suspicion or a true welfare-check basis.")

# ---------------- Frisks ----------------
G = "Frisks & Pat-Downs"
C("minnesota-v-dickerson", "Minnesota v. Dickerson (1993)", "Minnesota v. Dickerson, 508 U.S. 366 (1993)", G,
  "During a lawful frisk, an officer may seize an object whose contraband nature is immediately apparent by touch. Squeezing or manipulating an object after determining it is not a weapon exceeds the frisk.",
  "During a pat-down you feel a small lump in a jacket pocket. It is clearly not a weapon, so you roll it between your fingers to figure out what it is.",
  "Once you know it's not a weapon, stop. Seize only if it is immediately recognizable as contraband.")
C("arizona-v-johnson", "Arizona v. Johnson (2009)", "Arizona v. Johnson, 555 U.S. 323 (2009)", G,
  "During a lawful traffic stop, an officer may frisk a passenger if there is reasonable suspicion the passenger is armed and dangerous; suspicion of other crime by the passenger is not required.",
  "A passenger in a stopped car wears gang colors, has a police scanner and says he recently left prison for burglary. You frisk him for weapons.",
  "Articulate the armed-and-dangerous facts specific to that passenger.")

# ---------------- Motor Vehicle Stops ----------------
G = "Motor Vehicle Stops"
C("whren-v-us", "Whren v. United States (1996)", "Whren v. United States, 517 U.S. 806 (1996)", G,
  "A traffic stop supported by probable cause of a violation is reasonable regardless of the officer's actual motive.",
  "You stop a car for failing to signal a turn; you also suspect drug activity.",
  "The violation must be real and documented. Bias-based policing is still prohibited by NJ AG directives.")
C("delaware-v-prouse", "Delaware v. Prouse (1979)", "Delaware v. Prouse, 440 U.S. 648 (1979)", G,
  "Random stops to check a driver's license and registration, without suspicion or a neutral checkpoint plan, are unconstitutional.",
  "On a slow night you pick cars at random to check licenses.",
  "Every stop needs suspicion of a violation or a lawful checkpoint plan.")
C("michigan-v-sitz", "Michigan Dept. of State Police v. Sitz (1990)", "Michigan Dep't of State Police v. Sitz, 496 U.S. 444 (1990)", G,
  "Properly run sobriety checkpoints, stopping all vehicles under a neutral plan for a brief period, are constitutional.",
  "Your agency sets up a DWI checkpoint with supervisory approval, advance notice and stops every car.",
  "Follow your agency's checkpoint plan exactly; discretion by individual officers undermines it.")
C("pennsylvania-v-mimms", "Pennsylvania v. Mimms (1977)", "Pennsylvania v. Mimms, 434 U.S. 106 (1977)", G,
  "During a lawful traffic stop, the officer may order the driver out of the vehicle without additional suspicion.",
  "You stop a car on a busy highway and ask the driver to step to the shoulder for safety.",
  "Driver exit orders are allowed; passengers are treated differently in NJ (State v. Smith).")
C("maryland-v-wilson", "Maryland v. Wilson (1997)", "Maryland v. Wilson, 519 U.S. 408 (1997)", G,
  "Federally, officers may order passengers out of a lawfully stopped car without further justification.",
  "During a stop you want the front passenger out of the car.",
  "In NJ, apply State v. Smith instead.",
  nj="State v. Smith, 134 N.J. 599 (1994) requires specific facts creating a heightened awareness of danger before ordering a passenger out.")
C("state-v-smith-1994", "State v. Smith (N.J. 1994)", "State v. Smith, 134 N.J. 599 (1994)", G,
  "An officer may order a passenger out of a stopped vehicle only with specific and articulable facts that would warrant heightened caution.",
  "During a nighttime stop the passenger keeps reaching under the seat after being told to keep hands visible. You order him out.",
  "Document the facts that raised your concern about the passenger.")
C("brendlin-v-california", "Brendlin v. California (2007)", "Brendlin v. California, 551 U.S. 249 (2007)", G,
  "Passengers are seized during a traffic stop and may challenge the stop's legality.",
  "A stop without a valid reason leads to drugs found on a passenger.",
  "An unlawful stop taints evidence against every occupant.")
C("rodriguez-v-us", "Rodriguez v. United States (2015)", "Rodriguez v. United States, 575 U.S. 348 (2015)", G,
  "Police may not extend a completed traffic stop, even briefly, to conduct a dog sniff without reasonable suspicion.",
  "You finish writing a warning, then hold the driver seven minutes for a K-9 unit with no new suspicion.",
  "Once the stop's mission is complete, release the driver unless you have independent reasonable suspicion.")
C("state-v-dunbar", "State v. Dunbar (N.J. 2017)", "State v. Dunbar, 229 N.J. 521 (2017)", G,
  "NJ adopted Rodriguez: a canine sniff may not prolong a stop beyond its mission without independent reasonable suspicion.",
  "During a stop you delay checking the driver's license so the dog can arrive.",
  "Don't slow-walk the stop's tasks to buy time for a K-9.")
C("illinois-v-caballes", "Illinois v. Caballes (2005)", "Illinois v. Caballes, 543 U.S. 405 (2005)", G,
  "A dog sniff of a car's exterior during a lawful stop, not extending it, is not a search.",
  "A K-9 unit already on scene walks around the car while you write the summons.",
  "The sniff is fine only if it does not add time to the stop.")
C("heien-v-north-carolina", "Heien v. North Carolina (2014)", "Heien v. North Carolina, 574 U.S. 54 (2014)", G,
  "A reasonable mistake of law by an officer can still support reasonable suspicion for a stop.",
  "You stop a car with one broken brake light, reasonably believing the law requires two working lights.",
  "Know the actual vehicle code; NJ courts look closely at whether a mistake was objectively reasonable.")
C("state-v-scriven", "State v. Scriven (N.J. 2016)", "State v. Scriven, 226 N.J. 20 (2016)", G,
  "Driving with high beams on is not a violation of the high-beam statute unless there is oncoming traffic; a stop on that basis was invalid.",
  "You stop a car on an empty road at night because its high beams were on.",
  "Make sure the conduct you saw actually violates the statute's terms.")

# ---------------- Vehicle Searches ----------------
G = "Vehicle Searches"
C("carroll-v-us", "Carroll v. United States (1925)", "Carroll v. United States, 267 U.S. 132 (1925)", G,
  "The automobile exception: police may search a vehicle without a warrant when they have probable cause it contains contraband or evidence.",
  "Federal officers with probable cause that a car is carrying bootleg liquor search it on the highway.",
  "In NJ, the automobile exception has extra limits; see State v. Witt.")
C("state-v-witt", "State v. Witt (N.J. 2015)", "State v. Witt, 223 N.J. 409 (2015)", G,
  "NJ allows a warrantless on-scene vehicle search when probable cause arises from unforeseeable and spontaneous circumstances. If the car is towed and impounded, get a warrant.",
  "During a stop for a traffic violation you see a handgun's grip under the seat. You search the car at the roadside.",
  "Search at the scene or get a warrant; don't tow first and search later without one.")
C("arizona-v-gant", "Arizona v. Gant (2009)", "Arizona v. Gant, 556 U.S. 332 (2009)", G,
  "Police may search a vehicle incident to a recent occupant's arrest only if the arrestee is unsecured and within reach of the passenger area, or it is reasonable to believe evidence of the arrest offense is in the vehicle.",
  "You arrest a driver for driving while suspended, handcuff him and place him in your car.",
  "A secured arrestee for a suspended license usually means no search incident to arrest of the car.")

# ---------------- Search Incident to Arrest ----------------
G = "Search Incident to Arrest"
C("chimel-v-california", "Chimel v. California (1969)", "Chimel v. California, 395 U.S. 752 (1969)", G,
  "A search incident to arrest is limited to the arrestee's person and the area within immediate control.",
  "After arresting a man in his living room, officers search the entire house.",
  "Search the person and reachable area; anything beyond needs a warrant or another exception.")
C("us-v-robinson", "United States v. Robinson (1973)", "United States v. Robinson, 414 U.S. 218 (1973)", G,
  "After a lawful custodial arrest, officers may fully search the arrestee's person without additional justification.",
  "You arrest a driver on a warrant and find drugs in a cigarette pack in his pocket.",
  "Applies to custodial arrests, not to summonses (Knowles v. Iowa).")
C("knowles-v-iowa", "Knowles v. Iowa (1998)", "Knowles v. Iowa, 525 U.S. 113 (1998)", G,
  "Issuing a citation, instead of making a custodial arrest, does not authorize a full search of the car or person.",
  "You issue a speeding ticket and then search the car incident to the citation.",
  "No arrest, no search incident to arrest.")
C("maryland-v-buie", "Maryland v. Buie (1990)", "Maryland v. Buie, 494 U.S. 325 (1990)", G,
  "During an in-home arrest, officers may make a quick protective sweep of spaces adjoining the arrest location, and of other areas if they have reasonable suspicion someone dangerous is there.",
  "Arresting a robbery suspect in his basement, you glance into the adjoining room where a partner could hide.",
  "A sweep is a cursory visual check for people, not a search for evidence.")

# ---------------- Homes, Exigency & Emergency Aid ----------------
G = "Homes, Exigency & Emergency Aid"
C("payton-v-ny", "Payton v. New York (1980)", "Payton v. New York, 445 U.S. 573 (1980)", G,
  "Absent exigent circumstances or consent, police need an arrest warrant to enter a suspect's home to make a routine felony arrest.",
  "You have probable cause for an assault arrest and the suspect is home. You knock, he won't come out.",
  "Get a warrant unless consent or a true exigency exists.")
C("steagald-v-us", "Steagald v. United States (1981)", "Steagald v. United States, 451 U.S. 204 (1981)", G,
  "An arrest warrant does not authorize entry into a third party's home to look for the suspect; a search warrant is needed absent consent or exigency.",
  "You have an arrest warrant for a man you think is staying at his friend's apartment.",
  "Third-party homes need a search warrant.")
C("brigham-city-v-stuart", "Brigham City v. Stuart (2006)", "Brigham City v. Stuart, 547 U.S. 398 (2006)", G,
  "Officers may enter a home without a warrant when they have an objectively reasonable basis to believe an occupant is seriously injured or imminently threatened.",
  "Through a window you see a fight in a kitchen and a teen punch an adult, who spits blood.",
  "Document what you saw or heard that showed an emergency.",
  nj="See State v. Edmonds, 211 N.J. 117 (2012): the emergency-aid entry needs an objectively reasonable basis and the scope is limited to the emergency.")
C("state-v-edmonds", "State v. Edmonds (N.J. 2012)", "State v. Edmonds, 211 N.J. 117 (2012)", G,
  "Emergency-aid entry requires an objectively reasonable basis to believe an emergency requires immediate help, and the search must be limited to that purpose. Once the person is found safe, the justification ends.",
  "A 911 hang-up leads you to a home where the caller answers the door calm and uninjured, but you insist on searching every room.",
  "Confirm the emergency, address it, and stop.")
C("kentucky-v-king", "Kentucky v. King (2011)", "Kentucky v. King, 563 U.S. 452 (2011)", G,
  "The exigency of preventing evidence destruction can justify warrantless entry, as long as police did not create the exigency by violating or threatening to violate the Fourth Amendment.",
  "You knock on an apartment door after smelling marijuana, announce 'Police', then hear movement consistent with evidence being destroyed.",
  "Lawful knocking is OK; threatening to force entry without a basis is not. NJ courts review this closely.")
C("lange-v-california", "Lange v. California (2021)", "Lange v. California, 594 U.S. 295 (2021)", G,
  "Pursuit of a fleeing misdemeanor suspect does not automatically justify a warrantless home entry; it depends on the facts of the case.",
  "A driver ignores your lights for a noise violation, pulls into his garage, and you follow him in.",
  "Weigh the seriousness and true urgency before entering a home in a minor-offense pursuit.")
C("caniglia-v-strom", "Caniglia v. Strom (2021)", "Caniglia v. Strom, 593 U.S. 194 (2021)", G,
  "The community caretaking exception for vehicles does not extend to warrantless entry and seizures in the home.",
  "After a welfare check, you enter a man's home while he is away at the hospital and take his firearms 'for safety'.",
  "In the home rely on a warrant, consent or a real emergency, not community caretaking.")
C("welsh-v-wisconsin", "Welsh v. Wisconsin (1984)", "Welsh v. Wisconsin, 466 U.S. 740 (1984)", G,
  "The gravity of the offense matters to exigency; a warrantless night entry to arrest for a minor, non-jailable traffic offense was unreasonable.",
  "You go into a home to arrest a driver for a minor violation before alcohol in his blood dissipates.",
  "Minor offenses rarely justify warrantless home entry.")

# ---------------- Consent ----------------
G = "Consent Searches"
C("schneckloth-v-bustamonte", "Schneckloth v. Bustamonte (1973)", "Schneckloth v. Bustamonte, 412 U.S. 218 (1973)", G,
  "Federally, consent must be voluntary under the totality of the circumstances; knowledge of the right to refuse is a factor but not required.",
  "During a stop you ask 'Mind if I look in the trunk?' and the driver says sure.",
  "NJ is stricter; see State v. Johnson and State v. Carty.",
  nj="State v. Johnson, 68 N.J. 349 (1975) requires proof that the person knew they could refuse.")
C("state-v-johnson-1975", "State v. Johnson (N.J. 1975)", "State v. Johnson, 68 N.J. 349 (1975)", G,
  "Under the NJ Constitution, the State must show the person giving consent knew of the right to refuse.",
  "You ask a homeowner for consent to search without telling him he can say no.",
  "Always advise the right to refuse and document it, ideally on a consent form and BWC.")
C("state-v-carty", "State v. Carty (N.J. 2002)", "State v. Carty, 170 N.J. 632 (2002)", G,
  "Before asking for consent to search a lawfully stopped motor vehicle, the officer must have reasonable and articulable suspicion that the search will reveal evidence of a crime.",
  "A routine speeding stop with nothing suspicious, and you ask to search the car.",
  "No reasonable suspicion, no consent request on a vehicle stop.")
C("illinois-v-rodriguez", "Illinois v. Rodriguez (1990)", "Illinois v. Rodriguez, 497 U.S. 177 (1990)", G,
  "A search based on consent from someone officers reasonably but mistakenly believe has authority over the premises can be valid (apparent authority).",
  "A woman with a key says she lives there and lets you in; you later learn she moved out weeks ago.",
  "Ask questions to confirm the person's authority; unreasonable reliance fails.")
C("georgia-v-randolph", "Georgia v. Randolph (2006)", "Georgia v. Randolph, 547 U.S. 103 (2006)", G,
  "A physically present co-occupant's express refusal overrides another occupant's consent to search a shared home.",
  "A wife consents to a search, but her husband, standing at the door, says no.",
  "A present, objecting occupant's 'no' controls.")

# ---------------- Plain View, Dogs & Technology ----------------
G = "Plain View, Dogs & Technology"
C("horton-v-california", "Horton v. California (1990)", "Horton v. California, 496 U.S. 128 (1990)", G,
  "Plain view seizure is allowed when the officer is lawfully in the viewing location, the item's incriminating nature is immediately apparent, and the officer has lawful access; discovery need not be inadvertent.",
  "While lawfully executing a warrant for stolen jewelry, you see a handgun used in the robbery on a dresser.",
  "NJ adopted this approach in State v. Gonzales, 227 N.J. 77 (2016).")
C("florida-v-jardines", "Florida v. Jardines (2013)", "Florida v. Jardines, 569 U.S. 1 (2013)", G,
  "Bringing a drug-sniffing dog onto a home's front porch to investigate is a search requiring a warrant.",
  "On a tip, you walk a K-9 to the front door of a house and the dog alerts.",
  "The home's curtilage is protected; use the tip to build probable cause for a warrant.")
C("kyllo-v-us", "Kyllo v. United States (2001)", "Kyllo v. United States, 533 U.S. 27 (2001)", G,
  "Using sense-enhancing technology not in general public use to learn details inside a home is a search.",
  "You scan a house with a thermal imager to look for grow lights.",
  "Get a warrant before using such technology on a home.")
C("california-v-greenwood", "California v. Greenwood (1988)", "California v. Greenwood, 486 U.S. 35 (1988)", G,
  "Federally, there is no expectation of privacy in trash left at the curb for collection.",
  "You collect a suspect's garbage bags from the curb.",
  "NJ requires reasonable suspicion first.",
  nj="State v. Hempele, 120 N.J. 182 (1990) recognizes a privacy interest in curbside trash; police need reasonable suspicion to search it.")

# ---------------- Phones, Data & Privacy ----------------
G = "Phones, Data & Privacy"
C("riley-v-california", "Riley v. California (2014)", "Riley v. California, 573 U.S. 373 (2014)", G,
  "Police generally must get a warrant before searching the digital contents of a cell phone seized during an arrest.",
  "You arrest a man and want to scroll through his text messages at the scene.",
  "Secure the phone and get a warrant; exigencies are rare and must be documented.")
C("carpenter-v-us", "Carpenter v. United States (2018)", "Carpenter v. United States, 585 U.S. 296 (2018)", G,
  "Acquiring historical cell-site location records generally requires a warrant.",
  "You want a suspect's location history for the past two weeks from his carrier.",
  "Use a warrant for location history.",
  nj="State v. Earls, 214 N.J. 564 (2013) already required a warrant for cell phone location information under the NJ Constitution.")
C("state-v-earls", "State v. Earls (N.J. 2013)", "State v. Earls, 214 N.J. 564 (2013)", G,
  "Under the NJ Constitution, police need a warrant (or an exception such as exigency) to obtain cell phone location information from a provider.",
  "Looking for a burglary suspect, you ask the carrier to ping his phone without a warrant or emergency.",
  "Location data requires a warrant unless a real emergency exists.")
C("state-v-andrews", "State v. Andrews (N.J. 2020)", "State v. Andrews, 243 N.J. 447 (2020)", G,
  "A court may compel a defendant to disclose phone passcodes when a warrant authorizes the search and the State shows it already knows the passcodes exist, the defendant possesses them and they are authentic (foregone conclusion).",
  "With a warrant for two phones, the prosecutor seeks an order requiring the defendant to unlock them.",
  "Work with the prosecutor; this is a court process, not a roadside demand.")

# ---------------- DWI ----------------
G = "DWI & Chemical Tests"
C("missouri-v-mcneely", "Missouri v. McNeely (2013)", "Missouri v. McNeely, 569 U.S. 141 (2013)", G,
  "The natural dissipation of alcohol does not automatically create an exigency for a warrantless blood draw; exigency is judged case by case.",
  "In a routine DWI arrest with a judge available, you want blood drawn without a warrant.",
  "Seek a warrant for blood unless specific facts create a real emergency.")
C("birchfield-v-north-dakota", "Birchfield v. North Dakota (2016)", "Birchfield v. North Dakota, 579 U.S. 438 (2016)", G,
  "Breath tests may be required as a search incident to a lawful DWI arrest; blood tests require a warrant or consent.",
  "After a DWI arrest, you require a breath test at headquarters.",
  "Breath is fine incident to arrest; blood needs a warrant or a valid exception.")
C("mitchell-v-wisconsin", "Mitchell v. Wisconsin (2019)", "Mitchell v. Wisconsin, 139 S. Ct. 2525 (2019)", G,
  "When a DWI suspect is unconscious and must go to the hospital, the exigent circumstances exception will almost always allow a warrantless blood draw.",
  "A suspected impaired driver is unconscious after a crash and is taken to the ER.",
  "Document the medical condition and why a breath test was impossible.")
C("state-v-chun", "State v. Chun (N.J. 2008)", "State v. Chun, 194 N.J. 54 (2008)", G,
  "Upheld the Alcotest as scientifically reliable, subject to conditions, including a 20-minute observation period before testing.",
  "Your DWI subject burps five minutes into the observation period.",
  "Restart the 20-minute observation and document it.")

# ---------------- Interrogation & Miranda ----------------
G = "Interrogation & Miranda"
C("miranda-v-arizona", "Miranda v. Arizona (1966)", "Miranda v. Arizona, 384 U.S. 436 (1966)", G,
  "Before custodial interrogation, a suspect must be warned of the right to remain silent, that statements can be used against them, and the right to an attorney (appointed if needed).",
  "You arrest a burglary suspect and, in the patrol car, ask him where the stolen items are.",
  "Custody plus questioning means warnings first.")
C("rhode-island-v-innis", "Rhode Island v. Innis (1980)", "Rhode Island v. Innis, 446 U.S. 291 (1980)", G,
  "Interrogation includes express questioning and its functional equivalent: words or actions police should know are reasonably likely to draw an incriminating response.",
  "Transporting an arrestee who invoked counsel, two officers talk about how terrible it would be if a child found the missing shotgun.",
  "After an invocation, don't make comments designed to get the suspect talking.")
C("edwards-v-arizona", "Edwards v. Arizona (1981)", "Edwards v. Arizona, 451 U.S. 477 (1981)", G,
  "Once a suspect invokes the right to counsel, police may not question him further until counsel is present, unless the suspect himself starts the conversation.",
  "A suspect says 'I want a lawyer.' An hour later detectives return to ask if he has changed his mind.",
  "Stop and do not reinitiate.")
C("maryland-v-shatzer", "Maryland v. Shatzer (2010)", "Maryland v. Shatzer, 559 U.S. 98 (2010)", G,
  "The Edwards bar on reinterrogation ends after a break in custody of at least 14 days.",
  "A suspect who invoked counsel was released; three weeks later investigators approach him again with fresh warnings.",
  "Track invocation dates and custody status carefully.")
C("berghuis-v-thompkins", "Berghuis v. Thompkins (2010)", "Berghuis v. Thompkins, 560 U.S. 370 (2010)", G,
  "Federally, a suspect must invoke the right to silence unambiguously; remaining mostly silent is not an invocation.",
  "A suspect sits silent for most of a long interview, then answers one question.",
  "NJ is more protective; treat ambiguous statements as a cue to stop and clarify.",
  nj="NJ courts require officers to scrupulously honor any indication, even ambiguous, that a suspect wishes to stop; clarify before continuing.")
C("ny-v-quarles", "New York v. Quarles (1984)", "New York v. Quarles, 467 U.S. 649 (1984)", G,
  "A public safety exception allows questions reasonably prompted by an immediate threat to public safety before Miranda warnings.",
  "You catch an armed rape suspect in a supermarket wearing an empty holster and ask 'Where's the gun?'",
  "Limit pre-Miranda questions to the safety threat itself.")
C("jdb-v-north-carolina", "J.D.B. v. North Carolina (2011)", "J.D.B. v. North Carolina, 564 U.S. 261 (2011)", G,
  "A child's age, when known or objectively apparent, is relevant to whether he is in custody for Miranda purposes.",
  "You question a 13-year-old in a closed school conference room about thefts.",
  "With juveniles, assume custody sooner and follow juvenile interrogation rules, including parent notification policies.")
C("state-v-oneill", "State v. O'Neill (N.J. 2007)", "State v. O'Neill, 193 N.J. 148 (2007)", G,
  "Question-first, warn-later interrogation is prohibited in NJ; statements given after midstream warnings are generally inadmissible when the earlier unwarned questioning was substantial.",
  "You question a suspect for 20 minutes without warnings, then read Miranda and have him repeat what he said.",
  "Warn before you question.")

# ---------------- Use of Force ----------------
G = "Use of Force"
C("graham-v-connor", "Graham v. Connor (1989)", "Graham v. Connor, 490 U.S. 386 (1989)", G,
  "Force claims are judged by objective reasonableness from the perspective of a reasonable officer on the scene, considering the severity of the crime, the immediate threat, and active resistance or flight.",
  "A diabetic man's erratic behavior leads officers to handcuff him forcefully while investigating a possible robbery.",
  "Articulate each Graham factor in your report; NJ's AG policy adds stricter limits.")
C("tennessee-v-garner", "Tennessee v. Garner (1985)", "Tennessee v. Garner, 471 U.S. 1 (1985)", G,
  "Deadly force may not be used to stop a fleeing suspect unless the officer has probable cause the suspect poses a significant threat of death or serious physical injury.",
  "An unarmed burglar climbs a fence to escape.",
  "Flight alone never justifies deadly force; the NJ AG policy is stricter still.")
C("scott-v-harris", "Scott v. Harris (2007)", "Scott v. Harris, 550 U.S. 372 (2007)", G,
  "An officer's attempt to end a dangerous high-speed chase that threatens bystanders, even at risk of serious injury to the fleeing driver, can be reasonable.",
  "A driver leads police on a reckless chase at high speed through traffic, and an officer bumps his car to end it.",
  "Follow the NJ AG Vehicular Pursuit Policy, which sharply limits pursuits and vehicle contact.")
C("torres-v-madrid", "Torres v. Madrid (2021)", "Torres v. Madrid, 592 U.S. 306 (2021)", G,
  "Applying physical force to a person's body with intent to restrain is a seizure, even if the person escapes.",
  "Officers shoot at a driver who flees and gets away.",
  "Any use of force on a person can be a seizure that must be reasonable.")
C("barnes-v-felix", "Barnes v. Felix (2025)", "Barnes v. Felix, 605 U.S. ___ (2025)", G,
  "Rejected the 'moment of threat' approach; courts must consider the totality of the circumstances, including events leading up to the use of force.",
  "An officer jumps on a slowly moving car's doorsill during a traffic stop and fires.",
  "Your decisions leading up to force are part of the reasonableness review; de-escalate early.")

# ---------------- Evidence, Exclusion & Identification ----------------
G = "Evidence, Exclusion & ID"
C("mapp-v-ohio", "Mapp v. Ohio (1961)", "Mapp v. Ohio, 367 U.S. 643 (1961)", G,
  "Evidence obtained through an unconstitutional search is inadmissible in state court.",
  "Officers force their way into a home without a warrant and find obscene materials.",
  "A bad search can lose the whole case.")
C("wong-sun-v-us", "Wong Sun v. United States (1963)", "Wong Sun v. United States, 371 U.S. 471 (1963)", G,
  "Evidence derived from an illegal search or arrest ('fruit of the poisonous tree') is excluded unless an exception applies.",
  "An unlawful arrest leads to a statement that leads to drugs at another location.",
  "Legal errors early in a case spread to everything that follows.")
C("nix-v-williams", "Nix v. Williams (1984)", "Nix v. Williams, 467 U.S. 431 (1984)", G,
  "Evidence that would inevitably have been discovered by lawful means is admissible despite an earlier illegality.",
  "A search team was minutes away from the body's location when the suspect led police there after an improper interrogation.",
  "NJ applies inevitable discovery with a higher (clear and convincing) proof standard.")
C("utah-v-strieff", "Utah v. Strieff (2016)", "Utah v. Strieff, 579 U.S. 232 (2016)", G,
  "Discovering a valid, pre-existing arrest warrant during an unlawful stop can attenuate the connection to evidence found in a search incident to arrest.",
  "After an unjustified stop, you discover a warrant, arrest the man and find drugs.",
  "Don't rely on this; make lawful stops. NJ applies its own attenuation analysis.")
C("state-v-novembrino", "State v. Novembrino (N.J. 1987)", "State v. Novembrino, 105 N.J. 95 (1987)", G,
  "NJ does not recognize a good-faith exception to the exclusionary rule.",
  "A judge signs a warrant that later proves to lack probable cause; you relied on it in good faith.",
  "Write strong, detailed affidavits; good faith won't save a weak warrant in NJ.")
C("state-v-henderson", "State v. Henderson (N.J. 2011)", "State v. Henderson, 208 N.J. 208 (2011)", G,
  "Revised NJ's approach to eyewitness identification based on scientific research; suggestive procedures (such as lack of double-blind administration, poor instructions) are scrutinized.",
  "You show a victim a photo array yourself, knowing which photo is the suspect, and say 'Take your time, he's in there.'",
  "Follow the AG eyewitness identification procedures: blind administration, neutral instructions, record confidence.")
C("brady-v-maryland", "Brady v. Maryland (1963)", "Brady v. Maryland, 373 U.S. 83 (1963)", G,
  "Prosecutors must disclose evidence favorable to the defense that is material to guilt or punishment; Giglio v. United States (1972) extends this to impeachment evidence such as officer credibility issues.",
  "A witness tells you the suspect wasn't the shooter, but it doesn't make your report.",
  "Document and forward everything, including information that helps the defense.")

FAIR = "case-state-v-fair-2024"

for c in CASES:
    i = "case-" + c["slug"]
    e = dict(id=i, category="Case Law & Legal Terms", title=c["title"], source_type="case", citation=c["cite"],
             source_url="", grade_or_penalty="", key_points=c["key_points"], officer_notes=c["officer_notes"],
             related=[], status="DRAFT", source_verified=False, grade_review=False, last_verified=None, group=c["group"])
    json.dump(e, open(os.path.join(OUT, i + ".json"), "w", encoding="utf8"), ensure_ascii=False, indent=2)

# cross-link pairs
pairs = [("maryland-v-wilson", "state-v-smith-1994"), ("california-v-hodari-d", "state-v-tucker"), ("rodriguez-v-us", "state-v-dunbar"),
         ("schneckloth-v-bustamonte", "state-v-johnson-1975"), ("state-v-johnson-1975", "state-v-carty"), ("carroll-v-us", "state-v-witt"),
         ("brigham-city-v-stuart", "state-v-edmonds"), ("carpenter-v-us", "state-v-earls"), ("illinois-v-caballes", "rodriguez-v-us"),
         ("miranda-v-arizona", "state-v-oneill"), ("edwards-v-arizona", "maryland-v-shatzer"), ("graham-v-connor", "barnes-v-felix"),
         ("mapp-v-ohio", "state-v-novembrino"), ("missouri-v-mcneely", "birchfield-v-north-dakota"), ("terry-v-ohio", "minnesota-v-dickerson")]
for a, b in pairs:
    for x, y in ((a, b), (b, a)):
        p = os.path.join(OUT, f"case-{x}.json"); d = json.load(open(p))
        if f"case-{y}" not in d["related"]: d["related"].append(f"case-{y}")
        json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)

# regroup the older case-law entries
for i, g in [("case-uof", "Overviews"), ("case-rs-pc", "Overviews"), ("case-searches", "Overviews"), ("miranda", "Interrogation & Miranda"),
             (FAIR, "Threats & Speech"), ("us-constitution", "Constitution & Terms"), ("legal-terms", "Constitution & Terms")]:
    p = os.path.join(OUT, i + ".json"); d = json.load(open(p)); d["group"] = g
    json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)

print(len(CASES), "cases written")
