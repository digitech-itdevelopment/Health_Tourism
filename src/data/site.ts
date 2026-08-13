// All content lifted verbatim from the design handoff prototype.
// Copy is bound by the handoff's Content Rules: no accreditation claims, indicative
// AUD ranges only, everything labelled placeholder. Read those rules before editing.

// The prototype disagrees with itself on the name (3× "Health Tourism", 1× "Arogya
// Bridge" in the consent line). The design project is named Arogya Bridge, so that wins.
export const BRAND = { first: 'Arogya', second: ' Bridge' } as const
export const BRAND_NAME = BRAND.first + BRAND.second

export const TAGLINE = 'World-class care. Half a world closer than you think.'

export type Hospital = {
  slug: string
  name: string
  city: string
  beds: number
  est: number
  tags: string[]
  blurb: string
}

export const HOSPITALS: Hospital[] = [
  {
    slug: 'meridian-institute-of-cardiac-sciences',
    name: 'Meridian Institute of Cardiac Sciences',
    city: 'Delhi NCR',
    beds: 780,
    est: 1998,
    tags: ['Cardiac Sciences', 'Cardiothoracic Surgery', 'Electrophysiology'],
    blurb: 'Tertiary cardiac centre with hybrid theatres and a dedicated international patient wing.',
  },
  {
    slug: 'sahyadri-multispecialty',
    name: 'Sahyadri Multispecialty',
    city: 'Pune',
    beds: 450,
    est: 2004,
    tags: ['Orthopaedics & Joint Replacement', 'Neurosurgery & Spine', 'Nephrology & Urology'],
    blurb: 'Multispecialty facility with computer-navigated joint replacement and on-site rehabilitation.',
  },
  {
    slug: 'coromandel-advanced-care',
    name: 'Coromandel Advanced Care',
    city: 'Chennai',
    beds: 620,
    est: 1994,
    tags: ['Oncology', 'Organ Transplant', 'Nephrology & Urology'],
    blurb: 'Oncology and transplant programmes supported by PET-CT and a dedicated transplant ICU.',
  },
  {
    slug: 'nilgiri-institute-of-orthopaedics',
    name: 'Nilgiri Institute of Orthopaedics',
    city: 'Bengaluru',
    beds: 310,
    est: 2009,
    tags: ['Orthopaedics & Joint Replacement', 'Neurosurgery & Spine', 'Cosmetic & Reconstructive'],
    blurb: 'Single-specialty orthopaedic hospital with robot-assisted arthroplasty and sports medicine.',
  },
  {
    slug: 'marine-drive-health-city',
    name: 'Marine Drive Health City',
    city: 'Mumbai',
    beds: 900,
    est: 1989,
    tags: ['Cardiac Sciences', 'Organ Transplant', 'Fertility & IVF'],
    blurb: 'Large quaternary campus with 24-hour interventional cardiology and an IVF unit.',
  },
  {
    slug: 'backwater-wellness-medical-centre',
    name: 'Backwater Wellness & Medical Centre',
    city: 'Kochi',
    beds: 260,
    est: 2007,
    tags: ['Ayurveda & Wellness', 'Orthopaedics & Joint Replacement', 'Ophthalmology'],
    blurb: 'Integrated acute care and licensed Ayurveda rehabilitation on a single riverside campus.',
  },
]

export const CITY_OPTIONS = [
  'All cities',
  ...[...new Set(HOSPITALS.map((h) => h.city))].sort(),
]

export const SPEC_OPTIONS = [
  'All specialties',
  ...[...new Set(HOSPITALS.flatMap((h) => h.tags))].sort(),
]

export const STATS = [
  { target: 40, suffix: '+', label: 'Partner hospitals' },
  { target: 18, suffix: '', label: 'Cities across India' },
  { target: 25, suffix: '+', label: 'Specialties covered' },
  { target: 5000, suffix: '+', label: 'International patients assisted' },
]

export const WHY_CARDS = [
  {
    mark: '01',
    title: 'No wait lists',
    body: 'Partner hospitals schedule elective surgery in weeks rather than months, against Australian public queues commonly reported at 12 to 18 months for joint replacement.',
    note: 'Timing depends on your assessment and the surgeon’s list.',
  },
  {
    mark: '02',
    title: 'Costs quoted in AUD',
    body: 'Every quote is issued in Australian dollars with the scope of inclusions itemised, so you can compare it against a domestic private estimate.',
    note: 'Indicative only, subject to medical assessment.',
  },
  {
    mark: '03',
    title: 'English-speaking care',
    body: 'English is the working clinical language in the hospitals we list, from the international patient office through to ward staff and discharge planning.',
    note: 'Interpreters available for travelling companions.',
  },
  {
    mark: '04',
    title: 'Direct flights',
    body: 'Direct services run from Sydney, Melbourne and Perth to major Indian cities, typically 11 to 13 hours, with no third-country transit.',
    note: 'Fitness to fly is confirmed at discharge review.',
  },
]

