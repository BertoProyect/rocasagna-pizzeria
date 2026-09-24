/**
 * OPINIONES
 * ---------------------------------------------------------------
 * PLACEHOLDER: conectar posteriormente con fuente/API de reseñas reales de Google.
 *
 * No inventar reseñas, nombres ni puntuaciones. Mientras `text` sea null,
 * la reseña no se muestra. Si no hay ninguna, la sección enseña una
 * invitación a dejar reseña en Google y el enlace "Opiniones" del menú
 * se oculta.
 */

export interface Review {
  text: string | null // PLACEHOLDER RESEÑA REAL DE GOOGLE (máx. 3 líneas)
  author: string | null // PLACEHOLDER NOMBRE (tal como aparece en Google)
}

export const reviews: Review[] = [
  { text: null, author: null },
  { text: null, author: null },
  { text: null, author: null },
]

export const publishedReviews = reviews.filter(
  (r): r is { text: string; author: string } => Boolean(r.text && r.author),
)
