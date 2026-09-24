/**
 * Genera las etiquetas <head> (SEO, Open Graph, Twitter, JSON-LD) en
 * tiempo de build a partir de los mismos datos que usa la web.
 * Lo usa el plugin de vite.config.ts. Sin DOM: se ejecuta en Node.
 */
import { business } from '../data/business.ts'
import { weeklyHours, dayOrder, schemaDay } from '../data/openingHours.ts'
import { seo, legalPages, type LegalSlug } from '../data/seo.ts'
import { photos, photoSources } from '../data/media.ts'

export interface HeadOptions {
  base: string
  siteUrl: string
  noindex: boolean
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function absolute(siteUrl: string, path = ''): string {
  if (!siteUrl) return ''
  return siteUrl.replace(/\/$/, '') + '/' + path.replace(/^\//, '')
}

export function restaurantJsonLd(siteUrl: string): Record<string, unknown> {
  const hours = dayOrder.flatMap((day) =>
    weeklyHours[day].map((slot) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${schemaDay[day]}`,
      opens: slot.open,
      closes: slot.close,
    })),
  )
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    servesCuisine: 'Pizza',
    telephone: business.phone.e164,
    priceRange: business.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      addressCountry: business.address.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.lat, longitude: business.geo.lng },
    openingHoursSpecification: hours,
  }
  if (siteUrl) {
    data.url = absolute(siteUrl)
    data.image = absolute(siteUrl, seo.ogImage)
    data.logo = absolute(siteUrl, 'brand/logo-rocasagna-512.png')
    data.hasMenu = absolute(siteUrl, '#carta')
  }
  const sameAs = [business.social.instagram, business.social.facebook, business.social.other?.url].filter(Boolean)
  if (sameAs.length) data.sameAs = sameAs
  return data
}

export function buildHead(page: 'home' | LegalSlug, opts: HeadOptions): string {
  const { base, siteUrl, noindex } = opts
  const isHome = page === 'home'
  const title = isHome ? seo.title : `${legalPages[page].title} | ${business.name}`
  const description = isHome ? seo.description : `${legalPages[page].title} de ${business.name}, pizzería en Gelida.`
  const path = isHome ? '' : legalPages[page].path
  const canonical = absolute(siteUrl, path)
  const robots = noindex || !isHome ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'
  const ogImage = siteUrl ? absolute(siteUrl, seo.ogImage) : `${base}${seo.ogImage}`

  const tags: string[] = [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    canonical ? `<link rel="canonical" href="${esc(canonical)}" />` : '',
    `<meta name="theme-color" content="${seo.themeColor}" />`,
    `<meta name="format-detection" content="telephone=no" />`,
    `<link rel="icon" type="image/png" sizes="32x32" href="${base}favicon-32.png" />`,
    `<link rel="icon" type="image/png" sizes="192x192" href="${base}icon-192.png" />`,
    `<link rel="apple-touch-icon" href="${base}apple-touch-icon.png" />`,
    // Open Graph
    `<meta property="og:type" content="${isHome ? 'restaurant.restaurant' : 'website'}" />`,
    `<meta property="og:site_name" content="${esc(business.name)}" />`,
    `<meta property="og:locale" content="${seo.locale}" />`,
    `<meta property="og:title" content="${esc(title)}" />`,
    `<meta property="og:description" content="${esc(description)}" />`,
    canonical ? `<meta property="og:url" content="${esc(canonical)}" />` : '',
    `<meta property="og:image" content="${esc(ogImage)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${esc(seo.ogImageAlt)}" />`,
    // Twitter
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    `<meta name="twitter:image" content="${esc(ogImage)}" />`,
  ]

  if (isHome) {
    const hero = photoSources(photos.hero, base)
    if (hero) {
      if (photos.hero.src?.kind === 'pexels') tags.push('<link rel="preconnect" href="https://images.pexels.com" crossorigin />')
      tags.push(
        `<link rel="preload" as="image" href="${esc(hero.src)}"${hero.srcSet ? ` imagesrcset="${esc(hero.srcSet)}" imagesizes="100vw"` : ''} fetchpriority="high" />`,
      )
    }
    tags.push(
      `<script type="application/ld+json">${JSON.stringify(restaurantJsonLd(siteUrl)).replace(/</g, '\\u003c')}</script>`,
    )
  }

  return tags.filter(Boolean).join('\n    ')
}
