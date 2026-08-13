import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const HEADER_OFFSET = 72

function scrollToEnquire(reduced: boolean) {
  const el = document.getElementById('enquire')
  if (!el) return
  const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: y, behavior: reduced ? 'auto' : 'smooth' })
  const field = el.querySelector<HTMLInputElement>('input[name="name"]')
  if (field) setTimeout(() => field.focus({ preventScroll: true }), reduced ? 0 : 900)
}

/**
 * "Request a Free Quote": smooth-scrolls to the enquiry form. From any route other
 * than home it navigates home first, then scrolls once the form has mounted.
 */
export function useEnquire() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return useCallback(
    (e?: { preventDefault: () => void }) => {
      e?.preventDefault()
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (pathname !== '/') {
        navigate('/')
        setTimeout(() => scrollToEnquire(reduced), 120)
      } else {
        scrollToEnquire(reduced)
      }
    },
    [navigate, pathname],
  )
}
