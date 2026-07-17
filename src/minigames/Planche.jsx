import React, { useMemo, useRef, useState } from 'react'
import { useTicker, shuffled } from './util.js'

// La planche porteuse (Lo, scène 8).
// Phase 1 : toucher une planche fait trembler celles qui lui sont liées —
// déduire LA planche reliée à toutes. Phase 2 : taper au moment exact (cercle).
const VARIANTS = {
  coeur: { eliminated: 2, linkTime: 1.2, circleSpeed: 0.55 },
  ruse: { eliminated: 0, linkTime: 2.2, circleSpeed: 0.55 },
  det: { eliminated: 0, linkTime: 1.2, circleSpeed: 0.85 },
}

const N = 9

export default function Planche({ variant, paused, assist, onError, onEnd }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const porteuse = useMemo(() => Math.floor(Math.random() * N), [])
  const eliminated = useMemo(() => {
    const others = shuffled(Array.from({ length: N }, (_, i) => i).filter((i) => i !== porteuse))
    return new Set(others.slice(0, cfg.eliminated))
  }, [porteuse, cfg.eliminated])
  const links = useMemo(() => {
    // La porteuse est liée à toutes ; les autres à 2-3 voisines.
    const map = {}
    for (let i = 0; i < N; i++) {
      if (i === porteuse) map[i] = Array.from({ length: N }, (_, j) => j).filter((j) => j !== i)
      else map[i] = shuffled([porteuse, (i + 1) % N, (i + 3) % N].filter((j) => j !== i)).slice(0, 2 + (i % 2))
    }
    return map
  }, [porteuse])

  const [phase, setPhase] = useState(1)
  const [trembling, setTrembling] = useState([])
  const [chosen, setChosen] = useState(null)
  const [circle, setCircle] = useState(1.6)
  const [errors, setErrors] = useState(0)
  const [message, setMessage] = useState('')
  const freeTry = useRef(true)
  const perfect = useRef(true)
  const tremblingTimer = useRef(null)

  useTicker(
    (dt) => {
      if (phase === 2) {
        setCircle((c) => {
          const nc = c - dt * cfg.circleSpeed
          if (nc <= 0) {
            // Trop tard : le cercle repart.
            perfect.current = false
            return 1.6
          }
          return nc
        })
      }
    },
    paused
  )

  const fail = (msg) => {
    setMessage(msg)
    perfect.current = false
    if (freeTry.current) {
      freeTry.current = false
      return
    }
    onError()
    setErrors((e) => {
      const n = e + 1
      if (n >= 3) onEnd('fail')
      return n
    })
  }

  const touchPlank = (i) => {
    if (eliminated.has(i)) return
    if (phase === 1) {
      setTrembling(links[i])
      clearTimeout(tremblingTimer.current)
      tremblingTimer.current = setTimeout(() => setTrembling([]), cfg.linkTime * 1000)
      setChosen(i)
    }
  }

  const strike = () => {
    if (chosen == null) return
    if (phase === 1) {
      if (chosen === porteuse) {
        setPhase(2)
        setMessage('')
      } else {
        fail('Lo : « Celle-là ne porte que sa fierté. Écoute encore. »')
      }
      return
    }
  }

  const tapCircle = () => {
    // Fenêtre : cercle proche de la taille de la planche (0.35–0.55).
    if (circle > 0.32 && circle < 0.58) {
      onEnd(perfect.current && errors === 0 ? 'perfect' : 'success')
    } else {
      fail('Le geste part trop tôt — ou trop tard. On recommence.')
      setCircle(1.6)
    }
  }

  if (phase === 2) {
    return (
      <div className="game game--planche">
        <div className="game__status">Le geste. Erreurs : {errors}/3</div>
        <button type="button" className="planche__target" onClick={tapCircle}>
          <div className="planche__plank planche__plank--chosen" />
          <div
            className="planche__circle"
            style={{ transform: `translate(-50%, -50%) scale(${circle})` }}
          />
        </button>
        {message && <div className="game__msg">{message}</div>}
        <div className="game__help">Tape quand le cercle épouse la planche.</div>
      </div>
    )
  }

  return (
    <div className="game game--planche">
      <div className="game__status">
        L'analyse. Erreurs : {errors}/3
      </div>
      <div className="planche__grid">
        {Array.from({ length: N }, (_, i) => (
          <button
            key={i}
            type="button"
            className={[
              'planche__plank',
              trembling.includes(i) ? 'planche__plank--tremble' : '',
              chosen === i ? 'planche__plank--sel' : '',
              eliminated.has(i) ? 'planche__plank--out' : '',
              assist && i === porteuse ? 'planche__plank--assist' : '',
            ].join(' ')}
            onClick={() => touchPlank(i)}
          />
        ))}
      </div>
      <button type="button" className="btn btn--small" disabled={chosen == null} onClick={strike}>
        C'est celle-là
      </button>
      {message && <div className="game__msg">{message}</div>}
      <div className="game__help">Touche une planche : celles qui bougent avec elle tremblent. Trouve celle qui porte tout.</div>
    </div>
  )
}
