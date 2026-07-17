// Portraits SVG des personnages — style cartoon, silhouettes très typées :
// chaque personnage se reconnaît d'un coup d'œil à son accessoire fétiche.
// <Avatar id="mamy" size={64} /> — bustes ronds sur fond coloré.

const INK = '#2b2b3d'

const Eyes = ({ x1 = 43, x2 = 57, y = 41, r = 1.9 }) => (
  <>
    <circle cx={x1} cy={y} r={r} fill={INK} />
    <circle cx={x2} cy={y} r={r} fill={INK} />
    <circle cx={x1 + 0.6} cy={y - 0.6} r={0.6} fill="#fff" />
    <circle cx={x2 + 0.6} cy={y - 0.6} r={0.6} fill="#fff" />
  </>
)

const Smile = ({ y = 48, w = 10, open = false }) =>
  open ? (
    <path d={`M${50 - w / 2} ${y} Q50 ${y + 7} ${50 + w / 2} ${y} Z`} fill="#8c3b30" />
  ) : (
    <path
      d={`M${50 - w / 2} ${y} Q50 ${y + 6} ${50 + w / 2} ${y}`}
      stroke={INK}
      strokeWidth="1.6"
      fill="none"
      strokeLinecap="round"
    />
  )

const Blush = ({ y = 46, x1 = 37, x2 = 63 }) => (
  <>
    <circle cx={x1} cy={y} r="3.2" fill="#e88a76" opacity="0.5" />
    <circle cx={x2} cy={y} r="3.2" fill="#e88a76" opacity="0.5" />
  </>
)

const Freckles = ({ y = 45 }) => (
  <>
    {[40, 43, 46, 54, 57, 60].map((x, i) => (
      <circle key={i} cx={x} cy={y + (i % 2)} r="0.55" fill="#b5713f" opacity="0.8" />
    ))}
  </>
)

const Head = ({ skin, cy = 40, r = 17 }) => (
  <>
    <circle cx={50 - r} cy={cy + 2} r="3.4" fill={skin} />
    <circle cx={50 + r} cy={cy + 2} r="3.4" fill={skin} />
    <circle cx="50" cy={cy} r={r} fill={skin} />
  </>
)

const Body = ({ color, collar }) => (
  <>
    <rect x="45" y="54" width="10" height="8" fill="inherit" style={{ fill: 'var(--skin)' }} />
    <path d={`M22 100 Q24 68 50 68 Q76 68 78 100 Z`} fill={color} />
    {collar}
  </>
)

// Corps simple : épaules arrondies + cou de la couleur de peau passée en prop.
const Bust = ({ skin, shirt, children }) => (
  <>
    <rect x="45.5" y="52" width="9" height="10" rx="3" fill={skin} />
    <path d="M22 100 Q24 67 50 67 Q76 67 78 100 Z" fill={shirt} />
    {children}
  </>
)

/* ---------- Portraits ---------- */

