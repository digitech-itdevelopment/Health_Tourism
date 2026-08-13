import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useEnquire } from '../lib/nav'

/** Mono, uppercase, wide-tracked label that opens most sections. */
export function Eyebrow({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p className={`eyebrow mb-3.5 ${onDark ? 'text-jade-light' : 'text-jade'}`}>{children}</p>
  )
}

/** Dark page header used by every interior route. */
export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: ReactNode
}) {
  return (
    <section className="bg-ink px-6 py-16">
      <div className="mx-auto max-w-[1280px]">
        <Eyebrow onDark>{eyebrow}</Eyebrow>
        <h1 className="mb-3.5 max-w-[820px] text-[clamp(30px,4vw,46px)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
          {title}
        </h1>
        {children ? (
          <p className="max-w-[660px] text-[17px] text-ondark text-pretty">{children}</p>
        ) : null}
      </div>
    </section>
  )
}

export function EnquireButton({
  children = 'Request a free quote',
  className = '',
}: {
  children?: ReactNode
  className?: string
}) {
  const enquire = useEnquire()
  return (
    <a
      href="#enquire"
      onClick={enquire}
      className={`inline-block rounded-xl bg-jade px-6 py-3.25 text-[15px] font-semibold text-white transition-all duration-300 ease-[var(--ease-std)] hover:-translate-y-0.5 hover:bg-jade-dark ${className}`}
    >
      {children}
    </a>
  )
}

/** Mint strip that must accompany every price table. */
export function CostDisclaimer({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-[10px] border border-mint-line bg-mint px-4 py-3 text-[13px] text-muted">{children}</p>
  )
}

export function CostTable({
  columns,
  rows,
  caption,
}: {
  columns: [string, string, string]
  rows: { proc: string; range: string; stay: string }[]
  caption?: string
}) {
  return (
    <div className="mb-3.5 overflow-hidden overflow-x-auto rounded-2xl border border-line">
      <table className="w-full border-collapse text-[15px]">
        {caption ? <caption className="sr-only">{caption}</caption> : null}
        <thead>
          <tr className="bg-surface">
            {columns.map((c) => (
              <th
                key={c}
                scope="col"
                className="border-b border-line px-5 py-3.5 text-left font-display text-sm font-semibold text-ink"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.proc}>
              <td className="border-b border-rule px-5 py-3.5 text-body">{r.proc}</td>
              <td className="border-b border-rule px-5 py-3.5 font-semibold text-ink">{r.range}</td>
              <td className="border-b border-rule px-5 py-3.5 text-muted">{r.stay}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Square jade marker used by every bullet list in the design. */
export function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[15.5px] text-body-soft">
      <span aria-hidden="true" className="mt-2.25 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-jade" />
      <span>{children}</span>
    </li>
  )
}

export function FactList({ facts }: { facts: { k: string; v: string }[] }) {
  return (
    <dl className="m-0 grid">
      {facts.map((f) => (
        <div key={f.k} className="flex justify-between gap-4.5 border-t border-line py-3.25">
          <dt className="text-[14.5px] text-muted">{f.k}</dt>
          <dd className="m-0 text-right text-[14.5px] font-semibold text-ink">{f.v}</dd>
        </div>
      ))}
    </dl>
  )
}

export function HospitalLink({ slug, className = '' }: { slug: string; className?: string }) {
  return (
    <Link to={`/hospitals/${slug}`} className={`text-[14.5px] font-semibold text-jade ${className}`}>
      View Hospital →
    </Link>
  )
}

export function Pills({ tags }: { tags: string[] }) {
  return (
    <div className="mb-4.5 flex flex-wrap gap-1.75">
      {tags.map((t) => (
        <span key={t} className="inline-flex rounded-lg border border-line px-2.5 py-1.25 text-[12.5px] text-body-soft">
          {t}
        </span>
      ))}
    </div>
  )
}
