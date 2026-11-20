"""Writes content/entries/njtr1-*.json: the NJTR-1 crash report section.

Plain-language summaries of the "General Questions" appendix of the official
New Jersey NJTR-1 Crash Report Manual (Edition 2.0, revised January 1, 2023),
plus links to the full manual and related official forms. Written 2026-11-19.
"""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "content", "entries")

MANUAL = "https://www.nj.gov/transportation/refdata/accident/pdf/NJTR-1CrashReportManual2023.pdf"
CITE = "NJTR-1 Crash Report Manual (2023), Appendix: General Questions"
CHECKED = "2026-11-19"


def F(q, a, box=""):
    d = {"q": q, "a": a}
    if box:
        d["box"] = box
    return d


def entry(id, group, title, key_points, faq, notes=(), links=None, related=()):
    e = {
        "id": id,
        "category": "Crash Reports",
        "title": title,
        "source_type": "manual",
        "citation": CITE,
        "source_url": MANUAL,
        "grade_or_penalty": "",
        "key_points": list(key_points),
        "officer_notes": list(notes),
        "related": list(related),
        "status": "DRAFT",
        "source_verified": True,
        "grade_review": False,
        "last_verified": CHECKED,
        "section": "crash-reports",
        "group": group,
        "faq": faq,
    }
    if links:
        e["links"] = links
    return e


