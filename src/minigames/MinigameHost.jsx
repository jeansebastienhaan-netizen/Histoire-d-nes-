import React, { useState, useCallback, useRef } from 'react'
import Mikado from './Mikado.jsx'
import Flamme from './Flamme.jsx'
import Mastermind from './Mastermind.jsx'
import Planche from './Planche.jsx'
import Coffre from './Coffre.jsx'
import Simon from './Simon.jsx'
import Rythme from './Rythme.jsx'
import Labyrinthe from './Labyrinthe.jsx'
import Taquin from './Taquin.jsx'
import Inventaire from './Inventaire.jsx'
import Coordination from './Coordination.jsx'
import Calme from './Calme.jsx'
import { sfx, vibrate } from '../engine/soundManager.js'

const GAMES = {
  mikado: Mikado,
  flamme: Flamme,
  mastermind: Mastermind,
  planche: Planche,
  coffre: Coffre,
  simon: Simon,
  rythme: Rythme,
  labyrinthe: Labyrinthe,
  taquin: Taquin,
  inventaire: Inventaire,
  coordination: Coordination,
  calme: Calme,
}

// Icône de démonstration animée (main fantôme) par famille de geste.
const GESTES = {
  mikado: '👆 maintenir… relâcher',
  flamme: '👆 glisser le halo le long des parois',
  mastermind: '👆 composer, puis proposer',
  planche: '👆 écouter les planches, frapper juste',
  coffre: '👆 tourner doucement… taper au clic',
  simon: '👆 écouter, puis rejouer',
  rythme: '👆 taper quand la note franchit la ligne',
  labyrinthe: '👆 mémoriser, puis tracer',
  taquin: '👆 glisser les plaques',
  inventaire: '👆 glisser, toucher pour pivoter',
  coordination: '👆 tapoter les coins qui penchent',
  calme: '👆 appuyer quand ça gonfle, relâcher quand ça dégonfle',
}

// Hôte commun : consigne + démonstration, pause, indices progressifs
// (« Un coup de main ? » après 2 erreurs), essai gratuit géré par chaque jeu.
export default function MinigameHost({ game, variant, familyMode, hints = [], onEnd, settings }) {
  const Game = GAMES[game]
  const [phase, setPhase] = useState('intro') // intro | play
  const [paused, setPaused] = useState(false)
  const [errors, setErrors] = useState(0)
  const [hintLevel, setHintLevel] = useState(0)
  const [hintOpen, setHintOpen] = useState(false)
  const endedRef = useRef(false)

  const handleError = useCallback(() => {
    setErrors((e) => e + 1)
    if (settings.sound) sfx.soft()
    vibrate(30, settings)
  }, [settings])

  const handleEnd = useCallback(
    (result) => {
      if (endedRef.current) return
      endedRef.current = true
      if (settings.sound && result !== 'fail') sfx.success()
      if (result !== 'fail') vibrate([30, 40, 60], settings)
      onEnd(result)
    },
    [onEnd, settings]
  )

  if (!Game) {
    // Jeu inconnu : on ne bloque jamais le joueur.
    onEnd('success')
    return null
  }

  if (phase === 'intro') {
    return (
      <div className="minigame__intro">
        <div className="minigame__demo">{GESTES[game]}</div>
        <button type="button" className="btn btn--primary" onClick={() => setPhase('play')}>
          Prêt
        </button>
      </div>
    )
  }

  return (
    <div className="minigame">
      <div className="minigame__topbar">
        <button type="button" className="minigame__pause" onClick={() => setPaused(true)} aria-label="Pause">
          ❚❚
        </button>
        {errors >= 2 && hints.length > 0 && (
          <button
            type="button"
            className="minigame__hint"
            onClick={() => {
              setHintOpen(true)
              setHintLevel((h) => Math.min(h + 1, 2))
            }}
          >
            Un coup de main ?
          </button>
        )}
      </div>

      <Game
        variant={variant}
        familyMode={familyMode}
        paused={paused || hintOpen}
        assist={hintLevel >= 2}
        onError={handleError}
        onEnd={handleEnd}
        settings={settings}
      />

      {hintOpen && (
        <div className="overlay" role="dialog">
          <div className="overlay__card">
            <p>{hints[Math.min(hintLevel, hints.length) - 1] || hints[0]}</p>
            <button type="button" className="btn" onClick={() => setHintOpen(false)}>
              Compris
            </button>
          </div>
        </div>
      )}

      {paused && (
        <div className="overlay" role="dialog">
          <div className="overlay__card">
            <p>Pause</p>
            <button type="button" className="btn btn--primary" onClick={() => setPaused(false)}>
              Reprendre
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => {
                setPaused(false)
                setPhase('intro')
              }}
            >
              Revoir la consigne
            </button>
            <button type="button" className="btn" onClick={() => onEnd('quit')}>
              Quitter la scène (on reprendra ici)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
