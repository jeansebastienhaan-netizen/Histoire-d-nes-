import React, { useMemo, useRef, useState } from 'react'
import { vibrate, sfx } from '../engine/soundManager.js'

// La vanne coffre-fort (Cyril, scène 9).
// Tourner la molette : au bon angle, vibration + clic. Taper « Cyril frappe » dans la fenêtre.
// Trois crans, sens alterné, fenêtre qui se réduit.
const VARIANTS = {
  coeur: { windows: [22, 18, 14], rust: false, strongHaptic: true },
  ruse: { windows: [18, 14, 12], rust: true, strongHaptic: false },
  det: { windows: [16, 12, 9], rust: false, strongHaptic: false },
}

export default function Coffre({ variant, assist, onError, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const targets = useMemo(() => [60 + Math.random() * 200, 40 + Math.random() * 240, 80 + Math.random() * 180], [])
  const [angle, setAngle] = useState(0)
  const [cran, setCran] = useState(0)
  const [errors, setErrors] = useState(0)
  const [message, setMessage] = useState('')
  const freeTry = useRef(true)
  const perfect = useRef(true)
  const dialRef = useRef(null)
  const lastClick = useRef(false)

  const win = cfg.windows[cran]
  const target = targets[cran]
  const inWindow = Math.abs(((angle - target + 540) % 360) - 180) < win / 2

  if (inWindow && !lastClick.current) {
    lastClick.current = true
    vibrate(cfg.strongHaptic ? 60 : 25, settings)
    if (settings.sound) sfx.click()
  } else if (!inWindow && lastClick.current) {
    lastClick.current = false
  }

  const onMove = (e) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') return
    const rect = dialRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const a = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90
    setAngle((a + 360) % 360)
  }

  const strike = () => {
    if (inWindow) {
      vibrate([40, 30, 80], settings)
      const next = cran + 1
      if (next >= 3) {
        onEnd(perfect.current && errors === 0 ? 'perfect' : 'success')
        return
      }
      setCran(next)
      setMessage(`Un cran saute ! Sens ${next % 2 === 0 ? 'horaire' : 'inverse'}, maintenant.`)
    } else {
      perfect.current = false
      setMessage('Cyril frappe... rien. « Pas encore. Écoute-la. »')
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
  }

  return (
    <div className="game game--coffre">
      <div className="game__status">
        Crans : {cran}/3 · Erreurs : {errors}/3
      </div>
      <div
        className="coffre__dial"
        ref={dialRef}
        onPointerMove={onMove}
        onPointerDown={onMove}
        style={{ touchAction: 'none' }}
      >
        <div className="coffre__wheel" style={{ transform: `rotate(${angle}deg)` }}>
          <div className="coffre__notch" />
        </div>
        {(cfg.rust || assist) && (
          <div
            className="coffre__rust"
            style={{ transform: `rotate(${target}deg) translateY(-46%)`, opacity: inWindow ? 1 : 0.5 }}
          />
        )}
        {inWindow && <div className="coffre__clic">clic</div>}
      </div>
      <button type="button" className="btn btn--primary" onClick={strike}>
        Cyril, frappe !
      </button>
      {message && <div className="game__msg">{message}</div>}
      <div className="game__help">Tourne la molette doucement. Au clic (vibration), fais frapper Cyril.</div>
    </div>
  )
}
