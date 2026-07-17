import { useEffect, useState } from 'react'
import Avatar from './Avatar.jsx'
import charactersData from '../data/characters.json'

const NAMES = Object.fromEntries(
  charactersData.characters.map((c) => [c.id, c.name])
)

export default function DialogueBox({ speaker, text, onNext, showNext }) {
  const isCarnet = speaker === 'carnet'
  const name = isCarnet ? 'Le carnet de Mamy' : (NAMES[speaker] ?? speaker)

  // effet machine à écrire — un tap sur le texte l'affiche en entier
  const [shown, setShown] = useState(0)
  useEffect(() => {
    setShown(0)
    const id = setInterval(() => {
      setShown((s) => {
        if (s >= text.length) {
          clearInterval(id)
          return s
        }
        return s + 2
      })
    }, 22)
    return () => clearInterval(id)
  }, [text])
  const done = shown >= text.length

  return (
    <div
      className={`dialogue-box ${isCarnet ? 'dialogue-carnet' : ''}`}
      onClick={() => !done && setShown(text.length)}
    >
      <div className="dialogue-header">
        <Avatar id={speaker} size={44} />
        <div className="dialogue-speaker">{name}</div>
      </div>
      <p className="dialogue-text">
        {text.slice(0, shown)}
        {!done && <span className="type-cursor">▍</span>}
      </p>
      {showNext && (
        <button className={`btn btn-next ${done ? 'btn-pulse' : ''}`} onClick={onNext}>
          Continuer
        </button>
      )}
    </div>
  )
}
