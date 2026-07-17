import React, { useState } from 'react'
import { useGame } from '../store/gameStore.js'
import SettingsPanel from './SettingsPanel.jsx'
import { sfx } from '../engine/soundManager.js'

// Écran titre : le tilleul, le trou, trois notes sifflées. Un bouton (Partie III §8).
export default function TitleScreen() {
  const g = useGame()
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [confirmNew, setConfirmNew] = useState(false)
  const hasSave = !!(g.sceneId || g.completed.length > 0 || g.endingId)

  const start = () => {
    if (g.settings.sound) sfx.mistiflouk()
    if (hasSave) setConfirmNew(true)
    else g.newGame()
  }

  return (
    <div className={`screen title ${g.settings.fontComfort ? 'font-comfort' : ''}`}>
      <div className="title__sky">
        <div className="title__tree">
          <div className="title__leaves" />
          <div className="title__trunk" />
          <div className="title__hole" />
          <div className="title__snake">〜</div>
        </div>
      </div>
      <h1 className="title__name">Mistiflouk</h1>

      <div className="title__actions">
        {hasSave && (
          <button
            type="button"
            className="btn btn--primary btn--big"
            onClick={() => {
              if (g.settings.sound) sfx.mistiflouk()
              g.continueGame()
            }}
          >
            Continuer
            {g.lastHook && <small className="title__hook">« {g.lastHook.slice(0, 90)}{g.lastHook.length > 90 ? '…' : ''} »</small>}
          </button>
        )}
        <button type="button" className={`btn ${hasSave ? '' : 'btn--primary btn--big'}`} onClick={start}>
          {hasSave ? 'Nouvelle partie' : 'Commencer'}
        </button>
        <button type="button" className="btn" onClick={() => setSettingsOpen(true)}>
          Réglages
        </button>
      </div>

      {!g.soundBannerSeen && (
        <button type="button" className="title__soundbanner" onClick={() => g.markSoundBanner()}>
          Ce jeu est plus beau avec le son 🔊
        </button>
      )}

      {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}

      {confirmNew && (
        <div className="overlay" role="dialog">
          <div className="overlay__card">
            <p>Recommencer depuis le début ? La partie en cours sera effacée.</p>
            <button type="button" className="btn btn--primary" onClick={() => g.newGame()}>
              Oui, on recommence
            </button>
            <button type="button" className="btn" onClick={() => setConfirmNew(false)}>
              Non, garder ma partie
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
