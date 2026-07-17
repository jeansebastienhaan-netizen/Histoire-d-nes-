import React, { useRef, useState } from 'react'
import { useTicker } from '../minigames/util.js'

// Nœud « hold » : garder le doigt posé sans bouger (le silence de Xavier).
export default function HoldStill({ text, duration, onDone }) {
  const [holding, setHolding] = useState(false)
  const [t, setT] = useState(0)
  const done = useRef(false)

  useTicker((dt) => {
    if (!holding || done.current) return
    setT((x) => {
      const nx = x + dt
      if (nx >= duration && !done.current) {
        done.current = true
        setTimeout(onDone, 200)
      }
      return nx
    })
  }, false)

  return (
    <div
      className="holdstill"
      onPointerDown={() => setHolding(true)}
      onPointerUp={() => {
        setHolding(false)
        if (!done.current) setT(0)
      }}
      onPointerLeave={() => {
        setHolding(false)
        if (!done.current) setT(0)
      }}
      style={{ touchAction: 'none' }}
    >
      <p className="holdstill__text">{text}</p>
      <div className="holdstill__ring">
        <div className="holdstill__fill" style={{ height: `${Math.min(100, (t / duration) * 100)}%` }} />
      </div>
    </div>
  )
}
