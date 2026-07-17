// Décors de rencontre — une scène SVG plein écran par lieu du village.
// Style veillée : nuit chaude, lumières dorées, quelques éléments animés en CSS
// (classes twinkle / sway / smoke définies dans styles.css).

const Stars = ({ spots }) => (
  <>
    {spots.map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill="#f5efd8" className="twinkle" style={{ animationDelay: `${i * 0.6}s` }} />
    ))}
  </>
)

const NightSky = ({ h = 70, from = '#12122a', to = '#252547', moon = true }) => (
  <>
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={from} />
        <stop offset="1" stopColor={to} />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="100" height={h} fill="url(#sky)" />
    {moon && <circle cx="80" cy="16" r="7" fill="#e8c56a" opacity="0.95" />}
    <Stars spots={[[12, 10, 0.7], [30, 20, 0.5], [55, 8, 0.6], [68, 26, 0.45], [90, 34, 0.5], [20, 32, 0.4]]} />
  </>
)

const Shelf = ({ x, y, w }) => (
  <>
    <rect x={x} y={y} width={w} height="1.6" fill="#5a4225" />
    {Array.from({ length: Math.floor(w / 5) }, (_, i) => (
      <rect key={i} x={x + 1 + i * 5} y={y - 6} width="3.4" height="6" rx="0.5"
        fill={['#b04a3a', '#3d5a8c', '#7a8a4a', '#c8843c'][i % 4]} />
    ))}
  </>
)

