/**
 * FOTOGRAFÍAS
 * ---------------------------------------------------------------
 * DEMO: todas las fotos son de stock libre de Pexels (licencia Pexels:
 * uso comercial gratuito, sin atribución obligatoria) y se sirven
 * desde su CDN. NO son del local ni de las pizzas de Rocasagna.
 *
 * PLACEHOLDER: sustituir por las fotos reales de la sesión de fotos.
 * Para usar una foto propia:
 *   1. Copia el archivo a /public/photos/ (ej. hero.webp, 2400 px de ancho)
 *   2. Cambia `src` por: { kind: 'local', path: 'photos/hero.webp' }
 * Si pones `src: null`, se muestra un bloque de marca en su lugar.
 */

export type PhotoSource =
  | { kind: 'pexels'; id: number }
  | { kind: 'local'; path: string }

export interface PhotoSlot {
  src: PhotoSource | null
  alt: string
  /** Proporción intrínseca para reservar espacio (evita saltos de maquetación). */
  width: number
  height: number
}

export const photos = {
  // PLACEHOLDER FOTO HERO PIZZA
  hero: {
    src: { kind: 'pexels', id: 17848752 },
    alt: 'Pizza margarita recién hecha, cortada en porciones sobre fondo oscuro',
    width: 2400,
    height: 1600,
  },
  // PLACEHOLDER FOTO PIZZA MARGARITA
  margarita: {
    src: { kind: 'pexels', id: 14590497 },
    alt: 'Pizza margarita con mozzarella fundida, tomate y hojas de albahaca',
    width: 1200,
    height: 1500,
  },
  // Fondo de la sección Carta (como en la carta impresa: foto oscurecida)
  menuBackground: {
    src: { kind: 'pexels', id: 14067666 },
    alt: '',
    width: 2000,
    height: 1333,
  },
  // PLACEHOLDER FOTO PIZZA 01
  pizza01: {
    src: { kind: 'pexels', id: 13819559 },
    alt: 'Primer plano de una pizza con queso fundido y albahaca',
    width: 1600,
    height: 2000,
  },
  // PLACEHOLDER FOTO PIZZA 02
  pizza02: {
    src: { kind: 'pexels', id: 20115306 },
    alt: 'Pizza margarita vista desde arriba sobre una tabla de madera',
    width: 1600,
    height: 1200,
  },
  // PLACEHOLDER FOTO PIZZA 03
  pizza03: {
    src: { kind: 'pexels', id: 6223186 },
    alt: 'Pizza de tomate y albahaca sobre tabla de madera',
    width: 1200,
    height: 1200,
  },
  // PLACEHOLDER FOTO LOCAL (provisional: foto de stock de masa, no es el local)
  local: {
    src: { kind: 'pexels', id: 28945115 },
    alt: 'Manos estirando a mano una base de masa de pizza',
    width: 1400,
    height: 1750,
  },
  // PLACEHOLDER FOTO LOCAL para la galería (provisional, stock)
  localGallery: {
    src: { kind: 'pexels', id: 5903389 },
    alt: 'Pizzero sacando una pizza con la pala',
    width: 1200,
    height: 1200,
  },
  // PLACEHOLDER FOTO CTA PIZZA
  cta: {
    src: { kind: 'pexels', id: 10673053 },
    alt: '',
    width: 2400,
    height: 1600,
  },
} satisfies Record<string, PhotoSlot>

export type PhotoKey = keyof typeof photos

const PEXELS_WIDTHS = [480, 768, 1080, 1440, 1920, 2400]

export function pexelsUrl(id: number, w: number): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
}

/** Devuelve src + srcset listos para <img>. */
export function photoSources(slot: PhotoSlot, base: string, maxWidth = 2400): { src: string; srcSet?: string } | null {
  if (!slot.src) return null
  if (slot.src.kind === 'local') return { src: `${base}${slot.src.path}` }
  const id = slot.src.id
  const widths = PEXELS_WIDTHS.filter((w) => w <= maxWidth)
  return {
    src: pexelsUrl(id, widths[Math.min(2, widths.length - 1)]),
    srcSet: widths.map((w) => `${pexelsUrl(id, w)} ${w}w`).join(', '),
  }
}
