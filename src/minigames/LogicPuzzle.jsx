import { useState } from 'react'
import { playNote, playError, playWin } from '../engine/soundManager.js'

// Déduction (Lana…). Deux formats :
//  - legacy : { intro, question, options: [{label, correct}], attempts }
//  - manches : { intro, rounds: [{ intro?, question, options }], maxMistakes: 1 }
//    Les énigmes s'enchaînent ; les erreurs se cumulent sur l'ensemble.
// success = zéro erreur · partial = dans la limite · fail = au-delà
export default function LogicPuzzle({ config, onEnd }) {
  const rounds = config.rounds ?? [
    { intro: config.intro, question: config.question, options: config.options },
  ]
  const maxMistakes = config.maxMistakes ?? (config.attempts ? config.attempts - 1 : 1)

  const [roundIndex, setRoundIndex] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [tried, setTried] = useState([])
  const [flash, setFlash] = useState(false)

  const round = rounds[roundIndex]

  const choose = (index) => {
    if (tried.includes(index)) return
    if (round.options[index].correct) {
      playNote(660, 0.25)
      if (roundIndex + 1 >= rounds.length) {
        playWin()
        onEnd(mistakes === 0 ? 'success' : 'partial')
        return
      }
      setRoundIndex(roundIndex + 1)
      setTried([])
      return
    }
    playError()
    setFlash(true)
    setTimeout(() => setFlash(false), 450)
    const total = mistakes + 1
    setMistakes(total)
    if (total > maxMistakes) {
      onEnd('fail')
      return
    }
    setTried([...tried, index])
  }

  return (
    <div className="minigame">
      {round.intro && <p className="minigame-intro">{round.intro}</p>}
      {rounds.length > 1 && (
        <p className="minigame-hint">
          Énigme {roundIndex + 1} / {rounds.length} · erreurs : {mistakes}/{maxMistakes} tolérée{maxMistakes > 1 ? 's' : ''}
        </p>
      )}
      <p className="minigame-question">{round.question}</p>
      <div className={`choices ${flash ? 'shake' : ''}`}>
        {round.options.map((opt, i) => (
          <button
            key={i}
            className={`btn btn-choice ${tried.includes(i) ? 'btn-wrong' : ''}`}
            disabled={tried.includes(i)}
            onClick={() => choose(i)}
          >
            {opt.label}
          </button>
        ))}
      </div>
      {tried.length > 0 && (
        <p className="minigame-hint">Hmm, pas ça… Relis bien l'énigme.</p>
      )}
    </div>
  )
}
