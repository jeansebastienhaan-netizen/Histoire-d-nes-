import React, { useRef, useState } from 'react'
import { sfx } from '../engine/soundManager.js'
import { useTicker } from './util.js'

// Le jeu du calme (Jules, scène 16) — cohérence cardiaque.
// Appuyer quand le cercle gonfle, relâcher quand il dégonfle. NE PEUT PAS ÉCHOUER :
// si le rythme se perd, Jules s'arrête, les trois notes l'encouragent, et ça repart.
const VARIANTS = {
  coeur: { voice: true, lamp: false, stabilize: 1.6 },
  ruse: { voice: false, lamp: true, stabilize: 1.2 },
  det: { voice: false, lamp: false, stabilize: 1.2 },
}

const VOICES = ['Aloïs : « Je suis là. »', 'Aloïs : « Tu avances super bien. »', 'Aloïs : « On respire. Ensemble. »']
const JULES = ["Jules : « D'accord d'accord d'accord. »", 'Jules : « ...d\'accord. »']
const BREATH = 4 // secondes par phase (gonfle / dégonfle)

export default function Calme({ variant, paused, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [t, setT] = useState(0)
  const [pressing, setPressing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [scare, setScare] = useState(false)
  const [halted, setHalted] = useState(false)
  const [message, setMessage] = useState('')
  const desync = useRef(0)
  const scares = useRef([0.25, 0.55, 0.8])
  const msgTimer = useRef(6)

  useTicker(
    (dt) => {
      const speed = scare ? 2.6 : 1
      setT((x) => (x + dt * speed) % (BREATH * 2))
      const inflating = t % (BREATH * 2) < BREATH
      const inSync = pressing === inflating
      if (halted) {
        // Jules recroquevillé : les trois notes sifflent, puis ça repart.
        return
      }
      if (inSync) {
        desync.current = Math.max(0, desync.current - dt * cfg.stabilize)
        if (scare && desync.current === 0) setScare(false)
        setProgress((p) => {
          const np = p + dt / 45
          if (np >= 1) {
            onEnd('success')
            return 1
          }
          // Trois moments effrayants.
          if (scares.current.length && np >= scares.current[0]) {
            scares.current.shift()
            setScare(true)
            setMessage('Un bruit. Un frôlement. Le noir qui bouge. On raccompagne le cercle, tout doucement.')
          }
          return np
        })
      } else {
        desync.current += dt
        if (desync.current > 5) {
          setHalted(true)
          setMessage("Jules s'arrête, se recroqueville... et de l'autre côté, les trois notes sifflent, tout près, comme un encouragement.")
          if (settings.sound) sfx.mistifloukFaible()
          setTimeout(() => {
            desync.current = 0
            setScare(false)
            setHalted(false)
            setMessage('Le cercle repart.')
          }, 2600)
        }
      }
      msgTimer.current -= dt
      if (msgTimer.current <= 0 && !scare && !halted) {
        msgTimer.current = 7 + Math.random() * 4
        if (cfg.voice) setMessage(VOICES[Math.floor(Math.random() * VOICES.length)])
        else if (variant === 'det') setMessage(JULES[Math.floor(Math.random() * JULES.length)])
      }
    },
    paused
  )

  const phase = t % (BREATH * 2)
  const inflating = phase < BREATH
  const scale = inflating ? 0.5 + (phase / BREATH) * 0.5 : 1 - ((phase - BREATH) / BREATH) * 0.5

  return (
    <div
      className="game game--calme"
      onPointerDown={() => setPressing(true)}
      onPointerUp={() => setPressing(false)}
      onPointerLeave={() => setPressing(false)}
      style={{ touchAction: 'none' }}
    >
      <div className="calme__dark">
        <div
          className={`calme__circle ${scare ? 'calme__circle--scare' : ''} ${cfg.lamp ? 'calme__circle--lamp' : ''}`}
          style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
        />
        <div className="calme__jules">🧒</div>
        <div className="calme__progress" style={{ width: `${progress * 100}%` }} />
      </div>
      {message && <div className="game__msg game__msg--calme">{message}</div>}
      <div className="game__help">
        {inflating ? 'Le cercle gonfle : appuie...' : 'Il dégonfle : relâche...'} Respire avec Jules.
      </div>
    </div>
  )
}
