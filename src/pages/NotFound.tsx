import { Link } from 'react-router-dom'
import { PageHeader } from '../components/ui'

export default function NotFound() {
  return (
    <main className="pt-[78px]">
      <PageHeader eyebrow="Not found" title="That page does not exist.">
        The link may be out of date. The hospital directory is the best place to start.
      </PageHeader>
      <section className="bg-surface px-6 py-20">
        <div className="shell">
          <Link
            to="/hospitals"
            className="inline-block rounded-xl bg-jade px-6 py-3.25 text-[15px] font-semibold text-white transition-all duration-300 ease-[var(--ease-std)] hover:-translate-y-0.5 hover:bg-jade-dark"
          >
            Browse partner hospitals
          </Link>
        </div>
      </section>
    </main>
  )
}
