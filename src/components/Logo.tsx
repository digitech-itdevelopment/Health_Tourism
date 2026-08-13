import { BRAND } from '../data/site'

type Props = { onDark?: boolean; className?: string }

/** Two overlapping rings, 44×30. Second ring goes pale on dark backgrounds. */
export default function Logo({ onDark = false, className = '' }: Props) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <svg width="44" height="30" viewBox="0 0 44 30" aria-hidden="true" className="block shrink-0">
        <circle cx="16" cy="15" r="11.5" fill="none" stroke={onDark ? '#4FB79A' : '#186A57'} strokeWidth="3" />
        <circle
          cx="28"
          cy="15"
          r="11.5"
          fill="none"
          stroke={onDark ? '#F7F8F8' : '#4FB79A'}
          strokeWidth="3"
          opacity={onDark ? 0.85 : 1}
        />
      </svg>
      <span className="font-display text-[19px] tracking-[-0.015em]">
        <span className="font-bold">{BRAND.first}</span>
        <span className="font-medium opacity-72">{BRAND.second}</span>
      </span>
    </span>
  )
}
