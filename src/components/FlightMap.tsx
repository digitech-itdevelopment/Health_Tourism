import {
  AUSTRALIA_PATH,
  AU_CITIES,
  GRATICULE_PATH,
  INDIA_CITIES,
  INDIA_PATH,
  NETWORK_LINKS,
  ROUTES,
  SRI_LANKA_PATH,
  VIEW_BOX,
} from './flight-map.geo'
import { useMediaQuery } from '../lib/motion'

// Hero background: three inbound flights in turn — Sydney, then Melbourne, then Perth —
// each landing in Delhi, lighting the partner cities, and flying home.
//
// SVG + CSS (motion path + keyframes), not video: ~11 KB instead of several MB, sharp at
// any viewport, no decode, and the compositor does all the work.
//
// Timing is two nested cycles: a 16s leg (out, dwell, home) that everything on the
// ground follows, inside a 48s master that hands the leg to each departure city in turn.
//
// Coastlines, graticule, the great circles and the projected city positions all come
// from Natural Earth via scripts/gen-map-geometry.mjs — nothing here is drawn by hand.
// To change framing, cities or routes, edit that script and re-run it. Never edit
// flight-map.geo.ts.

const label = (city: { x: number; y: number; side: string; dy: number }) =>
  city.side === 'right'
    ? { x: city.x + 10, y: city.y + 3.5 + city.dy, anchor: 'start' as const }
    : { x: city.x - 10, y: city.y + 3.5 + city.dy, anchor: 'end' as const }

// Cities light up north to south. Each hub link shares its destination's delay, so the
// line reaches a city exactly as that city pings. Kept short so the whole sequence
// finishes inside the 3.5s the aircraft is on the ground.
const STAGGER = 0.22
const cityDelay = (name: string) => INDIA_CITIES.findIndex((c) => c.name === name) * STAGGER

// Above this the hero is wide enough that `slice` crops only a little off the top and
// bottom, which fills the frame and looks best. Below it, slice starts scaling the map
// past the viewport width and cutting India's western edge off — so narrow screens get
// `meet` and see the whole map instead. The letterbox is invisible: the hero behind it
// is the same ink as the map's own background rect.
const WIDE = '(min-width: 820px)'

export default function FlightMap() {
  const wide = useMediaQuery(WIDE)

  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio={wide ? 'xMidYMid slice' : 'xMidYMid meet'}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <radialGradient id="fm-bloom" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#4FB79A" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#2EA184" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#2EA184" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="fm-engine" cx="50%" cy="50%">
          <stop offset="0%" stopColor="#EAF2EF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#4FB79A" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1200" height="675" fill="#16181A" />
      <path d={GRATICULE_PATH} fill="none" stroke="#2EA184" strokeWidth="0.6" strokeOpacity="0.18" />

      {/* Bloom over India, timed to each arrival */}
      <ellipse cx="390" cy="150" rx="225" ry="195" fill="url(#fm-bloom)" className="fm-bloom" />

      {/* Coastlines. The wide, low-opacity stroke underneath is a cheap glow — far
          lighter than an SVG filter, which would rasterise every frame. */}
      <g fill="none" stroke="#4FB79A" strokeLinejoin="round">
        <g strokeWidth="7" strokeOpacity="0.14">
          <path d={INDIA_PATH} />
          <path d={AUSTRALIA_PATH} />
        </g>
        <path d={INDIA_PATH} fill="#2EA184" fillOpacity="0.22" strokeWidth="1.7" strokeOpacity="1" />
        <path d={SRI_LANKA_PATH} fill="#2EA184" fillOpacity="0.22" strokeWidth="1.4" strokeOpacity="0.9" />
        <path d={AUSTRALIA_PATH} fill="#2EA184" fillOpacity="0.15" strokeWidth="1.7" strokeOpacity="0.75" />
      </g>

      {/* Onward legs from the arrival hub, drawing one at a time in step with the city
          pings. Partner cities only — the map never implies a facility we do not list. */}
      {NETWORK_LINKS.map((l) => (
        <path
          key={l.to}
          d={l.path}
          pathLength={1}
          fill="none"
          stroke="#7FD8BE"
          strokeWidth="0.9"
          strokeLinecap="round"
          strokeDasharray="1"
          className="fm-network"
          style={{ animationDelay: `${cityDelay(l.to)}s` }}
        />
      ))}

      {/* All three routes sit faint the whole time, so the map reads as a network even
          between flights. Only the leg being flown gets the bright overlay. */}
      {ROUTES.map((r) => (
        <path
          key={`base-${r.code}`}
          d={r.path}
          fill="none"
          stroke="#4FB79A"
          strokeWidth="1.2"
          strokeOpacity="0.28"
          strokeDasharray="4 7"
        />
      ))}

      {ROUTES.map((r, i) => (
        <path
          key={`trail-${r.code}`}
          d={r.path}
          pathLength={1}
          fill="none"
          stroke="#7FD8BE"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1"
          className={`fm-trail fm-band-${i + 1}`}
        />
      ))}

      {/* Departure cities */}
      {AU_CITIES.map((c) => {
        const l = label(c)
        return (
          <g key={c.name}>
            <circle cx={c.x} cy={c.y} r="2.6" fill="#8C9298" />
            <text
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fill="#8C9298"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
              className="fm-label"
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Indian destinations — ping in sequence while the aircraft is on the ground */}
      {INDIA_CITIES.map((c, i) => {
        const l = label(c)
        return (
          <g key={c.name} className="fm-city" style={{ animationDelay: `${i * STAGGER}s` }}>
            <circle cx={c.x} cy={c.y} r="12" fill="none" stroke="#4FB79A" strokeWidth="1.1" className="fm-ring" />
            <circle cx={c.x} cy={c.y} r="3" fill="#7FD8BE" />
            <text
              x={l.x}
              y={l.y}
              textAnchor={l.anchor}
              fill="#DDE6E2"
              fontSize="10.5"
              fontFamily="ui-monospace, monospace"
              letterSpacing="0.12em"
              className="fm-label"
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Aircraft, one per route. The glyph noses along +x so `offset-rotate: auto`
          points it the way it is travelling; the glow rides the same path. */}
      {ROUTES.map((r, i) => (
        <g
          key={`plane-${r.code}`}
          className={`fm-plane fm-slot-${i + 1}`}
          style={{ offsetPath: `path('${r.path}')` }}
        >
          <circle r="16" fill="url(#fm-engine)" />
          <path
            d="M9 0 L1.6 2.4 L-1.4 9 L-3 9 L-1.9 2.2 L-6.2 1.4 L-7.6 3.6 L-8.8 3.6 L-8 0 L-8.8 -3.6 L-7.6 -3.6 L-6.2 -1.4 L-1.9 -2.2 L-3 -9 L-1.4 -9 L1.6 -2.4 Z"
            fill="#F7F8F8"
          />
        </g>
      ))}

      {/* Leg readout, bottom left. Direction-neutral because it stays up for the whole
          leg, including the flight home. Kept at y=598 rather than nearer the edge: on a
          very wide viewport `slice` crops ~130 units off the top and bottom, and anything
          below ~610 gets cut. */}
      <g
        fontFamily="ui-monospace, monospace"
        letterSpacing="0.16em"
        fontSize="11.5"
        fill="#7FD8BE"
        className="fm-label"
      >
        {ROUTES.map((r, i) => (
          <text key={`leg-${r.code}`} x="62" y="598" className={`fm-leg fm-band-${i + 1}`}>
            {r.code} – DEL · {r.km.toLocaleString('en-AU')} KM · NONSTOP
          </text>
        ))}
      </g>
    </svg>
  )
}