export const SPECIALTIES = [
  { mark: 'CS', name: 'Cardiac Sciences' },
  { mark: 'OR', name: 'Orthopaedics & Joint Replacement' },
  { mark: 'ON', name: 'Oncology' },
  { mark: 'NS', name: 'Neurosurgery & Spine' },
  { mark: 'TX', name: 'Organ Transplant' },
  { mark: 'IVF', name: 'Fertility & IVF' },
  { mark: 'BA', name: 'Bariatric Surgery' },
  { mark: 'DN', name: 'Dentistry' },
  { mark: 'OP', name: 'Ophthalmology' },
  { mark: 'CR', name: 'Cosmetic & Reconstructive' },
  { mark: 'NU', name: 'Nephrology & Urology' },
  { mark: 'AY', name: 'Ayurveda & Wellness' },
].map((sp, i) => ({ ...sp, id: `spec-${i}` }))

export const INFRA = [
  {
    title: 'Robot-assisted and navigated surgery',
    body: 'Available for arthroplasty, urology and selected oncology procedures at nominated sites.',
  },
  {
    title: 'PET-CT and 3T MRI on site',
    body: 'Staging and pre-operative imaging performed in-house, so scans are not repeated between facilities.',
  },
  {
    title: 'Dedicated international patient wings',
    body: 'Separate admissions, interpreters, attendant accommodation and single rooms.',
  },
  {
    title: 'Published ICU nurse-to-bed ratios',
    body: 'Each listing states the critical care ratio and whether intensivist cover is 24-hour.',
  },
  {
    title: 'Teleconsultation follow-up',
    body: 'Scheduled reviews with the operating team after you return to Australia, at AEST-friendly times.',
  },
]

export const JOURNEY = [
  { n: 'Step 01', title: 'Enquire', body: 'Send your details and any existing reports. No charge and no obligation.' },
  { n: 'Step 02', title: 'Medical records review', body: 'Your file is reviewed by specialists at up to three matched hospitals.' },
  { n: 'Step 03', title: 'Treatment plan & quote', body: 'A written plan and indicative AUD range, itemised, before you commit.' },
  { n: 'Step 04', title: 'e-Medical visa & travel', body: 'Hospital invitation letters, visa documentation, flights and transfers.' },
  { n: 'Step 05', title: 'Treatment & hospital stay', body: 'Admission, surgery and inpatient care with your coordinator on call.' },
  { n: 'Step 06', title: 'Recovery, tourism & aftercare', body: 'Discharge review, optional recovery stay, then teleconsults once home.' },
]

export const DESTINATIONS = [
  {
    id: 'dest-kerala',
    name: 'Kerala',
    line: 'Ground-floor rooms and licensed Ayurveda rehabilitation near the Kochi campus',
    meta: '40 min from hospital · daily physio',
  },
  {
    id: 'dest-goa',
    name: 'Goa',
    line: 'Low-stimulus coastal apartments with step-free access and a nurse on call',
    meta: '55 min from hospital · lift access',
  },
  {
    id: 'dest-rajasthan',
    name: 'Rajasthan',
    line: 'Serviced heritage stays for companions, with short outings once mobility returns',
    meta: 'Companion stays · flat terrain',
  },
  {
    id: 'dest-rishikesh',
    name: 'Rishikesh',
    line: 'Quiet riverside guesthouses with supervised movement and dietetic support',
    meta: '30 min from clinic · no stairs',
  },
]

export const STORIES = [
  {
    quote: 'The records review happened before I paid anything, and the plan I got back listed every line item. That was what convinced my wife more than the price did.',
    name: 'Placeholder patient A',
    meta: 'Geelong, VIC · Total knee replacement · Nilgiri Institute of Orthopaedics',
  },
  {
    quote: 'I had one coordinator the whole way through. She rang me at 8am Perth time the morning after surgery to tell me how it went.',
    name: 'Placeholder patient B',
    meta: 'Perth, WA · Cardiac bypass · Meridian Institute of Cardiac Sciences',
  },
  {
    quote: 'Two weeks in Kerala afterwards was not something I had planned for, but the surgeon cleared it and it made the trip feel less like a hospital stay.',
    name: 'Placeholder patient C',
    meta: 'Newcastle, NSW · Hip replacement · Backwater Wellness & Medical Centre',
  },
]

