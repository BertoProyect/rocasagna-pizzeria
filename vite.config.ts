import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'
import { buildHead, type HeadOptions } from './src/seo/head.ts'
import type { LegalSlug } from './src/data/seo.ts'

/** Inyecta title, meta, Open Graph y JSON-LD en cada HTML a partir de src/data. */
function seoHead(opts: HeadOptions): Plugin {
  return {
    name: 'rocasagna-seo-head',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const match = ctx.path.match(/\/(aviso-legal|privacidad|cookies)\//)
        const page = (match ? match[1] : 'home') as 'home' | LegalSlug
        return html.replace('<!--head-tags-->', buildHead(page, opts))
      },
    },
    // robots.txt y sitemap.xml según el entorno (demo = no indexar)
    generateBundle() {
      const robots = opts.noindex
        ? 'User-agent: *\nDisallow: /\n'
        : `User-agent: *\nAllow: /\n${opts.siteUrl ? `Sitemap: ${opts.siteUrl.replace(/\/$/, '')}/sitemap.xml\n` : ''}`
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots })
      if (opts.siteUrl && !opts.noindex) {
        const url = opts.siteUrl.replace(/\/$/, '') + '/'
        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${url}</loc></url>\n</urlset>\n`
        this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap })
      }
    },
  }
}

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.BASE_PATH || '/'
  const opts: HeadOptions = {
    base,
    siteUrl: env.VITE_SITE_URL || '',
    noindex: env.VITE_NOINDEX === 'true',
  }
  return {
    base,
    plugins: [react(), tailwindcss(), ...(isSsrBuild ? [] : [seoHead(opts)])],
    build: isSsrBuild
      ? {}
      : {
          rollupOptions: {
            input: {
              main: resolve(import.meta.dirname, 'index.html'),
              avisoLegal: resolve(import.meta.dirname, 'aviso-legal/index.html'),
              privacidad: resolve(import.meta.dirname, 'privacidad/index.html'),
              cookies: resolve(import.meta.dirname, 'cookies/index.html'),
            },
          },
        },
  }
})
