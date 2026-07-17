import { useGameStore } from '../store/gameStore.js'
import fragmentsData from '../data/fragments.json'
import charactersData from '../data/characters.json'

const NAMES = Object.fromEntries(
  charactersData.characters.map((c) => [c.id, c.name])
)

export default function NotebookScreen() {
  const { fragments, reputation, soundsRestored, goToMap } = useGameStore()

  return (
    <div className="screen notebook-screen">
      <h2 className="notebook-title">Le tableau de mission</h2>

      <section className="notebook-section">
        <h3>Le vœu du village — {fragments.length}/13 éclats rendus</h3>
        <div className="wish-lines">
          {fragmentsData.order.map((id) => {
            const collected = fragments.includes(id)
            const frag = fragmentsData.fragments[id]
            return (
              <div key={id} className={`wish-line ${collected ? 'collected' : ''}`}>
                {collected ? (
                  <>
                    <span className="wish-text">{frag.text}</span>
                    <span className="wish-from">— {NAMES[frag.from] ?? frag.from}</span>
                  </>
                ) : (
                  <span className="wish-missing">· · · · · · · · · ·</span>
                )}
              </div>
            )
          })}
        </div>
      </section>

      <section className="notebook-section">
        <h3>Réputation</h3>
        <div className="reputation">
          <div className="rep-axis">
            <span>❤️ Cœur</span>
            <b>{reputation.coeur}</b>
          </div>
          <div className="rep-axis">
            <span>🦊 Ruse</span>
            <b>{reputation.ruse}</b>
          </div>
          <div className="rep-axis">
            <span>⛰️ Détermination</span>
            <b>{reputation.determination}</b>
          </div>
        </div>
      </section>

      {soundsRestored.length > 0 && (
        <section className="notebook-section">
          <h3>Le chant d'Étincelle</h3>
          <p className="sounds-restored">
            {soundsRestored.length} note{soundsRestored.length > 1 ? 's' : ''} sur 13 —
            chaque éclat ressoudé rend une note à sa chanson.{' '}
            {soundsRestored.length >= 13
              ? 'Le chant est complet !'
              : 'Elle la fredonne, incomplète, dans son cratère.'}
          </p>
        </section>
      )}

      <button className="btn btn-primary" onClick={goToMap}>
        Retour au village
      </button>
    </div>
  )
}