export const AMBASSADOR = {
  name: 'Priya Raghavan',
  role: 'Official India tourism ambassador, Australian market',
  bio: 'Based in Melbourne, Priya works between Australian patients and Indian hospital international-patient offices. She coordinates records review, visa documentation and recovery itineraries, and is the person you speak to when plans change.',
  quote: 'Most people arrive with the same three questions: is the hospital accredited, who is operating, and what happens if something goes wrong. We answer those in writing before anyone books a flight.',
  creds: [
    'Twelve years in hospital international patient services, Delhi and Chennai',
    'Member, Medical Travel Facilitator association (placeholder credential)',
    'Fluent in English, Hindi, Tamil and Malayalam',
  ],
  contact: 'priya@arogyabridge.example · +61 2 8000 0000 · Mon–Fri 9:00–17:30 AEST',
}

export const FAQS = [
  {
    q: 'What visa do I need, and how long does it take?',
    a: 'Australian passport holders generally apply for an e-Medical Visa, which requires an invitation letter from the treating hospital. We prepare the hospital documentation; the application itself is lodged by you. Processing times vary, so we plan for several weeks rather than days.',
  },
  {
    q: 'Will private health insurance or Medicare cover any of this?',
    a: 'Medicare does not cover treatment received overseas, and most Australian private policies exclude elective overseas surgery. A small number of policies cover overseas emergency care only. Check the specific terms with your insurer in writing before you commit to anything.',
  },
  {
    q: 'How long is the flight, and when can I fly home?',
    a: 'Direct flights from Sydney, Melbourne and Perth to major Indian cities run roughly 11 to 13 hours. Your fitness-to-fly date is set by the operating surgeon at your discharge review, not in advance, and depends on the procedure and your recovery.',
  },
  {
    q: 'Will my care team speak English?',
    a: 'English is a working language in the partner hospitals we list, including for clinical staff and international patient offices. Interpreters can be arranged for family members if needed.',
  },
  {
    q: 'Can someone travel with me?',
    a: 'Yes. Partner hospitals offer attendant accommodation in or near the ward, and we can arrange visas and airport transfers for one travelling companion as part of the same booking.',
  },
  {
    q: 'What does the quote include?',
    a: 'A written quote sets out surgeon and anaesthetist fees, theatre, implants or devices, standard inpatient stay, routine investigations and post-operative reviews before discharge. It excludes international flights, extended stay beyond the planned days, and treatment of unforeseen complications. The scope is listed line by line.',
  },
  {
    q: 'What aftercare do I get once I am home?',
    a: 'You are discharged with imaging, operative notes and a rehabilitation plan for your Australian GP or physiotherapist. Teleconsultation follow-up with the operating team is scheduled at set intervals, and your case coordinator stays contactable during AEST hours.',
  },
  {
    q: 'What happens if there are complications?',
    a: 'Complications are managed by the treating hospital under its own clinical governance and complaints processes, which are explained to you before you travel. Once home, care is provided by your Australian clinicians. We recommend discussing this scenario, and appropriate travel insurance, with your treating doctor beforehand.',
  },
]

export const ENQUIRY_POINTS = [
  'Records reviewed by specialists before any payment is discussed',
  'Written, itemised indicative quote in Australian dollars',
  'One named coordinator, contactable in AEST business hours',
]

export const TREATMENT_OPTIONS = [
  'Knee Replacement',
  'Hip Replacement',
  'Cardiac Bypass (CABG)',
  'Spinal Fusion',
  'Bariatric Surgery',
  'Fertility & IVF',
]

export const ENQUIRY_CITIES = [
  'Delhi NCR',
  'Mumbai',
  'Chennai',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Kochi',
]

// ─── Hospital profile (prototype ships detail for one facility only) ───────────

