import React, { useMemo, useState } from 'react'
import { shuffled } from './util.js'

// Le Mastermind de cristal (Mamy, scène 7).
// Lueur dorée = bon symbole bien placé ; argentée = bon symbole mal placé.
// Mode daltonien (toujours doublé de formes) : dorée = cercle plein, argentée = anneau.
const SYMBOLS = [
  { id: 'lune', glyph: '☾' },
  { id: 'racine', glyph: 'ᚼ' },
  { id: 'eau', glyph: '≈' },
  { id: 'spirale', glyph: '𖦹' },
  { id: 'main', glyph: '✋' },
  { id: 'etoile', glyph: '✦' },
]

const VARIANTS = {
  coeur: { pool: 6, tries: 6, souvenirs: true },
  ruse: { pool: 4, tries: 4, souvenirs: false },
  det: { pool: 6, tries: 6, souvenirs: false },
}

const SOUVENIRS = {
  lune: "Mamy : « La lune... ta grand-tante en rêvait avant les crues. L'eau n'est pas loin de la lune, crois-moi. »",
  racine: 'Mamy : « Les racines, mon petit, ça pousse toujours par deux dans mes rêves. »',
  eau: "Mamy : « L'eau, elle se place jamais en premier. Elle suit. »",
  spirale: 'Mamy : « La spirale, je la vois partout depuis trente ans. Elle est rarement de trop. »',
  main: "Mamy : « La main, c'est celle qui a creusé. Elle se met où on l'attend pas. »",
  etoile: "Mamy : « L'étoile brille trop pour se cacher longtemps. »",
}

export default function Mastermind({ variant, assist, onError, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const pool = useMemo(() => SYMBOLS.slice(0, cfg.pool), [cfg.pool])
  const secret = useMemo(() => shuffled(pool).slice(0, 3).map((s) => s.id), [pool])
  const [current, setCurrent] = useState([])
  const [rows, setRows] = useState([])
  const [souvenir, setSouvenir] = useState('')

  const propose = () => {
    if (current.length !== 3) return
    const gold = current.filter((id, i) => secret[i] === id).length
    const inSecret = current.filter((id) => secret.includes(id)).length
    const silver = inSecret - gold
    const row = { guess: current, gold, silver }
    const nextRows = [...rows, row]
    setRows(nextRows)
    setCurrent([])
    if (gold === 3) {
      onEnd(nextRows.length <= 3 ? 'perfect' : 'success')
      return
    }
    onError()
    if (cfg.souvenirs) {
      const wrongIdx = current.findIndex((id, i) => secret[i] !== id)
      const key = current[wrongIdx >= 0 ? wrongIdx : 0]
      setSouvenir(SOUVENIRS[key] || '')
    }
    if (nextRows.length >= cfg.tries) onEnd('fail')
  }

  const toggle = (id) => {
    setCurrent((c) => (c.length < 3 ? [...c, id] : c))
  }

  return (
    <div className="game game--mastermind">
      <div className="game__status">
        Essais : {rows.length}/{cfg.tries}
      </div>
      <div className="mm__rows">
        {rows.map((r, i) => (
          <div key={i} className="mm__row">
            {r.guess.map((id, j) => (
              <span key={j} className="mm__cell">
                {SYMBOLS.find((s) => s.id === id).glyph}
              </span>
            ))}
            <span className="mm__feedback">
              {Array.from({ length: r.gold }).map((_, k) => (
                <span key={`g${k}`} className="mm__gold" title="bien placé">
                  ●
                </span>
              ))}
              {Array.from({ length: r.silver }).map((_, k) => (
                <span key={`s${k}`} className="mm__silver" title="mal placé">
                  ○
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
      <div className="mm__current">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            className="mm__cell mm__cell--slot"
            onClick={() => setCurrent((c) => c.filter((_, j) => j !== i))}
          >
            {current[i] ? SYMBOLS.find((s) => s.id === current[i]).glyph : '·'}
          </button>
        ))}
        <button type="button" className="btn btn--small" disabled={current.length !== 3} onClick={propose}>
          Proposer
        </button>
      </div>
      <div className="mm__pool">
        {pool.map((s) => (
          <button
            key={s.id}
            type="button"
            className={`mm__cell mm__cell--pick ${assist && secret.includes(s.id) ? 'mm__cell--assist' : ''}`}
            onClick={() => toggle(s.id)}
          >
            {s.glyph}
          </button>
        ))}
      </div>
      {souvenir && <div className="game__msg">{souvenir}</div>}
      <div className="game__help">
        ● dorée (pleine) : symbole à sa place · ○ argentée (anneau) : symbole présent, mal placé
      </div>
    </div>
  )
}
