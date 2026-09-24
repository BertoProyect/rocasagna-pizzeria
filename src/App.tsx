import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { TrustStrip } from './components/TrustStrip'
import { FeaturedPizza } from './components/FeaturedPizza'
import { MenuSection } from './components/MenuSection'
import { DeliverySection } from './components/DeliverySection'
import { AboutSection } from './components/AboutSection'
import { Gallery } from './components/Gallery'
import { Testimonials } from './components/Testimonials'
import { OpeningHours } from './components/OpeningHours'
import { LocationMap } from './components/LocationMap'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'
import { MobileOrderBar } from './components/MobileOrderBar'
import { SectionHeading } from './components/SectionHeading'
import { business, directionsHref, googleMapsSearchHref } from './data/business'
import { NavigationArrow, ArrowUpRight } from '@phosphor-icons/react/dist/ssr'

export default function App() {
  // Las animaciones (GSAP) se cargan después del primer pintado: no bloquean el LCP.
  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    import('./lib/motion').then((m) => {
      if (!cancelled) cleanup = m.initMotion()
    })
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [])

  return (
    <>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <div id="top-sentinel" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-12" />
      <Header />
      <main id="contenido">
        <Hero />
        <TrustStrip />
        <FeaturedPizza />
        <MenuSection />
        <DeliverySection />
        <AboutSection />
        <Gallery />
        <Testimonials />

        <section id="ubicacion" aria-labelledby="ubicacion-title" className="section-pad">
          <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading id="ubicacion-title" title="Ven a vernos." />
              <address className="mt-8 space-y-1 not-italic" data-reveal="up">
                <p className="text-[1.375rem] font-semibold text-light">{business.address.street}</p>
                <p className="text-muted">
                  {business.address.postalCode} {business.address.locality}, {business.address.region}
                </p>
                <a href={business.phone.href} className="link-underline mt-3 inline-block text-[1.25rem] font-semibold text-yellow">
                  {business.phone.international}
                </a>
              </address>
              <div className="mt-10" data-reveal="up">
                <OpeningHours />
              </div>
            </div>
            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className="flex-1">
                <LocationMap />
              </div>
              <div className="flex flex-col gap-3 sm:flex-row" data-reveal="up">
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary" data-magnetic>
                  <NavigationArrow size={20} weight="bold" aria-hidden="true" />
                  Cómo llegar
                </a>
                <a href={googleMapsSearchHref} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  Ver en Google Maps
                  <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <FinalCTA />
      </main>
      <Footer />
      <MobileOrderBar />
    </>
  )
}