const PORTRAITS = {
  mamy: {
    bg: '#b46a8c',
    draw: (skin = '#f2cba4') => (
      <>
        <Bust skin={skin} shirt="#7c4a6a">
          {/* châle */}
          <path d="M32 74 L50 92 L68 74 L64 70 L50 82 L36 70 Z" fill="#e8c56a" />
          <circle cx="50" cy="70" r="2" fill="#e8c56a" />
        </Bust>
        <Head skin={skin} />
        {/* cheveux gris + chignon */}
        <path d="M33 38 Q31 22 50 21 Q69 22 67 38 Q64 26 50 26 Q36 26 33 38" fill="#dcdce8" />
        <circle cx="50" cy="18" r="7.5" fill="#dcdce8" />
        <rect x="43" y="10" width="14" height="3" rx="1.5" fill="#b46a8c" transform="rotate(-18 50 12)" />
        {/* lunettes rondes */}
        <circle cx="43" cy="41" r="5" fill="none" stroke={INK} strokeWidth="1.4" />
        <circle cx="57" cy="41" r="5" fill="none" stroke={INK} strokeWidth="1.4" />
        <line x1="48" y1="41" x2="52" y2="41" stroke={INK} strokeWidth="1.4" />
        <Eyes />
        <Smile />
        <Blush />
        {/* collier de perles */}
        {[42, 46, 50, 54, 58].map((x, i) => (
          <circle key={i} cx={x} cy={70 + Math.abs(50 - x) * -0.12 + 2} r="1.6" fill="#f5efd8" />
        ))}
      </>
    ),
  },

  alois: {
    bg: '#c8843c',
    draw: (skin = '#f2c9a0') => (
      <>
        <Bust skin={skin} shirt="#7a5a3a">
          <path d="M40 68 L44 78 L50 70 L56 78 L60 68" fill="none" stroke="#e8c56a" strokeWidth="2" />
        </Bust>
        <Head skin={skin} />
        {/* casque d'aviateur + lunettes relevées */}
        <path d="M32 40 Q31 21 50 20 Q69 21 68 40 L64 40 Q64 26 50 26 Q36 26 36 40 Z" fill="#8a5a30" />
        <path d="M32 40 Q31 21 50 20 Q69 21 68 40" fill="#8a5a30" />
        <rect x="36" y="24" width="28" height="6" rx="3" fill="#5a3a1e" />
        <circle cx="44" cy="27" r="4.4" fill="#e8c56a" stroke="#5a3a1e" strokeWidth="1.4" />
        <circle cx="56" cy="27" r="4.4" fill="#e8c56a" stroke="#5a3a1e" strokeWidth="1.4" />
        <Eyes />
        <Smile open w={11} />
        <Freckles />
        {/* loupe */}
        <g transform="rotate(18 74 74)">
          <circle cx="74" cy="70" r="7" fill="#bfe3ea" stroke="#5a3a1e" strokeWidth="2" opacity="0.95" />
          <rect x="72.4" y="77" width="3.2" height="12" rx="1.6" fill="#5a3a1e" />
        </g>
      </>
    ),
  },

  xavier: {
    bg: '#4a7a5a',
    draw: (skin = '#e8b98a') => (
      <>
        {/* marteau derrière l'épaule */}
        <g transform="rotate(-30 26 70)">
          <rect x="24" y="52" width="4" height="26" rx="2" fill="#a8764a" />
          <rect x="17" y="46" width="18" height="8" rx="2" fill="#8a8a9a" />
        </g>
        <Bust skin={skin} shirt="#b04a3a">
          {/* chemise à carreaux */}
          <path d="M31 78 H69 M28 88 H72 M38 70 V100 M50 68 V100 M62 70 V100" stroke="#7c3428" strokeWidth="2" fill="none" />
        </Bust>
        <Head skin={skin} />
        {/* grosse barbe brune */}
        <path d="M34 42 Q34 60 50 61 Q66 60 66 42 Q66 52 50 52 Q34 52 34 42" fill="#6a4a2e" />
        <path d="M35 44 Q35 58 50 59 Q65 58 65 44 L65 48 Q62 57 50 57 Q38 57 35 48 Z" fill="#6a4a2e" />
        {/* cheveux courts + crayon sur l'oreille */}
        <path d="M33 37 Q33 23 50 22 Q67 23 67 37 Q63 27 50 27 Q37 27 33 37" fill="#6a4a2e" />
        <rect x="63" y="34" width="10" height="2.6" rx="1.3" fill="#e8c56a" transform="rotate(-26 68 35)" />
        <Eyes />
        <path d="M44 50 Q50 54 56 50" stroke="#3d2a18" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </>
    ),
  },

  papy: {
    bg: '#8a9a4a',
    draw: (skin = '#e8b98a') => (
      <>
        <Bust skin={skin} shirt="#5a7ab0">
          {/* salopette */}
          <path d="M36 70 L36 100 L64 100 L64 70 L58 68 L58 84 L42 84 L42 68 Z" fill="#3d5a8c" />
          <rect x="40" y="66" width="5" height="14" fill="#3d5a8c" />
          <rect x="55" y="66" width="5" height="14" fill="#3d5a8c" />
          <circle cx="42.5" cy="79" r="1.6" fill="#e8c56a" />
          <circle cx="57.5" cy="79" r="1.6" fill="#e8c56a" />
        </Bust>
        <Head skin={skin} />
        {/* chapeau de paille à large bord */}
        <ellipse cx="50" cy="29" rx="26" ry="6" fill="#e0c47a" />
        <path d="M36 29 Q36 15 50 15 Q64 15 64 29 Z" fill="#e8d08a" />
        <rect x="36" y="25" width="28" height="4" fill="#b04a3a" />
        {/* grosse moustache blanche */}
        <path d="M50 47 Q42 43 36 47 Q38 53 46 51 Q49 50 50 48 Q51 50 54 51 Q62 53 64 47 Q58 43 50 47" fill="#f0f0f5" />
        <Eyes y={40} />
        <Blush y={45} />
        {/* brin de blé */}
        <path d="M62 52 Q70 48 74 40" stroke="#e0c47a" strokeWidth="1.8" fill="none" />
        {[0, 1, 2].map((i) => (
          <ellipse key={i} cx={71 + i * 1.4} cy={42 - i * 2.6} rx="1.6" ry="0.9" fill="#e0c47a" transform={`rotate(-40 ${71 + i} ${42 - i * 3})`} />
        ))}
      </>
    ),
  },

  jules: {
    bg: '#c85a4a',
    draw: (skin = '#e0a878') => (
      <>
        <Bust skin={skin} shirt="#f0f0f5">
          {/* maillot rayé n°10 */}
          <path d="M24 82 Q50 76 76 82 M23 92 Q50 86 77 92" stroke="#b04a3a" strokeWidth="4" fill="none" />
          <text x="50" y="86" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#b04a3a" fontFamily="Georgia">10</text>
        </Bust>
        <Head skin={skin} />
        {/* casquette à l'envers */}
        <path d="M33 34 Q34 19 50 19 Q66 19 67 34 Z" fill="#3d6a4a" />
        <path d="M67 30 Q78 30 77 36 L67 35 Z" fill="#3d6a4a" />
        <circle cx="50" cy="22" r="2" fill="#e8c56a" />
        {/* pansement sur la joue */}
        <rect x="58" y="44" width="8" height="4" rx="2" fill="#e8c56a" transform="rotate(-18 62 46)" />
        <Eyes />
        <Smile open w={12} />
        <Freckles y={44} />
      </>
    ),
  },

  oxane: {
    bg: '#5a6ab0',
    draw: (skin = '#f2c9a0') => (
      <>
        <Bust skin={skin} shirt="#8c5a9a">
          {/* col roulé + livre tenu contre soi */}
          <rect x="44" y="60" width="12" height="6" rx="3" fill="#7a4a88" />
          <g transform="rotate(-8 50 84)">
            <rect x="36" y="76" width="28" height="20" rx="2" fill="#c85a4a" />
            <rect x="38" y="78" width="24" height="16" rx="1" fill="#f5efd8" />
            <line x1="50" y1="78" x2="50" y2="94" stroke="#c85a4a" strokeWidth="1.4" />
          </g>
        </Bust>
        <Head skin={skin} />
        {/* chignon + crayon planté */}
        <path d="M33 38 Q32 22 50 21 Q68 22 67 38 Q63 26 50 26 Q37 26 33 38" fill="#4a3428" />
        <circle cx="60" cy="17" r="6.5" fill="#4a3428" />
        <rect x="52" y="10" width="16" height="2.6" rx="1.3" fill="#e8c56a" transform="rotate(24 60 12)" />
        {/* grandes lunettes rondes */}
        <circle cx="43" cy="41" r="5.6" fill="#bfe3ea" opacity="0.5" stroke={INK} strokeWidth="1.5" />
        <circle cx="57" cy="41" r="5.6" fill="#bfe3ea" opacity="0.5" stroke={INK} strokeWidth="1.5" />
        <line x1="48.5" y1="41" x2="51.5" y2="41" stroke={INK} strokeWidth="1.5" />
        <Eyes />
        <Smile w={8} />
        <Blush />
      </>
    ),
  },

  cyril: {
    bg: '#3d3d63',
    draw: (skin = '#e8b98a') => (
      <>
        <Bust skin={skin} shirt="#2b2b3d">
          {/* tee-shirt note de musique + sangle de guitare */}
          <path d="M28 70 L72 96" stroke="#a8764a" strokeWidth="5" />
          <circle cx="47" cy="86" r="3" fill="#e8c56a" />
          <rect x="49" y="74" width="2" height="12" fill="#e8c56a" />
          <path d="M49 74 Q54 72 55 76" stroke="#e8c56a" strokeWidth="2" fill="none" />
        </Bust>
        <Head skin={skin} />
        {/* bonnet + mèches */}
        <path d="M33 36 Q33 19 50 19 Q67 19 67 36 L67 32 Q67 24 50 24 Q33 24 33 32 Z" fill="#b04a3a" />
        <path d="M33 36 Q33 20 50 20 Q67 20 67 36 Q67 27 50 26 Q33 27 33 36" fill="#b04a3a" />
        <rect x="33" y="32" width="34" height="5" rx="2.5" fill="#8c3b30" />
        <path d="M36 38 Q38 42 41 39 M64 38 Q62 42 59 39" stroke="#4a3428" strokeWidth="2" fill="none" />
        {/* casque autour du cou */}
        <path d="M36 58 Q50 70 64 58" stroke="#2b2b3d" strokeWidth="4" fill="none" />
        <circle cx="36" cy="58" r="4.4" fill="#e8c56a" stroke="#2b2b3d" strokeWidth="1.5" />
        <circle cx="64" cy="58" r="4.4" fill="#e8c56a" stroke="#2b2b3d" strokeWidth="1.5" />
        <Eyes />
        <Smile w={9} />
      </>
    ),
  },

  manu: {
    bg: '#4a6a8a',
    draw: (skin = '#d89868') => (
      <>
        <Bust skin={skin} shirt="#3d5a8c">
          {/* bleu de travail + fermeture éclair + clé à molette */}
          <line x1="50" y1="68" x2="50" y2="100" stroke="#2b3d5c" strokeWidth="2.5" />
          <circle cx="50" cy="72" r="1.8" fill="#e8c56a" />
          <rect x="60" y="80" width="7" height="14" rx="2" fill="#2b3d5c" />
          <g transform="rotate(14 63 80)">
            <rect x="61.6" y="72" width="3" height="10" rx="1.5" fill="#9aa0b0" />
            <circle cx="63" cy="71" r="3" fill="none" stroke="#9aa0b0" strokeWidth="2" />
          </g>
        </Bust>
        <Head skin={skin} />
        {/* casquette de mécano */}
        <path d="M33 33 Q34 19 50 19 Q66 19 67 33 Z" fill="#c85a4a" />
        <path d="M33 30 Q22 31 24 37 L34 34 Z" fill="#c85a4a" />
        <circle cx="50" cy="24" r="4" fill="#f5efd8" opacity="0.9" />
        {/* moustache + tache de cambouis */}
        <path d="M42 47 Q50 52 58 47 Q54 50 50 49 Q46 50 42 47" fill="#4a3428" />
        <path d="M42 47 Q46 44 50 46 Q54 44 58 47 Q54 49 50 47.5 Q46 49 42 47" fill="#4a3428" />
        <ellipse cx="38" cy="47" rx="3" ry="2" fill="#3d3d4a" opacity="0.75" />
        <Eyes />
      </>
    ),
  },

  noelia: {
    bg: '#c86a3c',
    draw: (skin = '#c8845a') => (
      <>
        <Bust skin={skin} shirt="#e07a5a">
          {/* tablier rayé */}
          <path d="M38 74 L62 74 L64 100 L36 100 Z" fill="#f5efd8" />
          <path d="M40 80 H60 M39 87 H61 M38 94 H62" stroke="#c85a4a" strokeWidth="2" />
          <path d="M38 74 Q50 70 62 74" stroke="#c85a4a" strokeWidth="2" fill="none" />
        </Bust>
        <Head skin={skin} />
        {/* foulard noué à pois */}
        <path d="M32 38 Q31 20 50 19 Q69 20 68 38 L64 36 Q64 25 50 25 Q36 25 36 36 Z" fill="#e8c56a" />
        <path d="M32 38 Q31 20 50 19 Q69 20 68 38 Q66 26 50 25 Q34 26 32 38" fill="#e8c56a" />
        {[[40, 24], [50, 21], [60, 24]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.5" fill="#b04a3a" />
        ))}
        <path d="M66 34 Q74 34 72 42 Q69 38 65 38 Z" fill="#e8c56a" />
        {/* grandes boucles d'oreilles */}
        <circle cx="32" cy="46" r="3.4" fill="none" stroke="#e8c56a" strokeWidth="1.8" />
        <circle cx="68" cy="46" r="3.4" fill="none" stroke="#e8c56a" strokeWidth="1.8" />
        <Eyes />
        <Smile open w={12} />
        <Blush />
      </>
    ),
  },

  lo: {
    bg: '#5a9aa0',
    draw: (skin = '#e0a878') => (
      <>
        <Bust skin={skin} shirt="#7ec8a9">
          <path d="M35 70 Q50 80 65 70 L65 76 Q50 86 35 76 Z" fill="#5aa888" />
        </Bust>
        <Head skin={skin} />
        {/* haut chignon de danseuse + ruban */}
        <path d="M33 37 Q32 22 50 21 Q68 22 67 37 Q63 26 50 26 Q37 26 33 37" fill="#2b2b3d" />
        <ellipse cx="50" cy="14" rx="8" ry="7" fill="#2b2b3d" />
        <path d="M42 16 Q38 10 34 12 M58 16 Q62 10 66 12" stroke="#7ec8a9" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="50" cy="19" r="2.2" fill="#7ec8a9" />
        {/* petites étoiles aux oreilles */}
        <path d="M32 45 l1.2 2.4 2.6 0.3 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.3 Z" fill="#e8c56a" />
        <path d="M68 45 l1.2 2.4 2.6 0.3 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.3 Z" fill="#e8c56a" />
        <Eyes />
        <Smile w={9} />
        <Blush />
      </>
    ),
  },

  lana: {
    bg: '#46466e',
    draw: (skin = '#f2c9a0') => (
      <>
        <Bust skin={skin} shirt="#3d3d63">
          {/* sweat étoilé + longue-vue en bandoulière */}
          {[[38, 76], [50, 84], [62, 74], [44, 92], [58, 90]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} l1 2 2.2 0.2 -1.6 1.5 0.4 2.2 -2 -1.1 -2 1.1 0.4 -2.2 -1.6 -1.5 2.2 -0.2 Z`} fill="#e8c56a" />
          ))}
          <g transform="rotate(38 68 78)">
            <rect x="64" y="66" width="8" height="18" rx="2" fill="#8a6a3d" />
            <rect x="65.5" y="62" width="5" height="5" rx="1" fill="#5a4425" />
          </g>
        </Bust>
        <Head skin={skin} />
        {/* cheveux au vent + béret étoilé */}
        <path d="M33 40 Q30 24 50 21 Q70 24 67 40 Q66 28 50 27 Q34 28 33 40" fill="#c87a3c" />
        <path d="M30 42 Q28 50 32 54 Q34 47 33 42 Z M70 42 Q72 50 68 54 Q66 47 67 42 Z" fill="#c87a3c" />
        <path d="M34 28 Q36 14 54 15 Q70 17 68 28 Q60 22 48 23 Q38 24 34 28" fill="#3d3d63" />
        <path d="M52 13 l1.2 2.4 2.6 0.3 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.3 Z" fill="#e8c56a" />
        <Eyes />
        <Smile w={9} />
        <Freckles />
      </>
    ),
  },

  marjo: {
    bg: '#7a8a3c',
    draw: (skin = '#e0a878') => (
      <>
        <Bust skin={skin} shirt="#8a9a5a">
          {/* chemise ranger à poches + sifflet au cou */}
          <rect x="36" y="76" width="10" height="9" rx="1.5" fill="#7a8a4a" stroke="#5c6a34" strokeWidth="1.2" />
          <rect x="54" y="76" width="10" height="9" rx="1.5" fill="#7a8a4a" stroke="#5c6a34" strokeWidth="1.2" />
          <path d="M43 68 Q50 80 57 68" stroke="#b04a3a" strokeWidth="1.8" fill="none" />
          <rect x="47.5" y="78" width="7" height="4.6" rx="2" fill="#e8c56a" />
          <circle cx="49.5" cy="80.3" r="1" fill="#8a6a3d" />
        </Bust>
        <Head skin={skin} />
        {/* queue de cheval + chapeau de brousse */}
        <path d="M64 34 Q72 40 70 54 Q66 52 65 44 Z" fill="#8a5a30" />
        <path d="M34 38 Q33 24 50 23 Q67 24 66 38 Q62 28 50 28 Q38 28 34 38" fill="#8a5a30" />
        <ellipse cx="50" cy="28" rx="25" ry="5.4" fill="#c8a45a" />
        <path d="M37 28 Q37 15 50 15 Q63 15 63 28 Z" fill="#d4b46a" />
        <rect x="37" y="24" width="26" height="3.6" fill="#7a5a30" />
        <Eyes />
        <Smile open w={11} />
        <Blush />
        {/* Coco le perroquet sur l'épaule ! */}
        <g transform="translate(72 58)">
          <ellipse cx="0" cy="6" rx="6" ry="8" fill="#c85a4a" />
          <circle cx="0" cy="-3" r="4.6" fill="#c85a4a" />
          <path d="M3 -4 Q8 -3 6 0 Q3 0 2 -2 Z" fill="#e8c56a" />
          <circle cx="-1" cy="-4" r="1.2" fill={INK} />
          <path d="M-3 2 Q-7 8 -3 12 Q-1 8 -1 4 Z" fill="#5a9aa0" />
          <path d="M-2 13 L0 17 L2 13" stroke="#e8c56a" strokeWidth="1.6" fill="none" />
        </g>
      </>
    ),
  },

  mousquetaires: {
    bg: '#6a5aa0',
    draw: () => (
      <>
        {/* trois têtes, trois chapeaux à plume, un seul serment */}
        {[
          { x: 28, y: 56, skin: '#f2c9a0', hat: '#b04a3a', plume: '#e8c56a' },
          { x: 50, y: 46, skin: '#d89868', hat: '#3d5a8c', plume: '#f5efd8' },
          { x: 72, y: 56, skin: '#e8b98a', hat: '#3d6a4a', plume: '#e07a5a' },
        ].map(({ x, y, skin, hat, plume }, i) => (
          <g key={i} transform={`translate(${x - 50} ${y - 50})`}>
            <path d="M34 100 Q36 76 50 76 Q64 76 66 100 Z" fill={hat} />
            <circle cx="50" cy="60" r="13" fill={skin} />
            {/* chapeau de mousquetaire à large bord + plume */}
            <ellipse cx="50" cy="50" rx="17" ry="4.6" fill={hat} />
            <path d="M40 50 Q41 39 50 39 Q59 39 60 50 Z" fill={hat} />
            <path d={`M58 44 Q68 30 74 32 Q68 36 64 46 Z`} fill={plume} />
            <circle cx="45.5" cy="59" r="1.5" fill={INK} />
            <circle cx="54.5" cy="59" r="1.5" fill={INK} />
            <path d="M46 64 Q50 67 54 64" stroke={INK} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          </g>
        ))}
      </>
    ),
  },

  mistiflouk: {
    bg: '#2e4a3e',
    draw: () => (
      <>
        {/* serpent-sonar lové, tout en rondeurs */}
        <path
          d="M22 78 Q30 62 46 66 Q62 70 68 58 Q74 46 64 40 Q56 35 50 40"
          fill="none"
          stroke="#7ec8a9"
          strokeWidth="11"
          strokeLinecap="round"
        />
        <path
          d="M22 78 Q30 62 46 66 Q62 70 68 58"
          fill="none"
          stroke="#5aa888"
          strokeWidth="11"
          strokeLinecap="round"
          opacity="0.5"
        />
        <circle cx="48" cy="38" r="9.5" fill="#7ec8a9" />
        <circle cx="45" cy="36" r="2.2" fill={INK} />
        <circle cx="52.5" cy="36" r="2.2" fill={INK} />
        <circle cx="45.7" cy="35.3" r="0.7" fill="#fff" />
        <circle cx="53.2" cy="35.3" r="0.7" fill="#fff" />
        <path d="M45 43 Q48.5 45.5 52 43" stroke={INK} strokeWidth="1.4" fill="none" strokeLinecap="round" />
        <path d="M48 47.5 L48 52 M48 52 L45.5 55 M48 52 L50.5 55" stroke="#e07a5a" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        {/* ondes de vibration */}
        <path d="M64 30 Q68 26 66 20 M70 36 Q76 34 78 28" stroke="#e8c56a" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.9" />
      </>
    ),
  },

  hero: {
    bg: '#3c6a7a',
    draw: (skin = '#e8b98a') => (
      <>
        <Bust skin={skin} shirt="#c8843c">
          {/* sacoche d'aventurier en bandoulière */}
          <path d="M30 70 L66 94" stroke="#7a5a3a" strokeWidth="4.4" />
          <rect x="58" y="86" width="16" height="12" rx="3" fill="#7a5a3a" />
          <rect x="58" y="86" width="16" height="5" rx="2" fill="#5a4225" />
        </Bust>
        <Head skin={skin} />
        {/* mèche espiègle + casquette verte */}
        <path d="M33 34 Q34 19 50 19 Q66 19 67 34 Z" fill="#3d6a4a" />
        <path d="M67 31 Q78 32 76 38 L66 35 Z" fill="#3d6a4a" />
        <path d="M40 33 Q44 27 48 33 Q52 27 56 33" fill="none" stroke="#5a3a1e" strokeWidth="2.4" strokeLinecap="round" />
        <Eyes />
        <Smile open w={11} />
        <Freckles y={44} />
      </>
    ),
  },
}

// Le Veilleur — gardien des bruits, géant fatigué en bonnet de nuit
PORTRAITS.veilleur = {
  bg: '#3a3a52',
  draw: (skin = '#e8cdb0') => (
    <>
      <Bust skin={skin} shirt="#5c5c78">
        {/* manteau gris à gros boutons (il en manque un !) */}
        <line x1="50" y1="68" x2="50" y2="100" stroke="#46465e" strokeWidth="2.5" />
        <circle cx="43" cy="78" r="2" fill="#8a8aa8" />
        <circle cx="43" cy="90" r="2" fill="none" stroke="#8a8aa8" strokeWidth="1" strokeDasharray="2 1.6" />
      </Bust>
      <Head skin={skin} />
      {/* bonnet de nuit à pompon */}
      <path d="M32 36 Q32 18 50 18 Q68 18 68 36 L64 34 Q64 24 50 24 Q36 24 36 34 Z" fill="#7a7a9a" />
      <path d="M32 36 Q30 20 50 18 Q72 18 74 12 Q80 8 82 14 Q83 20 74 22 Q70 24 68 36 Q66 25 50 24 Q34 25 32 36" fill="#7a7a9a" />
      <circle cx="82" cy="14" r="4" fill="#e8c56a" />
      {/* grands sourcils broussailleux + yeux fatigués mais doux */}
      <path d="M37 36 Q43 32 48 36 M52 36 Q57 32 63 36" stroke="#d8d8e4" strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M40 42 Q43 44 46 42 M54 42 Q57 44 60 42" stroke={INK} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M39 46 Q43 47.5 47 46 M53 46 Q57 47.5 61 46" stroke="#c9a98c" strokeWidth="1" fill="none" />
      {/* grande barbe grise douce */}
      <path d="M34 44 Q33 62 50 64 Q67 62 66 44 Q64 56 50 56 Q36 56 34 44" fill="#d8d8e4" />
      <path d="M42 52 Q50 57 58 52 Q55 60 50 60 Q45 60 42 52" fill="#d8d8e4" />
      <path d="M44 51 Q50 54 56 51" stroke="#8a8aa8" strokeWidth="1" fill="none" strokeLinecap="round" />
      {/* tasse de camomille */}
      <g transform="translate(70 80)">
        <rect x="-6" y="-4" width="12" height="10" rx="2.5" fill="#e8d3a8" />
        <path d="M6 -2 Q11 -1 6 4" stroke="#e8d3a8" strokeWidth="2.4" fill="none" />
        <path d="M-2 -7 q-1 -3 1 -5 M2 -7 q1 -3 -1 -5" stroke="#d8d3c8" strokeWidth="1" fill="none" className="smoke" />
      </g>
    </>
  ),
}

// speaker "carnet" → on montre le carnet de Mamy lui-même
PORTRAITS.carnet = {
  bg: '#46466e',
  draw: () => (
    <>
      <g transform="rotate(-6 50 55)">
        <rect x="26" y="30" width="48" height="52" rx="4" fill="#8a5a30" />
        <rect x="30" y="34" width="40" height="44" rx="2" fill="#f5efd8" />
        <line x1="50" y1="34" x2="50" y2="78" stroke="#8a5a30" strokeWidth="2" />
        {[42, 50, 58, 66].map((y, i) => (
          <g key={i}>
            <line x1="34" y1={y} x2="46" y2={y} stroke="#b5a98a" strokeWidth="1.6" />
            <line x1="54" y1={y} x2="66" y2={y} stroke="#b5a98a" strokeWidth="1.6" />
          </g>
        ))}
        <path d="M62 24 l2 4 4.4 0.5 -3.2 3 0.8 4.4 -4 -2.2 -4 2.2 0.8 -4.4 -3.2 -3 4.4 -0.5 Z" fill="#e8c56a" />
      </g>
    </>
  ),
}

export default function Avatar({ id, size = 56, round = true, className = '' }) {
  const portrait = PORTRAITS[id] ?? PORTRAITS.hero
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`avatar ${className}`}
      role="img"
      aria-label={id}
      style={round ? { borderRadius: '50%', background: portrait.bg } : { background: portrait.bg }}
    >
      {round && <circle cx="50" cy="50" r="50" fill={portrait.bg} />}
      {portrait.draw()}
    </svg>
  )
}

export function hasPortrait(id) {
  return Boolean(PORTRAITS[id])
}
