import { Link, useParams } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import { CostDisclaimer, CostTable, EnquireButton, FactList } from '../components/ui'
import { COST_DISCLAIMER, HOSPITAL_DETAIL, HOSPITALS } from '../data/site'
import NotFound from './NotFound'

export default function HospitalProfile() {
  const { slug } = useParams()
  const hospital = HOSPITALS.find((h) => h.slug === slug)

  if (!hospital) return <NotFound />

  // The prototype ships profile copy for one facility only; every listing reuses it
  // and is labelled placeholder. Real content belongs in a CMS.
  const detail = HOSPITAL_DETAIL
  const facts = detail.facts.map((f) =>
    f.k === 'Beds' ? { ...f, v: String(hospital.beds) } : f,
  )

  return (
    <main className="pt-[78px]">
      <section className="bg-ink px-6 pt-14 pb-16">
        <div className="shell">
          <Link to="/hospitals" className="text-sm text-ondark-soft hover:text-white">
            ← All hospitals
          </Link>
          <h1 className="mt-5.5 mb-2.5 max-w-[820px] text-[clamp(28px,3.8vw,44px)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
            {hospital.name}
          </h1>
          <p className="mb-7 text-[17px] text-ondark">
            {hospital.city} · {hospital.beds} beds · established {hospital.est}
          </p>
          <EnquireButton>Request a quote for this hospital</EnquireButton>
        </div>
      </section>

      <section className="bg-white px-6">
        <div className="shell grid -translate-y-8 gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
          {detail.gallery.map((g) => (
            <div key={g.id} className="relative h-[200px] overflow-hidden rounded-[14px] border border-line bg-tint">
              <ImageSlot id={g.id} alt={g.alt} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-6 pt-6 pb-24">
        <div className="shell grid items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div>
            <h2 className="mb-3.5 text-[26px] font-bold tracking-[-0.02em]">About the facility</h2>
            <p className="mb-4.5 text-[17px] text-body-soft text-pretty">{detail.about1}</p>
            <p className="mb-10 text-[17px] text-body-soft text-pretty">{detail.about2}</p>

            <h2 className="mb-4.5 text-[26px] font-bold tracking-[-0.02em]">Centres of excellence</h2>
            <div className="mb-10 grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(200px,1fr))]">
              {detail.centres.map((c) => (
                <div key={c.name} className="rounded-[14px] border border-line bg-surface px-5 py-4.5">
                  <p className="mb-1 font-display text-[16px] font-semibold text-ink">{c.name}</p>
                  <p className="text-sm text-muted">{c.note}</p>
                </div>
              ))}
            </div>

            <h2 className="mb-4.5 text-[26px] font-bold tracking-[-0.02em]">Indicative treatment costs</h2>
            <CostTable
              caption="Indicative treatment costs in Australian dollars"
              columns={['Procedure', 'Indicative AUD range', 'Typical stay']}
              rows={detail.costs}
            />
            <CostDisclaimer>{COST_DISCLAIMER}</CostDisclaimer>
          </div>

          <aside className="sticky top-[100px] rounded-2xl border border-line bg-surface p-7">
            <h2 className="mb-4.5 text-[19px] font-semibold tracking-[-0.01em]">At a glance</h2>
            <FactList facts={facts} />
            <EnquireButton className="mt-6 block w-full text-center" />
            <p className="mt-3.5 text-center text-[12.5px] text-muted-light">
              Placeholder facility. Not a real hospital.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}
