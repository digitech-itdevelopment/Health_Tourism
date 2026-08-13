# Handoff: Health Tourism — India medical travel facilitation site

## Overview
A seven-page marketing and directory site for **Health Tourism**, a placeholder-branded medical travel facilitation company that connects Australian patients (40–70, cautious, research-heavy) with partner hospitals in India. The site's job is reassurance before price: credentials, process transparency and itemised indicative costs, ending in a free-quote enquiry funnel.

Tagline: *"World-class care. Half a world closer than you think."*

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look and behaviour, not production code to copy directly. `Health Tourism.dc.html` is a single-file prototype built on an internal streaming-component runtime (`support.js`); it is not a framework you should adopt.

The task is to **recreate these designs in the target codebase's existing environment** (React, Next.js, Vue, etc.) using its established routing, component and styling patterns. If no environment exists yet, choose the framework that suits the project and implement there. In particular: the seven "pages" in the prototype are a single component switching on a `page` state string — in a real build these should be **seven routes**.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, animation timings and copy. Recreate pixel-accurately using the codebase's own component library where equivalents exist.

Photography is **not** included. Every image area in the prototype is a drop-target placeholder (`<image-slot>`); each is listed under Assets with the shot it needs.

---

## Screens / Views

All pages share the fixed header and the footer described at the end of this section. Content max-width is **1280px**, centred, with 24px side padding. Section vertical padding is 96px on the home page, 64–80px on interior pages.

### 1. Home (`/`)
Primary page. Fourteen sections in order:

1. **Header** — see Shared Chrome.
2. **Hero** — full-bleed, `min-height: 88vh`, background `#16181A`. Four crossfading background layers (`opacity` transition 1600ms) each holding an image slot, with a Ken Burns `scale(1) → scale(1.12)` over 18s alternating. Overlay gradient top-to-bottom: `rgba(22,24,26,0.78)` → `0.55` at 45% → `0.86`. Centred content, max-width 900px, padding `150px 24px 90px`: mono eyebrow `India · For Australian patients` (12px, `0.18em` tracking, uppercase, `#2EA184`); H1 `clamp(34px, 5.2vw, 60px)` / 700 / line-height 1.12 / `-0.025em` / `#fff`; subhead 18px `#D8DCDF` max-width 620px; then the search bar; then a 13px `#9BA1A6` disclaimer line.
   **Search bar**: white 96%-opacity panel, radius 16px, padding 10px, shadow `0 20px 50px rgba(22,24,26,0.35)`, max-width 760px. Flex row, gap 10px: treatment `<select>` (flex 1 1 220px), city `<select>` (flex 1 1 170px), submit button (jade `#186A57`, radius 11px, padding 14px 30px, 15px/600). Submitting routes to the directory.
