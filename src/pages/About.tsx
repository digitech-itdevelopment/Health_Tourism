import ImageSlot from '../components/ImageSlot'
import { Eyebrow, PageHeader } from '../components/ui'
import { ABOUT_FACTS, ABOUT_PRINCIPLES, ABOUT_STORY, TEAM } from '../data/site'

export default function About() {
  return (
    <main className="pt-[78px]">
      <PageHeader eyebrow="About" title="A small team between two health systems.">
        Placeholder company profile for this prototype. Names, dates and figures below are illustrative.
      </PageHeader>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto grid max-w-[1280px] items-start gap-14 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
          <div className="reveal">
            <h2 className="mb-4.5 text-[clamp(24px,3vw,34px)] font-bold tracking-[-0.02em]">How this started</h2>
            {ABOUT_STORY.map((p, i) => (
              <p key={i} className={`text-[17px] text-body-soft text-pretty ${i === 2 ? 'mb-7' : 'mb-4'}`}>
                {p}
              </p>
            ))}
            <div className="grid gap-5 border-t border-line pt-6.5 [grid-template-columns:repeat(auto-fit,minmax(140px,1fr))]">
              {ABOUT_FACTS.map((f) => (
                <div key={f.k}>
                  <p className="mb-1.5 font-display text-[30px] leading-none font-bold text-jade">{f.v}</p>
                  <p className="text-sm text-muted">{f.k}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="reveal relative h-[460px] overflow-hidden rounded-2xl bg-[#E6E9EA] shadow-media">
            <ImageSlot id="about-office" />
          </div>
        </div>
      </section>

      <section className="bg-tint px-6 py-20">
        <div className="mx-auto max-w-[1280px]">
          <div className="reveal mb-11 max-w-[620px]">
            <Eyebrow>The team</Eyebrow>
            <h2 className="mb-3.5 text-[clamp(26px,3.2vw,36px)] font-bold tracking-[-0.02em]">
              Seven people, two time zones
            </h2>
            <p className="text-[17px] text-body-soft text-pretty">
              Placeholder profiles. Coordinators are non-clinical staff; clinical decisions rest with the treating
              hospital.
            </p>
          </div>
          <div className="grid gap-5.5 [grid-template-columns:repeat(auto-fit,minmax(230px,1fr))]">
            {TEAM.map((t) => (
              <article
                key={t.id}
                className="reveal overflow-hidden rounded-2xl border border-line bg-white transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative h-[220px] bg-[#E6E9EA]">
                  <ImageSlot id={t.id} />
                </div>
                <div className="p-5.5">
                  <h3 className="mb-1 text-[17.5px] font-semibold tracking-[-0.01em]">{t.name}</h3>
                  <p className="mb-3 text-sm font-semibold text-jade">{t.role}</p>
                  <p className="text-[14.5px] text-body-soft text-pretty">{t.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface px-6 py-20">
        <div className="mx-auto grid max-w-[1000px] gap-5 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          {ABOUT_PRINCIPLES.map((p) => (
            <div key={p.title} className="reveal rounded-2xl border border-line bg-white px-6.5 py-7">
              <h3 className="mb-2.5 text-[18px] font-semibold tracking-[-0.01em]">{p.title}</h3>
              <p className="text-[15.5px] text-body-soft text-pretty">{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