export const HOSPITAL_DETAIL = {
  about1: 'Meridian Institute of Cardiac Sciences is a placeholder tertiary cardiac facility on a single campus in Delhi NCR, with 780 beds including 140 critical care beds across coronary, cardiothoracic and post-transplant units.',
  about2: 'The international patient office handles admission, interpreter support, attendant accommodation and discharge documentation. Teleconsultation follow-up is scheduled at two, six and twelve weeks after you return home.',
  centres: [
    { name: 'Interventional cardiology', note: 'Two cath labs, 24-hour cover' },
    { name: 'Cardiothoracic surgery', note: 'Hybrid theatre, on-pump and beating heart' },
    { name: 'Electrophysiology', note: 'Ablation and device implantation' },
    { name: 'Heart failure & transplant', note: 'Dedicated post-transplant ICU' },
    { name: 'Preventive cardiology', note: 'Pre-travel and pre-op workup' },
    { name: 'Cardiac rehabilitation', note: 'Inpatient and outpatient programmes' },
  ],
  costs: [
    { proc: 'Coronary artery bypass (CABG)', range: 'AUD 11,500 – 16,500', stay: '6–8 days' },
    { proc: 'Angioplasty with stent', range: 'AUD 5,500 – 9,000', stay: '2–3 days' },
    { proc: 'Heart valve replacement', range: 'AUD 12,000 – 19,000', stay: '7–9 days' },
    { proc: 'Pacemaker implantation', range: 'AUD 6,000 – 10,000', stay: '2–3 days' },
  ],
  facts: [
    { k: 'Beds', v: '780' },
    { k: 'Critical care beds', v: '140' },
    { k: 'ICU nurse-to-bed', v: '1:1' },
    { k: 'Operating theatres', v: '12' },
    { k: 'International wing', v: 'Yes' },
    { k: 'Airport transfer', v: 'Included' },
    { k: 'Nearest airport', v: '22 km' },
  ],
  gallery: [
    { id: 'hp-exterior', alt: 'Hospital exterior and entrance' },
    { id: 'hp-theatre', alt: 'Cardiac operating theatre' },
    { id: 'hp-room', alt: 'International patient wing single room' },
  ],
}

// ─── Treatment detail: knee replacement ───────────────────────────────────────

export const KNEE = {
  eyebrow: 'Orthopaedics & joint replacement',
  title: 'Knee Replacement',
  intro: 'Total and partial knee arthroplasty at accredited partner hospitals, with pre-travel records review and a written treatment plan before you book anything.',
  about1: 'A knee replacement resurfaces the damaged ends of the femur and tibia with metal and polyethylene components. It is generally considered for advanced osteoarthritis where pain and mobility loss persist despite conservative management. Whether you are a candidate, and whether a partial or total replacement is appropriate, is a decision for the operating surgeon after reviewing your imaging and history.',
  about2: 'Partner hospitals report using computer-navigated and, at some sites, robot-assisted alignment. Anaesthetic approach, implant selection and rehabilitation protocol vary by surgeon and are set out in your treatment plan.',
  risks: 'All surgery carries risk, including infection, blood clots, implant complications and reactions to anaesthesia. Long-haul flying after lower-limb surgery carries additional thrombosis risk and requires clearance. Discuss suitability, timing and post-operative care with your treating doctor in Australia before making any arrangements.',
  costs: [
    { proc: 'Total knee replacement, one side', range: 'AUD 8,500 – 12,000', stay: '4–5 days' },
    { proc: 'Total knee replacement, both sides', range: 'AUD 14,000 – 19,500', stay: '6–8 days' },
    { proc: 'Partial (unicompartmental) knee', range: 'AUD 7,000 – 10,000', stay: '3–4 days' },
    { proc: 'Revision knee replacement', range: 'AUD 13,000 – 21,000', stay: '6–9 days' },
  ],
  timeline: [
    { when: 'Weeks −6', title: 'Records review', body: 'X-rays, MRI if available, medication list and comorbidity history reviewed by the operating surgeon.' },
    { when: 'Weeks −4', title: 'Plan, quote and dates', body: 'Written treatment plan, indicative range and provisional theatre dates. Visa documentation begins.' },
    { when: 'Day 0–1', title: 'Arrival and pre-operative workup', body: 'Transfer from airport, bloods, anaesthetic review and consent.' },
    { when: 'Day 2–6', title: 'Surgery and inpatient stay', body: 'Procedure, then supervised mobilisation from the first post-operative day.' },
    { when: 'Day 7–18', title: 'Outpatient rehabilitation', body: 'Physiotherapy, wound review and discharge assessment before any travel clearance.' },
    { when: 'Week 3+', title: 'Home and follow-up', body: 'Operative notes and imaging to your Australian GP, with scheduled teleconsults.' },
  ],
  facts: [
    { k: 'Specialty', v: 'Orthopaedics' },
    { k: 'Indicative range', v: 'AUD 8,500 – 12,000' },
    { k: 'Hospital stay', v: '4–5 days' },
    { k: 'Total time in India', v: '18–21 days' },
    { k: 'Partner hospitals', v: '11' },
    { k: 'Cities', v: '7' },
  ],
}

