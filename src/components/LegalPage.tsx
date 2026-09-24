import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { Logo } from './Logo'
import { Footer } from './Footer'
import { business } from '../data/business'
import { legalPages, type LegalSlug } from '../data/seo'

const BASE = import.meta.env.BASE_URL

/**
 * Páginas legales.
 * PLACEHOLDER CONTENIDO LEGAL: pegar aquí el texto definitivo (titular,
 * NIF, datos de contacto, finalidad del tratamiento, etc.). Mientras
 * tanto se muestra un aviso neutro.
 */
const content: Record<LegalSlug, string[] | null> = {
  'aviso-legal': null, // PLACEHOLDER CONTENIDO LEGAL
  privacidad: null, // PLACEHOLDER CONTENIDO LEGAL
  cookies: null, // PLACEHOLDER CONTENIDO LEGAL
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const paragraphs = content[slug]
  return (
    <>
      <header className="border-b border-white/10">
        <div className="container-x flex h-[var(--header-h)] items-center justify-between">
          <a href={BASE} className="flex items-center gap-3" aria-label="Rocasagna Pizzeria, volver a la web">
            <Logo size={48} priority alt="" className="size-11" />
          </a>
          <a href={BASE} className="inline-flex items-center gap-2 font-semibold text-yellow">
            <ArrowLeft size={18} weight="bold" aria-hidden="true" />
            Volver a la web
          </a>
        </div>
      </header>
      <main id="contenido" className="container-x max-w-3xl py-20 md:py-28">
        <h1 className="t-h2">{legalPages[slug].title}</h1>
        {paragraphs ? (
          <div className="mt-10 space-y-5 text-light/85">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ) : (
          <p className="t-lead mt-8">
            Estamos preparando este texto. Si tienes cualquier duda, llámanos al{' '}
            <a href={business.phone.href} className="text-yellow">
              {business.phone.display}
            </a>
            .
          </p>
        )}
      </main>
      <Footer onHome={false} />
    </>
  )
}
