import React, { useMemo, useRef, useState } from 'react'
import { useTicker } from './util.js'
import { sfx } from '../engine/soundManager.js'

// Le chant de Manu (scène 11). Notes qui descendent sur des colonnes,
// taper quand elles franchissent la ligne. Trois couplets, tempo croissant.
const VARIANTS = {
  coeur: { cols: 3, window: 0.16, rescue: true, speed: [0.28, 0.32, 0.36] },
  ruse: { cols: 2, window: 0.12, rescue: false, speed: [0.34, 0.4, 0.46] },
  det: { cols: 3, window: 0.12, rescue: false, speed: [0.3, 0.36, 0.42] },
}

const NOTES_PER_VERSE = 8
const LINE = 0.82 // position de la ligne (0 haut, 1 bas)

export default function Rythme({ variant, paused, assist, onError, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [verse, setVerse] = useState(0)
  const [notes, setNotes] = useState(() => makeVerse(cfg.cols))
  const [jauge, setJauge] = useState(0)
  const [errors, setErrors] = useState(0)
  const missesRef = useRef(0)
  const perfect = useRef(true)
  const freeTry = useRef(true)
  const doneCount = useRef(0)

  function makeVerse(cols) {
    return Array.from({ length: NOTES_PER_VERSE }, (_, i) => ({
      id: i,
      col: Math.floor(Math.random() * cols),
      y: -0.15 - i * 0.35,
      hit: false,
      missed: false,
    }))
  }

  const endVerse = (verseMisses) => {
    if (verseMisses > (cfg.rescue ? 1 : 0)) {
      // Le couplet n'a pas porté assez loin.
      perfect.current = false
      if (freeTry.current) {
        freeTry.current = false
        retryVerse()
        return
      }
      onError()
      setErrors((e) => {
        const n = e + 1
        if (n >= 3) {
          onEnd('fail')
          return n
        }
        retryVerse()
        return n
      })
      return
    }
    if (verseMisses > 0) perfect.current = false
    const nv = verse + 1
    if (nv >= 3) {
      onEnd(perfect.current && errors === 0 ? 'perfect' : 'success')
      return
    }
    setVerse(nv)
    missesRef.current = 0
    setNotes(makeVerse(cfg.cols))
    doneCount.current = 0
  }

  const retryVerse = () => {
    missesRef.current = 0
    setNotes(makeVerse(cfg.cols))
    doneCount.current = 0
  }

  useTicker(
    (dt) => {
      setNotes((ns) => {
        let misses = 0
        let finished = 0
        const speed = cfg.speed[verse]
        const next = ns.map((n) => {
          if (n.hit || n.missed) {
            finished++
            return n
          }
          const y = n.y + dt * speed
          if (y > LINE + cfg.window) {
            misses++
            finished++
            return { ...n, y, missed: true }
          }
          return { ...n, y }
        })
        if (misses > 0) missesRef.current += misses
        if (finished >= NOTES_PER_VERSE && doneCount.current !== verse + 1) {
          doneCount.current = verse + 1
          setTimeout(() => endVerse(missesRef.current), 200)
        }
        return next
      })
    },
    paused
  )

  const tapCol = (col) => {
    setNotes((ns) => {
      const idx = ns.findIndex((n) => !n.hit && !n.missed && n.col === col && Math.abs(n.y - LINE) < cfg.window)
      if (idx === -1) return ns
      if (settings.sound) sfx.tap()
      setJauge((j) => Math.min(1, j + 1 / (NOTES_PER_VERSE * 3)))
      const next = [...ns]
      next[idx] = { ...next[idx], hit: true }
      return next
    })
  }

  return (
    <div className="game game--rythme">
      <div className="game__status">
        Couplet {verse + 1}/3 · Erreurs : {errors}/3
      </div>
      <div className="rythme__board">
        {Array.from({ length: cfg.cols }, (_, c) => (
          <button key={c} type="button" className="rythme__col" onPointerDown={() => tapCol(c)}>
            {notes
              .filter((n) => n.col === c && !n.hit && !n.missed && n.y > -0.1)
              .map((n) => (
                <span
                  key={n.id}
                  className={`rythme__note ${assist && Math.abs(n.y - LINE) < cfg.window * 1.6 ? 'rythme__note--soon' : ''}`}
                  style={{ top: `${n.y * 100}%` }}
                >
                  ♪
                </span>
              ))}
          </button>
        ))}
        <div className="rythme__line" style={{ top: `${LINE * 100}%` }} />
      </div>
      <div className="gauge">
        <div className="gauge__fill gauge__fill--warm" style={{ width: `${jauge * 100}%` }} />
      </div>
      <div className="game__help">La jauge, c'est la portée de la voix. Tape chaque note sur la ligne.</div>
    </div>
  )
}