// ─── Why India ────────────────────────────────────────────────────────────────

export const COMPARE = [
  { proc: 'Total knee replacement', wait: '12–18 months', au: 'AUD 25,000 – 32,000', in: 'AUD 8,500 – 12,000' },
  { proc: 'Total hip replacement', wait: '10–16 months', au: 'AUD 24,000 – 30,000', in: 'AUD 8,000 – 11,500' },
  { proc: 'Coronary bypass (CABG)', wait: 'Clinically prioritised', au: 'AUD 45,000 – 60,000', in: 'AUD 11,500 – 16,500' },
  { proc: 'Spinal fusion, single level', wait: '9–15 months', au: 'AUD 30,000 – 45,000', in: 'AUD 9,500 – 15,000' },
  { proc: 'Bariatric (sleeve gastrectomy)', wait: 'Rarely public-funded', au: 'AUD 18,000 – 25,000', in: 'AUD 7,000 – 10,000' },
  { proc: 'Cataract surgery, per eye', wait: '6–12 months', au: 'AUD 3,500 – 5,000', in: 'AUD 1,400 – 2,400' },
]

export const VETTING = [
  { n: 'Check 01', title: 'Current documentation', body: 'We ask for the facility’s own accreditation certificates, licences and renewal dates, and re-request them annually. What a hospital holds is stated on its listing in its own words.' },
  { n: 'Check 02', title: 'A site visit', body: 'Someone from our team walks the wards, theatres, ICU and international patient wing before a facility is listed, and again at least every two years.' },
  { n: 'Check 03', title: 'Named clinicians', body: 'We record which consultants perform the procedures we refer for, their registration details and their sub-specialty, so you know who is operating before you fly.' },
  { n: 'Check 04', title: 'Written pricing scope', body: 'Every partner agrees to quote in AUD with inclusions and exclusions itemised, and to flag any change in scope in writing before it is incurred.' },
  { n: 'Check 05', title: 'Complaints pathway', body: 'Each hospital gives us its clinical governance and complaints process in writing. We pass it to you before you travel, not after something goes wrong.' },
]

export const NOT_CLAIMS = [
  'No success rates, survival figures or complication statistics — we are not the source of that data and will not repackage it.',
  'No "best", "safest" or "painless". Australian healthcare advertising rules exist for good reason.',
  'No fixed price before assessment. Every figure on this site is a range and says so.',
  'No clinical advice. We are not clinicians; your treating doctor in Australia and the operating surgeon decide what happens.',
]

// ─── Your journey ─────────────────────────────────────────────────────────────

export const TRIP_WEEKS = [
  {
    title: 'Week one',
    tag: 'Arrival and surgery',
    days: [
      { day: 'Day 1', title: 'Arrival and settle', body: 'Airport pickup, transfer to hospital-adjacent accommodation, rest. No appointments scheduled.' },
      { day: 'Day 2', title: 'Consultant review and workup', body: 'Face-to-face consultation, bloods, ECG, chest imaging, anaesthetic review. Treatment plan confirmed or adjusted.' },
      { day: 'Day 3', title: 'Admission and surgery', body: 'Morning admission, procedure, transfer to recovery then ward. Your coordinator calls your nominated contact in Australia the same day.' },
      { day: 'Day 4', title: 'First mobilisation', body: 'Supervised standing and a few steps with the physiotherapist. Pain management reviewed.' },
      { day: 'Days 5–7', title: 'Inpatient rehabilitation', body: 'Twice-daily physio, wound checks, stair practice before discharge is considered.' },
    ],
  },
  {
    title: 'Week two',
    tag: 'Discharge and outpatient rehab',
    days: [
      { day: 'Day 8', title: 'Discharge', body: 'Discharge summary, imaging, medication list and rehabilitation plan issued. Transfer to recovery accommodation.' },
      { day: 'Days 9–12', title: 'Daily outpatient physio', body: 'Sessions at the hospital or in-room, depending on mobility. Driver on call for appointments.' },
      { day: 'Day 13', title: 'Wound review', body: 'Clips or sutures assessed, dressings changed, bloods repeated if indicated.' },
      { day: 'Day 14', title: 'Quiet day', body: 'No appointments. Companions often take a short local outing at this point; you rest.' },
    ],
  },
  {
    title: 'Week three',
    tag: 'Clearance and flight home',
    days: [
      { day: 'Days 15–18', title: 'Rehabilitation continues', body: 'Range-of-motion targets, walking distance built up, stair confidence assessed.' },
      { day: 'Day 19', title: 'Surgeon review', body: 'Final imaging if required. Fitness-to-fly assessed, including thrombosis precautions for the flight.' },
      { day: 'Day 20', title: 'Clearance and paperwork', body: 'Written clearance, operative notes and rehab plan handed over for your Australian GP and physiotherapist.' },
      { day: 'Day 21', title: 'Flight home', body: 'Transfer to airport with aisle seating and any mobility assistance pre-arranged.' },
      { day: 'Week 5+', title: 'Teleconsults', body: 'Scheduled reviews with the operating team at two, six and twelve weeks, at AEST-friendly times.' },
    ],
  },
]

