import { useSyncExternalStore } from 'react'
import { getOpenStatus, todayKey, type OpenStatus } from '../lib/openStatus'
import type { DayKey } from '../data/openingHours'

/**
 * Un único reloj compartido (se actualiza cada 30 s y al volver a la
 * pestaña). En el HTML prerenderizado el estado es `null` y se calcula
 * en el navegador con la hora de Madrid, así no hay desajustes.
 */
interface Snapshot { status: OpenStatus; today: DayKey; key: string }

let snapshot: Snapshot | null = null
const listeners = new Set<() => void>()
let timer: number | undefined

function compute() {
  const status = getOpenStatus()
  const today = todayKey()
  const key = JSON.stringify([status, today])
  if (!snapshot || snapshot.key !== key) {
    snapshot = { status, today, key }
    listeners.forEach((l) => l())
  }
}

function onVisible() {
  if (document.visibilityState === 'visible') compute()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    compute()
    timer = window.setInterval(compute, 30_000)
    document.addEventListener('visibilitychange', onVisible)
  }
  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      window.clearInterval(timer)
      document.removeEventListener('visibilitychange', onVisible)
    }
  }
}

export function useOpenStatus(): Snapshot | null {
  return useSyncExternalStore(subscribe, () => snapshot, () => null)
}
