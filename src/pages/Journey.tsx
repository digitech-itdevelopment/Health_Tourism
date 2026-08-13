import { Bullet, PageHeader } from '../components/ui'
import { DOCS, TRIP_WEEKS } from '../data/site'

export default function Journey() {
  return (
    <main className="pt-[78px]">
      <PageHeader eyebrow="Your journey" title="Three weeks in India, day by day.">
        Written against a single knee replacement, the most common request we get. Cardiac and oncology trips run
        longer. Your own schedule is set by the treating team, and dates move when clinical judgement says they should.
      </PageHeader>

      <section className="bg-surface px-6 pt-18 pb-22.5">
        <div className="mx-auto max-w-[1000px]">
          {TRIP_WEEKS.map((w) => (
            <div key={w.title} className="reveal mb-12">
              <div className="mb-2 flex items-baseline gap-4 border-b-2 border-line pb-3.5">
                <h2 className="text-[26px] font-bold tracking-[-0.02em]">{w.title}</h2>
                <p className="eyebrow tracking-[0.12em] text-jade">{w.tag}</p>
              </div>
              <ol>
                {w.days.map((d) => (
                  <li key={d.day} className="flex gap-6 border-b border-tint py-4.5">
                    <span className="shrink-0 basis-[76px] pt-0.75 font-mono text-[12.5px] text-muted">{d.day}</span>
                    <div>
                      <p className="mb-1 font-display text-[16.5px] font-semibold text-ink">{d.title}</p>
                      <p className="text-[15.5px] text-body-soft text-pretty">{d.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          ))}

          <div className="reveal grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            <div className="rounded-2xl border border-line bg-white p-6.5">
              <h3 className="mb-3.5 text-[17.5px] font-semibold">Documents to have ready</h3>
              <ul className="grid gap-2.5">
                {DOCS.map((d) => (
                  <Bullet key={d}>{d}</Bullet>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-line bg-tint p-6.5">
              <h3 className="mb-3.5 text-[17.5px] font-semibold">Who is with you</h3>
              <p className="mb-3 text-[15px] text-body-soft text-pretty">
                One case coordinator from enquiry to final teleconsult, contactable Mon–Fri 9:00–17:30 AEST, plus the
                hospital international patient officer on the ground.
              </p>
              <p className="text-[15px] text-body-soft text-pretty">
                A travelling companion can be visa-sponsored on the same booking and accommodated in or beside the ward.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
