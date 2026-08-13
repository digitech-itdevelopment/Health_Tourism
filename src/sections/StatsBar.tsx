import { STATS } from '../data/site'
import { useCountUp } from '../lib/motion'

const TARGETS = STATS.map((s) => s.target)

export default function StatsBar() {
  const { ref, values } = useCountUp(TARGETS)

  return (
    <section aria-label="Accreditation and reach" className="border-b border-line bg-white">
      <div className="shell px-6 py-8.5">
        <p className="mx-auto max-w-[760px] text-center text-[15.5px] text-muted text-pretty">
          Every hospital listing sets out its own accreditations, staffing and equipment, and we ask for current
          documentation before a facility appears here.
        </p>
        <div
          ref={ref}
          className="reveal mt-8.5 grid gap-6 border-t border-tint pt-8 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]"
        >
          {STATS.map((s, i) => (
            <div key={s.label} className="text-center">
              <p className="mb-2 font-display text-[42px] leading-none font-bold text-jade">
                {values[i].toLocaleString()}
                {s.suffix}
              </p>
              <p className="text-[14.5px] text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
