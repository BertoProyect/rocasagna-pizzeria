import { ArrowDown } from '@phosphor-icons/react/dist/ssr'
import { Photo } from './Photo'
import { SectionHeading } from './SectionHeading'
import { findMenuItem, formatPrice } from '../data/menu'

export function FeaturedPizza() {
  const margarita = findMenuItem('margarita')
  return (
    <section id="margarita" aria-labelledby="margarita-title" className="section-pad relative">
      <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-0">
        <div className="relative lg:col-span-7">
          <div className="aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]" data-reveal="clip">
            <Photo
              photo="margarita"
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="h-full w-full"
              imgClassName="scale-[1.15]"
              imgData={{ 'data-parallax-img': '8' }}
            />
          </div>
        </div>

        <div className="relative lg:col-span-5 lg:-ml-24 lg:self-end lg:pb-16">
          <div className="bg-ink lg:p-12 lg:pr-0">
            <span className="tag" data-reveal="stamp">
              Más valorada
            </span>
            <SectionHeading id="margarita-title" title="La Margarita merece una parada." className="mt-6" />
            <p className="t-lead mt-6 max-w-[38ch]" data-reveal="up">
              La Margarita es una de las pizzas más valoradas por nuestros clientes.
            </p>
            {margarita ? (
              <div className="mt-8" data-reveal="up" data-delay="0.1">
                <p className="text-light/90">{margarita.description}</p>
                <p className="t-phone mt-4 text-[clamp(2.75rem,2rem+3vw,4.25rem)] leading-none text-yellow">
                  {formatPrice(margarita.price)}
                </p>
              </div>
            ) : null}
            <a href="#carta" className="btn btn-secondary mt-9" data-reveal="up" data-delay="0.2">
              Ver carta
              <ArrowDown size={18} weight="bold" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
