import { useEffect, useRef, type CSSProperties } from 'react'
import { Phone, WhatsappLogo, X } from '@phosphor-icons/react/dist/ssr'
import { navLinks } from './navLinks'
import { business, whatsappHref } from '../data/business'
import { OpenStatus } from './OpenStatus'
import { Logo } from './Logo'

interface Props {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null)
  const wa = whatsappHref()

  useEffect(() => {
    if (!open) return
    const root = document.documentElement
    const prev = root.style.overflow
    root.style.overflow = 'hidden'
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href^="#"]')
    window.setTimeout(() => firstLink?.focus(), 350)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && panelRef.current) {
        // Mantener el foco dentro del menú
        const f = panelRef.current.querySelectorAll<HTMLElement>('a, button')
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      root.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const item = (i: number) => ({ '--i': i }) as CSSProperties

  return (
    <div
      ref={panelRef}
      id="menu-movil"
      className="mobile-menu lg:hidden"
      data-open={open}
      role="dialog"
      aria-modal="true"
      aria-label="Menú"
      aria-hidden={!open}
      inert={!open}
    >
      <div className="container-x flex h-full flex-col pb-[calc(2rem+env(safe-area-inset-bottom,0px))]">
        <div className="flex h-[var(--header-h)] items-center justify-between">
          <Logo size={44} alt="Rocasagna Pizzeria" className="size-11" />
          <button type="button" onClick={onClose} className="burger text-light" aria-label="Cerrar menú">
            <X size={26} weight="bold" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Menú móvil" className="mt-8 flex-1">
          <ul className="space-y-1">
            {navLinks.map((l, i) => (
              <li key={l.href} className="mm-item" style={item(i)}>
                <a href={l.href} onClick={onClose} className="block py-2 text-[2.5rem] font-bold leading-tight tracking-tight text-light active:text-yellow">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mm-item space-y-5" style={item(navLinks.length)}>
          <OpenStatus variant="full" />
          <div className="grid gap-3">
            <a href={business.phone.href} className="btn btn-primary w-full">
              <Phone size={20} weight="bold" aria-hidden="true" />
              Llamar para pedir
            </a>
            {wa ? (
              <a href={wa} className="btn btn-secondary w-full" target="_blank" rel="noopener noreferrer">
                <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
                Pedir por WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
