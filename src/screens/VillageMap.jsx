import { useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { getChapterForCharacter } from '../data/chapters/index.js'
import charactersData from '../data/characters.json'
import fragmentsData from '../data/fragments.json'
import Mistiflouk from '../components/Mistiflouk.jsx'

const { characters } = charactersData

function zoneStatus(character, state) {
  if (state.completedChapters.includes(character.chapter)) return 'done'
  if (character.chapter <= state.currentChapter) return 'open'
  return 'locked'
}

export default function VillageMap() {
  const state = useGameStore()
  const [toast, setToast] = useState(null)

  const tapZone = (character) => {
    const status = zoneStatus(character, state)
    if (status === 'locked') {
      setToast('Cette porte est encore fermée… Continue l’enquête !')
      setTimeout(() => setToast(null), 2200)
      return
    }
    if (status === 'done') {
      setToast(`${character.name} te salue de la main. Le bruit est revenu ici.`)
      setTimeout(() => setToast(null), 2200)
      return
    }
    if (!getChapterForCharacter(character.id)) {
      setToast('Ce chapitre est encore en train de s’écrire dans le carnet…')
      setTimeout(() => setToast(null), 2200)
      return
    }
    state.startEncounter(character.id)
  }

  return (
    <div className="screen map-screen">
      <header className="map-header">
        <h2 className="map-title">Le village</h2>
        <button className="btn btn-small" onClick={state.openNotebook}>
          Carnet · {state.fragments.length}/{fragmentsData.order.length}
        </button>
      </header>

      <svg className="map-svg" viewBox="0 0 100 110" role="img" aria-label="Carte du village">
        {/* ciel et sol */}
        <rect x="0" y="0" width="100" height="110" fill="#16162a" />
        <circle cx="82" cy="12" r="6" fill="#e8c56a" opacity="0.9" />
        <circle cx="20" cy="8" r="0.7" fill="#f5efd8" />
        <circle cx="35" cy="14" r="0.5" fill="#f5efd8" />
        <circle cx="60" cy="6" r="0.6" fill="#f5efd8" />
        <path d="M0 95 Q25 88 50 93 T100 92 L100 110 L0 110 Z" fill="#20203a" />
        {/* chemin */}
        <path
          d="M50 108 Q45 85 50 70 Q55 55 40 45 Q28 38 32 26"
          fill="none"
          stroke="#2c2c4a"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {characters.map((c) => {
          const status = zoneStatus(c, state)
          return (
            <g
              key={c.id}
              className={`zone zone-${status}`}
              transform={`translate(${c.zone.x}, ${c.zone.y})`}
              onClick={() => tapZone(c)}
              role="button"
              aria-label={`${c.name} — ${c.place}`}
            >
              {/* zone tactile généreuse (~44px rendus) */}
              <circle r="7.5" fill="transparent" />
              {/* maison */}
              <rect x="-4" y="-2.5" width="8" height="6" rx="0.8" className="zone-house" />
              <path d="M-5 -2.5 L0 -7 L5 -2.5 Z" className="zone-roof" />
              {status === 'done' && (
                <circle cx="0" cy="0.5" r="1.4" fill="#e8c56a" className="zone-window-lit" />
              )}
              {status === 'locked' && (
                <text x="0" y="1.8" textAnchor="middle" fontSize="3.6" fill="#7a7a99">🔒</text>
              )}
              <text x="0" y="7.6" textAnchor="middle" fontSize="3" className="zone-label">
                {c.name}
              </text>
            </g>
          )
        })}
      </svg>

      {toast && <div className="toast">{toast}</div>}
      <Mistiflouk />
    </div>
  )
}
