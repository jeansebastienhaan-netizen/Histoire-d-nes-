import { useGameStore } from '../store/gameStore.js'
import { hasSave } from '../store/save.js'
import Avatar from '../components/Avatar.jsx'

export default function TitleScreen() {
  const newGame = useGameStore((s) => s.newGame)
  const continueGame = useGameStore((s) => s.continueGame)
  const saveExists = hasSave()

  return (
    <div className="screen title-screen">
      {/* la nuit sur le village */}
      <svg className="title-scene" viewBox="0 0 100 64" aria-hidden="true">
        <defs>
          <linearGradient id="titlesky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0e0e26" />
            <stop offset="1" stopColor="#2a2a4c" />
          </linearGradient>
        </defs>
        <rect width="100" height="64" fill="url(#titlesky)" />
        <circle cx="76" cy="14" r="8" fill="#e8c56a" className="floaty" />
        {[[10, 8, 0.7], [24, 16, 0.5], [40, 6, 0.6], [56, 14, 0.45], [90, 26, 0.5], [6, 28, 0.45], [66, 24, 0.4]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#f5efd8" className="twinkle" style={{ animationDelay: `${i * 0.5}s` }} />
        ))}
        {/* silhouette du village endormi */}
        <path d="M0 52 L0 44 L8 44 L8 38 L12 34 L16 38 L16 46 L24 46 L24 36 L30 30 L36 36 L36 46 L44 46 L44 40 L48 40 L48 34 L52 30 L56 34 L56 46 L64 46 L64 38 L70 38 L70 42 L78 42 L78 36 L84 30 L90 36 L90 46 L100 46 L100 52 Z" fill="#1c1c34" />
        {/* trois fenêtres encore allumées */}
        <rect x="28" y="38" width="2.4" height="2.4" fill="#e8c56a" className="twinkle" />
        <rect x="52" y="38" width="2.2" height="2.2" fill="#e8c56a" className="twinkle" style={{ animationDelay: '1s' }} />
        <rect x="83" y="38" width="2.2" height="2.2" fill="#e8c56a" className="twinkle" style={{ animationDelay: '2s' }} />
        <path d="M0 64 L0 54 Q30 48 60 53 T100 52 L100 64 Z" fill="#16162c" />
      </svg>

      <h1 className="title-main">Le Grand Silence</h1>
      <p className="title-tagline">Un village muet, une enquête, treize rencontres.</p>

      <div className="title-cast">
        {['mamy', 'alois', 'marjo', 'mousquetaires'].map((id, i) => (
          <div key={id} className="title-cast-item floaty" style={{ animationDelay: `${i * 0.5}s` }}>
            <Avatar id={id} size={52} />
          </div>
        ))}
        <div className="title-cast-item floaty" style={{ animationDelay: '2s' }}>
          <Avatar id="mistiflouk" size={52} />
        </div>
      </div>

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
