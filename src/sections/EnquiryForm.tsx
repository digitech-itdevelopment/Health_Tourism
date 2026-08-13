import { useState } from 'react'
import { Bullet, Eyebrow } from '../components/ui'
import { BRAND_NAME, ENQUIRY_CITIES, ENQUIRY_POINTS, TREATMENT_OPTIONS } from '../data/site'

const FIELD =
  'rounded-[11px] border border-line bg-white px-4 py-3.25 text-[15px] font-normal text-body transition-[border-color,box-shadow] duration-300 ease-[var(--ease-std)]'

const SELECT = `${FIELD} select-field pr-10`

const LABEL = 'grid gap-1.75 text-sm font-semibold text-ink'
const ROW = 'grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]'

export default function EnquiryForm() {
  const [sent, setSent] = useState(false)

  return (
    <section id="enquire" className="border-t border-line bg-surface px-6 py-24">
      <div className="mx-auto grid max-w-[1280px] gap-14 [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))]">
        <div className="reveal">
          <Eyebrow>Request a free quote</Eyebrow>
          <h2 className="mb-4.5 text-[clamp(28px,3.4vw,42px)] leading-[1.18] font-bold tracking-[-0.02em]">
            Send your details. We reply within two AEST business days.
          </h2>
          <p className="mb-6.5 text-[17px] text-body-soft text-pretty">
            There is no charge for an enquiry and no obligation. Nothing is confirmed until a treating specialist has
            reviewed your records.
          </p>
          <ul className="grid gap-3">
            {ENQUIRY_POINTS.map((p) => (
              <Bullet key={p}>{p}</Bullet>
            ))}
          </ul>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
          className="reveal grid gap-4 rounded-2xl border border-line bg-white p-8 shadow-rest"
        >
          <div className={ROW}>
            <label className={LABEL}>
              Full name
              <input type="text" name="name" required className={FIELD} />
            </label>
            <label className={LABEL}>
              Email
              <input type="email" name="email" required className={FIELD} />
            </label>
          </div>

          <div className={ROW}>
            <label className={LABEL}>
              Australian phone
              <input type="tel" name="phone" placeholder="04XX XXX XXX" className={FIELD} />
            </label>
            <label className={LABEL}>
              Treatment
              <select name="treatment" className={SELECT}>
                {TREATMENT_OPTIONS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
                <option>Not sure yet</option>
              </select>
            </label>
          </div>

          <div className={ROW}>
            <label className={LABEL}>
              Preferred city
              <select name="city" className={SELECT}>
                <option>No preference</option>
                {ENQUIRY_CITIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className={LABEL}>
              Timeframe
              <select name="timeframe" className={SELECT}>
                <option>Within 1 month</option>
                <option>1–3 months</option>
                <option>3–6 months</option>
                <option>Researching only</option>
              </select>
            </label>
          </div>

          <label className={LABEL}>
            Message
            <textarea
              name="message"
              rows={4}
              placeholder="Diagnosis, current treating doctor, any scans or reports you already have."
              className={`${FIELD} resize-y font-sans`}
            />
          </label>

          <label className="flex items-start gap-3 text-sm leading-normal font-normal text-body-soft">
            <input
              type="checkbox"
              name="consent"
              required
              className="mt-1 h-4.25 w-4.25 shrink-0 accent-jade"
            />
            <span>
              I consent to {BRAND_NAME} handling my personal and health information to prepare an indicative quote, and
              to sharing it with partner hospitals for assessment.
            </span>
          </label>

          <button
            type="submit"
            className="cursor-pointer rounded-xl bg-jade px-6 py-3.75 text-[16px] font-semibold text-white transition-all duration-300 ease-[var(--ease-std)] hover:-translate-y-0.5 hover:bg-jade-dark hover:shadow-[0_12px_28px_rgb(24_106_87/0.3)]"
          >
            Request my free quote
          </button>

          <p aria-live="polite" className="m-0 text-[12.5px] text-muted-light">
            {sent
              ? 'Prototype only — your enquiry was not sent anywhere.'
              : 'Prototype form — submissions are not sent anywhere.'}
          </p>
        </form>
      </div>
    </section>
  )
}
