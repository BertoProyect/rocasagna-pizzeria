import { Photo } from './Photo'
import { Logo } from './Logo'
import { SectionHeading } from './SectionHeading'
import { business } from '../data/business'

export function AboutSection() {
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="section-pad relative">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:col-start-1 lg:pt-10">
          <div className="mb-10 w-fit" data-reveal="seal">
            <Logo size={168} className="size-32 sm:size-[10.5rem]" alt="Logo de Rocasagna: una pizzera con la pala frente al horno" />
          </div>
          <SectionHeading id="nosotros-title" title="Rocasagna, en el centro de Gelida." />
          <div className="mt-8 max-w-[52ch] space-y-5 text-[1.125rem] leading-relaxed text-light/85">
            {business.about.paragraphs.map((p, i) => (
              <p key={i} data-reveal="up" data-delay={String(0.08 * i)}>
                {p}
              </p>
            ))}
          </div>
          <address className="mt-10 not-italic" data-reveal="up">
            <span className="block text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">Dónde estamos</span>
            <a href="#ubicacion" className="link-underline mt-1 inline-block text-[1.25rem] font-semibold text-yellow">
              {business.address.street}, {business.address.locality}
            </a>
          </address>
        </div>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <div className="aspect-[4/5] overflow-hidden" data-reveal="clip">
            <Photo
              photo="local"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-full w-full"
              imgClassName="scale-[1.15]"
              imgData={{ 'data-parallax-img': '10' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
