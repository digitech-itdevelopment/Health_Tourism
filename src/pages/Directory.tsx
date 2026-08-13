import { useState } from 'react'
import ImageSlot from '../components/ImageSlot'
import { Eyebrow, HospitalLink, Pills } from '../components/ui'
import { CITY_OPTIONS, HOSPITALS, SPEC_OPTIONS } from '../data/site'

const FILTER =
  'select-field rounded-[10px] border border-line bg-white py-2.5 pr-10 pl-3.25 text-[14.5px] font-medium text-ink transition-[border-color,box-shadow] duration-300 ease-[var(--ease-std)]'

export default function Directory() {
  const [city, setCity] = useState('All cities')
  const [spec, setSpec] = useState('All specialties')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const filtered = HOSPITALS.filter(
    (h) => (city === 'All cities' || h.city === city) && (spec === 'All specialties' || h.tags.includes(spec)),
  )

  const seg = (active: boolean) =>
    `cursor-pointer border-none px-4 py-2.5 text-sm font-semibold ${
      active ? 'bg-ink text-white' : 'bg-white text-muted'
    }`

  return (
    <main className="pt-[78px]">
      <section className="bg-ink px-6 py-16">
        <div className="shell">
          <Eyebrow onDark>Hospital directory</Eyebrow>
          <h1 className="mb-3 text-[clamp(30px,4vw,46px)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
            Partner hospitals across India
          </h1>
          <p className="max-w-[620px] text-[17px] text-ondark">
            All names, bed counts and specialty lists shown are placeholders for this prototype.
          </p>
        </div>
      </section>

      <section className="sticky top-[66px] z-40 border-b border-line bg-white">
        <div className="shell flex flex-wrap items-center gap-3 px-6 py-4.5">
          <label className="flex flex-col gap-1.25 text-xs font-semibold text-muted">
            City
            <select value={city} onChange={(e) => setCity(e.target.value)} className={`${FILTER} min-w-[160px]`}>
              {CITY_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.25 text-xs font-semibold text-muted">
            Specialty
            <select value={spec} onChange={(e) => setSpec(e.target.value)} className={`${FILTER} min-w-[200px]`}>
              {SPEC_OPTIONS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <div className="ml-auto flex items-center gap-3.5">
            <span className="text-sm text-muted">
              {filtered.length} of {HOSPITALS.length} hospitals
            </span>
            <div role="group" aria-label="View mode" className="flex overflow-hidden rounded-[10px] border border-line">
              <button type="button" aria-pressed={view === 'grid'} onClick={() => setView('grid')} className={seg(view === 'grid')}>
                Grid
              </button>
              <button type="button" aria-pressed={view === 'list'} onClick={() => setView('list')} className={seg(view === 'list')}>
                List
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 pt-12 pb-24">
        <div
          className="shell grid gap-5"
          style={{ gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill,minmax(300px,1fr))' : '1fr' }}
        >
          {filtered.map((h) => (
            <article
              key={h.slug}
              className={`flex overflow-hidden rounded-2xl border border-line bg-white transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-lift ${
                view === 'grid' ? 'flex-col' : 'flex-row max-[720px]:flex-col'
              }`}
            >
              <div
                className="relative min-h-[180px] bg-tint"
                style={{ flex: view === 'grid' ? '0 0 190px' : '0 0 280px' }}
              >
                <ImageSlot id={`hosp-${HOSPITALS.indexOf(h)}`} />
              </div>
              <div className="flex-auto p-6">
                <h2 className="mb-1.5 text-[19px] leading-tight font-semibold tracking-[-0.01em]">{h.name}</h2>
                <p className="mb-3.5 text-sm text-muted">
                  {h.city} · {h.beds} beds · est. {h.est}
                </p>
                <p className="mb-4 text-[15px] text-body-soft text-pretty">{h.blurb}</p>
                <Pills tags={h.tags} />
                <HospitalLink slug={h.slug} />
              </div>
            </article>
          ))}

          {filtered.length === 0 ? (
            <p className="py-12 text-center text-[16px] text-muted">
              No partner hospital matches that combination. Try widening one of the filters.
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
