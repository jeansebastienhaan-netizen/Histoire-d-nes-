import React, { useRef, useState } from 'react'
import { useTicker } from './util.js'

// La coordination à 4 zones (Mousquetaires, scène 15).
// Quatre jauges d'équilibre qui dérivent pendant la traversée d'Aloïs.
// Mode famille : téléphone posé à plat, un coin par joueur — même mécanique.
const VARIANTS = {
  coeur: { drift: 0.16, warn: true, simultaneous: 1 },
  ruse: { drift: 0.11, warn: false, simultaneous: 2 },
  det: { drift: 0.2, warn: false, simultaneous: 2 },
}

const DURATION = 30 // secondes de traversée

export default function Coordination({ variant, familyMode, paused, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [gauges, setGauges] = useState([0.5, 0.5, 0.5, 0.5])
  const [progress, setProgress] = useState(0)
  const [slips, setSlips] = useState(0)
  const [warnZone, setWarnZone] = useState(-1)
  const drifts = useRef([0, 0, 0, 0])
  const perfect = useRef(true)
  const freeTry = useRef(true)
  const nextShuffle = useRef(0)

  useTicker(
    (dt) => {
      setProgress((p) => {
        const np = p + dt / DURATION
        if (np >= 1) {
          onEnd(perfect.current && slips === 0 ? 'perfect' : 'success')
          return 1
        }
        return np
      })
      // Le milieu de la traversée est le moment de doute : dérives accélérées.
      const mid = progress > 0.35 && progress < 0.7 ? 1.6 : 1
      nextShuffle.current -= dt
      if (nextShuffle.current <= 0) {
        nextShuffle.current = 1.2 + Math.random() * 1.2
        const active = []
        for (let i = 0; i < cfg.simultaneous; i++) active.push(Math.floor(Math.random() * 4))
        drifts.current = drifts.current.map((d, i) =>
          active.includes(i) ? (Math.random() < 0.5 ? -1 : 1) * cfg.drift : d * 0.4
        )
        if (cfg.warn || assist) setWarnZone(active[0])
      }
      setGauges((gs) => {
        const next = gs.map((g, i) => Math.max(0, Math.min(1, g + drifts.current[i] * dt * mid * 3)))
        const out = next.findIndex((g) => g <= 0.02 || g >= 0.98)
        if (out >= 0) {
          // L'échelle glisse.
          perfect.current = false
          drifts.current = [0, 0, 0, 0]
          if (freeTry.current) {
            freeTry.current = false
          } else {
            onError()
            setSlips((s) => {
              const n = s + 1
              if (n >= 3) onEnd('fail')
              return n
            })
          }
          return [0.5, 0.5, 0.5, 0.5]
        }
        return next
      })
    },
    paused
  )

  const steady = (i) => {
    drifts.current[i] = 0
    setGauges((gs) => gs.map((g, j) => (j === i ? 0.5 : g)))
    if (warnZone === i) setWarnZone(-1)
  }

  const corners = ['haut-gauche', 'haut-droit', 'bas-gauche', 'bas-droit']
  return (
    <div className={`game game--coord ${familyMode ? 'game--coord-family' : ''}`}>
      <div className="game__status">
        Traversée : {Math.round(progress * 100)}% · Glissades : {slips}/3
      </div>
      <div className="coord__board">
        <div className="coord__ladder" style={{ left: `${8 + progress * 76}%` }}>
          ✦
        </div>
        {gauges.map((g, i) => (
          <button
            key={i}
            type="button"
            className={`coord__zone coord__zone--${i} ${warnZone === i ? 'coord__zone--warn' : ''}`}
            onPointerDown={() => steady(i)}
            aria-label={`Coin ${corners[i]}`}
          >
            <span
              className={`coord__gauge ${g < 0.25 || g > 0.75 ? 'coord__gauge--danger' : ''}`}
              style={{ ['--v']: g }}
            >
              <span className="coord__needle" style={{ left: `${g * 100}%` }} />
            </span>
          </button>
        ))}
      </div>
      <div className="game__help">
        {familyMode
          ? 'Un coin par joueur : chacun redresse le sien dès qu\'il penche !'
          : 'Tapote un coin pour redresser sa jauge dès qu\'elle penche.'}
      </div>
    </div>
  )
}
