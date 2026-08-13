import { Link } from 'react-router-dom'
import ImageSlot from '../components/ImageSlot'
import { Bullet, Eyebrow } from '../components/ui'
import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import HospitalCarousel from '../sections/HospitalCarousel'
import Testimonials from '../sections/Testimonials'
import Faq from '../sections/Faq'
import EnquiryForm from '../sections/EnquiryForm'
import { AMBASSADOR, DESTINATIONS, INFRA, JOURNEY, SPECIALTIES, WHY_CARDS } from '../data/site'
import { useParallax } from '../lib/motion'

export default function Home() {
  const infraParallax = useParallax(0.04)
  const destParallax = useParallax(0.03)

  return (
    <main>
      <Hero />
      <StatsBar />

      {/* Why India, why now */}
      <section id="why" className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="reveal mb-12 max-w-[660px]">
            <Eyebrow>Why India, why now</Eyebrow>
            <h2 className="mb-4 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
              Four reasons Australians look overseas for elective surgery.
            </h2>
            <p className="text-[17px] text-body-soft text-pretty">
              Every figure below is indicative and drawn from publicly reported ranges. Your own timing, suitability
              and cost depend on a medical assessment.
            </p>
          </div>
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
            {WHY_CARDS.map((c) => (
              <article
                key={c.mark}
                className="reveal rounded-2xl border border-line bg-white px-6.5 pt-7.5 pb-8 shadow-rest transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  aria-hidden="true"
                  className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-tint font-display text-[15px] font-bold text-jade"
                >
                  {c.mark}
                </span>
                <h3 className="mb-2.5 text-[20px] font-semibold tracking-[-0.01em]">{c.title}</h3>
                <p className="mb-3.5 text-[15.5px] text-body-soft text-pretty">{c.body}</p>
                <p className="border-t border-tint pt-3.25 text-[13px] text-muted">{c.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by specialty */}
      <section aria-label="Browse by specialty" className="border-t border-line bg-white px-6 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="reveal mb-11 flex flex-wrap items-end justify-between gap-5">
            <div className="max-w-[560px]">
              <Eyebrow>Browse by specialty</Eyebrow>
              <h2 className="text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
                Twenty-five specialties across our partner network.
              </h2>
            </div>
            <Link to="/hospitals" className="text-[15px] font-semibold text-jade">
              View all hospitals →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-4 max-[1080px]:grid-cols-3 max-[760px]:grid-cols-2">
            {SPECIALTIES.map((sp) => (
              <div
                key={sp.id}
                className="reveal overflow-hidden rounded-2xl border border-line bg-white transition-all duration-350 ease-[var(--ease-std)] hover:-translate-y-1 hover:border-jade hover:shadow-[0_16px_32px_rgb(22_24_26/0.1)]"
              >
                <div className="relative h-[132px] bg-tint">
                  <ImageSlot id={sp.id} />
                </div>
                <div className="flex items-center gap-3 px-4.5 py-4">
                  <span
                    aria-hidden="true"
                    className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-[10px] bg-tint font-display text-xs font-bold text-jade"
                  >
                    {sp.mark}
                  </span>
                  <Link
                    to="/treatments/knee-replacement"
                    className="font-display text-[15.5px] leading-tight font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 ease-[var(--ease-std)] hover:text-jade"
                  >
                    {sp.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HospitalCarousel />

      {/* Medical infrastructure */}
      <section aria-label="Medical infrastructure" className="overflow-hidden bg-white px-6 py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(320px,1fr))]">
          <div ref={infraParallax} className="relative">
            <div className="relative h-[380px] overflow-hidden rounded-2xl bg-tint shadow-media">
              <ImageSlot id="infra-theatre" />
            </div>
            <div className="absolute right-[-18px] bottom-[-42px] h-[180px] w-[46%] overflow-hidden rounded-2xl border-6 border-white bg-[#EAEDEE] shadow-[0_20px_44px_rgb(22_24_26/0.14)]">
              <ImageSlot id="infra-imaging" />
            </div>
          </div>
          <div className="reveal">
            <Eyebrow>Medical infrastructure</Eyebrow>
            <h2 className="mb-4.5 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
              The equipment and staffing behind the quote.
            </h2>
            <p className="mb-7 text-[17px] text-body-soft text-pretty">
              We list what each partner facility actually has on site, so you can compare on capability rather than
              marketing.
            </p>
            <ul className="grid gap-0.5">
              {INFRA.map((i) => (
                <li key={i.title} className="flex gap-4 border-t border-tint py-4">
                  <span aria-hidden="true" className="mt-2.25 h-1.75 w-1.75 shrink-0 rounded-[2px] bg-jade" />
                  <div>
                    <p className="mb-0.75 font-display text-[16px] font-semibold text-ink">{i.title}</p>
                    <p className="text-[15px] text-body-soft">{i.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Your journey */}
      <section id="journey" className="bg-ink px-6 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="reveal mb-14 max-w-[640px]">
            <Eyebrow onDark>Your journey</Eyebrow>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em] text-white">
              Six steps, one coordinator, from enquiry to aftercare.
            </h2>
            <p className="text-[17px] text-ondark text-pretty">
              You keep the same case coordinator throughout, contactable during AEST business hours.
            </p>
          </div>
          <ol className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(190px,1fr))]">
            {JOURNEY.map((j) => (
              <li key={j.n} className="reveal border-t-2 border-jade-light/50 pt-5">
                <p className="mb-3 font-mono text-xs tracking-[0.14em] text-jade-light">{j.n}</p>
                <h3 className="mb-2.25 text-[17.5px] leading-tight font-semibold tracking-[-0.01em] text-white">
                  {j.title}
                </h3>
                <p className="text-[14.5px] text-ondark-soft text-pretty">{j.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Recovery stays */}
      <section aria-label="Recover and explore India" className="bg-surface px-6 py-24">
        <div className="mx-auto max-w-[1280px]">
          <div className="reveal mb-11 max-w-[620px]">
            <Eyebrow>Recovery stays</Eyebrow>
            <h2 className="mb-3.5 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
              The fortnight between discharge and the flight home.
            </h2>
            <p className="text-[17px] text-body-soft text-pretty">
              Most procedures need one to three weeks in country after discharge before you are cleared to fly. That
              time has to happen somewhere, so we arrange quiet accommodation within reach of the hospital, with
              outpatient physiotherapy and a driver on call. Locations are proposed at the discharge review, by your
              surgeon’s clearance, not booked in advance.
            </p>
          </div>
          <div
            ref={destParallax}
            className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"
          >
            {DESTINATIONS.map((d) => (
              <article
                key={d.id}
                className="group reveal relative h-[400px] overflow-hidden rounded-2xl border border-line transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-[0_22px_46px_rgb(22_24_26/0.16)]"
              >
                <div className="absolute inset-0 bg-[#EAEDEE] transition-transform duration-600 ease-[var(--ease-std)] group-hover:scale-107">
                  <ImageSlot id={d.id} />
                </div>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(22_24_26/0)_40%,rgb(22_24_26/0.85)_100%)]"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6.5">
                  <h3 className="mb-1.5 text-[22px] font-bold tracking-[-0.01em] text-white">{d.name}</h3>
                  <p className="mb-2 text-[14.5px] text-[#D8DCDF]">{d.line}</p>
                  <p className="font-mono text-[11.5px] tracking-[0.06em] text-[#B9BFC4]">{d.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* Meet your ambassador */}
      <section id="about" className="bg-tint px-6 py-24">
        <div className="mx-auto grid max-w-[1280px] items-center gap-14 [grid-template-columns:repeat(auto-fit,minmax(280px,1fr))]">
          <div className="reveal relative h-[440px] overflow-hidden rounded-2xl bg-[#E6E9EA] shadow-media">
            <ImageSlot id="ambassador" />
          </div>
          <div className="reveal">
            <Eyebrow>Meet your ambassador</Eyebrow>
            <h2 className="mb-2 text-[clamp(26px,3.2vw,38px)] leading-tight font-bold tracking-[-0.02em]">
              {AMBASSADOR.name}
            </h2>
            <p className="mb-5.5 text-[15.5px] font-semibold text-jade">
              {AMBASSADOR.role} <span className="font-normal text-muted-light">(placeholder)</span>
            </p>
            <p className="mb-5 text-[16.5px] text-body-soft text-pretty">{AMBASSADOR.bio}</p>
            <blockquote className="mb-6 rounded-r-xl border-l-3 border-jade-light bg-white px-6 py-5 text-[16.5px] text-ink text-pretty">
              “{AMBASSADOR.quote}”
            </blockquote>
            <ul className="mb-6 grid gap-2">
              {AMBASSADOR.creds.map((c) => (
                <Bullet key={c}>{c}</Bullet>
              ))}
            </ul>
            <p className="text-[15px] text-body-soft">{AMBASSADOR.contact}</p>
          </div>
        </div>
      </section>

      <Faq />
      <EnquiryForm />
    </main>
  )
}
