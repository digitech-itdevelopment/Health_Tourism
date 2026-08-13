// Generate the hero map geometry from Natural Earth data.
//
// Writes src/components/flight-map.geo.ts: real coastlines, a real graticule, and a
// true great-circle route, all pre-projected into the SVG viewBox. Only the resulting
// path strings ship — d3 and world-atlas stay in devDependencies.
//
// Usage: node scripts/gen-map-geometry.mjs

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { geoArea, geoContains, geoDistance, geoEquirectangular, geoInterpolate, geoPath } from 'd3-geo'
import { topology } from 'topojson-server'
import { presimplify, simplify } from 'topojson-simplify'
import { feature } from 'topojson-client'
import { read } from 'shapefile'
import AdmZip from 'adm-zip'

const W = 1200
const H = 675

// Natural Earth's DEFAULT dataset draws India at the Line of Control: Gilgit and
// Muzaffarabad are assigned to Pakistan and Aksai Chin to China, so the polygon stops at
// 35.5N and the whole northern crown of Jammu & Kashmir is missing. On an Indian map that
// silhouette is simply wrong, and depicting it that way is not acceptable for a site
// aimed at Indian healthcare.
//
// Natural Earth publishes point-of-view editions for exactly this. `_ind` is the India
// POV: same data, India's claim applied. It is only released at 1:10m, so the geometry is
// far more detailed than we need and gets simplified below.
const POV_URL = 'https://naciscdn.org/naturalearth/10m/cultural/ne_10m_admin_0_countries_ind.zip'
const CACHE = '.cache/naturalearth'

async function loadCountries() {
  mkdirSync(CACHE, { recursive: true })
  const zipPath = `${CACHE}/ne_10m_admin_0_countries_ind.zip`

  if (!existsSync(zipPath)) {
    console.log('downloading India-POV boundaries from Natural Earth...')
    const res = await fetch(POV_URL)
    if (!res.ok) throw new Error(`download failed: ${res.status}`)
    writeFileSync(zipPath, Buffer.from(await res.arrayBuffer()))
  }

  const zip = new AdmZip(zipPath)
  const grab = (ext) => {
    const entry = zip.getEntries().find((e) => e.entryName.endsWith(ext))
    if (!entry) throw new Error(`missing ${ext} in archive`)
    return entry.getData()
  }
  return read(grab('.shp'), grab('.dbf'))
}

const countries = await loadCountries()

// dbf stores fixed-width strings NUL-padded, so "India" arrives as "India\0\0\0...".
const clean = (v) => String(v ?? '').replace(/\0+$/, '').trim()

const byName = (name) => {
  const f = countries.features.find(
    (c) => clean(c.properties.NAME) === name || clean(c.properties.ADMIN) === name,
  )
  if (!f) throw new Error(`Country not found: ${name}`)
  return f
}

// 10m carries far more than a ~250px-tall background can show, in two different ways.
//
// First the ring count: India ships 35 separate polygons and Australia 94, nearly all of
// them islets that render as a single stray pixel. Anything under `MIN_RING_SHARE` of the
// country's largest ring is dropped, which keeps Tasmania and the Andamans and discards
// the specks.
//
// Then the vertex count: India spans ~28 degrees of latitude across ~250px, so roughly
// 9px per degree. Detail finer than about a tenth of a degree cannot be seen, and
// `SIMPLIFY` is the triangle-area threshold that removes it. Together these bring the two
// countries from 245 KB to about 30 KB with no visible change at render size.
const MIN_RING_SHARE = 0.0005
const SIMPLIFY = 2e-3

const dropSpecks = (f) => {
  if (f.geometry.type !== 'MultiPolygon') return f
  const polys = f.geometry.coordinates
  const areas = polys.map((p) => geoArea({ type: 'Polygon', coordinates: p }))
  const biggest = Math.max(...areas)
  return {
    ...f,
    geometry: {
      type: 'MultiPolygon',
      coordinates: polys.filter((_, i) => areas[i] >= biggest * MIN_RING_SHARE),
    },
  }
}

const thin = (features) => {
  const fc = { type: 'FeatureCollection', features: features.map(dropSpecks) }
  const topo = simplify(presimplify(topology({ f: fc })), SIMPLIFY)
  return feature(topo, topo.objects.f).features
}

const [india, australia, sriLanka] = thin([byName('India'), byName('Australia'), byName('Sri Lanka')])