ENTRIES = [
    entry("njtr1-1-manual", "Manual & Forms", "NJTR-1 Crash Report Manual (Full Guide)", [
        "The official statewide guide to completing the NJTR-1, box by box, with definitions and examples.",
        "Current edition: 2.0, revised January 1, 2023. The 2023 form has 153 boxes (four more than the old 149-box form); new guidance appears in green text in the manual.",
        "Sections follow the form: Crash Location (1-22), Driver/Vehicle (23-48, 53-78), Commercial Vehicle (49-52, 79-82), Persons Involved (83-95), Roadway System (96-103), Crash/Vehicle Characteristics (104-117), and Contributing Circumstances, Sequence of Events and Pre-Crash (118-153).",
        "The appendix covers general questions, vehicle and device definitions, and the extension forms: NJTR-1A, NJTR-1B (diagram), NJTR-1M (more persons) and bus seating layouts.",
    ], [
        F("Where do I get the full manual?", "Tap \"Open the full manual\" below. It is the official PDF on the NJDOT website (about 136 pages)."),
        F("Is this page the whole manual?", "No. This section summarizes the manual's General Questions appendix in plain language. Always check the full manual for box-by-box codes and the exact wording."),
    ], notes=[
        "Boxes 1-7 go on every page of the report; boxes 8-22 and 96-105 are only needed on page 1 (per the form overlay).",
        "Use 00 for Unknown and 99 for Other (unless the field has its own Other code), and explain Other and asterisk (*) items in the crash description.",
    ], links=[
        {"label": "Open the full manual (PDF)", "url": MANUAL},
        {"label": "Form code overlays (PDF)", "url": "https://www.nj.gov/transportation/refdata/accident/pdf/NJTR-1_Overlays.pdf"},
        {"label": "2023 form change summary (PDF)", "url": "https://www.nj.gov/transportation/refdata/accident/pdf/NJTR-1_Form_Change_Summary.pdf"},
    ]),

    entry("njtr1-2-reportable", "When to Report", "Reportable Crashes, Fatals & Change Reports", [
        "A crash is reportable when it causes injury or death to anyone, or more than $500 in damage to any vehicle (N.J.S.A. 39:4-129, 39:4-130).",
        "Below that line it is non-reportable: still fill out an NJTR-1, check the non-reportable box, and keep it at the department instead of sending it to NJDOT.",
        "Reportable NJTR-1s go to NJDOT within 72 hours.",
    ], [
        F("What makes a crash reportable?",
          "Any injury or death, or damage over $500 to any vehicle. Crashes under $500 with no injuries are non-reportable, but they still need to be documented; follow your department's policy on the form to use."),
        F("Can an officer skip the report on a non-reportable crash?",
          "No. You still complete the NJTR-1 and check the non-reportable box. It stays at your department for records and isn't sent to NJDOT."),
        F("For a fatal crash, do we do both an NJTR-1 and an investigation report?",
          "Common practice: complete every box of the NJTR-1 with the minimum required information so it reaches NJDOT within 72 hours, keep the full investigation in a separate report, then file a change report that adds it. Investigation reports usually aren't released until the prosecutor's office finishes the case."),
        F("What if the crash was intentional?",
          "Still complete the NJTR-1 if it meets the reportable criteria. Mark Pre-Crash Action as a deliberate act (code 19 or 46) and explain in the narrative. This covers suicide attempts, homicide and deliberately damaging property or hurting someone with a vehicle. Pair it with an investigation or incident report.",
          "122/123"),
        F("A driver disputes the report the next day. Now what?",
          "If the department agrees a change is warranted (for example, wrong vehicle information), complete and submit an NJTR-1 change report to NJDOT. If not, you can note the dispute internally; nothing goes to NJDOT."),
        F("Someone walks in saying they were hit in a parking lot four days ago and now their neck hurts.",
          "Handle it as an SR-1 report (a crash not investigated at the scene)."),
        F("Are hit-and-run crashes always marked pending?",
          "Yes, until the other vehicle is identified; then submit a change report with the original case number and mark it complete. If every lead is exhausted, you may mark it complete and explain in the narrative why the vehicle wasn't identified and that the case will reopen if new information comes in."),
        F("A vehicle leaves the road in one town and hits something in the next. Who takes it?",
          "The crash location is generally where the first harmful event happened, but the investigating agency is generally the one where the vehicle first left the roadway."),
        F("A vehicle leaves one crash, goes two blocks and crashes again. One report or two?",
          "It depends on whether the situation stabilized. If the driver regained control and then hit something else, it's a second crash. If the vehicle stayed out of control the whole way, it's one crash. An unstabilized situation lasts until control is regained or everyone and everything comes to rest."),
    ], related=["njsa-39-4-129", "njsa-39-4-130"]),

    entry("njtr1-3-location", "Filling Out the Boxes", "Location: Road Names, Parking Lots & GPS", [
        "Locate private property and parking lot crashes by street address, followed by \"parking lot.\"",
        "Direction in box 10 is only for divided roads and one-way streets.",
        "Latitude and longitude go in decimal degrees, not degrees, minutes and seconds.",
    ], [
        F("When do I fill in the direction in box 10?", "Only for divided roadways and one-way streets.", "10"),
        F("A parking lot borders several streets. What address do I use?",
          "Use the lot's own street address from the municipal tax map or 9-1-1 database. If there isn't one, use a common name for the place, like \"Whiting Lake (parking lot).\"", "10"),
        F("For a private property crash, do I list a cross street?",
          "No. Use the street address in box 10, followed by \"parking lot\" if it happened in a lot, for example \"101 Main Street (parking lot).\"", "10"),
        F("Can an overpass be the nearest cross street?", "Yes. Overpasses, underpasses and railroad crossings can all be used.", "17"),
        F("Do I need to fill in latitude and longitude?",
          "Fill them in if your department has GPS. Use decimal degrees only. NJDOT also relies on an accurate distance to the nearest cross road to place the crash.", "21/22"),
        F("A car hits a curb. Is that private property?",
          "No. Curbing is part of the roadway system unless the whole crash happened on private or other off-road property."),
    ]),

    entry("njtr1-4-people", "Filling Out the Boxes", "Drivers, Passengers & Pedestrians", [
        "Someone seated in a vehicle is an occupant even if their feet are on the ground; someone half in or half out while standing up or sitting down is a pedestrian.",
        "Riders in a cargo area are position 10; people riding on or hanging onto the outside are position 11 (box 84).",
        "Pedestrians and cyclists don't get driver's license numbers in boxes 32/62.",
    ], [
        F("When does someone getting out of a parked car become a pedestrian?",
          "If they're seated, they're an occupant, even with their feet on the ground. If they're in the middle of standing up or sitting down, half in and half out, they're a pedestrian. If they're standing on the vehicle with their feet off the ground, they're a passenger.", "84"),
        F("How do I list someone riding in a pickup bed, or who falls off the back of a trash truck?",
          "In the cargo area: code 10. Riding on or hanging onto the outside: code 11.", "84"),
        F("Someone jumps onto the outside of a car and the driver takes off.",
          "List it as a motor vehicle crash with a passenger riding on the outside: code 11.", "84"),
        F("A 16-year-old with a permit is driving with a parent. Whose information goes where?",
          "The permit driver's information goes in the driver boxes (26-34 or 56-64). Put the supervising parent's information in the crash description (box 145)."),
        F("Do I enter the license of an emergency vehicle driver, or a volunteer responding in a personal car?", "Yes.", "32/62"),
        F("Do pedestrians or cyclists get a license number entered?", "No.", "32/62"),
        F("Do pedestrians get Sequence of Events?",
          "No. Sequence of Events describes what the motor vehicles did. Record the pedestrian's actions in Pre-Crash Action.", "122/123"),
        F("A car runs a cyclist off the road but never touches them. Is that a crash?", "No. Without contact with the vehicle in transport, it isn't a crash."),
        F("A cyclist grabs onto a moving car for a tow, falls and is hurt.",
          "List them as a pedalcyclist. In the narrative, explain that they were holding onto the vehicle and whether the driver knew."),
    ]),

    entry("njtr1-5-emergency", "Filling Out the Boxes", "Police Vehicles, Emergency Response & Rideshare", [
        "Responding to Emergency ends once the patrol car is positioned at the scene.",
        "A no-lights, no-siren response to a real emergency still counts as responding; explain in the narrative.",
        "Uber or Lyft drivers count as Business/Commerce only while carrying a passenger or on the way to pick one up.",
    ], [
        F("My patrol car is parked at a crash scene and gets hit. Do I check Responding to Emergency?",
          "No. Once the car is positioned at the scene, the emergency response is over."),
        F("I was answering an emergency call with no lights or siren (tactical approach) and crashed.",
          "Still check Responding to Emergency, and explain the reason for the silent response in the narrative."),
        F("Is a rideshare driver personal use or business?",
          "Mark vehicle use 02 – Business/Commerce only if they were carrying a passenger or driving to pick one up for hire. Otherwise it's personal use."),
        F("Is there insurance coverage when I crash a patrol car?", "Generally your municipality's insurance carrier covers it."),
        F("Is a police car stopped in the road at a crash or traffic stop \"in transport\"?",
          "Yes, whether or not its emergency lights are on. A patrol car on patrol or responding to a call is also in transport."),
    ]),

    entry("njtr1-6-types", "Filling Out the Boxes", "Animals, Objects, Fires & Potholes", [
        "Always complete an NJTR-1 for an animal strike; send it to NJDOT only if it's reportable.",
        "A load or object falling off one vehicle onto another is a multi-vehicle non-collision crash.",
        "Potholes and raised manhole covers count as fixed-object crashes.",
    ], [
        F("A car hits a dog. What report?",
          "An NJTR-1, every time. It goes to NJDOT only if it meets the reportable criteria; otherwise mark it non-reportable and keep it. Typical codes: contributing circumstance 57 – Animal in Roadway; Sequence of Events 24 – Deer or 25 – Other Animal. A horse pulling a buggy is not \"an animal\" for this purpose."),
        F("A tire kicks up a rock that hits another car.", "Complete an NJTR-1, reportable or non-reportable based on your investigation and the criteria."),
        F("Something falls off one vehicle and hits another.", "A two-vehicle (or multi-vehicle) non-collision crash."),
        F("A tree branch, golf ball or baseball hits a moving car.", "It can be classified as a one-vehicle non-collision crash."),
        F("Why report potholes and manhole covers if they're temporary?",
          "They're fixed-object crashes, and the reports help find road maintenance and engineering problems."),
        F("A car hits a parked, unhitched, registered trailer.",
          "A one-vehicle crash. The trailer is a non-fixed object; put its information in the narrative."),
        F("Does a vehicle have to be moving for a fire to be an NJTR-1?",
          "Yes. A fire that starts in a vehicle in transport is a non-collision crash."),
        F("A car runs onto a center island and needs a tow.", "Yes, an NJTR-1. Send it to NJDOT if it's reportable; keep it if not."),
        F("A snowmobile hits a parked car.",
          "Yes, an NJTR-1. Snowmobile, ATV and dirt bike crashes with injury, death or property damage follow the same reporting rules (N.J.S.A. 39:3C-21)."),
        F("A riding mower hits a moving car, or a tree.", "Mower vs. a vehicle in transport: yes. Mower vs. a fixed object only: no."),
    ]),

    entry("njtr1-7-workzones", "Filling Out the Boxes", "Work Zones, Equipment & Snowplows", [
        "A work zone runs from the first warning sign or device to the END ROAD WORK sign or last control device.",
        "Complete an NJTR-1 when the traveling public (drivers, cyclists, pedestrians) is involved in a crash in, entering or leaving a work zone.",
        "Crashes involving only workers, work vehicles and equipment inside the zone are work or OSHA incidents, not NJTR-1s.",
    ], [
        F("Does a work zone crash go on an NJTR-1?",
          "Yes, if the first harmful event happens inside the work zone or on the approach or exit, and it involves the traveling public. The data is used to judge how safe work-zone traffic plans are."),
        F("Two pieces of work equipment collide inside the work zone.",
          "Not an NJTR-1. If everyone involved was part of the work activity, it's a work zone or OSHA incident."),
        F("A forklift hits a pedestrian. Is that a crash?",
          "Inside a work zone with another worker, it's a work incident. It's an NJTR-1 if the forklift leaves the zone and hits a member of the public, or a member of the public enters the zone and hits a worker or equipment."),
        F("A backhoe driving on the road runs off and hits a tree.",
          "Not reportable; a backhoe isn't built to carry passengers. If it collides with a driver or pedestrian who isn't part of the work zone, complete an NJTR-1."),
        F("A snowplow actively plowing hits a parked car or fixed object.",
          "A crash report is appropriate because of the damage to the other vehicle. Fill in the plow's information like any other vehicle."),
        F("A plow throws ice and snow onto a moving car.", "Yes, an NJTR-1."),
        F("Is a snowplow \"work equipment\"?",
          "No. A pickup, dump truck or garbage truck with a plow is a vehicle in transport, and is only treated as a snowplow while the blade is down and it's actively clearing the road."),
    ]),

    entry("njtr1-8-transport", "Filling Out the Boxes", "Parked vs. In Transport", [
        "In transport: on the roadway (moving or stopped), or moving anywhere in or outside the trafficway.",
        "Parked: not moving and completely off the travel lanes. If any part of the vehicle or its load sticks into the roadway, it's in transport.",
        "In a lane that allows parking only at certain times, a parked car counts as in transport while parking is banned.",
    ], [
        F("Examples of parked (not in transport)",
          "A car stopped at the curb whose driver opens a door into traffic; a truck on the shoulder with only its mirror over the line; any vehicle stopped on the shoulder, median or roadside; at a gas pump; in a driveway; in a metered space even if the meter ran out."),
        F("Examples of in transport",
          "Any vehicle driving on the shoulder, median or roadside; a parked car that rolls away with no brake set; a car stopped with two tires in the lane; a tractor trailer with its load over the edge line; a van left in a travel lane during a rush-hour no-parking period; a delivery truck stopped in a \"no parking any time\" zone; a police car on patrol or stopped in the road at a scene; a school bus stopped in a lane with its lights on; a car pulling away from a gas pump; a moving car in a private driveway; an ATV on a trail."),
        F("Is a work vehicle doing road work in transport?",
          "No, not while it's doing construction, maintenance or utility work in the work zone (for example, a bucket truck working on lines, a line-painting truck, a paving roller, or a highway plow clearing snow as road maintenance). It is in transport when driving between work sites."),
    ]),

    entry("njtr1-9-vehicles", "Vehicles & Devices", "Low-Speed Vehicles, Mopeds & Autocycles", [
        "Complete an NJTR-1 for crashes involving low-speed vehicles, motorized bicycles (mopeds), autocycles, ATVs, snowmobiles and dirt bikes.",
        "A low-speed vehicle tops out above 20 but no more than 25 mph and isn't gas or diesel powered. A golf cart (under 20 mph) is not one.",
        "Mopeds: at least 15 years old, any valid driver's license or a moped license, registration, insurance and a helmet; DWI applies.",
    ], [
        F("What is a low-speed vehicle?",
          "A four-wheeled vehicle that can go more than 20 but no more than 25 mph on a level road, isn't powered by gas or diesel, and meets federal safety standards. Faster than 25 mph means it's a regular motor vehicle. It must have a \"25 MPH Vehicle\" decal on the back."),
        F("What do low-speed vehicles need?",
          "A valid driver's license, registration, insurance and a license plate. No inspection. Brakes, an odometer, a speedometer and a stamped VIN are required."),
        F("Where can a low-speed vehicle drive?",
          "Roads posted 25 mph or less. A town or county can allow them on roads posted up to 35 mph, or ban them where they'd be a hazard. Drivers can get Title 39 summonses."),
        F("What is a motorized bicycle (moped)?",
          "A pedal bicycle with a helper motor: under 50 cc, no more than 1.5 brake horsepower, or electric, with a top speed of 25 mph on flat ground. The current definition also covers some faster electric bikes; see the definitions in the manual. It is not a low-speed electric bicycle."),
        F("Moped rules", "Operator must be 15 or older; any valid driver's license or a moped license; registration; liability insurance; a helmet. Not allowed on interstates, divided highways or roads over 50 mph. Title 39 duties and the DWI statute apply."),
        F("What is an autocycle?",
          "A three-wheeled motorcycle with a steering wheel and pedals, an enclosed or partly enclosed seat area, roll cage or hoops, seat belts and anti-lock brakes. A regular driver's license is enough, no motorcycle endorsement. Riders must be seated and belted, need helmets unless it's fully enclosed, and no child who needs a car seat may ride."),
    ]),

    entry("njtr1-10-devices", "Vehicles & Devices", "E-Bikes, E-Scooters & Personal Conveyances", [
        "Low-speed e-bikes, low-speed e-scooters, motorized scooters, motorized wheelchairs and hoverboards are \"personal conveyances,\" not vehicles, for crash reporting.",
        "Only report them on an NJTR-1 when they're in a crash with a motor vehicle in transport.",
        "Then list the rider as a pedestrian: name, address, date of birth and sex only; select 17 – Personal Conveyance in box 108/109; describe the device in box 145.",
    ], [
        F("Do e-bike or e-scooter crashes go on an NJTR-1?",
          "Only when they collide with a motor vehicle in transport. A rider who falls alone or hits a fixed object isn't captured on the NJTR-1."),
        F("How do I list the rider?",
          "As a pedestrian, with only name, address, date of birth and sex. Select 17 – Personal Conveyance and describe the device in the narrative.", "108/109, 145"),
        F("What is a low-speed electric bicycle?",
          "Two or three wheels, working pedals and a motor under 750 watts. Class 1 assists only while pedaling and stops at 20 mph. Class 2 can run on the motor alone but stops assisting at 20 mph."),
        F("What is a low-speed electric scooter?", "A stand-up scooter with a floorboard and handlebars whose motor tops out under 19 mph."),
        F("What is a motorized scooter?",
          "A miniature motor vehicle without federal safety certification: pocket bikes, mini choppers, mini motorcycles, motorized skateboards and similar. They can't be ridden on public streets, highways, sidewalks or public property (except by riders with a mobility-related disability), or on private property without permission."),
        F("What are the hoverboard rules?",
          "A self-balancing two-wheeled device under 20 mph. It may be used on roads, sidewalks and bike paths with a cyclist's rights and duties. No license, registration or insurance required. The rider must wear a helmet and be 16 or older (unless they have a mobility-related disability). Towns can regulate them. Penalties: a warning first, then a $10 fine, then impound for up to 30 days."),
    ]),
]

for e in ENTRIES:
    with open(os.path.join(OUT, e["id"] + ".json"), "w") as fh:
        json.dump(e, fh, indent=1, ensure_ascii=False)
print(len(ENTRIES), "entries,", sum(len(e["faq"]) for e in ENTRIES), "questions")
