// Inserta el HTML renderizado en servidor dentro de cada página del build.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const ssrDir = path.resolve('dist-ssr')
const entry = fs.readdirSync(ssrDir).find((f) => f.startsWith('entry-server') && f.endsWith('.js'))
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href)

const pages = [
  { file: 'index.html', page: 'home' },
  { file: 'aviso-legal/index.html', page: 'aviso-legal' },
  { file: 'privacidad/index.html', page: 'privacidad' },
  { file: 'cookies/index.html', page: 'cookies' },
]

for (const { file, page } of pages) {
  const target = path.join(dist, file)
  const html = fs.readFileSync(target, 'utf8')
  if (!html.includes('<!--app-html-->')) throw new Error(`Falta <!--app-html--> en ${file}`)
  fs.writeFileSync(target, html.replace('<!--app-html-->', render(page)))
  console.log(`prerender ok: ${file}`)
}

fs.rmSync(ssrDir, { recursive: true, force: true })
