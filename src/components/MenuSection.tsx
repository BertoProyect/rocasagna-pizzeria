import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react'
import { Phone } from '@phosphor-icons/react/dist/ssr'
import { Photo } from './Photo'
import { SectionHeading } from './SectionHeading'
import { MenuItem } from './MenuItem'
import { menuCategories } from '../data/menu'
import { business } from '../data/business'

const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect
const reducedMotion = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function MenuSection() {
  const [active, setActive] = useState(menuCategories[0].id)
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({})
  const tablistRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLSpanElement>(null)
  const panelsRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  const hasMissingAllergens = menuCategories.some((c) => c.groups.some((g) => g.items.some((i) => i.allergens === null)))

  // Indicador amarillo bajo la pestaña activa (transform, sin animar anchura)
  useIsoLayoutEffect(() => {
    const place = () => {
      const tab = tabs.current[active]
      const ind = indicatorRef.current
      if (!tab || !ind) return
      ind.style.transform = `translateX(${tab.offsetLeft}px) scaleX(${tab.offsetWidth})`
    }
    place()
    const list = tablistRef.current
    if (!list || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(place)
    ro.observe(list)
    return () => ro.disconnect()
  }, [active])

  // Al cambiar de categoría: entrada escalonada de los productos
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    tabs.current[active]?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reducedMotion() ? 'auto' : 'smooth' })
    if (reducedMotion()) return
    const panel = panelsRef.current?.querySelector<HTMLElement>(`#panel-${active}`)
    if (!panel) return
    import('gsap').then(({ gsap }) => {
      const items = panel.querySelectorAll('[data-menu-item], [data-group-title]')
      const rules = panel.querySelectorAll('[data-rule]')
      gsap.fromTo(items, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, ease: 'expo.out', stagger: 0.035, overwrite: true })
      gsap.fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 1.1, ease: 'expo.out', stagger: 0.035, delay: 0.1, overwrite: true })
    })
  }, [active])

  const select = (id: string) => {
    if (id === active) return
    setActive(id)
    // Si las pestañas están pegadas arriba, subir al inicio de la lista para empezar a leer desde el principio.
    const panels = panelsRef.current
    const list = tablistRef.current
    if (panels && list) {
      const listBottom = list.getBoundingClientRect().bottom
      const top = panels.getBoundingClientRect().top
      if (top < listBottom) {
        window.scrollTo({ top: window.scrollY + top - listBottom - 8, behavior: reducedMotion() ? 'auto' : 'smooth' })
      }
    }
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const ids = menuCategories.map((c) => c.id)
    const i = ids.indexOf(active)
    let next = -1
    if (e.key === 'ArrowRight') next = (i + 1) % ids.length
    if (e.key === 'ArrowLeft') next = (i - 1 + ids.length) % ids.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = ids.length - 1
    if (next < 0) return
    e.preventDefault()
    select(ids[next])
    tabs.current[ids[next]]?.focus()
  }

  return (
    <section id="carta" aria-labelledby="carta-title" className="relative isolate">
      {/* Fondo: foto oscurecida fija mientras se lee, igual que la carta impresa */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          <Photo photo="menuBackground" sizes="100vw" className="h-full w-full" imgClassName="scale-110" imgData={{ 'data-menu-bg': '' }} />
          <div className="absolute inset-0 bg-ink/[.88]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_85%_10%,oklch(0.802_0.164_86.1/.08),transparent_70%)]" />
        </div>
      </div>

      <div className="container-x section-pad">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading id="carta-title" title="La carta" className="lg:col-span-7" />
          <a
            href={business.phone.href}
            className="group flex items-center gap-4 justify-self-start lg:col-span-5 lg:justify-self-end"
            data-reveal="up"
          >
            <span className="grid size-12 place-items-center rounded-full border border-yellow/50 text-yellow transition-colors group-hover:bg-yellow group-hover:text-ink">
              <Phone size={20} weight="bold" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">Haz tu pedido</span>
              <span className="t-phone block text-[1.75rem] leading-tight text-light">{business.phone.display}</span>
            </span>
          </a>
        </div>

        {/* Pestañas + productos en su propio bloque: las pestañas se sueltan al acabar la lista */}
        <div>
        <div className="menu-tabs -mx-[var(--gutter)] mt-12 bg-ink/90 px-[var(--gutter)] backdrop-blur-md">
          <div className="menu-tabs-scroller border-b border-white/15">
            <div ref={tablistRef} role="tablist" aria-label="Categorías de la carta" className="relative flex" onKeyDown={onKeyDown}>
              {menuCategories.map((c) => (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabs.current[c.id] = el
                  }}
                  id={`tab-${c.id}`}
                  type="button"
                  role="tab"
                  aria-selected={active === c.id}
                  aria-controls={`panel-${c.id}`}
                  tabIndex={active === c.id ? 0 : -1}
                  className="menu-tab"
                  onClick={() => select(c.id)}
                >
                  {c.tabLabel}
                </button>
              ))}
              <span ref={indicatorRef} className="menu-tab-indicator" aria-hidden="true" />
            </div>
          </div>
        </div>

        {/* Paneles: todos en el HTML (bueno para SEO), solo uno visible */}
        <div ref={panelsRef} className="mt-6 min-h-[60vh]">
          {menuCategories.map((c) => (
            <div
              key={c.id}
              id={`panel-${c.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${c.id}`}
              hidden={active !== c.id}
              tabIndex={0}
              className="focus-visible:outline-offset-8"
            >
              {c.groups.map((g, gi) => (
                <div key={gi} className={gi > 0 ? 'mt-14' : ''}>
                  {g.title ? (
                    <div data-group-title data-reveal="up">
                      <h3 className="mt-4 text-[1.625rem] font-bold tracking-tight text-light">{g.title}</h3>
                      {g.note ? <p className="text-sm text-muted">{g.note}</p> : null}
                    </div>
                  ) : null}
                  <ul className="grid gap-x-16 md:grid-cols-2" data-stagger>
                    {g.items.map((item) => (
                      <MenuItem key={item.id} item={item} headingLevel={g.title ? 4 : 3} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
        </div>

        {hasMissingAllergens ? (
          <p className="mt-12 max-w-[60ch] text-[.9375rem] text-muted" data-reveal="up">
            ¿Alergias o intolerancias? Pregúntanos al hacer tu pedido y te informamos de los alérgenos de cada producto.
          </p>
        ) : null}
      </div>
    </section>
  )
}
