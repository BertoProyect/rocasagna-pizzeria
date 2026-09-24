import { publishedReviews } from '../data/reviews'

export const navLinks = [
  { href: '#carta', label: 'Carta' },
  { href: '#reparto', label: 'Reparto' },
  { href: '#nosotros', label: 'Nosotros' },
  // "Opiniones" solo aparece cuando hay reseñas reales publicadas.
  ...(publishedReviews.length ? [{ href: '#opiniones', label: 'Opiniones' }] : []),
  { href: '#ubicacion', label: 'Ubicación' },
]