3. **Trust bar** — white band, bottom border `#E6E8EA`. A centred 15.5px `#7A8085` paragraph about listing documentation, then a 4-column stat grid above a `#F1F3F4` top border: numbers `Plus Jakarta Sans` 700 / 42px / `#186A57`, labels 14.5px `#7A8085`. Values: **40+ Partner hospitals, 18 Cities across India, 25+ Specialties covered, 5,000+ International patients assisted.** These count up on entering the viewport.
4. **Why India, Why Now** (`#why` anchor) — `#F7F8F8`. Eyebrow + H2 `clamp(28px,3.4vw,42px)` + intro, then a 4-card auto-fit grid (min 260px, gap 24px). Card: white, 1px `#E6E8EA`, radius 16px, padding `30px 26px 32px`; 44px rounded-square numeral chip (`#ECEFF0` bg, `#186A57` text, radius 12px); H3 20px/600; body 15.5px `#5C6268`; a 13px `#7A8085` note above a `#F1F3F4` top border. The four: No wait lists / Costs quoted in AUD / English-speaking care / Direct flights.
5. **Browse by Specialty** — white. Header row (eyebrow, H2, right-aligned "View all hospitals →"). **Fixed 4-column grid**, gap 16px: `repeat(4, minmax(0,1fr))`, dropping to 3 columns ≤1080px and 2 ≤760px. Tile: white card, radius 16px, `overflow:hidden`; 132px image slot on top; footer row with a 34px chip (2–3 letter mark) and the specialty name (15.5px/600). Twelve specialties: Cardiac Sciences, Orthopaedics & Joint Replacement, Oncology, Neurosurgery & Spine, Organ Transplant, Fertility & IVF, Bariatric Surgery, Dentistry, Ophthalmology, Cosmetic & Reconstructive, Nephrology & Urology, Ayurveda & Wellness.
6. **Our Partner Hospitals** — `#ECEFF0` tint. **Centrepiece carousel**: 3 cards visible, 6 hospitals total, track `transform: translateX(calc(-slide * (100% + 24px) / 3))`, 500ms. Card (flex-basis `calc((100% - 48px)/3)`): white, radius 16px, 190px image slot, then padding 24px — hospital name 18.5px/600, `city · N beds` 14px `#7A8085`, three specialty pills (12.5px, 1px `#E6E8EA` border, radius 8px), "View Hospital →" link. Arrows are **circular 48px buttons overlaying the card edges** at `left:-22px` / `right:-22px`, vertically centred, `opacity:0` until the carousel is hovered or focused within. Dots below: 8px, active pill widens to 28px and turns `#186A57`.
7. **Medical Infrastructure** — white, 2-column. Left: 380px image slot with a second 180px slot overlapping bottom-right (6px white border), the pair on a `data-parallax="0.04"` translate. Right: eyebrow, H2, intro, then a 5-item list separated by `#F1F3F4` top borders, each with a 7px jade square marker, 16px/600 title and 15px body.
8. **Your Journey** (`#journey`) — `#16181A`. Six-column auto-fit grid; each step is a `<li>` with a 2px `rgba(46,161,132,0.5)` top rule, mono "Step 0N" in `#2EA184`, 17.5px/600 white title, 14.5px `#A7ADB3` body.
9. **Recovery stays** — `#F7F8F8`. Reframed tourism section: heading *"The fortnight between discharge and the flight home"*, copy about surgeon clearance. Four 400px destination cards (Kerala, Goa, Rajasthan, Rishikesh) on a `data-parallax="0.03"` container: full-bleed image slot scaling to 1.07 on hover (600ms), bottom scrim `rgba(22,24,26,0) 40% → 0.85`, then name (22px/700 white), a line of what the stay provides, and a mono meta line (distance from hospital, access notes).
10. **Patient Stories** — white. Header row with prev/next 46px square buttons. Panel: `#F7F8F8`, 1px border, radius 16px, padding `clamp(28px,4vw,52px)`, 2-column — quote at `clamp(19px,2.2vw,26px)` / 500 / line-height 1.5, attribution, a 12.5px grey "Placeholder testimonial" note, and a 280px portrait slot. `aria-live="polite"`.
11. **Meet Your Ambassador** (`#about` anchor on home) — `#ECEFF0`, 2-column: 440px portrait slot; right column has eyebrow, name H2, role line, bio, a pull-quote (3px `#2EA184` left border, white, radius `0 12px 12px 0`), three credential bullets, contact line.
12. **FAQ** — white, max-width 900px. Eight rows separated by 1px `#E6E8EA` top borders. Each row: full-width `<button aria-expanded>` with 17.5px/600 question and a 28px `#ECEFF0` chip showing `+` / `−`; panel animates `max-height 0 → 420px` and `opacity 0 → 1` over 400ms. One open at a time (index 0 default).
13. **Enquiry form** (`#enquire`) — `#F7F8F8`, 2-column. Left: eyebrow, H2, intro, three bullets. Right: white card, radius 16px, padding 32px, `display:grid; gap:16px`. Fields — Full name + Email (row), Australian phone + Treatment (row), Preferred city + Timeframe (row), Message textarea, consent checkbox (required, `accent-color:#186A57`), full-width jade submit, and a 12.5px note that submissions go nowhere in the prototype.
14. **Footer** — see Shared Chrome.

