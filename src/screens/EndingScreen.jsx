import { useGameStore } from '../store/gameStore.js'

// Les 7 fins et les épilogues individuels arrivent au dernier sprint
// (voir GAME_DESIGN.md). Écran réservé pour l'instant.
export default function EndingScreen() {
  const goToMap = useGameStore((s) => s.goToMap)

  return (
    <div className="screen ending-screen">
      <h2 className="notebook-title">La fin de l'histoire</h2>
      <p className="dialogue-text">
        Le dernier chapitre du carnet n'est pas encore écrit…
      </p>
      <button className="btn btn-primary" onClick={goToMap}>
        Retour au village
      </button>
    </div>
  )
}
