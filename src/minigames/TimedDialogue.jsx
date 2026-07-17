import { useEffect, useRef, useState } from 'react'
import { playNote, playError } from '../engine/soundManager.js'

// Choix chronométrés (Jules, Noélia, Mousquetaires).
// Deux formats :
//  - legacy : { prompt, seconds, options: [{ label, result }] }
//  - manches : { rounds: [{ prompt, seconds, options: [{ label, correct }] }], maxWrong: 1 }
//    → success = tout juste · partial = maxWrong erreurs · fail = au-delà (ou temps écoulé de trop)
export default function TimedDialogue({ config, onEnd }) {
  const rounds = config.rounds ?? [
    {
      prompt: config.prompt,
      seconds: config.seconds ?? 8,
      options: config.options ?? [],
      legacy: true,
    },
  ]
  const maxWrong = config.maxWrong ?? 1

  const [roundIndex, setRoundIndex] = useState(0)
  const [wrong, setWrong] = useState(0)
  const [remaining, setRemaining] = useState(rounds[0].seconds ?? 8)
  const [feedback, setFeedback] = useState(null) // 'ok' | 'ko'
  const doneRef = useRef(false)
  const lockRef = useRef(false)

  const round = rounds[roundIndex]
  const seconds = round.seconds ?? 8

  useEffect(() => {
    lockRef.current = false
    setFeedback(null)
    const start = performance.now()
    setRemaining(seconds)
    const id = setInterval(() => {
      const left = seconds - (performance.now() - start) / 1000
      if (left <= 0) {
        clearInterval(id)
        if (!doneRef.current && !lockRef.current) answer(null) // temps écoulé
      } else {
        setRemaining(left)
      }
    }, 100)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roundIndex])

  const finish = (result) => {
    doneRef.current = true
    setTimeout(() => onEnd(result), 500)
  }

  const answer = (opt) => {
    if (doneRef.current || lockRef.current) return
    lockRef.current = true

    // format legacy : l'option porte directement son résultat
    if (round.legacy && opt) {
      finish(opt.result ?? 'success')
      return
    }
    if (round.legacy && !opt) {
      finish('fail')
      return
    }

    const isCorrect = Boolean(opt?.correct)
    setFeedback(isCorrect ? 'ok' : 'ko')
    if (isCorrect) playNote(660, 0.2)
    else playError()

    const totalWrong = wrong + (isCorrect ? 0 : 1)
    setWrong(totalWrong)

    if (totalWrong > maxWrong) {
      finish('fail')
      return
    }
    if (roundIndex + 1 >= rounds.length) {
      finish(totalWrong === 0 ? 'success' : 'partial')
      return
    }
    setTimeout(() => setRoundIndex(roundIndex + 1), 650)
  }

  return (
    <div className="minigame">
      {config.intro && roundIndex === 0 && (
        <p className="minigame-intro">{config.intro}</p>
      )}
      <div className="timer-bar-track">
        <div
          className={`timer-bar ${remaining / seconds < 0.3 ? 'timer-low' : ''}`}
          style={{ width: `${(remaining / seconds) * 100}%` }}
        />
      </div>
      {rounds.length > 1 && (
        <p className="minigame-hint">
          Question {roundIndex + 1} / {rounds.length} · erreurs : {wrong}/{maxWrong} tolérée{maxWrong > 1 ? 's' : ''}
        </p>
      )}
      <p className="minigame-question">{round.prompt}</p>
      <div className={`choices ${feedback === 'ko' ? 'shake' : ''}`}>
        {(round.options ?? []).map((opt, i) => (
          <button key={i} className="btn btn-choice" onClick={() => answer(opt)}>
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}
