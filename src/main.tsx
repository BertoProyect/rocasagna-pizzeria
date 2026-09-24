import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App'
import { LegalPage } from './components/LegalPage'
import type { LegalSlug } from './data/seo'

const root = document.getElementById('root')!
const page = root.dataset.page as LegalSlug | undefined
const tree = <StrictMode>{page ? <LegalPage slug={page} /> : <App />}</StrictMode>

// En producción el HTML viene prerenderizado: se hidrata. En desarrollo se monta.
if (root.firstElementChild) hydrateRoot(root, tree)
else createRoot(root).render(tree)
