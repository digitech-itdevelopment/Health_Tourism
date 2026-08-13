# Arogya Bridge

Marketing and directory site for a medical travel facilitation service connecting
Australian patients with partner hospitals in India.

React 19 + Vite + Tailwind v4 + React Router. Ported from the design handoff in
[`design_handoff_health_tourism/`](design_handoff_health_tourism/) — read that
README before changing anything, particularly its **Content Rules**.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the built output
```

## Layout

| Path | What |
|---|---|
| `src/data/site.ts` | Every piece of copy and static data. Change content here, not in components. |
| `src/data/images.ts` | The 39 photo slots: id, alt text, and the generation prompt for each. |
| `src/assets/images/` | Photos. A file named `<id>.png` is picked up automatically. |
| `src/components/` | Shared chrome — header, footer, logo, image slot, small UI primitives. |
| `src/sections/` | Home-page sections that carry behaviour (hero, carousel, FAQ, form). |
| `src/pages/` | One file per route. |
| `src/lib/motion.ts` | Scroll reveal, count-up, parallax, carousel auto-advance. |
| `src/index.css` | Design tokens (`@theme`) and the hero flight-loop keyframes. |

## Routes

`/` · `/hospitals` · `/hospitals/:slug` · `/treatments/knee-replacement` ·
`/why-india` · `/your-journey` · `/about`

## Images

Every slot renders a labelled placeholder until a real file exists, so the site is
reviewable with no photography at all and nothing shifts when photos land. To add
one, drop `src/assets/images/<id>.png` using an id from `src/data/images.ts`.

They were generated with the Grok CLI, which reads the prompts straight out of that
manifest:

```bash
grok --prompt-file <batch>.txt --cwd . --always-approve
```

## Things worth knowing

- **Brand name** is one constant (`BRAND` in `src/data/site.ts`). The source prototype
  was inconsistent — mostly "Health Tourism", but "Arogya Bridge" in the consent copy
  and in the design project name. Arogya Bridge won.
- **The hero is not a video.** It is an SVG + CSS motion-path loop (`FlightMap.tsx`):
  Sydney → India, partner cities light up, flight home, 20s seamless cycle. A few KB,
  sharp at any size, no decode cost. The landmasses are hand-simplified, not survey
  data — swap in TopoJSON if real geography ever matters.
- **All motion honours `prefers-reduced-motion`**, including the hero, which freezes
  into a deliberate resting state rather than mid-keyframe.
- **The enquiry form goes nowhere.** It is a prototype form and says so on screen.
- **Content rules are legal, not stylistic.** No accreditation claims, no outcome or
  success-rate claims, prices are indicative AUD ranges only and always carry the
  disclaimer, and the footer disclaimer stays. See the handoff README.
