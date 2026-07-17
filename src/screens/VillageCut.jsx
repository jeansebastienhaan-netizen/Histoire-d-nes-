import React, { useState } from 'react'
import { useGame } from '../store/gameStore.js'
import { SCENE_ORDER } from '../data/scenes/index.js'
import { SCENE_CHARACTER, CHARACTERS } from '../data/characters.js'
import Portrait from '../components/Portrait.jsx'
import SettingsPanel from './SettingsPanel.jsx'

// La coupe du village : village en haut, galeries qui se dévoilent en dessous.
// La profondeur atteinte EST la barre de progression (Partie III §6).
export default function VillageCut() {
  const g = useGame()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const done = g.completed
  const depth = done.length / SCENE_ORDER.length
  const allDone = done.length >= SCENE_ORDER.length

  // Silhouettes des personnages convaincus, placées de plus en plus profond.
  const silhouettes = done
    .filter((id) => SCENE_CHARACTER[id])
    .map((id) => ({
      sceneId: id,
      charId: SCENE_CHARACTER[id],
      idx: SCENE_ORDER.indexOf(id),
    }))

  return (
    <div className={`screen cut ${g.settings.fontComfort ? 'font-comfort' : ''}`}>
      <header className="cut__top">
        <h2>Le village, en coupe</h2>
        <button type="button" className="btn btn--small" onClick={() => setSettingsOpen(true)}>
          ⚙
        </button>
      </header>

      <div className="cut__view">
        <div className="cut__surface">
          <div className="cut__tree" />
          <div className="cut__church" />
          <div className="cut__houses" />
        </div>
        <div className="cut__underground">
          <div className="cut__revealed" style={{ height: `${Math.max(6, depth * 100)}%` }} />
          {silhouettes.map((s) => (
            <button
              key={s.sceneId}
              type="button"
              className="cut__silhouette"
              style={{
                top: `${4 + (s.idx / SCENE_ORDER.length) * 88}%`,
                left: `${18 + ((s.idx * 37) % 60)}%`,
              }}
              onClick={() => g.startMemory(s.sceneId)}
              aria-label={`Revoir la scène de ${CHARACTERS[s.charId].name}`}
            >
              <Portrait spec={CHARACTERS[s.charId].portrait} size={34} />
            </button>
          ))}
          {allDone && <div className="cut__lamp" title="La salle ronde">🔥</div>}
        </div>
      </div>

      <div className="cut__bottom">
        {!allDone ? (
          <button type="button" className="btn btn--primary btn--big" onClick={() => g.startNextScene()}>
            Continuer
            {g.lastHook && (
              <small className="title__hook">
                « {g.lastHook.slice(0, 90)}
                {g.lastHook.length > 90 ? '…' : ''} »
              </small>
            )}
          </button>
        ) : (
          <p className="cut__done">L'histoire est finie. Touche une silhouette pour revivre un souvenir.</p>
        )}
        <p className="cut__note">Touche une silhouette pour revoir sa scène (souvenir, sans conséquence).</p>
      </div>

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
