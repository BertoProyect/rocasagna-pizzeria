/**
 * Cálculo de "abierto ahora" en hora de España (Europe/Madrid),
 * independiente de la zona horaria del dispositivo o del servidor.
 */
import { weeklyHours, TIME_ZONE, dayLabels, type DayKey, type Slot } from '../data/openingHours.ts'

const JS_DAY_TO_KEY: DayKey[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
const SHORT_TO_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

/** Día de la semana (0 = domingo) y minutos desde medianoche en Madrid. */
export function madridClock(date: Date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const hour = Number(get('hour')) % 24
  return { day: SHORT_TO_INDEX[get('weekday')] ?? 0, minutes: hour * 60 + Number(get('minute')) }
}

export const todayKey = (date?: Date): DayKey => JS_DAY_TO_KEY[madridClock(date).day]

interface Interval { start: number; end: number; slot: Slot }

/** Franjas de un día como intervalos en minutos (las que cruzan medianoche terminan > 1440). */
function intervals(dayIndex: number): Interval[] {
  return weeklyHours[JS_DAY_TO_KEY[((dayIndex % 7) + 7) % 7]].map((slot) => {
    const start = toMinutes(slot.open)
    let end = toMinutes(slot.close)
    if (end <= start) end += 24 * 60
    return { start, end, slot }
  })
}

export type OpenStatus =
  | { open: true; closesAt: string }
  | { open: false; nextOpening: { dayOffset: number; dayKey: DayKey; time: string } | null }

export function getOpenStatus(date: Date = new Date()): OpenStatus {
  const { day, minutes } = madridClock(date)

  // ¿Dentro de una franja de hoy?
  for (const i of intervals(day)) {
    if (minutes >= i.start && minutes < i.end) return { open: true, closesAt: i.slot.close }
  }
  // ¿Dentro de una franja de ayer que cruza la medianoche?
  for (const i of intervals(day - 1)) {
    if (i.end > 1440 && minutes < i.end - 1440) return { open: true, closesAt: i.slot.close }
  }
  // Próxima apertura (hasta una semana vista)
  for (let offset = 0; offset <= 7; offset++) {
    const candidates = intervals(day + offset).filter((i) => offset > 0 || i.start > minutes)
    if (candidates.length) {
      const next = candidates.sort((a, b) => a.start - b.start)[0]
      return {
        open: false,
        nextOpening: { dayOffset: offset, dayKey: JS_DAY_TO_KEY[(day + offset) % 7], time: next.slot.open },
      }
    }
  }
  return { open: false, nextOpening: null }
}

/** "hoy a las 20:00", "mañana a las 13:00", "el miércoles a las 20:00" */
export function describeNextOpening(next: { dayOffset: number; dayKey: DayKey; time: string }): string {
  if (next.dayOffset === 0) return `hoy a las ${next.time}`
  if (next.dayOffset === 1) return `mañana a las ${next.time}`
  return `el ${dayLabels[next.dayKey].toLowerCase()} a las ${next.time}`
}