### 2. Hospital Directory (`/hospitals`)
Dark 64px page header (eyebrow, H1, sub). Below it a **sticky filter bar** (`top:66px`, white, z-index 40): City `<select>`, Specialty `<select>`, then right-aligned result count (`N of 6 hospitals`) and a Grid/List segmented toggle (1px border, radius 10px, active segment `#16181A` on white text, `aria-pressed`).

Results grid: `repeat(auto-fill, minmax(300px,1fr))` in grid mode, `1fr` in list mode. Card flex-direction flips `column` → `row`, and the media pane goes `0 0 190px` → `0 0 280px`. Card content: name, `city · N beds · est. YYYY`, blurb, three specialty pills, "View Hospital →".

**No accreditation badges anywhere** — see Content Rules.

### 3. Hospital Profile (`/hospitals/:slug`)
Dark header with "← All hospitals", H1, `city · N beds · established YYYY`, and a jade CTA. A 3-up gallery strip of 200px image slots pulled up `translateY(-32px)` over the white body. Body is 2-column, sticky sidebar at `top:100px`:
- **Left**: "About the facility" (2 paragraphs); "Centres of excellence" (6 tiles, `#F7F8F8`, radius 14px, name + note); "Indicative treatment costs" table (Procedure / Indicative AUD range / Typical stay) with a highlighted mint disclaimer strip below.
- **Right**: "At a glance" definition list (Beds, Critical care beds, ICU nurse-to-bed, Operating theatres, International wing, Airport transfer, Nearest airport), jade CTA, placeholder note.

### 4. Treatment Detail — Knee Replacement (`/treatments/knee-replacement`)
`#ECEFF0` hero: specialty eyebrow, H1, intro, two CTAs (jade primary, white bordered secondary), 320px image slot. Body 2-column with sticky Summary sidebar:
- "What the procedure involves" (2 paragraphs)
- "Indicative costs in AUD" table (4 rows: total one side, total both sides, partial, revision) + disclaimer strip
- "A typical trip" — 6-row timeline, mono `when` column at 90px
- "Risks and things to discuss with your doctor"
- Sidebar: Specialty, Indicative range, Hospital stay, Total time in India, Partner hospitals, Cities + jade CTA.

### 5. Why India (`/why-india`)
Dark header. Then:
- **Comparison table** (max-width 1080px): Procedure / AU public wait / AU private estimate / India indicative AUD, 6 rows, header row `#ECEFF0`, India column in `#186A57` 600. Disclaimer strip below.
- **How a hospital gets onto this list** — `#ECEFF0` band, five "Check 0N" cards, plus a white panel titled "What we will not tell you" with four bullets (no success rates, no superlatives, no fixed price pre-assessment, no clinical advice).
- Dark closing CTA band.

### 6. Your Journey (`/your-journey`)
Dark header, then three week blocks (max-width 1000px). Each: H2 + mono tag on a 2px `#E6E8EA` rule, then day rows (`Day N` mono column at 76px, title 16.5px/600, body 15.5px) separated by 1px rules. Ends with two side-by-side panels: "Documents to have ready" (5 bullets) and "Who is with you".

### 7. About (`/about`)
Dark header. "How this started" (3 paragraphs) beside a 460px image slot, with a 4-stat row beneath (2019 Founded / 6 Partner hospitals / 7 Staff / 100% Facilities visited). Then a `#ECEFF0` team band — four cards, 220px portrait slot each, name / role in jade / one-line bio. Then three principle cards: How we are paid, What we are not, When we say no.

### Shared Chrome
**Header** — `position: fixed`, full width, z-index 60. Transparent over the home hero; on scroll past 40px (and on every non-home page) it transitions to `rgba(255,255,255,0.96)` with `0 1px 0 rgba(22,24,26,0.08), 0 8px 24px rgba(22,24,26,0.06)`, and link colour flips `#fff → #16181A`. Transition 400ms. Contents: logo lockup left; nav right with Hospitals, Treatments, Why India, Your Journey, About, then the jade "Request a Free Quote" button. Secondary links hide ≤1040px; the CTA shrinks ≤620px. All links `white-space: nowrap`.

