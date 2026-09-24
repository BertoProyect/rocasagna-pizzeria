/**
 * HORARIO
 * Cada día tiene una lista de franjas en hora de Europe/Madrid.
 * Día sin franjas = cerrado. Si una franja cruza la medianoche
 * (ej. 20:00 a 01:00), escribe close menor que open y el cálculo
 * de "abierto ahora" lo tiene en cuenta.
 */

export type DayKey = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
export interface Slot { open: string; close: string }

export const TIME_ZONE = 'Europe/Madrid'

export const weeklyHours: Record<DayKey, Slot[]> = {
  monday: [],
  tuesday: [],
  wednesday: [{ open: '20:00', close: '23:00' }],
  thursday: [{ open: '20:00', close: '23:00' }],
  friday: [
    { open: '13:00', close: '15:00' },
    { open: '20:00', close: '23:00' },
  ],
  saturday: [
    { open: '13:00', close: '15:00' },
    { open: '20:00', close: '23:00' },
  ],
  sunday: [{ open: '20:00', close: '23:00' }],
}

/** Orden de lectura (lunes primero) y etiquetas en español. */
export const dayOrder: DayKey[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export const dayLabels: Record<DayKey, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
}

/** Resumen corto para el pie de página. */
export const hoursSummary = 'De miércoles a domingo'

/** schema.org usa nombres de día en inglés. */
export const schemaDay: Record<DayKey, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
}
