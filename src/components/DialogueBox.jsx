import charactersData from '../data/characters.json'

const NAMES = Object.fromEntries(
  charactersData.characters.map((c) => [c.id, c.name])
)

export default function DialogueBox({ speaker, text, onNext, showNext }) {
  const isCarnet = speaker === 'carnet'
  const name = isCarnet ? 'Le carnet de Mamy' : (NAMES[speaker] ?? speaker)

  return (
    <div className={`dialogue-box ${isCarnet ? 'dialogue-carnet' : ''}`}>
      <div className="dialogue-speaker">{name}</div>
      <p className="dialogue-text">{text}</p>
      {showNext && (
        <button className="btn btn-next" onClick={onNext}>
          Continuer
        </button>
      )}
    </div>
  )
}
