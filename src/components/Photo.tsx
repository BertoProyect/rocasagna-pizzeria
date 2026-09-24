import { useEffect, useRef, useState } from 'react'
import { photos, photoSources, type PhotoKey } from '../data/media'

const BASE = import.meta.env.BASE_URL

interface Props {
  photo: PhotoKey
  sizes?: string
  priority?: boolean
  className?: string
  imgClassName?: string
  /** Atributos data-* para animaciones sobre la <img> */
  imgData?: Record<`data-${string}`, string>
}

/**
 * Imagen con espacio reservado (width/height), carga diferida fuera
 * del hero y bloque de marca si la foto falta o falla.
 */
export function Photo({ photo, sizes = '100vw', priority = false, className = '', imgClassName = '', imgData }: Props) {
  const slot = photos[photo]
  const sources = photoSources(slot, BASE)
  const [failed, setFailed] = useState(false)
  const ref = useRef<HTMLImageElement>(null)

  // Si la imagen falló antes de hidratar, onError no llega a React.
  useEffect(() => {
    const img = ref.current
    if (img && img.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  return (
    <div className={`photo ${className}`}>
      {sources && !failed ? (
        <img
          ref={ref}
          src={sources.src}
          srcSet={sources.srcSet}
          sizes={sources.srcSet ? sizes : undefined}
          width={slot.width}
          height={slot.height}
          alt={slot.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : 'auto'}
          onError={() => setFailed(true)}
          className={imgClassName}
          {...imgData}
        />
      ) : (
        <PhotoFallback label={slot.alt} />
      )}
    </div>
  )
}

export function PhotoFallback({ label }: { label: string }) {
  return (
    <div className="photo-fallback" role={label ? 'img' : undefined} aria-label={label || undefined} aria-hidden={label ? undefined : true}>
      <img src={`${BASE}brand/logo-rocasagna-128.webp`} width={128} height={128} alt="" />
    </div>
  )
}
