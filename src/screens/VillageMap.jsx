import { useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { getChapterForCharacter } from '../data/chapters/index.js'
import charactersData from '../data/characters.json'
import fragmentsData from '../data/fragments.json'
import Mistiflouk from '../components/Mistiflouk.jsx'

const { characters } = charactersData
const HERO_HOME = { x: 50, y: 106 }

function zoneStatus(character, state) {
  if (state.completedChapters.includes(character.chapter)) return 'done'
  if (character.chapter <= state.currentChapter) return 'open'
  return 'locked'
}

/* ---------- bâtiments : une silhouette différente par lieu ---------- */

const Window = ({ x = -1.5, y = -1, lit }) => (
  <rect x={x} y={y} width="3" height="3" rx="0.6" fill={lit ? '#e8c56a' : '#252540'}
    className={lit ? 'zone-window-lit' : ''} />
)

const BUILDINGS = {
  mamy: ({ lit }) => (
    <>
      {/* cottage à cheminée fumante, sous son tilleul */}
      <circle cx="-7.5" cy="-8" r="4.6" fill="#3c5230" />
      <line x1="-7.5" y1="-4" x2="-7.5" y2="1" stroke="#4a3422" strokeWidth="1.2" />
      <rect x="-4" y="-4" width="11" height="8" rx="1" fill="#8a6a52" />
      <path d="M-5.4 -4 L1.5 -10 L8.4 -4 Z" fill="#b04a3a" />
      <rect x="4" y="-9" width="2.2" height="4" fill="#6a4a3a" />
      {lit && <path d="M5 -10 q-1 -2 0.5 -3.5" stroke="#d8d3c8" strokeWidth="0.8" fill="none" className="smoke" />}
      <Window x={-2} y={-2} lit={lit} />
      <rect x="3" y="-1" width="2.6" height="5" rx="0.5" fill="#4a3020" />
    </>
  ),
  alois: ({ lit }) => (
    <>
      {/* haute maison au grenier à lucarne ronde */}
      <rect x="-5" y="-6" width="10" height="10" rx="0.8" fill="#7a6248" />
      <path d="M-6.5 -6 L0 -13 L6.5 -6 Z" fill="#5a4632" />
      <circle cx="0" cy="-8" r="1.7" fill={lit ? '#e8c56a' : '#252540'} className={lit ? 'zone-window-lit' : ''} />
      <Window x={-3.4} y={-3} lit={false} />
      <Window x={0.8} y={-3} lit={lit} />
      <rect x="-1.2" y="0" width="2.6" height="4" rx="0.5" fill="#3c2c1c" />
    </>
  ),
  xavier: ({ lit }) => (
    <>
      {/* atelier : appentis + scie enseigne */}
      <rect x="-7" y="-5" width="14" height="9" rx="0.8" fill="#6a5a44" />
      <path d="M-8 -5 L-8 -8 L8 -11 L8 -5 Z" fill="#4a3e30" />
      <rect x="-5.5" y="-2.5" width="5" height="6.5" fill="#3c3226" />
      <path d="M2 -3 L6.5 -3 L6.5 -1.4 Q4 -0.4 2 -1.4 Z" fill="#9aa0b0" />
      <Window x={2} y={-4.8} lit={lit} />
    </>
  ),
  papy: ({ lit }) => (
    <>
      {/* potager : cabane, rangs et citrouille */}
      <rect x="-7.5" y="-4" width="7" height="8" fill="#5a4632" />
      <path d="M-8.5 -4 L-4 -8.5 L0.5 -4 Z" fill="#6a4a2e" />
      <Window x={-5.4} y={-2} lit={lit} />
      <path d="M1 1.5 h7 M1 3.5 h7" stroke="#2c381f" strokeWidth="1.2" />
      <ellipse cx="5" cy="-1" rx="2.6" ry="2" fill="#c8641e" />
      <path d="M5 -3 q-0.6 -1.4 1 -1.8" stroke="#4a6a2e" strokeWidth="0.8" fill="none" />
    </>
  ),
  jules: () => (
    <>
      {/* terrain de jeux : cage de but + ballon */}
      <path d="M-7 3 L-7 -5 L3 -5 L3 3" stroke="#d8d3c8" strokeWidth="1" fill="none" />
      <path d="M-6 -4 L2 2 M2 -4 L-6 2" stroke="#d8d3c8" strokeWidth="0.4" opacity="0.7" />
      <circle cx="6" cy="1.6" r="2.2" fill="#f0f0f5" />
      <path d="M6 -0.6 L7 1.4 L6 3.4 L5 1.4 Z" stroke="#2b2b3d" strokeWidth="0.5" fill="none" />
    </>
  ),
  oxane: ({ lit }) => (
    <>
      {/* bibliothèque : fronton + livre ouvert en enseigne */}
      <rect x="-6" y="-5" width="12" height="9" rx="0.8" fill="#6a5a7a" />
      <path d="M-7.5 -5 L0 -9.5 L7.5 -5 Z" fill="#524668" />
      <path d="M-3 -7.2 Q-1.5 -8.4 0 -7.2 Q1.5 -8.4 3 -7.2 L3 -5.6 Q1.5 -6.8 0 -5.6 Q-1.5 -6.8 -3 -5.6 Z" fill="#f5efd8" />
      <Window x={-4} y={-3} lit={lit} />
      <Window x={1} y={-3} lit={false} />
      <rect x="-1.2" y="0" width="2.6" height="4" rx="0.5" fill="#38304a" />
    </>
  ),
  cyril: ({ lit }) => (
    <>
      {/* salle de musique : note en enseigne */}
      <rect x="-6" y="-5" width="12" height="9" rx="0.8" fill="#5c4a6a" />
      <path d="M-7 -5 L0 -10 L7 -5 Z" fill="#463854" />
      <circle cx="4.6" cy="-7" r="1.2" fill="#e8c56a" />
      <rect x="5.4" y="-11.4" width="0.7" height="4.6" fill="#e8c56a" />
      <Window x={-4} y={-3} lit={lit} />
      <rect x="0.4" y="-1" width="2.8" height="5" rx="0.5" fill="#38304a" />
    </>
  ),
  manu: ({ lit }) => (
    <>
      {/* garage : grande porte rayée */}
      <rect x="-7" y="-6" width="14" height="10" rx="0.8" fill="#5a626a" />
      <path d="M-8 -6 L0 -9.5 L8 -6 Z" fill="#464e56" />
      <rect x="-5" y="-3.4" width="8" height="7.4" rx="0.6" fill={lit ? '#e8c56a' : '#30363e'} opacity={lit ? 0.9 : 1} />
      <path d="M-5 -1.6 h8 M-5 0.4 h8 M-5 2.4 h8" stroke="#464e56" strokeWidth="0.7" />
      <circle cx="5.4" cy="0" r="1" fill="#b04a3a" />
    </>
  ),
  noelia: ({ lit }) => (
    <>
      {/* étal de marché : auvent rayé */}
      <rect x="-6.5" y="-1" width="13" height="2" fill="#8a6a3d" />
      <rect x="-5.8" y="1" width="1.4" height="3.4" fill="#6a4a2e" />
      <rect x="4.4" y="1" width="1.4" height="3.4" fill="#6a4a2e" />
      <path d="M-8 -5.5 L8 -5.5 L7 -1.5 L-7 -1.5 Z" fill="#f5efd8" />
      {[-8, -4.4, -0.8, 2.8, 6.4].map((x, i) => (
        <path key={i} d={`M${x} -5.5 L${x + 1.8} -5.5 L${x + 1.65} -1.5 L${x - 0.15} -1.5 Z`} fill="#c85a4a" />
      ))}
      {lit && <circle cx="0" cy="-3.4" r="0.9" fill="#e8c56a" className="zone-window-lit" />}
    </>
  ),
  lo: () => (
    <>
      {/* bord de rivière : pierres plates + roseaux */}
      <path d="M-9 2 Q0 -1 9 2 Q0 5 -9 2" fill="#2e5a66" />
      <ellipse cx="-3" cy="1.6" rx="2.4" ry="1" fill="#6a6a7a" />
      <ellipse cx="2.5" cy="2.6" rx="2" ry="0.9" fill="#6a6a7a" />
      <g className="sway">
        <line x1="-7" y1="1" x2="-7" y2="-5" stroke="#4a6a3c" strokeWidth="0.8" />
        <ellipse cx="-7" cy="-5.6" rx="0.8" ry="1.8" fill="#6a4a2e" />
      </g>
      <g className="sway">
        <line x1="7" y1="1.4" x2="7" y2="-4" stroke="#4a6a3c" strokeWidth="0.8" />
        <ellipse cx="7" cy="-4.6" rx="0.7" ry="1.5" fill="#6a4a2e" />
      </g>
    </>
  ),
  lana: ({ lit }) => (
    <>
      {/* observatoire : coupole fendue */}
      <rect x="-5" y="-2" width="10" height="6" rx="0.8" fill="#4a4a62" />
      <path d="M-5 -2 Q-5 -9 0 -9 Q5 -9 5 -2 Z" fill="#5c5c78" />
      <path d="M-0.8 -8.8 L1.4 -2 L3 -2 L1 -9 Z" fill={lit ? '#e8c56a' : '#2b2b44'} className={lit ? 'zone-window-lit' : ''} />
      <rect x="-1.2" y="0.5" width="2.4" height="3.5" rx="0.5" fill="#33334c" />
    </>
  ),
  marjo: ({ lit }) => (
    <>
      {/* ménagerie : grange rouge + barrière */}
      <rect x="-7" y="-5" width="9" height="9" fill="#8c4632" />
      <path d="M-8.2 -5 L-2.5 -9.5 L3.2 -5 Z" fill="#6a3424" />
      <rect x="-4.6" y="-1.5" width="3.4" height="5.5" fill="#4a2418" />
      <path d="M-4.6 -1.5 L-1.2 4 M-1.2 -1.5 L-4.6 4" stroke="#c8a45a" strokeWidth="0.5" />
      <Window x={-3.6} y={-7} lit={lit} />
      <g stroke="#8a6a3d" strokeWidth="0.8">
        <line x1="3" y1="0.5" x2="9" y2="0.5" />
        <line x1="3" y1="2.5" x2="9" y2="2.5" />
        <line x1="4" y1="-1" x2="4" y2="4" />
        <line x1="8" y1="-1" x2="8" y2="4" />
      </g>
    </>
  ),
  mousquetaires: ({ lit }) => (
    <>
      {/* cabane perchée dans le grand chêne */}
      <line x1="0" y1="4" x2="0" y2="-4" stroke="#4a3422" strokeWidth="2.2" />
      <circle cx="-4" cy="-7" r="3.8" fill="#3c5230" />
      <circle cx="3" cy="-9" r="4.6" fill="#46603a" />
      <circle cx="6" cy="-5" r="3.2" fill="#3c5230" />
      <rect x="-4" y="-6" width="8" height="5" rx="0.8" fill="#7a5a3a" />
      <path d="M-5 -6 L0 -9.5 L5 -6 Z" fill="#8c6a42" />
      <Window x={-1.2} y={-4.8} lit={lit} />
      <path d="M4.5 -9.5 L7.5 -8.8 L4.5 -8 Z" fill="#b04a3a" className="sway" />
    </>
  ),
}

/* ---------- le héros qui se promène ---------- */

function Hero({ pos, walking, facing }) {
  return (
    <g
      className="hero"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: walking ? `transform ${walking.duration}s linear` : 'none',
      }}
    >
      <g transform={`scale(${facing} 1)`}>
        <g className={walking ? 'hero-bob' : ''}>
        <ellipse cx="0" cy="4.6" rx="2.6" ry="0.8" fill="#12121f" opacity="0.4" />
        {/* jambes */}
        <line x1="-0.9" y1="1.6" x2="-1.2" y2="4.4" stroke="#3d3d5c" strokeWidth="1.3" strokeLinecap="round" />
        <line x1="0.9" y1="1.6" x2="1.2" y2="4.4" stroke="#3d3d5c" strokeWidth="1.3" strokeLinecap="round" />
        {/* corps + sacoche */}
        <rect x="-2" y="-1.6" width="4" height="3.8" rx="1.6" fill="#c8843c" />
        <line x1="-1.8" y1="-1" x2="1.8" y2="1.6" stroke="#7a5a3a" strokeWidth="0.9" />
        <rect x="1" y="0.8" width="2.2" height="1.8" rx="0.5" fill="#7a5a3a" />
        {/* tête + casquette */}
        <circle cx="0" cy="-3.6" r="2.4" fill="#e8b98a" />
        <path d="M-2.4 -4.4 Q-2.2 -6.6 0 -6.6 Q2.2 -6.6 2.4 -4.4 Z" fill="#3d6a4a" />
        <path d="M2.2 -4.8 L4 -4.5 L2.3 -3.9 Z" fill="#3d6a4a" />
        <circle cx="0.9" cy="-3.4" r="0.4" fill="#2b2b3d" />
        </g>
      </g>
    </g>
  )
}

