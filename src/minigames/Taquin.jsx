import React, { useMemo, useState } from 'react'

// Le taquin de pierre (Lana, scène 13). Grille 3×3, 8 plaques gravées + 1 vide.
// Les plaques reconstituent le motif en spirale des parois.
const VARIANTS = {
  coeur: { watermark: true, previews: 0 },
  ruse: { watermark: false, previews: 3 },
  det: { watermark: false, previews: 0 },
}

const SPIRAL = ['◜', '─', '◝', '│', '𖦹', '│', '◟', '─'] // motif par plaque (0..7), case 8 vide

function shuffleBoard() {
  // Mélange par coups légaux depuis l'état résolu : toujours résoluble.
  let board = [0, 1, 2, 3, 4, 5, 6, 7, 8] // 8 = vide
  let empty = 8
  for (let i = 0; i < 80; i++) {
    const x = empty % 3
    const y = Math.floor(empty / 3)
    const opts = []
    if (x > 0) opts.push(empty - 1)
    if (x < 2) opts.push(empty + 1)
    if (y > 0) opts.push(empty - 3)
    if (y < 2) opts.push(empty + 3)
    const pick = opts[Math.floor(Math.random() * opts.length)]
    ;[board[empty], board[pick]] = [board[pick], board[empty]]
    empty = pick
  }
  return board
}

export default function Taquin({ variant, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [board, setBoard] = useState(shuffleBoard)
  const [moves, setMoves] = useState(0)
  const [previews, setPreviews] = useState(cfg.previews)
  const [previewOn, setPreviewOn] = useState(false)

  const solved = board.every((v, i) => v === i)

  const tap = (i) => {
    const empty = board.indexOf(8)
    const x = i % 3
    const y = Math.floor(i / 3)
    const ex = empty % 3
    const ey = Math.floor(empty / 3)
    if (Math.abs(x - ex) + Math.abs(y - ey) !== 1) return
    const next = [...board]
    ;[next[i], next[empty]] = [next[empty], next[i]]
    setBoard(next)
    const m = moves + 1
    setMoves(m)
    if (next.every((v, j) => v === j)) {
      setTimeout(() => onEnd(m <= 40 ? 'perfect' : 'success'), 350)
    } else if (m === 60 || m === 90) {
      onError() // fait apparaître « Un coup de main ? »
    }
  }

  const showGuide = cfg.watermark || previewOn || assist

  return (
    <div className="game game--taquin">
      <div className="game__status">Plaques déplacées : {moves}</div>
      <div className="taquin__grid">
        {board.map((v, i) => (
          <button
            key={i}
            type="button"
            className={`taquin__cell ${v === 8 ? 'taquin__cell--empty' : ''}`}
            onClick={() => tap(i)}
          >
            {v !== 8 && <span className="taquin__glyph">{SPIRAL[v]}</span>}
            {showGuide && v !== 8 && <span className="taquin__hint">{v + 1}</span>}
          </button>
        ))}
      </div>
      <div className="taquin__tools">
        {previews > 0 && (
          <button
            type="button"
            className="btn btn--small"
            onClick={() => {
              setPreviews((p) => p - 1)
              setPreviewOn(true)
              setTimeout(() => setPreviewOn(false), 5000)
            }}
          >
            Le carnet de Lana ({previews})
          </button>
        )}
        {moves >= 50 && (
          <button type="button" className="btn btn--small" onClick={() => onEnd('fail')}>
            Laisser faire Lana
          </button>
        )}
      </div>
      <div className="game__help">Fais glisser les plaques pour reconstituer la spirale (ordre 1 → 8).</div>
    </div>
  )
}
