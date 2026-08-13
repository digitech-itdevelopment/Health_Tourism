import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useEnquire } from '../lib/nav'

const LINKS = [
  { to: '/hospitals', label: 'Hospitals', secondary: false },
  { to: '/treatments/knee-replacement', label: 'Treatments', secondary: false },
  { to: '/why-india', label: 'Why India', secondary: true },
  { to: '/your-journey', label: 'Your Journey', secondary: true },
]

// Below 720px the wordmark, four links and the CTA can no longer share a row without the
// CTA falling off the right edge, so navigation moves into a panel. Those breakpoints are
// written out literally below rather than composed from a constant: Tailwind extracts
// class names by scanning source text, so a name built at runtime generates no CSS.

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const enquire = useEnquire()

  // Transparent only over the home hero; solid everywhere else, past 40px, and
  // whenever the panel is down (its links need a background to sit on).
  const solid = scrolled || open || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Never leave the panel hanging open across a navigation.
  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 transition-[background,box-shadow] duration-400 ease-[var(--ease-std)] ${
        solid ? 'bg-white/96 shadow-header' : 'bg-transparent shadow-none'
      }`}
    >
      <div className="shell flex items-center gap-8 px-6 py-3.5">
        <Link to="/" className={solid ? 'text-ink' : 'text-white'} aria-label="Home">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="ml-auto flex items-center gap-6 max-[720px]:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-[14.5px] font-medium whitespace-nowrap transition-colors duration-300 ease-[var(--ease-std)] hover:text-jade ${
                solid ? 'text-ink' : 'text-white'
              } ${l.secondary ? 'max-[1040px]:hidden' : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#enquire"
            onClick={enquire}
            className="rounded-xl bg-jade px-5 py-2.5 text-[14.5px] font-semibold whitespace-nowrap text-white transition-all duration-300 ease-[var(--ease-std)] hover:-translate-y-0.5 hover:bg-jade-dark hover:shadow-[0_10px_24px_rgb(24_106_87_/_0.3)]"
          >
            Request a Free Quote
          </a>
        </nav>

        <button
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className={`ml-auto hidden h-11 w-11 cursor-pointer items-center justify-center rounded-xl border max-[720px]:flex ${
            solid ? 'border-line text-ink' : 'border-white/30 text-white'
          }`}
        >
          <span aria-hidden="true" className="relative block h-4 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-[var(--ease-std)] ${
                open ? 'top-1.75 rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute top-1.75 left-0 block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                open ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-[var(--ease-std)] ${
                open ? 'top-1.75 -rotate-45' : 'top-3.5'
              }`}
            />
          </span>
        </button>
      </div>

      <div
        id="site-menu"
        hidden={!open}
        className="hidden border-t border-line bg-white max-[720px]:block"
      >
        <nav aria-label="Primary" className="shell grid gap-1 px-6 py-4">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-2 py-3 text-[16px] font-medium text-ink hover:bg-surface"
            >
              {l.label}
            </Link>
          ))}
          <a
            href="#enquire"
            onClick={(e) => {
              setOpen(false)
              enquire(e)
            }}
            className="mt-2 rounded-xl bg-jade px-5 py-3.5 text-center text-[15px] font-semibold text-white"
          >
            Request a Free Quote
          </a>
        </nav>
      </div>
    </header>
  )
}
