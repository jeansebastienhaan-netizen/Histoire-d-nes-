import React from 'react'
import { useGame } from '../store/gameStore.js'
import { CHARACTERS } from '../data/characters.js'
import Portrait from '../components/Portrait.jsx'

const ENDING_TITLES = {
  garder: 'Le secret de la famille',
  offrir: 'La fête sous terre',
  refermer: 'Le chemin de Mistiflouk',
}

const CREDITS = [
  'alois',
  'papy',
  'js',
  'mamy',
  'lo',
  'cyril',
  'xavier',
  'manu',
  'oxane',
  'lana',
  'noelia',
  'israel',
  'antipas',
  'maranatha',
  'agapos',
  'jules',
  'mistiflouk',
]

// FIN + générique. L'épilogue s'est joué dans la scène 17.
export default function EndingScreen() {
  const g = useGame()
  return (
    <div className={`screen ending ${g.settings.fontComfort ? 'font-comfort' : ''}`}>
      <div className="ending__glow" />
      <h1 className="ending__fin">FIN</h1>
      <p className="ending__title">{ENDING_TITLES[g.endingId] || ''}</p>
      <div className="ending__credits">
        {CREDITS.map((id) => (
          <div key={id} className="ending__credit">
            <Portrait spec={CHARACTERS[id].portrait} size={36} />
            <span style={{ color: CHARACTERS[id].color }}>{CHARACTERS[id].name}</span>
          </div>
        ))}
      </div>
      <div className="ending__actions">
        <button type="button" className="btn btn--primary" onClick={() => g.goToMap()}>
          Revoir la coupe du village
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            g.resetAll()
          }}
        >
          Recommencer l'histoire
        </button>
      </div>
    </div>
  )
}
