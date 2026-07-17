import { useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { playVillageSong } from '../engine/soundManager.js'
import Avatar from '../components/Avatar.jsx'
import endingsData from '../data/endings.json'
import fragmentsData from '../data/fragments.json'
import charactersData from '../data/characters.json'

const NAMES = {
  ...Object.fromEntries(charactersData.characters.map((c) => [c.id, c.name])),
  etoile: 'Étincelle',
}

// Choisit une des 7 fins selon le profil de réputation :
// écarts faibles → harmonie ; un axe qui domine nettement → fin pure ;
// sinon → fin duo des deux axes de tête.
export function endingId(reputation) {
  const sorted = Object.entries(reputation).sort((a, b) => b[1] - a[1])
  const [top, mid, low] = sorted
  if (top[1] - low[1] <= 1) return 'harmonie'
  if (top[1] - mid[1] >= 2) return top[0]
  return [top[0], mid[0]].sort().join('_')
}

const PHASES = ['tilleul', 'etoile', 'voeu', 'chant', 'fin', 'epilogues', 'merci']

export default function EndingScreen() {
  const { reputation, goToMap, newGame } = useGameStore()
  const [phaseIndex, setPhaseIndex] = useState(0)
  const phase = PHASES[phaseIndex]
  const ending = endingsData.endings[endingId(reputation)]

  const next = () => {
    if (PHASES[phaseIndex + 1] === 'chant') playVillageSong()
    setPhaseIndex((i) => Math.min(i + 1, PHASES.length - 1))
  }

  return (
    <div className="screen ending-screen">
      {phase === 'tilleul' && (
        <div className="ending-block">
          <h2 className="notebook-title">La Nuit des Étoiles Filantes</h2>
          <p className="dialogue-text ending-text">
            Tout le village est là, sous le grand tilleul, autour du cratère devenu
            rampe de lancement (aménagement : les Mousquetaires ; coussins : Mamy ;
            beignets : Noélia). Au centre, Étincelle brille de ses treize éclats
            ressoudés, ronde et dorée comme une petite lune impatiente.
            <br /><br />
            Et là-haut, le ciel descend. Vraiment. Les étoiles semblent plus proches
            que jamais, et deux d'entre elles, juste au-dessus du tilleul, clignotent
            si fort qu'on dirait des phares. Ses parents. Ils sont venus la chercher.
            <br /><br />
            Lana consulte sa montre, ses calculs, puis sa montre : « Fenêtre de
            décollage dans dix minutes. Protocole, phase un : le vœu. »
          </p>
          <button className="btn btn-primary" onClick={next}>Approcher</button>
        </div>
      )}

      {phase === 'etoile' && (
        <div className="ending-block">
          <div className="standing-figure standing-talking" style={{ margin: '0 auto 12px' }}>
            <Avatar id="etoile" size={120} />
          </div>
          <h2 className="notebook-title">Étincelle</h2>
          <p className="dialogue-text ending-text">
            Alors Étincelle tinte — longuement, doucement. Mistiflouk vibre.
            Coco traduit en chantant. Lana valide scientifiquement. Et tout le monde
            comprend, parce qu'au fond, tout le monde parle étoile depuis le début :
            <br /><br />
            « Merci. Merci pour l'horloge, le phonographe, la citrouille, le miel,
            la berceuse, les poules. J'ai raté mon premier envol… et c'était la plus
            belle chute de toute l'histoire des étoiles. »
            <br /><br />
            Puis elle tinte trois notes plus graves, et Coco traduit, solennel :
            « La tradition est la tradition : une étoile filante réparée doit exaucer
            UN vœu avant de repartir. Vous êtes tout un village… alors j'ai le droit
            à un vœu de tout un village. Lisez-le-moi. »
          </p>
          <button className="btn btn-primary" onClick={next}>Lire le vœu du village</button>
        </div>
      )}

      {phase === 'voeu' && (
        <div className="ending-block">
          <h2 className="notebook-title">Le vœu du village</h2>
          <div className="wish-lines wish-final">
            {fragmentsData.order.map((id) => (
              <p key={id} className="wish-final-line">
                {fragmentsData.fragments[id].text}
              </p>
            ))}
          </div>
          <button className="btn btn-primary" onClick={next}>…</button>
        </div>
      )}

      {phase === 'chant' && (
        <div className="ending-block">
          <p className="dialogue-text ending-text ending-chant">
            À la dernière ligne du vœu, Étincelle se met à chanter — sa chanson
            entière, les treize notes — et tout le village chante avec elle,
            Coco en soliste, Cyril à la guitare, la rivière en percussions.
            <br /><br />
            Alors, portée par le chant, elle s'élève. Doucement d'abord, comme un
            ballon qu'on lâche. Puis de plus en plus vite, traçant dans la nuit une
            grande spirale dorée — un zigzag, évidemment, un zigzag magnifique —
            jusqu'aux deux étoiles qui clignotent, qui la reçoivent, qui l'entourent.
            <br /><br />
            Et pendant un instant, trois étoiles brillent ensemble au-dessus du
            village, si fort que la nuit ressemble au matin.
          </p>
          <button className="btn btn-primary" onClick={next}>Continuer</button>
        </div>
      )}

      {phase === 'fin' && (
        <div className="ending-block">
          <h2 className="notebook-title">{ending.title}</h2>
          <p className="dialogue-text ending-text">{ending.text}</p>
          <button className="btn btn-primary" onClick={next}>Et ensuite ?</button>
        </div>
      )}

      {phase === 'epilogues' && (
        <div className="ending-block">
          <h2 className="notebook-title">Dans le village, depuis cette nuit-là…</h2>
          <div className="epilogues">
            {endingsData.epilogues.map((e) => (
              <div key={e.from} className="epilogue-item">
                <Avatar id={e.from} size={44} />
                <div>
                  <span className="epilogue-name">{NAMES[e.from] ?? e.from}</span>
                  <p>{e.text}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary" onClick={next}>Continuer</button>
        </div>
      )}

      {phase === 'merci' && (
        <div className="ending-block ending-merci">
          <h2 className="title-main">Fin</h2>
          <p className="title-tagline">
            Merci d'avoir ramené Étincelle chez elle.
          </p>
          <div className="title-buttons">
            <button className="btn btn-primary" onClick={goToMap}>
              Se promener dans le village
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm('Recommencer toute l’histoire depuis le début ?')) newGame()
              }}
            >
              Revivre l'histoire
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
