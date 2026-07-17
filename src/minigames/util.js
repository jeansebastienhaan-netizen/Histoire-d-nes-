import { useEffect, useRef } from 'react'

// Boucle d'animation partagée : fn(dt) en secondes, suspendue quand paused.
export function useTicker(fn, paused) {
  const fnRef = useRef(fn)
  fnRef.current = fn
  useEffect(() => {
    if (paused) return undefined
    let raf
    let last = performance.now()
    const loop = (t) => {
      const dt = Math.min(0.05, (t - last) / 1000)
      last = t
      fnRef.current(dt)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [paused])
}

export function shuffled(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}
