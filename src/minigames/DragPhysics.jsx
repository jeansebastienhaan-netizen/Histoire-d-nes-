import { useRef, useState } from 'react'

// Drag/swipe (Papy, Manu).
// config : { prompt, item = '📦', target = 'Ici !' }
// Glisser l'objet jusqu'à la zone cible. Jamais bloquant : bouton pour revenir plus tard.
// onEnd('success' | 'fail')
export default function DragPhysics({ config, onEnd }) {
  const areaRef = useRef(null)
  const targetRef = useRef(null)
  const [pos, setPos] = useState(null) // null = position de départ
  const [dragging, setDragging] = useState(false)
  const doneRef = useRef(false)

  const move = (e) => {
    if (!dragging || doneRef.current) return
    const rect = areaRef.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  const drop = (e) => {
    if (!dragging || doneRef.current) return
    setDragging(false)
    const t = targetRef.current.getBoundingClientRect()
    if (
      e.clientX >= t.left && e.clientX <= t.right &&
      e.clientY >= t.top && e.clientY <= t.bottom
    ) {
      doneRef.current = true
      if (navigator.vibrate) navigator.vibrate(50)
      onEnd('success')
    }
  }

  return (
    <div className="minigame">
      <p className="minigame-question">{config.prompt ?? 'Fais glisser l’objet jusqu’à la zone.'}</p>
      <div
        className="drag-area"
        ref={areaRef}
        onPointerMove={move}
        onPointerUp={drop}
        onPointerLeave={() => setDragging(false)}
      >
        <div
          className={`drag-item ${dragging ? 'dragging' : ''}`}
          style={pos ? { left: pos.x, top: pos.y, position: 'absolute' } : undefined}
          onPointerDown={(e) => {
            e.target.setPointerCapture?.(e.pointerId)
            setDragging(true)
          }}
        >
          {config.item ?? '📦'}
        </div>
        <div className="drag-target" ref={targetRef}>
          {config.target ?? 'Ici !'}
        </div>
      </div>
      <button className="btn btn-secondary" onClick={() => !doneRef.current && onEnd('fail')}>
        Revenir plus tard
      </button>
    </div>
  )
}
