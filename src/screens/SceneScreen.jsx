import React, { useCallback, useEffect, useState } from 'react'
import { useGame } from '../store/gameStore.js'
import { SCENES } from '../data/scenes/index.js'
import { evalCond, resolveVariant } from '../engine/conditions.js'
import { sfx } from '../engine/soundManager.js'
import DialogueBox from '../components/DialogueBox.jsx'
import ChoiceButtons from '../components/ChoiceButtons.jsx'
import HoldStill from '../components/HoldStill.jsx'
import SceneBackdrop from '../components/SceneBackdrop.jsx'
import MinigameHost from '../minigames/MinigameHost.jsx'
import Portrait from '../components/Portrait.jsx'
import { CHARACTERS } from '../data/characters.js'

export default function SceneScreen() {
  const g = useGame()
  const scene = SCENES[g.sceneId]
  const [journalOpen, setJournalOpen] = useState(false)
  const [narratedDone, setNarratedDone] = useState(false)
  const nodeId = g.nodeId || scene.start
  const node = scene.nodes[nodeId]

  const advance = useCallback(
    (targetId) => {
      let id = targetId
      let n = scene.nodes[id]
      // Les nœuds branch se résolvent sans rendu, sur l'état le plus frais
      // (un choix qui pose un flag peut enchaîner directement sur un branch).
      while (n && n.type === 'branch') {
        const fresh = useGame.getState()
        const hit = (n.cases || []).find((c) => evalCond(c.if, fresh))
        id = hit ? hit.next : n.else
        n = scene.nodes[id]
      }
      if (!n) return
      if (n.type === 'end') {
        useGame.getState().completeScene(scene.id)
        return
      }
      if (n.type === 'fin') {
        const flags = useGame.getState().flags
        const endingId = flags.fin_offrir ? 'offrir' : flags.fin_refermer ? 'refermer' : 'garder'
        useGame.getState().finishGame(endingId)
        return
      }
      useGame.getState().applyNode(n)
      if (n.sound && g.settings.sound && sfx[n.sound]) sfx[n.sound]()
      setNarratedDone(false)
      useGame.getState().setNode(id)
    },
    [scene, g]
  )

  // Si on arrive (sauvegarde) sur un nœud branch, le résoudre.
  useEffect(() => {
    if (node && node.type === 'branch') advance(nodeId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeId])

  if (!node || node.type === 'branch') return <div className="screen" />

  const onTextDone = () => {
    useGame.getState().pushBacklog({ speaker: node.speaker, text: node.text })
    advance(node.next)
  }

  const onChoose = (choice) => {
    useGame.getState().pushBacklog({ speaker: 'alois', text: choice.label })
    useGame.getState().applyNode(choice)
    advance(choice.next)
  }

  const lampOn = !!(g.flags.js_convaincu_coeur || g.flags.js_convaincu_ruse || g.flags.js_convaincu_det)

  let content = null
  if (node.type === 'choice') {
    content = (
      <ChoiceButtons node={node} onChoose={onChoose} evalCond={(c) => evalCond(c, g)} soundOn={g.settings.sound} />
    )
  } else if (node.type === 'hold') {
    content = <HoldStill text={node.text} duration={node.duration} onDone={() => advance(node.next)} />
  } else if (node.type === 'minigame') {
    if (g.settings.narrated && node.narrated && !narratedDone) {
      // Mode raconté : résolution automatique narrative (obligatoire dès la v1).
      content = (
        <DialogueBox
          speaker="narrateur"
          text={node.narrated}
          settings={g.settings}
          soundOn={g.settings.sound}
          onDone={() => {
            useGame.getState().pushBacklog({ speaker: 'narrateur', text: node.narrated })
            setNarratedDone(true)
            advance(node.onSuccess)
          }}
        />
      )
    } else {
      const variant = resolveVariant(node.variantFrom, g.flags)
      content = (
        <MinigameHost
          key={nodeId}
          game={node.game}
          variant={variant}
          familyMode={!!g.flags.mode_famille}
          hints={node.hints || []}
          settings={g.settings}
          onEnd={(result) => {
            if (result === 'quit') {
              // En mode souvenir, quitter restaure l'état d'avant le souvenir.
              if (useGame.getState().memorySnapshot) useGame.getState().endMemory()
              else useGame.getState().goToMap()
              return
            }
            if (result === 'perfect') advance(node.onPerfect || node.onSuccess)
            else if (result === 'fail') advance(node.onFail || node.onSuccess)
            else advance(node.onSuccess)
          }}
        />
      )
    }
  } else {
    content = (
      <DialogueBox
        key={nodeId}
        speaker={node.speaker}
        text={node.text}
        settings={g.settings}
        soundOn={g.settings.sound}
        onDone={onTextDone}
      />
    )
  }

  return (
    <div className={`screen scene font-${g.settings.textSize} ${g.settings.fontComfort ? 'font-comfort' : ''}`}>
      <SceneBackdrop place={scene.place} lampOn={lampOn} />
      <header className="scene__top">
        <button type="button" className="scene__journal" onClick={() => setJournalOpen(true)} aria-label="Journal">
          📖
        </button>
        {g.memorySnapshot && (
          <button type="button" className="btn btn--small" onClick={() => useGame.getState().endMemory()}>
            Quitter le souvenir
          </button>
        )}
      </header>
      <div className="scene__stage" />
      <div className="scene__bottom">{content}</div>

      {journalOpen && (
        <div className="overlay overlay--journal" role="dialog">
          <div className="journal">
            <h2>Ce qui a été dit</h2>
            <div className="journal__list">
              {g.backlog.slice(-60).map((e, i) => {
                const c = CHARACTERS[e.speaker] || CHARACTERS.narrateur
                return (
                  <div key={i} className="journal__entry">
                    {e.speaker !== 'narrateur' && (
                      <span className="journal__who" style={{ color: c.color }}>
                        <Portrait spec={c.portrait} size={24} /> {c.name}
                      </span>
                    )}
                    <span className={e.speaker === 'narrateur' ? 'journal__narr' : ''}>{e.text}</span>
                  </div>
                )
              })}
            </div>
            <button type="button" className="btn btn--primary" onClick={() => setJournalOpen(false)}>
              Revenir à l'histoire
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
