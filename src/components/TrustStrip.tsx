import { Grains, HandHeart, Moped } from '@phosphor-icons/react/dist/ssr'

const items = [
  { icon: Grains, text: 'Masa fina y crujiente' },
  { icon: Moped, text: 'Reparto en Gelida' },
  { icon: HandHeart, text: 'Trato cercano' },
]

function Group({ dup = false }: { dup?: boolean }) {
  return (
    <div className={`marquee-group ${dup ? 'marquee-dup' : ''}`} aria-hidden={dup || undefined}>
      {[...items, ...items].map((it, i) => (
        <span key={i} className={`flex items-center gap-3 px-6 sm:px-9 ${i >= items.length ? 'marquee-extra' : ''}`}>
          <it.icon size={22} weight="bold" aria-hidden="true" />
          <span className="whitespace-nowrap">{it.text}</span>
          <span className="ml-6 size-2 rounded-full border-[1.5px] border-current sm:ml-9" aria-hidden="true" />
        </span>
      ))}
    </div>
  )
}

/** Franja amarilla con los tres mensajes. Se desplaza como una cinta y cambia de sentido con el scroll. */
export function TrustStrip() {
  return (
    <section aria-label="Lo que nos define" className="relative overflow-hidden bg-yellow py-4 text-ink">
      <ul className="sr-only">
        {items.map((it) => (
          <li key={it.text}>{it.text}</li>
        ))}
      </ul>
      <div className="marquee text-[.9375rem] font-bold uppercase tracking-[.14em]" data-marquee aria-hidden="true">
        <Group />
        <Group dup />
      </div>
    </section>
  )
}
