// Generate the hero map geometry from Natural Earth data.
//
// Writes src/components/flight-map.geo.ts: real coastlines, a real graticule, and a
// true great-circle route, all pre-projected into the SVG viewBox. Only the resulting
// path strings ship — d3 and world-atlas stay in devDependencies.
//
// Usage: node scripts/gen-map-geometry.mjs

import { readFileSync, writeFileSync } from 'node:fs'
import { geoDistance, geoEquirectangular, geoInterpolate, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'

const W = 1200
const H = 675

// 110m, not 50m: this is a background at ~250px per country, where the extra detail is
// invisible but costs 50 KB. 110m is the standard world-map resolution and both
// countries stay unmistakably themselves.
const topo = JSON.parse(readFileSync('node_modules/world-atlas/countries-110m.json', 'utf8'))
const countries = feature(topo, topo.objects.countries)
const byName = (name) => {
  const f = countries.features.find((c) => c.properties.name === name)
  if (!f) throw new Error(`Country not found: ${name}`)
  return f
}

const india = byName('India')
const australia = byName('Australia')
const sriLanka = byName('Sri Lanka')

// Fit India + Australia together so their relative positions stay true to the globe:
// the whole point of the route arc is that the distance is real.
//
// The vertical inset does the composition work. India and Australia are 80° of latitude
// apart, which at any scale that fits the viewBox leaves the pair about 575 units wide
// in a 1200 frame — they cannot be pushed further apart without lying about the map.
// So instead the fit is biased upward, which lifts southern India clear of the hero
// headline band and drops Sydney just below the search panel.
const projection = geoEquirectangular().fitExtent(
  [
    [104, 100],
    [W - 96, 600],
  ],
  { type: 'FeatureCollection', features: [india, australia] },
)

// Equirectangular maps straight lon/lat segments to straight screen segments, so
// adaptive resampling only adds redundant points. Turn it off.
projection.precision(0)

const path = geoPath(projection)
// Sub-pixel precision is wasted at this scale and doubles the file.
const round = (d) => d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(Number(n) * 10) / 10))

// Meridians and parallels, drawn straight because that is what this projection makes
// them. d3's geoGraticule emits ~100 points per line for curved projections; here two
// points per line is exact and about fifty times smaller.
const graticule = () => {
  const lines = []
  for (let lon = 30; lon <= 180; lon += 15) {
    const [x, ya] = projection([lon, 60])
    const [, yb] = projection([lon, -60])
    lines.push(`M${x.toFixed(1)} ${ya.toFixed(1)}L${x.toFixed(1)} ${yb.toFixed(1)}`)
  }
  for (let lat = -60; lat <= 60; lat += 15) {
    const [xa, y] = projection([30, lat])
    const [xb] = projection([180, lat])
    lines.push(`M${xa.toFixed(1)} ${y.toFixed(1)}L${xb.toFixed(1)} ${y.toFixed(1)}`)
  }
  return lines.join('')
}

// Indian cities marked on the map, north to south. `partner: true` means we list a
// hospital there — only those get onward legs drawn from the arrival hub, so the map
// never implies a partner facility where there isn't one.
//
// `side` puts the label left or right of the dot: at true scale Mumbai and Pune land
// 8px apart, so they only stay legible on opposite sides. `dy` nudges that pair apart.
const CITIES = {
  india: [
    { name: 'Jammu', lon: 74.87, lat: 32.73, side: 'left', partner: false },
    { name: 'Delhi NCR', lon: 77.21, lat: 28.61, side: 'right', partner: true },
    { name: 'Mumbai', lon: 72.88, lat: 19.08, side: 'left', dy: -3, partner: true },
    { name: 'Pune', lon: 73.86, lat: 18.52, side: 'right', dy: 6, partner: true },
    { name: 'Bengaluru', lon: 77.59, lat: 12.97, side: 'left', partner: true },
    { name: 'Chennai', lon: 80.27, lat: 13.08, side: 'right', partner: true },
    { name: 'Kochi', lon: 76.27, lat: 9.93, side: 'left', partner: true },
  ],
  australia: [
    { name: 'Perth', lon: 115.86, lat: -31.95, side: 'left' },
    { name: 'Melbourne', lon: 144.96, lat: -37.81, side: 'left', dy: 4 },
    { name: 'Sydney', lon: 151.21, lat: -33.87, side: 'right' },
  ],
}

const project = ({ lon, lat, name, side, dy = 0, partner = false }) => {
  const [x, y] = projection([lon, lat])
  return { name, side, dy, partner, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
}

// A true great circle, sampled and projected. Sydney to Delhi runs up over the Bay of
// Bengal, which is why it bows north rather than tracking a straight line on the map.
const greatCircle = (from, to, steps = 96) => {
  const interpolate = geoInterpolate(from, to)
  const points = Array.from({ length: steps + 1 }, (_, i) => projection(interpolate(i / steps)))
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(2)} ${y.toFixed(2)}`).join('')
}

const DELHI = [77.21, 28.61]

// One inbound route per Australian departure city. The hero flies them in turn.
const ORIGINS = [
  { code: 'SYD', name: 'Sydney', lon: 151.21, lat: -33.87 },
  { code: 'MEL', name: 'Melbourne', lon: 144.96, lat: -37.81 },
  { code: 'PER', name: 'Perth', lon: 115.86, lat: -31.95 },
]

// Onward legs from the arrival hub to the other partner cities. Straight in projected
// space: at a few hundred km these are visually indistinguishable from great circles.
const network = () => {
  const [hx, hy] = projection(DELHI)
  return CITIES.india
    .filter((c) => c.partner && c.name !== 'Delhi NCR')
    .map((c) => {
      const [x, y] = projection([c.lon, c.lat])
      return `M${hx.toFixed(1)} ${hy.toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join('')
}

const routes = () =>
  ORIGINS.map((o) => ({
    code: o.code,
    name: o.name,
    path: greatCircle([o.lon, o.lat], DELHI),
    km: Math.round((geoDistance([o.lon, o.lat], DELHI) * 6371) / 10) * 10,
  }))

const out = `// GENERATED by scripts/gen-map-geometry.mjs - do not edit by hand.
// Source: Natural Earth 1:110m via world-atlas, equirectangular, fitted to ${W}x${H}.

export const VIEW_BOX = '0 0 ${W} ${H}'

export const INDIA_PATH = '${round(path(india))}'

export const SRI_LANKA_PATH = '${round(path(sriLanka))}'

export const AUSTRALIA_PATH = '${round(path(australia))}'

export const GRATICULE_PATH = '${graticule()}'

/** One great circle per departure city, flown in turn. Distances are km. */
export const ROUTES = ${JSON.stringify(routes(), null, 2)}

/** Arrival hub out to the other partner cities. */
export const NETWORK_PATH = '${network()}'

export const INDIA_CITIES = ${JSON.stringify(CITIES.india.map(project), null, 2)}

export const AU_CITIES = ${JSON.stringify(CITIES.australia.map(project), null, 2)}
`

writeFileSync('src/components/flight-map.geo.ts', out)

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1)
console.log(`india      ${kb(round(path(india)))} KB`)
console.log(`australia  ${kb(round(path(australia)))} KB`)
console.log(`graticule  ${kb(graticule())} KB`)
console.log(`total file ${kb(out)} KB`)
