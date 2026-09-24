import { business } from '../data/business'

/**
 * Mapa ligero de OpenStreetMap (sin API key ni scripts de Google),
 * centrado en las coordenadas exactas del local, con filtro oscuro
 * de marca y marcador propio en el centro.
 */
export function LocationMap() {
  const { lat, lng } = business.geo
  const dLng = 0.0055
  const dLat = 0.0032
  const bbox = [lng - dLng, lat - dLat, lng + dLng, lat + dLat].map((n) => n.toFixed(5)).join('%2C')
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`

  return (
    <div className="relative h-full min-h-[22rem] overflow-hidden bg-ink-soft" data-reveal="clip">
      <iframe
        title={`Mapa: ${business.name}, ${business.address.street}, ${business.address.locality}`}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="map-frame absolute inset-0 h-full w-full border-0"
      />
      {/* Marcador: el centro del mapa son las coordenadas del local */}
      <div className="map-pin pointer-events-none absolute top-1/2 left-1/2 size-0" aria-hidden="true">
        <span className="absolute -top-2 -left-2 size-4 rounded-full border-[3px] border-ink bg-yellow shadow-[0_0_0_2px_var(--brand-yellow)]" />
      </div>
    </div>
  )
}
