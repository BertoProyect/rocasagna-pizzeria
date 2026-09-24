import { ArrowUpRight, GoogleLogo } from '@phosphor-icons/react/dist/ssr'
import { SectionHeading } from './SectionHeading'
import { publishedReviews } from '../data/reviews'
import { googleMapsSearchHref } from '../data/business'

// PLACEHOLDER: conectar posteriormente con fuente/API de reseñas reales de Google.
export function Testimonials() {
  if (!publishedReviews.length) {
    // Sin reseñas confirmadas: invitación honesta a opinar, sin inventar nada.
    return (
      <section id="opiniones" aria-labelledby="opiniones-title" className="relative border-y border-white/10">
        <div className="container-x flex flex-col gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div>
            <SectionHeading id="opiniones-title" title="¿Ya la has probado?" />
            <p className="t-lead mt-4 max-w-[44ch]" data-reveal="up">
              Cuéntalo en Google. Tu opinión ayuda a que más gente de Gelida nos descubra.
            </p>
          </div>
          <a
            href={googleMapsSearchHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary self-start md:self-auto"
            data-reveal="up"
          >
            <GoogleLogo size={20} weight="bold" aria-hidden="true" />
            Dejar una reseña
            <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
          </a>
        </div>
      </section>
    )
  }

  const [main, ...rest] = publishedReviews
  return (
    <section id="opiniones" aria-labelledby="opiniones-title" className="section-pad relative">
      <div className="container-x">
        <SectionHeading id="opiniones-title" title="Lo que dicen nuestros clientes." />
        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <figure className="lg:col-span-7" data-reveal="up">
            <blockquote className="text-[clamp(1.5rem,1.2rem+1.4vw,2.25rem)] leading-snug font-medium text-light">“{main.text}”</blockquote>
            <figcaption className="mt-6 font-semibold text-yellow">{main.author}, en Google</figcaption>
          </figure>
          <div className="space-y-10 lg:col-span-4 lg:col-start-9" data-stagger>
            {rest.map((r, i) => (
              <figure key={i}>
                <blockquote className="text-[1.125rem] leading-relaxed text-light/90">“{r.text}”</blockquote>
                <figcaption className="mt-3 text-sm font-semibold text-yellow">{r.author}, en Google</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
