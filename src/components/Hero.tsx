import type { CSSProperties } from 'react'
import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { Photo } from './Photo'
import { Logo } from './Logo'
import { SplitText } from './SplitText'
import { business, whatsappHref } from '../data/business'

export function Hero() {
  const wa = whatsappHref()
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Foto a sangre. El contenedor se desplaza con el scroll (parallax) y la imagen asienta su zoom al cargar. */}
      <div className="hero-media absolute inset-0 -z-10" data-hero-media>
        <Photo photo="hero" priority sizes="100vw" className="h-full w-full" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to top, oklch(0.214 0.002 67.7) 0%, oklch(0.214 0.002 67.7 / .82) 28%, oklch(0.214 0.002 67.7 / .35) 62%, oklch(0.214 0.002 67.7 / .55) 100%), linear-gradient(to right, oklch(0.214 0.002 67.7 / .75), transparent 70%)',
        }}
      />

      <div
        className="container-x relative flex min-h-[100svh] flex-col justify-end pt-[calc(var(--header-h)+2.5rem)] pb-[calc(var(--bar-h)+2.25rem)] lg:pb-24"
        data-hero-content
      >
        <p className="t-kicker hero-fade" style={{ '--d': '.1s' } as CSSProperties}>
          Rocasagna Pizzeria · Gelida
        </p>
        <h1 id="hero-title" className="t-display hero-title mt-5 max-w-[11ch] lg:max-w-[16ch]">
          <SplitText text="Pizza fina, crujiente y ligera." />
        </h1>
        <p className="t-lead hero-fade mt-6 max-w-[34ch] text-light/85" style={{ '--d': '.75s' } as CSSProperties}>
          Pizza hecha al momento en Gelida, con una masa que cruje sin sentirse pesada.
        </p>
        <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ '--d': '.95s' } as CSSProperties}>
          <a href={business.phone.href} className="btn btn-primary" data-magnetic>
            <Phone size={20} weight="bold" aria-hidden="true" />
            Llamar para pedir
          </a>
          {wa ? (
            <a href={wa} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
              Pedir por WhatsApp
            </a>
          ) : (
            <a href="#carta" className="btn btn-secondary">
              Ver carta
            </a>
          )}
        </div>

        {/* Sello del logo, solo escritorio */}
        <div className="pointer-events-none absolute right-0 bottom-24 hidden lg:block" aria-hidden="true">
          <div className="hero-seal" data-hero-seal>
            <Logo size={220} alt="" priority className="size-[13.75rem] shadow-[0_30px_80px_-30px_oklch(0_0_0/.8)]" />
          </div>
        </div>
      </div>
    </section>
  )
}