const SCENES = {
  // La cuisine de Mamy — lampe chaude, horloge, étagères à confitures
  mamy: (
    <>
      <rect width="100" height="160" fill="#3a2c30" />
      <rect width="100" height="160" fill="url(#warm)" />
      <defs>
        <radialGradient id="warm" cx="0.5" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#6a4a3c" />
          <stop offset="1" stopColor="#2c2026" />
        </radialGradient>
      </defs>
      {/* fenêtre sur la nuit */}
      <rect x="10" y="16" width="24" height="28" rx="2" fill="#12122a" stroke="#5a4225" strokeWidth="1.6" />
      <line x1="22" y1="16" x2="22" y2="44" stroke="#5a4225" strokeWidth="1.4" />
      <line x1="10" y1="30" x2="34" y2="30" stroke="#5a4225" strokeWidth="1.4" />
      <circle cx="28" cy="23" r="2.6" fill="#e8c56a" opacity="0.9" />
      <Stars spots={[[15, 22, 0.5], [19, 36, 0.4], [30, 38, 0.45]]} />
      {/* horloge (elle refait tic-tac !) */}
      <circle cx="70" cy="24" r="9" fill="#e8d3a8" stroke="#5a4225" strokeWidth="2" />
      <line x1="70" y1="24" x2="70" y2="18" stroke="#5a4225" strokeWidth="1.6" className="sway" />
      <line x1="70" y1="24" x2="74" y2="26" stroke="#5a4225" strokeWidth="1.4" />
      <rect x="67" y="33" width="6" height="10" fill="#5a4225" />
      <Shelf x={48} y={52} w={44} />
      {/* table + gâteau fumant */}
      <rect x="8" y="120" width="84" height="6" rx="2" fill="#6a4a2e" />
      <rect x="14" y="126" width="5" height="26" fill="#5a3c24" />
      <rect x="81" y="126" width="5" height="26" fill="#5a3c24" />
      <path d="M40 114 Q40 106 50 106 Q60 106 60 114 Z" fill="#c8843c" />
      <rect x="38" y="114" width="24" height="4" rx="2" fill="#e8d3a8" />
      <path d="M47 102 Q45 96 48 92 M53 102 Q55 96 52 92" stroke="#d8d3c8" strokeWidth="1.2" fill="none" className="smoke" />
    </>
  ),

  // Le grenier d'Aloïs — poutres, malle, phonographe, lucarne
  alois: (
    <>
      <rect width="100" height="160" fill="#33261c" />
      <path d="M0 40 L50 4 L100 40 L100 0 L0 0 Z" fill="#241a12" />
      <path d="M0 42 L50 6 M100 42 L50 6" stroke="#4a3422" strokeWidth="3" />
      <path d="M18 30 L18 160 M82 30 L82 160" stroke="#4a3422" strokeWidth="3" opacity="0.6" />
      {/* lucarne ronde sur la lune */}
      <circle cx="50" cy="26" r="9" fill="#12122a" stroke="#5a4225" strokeWidth="2" />
      <circle cx="53" cy="23" r="3" fill="#e8c56a" />
      <Stars spots={[[46, 29, 0.5], [50, 21, 0.4]]} />
      {/* malle au trésor */}
      <rect x="8" y="118" width="26" height="16" rx="2" fill="#6a4a2e" stroke="#8a6a3d" strokeWidth="1.4" />
      <path d="M8 118 Q21 110 34 118" fill="#5a3c24" stroke="#8a6a3d" strokeWidth="1.4" />
      <rect x="19" y="116" width="4" height="6" fill="#e8c56a" />
      {/* phonographe */}
      <rect x="66" y="124" width="22" height="10" rx="1.5" fill="#5a3c24" />
      <path d="M74 124 Q70 108 84 104 Q88 112 80 118 Q76 121 76 124 Z" fill="#c8a45a" />
      <circle cx="84" cy="105" r="1.6" fill="#8a6a3d" />
      {/* toiles d'araignée + poussière dorée */}
      <path d="M0 44 Q8 46 10 54 M0 52 Q5 52 7 58" stroke="#8a8a9a" strokeWidth="0.7" fill="none" opacity="0.6" />
      <Stars spots={[[30, 80, 0.4], [60, 70, 0.35], [45, 95, 0.3], [70, 88, 0.35]]} />
    </>
  ),

  // L'atelier de Xavier — panneau à outils, établi, ampoule
  xavier: (
    <>
      <rect width="100" height="160" fill="#3c342a" />
      <rect x="0" y="130" width="100" height="30" fill="#2c261e" />
      {/* ampoule qui pend */}
      <line x1="50" y1="0" x2="50" y2="22" stroke="#2b2b3d" strokeWidth="1.4" />
      <circle cx="50" cy="26" r="5" fill="#e8c56a" opacity="0.95" />
      <circle cx="50" cy="26" r="11" fill="#e8c56a" opacity="0.15" className="twinkle" />
      {/* panneau à outils */}
      <rect x="8" y="34" width="38" height="30" rx="2" fill="#4a3e30" stroke="#5a4c38" strokeWidth="1.4" />
      <g stroke="#9aa0b0" strokeWidth="2" strokeLinecap="round">
        <line x1="14" y1="40" x2="14" y2="52" />
        <line x1="11" y1="42" x2="17" y2="42" />
        <line x1="24" y1="40" x2="24" y2="54" />
        <circle cx="24" cy="39" r="2.6" fill="none" />
        <line x1="34" y1="40" x2="34" y2="52" />
        <path d="M31 52 L37 52 L34 58 Z" fill="#9aa0b0" stroke="none" />
      </g>
      <rect x="40" y="38" width="4" height="16" fill="#a8764a" />
      {/* scie accrochée */}
      <path d="M58 36 L88 36 L88 44 Q73 50 58 44 Z" fill="#9aa0b0" />
      <rect x="86" y="32" width="8" height="8" rx="2" fill="#a8764a" />
      {/* établi + banc en cours + copeaux */}
      <rect x="6" y="112" width="88" height="7" rx="2" fill="#6a4a2e" />
      <rect x="10" y="119" width="6" height="34" fill="#5a3c24" />
      <rect x="84" y="119" width="6" height="34" fill="#5a3c24" />
      <rect x="30" y="102" width="40" height="6" rx="2" fill="#c8a45a" />
      <rect x="34" y="108" width="4" height="6" fill="#a8764a" />
      <rect x="62" y="108" width="4" height="6" fill="#a8764a" />
      <path d="M20 124 q2 -3 4 0 q2 3 4 0 M70 128 q2 -3 4 0" stroke="#c8a45a" strokeWidth="1.2" fill="none" />
    </>
  ),

  // Le potager de Papy — rangées, citrouille, cabane, arrosoir
  papy: (
    <>
      <NightSky h={64} to="#2e3a2e" />
      <rect x="0" y="62" width="100" height="98" fill="#3c4a30" />
      {/* rangées du potager en perspective */}
      {[76, 92, 108, 124].map((y, i) => (
        <path key={i} d={`M${8 - i * 2} ${y} Q50 ${y - 5} ${92 + i * 2} ${y}`} stroke="#2c381f" strokeWidth="5" fill="none" />
      ))}
      {[[20, 74], [42, 72], [66, 73], [30, 90], [56, 88], [78, 90]].map(([x, y], i) => (
        <g key={i}>
          <path d={`M${x} ${y} q-2 -5 0 -8 q2 3 0 8`} fill="#5a7a3c" className="sway" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
      {/* la citrouille championne */}
      <ellipse cx="76" cy="122" rx="13" ry="10" fill="#c8641e" />
      <path d="M70 113 Q70 130 70 131 M76 112 Q76 131 76 132 M82 113 Q82 130 82 131" stroke="#a04e14" strokeWidth="1.6" fill="none" />
      <path d="M76 112 Q74 106 79 104" stroke="#4a6a2e" strokeWidth="2.4" fill="none" />
      {/* cabane à outils */}
      <rect x="6" y="36" width="24" height="26" fill="#5a4632" />
      <path d="M4 38 L18 24 L32 38 Z" fill="#6a4a2e" />
      <rect x="14" y="46" width="8" height="16" fill="#3c2e1e" />
      {/* arrosoir + barrière */}
      <path d="M36 120 h10 v8 q-5 3 -10 0 Z M36 122 l-7 -5 M29 117 l3 -2" stroke="#8a8a9a" strokeWidth="1.6" fill="#8a8a9a" />
      <g stroke="#6a5a42" strokeWidth="2">
        <line x1="4" y1="140" x2="96" y2="140" />
        {[10, 30, 50, 70, 90].map((x) => (
          <line key={x} x1={x} y1="132" x2={x} y2="150" />
        ))}
      </g>
    </>
  ),

  // Le terrain de jeux de Jules — but, balançoire, ballon
  jules: (
    <>
      <NightSky h={70} to="#28303c" />
      <rect x="0" y="68" width="100" height="92" fill="#31422e" />
      <ellipse cx="50" cy="150" rx="70" ry="20" fill="#3a4e34" />
      {/* but de foot */}
      <g stroke="#d8d3c8" strokeWidth="1.8" fill="none">
        <path d="M10 68 L10 44 L44 44 L44 68" />
        <path d="M10 44 L16 38 L50 38 L44 44 M44 68 L50 60 L50 38" opacity="0.7" />
      </g>
      <path d="M12 46 L42 66 M42 46 L12 66 M27 44 L27 68" stroke="#d8d3c8" strokeWidth="0.5" opacity="0.5" />
      {/* balançoire */}
      <path d="M62 40 L70 24 L92 24 L100 40" stroke="#8a6a3d" strokeWidth="2.6" fill="none" />
      <line x1="76" y1="24" x2="76" y2="52" stroke="#d8d3c8" strokeWidth="1" className="sway" />
      <line x1="86" y1="24" x2="86" y2="52" stroke="#d8d3c8" strokeWidth="1" className="sway" />
      <rect x="74" y="52" width="14" height="3" rx="1.5" fill="#b04a3a" className="sway" />
      {/* ballon + ardoise de score */}
      <circle cx="30" cy="126" r="7" fill="#f0f0f5" />
      <path d="M30 119 L33 124 L30 129 L27 124 Z M23 126 h14" stroke="#2b2b3d" strokeWidth="1" fill="none" />
      <rect x="60" y="112" width="20" height="14" rx="2" fill="#2b2b3d" stroke="#8a6a3d" strokeWidth="1.6" />
      <path d="M64 117 h5 M64 121 h8" stroke="#f5efd8" strokeWidth="1.4" />
    </>
  ),

  // La bibliothèque d'Oxane — murs de livres, bougie, fauteuil
  oxane: (
    <>
      <rect width="100" height="160" fill="#2e2438" />
      {[20, 34, 48].map((y) => (
        <Shelf key={y} x={6} y={y} w={88} />
      ))}
      {/* échelle de bibliothèque */}
      <g stroke="#8a6a3d" strokeWidth="1.8">
        <line x1="80" y1="14" x2="76" y2="64" />
        <line x1="90" y1="14" x2="86" y2="64" />
        {[22, 32, 42, 52].map((y) => (
          <line key={y} x1={79 - (y - 14) * 0.08} y1={y} x2={89 - (y - 14) * 0.08} y2={y} />
        ))}
      </g>
      {/* bougie */}
      <rect x="18" y="106" width="5" height="12" fill="#f5efd8" />
      <ellipse cx="20.5" cy="103" rx="2" ry="3.4" fill="#e8c56a" className="twinkle" />
      <circle cx="20.5" cy="102" r="7" fill="#e8c56a" opacity="0.14" className="twinkle" />
      <rect x="12" y="118" width="18" height="3" rx="1.5" fill="#8a6a3d" />
      {/* fauteuil + pile de livres */}
      <path d="M56 108 Q56 96 68 96 Q80 96 80 108 L82 128 L54 128 Z" fill="#7a3c50" />
      <rect x="52" y="124" width="34" height="8" rx="3" fill="#5c2c3c" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={36 - i} y={122 - i * 5} width={12 + i * 2} height="5" rx="1"
          fill={['#3d5a8c', '#b04a3a', '#7a8a4a'][i]} />
      ))}
    </>
  ),

  // La salle de musique de Cyril — guitare, notes, ampli, rideau
  cyril: (
    <>
      <rect width="100" height="160" fill="#28203a" />
      {/* rideau de scène */}
      <path d="M0 0 H100 V16 Q88 22 76 16 Q64 22 52 16 Q40 22 28 16 Q16 22 4 16 L0 16 Z" fill="#7a2c38" />
      {/* guitare sur pied */}
      <g transform="rotate(8 26 110)">
        <ellipse cx="26" cy="112" rx="12" ry="14" fill="#c8843c" />
        <ellipse cx="26" cy="98" rx="8" ry="9" fill="#c8843c" />
        <circle cx="26" cy="106" r="4" fill="#3c2e1e" />
        <rect x="24.4" y="62" width="3.2" height="40" fill="#6a4a2e" />
        <rect x="22.5" y="58" width="7" height="6" rx="1" fill="#5a3c24" />
        <line x1="25" y1="64" x2="25" y2="102" stroke="#e8d3a8" strokeWidth="0.5" />
        <line x1="27" y1="64" x2="27" y2="102" stroke="#e8d3a8" strokeWidth="0.5" />
      </g>
      {/* ampli */}
      <rect x="64" y="108" width="28" height="22" rx="2" fill="#2b2b3d" stroke="#5a5a72" strokeWidth="1.4" />
      <circle cx="78" cy="120" r="7" fill="#1a1a2e" stroke="#5a5a72" strokeWidth="1.2" />
      <circle cx="70" cy="112" r="1.2" fill="#e8c56a" className="twinkle" />
      {/* notes qui flottent */}
      {[[40, 44], [58, 30], [72, 50], [50, 62]].map(([x, y], i) => (
        <g key={i} className="floaty" style={{ animationDelay: `${i * 0.8}s` }}>
          <circle cx={x} cy={y} r="2.4" fill="#e8c56a" />
          <rect x={x + 1.8} y={y - 10} width="1.4" height="10" fill="#e8c56a" />
          <path d={`M${x + 1.8} ${y - 10} q4 -2 5 2`} stroke="#e8c56a" strokeWidth="1.4" fill="none" />
        </g>
      ))}
    </>
  ),

  // Le garage de Manu — porte ouverte, mobylette bleue, caisse à outils
  manu: (
    <>
      <rect width="100" height="160" fill="#33333f" />
      {/* porte de garage relevée sur la nuit */}
      <rect x="10" y="10" width="80" height="52" fill="#12122a" />
      <Stars spots={[[24, 22, 0.5], [50, 16, 0.6], [72, 28, 0.45], [38, 34, 0.4]]} />
      <circle cx="76" cy="20" r="5" fill="#e8c56a" />
      {[10, 18, 26].map((y) => (
        <line key={y} x1="10" y1={y - 6} x2="90" y2={y - 6} stroke="#4a4a5c" strokeWidth="2" />
      ))}
      {/* la mobylette bleue */}
      <g transform="translate(24 96)">
        <circle cx="8" cy="30" r="9" fill="none" stroke="#2b2b3d" strokeWidth="3.4" />
        <circle cx="44" cy="30" r="9" fill="none" stroke="#2b2b3d" strokeWidth="3.4" />
        <path d="M8 30 L20 12 L38 12 L44 30" stroke="#3d5a8c" strokeWidth="4" fill="none" />
        <path d="M14 20 L34 20" stroke="#3d5a8c" strokeWidth="6" strokeLinecap="round" />
        <rect x="16" y="6" width="14" height="5" rx="2.5" fill="#5a789c" />
        <path d="M38 12 L42 4 L46 6" stroke="#2b2b3d" strokeWidth="2.4" fill="none" />
        <rect x="2" y="8" width="9" height="7" rx="2" fill="#8a6a3d" />
      </g>
      {/* caisse à outils + bidon */}
      <rect x="76" y="120" width="18" height="10" rx="1.5" fill="#b04a3a" />
      <rect x="82" y="116" width="6" height="4" fill="#b04a3a" />
      <rect x="6" y="134" width="10" height="14" rx="1.5" fill="#7a8a4a" />
      <rect x="8" y="130" width="3" height="5" fill="#7a8a4a" />
    </>
  ),

  // Le marché de Noélia — auvent rayé, guirlande, cagettes
  noelia: (
    <>
      <NightSky h={44} />
      <rect x="0" y="42" width="100" height="118" fill="#4a3830" />
      {/* auvent rayé */}
      <path d="M2 34 L98 34 L94 54 L6 54 Z" fill="#f5efd8" />
      {[6, 22, 38, 54, 70, 86].map((x, i) => (
        <path key={i} d={`M${x} 34 L${x + 8} 34 L${x + 7.4} 54 L${x - 0.6} 54 Z`} fill="#c85a4a" />
      ))}
      <path d="M2 34 L98 34 L98 38 L2 38 Z" fill="#e0d5b8" />
      {/* guirlande de fanions */}
      <path d="M0 62 Q50 72 100 62" stroke="#8a6a3d" strokeWidth="1.2" fill="none" />
      {[8, 24, 40, 56, 72, 88].map((x, i) => (
        <path key={i} d={`M${x} ${63 + Math.sin(x / 15) * 3} l3.6 0 l-1.8 6 Z`}
          fill={['#e8c56a', '#5a9aa0', '#c85a4a'][i % 3]} className="sway" style={{ animationDelay: `${i * 0.3}s` }} />
      ))}
      {/* étal : pots et cagettes */}
      <rect x="8" y="98" width="84" height="7" rx="2" fill="#8a6a3d" />
      <rect x="12" y="105" width="6" height="40" fill="#6a4a2e" />
      <rect x="82" y="105" width="6" height="40" fill="#6a4a2e" />
      {[[16, 90, '#b04a3a'], [26, 90, '#c8843c'], [36, 90, '#7a8a4a']].map(([x, y, c], i) => (
        <g key={i}>
          <rect x={x} y={y} width="7" height="9" rx="1.5" fill={c} />
          <rect x={x} y={y} width="7" height="3" rx="1.5" fill="#e8d3a8" />
        </g>
      ))}
      <rect x="52" y="86" width="22" height="12" rx="1" fill="#a8764a" />
      <path d="M52 86 h22 M55 86 v12 M61 86 v12 M67 86 v12" stroke="#8a5a30" strokeWidth="1" />
      {[[56, 84], [61, 82], [66, 84], [70, 83]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={i % 2 ? '#c8641e' : '#b04a3a'} />
      ))}
    </>
  ),

  // La rivière de Lo — méandres, pierres plates, lucioles, roseaux
  lo: (
    <>
      <NightSky h={54} to="#1e3038" />
      <rect x="0" y="52" width="100" height="108" fill="#2c3e30" />
      {/* la rivière qui serpente */}
      <path d="M-5 70 Q30 78 50 96 Q70 114 105 118 L105 160 L-5 160 Z" fill="#2e5a66" />
      <path d="M-5 76 Q30 84 48 100 Q68 118 105 124" stroke="#4a8a96" strokeWidth="2.4" fill="none" opacity="0.7" className="sway" />
      <path d="M-5 86 Q28 92 46 108 Q66 126 105 132" stroke="#4a8a96" strokeWidth="1.8" fill="none" opacity="0.5" className="sway" />
      {/* pierres plates — la scène de Lo */}
      {[[24, 96], [40, 108], [58, 120], [78, 130]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="7.5" ry="3.2" fill="#6a6a7a" />
      ))}
      {/* roseaux */}
      {[[8, 96], [14, 100], [88, 108], [94, 104]].map(([x, y], i) => (
        <g key={i} className="sway" style={{ animationDelay: `${i * 0.5}s` }}>
          <line x1={x} y1={y} x2={x} y2={y - 18} stroke="#4a6a3c" strokeWidth="1.6" />
          <ellipse cx={x} cy={y - 20} rx="1.6" ry="4" fill="#6a4a2e" />
        </g>
      ))}
      {/* lucioles */}
      <Stars spots={[[30, 80, 0.7], [70, 96, 0.6], [50, 70, 0.5], [84, 84, 0.55], [16, 116, 0.5]]} />
    </>
  ),

  // L'observatoire de Lana — coupole ouverte, télescope, ciel immense
  lana: (
    <>
      <NightSky h={100} from="#0c0c22" to="#1e1e3c" moon={false} />
      <Stars spots={[[10, 40, 0.6], [26, 52, 0.5], [44, 34, 0.7], [62, 48, 0.5], [82, 40, 0.65], [50, 60, 0.4], [70, 66, 0.5], [16, 68, 0.45], [90, 58, 0.5], [34, 72, 0.4]]} />
      {/* la Voie lactée */}
      <path d="M0 56 Q50 30 100 44" stroke="#8a8ab8" strokeWidth="10" opacity="0.16" fill="none" />
      {/* une étoile filante */}
      <line x1="60" y1="14" x2="74" y2="22" stroke="#f5efd8" strokeWidth="1" opacity="0.8" className="twinkle" />
      <circle cx="74" cy="22" r="1.2" fill="#f5efd8" className="twinkle" />
      {/* coupole ouverte */}
      <path d="M2 160 L2 118 Q2 92 50 92 Q98 92 98 118 L98 160 Z" fill="#3a3a52" />
      <path d="M30 96 L48 60 L60 64 L44 98 Z" fill="#2c2c40" />
      {/* télescope */}
      <g transform="rotate(-34 50 108)">
        <rect x="44" y="84" width="12" height="30" rx="4" fill="#8a6a3d" />
        <rect x="46" y="78" width="8" height="8" rx="2" fill="#5a4425" />
      </g>
      <path d="M42 120 L50 106 L58 120" stroke="#5a4425" strokeWidth="2.6" fill="none" />
      {/* bureau à cartes du ciel */}
      <rect x="66" y="122" width="28" height="5" rx="1.5" fill="#6a4a2e" />
      <rect x="70" y="114" width="18" height="8" rx="1" fill="#e8d3a8" />
      <path d="M73 118 l2 -2 2 2 M80 117 h5" stroke="#5a4425" strokeWidth="0.8" fill="none" />
    </>
  ),

  // La ménagerie de Marjo — grange, enclos, volière de Coco, foin
  marjo: (
    <>
      <NightSky h={58} to="#2c3626" />
      <rect x="0" y="56" width="100" height="104" fill="#42502e" />
      {/* grange */}
      <rect x="8" y="30" width="34" height="32" fill="#8c4632" />
      <path d="M5 32 L25 14 L45 32 Z" fill="#6a3424" />
      <rect x="20" y="44" width="10" height="18" fill="#4a2418" />
      <path d="M20 44 L30 62 M30 44 L20 62" stroke="#c8a45a" strokeWidth="1.4" />
      <circle cx="25" cy="26" r="4" fill="#f5efd8" opacity="0.9" />
      {/* enclos */}
      <g stroke="#8a6a3d" strokeWidth="2.2">
        <line x1="52" y1="76" x2="98" y2="76" />
        <line x1="52" y1="86" x2="98" y2="86" />
        {[56, 70, 84, 96].map((x) => (
          <line key={x} x1={x} y1="68" x2={x} y2="92" />
        ))}
      </g>
      {/* volière de Coco */}
      <g transform="translate(78 108)">
        <path d="M-10 22 Q-10 -6 0 -8 Q10 -6 10 22 Z" fill="none" stroke="#c8a45a" strokeWidth="1.8" />
        {[-6, -2, 2, 6].map((x) => (
          <line key={x} x1={x} y1={x % 4 === 0 ? -6 : -7.5} x2={x} y2="22" stroke="#c8a45a" strokeWidth="1" />
        ))}
        <line x1="-7" y1="8" x2="7" y2="8" stroke="#c8a45a" strokeWidth="1.4" />
        {/* Coco */}
        <g className="sway">
          <ellipse cx="0" cy="4" rx="3.4" ry="4.6" fill="#c85a4a" />
          <circle cx="0" cy="-2" r="2.6" fill="#c85a4a" />
          <path d="M2 -2.5 Q5 -2 4 0 Z" fill="#e8c56a" />
          <circle cx="-0.8" cy="-2.6" r="0.7" fill="#1a1a2e" />
          <path d="M-1.5 6 Q-4 10 -2 13" stroke="#5a9aa0" strokeWidth="1.6" fill="none" />
        </g>
      </g>
      {/* bottes de foin + empreintes */}
      <ellipse cx="16" cy="112" rx="11" ry="7" fill="#c8a45a" />
      <ellipse cx="30" cy="118" rx="8" ry="5.4" fill="#d4b46a" />
      <path d="M12 110 q4 -2 8 0 M24 116 q4 -2 8 0" stroke="#a8874a" strokeWidth="1" fill="none" />
      {[[46, 128], [52, 134], [58, 129], [64, 136]].map(([x, y], i) => (
        <g key={i} fill="#33402a">
          <circle cx={x} cy={y} r="1.4" />
          <circle cx={x + 2.4} cy={y - 1.6} r="0.8" />
          <circle cx={x - 2.4} cy={y - 1.6} r="0.8" />
        </g>
      ))}
    </>
  ),

  // La cabane des Mousquetaires — grand chêne, plateforme, lanterne, échelle de corde
  mousquetaires: (
    <>
      <NightSky h={160} to="#22222e" />
      {/* le grand chêne */}
      <path d="M38 160 L40 84 Q34 78 36 68 L46 74 L48 60 L54 74 L64 68 Q66 80 58 86 L62 160 Z" fill="#4a3422" />
      <circle cx="30" cy="52" r="18" fill="#3c5230" />
      <circle cx="56" cy="40" r="22" fill="#46603a" />
      <circle cx="78" cy="56" r="16" fill="#3c5230" />
      <circle cx="50" cy="62" r="14" fill="#42582e" />
      {/* la cabane */}
      <rect x="36" y="76" width="30" height="20" rx="2" fill="#7a5a3a" />
      <path d="M33 78 L51 64 L69 78 Z" fill="#8c6a42" />
      <rect x="46" y="84" width="9" height="12" fill="#4a3422" />
      <rect x="58" y="82" width="6" height="6" fill="#e8c56a" opacity="0.9" className="twinkle" />
      {/* pancarte + drapeau */}
      <rect x="30" y="88" width="12" height="7" rx="1" fill="#c8a45a" transform="rotate(-8 36 91)" />
      <line x1="66" y1="64" x2="66" y2="52" stroke="#4a3422" strokeWidth="1.6" />
      <path d="M66 52 L78 55 L66 59 Z" fill="#b04a3a" className="sway" />
      {/* échelle de corde + lanterne */}
      <g stroke="#c8a45a" strokeWidth="1.2">
        <path d="M46 96 Q45 126 47 152" fill="none" />
        <path d="M54 96 Q55 126 53 152" fill="none" />
        {[104, 114, 124, 134, 144].map((y) => (
          <line key={y} x1="45.5" y1={y} x2="54.5" y2={y} />
        ))}
      </g>
      <line x1="70" y1="96" x2="70" y2="104" stroke="#4a3422" strokeWidth="1" />
      <rect x="66.6" y="104" width="7" height="9" rx="2" fill="#2b2b3d" stroke="#8a6a3d" strokeWidth="1" className="sway" />
      <circle cx="70" cy="108.5" r="2.2" fill="#e8c56a" className="twinkle" />
    </>
  ),
}

// Décor générique (personnage inconnu) : la nuit du village
const DEFAULT_SCENE = (
  <>
    <NightSky h={110} />
    <path d="M0 104 Q25 96 50 102 T100 100 L100 160 L0 160 Z" fill="#20203a" />
    <path d="M0 120 Q30 112 60 118 T100 116 L100 160 L0 160 Z" fill="#262644" />
  </>
)

export default function SceneBackdrop({ characterId }) {
  return (
    <svg
      className="scene-backdrop"
      viewBox="0 0 100 160"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {SCENES[characterId] ?? DEFAULT_SCENE}
      {/* léger voile pour la lisibilité du texte */}
      <rect x="0" y="0" width="100" height="160" fill="#12121f" opacity="0.22" />
    </svg>
  )
}
