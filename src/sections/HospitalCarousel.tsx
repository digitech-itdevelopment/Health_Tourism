import { useState } from 'react'
import ImageSlot from '../components/ImageSlot'
import { Eyebrow, HospitalLink, Pills } from '../components/ui'
import { HOSPITALS } from '../data/site'
import { useAutoAdvance } from '../lib/motion'

// Three cards visible, so the last useful offset is length - 3 + 1.
const MAX_SLIDE = Math.max(1, HOSPITALS.length - 2)

const ARROW =
  'absolute top-1/2 z-5 flex h-12 w-12 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-[#DDE1E3] bg-white text-[18px] text-ink opacity-0 shadow-arrow transition-all duration-300 ease-[var(--ease-std)] group-hover:opacity-100 group-focus-within:opacity-100 hover:scale-106 hover:bg-ink hover:text-white'

export default function HospitalCarousel() {
  const [paused, setPaused] = useState(false)
  const [slide, setSlide] = useAutoAdvance(MAX_SLIDE, 5000, paused)

  const go = (delta: number) => setSlide((s) => (s + MAX_SLIDE + delta) % MAX_SLIDE)

  return (
    <section aria-label="Partner hospitals" className="bg-tint px-6 py-24">
      <div className="shell">
        <div className="reveal mb-10 max-w-[600px]">
          <Eyebrow>Our partner hospitals</Eyebrow>
          <h2 className="mb-3 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
            Forty accredited facilities, eighteen cities.
          </h2>
          <p className="text-[16px] text-body-soft">Hospital names shown are placeholders for this prototype.</p>
        </div>

        <div className="group relative">
          <button
            type="button"
            aria-label="Previous hospitals"
            onClick={() => go(-1)}
            className={`${ARROW} left-[-22px]`}
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next hospitals"
            onClick={() => go(1)}
            className={`${ARROW} right-[-22px]`}
          >
            →
          </button>

          <div
            role="group"
            aria-label="Hospital carousel"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') {
                e.preventDefault()
                go(1)
              }
              if (e.key === 'ArrowLeft') {
                e.preventDefault()
                go(-1)
              }
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            className="overflow-hidden rounded-[18px] outline-offset-4"
          >
            {/* --per is how many cards fit; the slide maths and the card width both
                read it, so they can never disagree across breakpoints. */}
            <div
              className="flex gap-6 transition-transform duration-500 ease-[var(--ease-std)] [--per:3] max-[900px]:[--per:2] max-[620px]:[--per:1]"
              style={{ transform: `translateX(calc(${-slide} * (100% + 24px) / var(--per)))` }}
            >
              {HOSPITALS.map((h, i) => (
                <article
                  key={h.slug}
                  className="flex-[0_0_calc((100%-(var(--per)-1)*24px)/var(--per))] overflow-hidden rounded-2xl border border-[#DDE1E3] bg-white transition-all duration-400 ease-[var(--ease-std)] hover:-translate-y-1 hover:shadow-[0_20px_44px_rgb(22_24_26/0.16)]"
                >
                  <div className="relative h-[190px] bg-tint">
                    <ImageSlot id={`hosp-${i}`} />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-1.5 text-[18.5px] leading-tight font-semibold tracking-[-0.01em]">{h.name}</h3>
                    <p className="mb-4 text-sm text-muted">
                      {h.city} · {h.beds} beds
                    </p>
                    <Pills tags={h.tags} />
                    <HospitalLink slug={h.slug} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-center gap-2.25">
          {Array.from({ length: MAX_SLIDE }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Show hospitals ${i + 1} to ${i + 3}`}
              onClick={() => setSlide(i)}
              style={{ width: slide === i ? 28 : 8 }}
              className={`h-2 cursor-pointer rounded-full border-none p-0 transition-all duration-350 ease-[var(--ease-std)] ${
                slide === i ? 'bg-jade' : 'bg-[#B7D3E6]'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
