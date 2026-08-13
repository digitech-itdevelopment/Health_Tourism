import { Bullet, CostDisclaimer, EnquireButton, Eyebrow, PageHeader } from '../components/ui'
import { COMPARE, NOT_CLAIMS, VETTING } from '../data/site'

const TH = 'border-b border-line px-5 py-3.75 text-left font-display text-[13.5px] font-semibold text-ink'
const TD = 'border-b border-rule px-5 py-3.75'

export default function WhyIndia() {
  return (
    <main className="pt-[78px]">
      <PageHeader eyebrow="Why India" title="What the numbers look like, and how we choose the hospitals.">
        Two things decide this for most people: the wait and the bill. Both are set out below, followed by how a
        facility gets onto our list in the first place.
      </PageHeader>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto max-w-[1080px]">
          <h2 className="reveal mb-3.5 text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.02em]">
            Wait times and cost, side by side
          </h2>
          <p className="reveal mb-7.5 max-w-[720px] text-[17px] text-body-soft text-pretty">
            Australian figures are indicative ranges drawn from publicly reported elective surgery data and typical
            private estimates. Your own wait depends on your category, state and hospital; your own cost depends on a
            medical assessment.
          </p>

          <div className="reveal overflow-hidden overflow-x-auto rounded-2xl border border-line bg-white">
            <table className="w-full border-collapse text-[15px]">
              <caption className="sr-only">
                Indicative wait times and costs, Australia compared with India
              </caption>
              <thead>
                <tr className="bg-tint">
                  <th scope="col" className={TH}>
                    Procedure
                  </th>
                  <th scope="col" className={TH}>
                    AU public wait
                  </th>
                  <th scope="col" className={TH}>
                    AU private estimate
                  </th>
                  <th scope="col" className={TH}>
                    India indicative AUD
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((c) => (
                  <tr key={c.proc}>
                    <td className={`${TD} font-medium text-ink`}>{c.proc}</td>
                    <td className={`${TD} text-body-soft`}>{c.wait}</td>
                    <td className={`${TD} text-body-soft`}>{c.au}</td>
                    <td className={`${TD} font-semibold text-jade`}>{c.in}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3.5">
            <CostDisclaimer>
              Indicative only, subject to medical assessment. India ranges exclude international flights and any
              extended stay; Australian figures are illustrative and vary by state, insurer and hospital.
            </CostDisclaimer>
          </div>
        </div>
      </section>

      <section className="bg-tint px-6 py-20">
        <div className="shell">
          <div className="reveal mb-11 max-w-[680px]">
            <Eyebrow>Safety and standards</Eyebrow>
            <h2 className="mb-3.5 text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.02em]">
              How a hospital gets onto this list
            </h2>
            <p className="text-[17px] text-body-soft text-pretty">
              We do not rate hospitals or publish outcome claims. What we do is collect documentation, check it is
              current, and put it in front of you in the same format for every facility so you can compare like with
              like.
            </p>
          </div>

          <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {VETTING.map((v) => (
              <article
                key={v.n}
                className="reveal rounded-2xl border border-line bg-white px-6 py-7 transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-[0_18px_40px_rgb(22_24_26/0.1)]"
              >
                <p className="mb-3.5 font-mono text-xs tracking-[0.14em] text-jade">{v.n}</p>
                <h3 className="mb-2.25 text-[18.5px] font-semibold tracking-[-0.01em]">{v.title}</h3>
                <p className="text-[15.5px] text-body-soft text-pretty">{v.body}</p>
              </article>
            ))}
          </div>

          <div className="reveal mt-8 rounded-2xl border border-line bg-white px-7.5 py-7">
            <h3 className="mb-3.5 text-[18.5px] font-semibold tracking-[-0.01em]">What we will not tell you</h3>
            <ul className="grid gap-2.75">
              {NOT_CLAIMS.map((c) => (
                <Bullet key={c}>{c}</Bullet>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-ink px-6 py-16 text-center">
        <h2 className="mb-5 text-[clamp(24px,2.8vw,32px)] font-bold tracking-[-0.02em] text-white">
          Want the comparison run against your own case?
        </h2>
        <EnquireButton />
      </section>
    </main>
  )
}
