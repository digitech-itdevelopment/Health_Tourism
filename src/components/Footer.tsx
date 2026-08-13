import { Link } from 'react-router-dom'
import Logo from './Logo'
import { useEnquire } from '../lib/nav'
import { BRAND_NAME, CONTACT, FOOTER_DISCLAIMER, SOCIALS, TAGLINE } from '../data/site'

const EXPLORE = [
  { to: '/hospitals', label: 'Hospital directory' },
  { to: '/treatments/knee-replacement', label: 'Treatments' },
  { to: '/why-india', label: 'Why India' },
  { to: '/your-journey', label: 'Your journey' },
  { to: '/about', label: 'About us' },
]

export default function Footer() {
  const enquire = useEnquire()

  return (
    <footer className="bg-ink px-6 pt-18 pb-9 text-ondark">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-10 border-b border-white/12 pb-11 [grid-template-columns:repeat(auto-fit,minmax(210px,1fr))]">
          <div>
            <div className="mb-4 text-white">
              <Logo onDark />
            </div>
            <p className="mb-4.5 max-w-[280px] text-[15px] text-ondark-soft text-pretty">{TAGLINE}</p>
            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.mark}
                  href="#"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-white/18 text-xs font-semibold text-[#D8DCDF] transition-all duration-300 ease-[var(--ease-std)] hover:border-jade hover:bg-jade hover:text-white"
                >
                  {s.mark}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold tracking-[0.02em] text-white">Explore</p>
            <ul className="grid gap-2.75 text-[14.5px]">
              {EXPLORE.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-ondark-soft hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold tracking-[0.02em] text-white">Support</p>
            <ul className="grid gap-2.75 text-[14.5px]">
              <li>
                <a href="#enquire" onClick={enquire} className="text-ondark-soft hover:text-white">
                  Request a quote
                </a>
              </li>
              <li>
                <a href="#" className="text-ondark-soft hover:text-white">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-ondark-soft hover:text-white">
                  Complaints &amp; feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-ondark-soft hover:text-white">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="mb-4 font-display text-sm font-semibold tracking-[0.02em] text-white">Contact</p>
            <ul className="grid gap-2.75 text-[14.5px] text-ondark-soft">
              <li>
                {CONTACT.address[0]}
                <br />
                {CONTACT.address[1]}
              </li>
              <li>{CONTACT.phone}</li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="text-ondark-soft hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              <li>{CONTACT.hours}</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-5 pt-7">
          <p className="max-w-[820px] text-[13px] leading-relaxed text-ondark-faint text-pretty">
            {FOOTER_DISCLAIMER}
          </p>
          <p className="text-[13px] text-ondark-faint">© 2026 {BRAND_NAME}</p>
        </div>
      </div>
    </footer>
  )
}
