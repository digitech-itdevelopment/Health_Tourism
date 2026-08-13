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

export default function Header() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const enquire = useEnquire()

  // Transparent only over the home hero; solid everywhere else and past 40px.
  const solid = scrolled || pathname !== '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 transition-[background,box-shadow] duration-400 ease-[var(--ease-std)] ${
        solid ? 'bg-white/96 shadow-header' : 'bg-transparent shadow-none'
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center gap-8 px-6 py-3.5">
        <Link to="/" className={solid ? 'text-ink' : 'text-white'} aria-label="Home">
          <Logo />
        </Link>
        <nav aria-label="Primary" className="ml-auto flex items-center gap-6 max-[620px]:gap-4">
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
            className="rounded-xl bg-jade px-5 py-2.5 text-[14.5px] font-semibold whitespace-nowrap text-white transition-all duration-300 ease-[var(--ease-std)] hover:-translate-y-0.5 hover:bg-jade-dark hover:shadow-[0_10px_24px_rgb(24_106_87_/_0.3)] max-[620px]:px-3.5 max-[620px]:py-2.5 max-[620px]:text-[13.5px]"
          >
            Request a Free Quote
          </a>
        </nav>
      </div>
    </header>
  )
}
