// Every photo slot on the site, in one place.
//
// `alt` is what ships to screen readers (the handoff specifies alt text per slot).
// `prompt` drives generation — scripts/gen-images.mjs feeds these to grok's image_gen.
// Until a file exists at /images/<id>.png, <ImageSlot> renders a labelled placeholder.

export const HOUSE_STYLE =
  'Photorealistic editorial photograph, natural available light, muted natural colour, ' +
  'shallow depth of field, calm and reassuring, documentary rather than staged. ' +
  'No text, no signage, no logos, no watermarks, no visible brand names.'

export type ImageSpec = {
  id: string
  alt: string
  prompt: string
  ar: '16:9' | '4:3' | '3:4' | '1:1'
}

export const IMAGES: ImageSpec[] = [
  // ── Hero (4) — landscape, dark-tolerant: a scrim sits over these ──
  {
    id: 'hero-atrium',
    alt: 'Daylight atrium of a modern private hospital in India',
    prompt: 'The bright daylight atrium of a modern private hospital in India. Tall glass curtain wall, pale stone floor, indoor planting, reception desk in the middle distance, a few people walking. Warm morning light.',
    ar: '16:9',
  },
  {
    id: 'hero-theatre',
    alt: 'Surgical team at work in an operating theatre',
    prompt: 'An Indian surgical team in blue scrubs and masks working under theatre lights in a modern operating theatre. Focused, calm, mid-procedure, viewed from a respectful distance. No blood, no exposed patient.',
    ar: '16:9',
  },
  {
    id: 'hero-kerala',
    alt: 'Kerala backwaters at first light',
    prompt: 'The Kerala backwaters at first light. Still green water, coconut palms along the bank, a single traditional houseboat, low mist. Serene and unpeopled.',
    ar: '16:9',
  },
  {
    id: 'hero-clinician',
    alt: 'An older patient in conversation with a clinician',
    prompt: 'An Indian doctor in a white coat sitting and talking with an older Australian patient in a bright consulting room. Both seated at the same level, unhurried conversation, notes on the table.',
    ar: '16:9',
  },

  // ── Specialty tiles (12) — landscape, crop to 132px tall ──
  { id: 'spec-0', alt: 'Cardiac catheterisation laboratory', prompt: 'A modern cardiac catheterisation laboratory in an Indian hospital, angiography equipment and monitors, empty and immaculate.', ar: '4:3' },
  { id: 'spec-1', alt: 'Orthopaedic surgery and joint replacement', prompt: 'An orthopaedic operating theatre in an Indian hospital with computer-navigation screens and instrument trays laid out, empty between cases.', ar: '4:3' },
  { id: 'spec-2', alt: 'Oncology treatment suite', prompt: 'A calm oncology day-treatment suite in an Indian hospital, reclining chairs by a window, soft daylight, no patients.', ar: '4:3' },
  { id: 'spec-3', alt: 'Neurosurgery and spine imaging', prompt: 'A neurosurgical operating microscope beside spine imaging displayed on wall monitors in an Indian hospital theatre.', ar: '4:3' },
  { id: 'spec-4', alt: 'Organ transplant intensive care unit', prompt: 'A dedicated transplant intensive care bay in an Indian hospital, single bed, monitoring equipment, glass partition, very clean.', ar: '4:3' },
  { id: 'spec-5', alt: 'Fertility and IVF laboratory', prompt: 'An IVF embryology laboratory in an Indian hospital, laminar flow hood and microscope, technician in full gown at work.', ar: '4:3' },
  { id: 'spec-6', alt: 'Bariatric surgery theatre', prompt: 'A laparoscopic surgery theatre in an Indian hospital with a tower of keyhole equipment and a large monitor, prepared for a case.', ar: '4:3' },
  { id: 'spec-7', alt: 'Dental treatment room', prompt: 'A modern dental surgery room in an Indian clinic, dental chair by a window, instruments neatly arranged, bright and clean.', ar: '4:3' },
  { id: 'spec-8', alt: 'Ophthalmology examination room', prompt: 'An ophthalmology examination room in an Indian hospital, slit lamp and eye chart, warm lamp light.', ar: '4:3' },
  { id: 'spec-9', alt: 'Reconstructive surgery consulting room', prompt: 'A quiet plastic and reconstructive surgery consulting room in an Indian hospital, examination couch, anatomical model on the desk.', ar: '4:3' },
  { id: 'spec-10', alt: 'Dialysis and renal care unit', prompt: 'A renal dialysis unit in an Indian hospital, a row of dialysis machines beside reclining chairs, daylight from high windows.', ar: '4:3' },
  { id: 'spec-11', alt: 'Ayurveda and wellness treatment room', prompt: 'A traditional Kerala Ayurveda treatment room, carved wooden droni table, brass vessels of herbal oil, warm lamp light.', ar: '4:3' },

  // ── Partner hospital exteriors (6) — used on home carousel and directory ──
  { id: 'hosp-0', alt: 'Exterior of Meridian Institute of Cardiac Sciences, Delhi NCR', prompt: 'The exterior of a large modern cardiac hospital in Delhi, glass and pale stone facade, landscaped drop-off forecourt, late afternoon light.', ar: '16:9' },
  { id: 'hosp-1', alt: 'Exterior of Sahyadri Multispecialty, Pune', prompt: 'The exterior of a mid-sized multispecialty hospital in Pune, six storeys, clean modern architecture, mature trees at the entrance.', ar: '16:9' },
  { id: 'hosp-2', alt: 'Exterior of Coromandel Advanced Care, Chennai', prompt: 'The exterior of a large hospital campus in Chennai, curved glass frontage, palm trees, bright tropical daylight.', ar: '16:9' },
  { id: 'hosp-3', alt: 'Exterior of Nilgiri Institute of Orthopaedics, Bengaluru', prompt: 'The exterior of a compact specialist orthopaedic hospital in Bengaluru, brick and glass, garden forecourt, soft overcast light.', ar: '16:9' },
  { id: 'hosp-4', alt: 'Exterior of Marine Drive Health City, Mumbai', prompt: 'The exterior of a very large hospital tower in Mumbai near the seafront, tall modern building, wide approach road, hazy coastal light.', ar: '16:9' },
  { id: 'hosp-5', alt: 'Exterior of Backwater Wellness & Medical Centre, Kochi', prompt: 'The exterior of a low riverside medical and wellness campus in Kochi, whitewashed walls, sloping tiled roofs, coconut palms, water beyond.', ar: '16:9' },

  // ── Medical infrastructure (2) ──
  { id: 'infra-theatre', alt: 'Robotic surgical system in an operating theatre', prompt: 'A robotic surgical system with articulated arms positioned over an operating table in a modern Indian theatre, prepared and unoccupied.', ar: '4:3' },
  { id: 'infra-imaging', alt: 'PET-CT or 3T MRI suite', prompt: 'A 3T MRI scanner in a softly lit imaging suite in an Indian hospital, curved bore, calm empty room.', ar: '4:3' },

  // ── Recovery stays (4) — render 400px tall, portrait-friendly ──
  { id: 'dest-kerala', alt: 'Recovery accommodation in Kerala', prompt: 'A quiet ground-floor guest room opening onto a green Kerala backwater garden, step-free veranda, cane chairs, morning light.', ar: '3:4' },
  { id: 'dest-goa', alt: 'Recovery accommodation in Goa', prompt: 'A calm coastal apartment terrace in Goa with a level walkway to the sea view, soft evening light, no crowds.', ar: '3:4' },
  { id: 'dest-rajasthan', alt: 'Recovery accommodation in Rajasthan', prompt: 'A serviced heritage courtyard stay in Rajasthan, sandstone arches, shaded seating, flat paved terrain, warm late light.', ar: '3:4' },
  { id: 'dest-rishikesh', alt: 'Recovery accommodation in Rishikesh', prompt: 'A quiet riverside guesthouse terrace above the Ganges at Rishikesh, forested hills, still early morning, no people.', ar: '3:4' },

  // ── Portraits (2) ──
  { id: 'story-portrait', alt: 'Portrait of a patient', prompt: 'A relaxed portrait of an Australian man in his sixties seated by a window at home, gentle natural light, warm and candid.', ar: '1:1' },
  { id: 'ambassador', alt: 'Portrait of Priya Raghavan, ambassador', prompt: 'A professional portrait of an Indian-Australian woman in her forties in a bright office, business dress, confident and approachable.', ar: '3:4' },

  // ── Hospital profile gallery (3) ──
  { id: 'hp-exterior', alt: 'Hospital exterior and entrance', prompt: 'The main entrance canopy of a large Indian cardiac hospital, covered drop-off, glass doors, planted beds, daylight.', ar: '16:9' },
  { id: 'hp-theatre', alt: 'Cardiac operating theatre', prompt: 'A cardiac operating theatre in an Indian hospital, perfusion equipment and overhead lights, spotless and prepared between cases.', ar: '16:9' },
  { id: 'hp-room', alt: 'International patient wing single room', prompt: 'A single patient room in an international patient wing of an Indian hospital, hotel-like finish, armchair for a companion, large window.', ar: '16:9' },

  // ── One-offs (1) ──
  { id: 'knee-hero', alt: 'Orthopaedic surgical suite', prompt: 'An orthopaedic surgical suite in an Indian hospital prepared for a knee replacement, navigation screen and instrument trays, bright and clinical.', ar: '16:9' },
]

export const IMAGE_BY_ID = Object.fromEntries(IMAGES.map((i) => [i.id, i]))
