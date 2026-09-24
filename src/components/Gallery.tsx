import { Photo } from './Photo'
import { SectionHeading } from './SectionHeading'
import type { PhotoKey } from '../data/media'

/** Composición editorial irregular. Móvil: una grande y el resto en carrusel horizontal. */
export function Gallery() {
  const secondary: { photo: PhotoKey; className: string; speed: string }[] = [
    { photo: 'pizza02', className: 'lg:col-span-5 lg:col-start-8 lg:row-start-1 aspect-[4/3]', speed: '-6' },
    { photo: 'pizza03', className: 'lg:col-span-2 lg:col-start-8 lg:row-start-2 aspect-square lg:aspect-auto', speed: '10' },
    { photo: 'localGallery', className: 'lg:col-span-3 lg:col-start-10 lg:row-start-2 aspect-square', speed: '4' },
  ]
  return (
    <section aria-labelledby="galeria-title" className="section-pad relative pt-0">
      <div className="container-x">
        <SectionHeading id="galeria-title" title="Recién hechas." className="mb-12 lg:mb-16" />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7 lg:col-start-1 lg:row-span-2 lg:row-start-1" data-parallax-wrap="-4">
            <div className="relative aspect-[4/5] overflow-hidden lg:aspect-auto lg:h-full" data-reveal="clip">
              <Photo photo="pizza01" sizes="(min-width: 1024px) 58vw, 100vw" className="h-full w-full lg:absolute lg:inset-0" imgClassName="scale-[1.12]" imgData={{ 'data-parallax-img': '6' }} />
            </div>
          </div>

          {/* En móvil: carrusel con scroll-snap. En escritorio: se reparten en la rejilla. */}
          <div className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] lg:contents">
            {secondary.map((s) => (
              <div key={s.photo} className={`w-[72vw] max-w-sm flex-none snap-start lg:w-auto lg:max-w-none ${s.className}`} data-parallax-wrap={s.speed}>
                <div className="h-full overflow-hidden" data-reveal="clip">
                  <Photo photo={s.photo} sizes="(min-width: 1024px) 30vw, 72vw" className="h-full w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
