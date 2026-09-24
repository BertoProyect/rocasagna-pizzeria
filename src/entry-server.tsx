import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { LegalPage } from './components/LegalPage'
import type { LegalSlug } from './data/seo'

/** Prerender en build: HTML completo para SEO y un LCP rápido. */
export function render(page: 'home' | LegalSlug): string {
  return renderToString(<StrictMode>{page === 'home' ? <App /> : <LegalPage slug={page} />}</StrictMode>)
}