// Prove the POV actually applied rather than trusting the filename. If Natural Earth ever
// changes the edition, this fails loudly instead of silently shipping a cut J&K again.
const CLAIMED = [
  ['Gilgit', 74.31, 35.92],
  ['Muzaffarabad', 73.47, 34.37],
  ['Aksai Chin', 79.5, 35.0],
]
for (const [name, lon, lat] of CLAIMED) {
  if (!geoContains(india, [lon, lat])) {
    throw new Error(`India POV check failed: ${name} is outside the India polygon`)
  }
}
console.log('POV check: Gilgit, Muzaffarabad and Aksai Chin all inside India')

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
    [104, 60],
    [W - 96, 560],
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

// Indian cities marked on the map, north to south. Every one of them gets an onward leg
// drawn from the arrival hub.
//
// `side` puts the label left or right of the dot: at true scale Mumbai and Pune land
// 8px apart, so they only stay legible on opposite sides. `dy` nudges that pair apart.
const CITIES = {
  india: [
    { name: 'Jammu', lon: 74.87, lat: 32.73, side: 'left' },
    { name: 'Delhi NCR', lon: 77.21, lat: 28.61, side: 'right' },
    { name: 'Mumbai', lon: 72.88, lat: 19.08, side: 'left', dy: -3 },
    { name: 'Pune', lon: 73.86, lat: 18.52, side: 'right', dy: 6 },
    { name: 'Bengaluru', lon: 77.59, lat: 12.97, side: 'left' },
    { name: 'Chennai', lon: 80.27, lat: 13.08, side: 'right' },
    { name: 'Kochi', lon: 76.27, lat: 9.93, side: 'left' },
  ],
  australia: [
    { name: 'Perth', lon: 115.86, lat: -31.95, side: 'left' },
    { name: 'Melbourne', lon: 144.96, lat: -37.81, side: 'left', dy: 4 },
    { name: 'Sydney', lon: 151.21, lat: -33.87, side: 'right' },
  ],
}

const project = ({ lon, lat, name, side, dy = 0 }) => {
  const [x, y] = projection([lon, lat])
  return { name, side, dy, x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
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
// Emitted one per city rather than as a single path, so each can draw on its own delay
// in step with that city's ping.
const network = () => {
  const [hx, hy] = projection(DELHI)
  return CITIES.india
    .filter((c) => c.name !== 'Delhi NCR')
    .map((c) => {
      const [x, y] = projection([c.lon, c.lat])
      return { to: c.name, path: `M${hx.toFixed(1)} ${hy.toFixed(1)}L${x.toFixed(1)} ${y.toFixed(1)}` }
    })
}

const routes = () =>
  ORIGINS.map((o) => ({
    code: o.code,
    name: o.name,
    path: greatCircle([o.lon, o.lat], DELHI),
    km: Math.round((geoDistance([o.lon, o.lat], DELHI) * 6371) / 10) * 10,
  }))

const out = `// GENERATED by scripts/gen-map-geometry.mjs - do not edit by hand.
// Source: Natural Earth 1:50m via world-atlas, equirectangular, fitted to ${W}x${H}.

export const VIEW_BOX = '0 0 ${W} ${H}'

export const INDIA_PATH = '${round(path(india))}'

export const SRI_LANKA_PATH = '${round(path(sriLanka))}'

export const AUSTRALIA_PATH = '${round(path(australia))}'

export const GRATICULE_PATH = '${graticule()}'

/** One great circle per departure city, flown in turn. Distances are km. */
export const ROUTES = ${JSON.stringify(routes(), null, 2)}

/** Arrival hub out to each other partner city, one entry per destination. */
export const NETWORK_LINKS = ${JSON.stringify(network(), null, 2)}

export const INDIA_CITIES = ${JSON.stringify(CITIES.india.map(project), null, 2)}

export const AU_CITIES = ${JSON.stringify(CITIES.australia.map(project), null, 2)}
`

writeFileSync('src/components/flight-map.geo.ts', out)

const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1)
console.log(`india      ${kb(round(path(india)))} KB`)
console.log(`australia  ${kb(round(path(australia)))} KB`)
console.log(`graticule  ${kb(graticule())} KB`)
console.log(`routes     ${routes().length}, network links ${network().length}`)
console.log(`total file ${kb(out)} KB`)
