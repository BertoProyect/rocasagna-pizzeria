/**
 * SEO LOCAL
 * La URL pública se define en la variable de entorno VITE_SITE_URL
 * (archivo .env). PLACEHOLDER: poner el dominio definitivo del cliente.
 */
export const seo = {
  title: 'Pizzería en Gelida | Rocasagna Pizzeria',
  description:
    'Pizzería en Gelida con masa fina, crujiente y ligera. Descubre Rocasagna Pizzeria y pide tu pizza a domicilio en Gelida.',
  locale: 'es_ES',
  themeColor: '#1a1918',
  ogImage: 'og-rocasagna.jpg',
  ogImageAlt: 'Logo de Rocasagna Pizzeria junto al texto: Pizza fina, crujiente y ligera.',
}

export const legalPages = {
  'aviso-legal': { title: 'Aviso legal', path: 'aviso-legal/' },
  privacidad: { title: 'Política de privacidad', path: 'privacidad/' },
  cookies: { title: 'Política de cookies', path: 'cookies/' },
} as const

export type LegalSlug = keyof typeof legalPages
