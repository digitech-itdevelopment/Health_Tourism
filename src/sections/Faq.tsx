import { useState } from 'react'
import { Eyebrow } from '../components/ui'
import { FAQS } from '../data/site'

export default function Faq() {
  // One open at a time; index 0 by default, -1 means all closed.
  const [open, setOpen] = useState(0)

  return (
    <section aria-label="Frequently asked questions" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-[900px]">
        <div className="reveal mb-11">
          <Eyebrow>Questions</Eyebrow>
          <h2 className="text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
            The eight we are asked most.
          </h2>
        </div>

        {FAQS.map((f, i) => {
          const expanded = open === i
          return (
            <div key={f.q} className="border-t border-line">
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={expanded}
                  onClick={() => setOpen(expanded ? -1 : i)}
                  className="flex w-full cursor-pointer items-center justify-between gap-5 px-1 py-6 text-left font-display text-[17.5px] font-semibold tracking-[-0.01em] text-ink transition-colors duration-300 ease-[var(--ease-std)] hover:text-jade"
                >
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-tint text-[16px] leading-none text-jade"
                  >
                    {expanded ? '−' : '+'}
                  </span>
                </button>
              </h3>
              <div
                className="overflow-hidden transition-all duration-400 ease-[var(--ease-std)]"
                style={{ maxHeight: expanded ? 420 : 0, opacity: expanded ? 1 : 0 }}
              >
                <p className="pr-15 pb-6.5 pl-1 text-[16px] text-body-soft text-pretty">{f.a}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
