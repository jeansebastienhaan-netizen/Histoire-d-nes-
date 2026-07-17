import React, { useMemo, useRef, useState } from 'react'
import { useTicker, shuffled } from './util.js'

// Le mikado de pierres (Papy, scène 4).
// Désigner une pierre, maintenir pour treuiller, relâcher dans la fenêtre de tension.
// 3 pierres porteuses cachées (4 en Détermination). Retirer 5 pierres sans 3 erreurs.
const VARIANTS = {
  coeur: { porteuses: 3, consults: 3, dust: false, window: [0.45, 0.85] },
  ruse: { porteuses: 3, consults: 0, dust: true, window: [0.45, 0.8] },
  det: { porteuses: 4, consults: 0, dust: false, window: [0.5, 0.78] },
}

function makeStones(nPorteuses) {
  const n = 13
  const ids = shuffled(Array.from({ length: n }, (_, i) => i))
  const porteuses = new Set(ids.slice(0, nPorteuses))
  return Array.from({ length: n }, (_, i) => ({
    id: i,
    porteuse: porteuses.has(i),
    removed: false,
    x: 8 + (i % 5) * 18 + (Math.floor(i / 5) % 2) * 8,
    y: 62 - Math.floor(i / 5) * 16,
    w: 14 + ((i * 7) % 6),
    h: 11 + ((i * 5) % 4),
  }))
}

export default function Mikado({ variant, paused, assist, onError, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.coeur
  const [stones, setStones] = useState(() => makeStones(cfg.porteuses))
  const [selected, setSelected] = useState(null)
  const [tension, setTension] = useState(0)
  const [holding, setHolding] = useState(false)
  const [errors, setErrors] = useState(0)
  const [removed, setRemoved] = useState(0)
  const [consults, setConsults] = useState(cfg.consults)
  const [consultMode, setConsultMode] = useState(false)
  const [message, setMessage] = useState('')
  const freeTry = useRef(true) // manche d'essai gratuite : la 1re erreur ne compte pas
  const perfect = useRef(true)

  useTicker(
    (dt) => {
      if (holding && selected != null) {
        setTension((t) => {
          const nt = t + dt * 0.55
          if (nt >= 1) {
            // Câble trop tendu : la pierre retombe (raté doux, pas une erreur comptée).
            setHolding(false)
            setSelected(null)
            setMessage('La pierre retombe. On respire, on recommence.')
            perfect.current = false
            return 0
          }
          return nt
        })
      }
    },
    paused
  )

  const fail = () => {
    setErrors((e) => {
      const n = e + 1
      if (n >= 3) onEnd('fail')
      return n
    })
    onError()
    perfect.current = false
  }

  const tapStone = (s) => {
    if (s.removed || holding) return
    if (consultMode) {
      setConsultMode(false)
      setConsults((c) => c - 1)
      setMessage(s.porteuse ? 'Papy : « Celle-là, elle porte. Touche pas. »' : 'Papy : « Celle-là, tu peux. »')
      return
    }
    setSelected(s.id)
    setTension(0)
    setHolding(true)
    setMessage('')
  }

  const release = () => {
    if (!holding || selected == null) return
    setHolding(false)
    const s = stones.find((st) => st.id === selected)
    setSelected(null)
    const [lo, hi] = cfg.window
    const inWindow = tension >= lo && tension <= hi
    setTension(0)
    if (!inWindow) {
      setMessage('Relâché trop tôt ou trop tard : la pierre retombe.')
      perfect.current = false
      return
    }
    if (s.porteuse) {
      if (freeTry.current) {
        freeTry.current = false
        setMessage("L'éboulis glisse... et se rattrape. Celle-là portait.")
        perfect.current = false
        return
      }
      setMessage("Mauvaise pierre : l'ensemble glisse, la brèche se réduit.")
      fail()
      return
    }
    setStones((arr) => arr.map((st) => (st.id === s.id ? { ...st, removed: true } : st)))
    setRemoved((r) => {
      const n = r + 1
      if (n >= 5) setTimeout(() => onEnd(perfect.current && errors === 0 ? 'perfect' : 'success'), 400)
      return n
    })
    setMessage('')
  }

  const [lo, hi] = cfg.window
  return (
    <div className="game game--mikado" onPointerUp={release} onPointerLeave={release}>
      <div className="game__status">
        Pierres retirées : {removed}/5 · Erreurs : {errors}/3
      </div>
      <svg viewBox="0 0 110 80" className="game__board">
        {stones.map(
          (s) =>
            !s.removed && (
              <g key={s.id} onPointerDown={() => tapStone(s)}>
                <rect
                  x={s.x}
                  y={s.y}
                  width={s.w}
                  height={s.h}
                  rx="3"
                  fill={selected === s.id ? '#8a7a5a' : '#5e564a'}
                  stroke="#2e2a22"
                  strokeWidth="0.8"
                />
                {(cfg.dust || assist) && s.porteuse && (
                  <line
                    x1={s.x + s.w / 2}
                    y1={s.y + s.h}
                    x2={s.x + s.w / 2}
                    y2={s.y + s.h + 3}
                    stroke="#c9b98a"
                    strokeWidth="0.7"
                    strokeDasharray="0.8 0.8"
                  />
                )}
              </g>
            )
        )}
      </svg>
      {holding && (
        <div className="gauge">
          <div className="gauge__zone" style={{ left: `${lo * 100}%`, width: `${(hi - lo) * 100}%` }} />
          <div className="gauge__fill" style={{ width: `${tension * 100}%` }} />
        </div>
      )}
      {consults > 0 && !holding && (
        <button type="button" className="btn btn--small" onClick={() => setConsultMode(true)}>
          Demander à Papy ({consults})
        </button>
      )}
      {consultMode && <div className="game__msg">Papy attend : montre-lui une pierre.</div>}
      {message && <div className="game__msg">{message}</div>}
      <div className="game__help">Touche une pierre, maintiens pour treuiller, relâche dans la zone claire.</div>
    </div>
  )
}
