import { useOpenStatus } from '../hooks/useOpenStatus'
import { describeNextOpening } from '../lib/openStatus'

interface Props {
  variant?: 'compact' | 'full'
  className?: string
}

/** Indicador "Abierto ahora / Cerrado ahora" con la hora de Madrid. */
export function OpenStatus({ variant = 'compact', className = '' }: Props) {
  const snap = useOpenStatus()
  const s = snap?.status
  const state = !s ? 'unknown' : s.open ? 'true' : 'false'

  if (variant === 'compact') {
    return (
      <a
        href="#ubicacion"
        className={`inline-flex min-h-9 items-center gap-2 rounded-[var(--radius)] border border-white/15 px-3 text-[.75rem] font-semibold uppercase tracking-[.14em] text-light transition-colors hover:border-yellow/60 ${className}`}
        aria-label={s ? (s.open ? `Abierto ahora, hasta las ${s.closesAt}. Ver horario` : 'Cerrado ahora. Ver horario') : 'Ver horario'}
      >
        <span className="status-dot" data-open={state} aria-hidden="true" />
        <span className="min-w-[4.6em]">{s ? (s.open ? 'Abierto' : 'Cerrado') : 'Horario'}</span>
      </a>
    )
  }

  const title = s ? (s.open ? 'Abierto ahora' : 'Cerrado ahora') : 'Consulta el horario'
  const detail = s
    ? s.open
      ? `Hasta las ${s.closesAt}`
      : s.nextOpening
        ? `Próxima apertura: ${describeNextOpening(s.nextOpening)}`
        : ''
    : ' '

  return (
    <div className={className} aria-live="polite">
      <p className="flex items-center gap-3 text-[1.375rem] font-bold uppercase leading-none tracking-[.08em] text-light">
        <span className="status-dot" data-open={state} aria-hidden="true" />
        {title}
      </p>
      <p className="mt-2 min-h-[1.6em] pl-[1.35rem] text-muted">{detail}</p>
    </div>
  )
}
