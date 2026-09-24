import { Pepper } from '@phosphor-icons/react/dist/ssr'
import { allergenLabels, formatPrice, type MenuItem as Item } from '../data/menu'

export function MenuItem({ item, headingLevel = 3 }: { item: Item; headingLevel?: 3 | 4 }) {
  const Name = headingLevel === 3 ? 'h3' : 'h4'
  const price = formatPrice(item.price)

  const name = (
    <Name className="menu-name flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
      <span>{item.name}</span>
      {item.spicy ? (
        <span className="inline-flex text-tomato" title={item.spicy === 2 ? 'Muy picante' : 'Picante'}>
          {Array.from({ length: item.spicy }, (_, i) => (
            <Pepper key={i} size={17} weight="fill" aria-hidden="true" />
          ))}
          <span className="sr-only">{item.spicy === 2 ? '(muy picante)' : '(picante)'}</span>
        </span>
      ) : null}
      {item.highlight === 'mas-valorada' ? <span className="tag">Más valorada</span> : null}
    </Name>
  )

  return (
    <li data-menu-item className="pt-5">
      {item.description ? (
        <>
          {name}
          <div className="mt-1.5 flex items-end justify-between gap-6">
            <p className="max-w-[46ch] text-[.9688rem] leading-relaxed text-light/85">{item.description}</p>
            {price ? <p className="menu-price">{price}</p> : null}
          </div>
        </>
      ) : (
        <div className="flex items-baseline justify-between gap-6">
          {name}
          {price ? <p className="menu-price">{price}</p> : null}
        </div>
      )}

      {item.options?.map((o) => (
        <div key={o.label} className="mt-2 flex items-baseline justify-between gap-6 text-[.9375rem] text-muted">
          <span>{o.label}</span>
          <span className="menu-price">{formatPrice(o.price)}</span>
        </div>
      ))}

      {item.allergens?.length ? (
        <ul aria-label="Alérgenos" className="mt-3 flex flex-wrap gap-1.5">
          {item.allergens.map((a) => (
            <li key={a} className="rounded-[var(--radius)] border border-white/20 px-2 py-0.5 text-[.75rem] text-muted">
              {allergenLabels[a]}
            </li>
          ))}
        </ul>
      ) : null}

      <span className="menu-rule mt-5" data-rule aria-hidden="true" />
    </li>
  )
}
