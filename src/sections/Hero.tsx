import { useNavigate } from 'react-router-dom'
import FlightMap from '../components/FlightMap'
import { CITY_OPTIONS, TAGLINE, TREATMENT_OPTIONS } from '../data/site'

const SELECT =
  'select-field w-full rounded-[11px] border border-line bg-white py-3.5 pr-10 pl-4 text-[15px] text-body transition-[border-color,box-shadow] duration-300 ease-[var(--ease-std)]'

export default function Hero() {
  const navigate = useNavigate()

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden bg-ink"
    >
      <FlightMap />

      {/* Scrim. Lighter through the middle than the handoff's 0.55 because the map
          sits under it now rather than photography — the headline is 60px white bold,
          so it still clears WCAG AA against the darkest point of the map. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(22_24_26/0.72)_0%,rgb(22_24_26/0.38)_45%,rgb(22_24_26/0.82)_100%)]"
      />

      <div className="pointer-events-none relative max-w-[900px] px-6 pt-[150px] pb-[90px] text-center">
        <p className="eyebrow mb-4.5 text-jade-light">India · For Australian patients</p>
        <h1 className="mb-4.5 text-[clamp(34px,5.2vw,60px)] leading-[1.12] font-bold tracking-[-0.025em] text-balance text-white">
          {TAGLINE}
        </h1>
        <p className="mx-auto mb-9 max-w-[620px] text-[18px] leading-relaxed text-[#D8DCDF] text-pretty">
          Partner hospitals across India, coordinated end to end — from your first enquiry to follow-up once you are
          home in Australia.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            navigate('/hospitals')
          }}
          className="pointer-events-auto mx-auto flex max-w-[760px] flex-wrap gap-2.5 rounded-2xl bg-white/96 p-2.5 shadow-panel"
        >
          <label className="flex flex-[1_1_220px] flex-col text-left">
            <span className="sr-only">What treatment are you looking for?</span>
            <select className={SELECT} defaultValue="">
              <option value="">What treatment are you looking for?</option>
              {TREATMENT_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-[1_1_170px] flex-col text-left">
            <span className="sr-only">Which city?</span>
            <select className={SELECT} defaultValue="">
              <option value="">Which city?</option>
              {CITY_OPTIONS.slice(1).map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            className="shrink-0 cursor-pointer rounded-[11px] bg-jade px-7.5 py-3.5 text-[15px] font-semibold text-white transition-all duration-300 ease-[var(--ease-std)] hover:bg-jade-dark"
          >
            Search
          </button>
        </form>

        <p className="mt-4 text-[13px] text-ondark-soft">
          Facilitation service. Indicative pricing only — subject to medical assessment.
        </p>
      </div>
    </section>
  )
}
