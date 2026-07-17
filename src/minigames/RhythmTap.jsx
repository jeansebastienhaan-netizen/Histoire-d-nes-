import { useEffect, useRef, useState } from 'react'

// Tap rythmé (Xavier, Cyril, Lo).
// config : { bpm = 80, taps = 8, tolerance = 0.3, prompt }
// Le cercle bat la mesure ; il faut taper au sommet de chaque pulsation.
// onEnd('success' | 'partial' | 'fail')
export default function RhythmTap({ config, onEnd }) {
  const bpm = config.bpm ?? 80
  const total = config.taps ?? 8
  const tolerance = config.tolerance ?? 0.3 // fraction du battement
  const beatMs = 60000 / bpm

  const [started, setStarted] = useState(false)
  const [hits, setHits] = useState(0)
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState(0)
  const startRef = useRef(0)
  const rafRef = useRef(0)
  const doneRef = useRef(false)

  useEffect(() => {
    if (!started) return
    const tick = () => {
      const elapsed = performance.now() - startRef.current
      setPhase((elapsed % beatMs) / beatMs)
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [started, beatMs])

  const finish = (h) => {
    if (doneRef.current) return
    doneRef.current = true
    cancelAnimationFrame(rafRef.current)
    const ratio = h / total
    onEnd(ratio >= 0.75 ? 'success' : ratio >= 0.5 ? 'partial' : 'fail')
  }

  const tap = () => {
    if (!started) {
      startRef.current = performance.now()
      setStarted(true)
      return
    }
    const elapsed = performance.now() - startRef.current
    const p = (elapsed % beatMs) / beatMs
    // distance au battement le plus proche (0 = pile dessus)
    const dist = Math.min(p, 1 - p)
    const hit = dist <= tolerance / 2
    const nextHits = hit ? hits + 1 : hits
    const nextCount = count + 1
    setHits(nextHits)
    setCount(nextCount)
    if (navigator.vibrate && hit) navigator.vibrate(30)
    if (nextCount >= total) finish(nextHits)
  }

  const scale = started ? 0.7 + 0.3 * (1 - Math.abs(phase - 0.5) * 2) : 1

  return (
    <div className="minigame">
      <p className="minigame-question">{config.prompt ?? 'Tape en rythme quand le cercle est grand !'}</p>
      <div className="rhythm-area" onPointerDown={tap}>
        <div
          className="rhythm-circle"
          style={{ transform: `scale(${scale.toFixed(3)})` }}
        />
        <div className="rhythm-label">
          {started ? `${count} / ${total}` : 'Touche pour commencer'}
        </div>
      </div>
      <p className="minigame-hint">Réussis : {hits}</p>
    </div>
  )
}
