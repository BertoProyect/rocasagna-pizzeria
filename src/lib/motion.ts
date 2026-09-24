/**
 * MOVIMIENTO
 * ---------------------------------------------------------------
 * Se carga después del primer pintado (import dinámico desde App),
 * así GSAP nunca retrasa el LCP ni los botones de llamada.
 *
 * Los componentes solo marcan elementos con atributos data-*:
 *   data-split            título: palabras que suben desde una máscara
 *   data-reveal="up"      entra subiendo
 *   data-reveal="clip"    foto que se destapa de abajo arriba
 *   data-reveal="stamp"   etiqueta que cae como un sello
 *   data-reveal="seal"    logo que gira al entrar
 *   data-stagger          hijos en cascada
 *   data-rule             línea separadora que se dibuja
 *   data-parallax-img     foto que se desplaza dentro de su marco
 *   data-parallax-wrap    bloque que flota a otra velocidad (escritorio)
 *   data-magnetic         botón que sigue al cursor (solo ratón)
 *
 * Todo respeta prefers-reduced-motion. Sin listeners de scroll propios:
 * ScrollTrigger gestiona el scroll de forma agrupada.
 */
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const EASE = 'expo.out'

export function initMotion(): () => void {
  gsap.registerPlugin(ScrollTrigger)
  ScrollTrigger.config({ ignoreMobileResize: true })

  const inVisiblePanel = (el: Element) => !el.closest('[hidden]')
  const all = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
    Array.from(root.querySelectorAll<T>(sel)).filter(inVisiblePanel)

  const mm = gsap.matchMedia()

  mm.add(
    {
      motion: '(prefers-reduced-motion: no-preference)',
      reduce: '(prefers-reduced-motion: reduce)',
      md: '(min-width: 768px)',
      desktop: '(min-width: 1024px)',
      fine: '(hover: hover) and (pointer: fine)',
    },
    (ctx) => {
      const { motion, reduce, md, desktop, fine } = ctx.conditions as Record<string, boolean>
      const listeners: Array<() => void> = []

      if (reduce) {
        // Sin movimiento: todo visible y en su estado final.
        all('[data-step-number]').forEach((n) => (n.dataset.lit = 'true'))
        return
      }
      if (!motion) return

      /* ---------- Cabecera: se esconde al bajar, vuelve al subir ---------- */
      const header = document.querySelector<HTMLElement>('.site-header')
      const html = document.documentElement
      if (header) {
        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate(self) {
            const menuOpen = document.getElementById('menu-movil')?.dataset.open === 'true'
            const hide = !menuOpen && self.direction === 1 && self.scroll() > window.innerHeight * 0.6
            const value = String(hide)
            if (header.dataset.hidden !== value) {
              header.dataset.hidden = value
              html.dataset.header = hide ? 'hidden' : 'visible'
            }
          },
        })
      }

      /* ---------- Hero: la foto se queda atrás, el contenido se despide ---------- */
      const hero = document.getElementById('inicio')
      if (hero) {
        gsap.to('[data-hero-media]', {
          yPercent: 16,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-content]', {
          yPercent: -10,
          autoAlpha: 0,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'center center', end: 'bottom top', scrub: true },
        })
        gsap.to('[data-hero-seal]', {
          rotate: 24,
          ease: 'none',
          scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true },
        })
      }

      /* ---------- Franja amarilla: cinta infinita que acelera y cambia de sentido con el scroll ---------- */
      const track = document.querySelector<HTMLElement>('[data-marquee]')
      if (track) {
        const loop = gsap.to(track, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 })
        loop.totalTime(loop.duration() * 500) // margen para poder ir hacia atrás
        let settle: gsap.core.Tween | undefined
        ScrollTrigger.create({
          trigger: track,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: (self) => loop.paused(!self.isActive),
          onUpdate(self) {
            const boost = 1 + Math.min(3, Math.abs(self.getVelocity()) / 450)
            loop.timeScale(self.direction * boost)
            settle?.kill()
            settle = gsap.to(loop, { timeScale: self.direction, duration: 1.1, ease: 'power2.out', delay: 0.08 })
          },
        })
      }

      /* ---------- Títulos: palabras que suben ---------- */
      all('[data-split]').forEach((el) => {
        gsap.from(el.querySelectorAll('.w > span'), {
          yPercent: 112,
          duration: 1.15,
          ease: EASE,
          stagger: 0.07,
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
        })
      })

      /* ---------- Entradas simples ---------- */
      all('[data-reveal="up"]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          delay: Number(el.dataset.delay || 0),
          scrollTrigger: { trigger: el, start: 'clamp(top 90%)', once: true },
        })
      })

      all('[data-stagger]').forEach((el) => {
        gsap.from(el.children, {
          y: 28,
          autoAlpha: 0,
          duration: 1,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
        })
      })

      /* ---------- Fotos que se destapan ---------- */
      all('[data-reveal="clip"]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.5,
            ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'clamp(top 85%)', once: true },
          },
        )
      })

      /* ---------- Parallax dentro del marco ---------- */
      all('[data-parallax-img]').forEach((img) => {
        const amount = Number(img.dataset.parallaxImg || 8)
        gsap.fromTo(
          img,
          { yPercent: -amount },
          {
            yPercent: amount,
            ease: 'none',
            scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        )
      })

      if (desktop) {
        all('[data-parallax-wrap]').forEach((el) => {
          const s = Number(el.dataset.parallaxWrap || 0)
          gsap.fromTo(el, { y: s * 7 }, { y: s * -7, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        })
      }

      gsap.fromTo(
        '[data-parallax-bg]',
        { yPercent: -8 },
        { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '#pedir', start: 'top bottom', end: 'bottom top', scrub: true } },
      )

      gsap.fromTo(
        '[data-menu-bg]',
        { scale: 1.18 },
        { scale: 1.02, ease: 'none', scrollTrigger: { trigger: '#carta', start: 'top bottom', end: 'bottom top', scrub: true } },
      )

      /* ---------- Separadores de la carta que se dibujan ---------- */
      const rules = all('[data-rule]')
      gsap.set(rules, { scaleX: 0 })
      ScrollTrigger.batch(rules, {
        start: 'clamp(top 94%)',
        once: true,
        onEnter: (batch) => gsap.to(batch, { scaleX: 1, duration: 1.2, ease: EASE, stagger: 0.05 }),
      })

      /* ---------- Etiquetas y sellos ---------- */
      all('[data-reveal="stamp"]').forEach((el) => {
        gsap.from(el, {
          scale: 1.8,
          rotate: -14,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
        })
      })
      all('[data-reveal="seal"]').forEach((el) => {
        gsap.from(el, {
          rotate: -40,
          scale: 0.7,
          autoAlpha: 0,
          duration: 1.4,
          ease: EASE,
          scrollTrigger: { trigger: el, start: 'clamp(top 88%)', once: true },
        })
      })

      /* ---------- Reparto: la línea une los pasos y cada número se enciende ---------- */
      const steps = document.querySelector<HTMLElement>('[data-steps]')
      if (steps) {
        const numbers = all('[data-step-number]', steps)
        const items = all('[data-step]', steps)
        gsap.from(items, {
          y: 40,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE,
          stagger: 0.12,
          scrollTrigger: { trigger: steps, start: 'clamp(top 85%)', once: true },
        })
        if (md) {
          const line = steps.querySelector('[data-steps-line]')
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: steps,
                start: 'top 72%',
                end: 'bottom 55%',
                scrub: 0.6,
                onUpdate(self) {
                  numbers.forEach((n, i) => {
                    n.dataset.lit = String(self.progress >= i / Math.max(1, numbers.length - 1) - 0.03)
                  })
                },
              },
            },
          )
        } else {
          numbers.forEach((n) =>
            ScrollTrigger.create({ trigger: n, start: 'top 70%', once: true, onEnter: () => (n.dataset.lit = 'true') }),
          )
        }
      }

      /* ---------- Teléfono grande: cifra a cifra ---------- */
      const digits = all('[data-phone-digits] > span')
      if (digits.length) {
        gsap.from(digits, {
          yPercent: 60,
          autoAlpha: 0,
          duration: 0.9,
          ease: EASE,
          stagger: 0.035,
          scrollTrigger: { trigger: digits[0].parentElement, start: 'clamp(top 90%)', once: true },
        })
      }

      /* ---------- Botones magnéticos (solo con ratón) ---------- */
      if (fine) {
        all('[data-magnetic]').forEach((el) => {
          el.classList.add('is-magnetic')
          const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'expo.out' })
          const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'expo.out' })
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect()
            xTo((e.clientX - (r.left + r.width / 2)) * 0.22)
            yTo((e.clientY - (r.top + r.height / 2)) * 0.32)
          }
          const leave = () => {
            xTo(0)
            yTo(0)
          }
          el.addEventListener('pointermove', move)
          el.addEventListener('pointerleave', leave)
          listeners.push(() => {
            el.removeEventListener('pointermove', move)
            el.removeEventListener('pointerleave', leave)
            el.classList.remove('is-magnetic')
          })
        })
      }

      return () => listeners.forEach((off) => off())
    },
  )

  // Recalcular posiciones cuando cargan fuentes e imágenes.
  const refresh = () => ScrollTrigger.refresh()
  document.fonts?.ready.then(refresh)
  if (document.readyState === 'complete') refresh()
  else window.addEventListener('load', refresh, { once: true })

  return () => {
    window.removeEventListener('load', refresh)
    mm.revert()
  }
}
