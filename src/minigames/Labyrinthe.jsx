import React, { useEffect, useMemo, useRef, useState } from 'react'

// Le labyrinthe mémoire (Oxane, scène 12).
// Un chemin s'affiche quelques secondes, puis s'efface : le tracer de mémoire.
// Trois segments (4, 6, 8 embranchements).
const VARIANTS = {
  coeur: { showTime: 8, rewind: true, reperes: true },
  ruse: { showTime: 5, rewind: false, reperes: false },
  det: { showTime: 3, rewind: true, reperes: false },
}

const SEGMENTS = [4, 6, 8]
const GRID = 5
const REPERES = [
  'Oxane : « Là, la pierre qui ressemble à un chat. Enfin, à un chat déçu. »',
  'Oxane : « Le virage de la flaque. Elle est là depuis toujours, on se salue. »',
  "Oxane : « Ici, tu sens le courant d'air ? C'est la salle du goûter, juste au-dessus. »",
]

function makePath(len) {
  // Chemin auto-évitant simple sur grille 5×5, départ en bas à gauche.
  for (let attempt = 0; attempt < 200; attempt++) {
    const path = [[0, GRID - 1]]
    const seen = new Set(['0,' + (GRID - 1)])
    while (path.length < len + 1) {
      const [x, y] = path[path.length - 1]
      const opts = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ].filter(([nx, ny]) => nx >= 0 && ny >= 0 && nx < GRID && ny < GRID && !seen.has(nx + ',' + ny))
      if (!opts.length) break
      const nxt = opts[Math.floor(Math.random() * opts.length)]
      path.push(nxt)
      seen.add(nxt[0] + ',' + nxt[1])
    }
    if (path.length === len + 1) return path
  }
  return [[0, 4], [1, 4], [1, 3], [2, 3], [2, 2]].slice(0, len + 1)
}

export default function Labyrinthe({ variant, paused, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [segment, setSegment] = useState(0)
  const [path, setPath] = useState(() => makePath(SEGMENTS[0]))
  const [showing, setShowing] = useState(true)
  const [traced, setTraced] = useState([[0, GRID - 1]])
  const [errorsTotal, setErrorsTotal] = useState(0)
  const [message, setMessage] = useState(cfg.reperes ? REPERES[0] : '')
  const perfect = useRef(true)
  const freeTry = useRef(true)

  useEffect(() => {
    setShowing(true)
    const t = setTimeout(() => setShowing(false), cfg.showTime * 1000)
    return () => clearTimeout(t)
  }, [segment, cfg.showTime])

  const tapCell = (x, y) => {
    if (showing || paused) return
    const idx = traced.length
    const [ex, ey] = path[idx] || []
    const [lx, ly] = traced[traced.length - 1]
    const adjacent = Math.abs(x - lx) + Math.abs(y - ly) === 1
    if (!adjacent) return
    if (x === ex && y === ey) {
      const nt = [...traced, [x, y]]
      setTraced(nt)
      if (nt.length === path.length) {
        const ns = segment + 1
        if (ns >= SEGMENTS.length) {
          onEnd(perfect.current && errorsTotal === 0 ? 'perfect' : 'success')
          return
        }
        setTimeout(() => {
          setSegment(ns)
          setPath(makePath(SEGMENTS[ns]))
          setTraced([[0, GRID - 1]])
          setMessage(cfg.reperes ? REPERES[ns] : '')
        }, 400)
      }
    } else {
      // Oxane siffle.
      perfect.current = false
      setMessage('Oxane siffle. « Par ici, touriste. »')
      if (!freeTry.current) {
        onError()
        setErrorsTotal((e) => {
          const n = e + 1
          if (n >= 5) onEnd('fail')
          return n
        })
      } else {
        freeTry.current = false
      }
      if (cfg.rewind) setTraced([[0, GRID - 1]])
    }
  }

  const inPath = (x, y) => path.some(([px, py]) => px === x && py === y)
  const inTraced = (x, y) => traced.some(([px, py]) => px === x && py === y)
  const showPath = showing || assist

  return (
    <div className="game game--laby">
      <div className="game__status">
        Segment {segment + 1}/3 · {showing ? 'Mémorise !' : 'Trace de mémoire.'}
      </div>
      <div className="laby__grid">
        {Array.from({ length: GRID * GRID }, (_, i) => {
          const x = i % GRID
          const y = Math.floor(i / GRID)
          const isStart = x === 0 && y === GRID - 1
          const isEnd = path.length && path[path.length - 1][0] === x && path[path.length - 1][1] === y
          return (
            <button
              key={i}
              type="button"
              className={[
                'laby__cell',
                showPath && inPath(x, y) ? 'laby__cell--path' : '',
                inTraced(x, y) ? 'laby__cell--traced' : '',
                isStart ? 'laby__cell--start' : '',
                isEnd ? 'laby__cell--end' : '',
              ].join(' ')}
              onClick={() => tapCell(x, y)}
            />
          )
        })}
      </div>
      {message && <div className="game__msg">{message}</div>}
      <div className="game__help">Pars du coin bas-gauche et rejoins la sortie, case par case.</div>
    </div>
  )
}
