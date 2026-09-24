import { OpenStatus } from './OpenStatus'
import { useOpenStatus } from '../hooks/useOpenStatus'
import { weeklyHours, dayOrder, dayLabels } from '../data/openingHours'

export function OpeningHours() {
  const snap = useOpenStatus()
  const today = snap?.today

  return (
    <div>
      <OpenStatus variant="full" />
      <h3 className="sr-only">Horario semanal</h3>
      <ul className="mt-8 grid gap-1" data-stagger>
        {dayOrder.map((day) => {
          const slots = weeklyHours[day]
          const isToday = day === today
          return (
            <li
              key={day}
              className={`grid grid-cols-[7.5rem_1fr] items-baseline gap-4 rounded-[var(--radius)] px-4 py-2.5 transition-colors ${
                isToday ? 'bg-yellow text-ink' : slots.length ? 'text-light' : 'text-muted'
              }`}
              aria-current={isToday ? 'date' : undefined}
            >
              <span className="font-semibold">
                {dayLabels[day]}
                {isToday ? <span className="sr-only"> (hoy)</span> : null}
              </span>
              <span className="tabular-nums">
                {slots.length ? (
                  slots.map((s) => (
                    <span key={s.open} className="block">
                      {s.open} a {s.close}
                    </span>
                  ))
                ) : (
                  <span>Cerrado</span>
                )}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
