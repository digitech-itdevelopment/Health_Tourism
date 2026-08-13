// Convert generated PNGs to WebP and drop the originals.
//
// grok's image_gen returns ~1.2 MB PNGs. Nothing on this site displays wider than
// about 640 CSS px, so shipping those unchanged would be ~45 MB of photography.
// WebP at these caps lands each one around 60–150 KB.
//
// Usage: node scripts/optimise-images.mjs

import { readdir, stat, unlink } from 'node:fs/promises'
import { join } from 'node:path'
import sharp from 'sharp'

const DIR = new URL('../src/assets/images/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

// Small tiles and headshots never need more than 800px.
const smallCap = (id) => id.startsWith('spec-') || id.startsWith('team-')

// grok stamps a "Grok" mark into the bottom-right corner. It sits inside the lowest
// ~8% of the frame, so trimming 9% clears it with margin. Every slot is object-cover
// cropped anyway, so the lost strip does not change any composition on the page.
const KEEP = 0.91

const files = (await readdir(DIR)).filter((f) => f.endsWith('.png'))
if (files.length === 0) {
  console.log('No PNGs to convert.')
  process.exit(0)
}

let before = 0
let after = 0

for (const file of files) {
  const id = file.replace(/\.png$/, '')
  const src = join(DIR, file)
  const out = join(DIR, `${id}.webp`)

  before += (await stat(src)).size

  const { width, height } = await sharp(src).metadata()

  await sharp(src)
    .extract({ left: 0, top: 0, width, height: Math.round(height * KEEP) })
    .resize({ width: smallCap(id) ? 800 : 1280, withoutEnlargement: true })
    .webp({ quality: 74 })
    .toFile(out)

  const size = (await stat(out)).size
  after += size
  await unlink(src)

  console.log(`${id.padEnd(16)} ${(size / 1024).toFixed(0)} KB`)
}

const mb = (n) => (n / 1024 / 1024).toFixed(1)
console.log(`\n${files.length} images: ${mb(before)} MB -> ${mb(after)} MB`)
