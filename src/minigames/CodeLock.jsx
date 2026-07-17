import { useState } from 'react'
import { playNote, playError, playWin } from '../engine/soundManager.js'

// Cadenas à code : déduire un code chiffré à partir d'indices en devinette.
// config : { intro, clues: ["…", "…"], code: "304", attempts: 3 }
// success = premier essai · partial = dans la limite · fail = essais épuisés
export default function CodeLock({ config, onEnd }) {
  const code = String(config.code)
  const maxAttempts = config.attempts ?? 3
  const [entry, setEntry] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [shake, setShake] = useState(false)

  const press = (d) => {
    if (entry.length >= code.length) return
    playNote(440 + d * 40, 0.12)
    setEntry(entry + d)
  }

  const erase = () => setEntry(entry.slice(0, -1))

  const submit = () => {
    if (entry.length !== code.length) return
    if (entry === code) {
      playWin()
      onEnd(attempts === 0 ? 'success' : 'partial')
      return
    }
    playError()
    const next = attempts + 1
    setAttempts(next)
    setEntry('')
    setShake(true)
    setTimeout(() => setShake(false), 500)
    if (next >= maxAttempts) onEnd('fail')
  }

  return (
    <div className="minigame">
      {config.intro && <p className="minigame-intro">{config.intro}</p>}
      <div className="codelock-clues">
        {(config.clues ?? []).map((c, i) => (
          <p key={i} className="codelock-clue">🗝️ {c}</p>
        ))}
      </div>
      <div className={`codelock-display ${shake ? 'shake' : ''}`}>
        {Array.from({ length: code.length }, (_, i) => (
          <span key={i} className="codelock-digit">{entry[i] ?? '•'}</span>
        ))}
      </div>
      <div className="codelock-pad">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((d) => (
          <button key={d} className="btn codelock-key" onClick={() => press(String(d))}>
            {d}
          </button>
        ))}
        <button className="btn codelock-key codelock-action" onClick={erase}>⌫</button>
        <button
          className="btn codelock-key codelock-action codelock-ok"
          disabled={entry.length !== code.length}
          onClick={submit}
        >
          ✓
        </button>
      </div>
      <p className="minigame-hint">
        Essais restants : {maxAttempts - attempts}
      </p>
    </div>
  )
}
