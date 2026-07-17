import { useGameStore } from '../store/gameStore.js'
import { hasSave } from '../store/save.js'

export default function TitleScreen() {
  const newGame = useGameStore((s) => s.newGame)
  const continueGame = useGameStore((s) => s.continueGame)
  const saveExists = hasSave()

  return (
    <div className="screen title-screen">
      <div className="title-moon" aria-hidden="true">
        <svg viewBox="0 0 120 120" width="110" height="110">
          <circle cx="60" cy="60" r="42" fill="#e8c56a" />
          <circle cx="78" cy="48" r="40" fill="#1a1a2e" />
          <circle cx="24" cy="24" r="2.5" fill="#f5efd8" />
          <circle cx="98" cy="90" r="2" fill="#f5efd8" />
          <circle cx="16" cy="82" r="1.5" fill="#f5efd8" />
        </svg>
      </div>
      <h1 className="title-main">Le Grand Silence</h1>
      <p className="title-tagline">Un village muet, une enquête, treize rencontres.</p>
      <div className="title-buttons">
        {saveExists && (
          <button className="btn btn-primary" onClick={continueGame}>
            Continuer
          </button>
        )}
        <button
          className={`btn ${saveExists ? 'btn-secondary' : 'btn-primary'}`}
          onClick={() => {
            if (saveExists && !window.confirm('Recommencer depuis le début ? La partie en cours sera effacée.'))
              return
            newGame()
          }}
        >
          Nouvelle partie
        </button>
      </div>
    </div>
  )
}
