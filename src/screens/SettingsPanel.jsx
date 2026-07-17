import React from 'react'
import { useGame } from '../store/gameStore.js'
import { setSoundEnabled } from '../engine/soundManager.js'

const SIZES = ['Petit', 'Normal', 'Grand']
const SPEEDS = ['Lent', 'Normal', 'Rapide', 'Instantané']

// Réglages accessibles dès l'écran titre (Partie III §7).
export default function SettingsPanel({ onClose }) {
  const g = useGame()
  const s = g.settings
  const set = (patch) => {
    g.setSettings(patch)
    if ('sound' in patch) setSoundEnabled(patch.sound)
  }

  return (
    <div className="overlay" role="dialog">
      <div className="overlay__card settings">
        <h2>Réglages</h2>

        <div className="settings__row">
          <span>Taille du texte</span>
          <div className="settings__opts">
            {SIZES.map((label, i) => (
              <button
                key={label}
                type="button"
                className={`btn btn--small ${s.textSize === i ? 'btn--on' : ''}`}
                onClick={() => set({ textSize: i })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings__row">
          <span>Vitesse du texte</span>
          <div className="settings__opts">
            {SPEEDS.map((label, i) => (
              <button
                key={label}
                type="button"
                className={`btn btn--small ${s.textSpeed === i ? 'btn--on' : ''}`}
                onClick={() => set({ textSpeed: i })}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="settings__row">
          <span>Son</span>
          <button type="button" className={`btn btn--small ${s.sound ? 'btn--on' : ''}`} onClick={() => set({ sound: !s.sound })}>
            {s.sound ? 'Activé' : 'Coupé'}
          </button>
        </div>

        <div className="settings__row">
          <span>Vibrations</span>
          <button
            type="button"
            className={`btn btn--small ${s.vibrations ? 'btn--on' : ''}`}
            onClick={() => set({ vibrations: !s.vibrations })}
          >
            {s.vibrations ? 'Activées' : 'Coupées'}
          </button>
        </div>

        <div className="settings__row">
          <span>
            Mode raconté
            <small>Les mini-jeux se résolvent tout seuls, en version racontée — pour jouer à l'histoire en famille.</small>
          </span>
          <button
            type="button"
            className={`btn btn--small ${s.narrated ? 'btn--on' : ''}`}
            onClick={() => set({ narrated: !s.narrated })}
          >
            {s.narrated ? 'Activé' : 'Désactivé'}
          </button>
        </div>

        <div className="settings__row">
          <span>
            Mode daltonien
            <small>Les lueurs de la boule de cristal sont doublées de formes : cercle plein / anneau.</small>
          </span>
          <button
            type="button"
            className={`btn btn--small ${s.daltonien ? 'btn--on' : ''}`}
            onClick={() => set({ daltonien: !s.daltonien })}
          >
            {s.daltonien ? 'Activé' : 'Désactivé'}
          </button>
        </div>

        <div className="settings__row">
          <span>Police confort</span>
          <button
            type="button"
            className={`btn btn--small ${s.fontComfort ? 'btn--on' : ''}`}
            onClick={() => set({ fontComfort: !s.fontComfort })}
          >
            {s.fontComfort ? 'Activée' : 'Pixel'}
          </button>
        </div>

        <button type="button" className="btn btn--primary" onClick={onClose}>
          Fermer
        </button>
      </div>
    </div>
  )
}