/* ---------- la carte ---------- */

export default function VillageMap() {
  const state = useGameStore()
  const [toast, setToast] = useState(null)
  const [heroPos, setHeroPos] = useState(HERO_HOME)
  const [walking, setWalking] = useState(null) // { duration }
  const [facing, setFacing] = useState(1)
  const arrivalRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  const walkTo = (x, y, onArrive) => {
    if (walking) return
    const dist = Math.hypot(x - heroPos.x, y - heroPos.y)
    if (dist < 2) {
      onArrive?.()
      return
    }
    setFacing(x >= heroPos.x ? 1 : -1)
    const duration = Math.max(0.4, dist * 0.045)
    arrivalRef.current = onArrive
    setWalking({ duration })
    setHeroPos({ x, y })
  }

  const heroArrived = () => {
    setWalking(null)
    const action = arrivalRef.current
    arrivalRef.current = null
    action?.()
  }

  const tapZone = (character) => {
    const status = zoneStatus(character, state)
    if (status === 'locked') {
      showToast('Cette porte est encore fermée… Continue l’enquête !')
      return
    }
    const dest = { x: character.zone.x, y: character.zone.y + 7 }
    if (status === 'done') {
      walkTo(dest.x, dest.y, () =>
        showToast(`${character.name} te salue de la main. Le bruit est revenu ici.`)
      )
      return
    }
    if (!getChapterForCharacter(character.id)) {
      showToast('Ce chapitre est encore en train de s’écrire dans le carnet…')
      return
    }
    walkTo(dest.x, dest.y, () => state.startEncounter(character.id))
  }

  const allFragments = state.fragments.length >= fragmentsData.order.length

  return (
    <div className="screen map-screen">
      <header className="map-header">
        <h2 className="map-title">Le village</h2>
        <button className="btn btn-small" onClick={state.openNotebook}>
          Carnet · {state.fragments.length}/{fragmentsData.order.length}
        </button>
      </header>

      <svg
        className="map-svg"
        viewBox="0 0 100 122"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Carte du village"
      >
        <defs>
          <linearGradient id="mapsky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#10102a" />
            <stop offset="1" stopColor="#28284a" />
          </linearGradient>
        </defs>
        {/* ciel, lune, étoiles */}
        <rect x="0" y="0" width="100" height="122" fill="url(#mapsky)" />
        <circle cx="85" cy="10" r="5.4" fill="#e8c56a" />
        <circle cx="87" cy="9" r="1" fill="#d4af5a" opacity="0.7" />
        {[[10, 6, 0.6], [26, 12, 0.45], [44, 5, 0.55], [62, 11, 0.4], [74, 4, 0.5], [94, 22, 0.4], [6, 20, 0.4]].map(([x, y, r], i) => (
          <circle key={i} cx={x} cy={y} r={r} fill="#f5efd8" className="twinkle" style={{ animationDelay: `${i * 0.7}s` }} />
        ))}
        {/* collines */}
        <path d="M0 30 Q20 22 40 28 T80 26 T100 30 L100 122 L0 122 Z" fill="#23233f" />
        <path d="M0 44 Q30 36 60 42 T100 40 L100 122 L0 122 Z" fill="#2a2a48" />
        <path d="M0 60 Q25 52 50 58 T100 56 L100 122 L0 122 Z" fill="#2e3a4a" opacity="0.6" />
        {/* la rivière qui descend vers chez Lo */}
        <path d="M100 52 Q80 62 72 76 Q64 90 62 96 Q60 104 66 122 L78 122 Q70 104 74 94 Q78 82 86 70 Q92 60 100 58 Z" fill="#24485a" />
        <path d="M97 56 Q80 66 73 80 Q66 92 65 100" stroke="#3c6a7c" strokeWidth="1" fill="none" opacity="0.7" className="sway" />
        {/* chemins de terre */}
        <g stroke="#3c3c5c" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.9">
          <path d="M50 112 Q48 96 50 84 Q52 72 42 68" />
          <path d="M50 84 Q58 78 66 56 Q70 42 72 34" />
          <path d="M50 96 Q36 88 22 52 Q26 38 30 36" />
          <path d="M50 96 Q60 94 62 90 M50 100 Q68 96 82 84" />
          <path d="M46 90 Q30 84 18 88 M48 76 Q52 60 48 26" />
          <path d="M66 56 Q76 58 86 62 M62 66 Q76 52 86 42" />
        </g>
        {/* quelques arbres d'ambiance */}
        {[[8, 40], [92, 30], [38, 44], [8, 74], [94, 94]].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <line x1="0" y1="2" x2="0" y2="5" stroke="#4a3422" strokeWidth="1" />
            <circle cx="0" cy="-0.5" r="3" fill="#33472c" />
          </g>
        ))}

        {/* le grand tilleul, quand le vœu est complet */}
        {allFragments && (
          <g
            className="zone zone-open zone-tilleul"
            transform="translate(52 46)"
            onClick={() => walkTo(52, 55, state.showEnding)}
            role="button"
            aria-label="Le grand tilleul — lire le vœu"
          >
            <circle r="10" fill="transparent" />
            <line x1="0" y1="2" x2="0" y2="7" stroke="#8a6a3d" strokeWidth="1.8" />
            <circle cx="0" cy="-2" r="6" fill="#e8c56a" opacity="0.92" />
            <circle cx="-4" cy="0.5" r="3.8" fill="#d4af5a" />
            <circle cx="4" cy="0.5" r="3.8" fill="#d4af5a" />
            <text x="0" y="13.5" textAnchor="middle" fontSize="3" className="zone-label">
              Le grand tilleul
            </text>
          </g>
        )}

        {/* les treize lieux */}
        {characters.map((c) => {
          const status = zoneStatus(c, state)
          const Building = BUILDINGS[c.id]
          return (
            <g
              key={c.id}
              className={`zone zone-${status}`}
              transform={`translate(${c.zone.x} ${c.zone.y})`}
              onClick={() => tapZone(c)}
              role="button"
              aria-label={`${c.name} — ${c.place}`}
            >
              <circle r="9.5" fill="transparent" />
              {Building ? (
                <Building lit={status === 'done'} />
              ) : (
                <rect x="-4" y="-3" width="8" height="6" fill="#3d3d63" />
              )}
              {status === 'locked' && (
                <g transform="translate(0 -1)" opacity="0.95">
                  <rect x="-2" y="-1" width="4" height="3.4" rx="0.8" fill="#8a8aa8" />
                  <path d="M-1.2 -1 V-2.2 Q-1.2 -3.6 0 -3.6 Q1.2 -3.6 1.2 -2.2 V-1" stroke="#8a8aa8" strokeWidth="1" fill="none" />
                </g>
              )}
              <text x="0" y="8.6" textAnchor="middle" fontSize="3" className="zone-label">
                {c.name}
              </text>
            </g>
          )
        })}

        {/* le héros */}
        <g onTransitionEnd={heroArrived}>
          <Hero pos={heroPos} walking={walking} facing={facing} />
        </g>
      </svg>

      {toast && <div className="toast">{toast}</div>}
      <Mistiflouk />
    </div>
  )
}
