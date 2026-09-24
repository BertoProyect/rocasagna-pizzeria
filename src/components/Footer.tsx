import { FacebookLogo, InstagramLogo, ShareNetwork } from '@phosphor-icons/react/dist/ssr'
import { Logo } from './Logo'
import { business, fullAddress, directionsHref } from '../data/business'
import { hoursSummary } from '../data/openingHours'
import { legalPages, type LegalSlug } from '../data/seo'

const BASE = import.meta.env.BASE_URL

export function Footer({ onHome = true }: { onHome?: boolean }) {
  const social = [
    business.social.instagram ? { href: business.social.instagram, label: 'Instagram', Icon: InstagramLogo } : null,
    business.social.facebook ? { href: business.social.facebook, label: 'Facebook', Icon: FacebookLogo } : null,
    business.social.other ? { href: business.social.other.url, label: business.social.other.label, Icon: ShareNetwork } : null,
  ].filter((x): x is NonNullable<typeof x> => x !== null)

  const home = onHome ? '' : BASE

  return (
    <footer className="relative border-t border-white/10 bg-ink pb-[var(--bar-h)]">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-12 lg:py-20">
        <div className="flex items-start gap-5 lg:col-span-4">
          <Logo size={80} className="size-20 flex-none" alt="" />
          <div>
            <p className="text-[1.25rem] font-bold uppercase tracking-[.12em] text-yellow">{business.name}</p>
            <p className="mt-2 text-muted">Pizzería en Gelida.</p>
          </div>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">Contacto</h2>
          <address className="mt-4 space-y-2 not-italic">
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="link-underline block text-light">
              {business.address.street}
              <br />
              {business.address.postalCode} {business.address.locality}, {business.address.region}
            </a>
            <a href={business.phone.href} className="link-underline inline-block text-[1.25rem] font-semibold text-yellow">
              {business.phone.international}
            </a>
          </address>
          <span className="sr-only">{fullAddress}</span>
        </div>

        <div className="lg:col-span-3">
          <h2 className="text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">Horario</h2>
          <p className="mt-4 text-light">{hoursSummary}</p>
          <a href={`${home}#ubicacion`} className="link-underline mt-1 inline-block text-muted hover:text-light">
            Consultar franjas horarias
          </a>
        </div>

        {social.length ? (
          <div className="lg:col-span-2">
            <h2 className="text-[.8125rem] font-semibold uppercase tracking-[.16em] text-muted">Síguenos</h2>
            <ul className="mt-4 flex gap-2">
              {social.map(({ href, label, Icon }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="grid size-11 place-items-center rounded-[var(--radius)] border border-white/15 text-light transition-colors hover:border-yellow hover:text-yellow">
                    <Icon size={20} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[.875rem] text-muted md:flex-row md:items-center md:justify-between">
          <p suppressHydrationWarning>© {new Date().getFullYear()} {business.name}</p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {(Object.keys(legalPages) as LegalSlug[]).map((slug) => (
                <li key={slug}>
                  <a href={`${BASE}${legalPages[slug].path}`} className="link-underline hover:text-light">
                    {legalPages[slug].title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          {business.credit ? (
            <p>
              Web:{' '}
              <a href={business.credit.url} target="_blank" rel="noopener" className="link-underline hover:text-light">
                {business.credit.label}
              </a>
            </p>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
