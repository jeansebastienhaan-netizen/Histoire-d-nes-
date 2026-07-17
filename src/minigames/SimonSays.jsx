import { useEffect, useRef, useState } from 'react'
import { playNote, playError, playWin } from '../engine/soundManager.js'

// Séquence à mémoriser (mélodie de Cyril, pas de danse de Lo).
// La séquence s'allonge à chaque manche ; une erreur = une vie perdue.
// config : {
//   intro, pads: [{ label, color }], length: 6, lives: 2, speed: 550
// }
// success = sans erreur · partial = réussi en ayant perdu des vies · fail = plus de vies
const DEFAULT_PADS = [
  { label: '🔴', color: '#c85a4a' },
  { label: '🟡', color: '#e8c56a' },
  { label: '🟢', color: '#7ec8a9' },
  { label: '🔵', color: '#5a9aa0' },
]
const FREQS = [330, 392, 494, 587]

export default function SimonSays({ config, onEnd }) {
  const pads = config.pads ?? DEFAULT_PADS
  const targetLength = config.length ?? 6
  const maxLives = config.lives ?? 2
  const speed = config.speed ?? 550

  const [sequence, setSequence] = useState([])
  const [progress, setProgress] = useState(0) // position du joueur dans la séquence
  const [lit, setLit] = useState(null)
  const [playing, setPlaying] = useState(false) // le jeu montre la séquence
  const [lives, setLives] = useState(maxLives)
  const [started, setStarted] = useState(false)
  const doneRef = useRef(false)
  const timersRef = useRef([])

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }
  useEffect(() => clearTimers, [])

  // Séquence pseudo-aléatoire stable par manche
  const extend = (seq) => [...seq, Math.floor(Math.random() * pads.length)]

  const showSequence = (seq) => {
    setPlaying(true)
    setProgress(0)
    seq.forEach((padIndex, i) => {
      timersRef.current.push(
        setTimeout(() => {
          setLit(padIndex)
          playNote(FREQS[padIndex % FREQS.length], 0.3)
          timersRef.current.push(setTimeout(() => setLit(null), speed * 0.6))
        }, 400 + i * speed)
      )
    })
    timersRef.current.push(
      setTimeout(() => setPlaying(false), 400 + seq.length * speed)
    )
  }

  const start = () => {
    setStarted(true)
    const seq = extend([])
    setSequence(seq)
    showSequence(seq)
  }

  const tapPad = (index) => {
    if (playing || doneRef.current || !started) return
    setLit(index)
    setTimeout(() => setLit(null), 200)
    if (index === sequence[progress]) {
      playNote(FREQS[index % FREQS.length], 0.25)
      const nextProgress = progress + 1
      if (nextProgress < sequence.length) {
        setProgress(nextProgress)
        return
      }
      // manche réussie
      if (sequence.length >= targetLength) {
        doneRef.current = true
        playWin()
        setTimeout(() => onEnd(lives === maxLives ? 'success' : 'partial'), 500)
        return
      }
      const seq = extend(sequence)
      setSequence(seq)
      timersRef.current.push(setTimeout(() => showSequence(seq), 600))
      setPlaying(true)
    } else {
      playError()
      if (navigator.vibrate) navigator.vibrate(120)
      const nextLives = lives - 1
      setLives(nextLives)
      if (nextLives <= 0) {
        doneRef.current = true
        setTimeout(() => onEnd('fail'), 400)
        return
      }
      // on remontre la même séquence
      timersRef.current.push(setTimeout(() => showSequence(sequence), 800))
      setPlaying(true)
    }
  }

  return (
    <div className="minigame">
      {config.intro && <p className="minigame-intro">{config.intro}</p>}
      <div className="simon-status">
        {started ? (
          <>
            <span>Manche {sequence.length} / {targetLength}</span>
            <span>{'❤️'.repeat(lives)}{'🖤'.repeat(maxLives - lives)}</span>
          </>
        ) : (
          <span>Regarde bien, puis répète la séquence…</span>
        )}
      </div>
      <div className="simon-pads">
        {pads.map((pad, i) => (
          <button
            key={i}
            className={`simon-pad ${lit === i ? 'simon-lit' : ''}`}
            style={{ '--pad-color': pad.color }}
            disabled={playing && started}
            onClick={() => tapPad(i)}
          >
            {pad.label}
          </button>
        ))}
      </div>
      {!started && (
        <button className="btn btn-primary" onClick={start}>
          Commencer
        </button>
      )}
      {started && (
        <p className="minigame-hint">
          {playing ? 'Observe…' : `À toi ! (${progress} / ${sequence.length})`}
        </p>
      )}
    </div>
  )
}
