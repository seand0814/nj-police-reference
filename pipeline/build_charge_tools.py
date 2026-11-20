"""Writes the "Which charge fits?" go-bys (content/checklists/which-*.json) and the
side-by-side charge comparisons (content/compare/*.json).

Original plain-language content written 2026-11-19 from the statutes' structure.
Not yet verified against official sources; the app labels it that way.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHECK = os.path.join(ROOT, "content", "checklists")
COMP = os.path.join(ROOT, "content", "compare")
os.makedirs(COMP, exist_ok=True)

NOTE = ("Helps you find the right statute to read. It does not replace the statute, your prosecutor's "
        "guidance or department policy. Not yet verified against official sources.")


def Q(q, yes, no, help=""):
    d = {"q": q, "yes": yes, "no": no}
    if help:
        d["help"] = help
    return d


def R(result, tone, points, link=""):
    d = {"result": result, "tone": tone, "points": points}
    if link:
        d["link"] = link
    return d


def flow(id, title, summary, start, nodes):
    return {"id": id, "kind": "flow", "title": title, "sections": ["checklists", "criminal-code"],
            "summary": summary, "note": NOTE, "start": start, "nodes": nodes}


BI = "Bodily injury means physical pain, illness or any impairment of physical condition."
SBI = ("Serious bodily injury: creates a substantial risk of death, or causes serious permanent disfigurement "
       "or long-lasting loss or impairment of a body part or organ.")
SIG = "Significant bodily injury: temporary loss of the function of a body part or organ, or temporary loss of one of the five senses."

FLOWS = [
    flow("which-assault", "Which Assault Charge Fits?",
         "Simple vs. aggravated assault, one question at a time.", "sbi", {
             "sbi": Q("Did the suspect cause serious bodily injury, or try to?", "r_b1", "strang", SBI),
             "strang": Q("Was a domestic violence victim strangled, or did the suspect try to strangle them?", "r_b13", "weapon",
                         "Impeding normal breathing or blood circulation by pressure on the throat or neck, or blocking the nose or mouth."),
             "weapon": Q("Was a deadly weapon used to cause, or try to cause, bodily injury?", "w_mental", "point",
                         "Anything used or meant to be used in a way that can cause death or serious bodily injury, including an object used that way."),
             "w_mental": Q("Did the suspect act purposely or knowingly (not just carelessly)?", "r_b2", "r_b3"),
             "point": Q("Did the suspect point a firearm at or toward someone, loaded or not?", "r_b4", "sig"),
             "sig": Q("Did the suspect cause significant bodily injury, or try to?", "r_b7", "prot", SIG),
             "prot": Q("Was the victim a protected person doing their job?", "prot_inj", "bi",
                       "Police, firefighters, EMS, health care workers, school employees, transit operators, judges, DCP&P workers and others listed in 2C:12-1b(5)."),
             "prot_inj": Q("Did the protected victim suffer bodily injury?", "r_b5_3", "r_b5_4", BI),
             "bi": Q("Did the suspect cause bodily injury, try to, or use a physical threat to make someone fear imminent serious bodily injury?", "mutual", "r_none", BI),
             "mutual": Q("Was it a fight or scuffle both sides entered into by mutual consent?", "r_pdp", "r_dp"),
             "r_b1": R("Aggravated assault 2C:12-1b(1): 2nd degree", "red", [
                 "Document the injury: hospital, diagnosis, photos, and how long the victim is expected to be impaired.",
                 "If the victim is a protected person, note it; it still matters for bail and sentencing.",
                 "Domestic relationship? Run the mandatory arrest go-by too."], "/entry/njsa-2c-12-1b"),
             "r_b13": R("Aggravated assault 2C:12-1b(13): 2nd degree", "red", [
                 "Look for neck marks, petechiae, voice changes, trouble swallowing; symptoms can show up later.",
                 "Get EMS to evaluate. Strangulation injuries can be serious without visible marks.",
                 "This is a DV case: mandatory arrest rules and weapon seizure apply."], "/entry/njsa-2c-12-1b"),
             "r_b2": R("Aggravated assault 2C:12-1b(2): 3rd degree", "red", [
                 "Recover and photograph the weapon; note how it was used.",
                 "Also consider possession of a weapon for an unlawful purpose (2C:39-4)."], "/entry/njsa-2c-12-1b"),
             "r_b3": R("Aggravated assault 2C:12-1b(3): 4th degree", "amber", [
                 "Fits reckless injury with a deadly weapon.",
                 "If the injury was only negligent, it drops to simple assault a(2), a disorderly persons offense."], "/entry/njsa-2c-12-1b"),
             "r_b4": R("Aggravated assault 2C:12-1b(4): 4th degree", "amber", [
                 "Pointing at a police officer is a higher grade under a separate paragraph; check the entry.",
                 "Recover the firearm or imitation; check permits and also consider weapons charges in 2C:39."], "/entry/njsa-2c-12-1b"),
             "r_b7": R("Aggravated assault 2C:12-1b(7): 3rd degree", "red", [
                 "Write down exactly which function or sense was lost and for how long.",
                 "Example: knocked unconscious, or a punch that temporarily blinds an eye."], "/entry/njsa-2c-12-1b"),
             "r_b5_3": R("Aggravated assault 2C:12-1b(5): 3rd degree", "red", [
                 "Protected victim plus bodily injury.",
                 "Note the victim's role and that they were acting in the line of duty (or because of their status)."], "/entry/njsa-2c-12-1b"),
             "r_b5_4": R("Aggravated assault 2C:12-1b(5): 4th degree", "amber", [
                 "A simple assault on a protected victim with no bodily injury.",
                 "Note the victim's role and that they were on duty."], "/entry/njsa-2c-12-1b"),
             "r_dp": R("Simple assault 2C:12-1a: disorderly persons", "amber", [
                 "Domestic relationship? Simple assault is a DV predicate; run the mandatory arrest go-by.",
                 "Consider a complaint-summons unless a warrant is justified."], "/entry/njsa-2c-12-1a"),
             "r_pdp": R("Simple assault (mutual fight): petty disorderly", "blue", [
                 "Both sides agreed to fight. Each may be charged.",
                 "Mutual consent is judged by the facts, not just what the parties say afterward."], "/entry/njsa-2c-12-1a"),
             "r_none": R("Probably not an assault", "blue", [
                 "An offensive touch, shove or threat to do so with purpose to harass fits harassment 2C:33-4(b).",
                 "A threat to kill or of a violent crime may be terroristic threats 2C:12-3."], "/entry/njsa-2c-33-4"),
         }),
    flow("which-theft", "Which Theft Charge Fits?",
         "Theft, shoplifting, robbery, burglary or receiving stolen property.", "force", {
             "force": Q("During the theft or the immediate flight, did the suspect use force, cause injury, or threaten immediate injury?",
                        "armed", "entry", "Includes a shoplifter who shoves the guard while running out the door."),
             "armed": Q("Was the suspect armed with or did they threaten a deadly weapon, or cause or try to cause serious bodily injury?",
                        "r_rob1", "r_rob2"),
             "entry": Q("Did the suspect enter, or hide in, a structure with purpose to commit an offense inside?",
                        "r_burg", "store", "A house, garage, business, vehicle used as a dwelling, or a separately secured part of one."),
             "store": Q("Was it merchandise taken from a store or business offering it for sale?", "r_shop", "recv"),
             "recv": Q("Did the suspect receive, keep or sell property they knew (or believed) was stolen, rather than take it themselves?",
                       "r_rsp", "car"),
             "car": Q("Was a vehicle taken just to use it, with no plan to keep it?", "r_joy", "r_theft"),
             "r_rob1": R("Robbery 2C:15-1: 1st degree", "red", [
                 "Recover the weapon, or document the threat in the victim's words.",
                 "Add weapons charges as they apply."], "/entry/njsa-2c-15-1"),
             "r_rob2": R("Robbery 2C:15-1: 2nd degree", "red", [
                 "Force or threat during the theft, the attempt or the immediate flight turns a theft into a robbery.",
                 "Nothing has to actually be taken; an attempted theft counts."], "/entry/njsa-2c-15-1"),
             "r_burg": R("Burglary 2C:18-2: 3rd degree", "red", [
                 "2nd degree if they caused, tried or threatened bodily injury, or were armed.",
                 "Charge the theft or other crime inside separately.",
                 "No purpose to commit a crime inside? Look at criminal trespass instead."], "/entry/njsa-2c-18-2"),
             "r_shop": R("Shoplifting 2C:20-11: graded by value", "amber", [
                 "Under $200 DP, $200 to $500 4th degree, over $500 3rd degree, $75,000 or more 2nd degree.",
                 "Use the full retail value. Run the shoplifting checklist."], "/entry/njsa-2c-20-11"),
             "r_rsp": R("Receiving stolen property 2C:20-7: graded by value", "amber", [
                 "Graded by value, the same as theft.",
                 "Look for the statutory presumptions of knowledge, like a very low price paid."], "/entry/njsa-2c-20-7"),
             "r_joy": R("Unlawful taking of a means of conveyance 2C:20-10", "amber", [
                 "For a vehicle used and abandoned without intent to keep it.",
                 "If they meant to keep it, it is theft, and a motor vehicle is 3rd degree regardless of value."], "/entry/njsa-2c-20-10"),
             "r_theft": R("Theft by unlawful taking 2C:20-3: graded by value", "amber", [
                 "Under $200 DP, $200 to $500 4th degree, over $500 3rd degree, $75,000 or more 2nd degree.",
                 "A firearm, motor vehicle, boat, horse, companion animal or CDS is 3rd degree regardless of value."], "/entry/njsa-2c-20-3"),
         }),
    flow("which-mischief", "Is It Criminal Mischief?",
         "Damage or tampering, and how the dollar amount sets the grade.", "owner", {
             "owner": Q("Did the property belong to someone other than the suspect?", "mental", "r_own",
                        "Jointly owned property can still count. A spouse breaking shared property is a common DV mischief case."),
             "mental": Q("Was the damage done purposely or knowingly, or recklessly or negligently with fire, explosives or another dangerous means?",
                         "value2k", "tamper"),
             "tamper": Q("Did the suspect tamper with the property in a way that endangers a person or property?", "value2k", "r_civil"),
             "value2k": Q("Is the damage $2,000 or more?", "r_3rd", "value500",
                          "Use the repair or replacement cost. Get an estimate or receipt for the report."),
             "value500": Q("Is the damage more than $500?", "r_4th", "r_dp"),
             "r_3rd": R("Criminal mischief 2C:17-3: 3rd degree", "red", [
                 "Higher grades apply to damage to utilities, transportation, public services and some facilities; check the entry.",
                 "Domestic relationship? Criminal mischief is a DV predicate."], "/entry/njsa-2c-17-3"),
             "r_4th": R("Criminal mischief 2C:17-3: 4th degree", "amber", [
                 "Over $500 but under $2,000.",
                 "Domestic relationship? Criminal mischief is a DV predicate."], "/entry/njsa-2c-17-3"),
             "r_dp": R("Criminal mischief 2C:17-3: disorderly persons", "amber", [
                 "$500 or less.",
                 "Domestic relationship? Criminal mischief is a DV predicate."], "/entry/njsa-2c-17-3"),
             "r_own": R("Not criminal mischief", "blue", [
                 "Damaging only your own property is generally not mischief.",
                 "Check for other offenses, like insurance fraud or a restraining order violation."], "/entry/njsa-2c-17-3"),
             "r_civil": R("Probably a civil matter", "blue", [
                 "Accidental or careless damage without fire or explosives is usually civil.",
                 "Give both parties a case number and exchange information."], "/entry/njsa-2c-17-3"),
         }),
    flow("which-trespass", "Trespass or Burglary?",
         "Unlicensed entry, defiant trespass, peering and burglary.", "structure", {
             "structure": Q("Did the suspect enter or hide in a structure knowing they weren't allowed to be there?", "purpose", "notice",
                            "Includes a separately secured part of a building, like a back office or apartment."),
             "purpose": Q("Was their purpose to commit an offense inside (theft, assault, damage)?", "r_burg", "dwelling",
                          "Purpose can be shown by tools, items taken, statements or what they did once inside."),
             "dwelling": Q("Was it a dwelling, school or school property, utility, research facility or airport secure area?", "r_a4", "r_adp"),
             "notice": Q("Did they enter or stay somewhere after being told to leave, or where it was posted or fenced?", "r_def", "peer",
                         "Notice can be given in person, by signs, or by a fence or enclosure meant to keep people out."),
             "peer": Q("Did they peer into a window or opening of a home to invade someone's privacy?", "r_peer", "r_none"),
             "r_burg": R("Burglary 2C:18-2: 3rd degree", "red", [
                 "2nd degree if they caused, tried or threatened bodily injury, or were armed.",
                 "Charge the crime they meant to commit, or committed, separately."], "/entry/njsa-2c-18-2"),
             "r_a4": R("Criminal trespass 2C:18-3(a): 4th degree", "red", [
                 "Unlicensed entry into a dwelling, school or other listed place."], "/entry/njsa-2c-18-3"),
             "r_adp": R("Criminal trespass 2C:18-3(a): disorderly persons", "amber", [
                 "Unlicensed entry into any other structure."], "/entry/njsa-2c-18-3"),
             "r_def": R("Defiant trespass 2C:18-3(b): petty disorderly", "amber", [
                 "Write down who gave notice, when, and exactly what was said, or photograph the signs.",
                 "Defense: a place open to the public where the person followed all lawful conditions."], "/entry/njsa-2c-18-3"),
             "r_peer": R("Criminal trespass 2C:18-3(c): 4th degree", "red", [
                 "Peering into a dwelling window or opening to invade privacy.",
                 "Note where they stood and what they could see."], "/entry/njsa-2c-18-3"),
             "r_none": R("Probably not trespass", "blue", [
                 "Defenses include abandoned structures and places open to the public.",
                 "If they won't leave after you or the owner tell them to, it becomes defiant trespass."], "/entry/njsa-2c-18-3"),
         }),
]

# Side-by-side comparisons. "decider": true highlights the row that usually decides which charge fits.
COMPARISONS = [
    {
        "id": "assault",
        "title": "Simple vs. Aggravated Assault",
        "summary": "The injury, the weapon and who the victim is decide the charge.",
        "charges": [
            {"entry": "njsa-2c-12-1a", "label": "Simple Assault", "cite": "2C:12-1a"},
            {"entry": "njsa-2c-12-1b", "label": "Aggravated Assault", "cite": "2C:12-1b"},
        ],
        "rows": [
            {"label": "Injury", "decider": True, "cells": [
                "Bodily injury: pain, illness or impairment, or an attempt",
                "Serious bodily injury (2nd°), significant bodily injury (3rd°), or any injury with a weapon or to a protected victim"]},
            {"label": "Weapon", "decider": True, "cells": [
                "Only negligent injury with a deadly weapon",
                "Purposely or knowingly with a deadly weapon (3rd°); recklessly (4th°); pointing a firearm (4th°)"]},
            {"label": "Victim", "decider": True, "cells": [
                "Anyone",
                "Police, fire, EMS, health care, school staff, transit, judges and others on duty: 4th°, or 3rd° with injury"]},
            {"label": "Mental state", "cells": [
                "Purposely, knowingly or recklessly (negligently only with a weapon)",
                "Usually purposely or knowingly; recklessly with extreme indifference for serious injury"]},
            {"label": "Grade", "cells": [
                "Disorderly persons; petty disorderly for a mutual fight",
                "2nd, 3rd or 4th degree depending on the paragraph"]},
        ],
        "tip": "Start with the injury. Pain alone points to simple assault; lasting or serious injury, a weapon, or a protected victim points to aggravated.",
        "flow": "which-assault",
    },
    {
        "id": "theft-robbery-burglary",
        "title": "Theft vs. Robbery vs. Burglary",
        "summary": "Force turns theft into robbery; entry with criminal purpose is burglary.",
        "charges": [
            {"entry": "njsa-2c-20-3", "label": "Theft", "cite": "2C:20-3"},
            {"entry": "njsa-2c-15-1", "label": "Robbery", "cite": "2C:15-1"},
            {"entry": "njsa-2c-18-2", "label": "Burglary", "cite": "2C:18-2"},
        ],
        "rows": [
            {"label": "Force or threat", "decider": True, "cells": [
                "None",
                "Injury, force, or threat of immediate injury during the theft or immediate flight",
                "Not required"]},
            {"label": "Entry into a structure", "decider": True, "cells": [
                "Not required", "Not required", "Required, with purpose to commit an offense inside"]},
            {"label": "Must something be taken?", "cells": [
                "Yes (or an attempt)", "No, an attempted theft is enough", "No, the purpose at entry is enough"]},
            {"label": "Grade", "cells": [
                "By value: DP to 2nd°",
                "2nd°; 1st° if armed or serious injury",
                "3rd°; 2nd° if injury, threat or armed"]},
        ],
        "tip": "A shoplifter who shoves a guard on the way out can be charged with robbery: force during the immediate flight counts.",
        "flow": "which-theft",
    },
    {
        "id": "trespass-burglary",
        "title": "Criminal Trespass vs. Burglary",
        "summary": "Same unlawful entry; burglary adds the purpose to commit a crime inside.",
        "charges": [
            {"entry": "njsa-2c-18-3", "label": "Criminal Trespass", "cite": "2C:18-3"},
            {"entry": "njsa-2c-18-2", "label": "Burglary", "cite": "2C:18-2"},
        ],
        "rows": [
            {"label": "Unlicensed entry", "cells": ["Yes, or hiding inside", "Yes, or hiding inside"]},
            {"label": "Purpose to commit an offense inside", "decider": True, "cells": ["Not required", "Required"]},
            {"label": "Other forms", "cells": [
                "Defiant trespass after notice (PDP); peering into a home (4th°)", "Utility property with criminal purpose"]},
            {"label": "Grade", "cells": [
                "DP; 4th° for a dwelling, school, utility or other listed place", "3rd°; 2nd° if injury, threat or armed"]},
        ],
        "tip": "Ask what they meant to do inside. Tools, items taken, statements or damage can show purpose.",
        "flow": "which-trespass",
    },
    {
        "id": "harassment-threats",
        "title": "Harassment vs. Terroristic Threats",
        "summary": "Annoying or alarming conduct vs. a threat meant to terrorize.",
        "charges": [
            {"entry": "njsa-2c-33-4", "label": "Harassment", "cite": "2C:33-4"},
            {"entry": "njsa-2c-12-3", "label": "Terroristic Threats", "cite": "2C:12-3"},
        ],
        "rows": [
            {"label": "What was said or done", "decider": True, "cells": [
                "Annoying or alarming communications, offensive touching or a threat to touch, a course of alarming conduct",
                "A threat to commit a crime of violence, or a threat to kill"]},
            {"label": "Purpose", "decider": True, "cells": [
                "To harass, or to alarm or seriously annoy",
                "To terrorize or cause evacuation; or to put the victim in imminent fear of death"]},
            {"label": "Victim's belief", "cells": [
                "Not required",
                "For a threat to kill, circumstances must make the victim reasonably believe it"]},
            {"label": "Grade", "cells": [
                "Petty disorderly; 4th° in some cases (for example, on parole or probation)",
                "3rd°; 2nd° under (a) during a declared emergency"]},
        ],
        "tip": "Write the threat in the suspect's exact words, plus the setting and the victim's reaction. Context decides which charge fits.",
    },
    {
        "id": "resisting-obstruction-eluding",
        "title": "Resisting vs. Obstruction vs. Eluding",
        "summary": "What the officer was doing decides which statute applies.",
        "charges": [
            {"entry": "njsa-2c-29-2", "label": "Resisting Arrest", "cite": "2C:29-2a"},
            {"entry": "njsa-2c-29-1", "label": "Obstruction", "cite": "2C:29-1"},
            {"entry": "njsa-2c-29-2", "label": "Eluding", "cite": "2C:29-2b"},
        ],
        "rows": [
            {"label": "What the officer was doing", "decider": True, "cells": [
                "Making an arrest", "Any lawful official function, like an investigation", "Signaling a vehicle to stop"]},
            {"label": "Conduct", "cells": [
                "Preventing the arrest: flight, force, threats or creating a risk of injury",
                "Flight, intimidation, force, physical interference or an obstacle",
                "Fleeing or trying to elude in a vehicle"]},
            {"label": "Grade", "cells": [
                "DP; 4th° by flight; 3rd° with force or risk of injury",
                "DP; 4th° if it obstructs a crime investigation",
                "3rd°; 2nd° if it creates a risk of death or injury"]},
        ],
        "tip": "Before the arrest is announced, running from an investigative stop is usually obstruction. After, it is resisting.",
    },
    {
        "id": "value-grades",
        "title": "Value Grading: Theft vs. Criminal Mischief",
        "summary": "The dollar breakpoints are different. Check which table you're using.",
        "charges": [
            {"entry": "njsa-2c-20-2", "label": "Theft, Shoplifting, RSP", "cite": "2C:20-2"},
            {"entry": "njsa-2c-17-3", "label": "Criminal Mischief", "cite": "2C:17-3"},
        ],
        "rows": [
            {"label": "Disorderly persons", "cells": ["Under $200", "$500 or less"]},
            {"label": "4th degree", "decider": True, "cells": ["$200 to $500", "Over $500, under $2,000"]},
            {"label": "3rd degree", "decider": True, "cells": ["Over $500, under $75,000", "$2,000 or more"]},
            {"label": "2nd degree", "cells": ["$75,000 or more", "Listed public services and facilities; check the entry"]},
            {"label": "Regardless of value", "cells": [
                "Firearm, motor vehicle, boat, horse, companion animal, CDS: 3rd°", "Utilities, transportation and other listed property: higher grades"]},
        ],
        "tip": "$400 is a 4th degree theft but only a disorderly persons criminal mischief.",
        "flow": "which-mischief",
    },
]

for f in FLOWS:
    with open(os.path.join(CHECK, f["id"] + ".json"), "w") as fh:
        json.dump(f, fh, indent=1, ensure_ascii=False)
for c in COMPARISONS:
    c["sections"] = ["criminal-code"]
    c["note"] = "Plain-language summary. Not yet verified against official sources. Read the full statute before charging."
    with open(os.path.join(COMP, c["id"] + ".json"), "w") as fh:
        json.dump(c, fh, indent=1, ensure_ascii=False)
print(len(FLOWS), "flows,", len(COMPARISONS), "comparisons")
