# Rocasagna Pizzeria · web oficial

Web de una sola página para Rocasagna Pizzeria (Carrer Major, 97, Gelida). Móvil primero y pensada para que la gente llame y pida.

**Estado: DEMO.** Fotos de stock, sin alérgenos y con textos provisionales. Busca `PLACEHOLDER` en el código para ver todo lo que falta.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4 (tokens de marca en `src/styles/index.css`)
- GSAP + ScrollTrigger para las animaciones (se cargan después del primer pintado)
- HTML prerenderizado en build (SEO local y carga rápida), con hidratación en el navegador
- Iconos: Phosphor. Tipografía: Jost (autoalojada)

## Comandos

```bash
npm install
npm run dev          # desarrollo
npm run build        # producción -> dist/
npm run build:demo   # demo para GitHub Pages (noindex, ruta /rocasagna-pizzeria/)
npm run preview      # probar el build
```

## Dónde se edita cada cosa

| Qué | Archivo |
| --- | --- |
| Teléfono, WhatsApp, dirección, redes, reparto, texto "Sobre nosotros" | `src/data/business.ts` |
| Carta completa (nombres, ingredientes, precios, alérgenos, picantes) | `src/data/menu.ts` |
| Horario (el "Abierto ahora" se calcula solo, hora de Madrid) | `src/data/openingHours.ts` |
| Fotos | `src/data/media.ts` + carpeta `public/photos/` |
| Reseñas de Google | `src/data/reviews.ts` |
| Título, descripción SEO | `src/data/seo.ts` |
| Dominio definitivo | `.env` → `VITE_SITE_URL` |
| Textos legales | `src/components/LegalPage.tsx` |

Los datos a `null` no se muestran: la web nunca enseña huecos ni enlaces rotos. Ejemplo: cuando pongas el WhatsApp en `business.ts`, aparecen solos todos los botones de WhatsApp (hero, reparto, CTA final, barra móvil y menú).

## Pendiente antes de publicar (cliente)

1. **Alérgenos** de cada producto (obligatorio por el Reglamento UE 1169/2011). Mientras tanto la carta indica que se pregunte al pedir.
2. **WhatsApp**: número real o confirmar que no usan.
3. **Reparto**: confirmar que reparten, pedido mínimo, tiempo y coste.
4. **Texto "Sobre nosotros"**: el actual es provisional.
5. **Fotos reales** de la sesión (hero, Margarita, 3 pizzas, local, CTA).
6. **Reseñas reales** de Google (texto + nombre, tal cual).
7. **Redes sociales** (Instagram, Facebook).
8. **Textos legales** (aviso legal, privacidad, cookies).
9. **Dominio** y `VITE_SITE_URL` (activa canonical, Open Graph absoluto y sitemap).
10. Dudas de la carta: precio de la Pantxineta (10 € dentro de la terrina grande) y "Reunite" en el Lambrusco (en la carta pone así; la marca habitual es "Riunite").

## Cambiar una foto

1. Exporta la foto en WebP o JPG, unos 2400 px de ancho para el hero y 1600 px para el resto.
2. Guárdala en `public/photos/` (por ejemplo `public/photos/hero.webp`).
3. En `src/data/media.ts` cambia `src` por `{ kind: 'local', path: 'photos/hero.webp' }` y ajusta `width`/`height` y `alt`.

## Despliegue

- **Demo**: rama `gh-pages` (GitHub Pages), generada con `npm run build:demo`. Lleva `noindex` para que Google no la indexe como web oficial.
- **Producción** (Cloudflare Pages, Netlify o cualquier hosting estático): comando `npm run build`, carpeta `dist`, variable `VITE_SITE_URL` con el dominio y `VITE_NOINDEX=false`.

## Accesibilidad y rendimiento

- Contraste AA o superior en todo el texto (amarillo sobre antracita 9,4:1).
- Navegación completa con teclado, foco visible, pestañas de la carta con flechas/Inicio/Fin, menú móvil con Esc y foco atrapado.
- `prefers-reduced-motion`: sin parallax, sin cinta en movimiento, sin entradas animadas.
- Hero precargado, el resto de imágenes en diferido, espacio reservado para evitar saltos.
