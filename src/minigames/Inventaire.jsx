import React, { useMemo, useState } from 'react'

// Le Tetris d'inventaire (Noélia, scène 14).
// Tout doit rentrer, rien ne doit s'abîmer, le goûter voyage AU-DESSUS, toujours.
const VARIANTS = {
  coeur: { cols: 6, rows: 6, prePlaced: true, extras: false },
  ruse: { cols: 7, rows: 6, prePlaced: false, extras: true },
  det: { cols: 6, rows: 6, prePlaced: false, extras: false },
}

// Formes : matrices de 1. Le goûter (id 'gouter') doit finir sur la rangée du haut.
const BASE_ITEMS = [
  { id: 'coussin', label: 'Coussin de Noélia', color: '#c98ab8', shape: [[1, 1, 1], [1, 1, 1], [1, 1, 1]] },
  { id: 'couverture', label: 'Couverture', color: '#8a9ec9', shape: [[1, 1, 1], [1, 1, 1]] },
  { id: 'gouter', label: 'Boîte à goûter', color: '#e0b050', shape: [[1, 1], [1, 1]] },
  { id: 'gourde1', label: 'Gourde', color: '#7ab88a', shape: [[1, 0], [1, 1]] },
  { id: 'gourde2', label: 'Gourde', color: '#7ab88a', shape: [[1, 1], [0, 1]] },
  { id: 'lanterne1', label: 'Lanterne', color: '#e08a5a', shape: [[1]] },
  { id: 'lanterne2', label: 'Lanterne', color: '#e08a5a', shape: [[1]] },
  { id: 'cordes', label: 'Corde', color: '#b0a080', shape: [[1, 1, 1, 1]] },
]
const EXTRAS = [
  { id: 'miroir', label: 'Le miroir (indispensable)', color: '#a8c0d0', shape: [[1], [1]] },
  { id: 'eventail', label: "L'éventail (indispensable)", color: '#d0a8c0', shape: [[1, 1]] },
]

function rotate(shape) {
  const h = shape.length
  const w = shape[0].length
  const out = Array.from({ length: w }, () => Array(h).fill(0))
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) out[x][h - 1 - y] = shape[y][x]
  return out
}

export default function Inventaire({ variant, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const items = useMemo(() => {
    let list = BASE_ITEMS.map((it) => ({ ...it }))
    if (cfg.extras) list = [...list, ...EXTRAS.map((it) => ({ ...it }))]
    return list
  }, [cfg.extras])

  const [placed, setPlaced] = useState(() => {
    if (!cfg.prePlaced) return {}
    // Noélia pré-range un tiers : le coussin, dans le coin bas-gauche.
    return { coussin: { x: 0, y: cfg.rows - 3, shape: BASE_ITEMS[0].shape } }
  })
  const [selected, setSelected] = useState(null)
  const [shapes, setShapes] = useState(() => Object.fromEntries(items.map((it) => [it.id, it.shape])))
  const [message, setMessage] = useState('')
  const [tries, setTries] = useState(0)

  const grid = useMemo(() => {
    const g = Array.from({ length: cfg.rows }, () => Array(cfg.cols).fill(null))
    for (const [id, p] of Object.entries(placed)) {
      p.shape.forEach((row, dy) =>
        row.forEach((v, dx) => {
          if (v) g[p.y + dy][p.x + dx] = id
        })
      )
    }
    return g
  }, [placed, cfg])

  const canPlace = (shape, x, y) => {
    for (let dy = 0; dy < shape.length; dy++)
      for (let dx = 0; dx < shape[0].length; dx++) {
        if (!shape[dy][dx]) continue
        const gx = x + dx
        const gy = y + dy
        if (gx < 0 || gy < 0 || gx >= cfg.cols || gy >= cfg.rows) return false
        if (grid[gy][gx]) return false
      }
    return true
  }

  const tapCell = (x, y) => {
    if (grid[y][x]) {
      // Reprendre un objet posé.
      const id = grid[y][x]
      setPlaced((p) => {
        const np = { ...p }
        delete np[id]
        return np
      })
      setSelected(id)
      return
    }
    if (!selected) return
    const shape = shapes[selected]
    if (!canPlace(shape, x, y)) {
      setMessage('Noélia : « Ça dépasse, écuyer. Un royaume ne dépasse pas. »')
      setTries((t) => {
        const n = t + 1
        if (n === 4 || n === 8) onError()
        return n
      })
      return
    }
    setPlaced((p) => ({ ...p, [selected]: { x, y, shape } }))
    setSelected(null)
    setMessage('')
  }

  const allPlaced = items.every((it) => placed[it.id])
  const gouterOk = placed.gouter ? placed.gouter.y === 0 : false

  const validate = () => {
    if (!allPlaced) return
    if (!gouterOk) {
      setMessage('Noélia : « Le goûter voyage AU-DESSUS. Toujours. Recommence, écuyer. »')
      onError()
      setTries((t) => t + 1)
      return
    }
    onEnd(tries === 0 ? 'perfect' : 'success')
  }

  return (
    <div className="game game--inventaire">
      <div className="game__status">Le grand sac de l'expédition</div>
      <div
        className="inv__grid"
        style={{ gridTemplateColumns: `repeat(${cfg.cols}, 1fr)` }}
      >
        {grid.flatMap((row, y) =>
          row.map((cell, x) => {
            const item = cell ? items.find((it) => it.id === cell) : null
            return (
              <button
                key={`${x}-${y}`}
                type="button"
                className={`inv__cell ${y === 0 ? 'inv__cell--top' : ''}`}
                style={item ? { background: item.color } : undefined}
                onClick={() => tapCell(x, y)}
              />
            )
          })
        )}
      </div>
      <div className="inv__tray">
        {items
          .filter((it) => !placed[it.id])
          .map((it) => (
            <button
              key={it.id}
              type="button"
              className={`inv__item ${selected === it.id ? 'inv__item--sel' : ''}`}
              onClick={() => {
                if (selected === it.id) setShapes((s) => ({ ...s, [it.id]: rotate(s[it.id]) }))
                else setSelected(it.id)
              }}
            >
              <span className="inv__shape">
                {shapes[it.id].map((row, y) => (
                  <span key={y} className="inv__shaperow">
                    {row.map((v, x) => (
                      <span key={x} className="inv__px" style={{ background: v ? it.color : 'transparent' }} />
                    ))}
                  </span>
                ))}
              </span>
              <span className="inv__label">{it.label}</span>
            </button>
          ))}
      </div>
      {allPlaced && (
        <button type="button" className="btn btn--primary" onClick={validate}>
          Fermer le sac
        </button>
      )}
      {tries >= 6 && !allPlaced && (
        <button type="button" className="btn btn--small" onClick={() => onEnd('fail')}>
          Demander un décret à Noélia
        </button>
      )}
      {message && <div className="game__msg">{message}</div>}
      <div className="game__help">
        Choisis un objet (retouche-le pour le pivoter), puis pose-le. La rangée claire, en haut, c'est la place du goûter.
      </div>
    </div>
  )
}
