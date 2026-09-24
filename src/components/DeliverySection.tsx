import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from './SectionHeading'
import { business, whatsappHref } from '../data/business'

export function DeliverySection() {
  const wa = whatsappHref()
  const d = business.delivery

  const steps = [
    { n: '01', title: 'Elige tu pizza', text: 'Mira la carta y decide sin prisa.' },
    {
      n: '02',
      title: 'Haz tu pedido',
      text: wa ? `Llámanos al ${business.phone.display} o escríbenos por WhatsApp.` : `Llámanos al ${business.phone.display}.`,
    },
    { n: '03', title: 'Recíbela en casa', text: `Te la llevamos recién hecha, en ${d.zone}.` },
  ]

  // Solo se muestran los datos confirmados (los PLACEHOLDER a null se ocultan).
  const details = [
    { label: 'Cómo pedir', value: wa ? 'Por teléfono o WhatsApp' : d.method },
    { label: 'Zona de reparto', value: d.zone },
    { label: 'Pedido mínimo', value: d.minimumOrder },
    { label: 'Tiempo estimado', value: d.estimatedTime },
    { label: 'Coste de reparto', value: d.fee },
  ].filter((x): x is { label: string; value: string } => Boolean(x.value))

  return (
    <section id="reparto" aria-labelledby="reparto-title" className="section-pad relative overflow-hidden bg-ink-soft">
      <div className="container-x">
        <SectionHeading id="reparto-title" title="Tu pizza, en casa." intro="Disfruta de Rocasagna sin salir de Gelida." />

        {/* Tres pasos unidos por una línea que se dibuja con el scroll */}
        <ol className="relative mt-16 grid gap-12 md:mt-24 md:grid-cols-3 md:gap-8" data-steps>
          <span
            aria-hidden="true"
            className="absolute top-[2.25rem] left-0 hidden h-px w-full origin-left bg-yellow md:block"
            data-steps-line
          />
          <span aria-hidden="true" className="absolute top-[2.25rem] left-0 hidden h-px w-full bg-white/15 md:block" />
          {steps.map((s) => (
            <li key={s.n} className="relative" data-step>
              <span
                className="relative z-10 inline-block bg-ink-soft pr-5 text-[4.5rem] leading-none font-bold tracking-tight text-transparent [-webkit-text-stroke:1.5px_var(--brand-yellow)] transition-colors duration-700 data-[lit=true]:text-yellow"
                data-step-number
                aria-hidden="true"
              >
                {s.n}
              </span>
              <h3 className="mt-6 text-[1.5rem] font-bold text-light">{s.title}</h3>
              <p className="mt-2 max-w-[30ch] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-16 flex flex-col gap-10 border-t border-white/10 pt-10 lg:mt-24 lg:flex-row lg:items-center lg:justify-between">
          <dl className="grid grid-cols-2 gap-x-10 gap-y-6 sm:flex sm:flex-wrap" data-stagger>
            {details.map((x) => (
              <div key={x.label}>
                <dt className="text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">{x.label}</dt>
                <dd className="mt-1 text-[1.25rem] font-semibold text-light">{x.value}</dd>
              </div>
            ))}
          </dl>
          <div className="flex flex-col gap-3 sm:flex-row" data-reveal="up">
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
          </div>
        </div>
      </div>
    </section>
  )
}
