import { useRef, useState } from 'react'

// Rassemblement d'animaux (Marjo).
// config : { prompt, animals: ['🐐','🪿','🐇'], target }
// Attraper chaque animal et le déposer dans l'enclos. Les animaux non attrapés
// se promènent (animation CSS). Jamais bloquant : bouton pour revenir plus tard.
// onEnd('success' | 'fail')
const START_SPOTS = [
  { x: 18, y: 22 },
  { x: 62, y: 14 },
  { x: 30, y: 55 },
]

export default function AnimalRoundup({ config, onEnd }) {
  const animals = config.animals ?? ['🐐', '🪿', '🐇']
  const areaRef = useRef(null)
  const targetRef = useRef(null)
  const doneRef = useRef(false)
  const [positions, setPositions] = useState(
    animals.map((_, i) => START_SPOTS[i % START_SPOTS.length])
  )
  const [penned, setPenned] = useState(animals.map(() => false))
  const [dragIndex, setDragIndex] = useState(null)

  const move = (e) => {
    if (dragIndex === null || doneRef.current) return
    const rect = areaRef.current.getBoundingClientRect()
    setPositions((pos) =>
      pos.map((p, i) =>
        i === dragIndex
          ? {
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100,
              free: true,
            }
          : p
      )
    )
  }

  const drop = (e) => {
    if (dragIndex === null || doneRef.current) return
    const i = dragIndex
    setDragIndex(null)
    const t = targetRef.current.getBoundingClientRect()
    if (
      e.clientX >= t.left && e.clientX <= t.right &&
      e.clientY >= t.top && e.clientY <= t.bottom
    ) {
      const nextPenned = penned.map((p, j) => (j === i ? true : p))
      setPenned(nextPenned)
      if (navigator.vibrate) navigator.vibrate(40)
      if (nextPenned.every(Boolean)) {
        doneRef.current = true
        setTimeout(() => onEnd('success'), 500)
      }
    }
  }

  const caught = penned.filter(Boolean).length

  return (
    <div className="minigame">
      <p className="minigame-question">{config.prompt ?? 'Ramène les animaux dans l’enclos !'}</p>
      <div
        className="roundup-area"
        ref={areaRef}
        onPointerMove={move}
        onPointerUp={drop}
        onPointerLeave={() => setDragIndex(null)}
      >
        {animals.map((emoji, i) =>
          penned[i] ? null : (
            <div
              key={i}
              className={`roundup-animal ${dragIndex === i ? 'dragging' : positions[i].free ? '' : 'wandering'}`}
              style={{
                left: `${positions[i].x}%`,
                top: `${positions[i].y}%`,
                animationDelay: `${i * 0.7}s`,
              }}
              onPointerDown={(e) => {
                e.target.setPointerCapture?.(e.pointerId)
                setDragIndex(i)
              }}
            >
              {emoji}
            </div>
          )
        )}
        <div className="roundup-pen" ref={targetRef}>
          <span className="roundup-pen-label">{config.target ?? 'L’enclos'}</span>
          <span className="roundup-pen-animals">
            {animals.filter((_, i) => penned[i]).join(' ')}
          </span>
        </div>
      </div>
      <p className="minigame-hint">Ramenés : {caught} / {animals.length}</p>
      <button className="btn btn-secondary" onClick={() => !doneRef.current && onEnd('fail')}>
        Revenir plus tard
      </button>
    </div>
  )
}
