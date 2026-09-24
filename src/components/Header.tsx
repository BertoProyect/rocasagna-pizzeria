import { useEffect, useRef, useState } from 'react'
import { Phone } from '@phosphor-icons/react/dist/ssr'
import { Logo } from './Logo'
import { OpenStatus } from './OpenStatus'
import { MobileMenu } from './MobileMenu'
import { navLinks } from './navLinks'
import { business } from '../data/business'

export function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const burgerRef = useRef<HTMLButtonElement>(null)
  const [open, setOpen] = useState(false)

  // Fondo sólido al salir de la parte alta de la página (IntersectionObserver, sin eventos de scroll).
  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel')
    const header = headerRef.current
    if (!sentinel || !header) return
    const io = new IntersectionObserver(([entry]) => {
      header.dataset.solid = String(!entry.isIntersecting)
    })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  const close = () => {
    setOpen(false)
    burgerRef.current?.focus()
  }

  return (
    <>
      <header ref={headerRef} className="site-header" data-solid="false" data-hidden="false">
        <div className="container-x header-enter flex h-[var(--header-h)] items-center justify-between gap-4">
          <a href="#inicio" className="flex shrink-0 items-center gap-3 rounded-full" aria-label="Rocasagna Pizzeria, volver al inicio">
            <Logo size={52} priority alt="" className="size-11 lg:size-[3.25rem]" />
            <span className="hidden text-[.8125rem] font-semibold uppercase leading-tight tracking-[.2em] text-yellow xl:block">
              Rocasagna
              <br />
              Pizzeria
            </span>
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="nav-link">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <OpenStatus />
            <a href="#pedir" className="btn btn-primary btn-sm hidden lg:inline-flex" data-magnetic>
              Pedir
            </a>
            <a
              href={business.phone.href}
              className="grid size-11 place-items-center rounded-[var(--radius)] text-yellow lg:hidden"
              aria-label={`Llamar a Rocasagna al ${business.phone.display}`}
            >
              <Phone size={22} weight="bold" aria-hidden="true" />
            </a>
            <button
              ref={burgerRef}
              type="button"
              className="burger text-light lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  )
}
