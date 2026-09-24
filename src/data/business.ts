/**
 * DATOS DEL NEGOCIO
 * ---------------------------------------------------------------
 * Todo lo que el cliente puede querer cambiar (teléfono, WhatsApp,
 * redes, reparto, textos) vive aquí. Los componentes solo leen.
 *
 * Convención: cualquier dato sin confirmar va a `null` con un
 * comentario `// PLACEHOLDER:`. Los componentes ocultan los campos
 * que están a `null`, así la web nunca enseña huecos rotos.
 * Busca "PLACEHOLDER" en el proyecto para ver todo lo pendiente.
 */

export const business = {
  name: 'Rocasagna Pizzeria',
  shortName: 'Rocasagna',

  phone: {
    display: '93 750 54 78',
    international: '+34 937 50 54 78',
    href: 'tel:+34937505478',
    e164: '+34937505478',
  },

  // PLACEHOLDER: sustituir por número real de WhatsApp.
  // Formato: solo dígitos con prefijo de país, sin "+" ni espacios. Ej: '34600000000'.
  // Mientras sea null, los botones de WhatsApp no se muestran.
  whatsapp: null as string | null,

  address: {
    street: 'Carrer Major, 97',
    postalCode: '08790',
    locality: 'Gelida',
    region: 'Barcelona',
    country: 'España',
    countryCode: 'ES',
  },

  geo: { lat: 41.44097, lng: 1.86153 },

  priceRange: '€€',

  social: {
    instagram: null as string | null, // PLACEHOLDER INSTAGRAM: URL completa del perfil
    facebook: null as string | null, // PLACEHOLDER FACEBOOK: URL completa de la página
    other: null as { label: string; url: string } | null, // PLACEHOLDER OTRA RED
  },

  delivery: {
    zone: 'Gelida',
    // PLACEHOLDER MÉTODO DE PEDIDO: confirmar con el cliente. La carta impresa
    // indica pedidos por teléfono, así que de momento es el único método visible.
    method: 'Por teléfono',
    minimumOrder: null as string | null, // PLACEHOLDER PEDIDO MÍNIMO. Ej: '15 €'
    estimatedTime: null as string | null, // PLACEHOLDER TIEMPO ESTIMADO. Ej: '30 a 45 min'
    fee: null as string | null, // PLACEHOLDER COSTE DE REPARTO. Ej: 'Gratis' o '2 €'
  },

  about: {
    // PLACEHOLDER TEXTO SOBRE ROCASAGNA: texto provisional escrito solo con
    // datos del brief (apertura reciente, centro de Gelida, pizza al momento,
    // masa fina, trato cercano). Validar con el cliente antes de publicar.
    paragraphs: [
      'Rocasagna es una pizzería de barrio en pleno Carrer Major de Gelida. Abrimos hace poco con una idea sencilla: pizza hecha al momento, de masa fina y crujiente, que se disfruta sin sentirse pesada.',
      'Nos gusta el trato cercano de toda la vida. Llamas, nos dices qué te apetece y nos ponemos con tu pizza.',
    ],
  },

  // Crédito de la agencia en el pie. Pon `null` para quitarlo.
  credit: { label: 'Órbita Webs', url: 'https://orbitawebs.com' } as { label: string; url: string } | null,
} as const

export const fullAddress = `${business.address.street}, ${business.address.postalCode} ${business.address.locality}, ${business.address.region}`

export function whatsappHref(message = 'Hola, quiero hacer un pedido.'): string | null {
  if (!business.whatsapp) return null
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`
}

/** Navegación hasta el local (abre la app de mapas del móvil). */
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${business.geo.lat},${business.geo.lng}`

/** Ficha del negocio en Google Maps (búsqueda por nombre + dirección). */
export const googleMapsSearchHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.name} ${business.address.street} ${business.address.locality}`)}`
