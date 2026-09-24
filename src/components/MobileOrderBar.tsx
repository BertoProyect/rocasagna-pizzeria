import { ForkKnife, Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { business, whatsappHref } from '../data/business'

/** Barra fija inferior en móvil: llamar siempre a un toque. */
export function MobileOrderBar() {
  const wa = whatsappHref()
  return (
    <div className="order-bar lg:hidden" role="region" aria-label="Pedido rápido">
      <div className="grid grid-cols-[1.35fr_1fr] gap-2.5">
        <a href={business.phone.href} className="btn btn-primary min-h-12 px-3" aria-label={`Llamar para pedir al ${business.phone.display}`}>
          <Phone size={20} weight="bold" aria-hidden="true" />
          Llamar
        </a>
        {wa ? (
          <a href={wa} className="btn btn-secondary min-h-12 px-3" target="_blank" rel="noopener noreferrer">
            <WhatsappLogo size={20} weight="bold" aria-hidden="true" />
            WhatsApp
          </a>
        ) : (
          <a href="#carta" className="btn btn-secondary min-h-12 px-3">
            <ForkKnife size={20} weight="bold" aria-hidden="true" />
            Carta
          </a>
        )}
      </div>
    </div>
  )
}
