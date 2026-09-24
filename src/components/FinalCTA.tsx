import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { Photo } from './Photo'
import { SplitText } from './SplitText'
import { OpenStatus } from './OpenStatus'
import { business, whatsappHref } from '../data/business'

export function FinalCTA() {
  const wa = whatsappHref()
  return (
    <section id="pedir" aria-labelledby="pedir-title" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute inset-[-12%_0]" data-parallax-bg>
          <Photo photo="cta" sizes="100vw" className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-ink/80" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--brand-dark),transparent_25%,transparent_70%,var(--brand-dark))]" />
      </div>

      <div className="container-x py-28 md:py-40">
        <h2 id="pedir-title" className="t-display max-w-[12ch]" data-split>
          <SplitText text="¿Pizza esta noche?" />
        </h2>
        <p className="t-lead mt-6 max-w-[40ch] text-light/85" data-reveal="up">
          Masa fina, crujiente y ligera. Hecha para disfrutarla en Gelida.
        </p>

        {/* Como en la carta impresa: el teléfono, grande */}
        <div className="mt-14" data-reveal="up">
          <p className="text-[.8125rem] font-semibold uppercase tracking-[.2em] text-yellow">Haz tu pedido</p>
          <a
            href={business.phone.href}
            className="t-phone mt-2 inline-block text-[clamp(3rem,1.6rem+7vw,7.5rem)] leading-none text-light transition-colors hover:text-yellow"
            aria-label={`Llamar al ${business.phone.display}`}
            data-phone-digits
          >
            {business.phone.display.split('').map((ch, i) => (
              <span key={i} className="inline-block">
                {ch === ' ' ? '\u00A0' : ch}
              </span>
            ))}
          </a>
        </div>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6" data-reveal="up">
          <a href={business.phone.href} className="btn btn-primary" data-magnetic>
            <Phone size={20} weight="bold" aria-hidden="true" />
            Llamar para pedir
          </a>
          {wa ? (
            <a href={wa} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
              <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
              Pedir por WhatsApp
            </a>
          ) : null}
          <OpenStatus className="self-start sm:ml-2 sm:self-auto" />
        </div>
      </div>
    </section>
  )
}