**Logo** — two overlapping rings, 44×30 viewBox: `circle(16,15,r11.5)` stroke `#186A57` and `circle(28,15,r11.5)` stroke `#4FB79A`, stroke-width 3, no fill. On dark backgrounds the second ring is `#F7F8F8` at 0.85 opacity. Wordmark: "Health" 700 + " Tourism" 500 at 0.72 opacity, 19px Plus Jakarta Sans, `-0.015em`.

**Footer** — `#16181A`, 72px top padding. Four columns (logo + tagline + four 36px social squares; Explore; Support; Contact with AEST hours), divided by `rgba(255,255,255,0.12)`, then a bottom row with the full medical disclaimer (13px `#8C9298`, max-width 820px) and the copyright.

---

## Interactions & Behavior

| Behaviour | Spec |
|---|---|
| Hero rotation | Crossfade every 6s, 1600ms opacity transition, Ken Burns 18s alternating |
| Scroll reveal | `translateY(24px)` + opacity 0 → 1, 600ms, staggered 80ms in groups of 8; fires at 12% intersection or when within 92% of viewport height |
| Counters | Ease-out cubic over 1600ms on entering viewport, once |
| Hospital carousel | Auto-advance 5s, pauses on hover/focus; arrows fade in on hover; ← / → keys move it when the track has focus |
| Testimonials | Manual prev/next only |
| FAQ | One panel open at a time, 400ms max-height + opacity |
| Card hover | `translateY(-4px)` + shadow deepen, 400ms |
| Destination hover | Inner image `scale(1.07)`, 600ms |
| Parallax | Infrastructure `0.04`, destinations `0.03`, applied as `translateY` from element centre offset |
| "Request a Free Quote" | Smooth-scrolls to `#enquire` minus 72px header offset, then focuses the name field after 900ms. From a non-home page it routes home first, then scrolls |
| Page change | Scroll resets to top |
| Easing | `cubic-bezier(0.4, 0, 0.2, 1)` everywhere, 300–500ms |
| Reduced motion | `prefers-reduced-motion` disables all animation; counters jump to final values; scroll behaviour becomes `auto` |

Focus states: inputs and selects take `border-color:#186A57` and `box-shadow: 0 0 0 3px rgba(24,106,87,0.16)`.

## State Management
Prototype state (replace routing state with real routes):
- `page` — one of `home | directory | hospital | treatment | why | journey | about` → **routes**
- `hero` (0–3) — hero slide index, interval-driven
- `slide` (0–3) — carousel offset, max = `hospitals.length - 2`
- `story` (0–2) — testimonial index
- `open` (0–7, `-1` = none) — FAQ accordion
- `scrolled` (bool) — header solid state
- `view` (`grid | list`), `fCity`, `fSpec` — directory filters, applied client-side
- `counts` — four animated stat values

No data fetching: hospitals, specialties, FAQs, journey steps, comparison rows and team members are all static arrays. In production these become CMS or API content — the hospital directory and profile pages are the obvious candidates for real data.

## Design Tokens

**Colour**
| Token | Hex | Use |
|---|---|---|
| Ink | `#16181A` | Headers, footer, dark bands, headings |
| Ink deep | `#1B1E20` | Hero base under imagery |
| Jade | `#186A57` | Primary CTA, links, key figures |
| Jade dark | `#12564A` | CTA hover |
| Jade light | `#2EA184` | Eyebrows and rules on dark |
| Jade pale | `#4FB79A` | Second logo ring |
| Surface | `#F7F8F8` | Page background |
| Tint | `#ECEFF0` | Alternating section bands, chips |
| White | `#FFFFFF` | Cards |
| Border | `#E6E8EA` | Card and input borders |
| Rule | `#F1F3F4` | Internal dividers |
| Body | `#3D4247` | Body text |
| Body soft | `#5C6268` | Card body |
| Muted | `#7A8085` | Labels, meta |
| Muted light | `#9BA1A6` | Fine print |
| On-dark body | `#C9CDD1` / `#A7ADB3` | Dark-band text |
| On-dark faint | `#8C9298` | Footer disclaimer |
| Mint note | `#EAF2EF` bg / `#CFE2DB` border | Cost disclaimer strips |

