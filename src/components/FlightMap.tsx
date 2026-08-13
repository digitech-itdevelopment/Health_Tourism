// Hero background: Sydney → India, the partner cities light up in sequence, then the
// flight home. One 20s CSS loop, seamless by construction.
//
// This is SVG + CSS (motion path + keyframes), not a video: a few KB instead of several
// MB, sharp at any viewport, loops with no seam, and the compositor does all the work —
// no decode, no JS on the scroll path.
//
// ponytail: coastlines are hand-simplified, not survey data. They read as a diagram, which
// is the intent. If real geography ever matters, swap the two <path d> for TopoJSON outlines.

const INDIA_CITIES = [
  { name: 'Delhi NCR', x: 312, y: 178 },
  { name: 'Mumbai', x: 292, y: 282 },
  { name: 'Pune', x: 304, y: 298 },
  { name: 'Bengaluru', x: 332, y: 352 },
  { name: 'Chennai', x: 362, y: 344 },
  { name: 'Kochi', x: 334, y: 382 },
]

const AU_CITIES = [
  { name: 'Perth', x: 796, y: 494 },
  { name: 'Melbourne', x: 896, y: 534 },
  { name: 'Sydney', x: 924, y: 516 },
]

// Clockwise from Kashmir: Himalayan arc, north-east bulge, Bay of Bengal coast down
// to Kanyakumari, back up the Konkan coast over the Gujarat/Kutch bulge to Punjab.
const INDIA_PATH =
  'M298 124 L330 146 L368 140 L410 158 L438 170 L452 196 L468 186 L462 214 L438 222 ' +
  'L430 250 L412 262 L416 288 L398 318 L380 348 L364 378 L352 402 L338 372 L326 340 ' +
  'L312 300 L296 272 L280 250 L258 244 L246 226 L262 212 L256 192 L276 170 L288 146 Z'

const AUSTRALIA_PATH =
  'M786 448 L800 420 L836 400 L860 414 L872 400 L890 396 L906 424 L930 450 L940 490 ' +
  'L926 520 L900 532 L878 536 L848 528 L828 520 L806 508 L794 492 Z'

// Sydney → Delhi, bowed north over South-East Asia.
const ROUTE = 'M924 516 C 820 380, 620 178, 316 176'

export default function FlightMap() {
  return (
    <svg
      viewBox="0 0 1200 675"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <pattern id="fm-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M60 0 L0 0 0 60" fill="none" stroke="#2EA184" strokeWidth="0.5" opacity="0.09" />
        </pattern>
        <radialGradient id="fm-glow" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#2EA184" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#2EA184" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="675" fill="#16181A" />
      <rect width="1200" height="675" fill="url(#fm-grid)" />
      <ellipse cx="350" cy="270" rx="260" ry="230" fill="url(#fm-glow)" />

      {/* Landmasses. Opacities are tuned to sit under the hero scrim
          (0.78 → 0.55 → 0.86) and still read — drop them and the map vanishes. */}
      <path d={INDIA_PATH} fill="#2EA184" fillOpacity="0.16" stroke="#4FB79A" strokeWidth="1.75" strokeOpacity="0.8" />
      <ellipse cx="370" cy="414" rx="11" ry="16" fill="#2EA184" fillOpacity="0.16" stroke="#4FB79A" strokeWidth="1.75" strokeOpacity="0.8" />
      <path d={AUSTRALIA_PATH} fill="#2EA184" fillOpacity="0.12" stroke="#4FB79A" strokeWidth="1.75" strokeOpacity="0.62" />
      <ellipse cx="914" cy="556" rx="10" ry="8" fill="#2EA184" fillOpacity="0.12" stroke="#4FB79A" strokeWidth="1.75" strokeOpacity="0.62" />

      {/* Route: faint always, bright segment drawn on the outbound leg */}
      <path d={ROUTE} fill="none" stroke="#4FB79A" strokeWidth="1.5" strokeOpacity="0.4" strokeDasharray="5 7" />
      <path
        d={ROUTE}
        pathLength={1}
        fill="none"
        stroke="#7FD8BE"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeDasharray="1"
        className="fm-trail"
      />

      {/* Departure cities */}
      {AU_CITIES.map((c) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r="3" fill="#8C9298" />
          <text x={c.x + 9} y={c.y + 4} fill="#8C9298" fontSize="10.5" fontFamily="ui-monospace, monospace" letterSpacing="0.1em">
            {c.name.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Partner cities — ping in sequence while the plane is on the ground in India */}
      {INDIA_CITIES.map((c, i) => (
        <g key={c.name} className="fm-city" style={{ animationDelay: `${i * 0.45}s` }}>
          <circle cx={c.x} cy={c.y} r="14" fill="none" stroke="#4FB79A" strokeWidth="1.25" className="fm-ring" />
          <circle cx={c.x} cy={c.y} r="3.5" fill="#4FB79A" />
          <text x={c.x + 11} y={c.y + 4} fill="#C9CDD1" fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="0.1em">
            {c.name.toUpperCase()}
          </text>
        </g>
      ))}

      {/* The aircraft, carried along ROUTE by offset-path. Glyph noses along +x so
          `offset-rotate: auto` points it the way it is travelling. */}
      <g className="fm-plane" style={{ offsetPath: `path('${ROUTE}')` }}>
        <path
          d="M9 0 L1.6 2.4 L-1.4 9 L-3 9 L-1.9 2.2 L-6.2 1.4 L-7.6 3.6 L-8.8 3.6 L-8 0 L-8.8 -3.6 L-7.6 -3.6 L-6.2 -1.4 L-1.9 -2.2 L-3 -9 L-1.4 -9 L1.6 -2.4 Z"
          fill="#F7F8F8"
        />
      </g>
    </svg>
  )
}
