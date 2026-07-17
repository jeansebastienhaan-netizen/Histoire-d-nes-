import React, { useRef, useState } from 'react'
import { useTicker } from './util.js'

// Le fil chaud de la flamme (JS, scène 6).
// Glisser le halo le long des parois : passer sur les marques nourrit la flamme.
// Traverser 3 sections. Flamme éteinte 3 fois = échec (jamais bloquant).
const VARIANTS = {
  coeur: { decay: 0.045, magnet: true, reveal: false, boost: 0.5 },
  ruse: { decay: 0.065, magnet: false, reveal: true, boost: 0.5 },
  det: { decay: 0.095, magnet: false, reveal: false, boost: 0.9 },
}

function makeMarks() {
  return Array.from({ length: 4 }, (_, i) => ({
    id: i,
    x: 12 + i * 24 + Math.random() * 10,
    y: 18 + Math.random() * 54,
    lit: false,
  }))
}

export default function Flamme({ variant, paused, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.coeur
  const [section, setSection] = useState(1)
  const [marks, setMarks] = useState(makeMarks)
  const [flame, setFlame] = useState(1)
  const [outs, setOuts] = useState(0)
  const [halo, setHalo] = useState({ x: 50, y: 50 })
  const [revealId, setRevealId] = useState(null)
  const perfect = useRef(true)
  const freeOut = useRef(true)
  const boardRef = useRef(null)

  useTicker(
    (dt) => {
      setFlame((f) => {
        const nf = f - cfg.decay * dt * 10
        if (nf <= 0) {
          // La flamme s'éteint — elle « reprend son souffle ».
          perfect.current = false
          if (freeOut.current) {
            freeOut.current = false
          } else {
            onError()
            setOuts((o) => {
              const n = o + 1
              if (n >= 3) onEnd('fail')
              return n
            })
          }
          return 1
        }
        return nf
      })
    },
    paused
  )

  const move = (e) => {
    const rect = boardRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setHalo({ x, y })
    setMarks((ms) => {
      let changed = false
      const next = ms.map((m) => {
        if (!m.lit && Math.hypot(m.x - x, m.y - y) < 9) {
          changed = true
          return { ...m, lit: true }
        }
        return m
      })
      if (changed) {
        setFlame((f) => Math.min(1, f + cfg.boost))
        if (cfg.reveal) {
          const unlit = next.filter((m) => !m.lit)
          if (unlit.length) {
            setRevealId(unlit[0].id)
            setTimeout(() => setRevealId(null), 900)
          }
        }
        if (next.every((m) => m.lit)) {
          setTimeout(() => {
            if (section >= 3) onEnd(perfect.current ? 'perfect' : 'success')
            else {
              setSection((s) => s + 1)
              setMarks(makeMarks())
              setFlame(1)
            }
          }, 350)
        }
      }
      return changed ? next : ms
    })
  }

  const near = (m) => Math.hypot(m.x - halo.x, m.y - halo.y) < 18
  return (
    <div className="game game--flamme">
      <div className="game__status">
        Section {section}/3 · Extinctions : {outs}/3
      </div>
      <div
        className="flamme__board"
        ref={boardRef}
        onPointerMove={move}
        onPointerDown={move}
        style={{ touchAction: 'none' }}
      >
        {marks.map((m) => {
          const show = m.lit || revealId === m.id || (assist && !m.lit) || (cfg.magnet && near(m))
          return (
            <div
              key={m.id}
              className={`flamme__mark ${m.lit ? 'flamme__mark--lit' : ''} ${show ? 'flamme__mark--seen' : ''}`}
              style={{ left: `${m.x}%`, top: `${m.y}%` }}
            >
              𖦹
            </div>
          )
        })}
        <div
          className="flamme__halo"
          style={{ left: `${halo.x}%`, top: `${halo.y}%`, opacity: 0.35 + flame * 0.65 }}
        />
      </div>
      <div className="gauge gauge--flamme">
        <div className="gauge__fill gauge__fill--warm" style={{ width: `${flame * 100}%` }} />
      </div>
      <div className="game__help">Glisse le halo sur les parois pour trouver les marques qui nourrissent la flamme.</div>
    </div>
  )
}
