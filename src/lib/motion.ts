import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const on = () => setMatches(mq.matches)
    on()
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [query])
  return matches
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return reduced
}

/**
 * Reveals every `.reveal` on the page as it scrolls in: 600ms fade + 24px rise,
 * staggered 80ms in groups of 8, per the handoff. One observer for the whole
 * route rather than a wrapper component per section.
 */
export function useReveal() {
  const { pathname } = useLocation()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)'))
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (!entry.isIntersecting) return
          const el = entry.target as HTMLElement
          el.style.transitionDelay = `${(i % 8) * 80}ms`
          el.classList.add('is-in')
          io.unobserve(el)
        })
      },
      // -8% bottom margin approximates the handoff's "within 92% of viewport height".
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [pathname])
}

/** Counts 0 → target with an ease-out cubic over 1600ms, once, on entering view. */
export function useCountUp(targets: number[]) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const [values, setValues] = useState(() => targets.map(() => 0))

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (reduced) {
      setValues(targets)
      return
    }
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const t0 = performance.now()
        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / 1600)
          const eased = 1 - Math.pow(1 - p, 3)
          setValues(targets.map((t) => Math.round(t * eased)))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.25 },
    )
    io.observe(node)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
    // targets is a module-level constant; identity is stable enough to skip deep compare.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced])

  return { ref, values }
}

/** translateY proportional to the element's distance from viewport centre. */
export function useParallax(strength: number) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node || reduced) return
    let raf = 0
    const update = () => {
      raf = 0
      const rect = node.getBoundingClientRect()
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      node.style.transform = `translateY(${(-offset * strength).toFixed(2)}px)`
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [strength, reduced])

  return ref
}

/** Auto-advancing index that pauses while `paused` is true. */
export function useAutoAdvance(count: number, ms: number, paused = false) {
  const [index, setIndex] = useState(0)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (paused || reduced || count < 2) return
    const id = setInterval(() => setIndex((i) => (i + 1) % count), ms)
    return () => clearInterval(id)
  }, [count, ms, paused, reduced])

  return [index, setIndex] as const
}
