import { IMAGE_BY_ID } from '../data/images'

// Any file dropped into src/assets/images/<id>.<ext> is picked up automatically.
// Until then the slot renders a labelled placeholder at the same size, so adding
// the real photo later causes no layout shift.
const files = import.meta.glob('../assets/images/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

const SRC_BY_ID: Record<string, string> = {}
for (const path in files) {
  const id = path.split('/').pop()!.replace(/\.\w+$/, '')
  SRC_BY_ID[id] = files[path]
}

type Props = {
  id: string
  /** Overrides the alt text from the image manifest. */
  alt?: string
  className?: string
  /** Hero images should not lazy-load. */
  eager?: boolean
}

export default function ImageSlot({ id, alt, className = '', eager = false }: Props) {
  const spec = IMAGE_BY_ID[id]
  const label = alt ?? spec?.alt ?? id
  const src = SRC_BY_ID[id]

  if (!src) {
    return (
      <div
        role="img"
        aria-label={label}
        className={`absolute inset-0 flex items-center justify-center bg-tint p-4 ${className}`}
      >
        <span className="max-w-[90%] text-center font-mono text-[11px] leading-relaxed tracking-[0.08em] text-muted">
          {label}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={label}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
    />
  )
}