**Type** — Headings: Plus Jakarta Sans 600/700, letter-spacing `-0.01em` to `-0.025em`. Body: Inter 400/500/600, line-height 1.7. Eyebrows and data columns: system monospace, 11–12.5px, `0.12–0.18em` tracking, uppercase.
Scale: H1 `clamp(30px,4vw,46px)` (hero `clamp(34px,5.2vw,60px)`) · H2 `clamp(26px,3.2vw,42px)` · H3 17.5–20px · body 15–17.5px · meta 13–14.5px · fine print 12.5–13px.

**Spacing** — 4px base. Section padding 96px (home) / 64–80px (interior). Grid gaps 14 / 16 / 20 / 24px. Card padding 24–32px. Content max-width 1280px, prose 900–1080px.

**Radius** — 8px pills · 10–12px buttons and inputs · 14px small tiles · 16px cards and panels · 18px carousel viewport · 999px dots and round arrows.

**Shadow** — resting `0 1px 2px rgba(22,24,26,0.04)` · card hover `0 18px 40px rgba(22,24,26,0.12)` · lifted media `0 20px 44px rgba(22,24,26,0.10)` · hero panel `0 20px 50px rgba(22,24,26,0.35)` · round arrow `0 10px 26px rgba(22,24,26,0.16)`.

## Assets
**No photography is included.** 32 image placeholders, all needing real shots:

- **Hero (4)** — hospital atrium, surgeon in theatre, Kerala backwaters, patient with clinician. Landscape, dark-tolerant (a scrim sits over them).
- **Specialty tiles (12)** — one per specialty, landscape ~4:3, will crop to 132px tall.
- **Hospital cards (6 + 6 directory)** — facility exteriors, landscape.
- **Infrastructure (2)** — robotic surgical system in theatre; PET-CT or MRI suite.
- **Recovery stays (4)** — Kerala, Goa, Rajasthan, Rishikesh; portrait-friendly, they render 400px tall.
- **Portraits (6)** — patient testimonial, ambassador, four team members.
- **Hospital profile gallery (3)** — exterior, theatre, patient room.
- **Treatment hero (1)** — orthopaedic surgical suite.
- **About (1)** — team or office.

Icons: none used. Specialty tiles carry 2–3 letter text marks; bullets and markers are CSS squares. The logo is inline SVG (spec above) — no image file.

Fonts: Plus Jakarta Sans and Inter, both Google Fonts.

## Content Rules — read before editing copy
This is Australian healthcare marketing and the copy was written to stay inside the advertising rules. Preserve these constraints:

1. **No accreditation claims.** JCI/NABH/NABL badges were deliberately removed site-wide. Hospitals may state their own credentials on their own listing; the site does not assert them.
2. **All content is placeholder** — hospital names, clinicians, statistics and testimonials are fictional and labelled as such. Do not swap in real hospital brands without permission.
3. **Prices are indicative AUD ranges only**, always accompanied by "Indicative only, subject to medical assessment". Never a fixed quote.
4. **No outcome guarantees**, no success rates, no "best / safest / painless".
5. **Footer disclaimer must remain**: facilitation service, not a medical provider; consult your treating doctor before travelling.

## Accessibility
WCAG AA contrast throughout. Semantic landmarks (`header`/`nav`/`main`/`footer`), one `h1` per page, `<ol>` for sequences, `<dl>` for fact lists, table `<caption>`/`<th scope>`. Carousel is a focusable `role="group"` with arrow-key support; accordion uses `aria-expanded`; view toggle uses `aria-pressed`; testimonial panel is `aria-live="polite"`. Every image placeholder carries the alt text it needs. Visually-hidden labels back the hero selects.

## Files
| File | What it is |
|---|---|
| `Health Tourism.dc.html` | The complete prototype — all seven pages, markup and logic |
| `reveal.js` | Standalone controller: scroll reveals, counters, parallax, sticky-header state, hero and carousel timers. Reimplement as an intersection-observer hook in the target framework |
| `image-slot.js` | Drag-and-drop image placeholder web component. **Prototype tooling — do not port**; replace each slot with a real `<img>` |
| `support.js` | The prototype's rendering runtime. **Do not port** |
