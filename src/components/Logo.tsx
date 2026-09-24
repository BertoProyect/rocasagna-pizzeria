const BASE = import.meta.env.BASE_URL

interface Props {
  size: number
  className?: string
  priority?: boolean
  alt?: string
}

/** Logo oficial (recorte circular del archivo original, sin modificar). */
export function Logo({ size, className = '', priority = false, alt = 'Rocasagna Pizzeria' }: Props) {
  const src = size <= 64 ? 128 : size <= 160 ? 256 : 512
  return (
    <picture>
      <source type="image/webp" srcSet={`${BASE}brand/logo-rocasagna-${src}.webp`} />
      <img
        src={`${BASE}brand/logo-rocasagna-${src}.png`}
        width={size}
        height={size}
        alt={alt}
        className={`rounded-full ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </picture>
  )
}
