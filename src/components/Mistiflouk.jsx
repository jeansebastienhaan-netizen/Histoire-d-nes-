import { useState } from 'react'
import { useGameStore } from '../store/gameStore.js'

// Compagnon d'interface : n'apparaît qu'après le chapitre d'Aloïs (flag a_mistiflouk).
// Piste sonore par vibration, avec repli visuel si navigator.vibrate est absent.
export default function Mistiflouk() {
  const hasMistiflouk = useGameStore((s) => s.flags.includes('a_mistiflouk'))
  const [pulsing, setPulsing] = useState(false)

  if (!hasMistiflouk) return null

  const wiggle = () => {
    if (navigator.vibrate) navigator.vibrate([60, 40, 60, 40, 120])
    setPulsing(true)
    setTimeout(() => setPulsing(false), 800)
  }

  return (
    <button
      className={`mistiflouk ${pulsing ? 'mistiflouk-pulse' : ''}`}
      onClick={wiggle}
      aria-label="Mistiflouk, le serpent-sonar"
    >
      <svg viewBox="0 0 48 48" width="40" height="40" aria-hidden="true">
        <path
          d="M8 34 Q14 26 22 30 T38 26 Q42 24 40 19 Q38 14 32 16"
          fill="none"
          stroke="#7ec8a9"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="32" cy="15" r="4.5" fill="#7ec8a9" />
        <circle cx="33.5" cy="14" r="1.2" fill="#1a1a2e" />
      </svg>
    </button>
  )
}
