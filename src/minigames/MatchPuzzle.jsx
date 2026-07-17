import { useState } from 'react'
import { playNote, playError, playWin } from '../engine/soundManager.js'

// Association à indices croisés : relier chaque indice à son propriétaire.
// Il faut TOUT associer puis valider — pas de vérification indice par indice.
// config : {
//   intro, itemLabel, ownerLabel,
//   items:  [{ id, text }],            // ex. les ardoises mélangées
//   owners: [{ id, name }],            // ex. les voisins
//   solution: { itemId: ownerId },
//   maxMistakes: 2                     // au-delà (cumulé sur les essais) → fail
// }
// success = tout juste du premier coup · partial = réussi avec erreurs · fail sinon
export default function MatchPuzzle({ config, onEnd }) {
  const items = config.items ?? []
  const owners = config.owners ?? []
  const maxMistakes = config.maxMistakes ?? 2
  const [selected, setSelected] = useState(null) // id d'item en main
  const [pairs, setPairs] = useState({}) // itemId -> ownerId
  const [mistakes, setMistakes] = useState(0)
  const [wrongIds, setWrongIds] = useState([])

  const tapItem = (id) => {
    playNote(520, 0.1)
    setSelected(selected === id ? null : id)
    setWrongIds([])
  }

  const tapOwner = (ownerId) => {
    if (!selected) return
    playNote(620, 0.1)
    setPairs({ ...pairs, [selected]: ownerId })
    setSelected(null)
  }

  const unpair = (itemId) => {
    const next = { ...pairs }
    delete next[itemId]
    setPairs(next)
  }

  const allPaired = items.every((it) => pairs[it.id])

  const submit = () => {
    const wrong = items.filter((it) => pairs[it.id] !== config.solution[it.id])
    if (wrong.length === 0) {
      playWin()
      onEnd(mistakes === 0 ? 'success' : 'partial')
      return
    }
    playError()
    const total = mistakes + wrong.length
    setMistakes(total)
    setWrongIds(wrong.map((w) => w.id))
    // on détache seulement les mauvaises associations, les bonnes restent
    const next = { ...pairs }
    wrong.forEach((w) => delete next[w.id])
    setPairs(next)
    if (total > maxMistakes) onEnd('fail')
  }

  const ownerName = (id) => owners.find((o) => o.id === id)?.name ?? '?'
  const ownerTaken = (ownerId) => Object.values(pairs).includes(ownerId)

  return (
    <div className="minigame">
      {config.intro && <p className="minigame-intro">{config.intro}</p>}
      <div className="match-items">
        {items.map((it) => (
          <button
            key={it.id}
            className={`match-item ${selected === it.id ? 'match-selected' : ''} ${pairs[it.id] ? 'match-paired' : ''} ${wrongIds.includes(it.id) ? 'shake' : ''}`}
            onClick={() => (pairs[it.id] ? unpair(it.id) : tapItem(it.id))}
          >
            <span className="match-item-text">{it.text}</span>
            {pairs[it.id] && <span className="match-tag">→ {ownerName(pairs[it.id])}</span>}
          </button>
        ))}
      </div>
      <div className="match-owners">
        {owners.map((o) => (
          <button
            key={o.id}
            className={`btn match-owner ${ownerTaken(o.id) ? 'match-owner-taken' : ''}`}
            disabled={!selected || ownerTaken(o.id)}
            onClick={() => tapOwner(o.id)}
          >
            {o.name}
          </button>
        ))}
      </div>
      <button className="btn btn-primary" disabled={!allPaired} onClick={submit}>
        Valider les associations
      </button>
      <p className="minigame-hint">
        {selected
          ? 'Choisis à qui appartient cet indice…'
          : `Erreurs : ${mistakes} / ${maxMistakes} tolérées`}
      </p>
    </div>
  )
}
