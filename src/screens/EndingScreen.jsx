import { useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { playVillageSong } from '../engine/soundManager.js'
import Avatar from '../components/Avatar.jsx'
import endingsData from '../data/endings.json'
import fragmentsData from '../data/fragments.json'
import charactersData from '../data/characters.json'

const NAMES = {
  ...Object.fromEntries(charactersData.characters.map((c) => [c.id, c.name])),
  veilleur: 'Le Veilleur',
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

const PHASES = ['tilleul', 'veilleur', 'voeu', 'chant', 'fin', 'epilogues', 'merci']

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
          <h2 className="notebook-title">Sous le grand tilleul</h2>
          <p className="dialogue-text ending-text">
            Il est là.
            <br /><br />
            Assis contre le tronc du grand tilleul, immense et voûté, en chaussons gris
            dont l'un est à moitié mâchouillé : le Veilleur. Autour de lui, des centaines
            de boîtes en fer soigneusement empilées — toute la musique du village, rangée,
            étiquetée, réparée. Il tient sa tasse de camomille sans la boire.
            Quand le village s'approche, il baisse la tête, comme un géant qui voudrait
            être plus petit.
            <br /><br />
            Mamy s'avance la première. Elle ouvre son carnet : les treize fragments dorés
            y ont repris leur place, bord contre bord. Elle fait signe : c'est à toi de lire.
          </p>
          <button className="btn btn-primary" onClick={next}>Lire le vœu</button>
        </div>
      )}

      {phase === 'veilleur' && (
        <div className="ending-block">
          <h2 className="notebook-title">Le Veilleur</h2>
          <p className="dialogue-text ending-text">
            Alors le Veilleur parle — et sa voix est le premier son qu'il ne s'est jamais
            volé à lui-même, rouillée comme une porte de grenier :
            <br /><br />
            « Neuf cents ans que je range vos bruits chaque nuit, que je les répare,
            que je les accorde, que je les ressors à l'aube. L'horloge. La rivière.
            Vos rires. Personne ne le savait, et c'était très bien ainsi. Mais mardi… »
            <br /><br />
            Il tourne sa tasse entre ses doigts géants. « Mardi, j'ai traversé le village,
            et tout le monde parlait. Personne n'écoutait. Alors j'ai tout rangé une bonne
            fois, et je suis allé me coucher. Ce n'était pas un vol. C'était… une bouderie.
            Une bouderie de neuf cents ans d'ancienneté, ça prend de la place, je vous
            l'accorde. » Il regarde le carnet de Mamy. « Ce vœu-là, je l'ai lu il y a
            soixante ans. C'est le plus beau bruit que ce village ait jamais fait.
            Relisez-le-moi. Et je rouvre tout. »
          </p>
          <button className="btn btn-primary" onClick={next}>Lui lire le vœu</button>
        </div>
      )}

      {phase === 'voeu' && (
        <div className="ending-block">
          <h2 className="notebook-title">Le vœu</h2>
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
            À la dernière syllabe, le Veilleur se lève de toute sa hauteur —
            et il ouvre les boîtes. Toutes. À pleines brassées, comme on sème.
            <br /><br />
            L'horloge de Mamy sonne. Le marteau de Xavier répond. La cloche,
            la guitare, la rivière, le ballon de Jules, le ron-ron de la mobylette,
            les rires de la cabane — tous les bruits du village se lèvent en même temps,
            comme un orchestre qui n'attendait que son chef. Et dans le ciel,
            l'Étoile du Berger se rallume, au premier sourire du Veilleur — Lana
            avait raison, et elle le fera remarquer pendant des années.
            <br /><br />
            Le Grand Silence est terminé.
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
          <h2 className="notebook-title">Dans le village, depuis ce jour…</h2>
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
            Merci d'avoir rendu sa voix au village.
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
