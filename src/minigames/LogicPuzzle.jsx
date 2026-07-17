import { useState } from 'react'

// Déduction (Aloïs, Mamy, Lana).
// config : { intro, question, options: [{ label, correct }], attempts }
// onEnd('success' | 'partial' | 'fail')
export default function LogicPuzzle({ config, onEnd }) {
  const attempts = config.attempts ?? 2
  const [tried, setTried] = useState([]) // index des options déjà tentées

  const choose = (index) => {
    if (tried.includes(index)) return
    if (config.options[index].correct) {
      onEnd(tried.length === 0 ? 'success' : 'partial')
      return
    }
    const nextTried = [...tried, index]
    if (nextTried.length >= attempts) {
      onEnd('fail')
      return
    }
    setTried(nextTried)
  }

  return (
    <div className="minigame">
      {config.intro && <p className="minigame-intro">{config.intro}</p>}
      <p className="minigame-question">{config.question}</p>
      <div className="choices">
        {config.options.map((opt, i) => (
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
        <p className="minigame-hint">Hmm, pas celle-là… Regarde bien les indices.</p>
      )}
    </div>
  )
}