export const DOCS = [
  'Passport valid at least six months beyond travel',
  'Recent imaging: X-ray, MRI or CT, on disc or as files',
  'Referral or specialist letter from your Australian doctor',
  'Current medication list, including blood thinners',
  'Travel insurance details and next-of-kin contact',
]

// ─── About ────────────────────────────────────────────────────────────────────

export const ABOUT_STORY = [
  `${BRAND_NAME} began in 2019 after our founder spent fourteen months on a public list for a knee that had already stopped her working. The private quote she was given at home was more than the car in her driveway. She went to Chennai on a friend's recommendation, and came back with the strong impression that the hard part was not the surgery but the arranging.`,
  'There was no single person to ask, no way to compare one hospital against another on the same terms, and no one in Australia to call once she was home. We built the company around those three gaps, in that order.',
  'Today we work with six partner hospitals in six cities. That number stays deliberately small: we visit each one, we know the international patient officers by name, and we would rather turn an enquiry away than place someone somewhere we have not seen.',
]

export const ABOUT_FACTS = [
  { v: '2019', k: 'Founded' },
  { v: '6', k: 'Partner hospitals' },
  { v: '7', k: 'Staff, Sydney and Chennai' },
  { v: '100%', k: 'Facilities visited in person' },
]

export const TEAM = [
  { id: 'team-1', name: 'Priya Raghavan', role: 'Founder & ambassador', bio: 'Twelve years in hospital international patient services in Delhi and Chennai before founding the company.' },
  { id: 'team-2', name: 'Daniel Okafor', role: 'Head of case coordination', bio: 'Runs the Sydney desk. Former private hospital admissions manager. Your first call when plans change.' },
  { id: 'team-3', name: 'Meera Shah', role: 'Hospital partnerships', bio: 'Based in Chennai. Handles site visits, documentation renewals and pricing scope agreements.' },
  { id: 'team-4', name: 'Tom Brennan', role: 'Travel & logistics', bio: 'Visas, flights, transfers and recovery accommodation, including companion arrangements.' },
]

export const ABOUT_PRINCIPLES = [
  { title: 'How we are paid', body: 'Partner hospitals pay us a facilitation fee that is disclosed in your quote. You are not charged for an enquiry, a records review or a quote, and the fee does not change with the procedure you choose.' },
  { title: 'What we are not', body: 'We are not a hospital, an insurer or a medical practice. We hold no clinical role and give no medical advice.' },
  { title: 'When we say no', body: 'If your case is better managed at home, or a partner cannot take it safely, we say so and stop. We would rather lose the booking.' },
]

// ─── Footer ───────────────────────────────────────────────────────────────────

export const SOCIALS = [
  { mark: 'in', label: 'LinkedIn' },
  { mark: 'fb', label: 'Facebook' },
  { mark: 'ig', label: 'Instagram' },
  { mark: 'yt', label: 'YouTube' },
]

export const FOOTER_DISCLAIMER = `${BRAND_NAME} is a medical travel facilitation service. We are not a medical provider and do not provide medical advice, diagnosis or treatment. All treatment decisions rest with the treating hospital and clinicians. Consult your treating doctor in Australia before making arrangements to travel for medical care. Hospital names, statistics, testimonials and pricing shown on this prototype are placeholders and do not represent real facilities or outcomes.`

export const CONTACT = {
  address: ['Level 8, 100 Placeholder St', 'Sydney NSW 2000'],
  phone: '+61 2 8000 0000',
  email: 'hello@arogyabridge.example',
  hours: 'Mon–Fri 9:00–17:30 AEST',
}

export const COST_DISCLAIMER =
  'Indicative only, subject to medical assessment. Ranges exclude flights and are not a quote.'
