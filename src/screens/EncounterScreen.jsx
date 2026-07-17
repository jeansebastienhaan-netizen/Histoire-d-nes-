import { useMemo, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { getChapterForCharacter } from '../data/chapters/index.js'
import {
  END,
  getStartNode,
  getNode,
  nodeKind,
  resolveChoice,
  resolveReward,
  resolveMinigame,
} from '../engine/dialogueEngine.js'
import { availableChoices } from '../engine/conditions.js'
import DialogueBox from '../components/DialogueBox.jsx'
import ChoiceButtons from '../components/ChoiceButtons.jsx'
import Mistiflouk from '../components/Mistiflouk.jsx'
import SceneBackdrop from '../components/SceneBackdrop.jsx'
import Avatar from '../components/Avatar.jsx'
import LogicPuzzle from '../minigames/LogicPuzzle.jsx'
import RhythmTap from '../minigames/RhythmTap.jsx'
import DragPhysics from '../minigames/DragPhysics.jsx'
import TimedDialogue from '../minigames/TimedDialogue.jsx'
import AnimalRoundup from '../minigames/AnimalRoundup.jsx'

const MINIGAMES = { LogicPuzzle, RhythmTap, DragPhysics, TimedDialogue, AnimalRoundup }

export default function EncounterScreen() {
  const store = useGameStore()
  const chapter = useMemo(
    () => getChapterForCharacter(store.activeCharacterId),
    [store.activeCharacterId]
  )
  const [nodeId, setNodeId] = useState(() =>
    chapter ? getStartNode(chapter) : null
  )

  if (!chapter) {
    return (
      <div className="screen encounter-screen">
        <SceneBackdrop characterId={null} />
        <DialogueBox
          speaker="carnet"
          text="Cette page du carnet est encore blanche… L'histoire arrive bientôt."
          showNext
          onNext={store.goToMap}
        />
      </div>
    )
  }

  // Avance vers un nœud en résolvant au passage les nœuds automatiques (récompenses).
  const advance = (targetId) => {
    let id = targetId
    while (id !== END) {
      const node = getNode(chapter, id)
      if (nodeKind(node) === 'reward') {
        id = resolveReward(node, store)
      } else {
        store.autoSave()
        setNodeId(id)
        return
      }
    }
    // Fin de la rencontre : le chapitre n'est acquis que si son fragment l'est.
    const fragmentNeeded = chapter.completeOnFragment
    const fragments = useGameStore.getState().fragments
    if (!fragmentNeeded || fragments.includes(fragmentNeeded)) {
      store.completeChapter(chapter.chapter)
    }
    store.autoSave()
    store.goToMap()
  }

  const node = getNode(chapter, nodeId)
  const kind = nodeKind(node)

  if (kind === 'minigame') {
    const Game = MINIGAMES[node.game]
    if (!Game) {
      // mini-jeu inconnu : on ne bloque jamais, on suit la branche d'échec
      advance(node.onFail ?? node.onSuccess)
      return null
    }
    return (
      <div className="screen encounter-screen">
        <SceneBackdrop characterId={chapter.character} />
        <div className="minigame-panel">
          <Game
            key={nodeId}
            config={node.config ?? {}}
            onEnd={(result) => advance(resolveMinigame(node, result))}
          />
        </div>
        <Mistiflouk />
      </div>
    )
  }

  const choices =
    kind === 'choice' ? availableChoices(node.choices, store) : []
  const isCarnet = node.speaker === 'carnet'

  return (
    <div className="screen encounter-screen">
      <SceneBackdrop characterId={chapter.character} />
      {/* le personnage du chapitre, en pied dans son décor */}
      <div className={`standing-figure ${isCarnet ? 'standing-dim' : 'standing-talking'}`}>
        <Avatar id={chapter.character} size={150} />
      </div>
      <DialogueBox
        key={nodeId}
        speaker={node.speaker}
        text={node.text}
        showNext={kind === 'text'}
        onNext={() => advance(node.next)}
      />
      {kind === 'choice' && (
        <ChoiceButtons
          choices={choices}
          onChoose={(choice) => advance(resolveChoice(choice, store))}
        />
      )}
      <Mistiflouk />
    </div>
  )
}
