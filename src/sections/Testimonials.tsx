import { useState } from 'react'
import ImageSlot from '../components/ImageSlot'
import { Eyebrow } from '../components/ui'
import { STORIES } from '../data/site'

const NAV =
  'h-11.5 w-11.5 cursor-pointer rounded-xl border border-line bg-white text-[17px] text-ink transition-all duration-300 ease-[var(--ease-std)] hover:bg-ink hover:text-white'

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const story = STORIES[index]
  const step = (d: number) => setIndex((i) => (i + STORIES.length + d) % STORIES.length)

  return (
    <section aria-label="Patient stories" className="border-t border-line bg-white px-6 py-24">
      <div className="shell">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-[560px]">
            <Eyebrow>Patient stories</Eyebrow>
            <h2 className="text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
              In their own words.
            </h2>
          </div>
          <div className="flex gap-2.5">
            <button type="button" aria-label="Previous story" onClick={() => step(-1)} className={NAV}>
              ←
            </button>
            <button type="button" aria-label="Next story" onClick={() => step(1)} className={NAV}>
              →
            </button>
          </div>
        </div>

        <div
          aria-live="polite"
          className="grid items-center gap-10 rounded-2xl border border-line bg-surface p-[clamp(28px,4vw,52px)] [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]"
        >
          <div>
            <p className="mb-6 font-display text-[clamp(19px,2.2vw,26px)] leading-[1.5] font-medium tracking-[-0.01em] text-ink text-pretty">
              “{story.quote}”
            </p>
            <p className="font-display text-[16px] font-semibold text-ink">{story.name}</p>
            <p className="mt-1 text-[14.5px] text-muted">{story.meta}</p>
            <p className="mt-5 text-[12.5px] text-muted-light">
              Placeholder testimonial — illustrative content, not a real patient.
            </p>
          </div>
          <div className="relative h-[280px] overflow-hidden rounded-[14px] bg-tint">
            <ImageSlot id="story-portrait" />
          </div>
        </div>
      </div>
    </section>
  )
}
