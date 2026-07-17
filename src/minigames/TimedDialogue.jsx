import { useEffect, useRef, useState } from 'react'

// Choix chronométrés (Jules, Oxane, Noélia, Mousquetaires).
// config : { prompt, seconds = 8, options: [{ label, result }] }
//   result ∈ 'success' | 'partial' | 'fail'
// Le temps écoulé sans réponse vaut 'fail' (jamais bloquant côté données : onFail relance).
export default function TimedDialogue({ config, onEnd }) {
  const seconds = config.seconds ?? 8
  const [remaining, setRemaining] = useState(seconds)
  const doneRef = useRef(false)

  useEffect(() => {
    const start = performance.now()
    const id = setInterval(() => {
      const left = seconds - (performance.now() - start) / 1000
      if (left <= 0) {
        clearInterval(id)
        if (!doneRef.current) {
          doneRef.current = true
          onEnd('fail')
        }
      } else {
        setRemaining(left)
      }
    }, 100)
    return () => clearInterval(id)
  }, [seconds, onEnd])

  const choose = (opt) => {
    if (doneRef.current) return
    doneRef.current = true
    onEnd(opt.result ?? 'success')
  }

  return (
    <div className="minigame">
      <div className="timer-bar-track">
        <div
          className="timer-bar"
          style={{ width: `${(remaining / seconds) * 100}%` }}
        />
      </div>
      <p className="minigame-question">{config.prompt}</p>
      <div className="choices">
        {(config.options ?? []).map((opt, i) => (
          <button key={i} className="btn btn-choice" onClick={() => choose(opt)}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
