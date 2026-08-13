import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import { CostDisclaimer, CostTable, EnquireButton, Eyebrow, FactList } from '../components/ui'
import { KNEE } from '../data/site'

export default function Treatment() {
  return (
    <main className="pt-[78px]">
      <section className="bg-tint px-6 py-16">
        <div className="mx-auto grid max-w-[1280px] items-center gap-12 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div>
            <Eyebrow>{KNEE.eyebrow}</Eyebrow>
            <h1 className="mb-4 text-[clamp(30px,4vw,46px)] leading-[1.15] font-bold tracking-[-0.02em]">
              {KNEE.title}
            </h1>
            <p className="mb-7 max-w-[560px] text-[17.5px] text-body-soft text-pretty">{KNEE.intro}</p>
            <div className="flex flex-wrap gap-3">
              <EnquireButton />
              <Link
                to="/hospitals"
                className="inline-flex items-center rounded-xl border border-[#DDE1E3] bg-white px-6 py-3.25 text-[15px] font-semibold text-ink"
              >
                See hospitals offering this
              </Link>
            </div>
          </div>
          <div className="relative h-[320px] overflow-hidden rounded-2xl bg-[#E6E9EA] shadow-media">
            <ImageSlot id="knee-hero" eager />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 pt-18 pb-24">
        <div className="mx-auto grid max-w-[1280px] items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div>
            <h2 className="mb-3.5 text-[26px] font-bold tracking-[-0.02em]">What the procedure involves</h2>
            <p className="mb-4.5 text-[17px] text-body-soft text-pretty">{KNEE.about1}</p>
            <p className="mb-10 text-[17px] text-body-soft text-pretty">{KNEE.about2}</p>

            <h2 className="mb-4.5 text-[26px] font-bold tracking-[-0.02em]">Indicative costs in AUD</h2>
            <CostTable
              caption="Indicative knee replacement costs in Australian dollars"
              columns={['Option', 'Indicative AUD range', 'Hospital stay']}
              rows={KNEE.costs}
            />
            <div className="mb-10">
              <CostDisclaimer>
                Indicative only, subject to medical assessment. Ranges cover surgeon, anaesthetist, implant, theatre and
                standard inpatient stay; they exclude international flights, extended rehabilitation and treatment of
                unforeseen complications.
              </CostDisclaimer>
            </div>

            <h2 className="mb-4.5 text-[26px] font-bold tracking-[-0.02em]">A typical trip</h2>
            <ol className="mb-10 grid gap-0.5">
              {KNEE.timeline.map((t) => (
                <li key={t.when} className="flex gap-5 border-t border-tint py-4">
                  <span className="shrink-0 basis-[90px] pt-0.75 font-mono text-[12.5px] text-jade">{t.when}</span>
                  <div>
                    <p className="mb-0.75 font-display text-[16px] font-semibold text-ink">{t.title}</p>
                    <p className="text-[15px] text-body-soft text-pretty">{t.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <h2 className="mb-4.5 text-[26px] font-bold tracking-[-0.02em]">
              Risks and things to discuss with your doctor
            </h2>
            <p className="text-[17px] text-body-soft text-pretty">{KNEE.risks}</p>
          </div>

          <aside className="sticky top-[100px] rounded-2xl border border-line bg-surface p-7">
            <h2 className="mb-4.5 text-[19px] font-semibold tracking-[-0.01em]">Summary</h2>
            <div className="mb-5.5">
              <FactList facts={KNEE.facts} />
            </div>
            <EnquireButton className="block w-full text-center" />
          </aside>
        </div>
      </section>
    </main>
  )
}
