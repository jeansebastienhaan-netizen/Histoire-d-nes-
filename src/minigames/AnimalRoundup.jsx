import { useEffect, useRef, useState } from 'react'
import { playNote, playError, playWin } from '../engine/soundManager.js'

// Rassemblement d'animaux (Marjo) — version maligne : les bêtes SE PROMÈNENT
// toutes seules, et le lapin se téléporte quand on s'approche trop. Chrono !
// config : { prompt, animals: ['🐐','🪿','🐇'], target, seconds: 45 }
// success = tous ramenés dans le temps · fail = temps écoulé (jamais bloquant)
const START_SPOTS = [
  { x: 18, y: 22 },
  { x: 62, y: 14 },
  { x: 30, y: 55 },
]
// personnalité de chaque fugueur : vitesse de balade et esquive
const TEMPERAMENT = [
  { speed: 9, dodge: 0 },   // la chèvre : rapide mais franche
  { speed: 6, dodge: 0 },   // l'oie : tranquille
  { speed: 5, dodge: 22 },  // le lapin : se téléporte si on approche !
]

export default function AnimalRoundup({ config, onEnd }) {
  const animals = config.animals ?? ['🐐', '🪿', '🐇']
  const seconds = config.seconds ?? 45
  const areaRef = useRef(null)
  const targetRef = useRef(null)
  const doneRef = useRef(false)
  const posRef = useRef(animals.map((_, i) => ({ ...START_SPOTS[i % START_SPOTS.length] })))
  const [, forceRender] = useState(0)
  const [penned, setPenned] = useState(animals.map(() => false))
  const [dragIndex, setDragIndex] = useState(null)
  const dragIndexRef = useRef(null)
  const pennedRef = useRef(penned)
  const [remaining, setRemaining] = useState(seconds)

  // Les animaux se promènent tout seuls
  useEffect(() => {
    const id = setInterval(() => {
      if (doneRef.current) return
      posRef.current = posRef.current.map((p, i) => {
        if (pennedRef.current[i] || dragIndexRef.current === i) return p
        const t = TEMPERAMENT[i % TEMPERAMENT.length]
        const nx = p.x + (Math.random() - 0.5) * t.speed * 2
        const ny = p.y + (Math.random() - 0.5) * t.speed * 2
        return {
          x: Math.max(6, Math.min(80, nx)),
          y: Math.max(8, Math.min(60, ny)),
        }
      })
      forceRender((n) => n + 1)
    }, 700)
    return () => clearInterval(id)
  }, [])

  // Chrono
  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      const left = seconds - (performance.now() - start) / 1000
      if (left <= 0) {
        clearInterval(id)
        if (!doneRef.current) {
          doneRef.current = true
          playError()
          onEnd('fail')
        }
      } else {
        setRemaining(left)
      }
    }, 200)
    return () => clearInterval(id)
  }, [seconds, onEnd])

  const grab = (e, i) => {
    if (doneRef.current) return
    const t = TEMPERAMENT[i % TEMPERAMENT.length]
    // le lapin s'échappe une fois sur deux !
    if (t.dodge && Math.random() < 0.5) {
      playNote(880, 0.1)
      posRef.current = posRef.current.map((p, j) =>
        j === i
          ? { x: 6 + Math.random() * 70, y: 8 + Math.random() * 50 }
          : p
      )
      forceRender((n) => n + 1)
      return
    }
    e.target.setPointerCapture?.(e.pointerId)
    dragIndexRef.current = i
    setDragIndex(i)
  }

  const move = (e) => {
    const i = dragIndexRef.current
    if (i === null || doneRef.current) return
    const rect = areaRef.current.getBoundingClientRect()
    posRef.current = posRef.current.map((p, j) =>
      j === i
        ? {
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
          }
        : p
    )
    forceRender((n) => n + 1)
  }

  const drop = (e) => {
    const i = dragIndexRef.current
    if (i === null || doneRef.current) return
    dragIndexRef.current = null
    setDragIndex(null)
    const t = targetRef.current.getBoundingClientRect()
    if (
      e.clientX >= t.left && e.clientX <= t.right &&
      e.clientY >= t.top && e.clientY <= t.bottom
    ) {
      const nextPenned = pennedRef.current.map((p, j) => (j === i ? true : p))
      pennedRef.current = nextPenned
      setPenned(nextPenned)
      playNote(720, 0.2)
      if (navigator.vibrate) navigator.vibrate(40)
      if (nextPenned.every(Boolean)) {
        doneRef.current = true
        playWin()
        setTimeout(() => onEnd('success'), 500)
      }
    }
  }

  const caught = penned.filter(Boolean).length

  return (
    <div className="minigame">
      <p className="minigame-question">{config.prompt ?? 'Ramène les animaux dans l’enclos !'}</p>
      <div className="timer-bar-track">
        <div
          className={`timer-bar ${remaining / seconds < 0.3 ? 'timer-low' : ''}`}
          style={{ width: `${(remaining / seconds) * 100}%` }}
        />
      </div>
      <div
        className="roundup-area"
        ref={areaRef}
        onPointerMove={move}
        onPointerUp={drop}
      >
        {animals.map((emoji, i) =>
          penned[i] ? null : (
            <div
              key={i}
              className={`roundup-animal ${dragIndex === i ? 'dragging' : 'roaming'}`}
              style={{ left: `${posRef.current[i].x}%`, top: `${posRef.current[i].y}%` }}
              onPointerDown={(e) => grab(e, i)}
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
      <p className="minigame-hint">
        Ramenés : {caught} / {animals.length} — méfie-toi du lapin, il se téléporte !
      </p>
    </div>
  )
}
