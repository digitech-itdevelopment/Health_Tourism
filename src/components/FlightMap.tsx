import {
  AUSTRALIA_PATH,
  AU_CITIES,
  GRATICULE_PATH,
  INDIA_CITIES,
  INDIA_PATH,
  NETWORK_PATH,
  ROUTE_KM,
  ROUTE_PATH,
  SRI_LANKA_PATH,
  VIEW_BOX,
} from './flight-map.geo'

// Hero background: Sydney → India, the six partner cities light up, then the flight
// home. One 20s CSS loop, seamless by construction.
//
// SVG + CSS (motion path + keyframes), not video: ~8 KB instead of several MB, sharp at
// any viewport, no decode, and the compositor does all the work.
//
// Coastlines, graticule and the great-circle route all come from Natural Earth via
// scripts/gen-map-geometry.mjs — nothing here is drawn by hand. To change the framing
// or the cities, edit that script and re-run it; never edit flight-map.geo.ts.

const label = (city: { x: number; y: number; side: string; dy: number }) =>
  city.side === 'right'
    ? { x: city.x + 10, y: city.y + 3.5 + city.dy, anchor: 'start' as const }
    : { x: city.x - 10, y: city.y + 3.5 + city.dy, anchor: 'end' as const }

export default function FlightMap() {
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMid slice"
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

      {/* Bloom over India, timed to the arrival */}
      <ellipse cx="385" cy="165" rx="225" ry="200" fill="url(#fm-bloom)" className="fm-bloom" />

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

      {/* Onward legs from the arrival hub, drawn once the aircraft is on the ground */}
      <path
        d={NETWORK_PATH}
        pathLength={1}
        fill="none"
        stroke="#7FD8BE"
        strokeWidth="0.9"
        strokeDasharray="1"
        className="fm-network"
      />

      {/* Route: faint always, bright segment drawn on the outbound leg */}
      <path d={ROUTE_PATH} fill="none" stroke="#4FB79A" strokeWidth="1.2" strokeOpacity="0.35" strokeDasharray="4 7" />
      <path
        d={ROUTE_PATH}
        pathLength={1}
        fill="none"
        stroke="#7FD8BE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="1"
        className="fm-trail"
      />

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
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Partner cities — ping in sequence while the aircraft is on the ground */}
      {INDIA_CITIES.map((c, i) => {
        const l = label(c)
        return (
          <g key={c.name} className="fm-city" style={{ animationDelay: `${i * 0.4}s` }}>
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
            >
              {c.name.toUpperCase()}
            </text>
          </g>
        )
      })}

      {/* Aircraft. The glyph noses along +x so `offset-rotate: auto` points it the way
          it is travelling; the glow rides the same path. */}
      <g className="fm-plane" style={{ offsetPath: `path('${ROUTE_PATH}')` }}>
        <circle r="16" fill="url(#fm-engine)" />
        <path
          d="M9 0 L1.6 2.4 L-1.4 9 L-3 9 L-1.9 2.2 L-6.2 1.4 L-7.6 3.6 L-8.8 3.6 L-8 0 L-8.8 -3.6 L-7.6 -3.6 L-6.2 -1.4 L-1.9 -2.2 L-3 -9 L-1.4 -9 L1.6 -2.4 Z"
          fill="#F7F8F8"
        />
      </g>

      {/* Leg readout, bottom left */}
      <g fontFamily="ui-monospace, monospace" letterSpacing="0.16em" fontSize="11.5">
        <text x="62" y="628" fill="#7FD8BE" className="fm-leg-out">
          SYD → DEL · {ROUTE_KM.toLocaleString('en-AU')} KM · NONSTOP
        </text>
        <text x="62" y="628" fill="#7FD8BE" className="fm-leg-back">
          DEL → SYD · CLEARED TO FLY HOME
        </text>
      </g>
    </svg>
  )
}
