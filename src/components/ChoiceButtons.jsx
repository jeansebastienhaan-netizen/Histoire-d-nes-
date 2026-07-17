import React, { useMemo } from 'react'
import { sfx } from '../engine/soundManager.js'

// Choix : 2-3 boutons pleine largeur, empilés en bas, ordre mélangé
// (sauf shuffle:false) pour ne pas créer de « bouton du haut = gentil ».
export default function ChoiceButtons({ node, onChoose, evalCond, soundOn }) {
  const options = useMemo(() => {
    const list = node.choices
      .map((c, i) => ({ ...c, _i: i }))
      .filter((c) => evalCond(c.condition))
    if (node.shuffle === false) return list
    const arr = [...list]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node])

  return (
    <div className="choices">
      {node.prompt && <div className="choices__prompt">{node.prompt}</div>}
      {options.map((c) => (
        <button
          key={c._i}
          type="button"
          className="choices__btn"
          onClick={() => {
            if (soundOn) sfx.choice()
            onChoose(c)
          }}
        >
          {c.label}
        </button>
      ))}
    </div>
  )
}
