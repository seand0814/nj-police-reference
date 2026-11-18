"""Adds a structured "subsections" breakdown (label, plain-language summary, grade) to core statutes.
Written 2026-11-18 from general knowledge; NOT yet verified against the official text.
Labels are given only where the numbering is well established; otherwise the label is a short name.
Every statute entry also links to the full text, which has all subsections."""
import json, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, "content", "entries")

def s(label, text, grade=""):
    return {"label": label, "text": text, "grade": grade}

SUBS = {
 "njsa-2c-11-3": [
  s("a(1)", "Purposely causes death, or serious bodily injury resulting in death", "1st degree"),
  s("a(2)", "Knowingly causes death, or serious bodily injury resulting in death", "1st degree"),
  s("a(3)", "Felony murder: death caused during robbery, sexual assault, arson, burglary, kidnapping, carjacking, criminal escape or terrorism (or flight)", "1st degree"),
  s("b", "Sentencing: 30 years to life with 30 years parole ineligibility; life without parole in specified circumstances"),
 ],
 "njsa-2c-11-4": [
  s("a(1)", "Aggravated manslaughter: recklessly causes death under circumstances manifesting extreme indifference to human life", "1st degree"),
  s("a(2)", "Aggravated manslaughter: causes death while fleeing or attempting to elude police", "1st degree"),
  s("b(1)", "Manslaughter: recklessly causes death", "2nd degree"),
  s("b(2)", "Manslaughter: a homicide that would be murder but is committed in the heat of passion from reasonable provocation", "2nd degree"),
 ],
 "njsa-2c-12-1a": [
  s("a(1)", "Attempts to cause, or purposely, knowingly or recklessly causes, bodily injury to another", "DP"),
  s("a(2)", "Negligently causes bodily injury with a deadly weapon", "DP"),
  s("a(3)", "Uses a physical threat to try to make someone fear imminent serious bodily injury", "DP"),
  s("Mutual fight", "Simple assault in a fight or scuffle entered into by mutual consent", "PDP"),
 ],
 "njsa-2c-12-1b": [
  s("b(1)", "Attempts to cause serious bodily injury, or causes it purposely, knowingly, or recklessly with extreme indifference", "2nd degree"),
  s("b(2)", "Attempts to cause, or purposely or knowingly causes, bodily injury with a deadly weapon", "3rd degree"),
  s("b(3)", "Causes bodily injury to another with a deadly weapon through recklessness", "4th degree"),
  s("b(4)", "Knowingly points a firearm at or in the direction of another, under circumstances manifesting extreme indifference (whether or not believed loaded)", "4th degree"),
  s("b(5)", "Simple assault on a protected victim: law enforcement, firefighters, EMS, health care workers, school employees, transit operators, judges, DCP&P workers, utility workers, and others listed", "4th degree; 3rd degree if bodily injury"),
  s("b(6)", "Causes bodily injury while fleeing or attempting to elude police", "2nd degree"),
  s("b(7)", "Attempts to cause significant bodily injury, or causes it purposely, knowingly or recklessly", "3rd degree"),
  s("Other paragraphs", "Also covers injury by starting a fire or explosion; pointing a firearm, imitation firearm or laser sight at an officer; and strangulation of a domestic violence victim. Confirm paragraph numbers and grades in the full text.", "Varies (confirm)"),
 ],
 "njsa-2c-12-3": [
  s("a", "Threatens a crime of violence with purpose to terrorize, or to cause evacuation of a building, place of assembly or transit, or serious public inconvenience, or in reckless disregard of that risk", "3rd degree; 2nd during a declared emergency"),
  s("b", "Threatens to kill another with purpose to put them in imminent fear of death, under circumstances reasonably causing the victim to believe it", "3rd degree"),
 ],
 "njsa-2c-13-1": [
  s("a", "Unlawful removal or confinement to hold for ransom, reward, or as a shield or hostage", "1st degree"),
  s("b", "Unlawful removal a substantial distance or confinement for a substantial period, to facilitate a crime or flight, inflict injury or terrorize, interfere with a government function, or permanently deprive a parent of custody", "1st degree"),
  s("c", "Grading: 2nd degree if the victim is released unharmed and in a safe place before apprehension; enhanced sentence for child victims under 16 with aggravators", "1st / 2nd degree"),
 ],
 "njsa-2c-13-2": [
  s("a", "Knowingly restrains another unlawfully in circumstances exposing them to risk of serious bodily injury", "3rd degree"),
  s("b", "Knowingly holds another in a condition of involuntary servitude", "3rd degree"),
 ],
 "njsa-2c-14-2": [
  s("a(1)", "Aggravated: penetration with a victim under 13", "1st degree"),
  s("a(2)", "Aggravated: victim 13-15 and the actor is related, has supervisory or disciplinary power, or is a resource family parent or guardian", "1st degree"),
  s("a(3)", "Aggravated: during robbery, kidnapping, homicide, aggravated assault, burglary, arson or criminal escape", "1st degree"),
  s("a(4)", "Aggravated: armed with a weapon and threatens to use it", "1st degree"),
  s("a(5)", "Aggravated: aided by others and using physical force or coercion", "1st degree"),
  s("a(6)", "Aggravated: physical force or coercion causing severe personal injury", "1st degree"),
  s("a(7)", "Aggravated: victim physically helpless, intellectually or mentally incapacitated, or incapable of consent", "1st degree"),
  s("b", "Sexual contact with a victim under 13 by an actor at least 4 years older", "2nd degree"),
  s("c(1)", "Penetration using physical force or coercion, without severe personal injury", "2nd degree"),
  s("c(2)", "Victim on probation, parole or detained, and the actor has supervisory or disciplinary power", "2nd degree"),
  s("c(3)", "Victim 16-17 and the actor is related, has supervisory or disciplinary power, or is a resource family parent or guardian", "2nd degree"),
  s("c(4)", "Victim 13-15 and the actor is at least 4 years older", "2nd degree"),
 ],
 "njsa-2c-14-3": [
  s("a", "Aggravated criminal sexual contact: sexual contact under any circumstance in 2C:14-2a(2)-(7)", "3rd degree"),
  s("b", "Criminal sexual contact: sexual contact under any circumstance in 2C:14-2c(1)-(4)", "4th degree"),
 ],
 "njsa-2c-14-4": [
  s("a", "Lewdness: a flagrantly lewd and offensive act knowing or expecting it will be observed by a nonconsenting person who would be affronted or alarmed", "DP"),
  s("b", "Exposes intimate parts for sexual gratification to a child under 13 (actor 4+ years older) or a person unable to understand; or similar conduct listed", "4th degree"),
 ],
 "njsa-2c-15-1": [
  s("a(1)", "In the course of a theft, inflicts bodily injury or uses force upon another", "2nd degree"),
  s("a(2)", "Threatens another with, or purposely puts them in fear of, immediate bodily injury", "2nd degree"),
  s("a(3)", "Commits or threatens immediately to commit a 1st or 2nd degree crime", "2nd degree"),
  s("b", "1st degree if the actor attempts to kill, purposely inflicts or attempts serious bodily injury, or is armed with, uses or threatens a deadly weapon", "1st degree"),
 ],
 "njsa-2c-17-1": [
  s("a", "Aggravated arson: starting a fire or explosion that places a person in danger of death or bodily injury, or purposely targets a structure, or for hire or to collect insurance, among other listed purposes", "2nd degree"),
  s("b", "Arson: purposely starting a fire or explosion that recklessly places a building, structure or listed property of another in danger", "3rd degree"),
  s("c", "Failure to control or report a dangerous fire the actor knows of and has a duty to address", "4th degree"),
 ],
 "njsa-2c-17-3": [
  s("a(1)", "Purposely or knowingly damages tangible property of another (or recklessly or negligently with fire, explosives or other dangerous means)", "Graded by amount"),
  s("a(2)", "Purposely, knowingly or recklessly tampers with tangible property of another so as to endanger a person or property", "Graded by amount"),
  s("b", "Grading: $2,000+ = 3rd degree; over $500 to under $2,000 = 4th degree; $500 or less = DP. Higher grades for damage to utilities, transportation, research facilities, and similar targets", "Varies"),
 ],
 "njsa-2c-18-2": [
  s("a(1)", "Enters a research facility, structure or separately secured part of one, with purpose to commit an offense inside", "3rd degree"),
  s("a(2)", "Surreptitiously remains there, knowing he is not licensed to, with purpose to commit an offense", "3rd degree"),
  s("a(3)", "Trespasses in or on utility company property with purpose to commit an offense", "3rd degree"),
  s("b", "2nd degree if the actor purposely, knowingly or recklessly inflicts, attempts or threatens bodily injury, or is armed with explosives or a deadly weapon", "2nd degree"),
 ],
 "njsa-2c-18-3": [
  s("a", "Unlicensed entry: enters or surreptitiously remains in a structure (or research facility, utility property, airport secure area) knowing he is not licensed to", "DP; 4th degree in a dwelling, school, utility, research facility or airport"),
  s("b", "Defiant trespasser: enters or remains after notice given in person, by posting, or by fencing or enclosure", "PDP"),
  s("c", "Peering into a dwelling window or opening to invade privacy", "4th degree"),
  s("d", "Defenses: abandoned structure; place open to the public with conditions followed; reasonable belief of license"),
 ],
 "njsa-2c-20-2": [
  s("a", "All forms of theft in Chapter 20 are a single offense"),
  s("b(1)", "2nd degree: $75,000 or more; property taken by extortion; certain CDS amounts; people smuggling and other listed cases", "2nd degree"),
  s("b(2)", "3rd degree: over $500 to under $75,000; or a firearm, motor vehicle, vessel, boat, horse, domestic companion animal, airplane, CDS, blank prescription, or other listed items regardless of value", "3rd degree"),
  s("b(3)", "4th degree: at least $200 but not more than $500", "4th degree"),
  s("b(4)", "Disorderly persons: under $200", "DP"),
  s("c", "Claim of right defenses; amounts in one scheme may be aggregated"),
 ],
 "njsa-2c-20-3": [
  s("a", "Movable property: unlawfully takes or exercises control over movable property of another with purpose to deprive", "Graded by value (2C:20-2)"),
  s("b", "Immovable property: unlawfully transfers an interest in immovable property of another with purpose to benefit himself or another", "Graded by value (2C:20-2)"),
 ],
 "njsa-2c-20-7": [
  s("a", "Knowingly receives, retains or disposes of movable property of another, knowing it was stolen or believing it probably was", "Graded by value (2C:20-2)"),
  s("b", "Presumptions of knowledge: possession of stolen property from two or more thefts; recent prior dealings in stolen property; a dealer acquiring for far below value; altered VINs; and others listed"),
 ],
 "njsa-2c-20-11": [
  s("b(1)", "Takes possession of, carries away, transfers or causes to be carried away merchandise with purpose to deprive the merchant", "Graded by value"),
  s("b(2)", "Conceals merchandise on his person or otherwise with purpose to deprive", "Graded by value"),
  s("b(3)", "Alters, transfers or removes a price tag or label with purpose to pay less", "Graded by value"),
  s("b(4)", "Transfers merchandise from one container to another with purpose to deprive", "Graded by value"),
  s("b(5)", "Under-rings: a cashier rings up a lesser price with purpose to deprive", "Graded by value"),
  s("b(6)", "Removes a shopping cart from the premises without consent with purpose to deprive", "DP"),
  s("c", "Grading: $75,000+ = 2nd; $500 to under $75,000 = 3rd; $200 to $500 = 4th; under $200 = DP. Mandatory community service on conviction", "Varies"),
  s("e", "Merchants and officers may detain a suspect in a reasonable manner for a reasonable time with probable cause, with immunity from civil liability"),
 ],
 "njsa-2c-21-5": [
  s("Offense", "Issues or passes a check or similar sight order knowing it will not be honored", "Graded by amount"),
  s("Presumptions", "Knowledge presumed if no account existed, or the check is not paid within 10 days after notice of dishonor"),
  s("Grading", "$75,000+ = 2nd; $1,000 to under $75,000 = 3rd; $200 to under $1,000 = 4th; under $200 = DP", "Varies"),
 ],
 "njsa-2c-24-4": [
  s("a(1)", "Engages in sexual conduct that would impair or debauch the morals of a child", "2nd degree with a legal duty or caretaker role; 3rd degree otherwise"),
  s("a(2)", "Causes a child harm that would make the child an abused or neglected child", "2nd degree with a legal duty or caretaker role; 3rd degree otherwise"),
  s("b", "Child sexual abuse material: causing a child to engage in prohibited sexual acts, photographing or filming, distributing, possessing, or viewing; grading depends on conduct and number of items", "1st to 4th degree"),
 ],
 "njsa-2c-25-21": [
  s("a", "Mandatory arrest and complaint when probable cause of DV exists and the victim shows signs of injury, a warrant is in effect, a restraining order violation occurred, or a weapon was involved"),
  s("b", "Discretionary arrest and complaint in other cases with probable cause"),
  s("c", "When both parties are injured, weigh comparative injuries, history and other factors; do not arrest a victim for reasonable self-defense"),
  s("d", "Ask about and seize weapons at risk; seize FPIC and permits with any firearm; forward to the county prosecutor"),
 ],
 "njsa-2c-28-4": [
  s("a", "Knowingly gives false information to law enforcement with purpose to implicate another", "4th degree (3rd degree in specified cases)"),
  s("b", "Reports an offense or incident knowing it did not occur, or pretends to have information about one", "DP"),
 ],
 "njsa-2c-29-2": [
  s("a(1)", "Resisting arrest: purposely prevents or attempts to prevent an officer from making an arrest", "DP"),
  s("a(2)", "Resisting by flight", "4th degree"),
  s("a(3)", "Resisting by using or threatening force against the officer or another, or by any other means creating a substantial risk of physical injury", "3rd degree"),
  s("b", "Eluding: knowingly flees or attempts to elude an officer in a vehicle after a signal to stop", "3rd degree; 2nd degree if risk of death or injury"),
 ],
 "njsa-2c-29-9": [
  s("a", "Contempt: purposely or knowingly disobeys a judicial order or protective order, or hinders its execution", "4th degree"),
  s("b", "Violating a DV restraining order (or DV conditions of release)", "4th degree if the conduct is also a crime or offense; DP otherwise"),
 ],
 "njsa-2c-33-2": [
  s("a(1)", "Improper behavior: fighting, threatening, or violent or tumultuous behavior", "PDP"),
  s("a(2)", "Improper behavior: creating a hazardous or physically dangerous condition by an act serving no legitimate purpose", "PDP"),
  s("b", "Offensive language: in a public place, unreasonably loud and offensively coarse or abusive language", "PDP"),
 ],
 "njsa-2c-33-4": [
  s("a", "With purpose to harass, makes communications anonymously, at extremely inconvenient hours, in offensively coarse language, or in a manner likely to cause annoyance or alarm", "PDP"),
  s("b", "With purpose to harass, subjects another to striking, kicking, shoving or other offensive touching, or threatens to", "PDP"),
  s("c", "With purpose to alarm or seriously annoy, engages in a course of alarming conduct or repeated acts", "PDP"),
  s("e", "Upgrade if committed while serving a prison term or on parole or probation for an indictable offense, or aimed at a judge because of judicial duties", "4th degree"),
 ],
 "njsa-2c-35-10": [
  s("a(1)", "Possession of Schedule I-IV CDS or analog", "3rd degree"),
  s("a(2)", "Possession of Schedule V CDS", "4th degree"),
  s("a(3)", "More than 6 oz of marijuana or more than 17 g of hashish", "4th degree"),
  s("a(4)", "6 oz or less of marijuana, or 17 g or less of hashish", "No penalty"),
  s("a(5)", "Psilocybin, 1 oz or less", "DP"),
  s("b", "Using or being under the influence of CDS (not marijuana or hashish)", "DP"),
  s("c", "Failing to voluntarily deliver CDS to the nearest officer", "DP"),
 ],
 "njsa-2c-39-4": [
  s("a", "Possession of a firearm with purpose to use it unlawfully against the person or property of another", "2nd degree"),
  s("b", "Explosives with purpose to use unlawfully", "2nd degree"),
  s("c", "Destructive devices with purpose to use unlawfully", "2nd degree"),
  s("d", "Other weapons with purpose to use unlawfully", "3rd degree"),
  s("e", "Imitation firearms with purpose to use unlawfully", "4th degree"),
 ],
 "njsa-2c-39-5": [
  s("a", "Machine guns without a license", "2nd degree"),
  s("b", "Handguns without a permit to carry", "2nd degree"),
  s("c", "Rifles or shotguns without a firearms purchaser ID card", "3rd degree"),
  s("d", "Other weapons under circumstances not manifestly appropriate for lawful uses", "4th degree"),
  s("e", "Firearms or other weapons on school, college or university property without authorization", "3rd or 4th degree"),
  s("f", "Assault firearms without a license", "2nd degree"),
 ],
 "njsa-2c-39-7": [
  s("a", "Persons convicted of listed offenses (and certain others) possessing any weapon", "4th degree (3rd degree in some cases)"),
  s("b", "Persons convicted of listed offenses possessing a firearm", "2nd degree, with mandatory parole ineligibility"),
 ],
 "njsa-39-4-50": [
  s("a", "Operating a motor vehicle under the influence of alcohol or drugs, or with BAC of 0.08% or more; or permitting an impaired person to operate"),
  s("a(1)", "First offense: fines by BAC level, IDRC, possible jail, ignition interlock; forfeiture if BAC 0.15%+ or drug impaired", "MV"),
  s("a(2)", "Second offense: fines, 48 hours to 90 days jail, community service, 1-2 year forfeiture, interlock", "MV"),
  s("a(3)", "Third and later: $1,000 fine, 180 days jail, 8-year forfeiture, interlock", "MV"),
 ],
 "njsa-39-4-129": [
  s("a", "Crash involving injury or death: driver must stop and remain; knowingly leaving is punishable by fine, jail and 1-year revocation", "MV (crime under 2C:11-5.1 / 2C:12-1.1)"),
  s("b", "Crash involving only property damage: driver must stop", "MV"),
  s("c", "Duties: give name, address, license, registration and insurance, and render reasonable assistance to the injured"),
  s("d", "If no one is present to receive the information, report to the nearest police station"),
 ],
}

missing = []
for i, subs in SUBS.items():
    p = os.path.join(D, i + ".json")
    if not os.path.exists(p): missing.append(i); continue
    d = json.load(open(p, encoding="utf8")); d["subsections"] = subs
    json.dump(d, open(p, "w", encoding="utf8"), ensure_ascii=False, indent=2)
print(len(SUBS) - len(missing), "statutes updated; missing:", missing)
