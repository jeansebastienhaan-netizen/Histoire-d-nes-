import { useRef, useState } from 'react'
import { playError, playWin } from '../engine/soundManager.js'

// Jeu de précision (la brouette de Papy) : faire glisser l'objet du départ
// à l'arrivée SANS toucher les obstacles. Trois vies.
// config : {
//   intro, item: '🛞', obstacles: [{x,y,r}] (en % de l'aire),
//   start: {x,y}, goal: {x,y,label}, lives: 3
// }
// success = aucune vie perdue · partial = arrivé avec des dégâts · fail = plus de vies
const DEFAULT_OBSTACLES = [
  { x: 30, y: 22, r: 9 }, { x: 68, y: 30, r: 10 }, { x: 22, y: 48, r: 10 },
  { x: 55, y: 55, r: 9 }, { x: 82, y: 60, r: 8 }, { x: 38, y: 74, r: 10 },
  { x: 70, y: 82, r: 9 },
]

export default function SteadyHand({ config, onEnd }) {
  const obstacles = config.obstacles ?? DEFAULT_OBSTACLES
  const start = config.start ?? { x: 12, y: 88 }
  const goal = config.goal ?? { x: 88, y: 10 }
  const maxLives = config.lives ?? 3
  const areaRef = useRef(null)
  const doneRef = useRef(false)
  const hitCooldownRef = useRef(0)
  const [pos, setPos] = useState(start)
  const [dragging, setDragging] = useState(false)
  const [lives, setLives] = useState(maxLives)
  const [flash, setFlash] = useState(null) // index d'obstacle touché

  const toPercent = (e) => {
    const rect = areaRef.current.getBoundingClientRect()
    return {
      x: Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(2, Math.min(98, ((e.clientY - rect.top) / rect.height) * 100)),
    }
  }

  const move = (e) => {
    if (!dragging || doneRef.current) return
    const p = toPercent(e)
    setPos(p)

    // collision avec un semis ?
    const now = performance.now()
    if (now - hitCooldownRef.current > 700) {
      const hit = obstacles.findIndex(
        (o) => Math.hypot(p.x - o.x, (p.y - o.y) * 1.4) < o.r
      )
      if (hit >= 0) {
        hitCooldownRef.current = now
        playError()
        if (navigator.vibrate) navigator.vibrate(80)
        setFlash(hit)
        setTimeout(() => setFlash(null), 400)
        const nextLives = lives - 1
        setLives(nextLives)
        setPos(start) // retour au départ !
        setDragging(false)
        if (nextLives <= 0) {
          doneRef.current = true
          onEnd('fail')
        }
        return
      }
    }

    // arrivée ?
    if (Math.hypot(p.x - goal.x, p.y - goal.y) < 9) {
      doneRef.current = true
      playWin()
      if (navigator.vibrate) navigator.vibrate([40, 30, 80])
      onEnd(lives === maxLives ? 'success' : 'partial')
    }
  }

  return (
    <div className="minigame">
      {config.intro && <p className="minigame-intro">{config.intro}</p>}
      <div
        className="steady-area"
        ref={areaRef}
        onPointerMove={move}
        onPointerUp={() => setDragging(false)}
        onPointerLeave={() => setDragging(false)}
      >
        {obstacles.map((o, i) => (
          <div
            key={i}
            className={`steady-obstacle ${flash === i ? 'steady-hit' : ''}`}
            style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.r * 2}%` }}
          >
            🌱
          </div>
        ))}
        <div className="steady-goal" style={{ left: `${goal.x}%`, top: `${goal.y}%` }}>
          {config.goal?.label ?? '🏁'}
        </div>
        <div
          className={`steady-item ${dragging ? 'dragging' : ''}`}
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          onPointerDown={(e) => {
            e.target.setPointerCapture?.(e.pointerId)
            setDragging(true)
          }}
        >
          {config.item ?? '🛞'}
        </div>
      </div>
      <p className="minigame-hint">
        {'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)} — touche un semis et la brouette repart du départ !
      </p>
      <button className="btn btn-secondary" onClick={() => !doneRef.current && onEnd('fail')}>
        Revenir plus tard
      </button>
    </div>
  )
}
