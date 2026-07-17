import React, { useEffect, useMemo, useRef, useState } from 'react'
import Portrait from './Portrait.jsx'
import { CHARACTERS } from '../data/characters.js'
import { sfx } from '../engine/soundManager.js'

// Vitesse d'apparition du texte (caractères / seconde) selon le réglage.
const SPEEDS = [15, 28, 55, Infinity]
const PAGE_LEN = 170 // ~3 lignes à l'écran : les répliques longues sont découpées en bulles

function paginate(text) {
  const paras = text.split('\n')
  const pages = []
  let cur = ''
  for (const p of paras) {
    if (cur && (cur + '\n' + p).length > PAGE_LEN) {
      pages.push(cur)
      cur = p
    } else {
      cur = cur ? cur + '\n' + p : p
    }
    while (cur.length > PAGE_LEN) {
      // Découpe au dernier point/virgule/espace avant la limite.
      let cut = -1
      for (const sep of ['. ', '! ', '? ', '… ', ', ', ' ']) {
        const i = cur.lastIndexOf(sep, PAGE_LEN)
        if (i > cut) cut = i + sep.length - 1
      }
      if (cut <= 0) cut = PAGE_LEN
      pages.push(cur.slice(0, cut + 1).trim())
      cur = cur.slice(cut + 1).trim()
    }
  }
  if (cur) pages.push(cur)
  return pages.length ? pages : ['']
}

// Sépare une éventuelle didascalie initiale « (…) » du reste de la réplique.
function splitStage(page) {
  const m = page.match(/^\(([^)]+)\)\s*/)
  if (m) return { stage: m[1], body: page.slice(m[0].length) }
  return { stage: null, body: page }
}

export default function DialogueBox({ speaker, text, onDone, settings, soundOn }) {
  const pages = useMemo(() => paginate(text), [text])
  const [pageIdx, setPageIdx] = useState(0)
  const [shown, setShown] = useState(0)
  const timerRef = useRef(null)
  const page = pages[pageIdx]
  const { stage, body } = useMemo(() => splitStage(page), [page])
  const full = (stage ? `(${stage}) ` : '') + body
  const cps = SPEEDS[settings.textSpeed] ?? 28

  useEffect(() => {
    setShown(cps === Infinity ? full.length : 0)
    if (cps === Infinity) return undefined
    const started = performance.now()
    const tick = () => {
      const n = Math.floor(((performance.now() - started) / 1000) * cps)
      setShown((prev) => (n >= full.length ? full.length : Math.max(prev, n)))
      if (n < full.length) timerRef.current = requestAnimationFrame(tick)
    }
    timerRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(timerRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIdx, text])

  useEffect(() => {
    setPageIdx(0)
  }, [text])

  const complete = shown >= full.length

  const handleTap = () => {
    if (soundOn) sfx.advance()
    if (!complete) {
      cancelAnimationFrame(timerRef.current)
      setShown(full.length)
      return
    }
    if (pageIdx < pages.length - 1) setPageIdx(pageIdx + 1)
    else onDone()
  }

  const char = CHARACTERS[speaker] || CHARACTERS.narrateur
  const isNarrator = speaker === 'narrateur'
  const visible = full.slice(0, shown)
  const visStage = stage && visible.length > 0 ? visible.slice(0, Math.min(visible.length, stage.length + 2)) : ''
  const visBody = stage ? visible.slice(Math.min(visible.length, stage.length + 3)) : visible

  return (
    <button type="button" className={`dialogue ${isNarrator ? 'dialogue--narrator' : ''}`} onClick={handleTap}>
      {!isNarrator && (
        <div className="dialogue__portrait">
          <Portrait spec={char.portrait} size={64} />
        </div>
      )}
      <div className="dialogue__content">
        {!isNarrator && (
          <div className="dialogue__name" style={{ color: char.color }}>
            {char.name}
          </div>
        )}
        <div className="dialogue__text">
          {stage && <em className="dialogue__stage">{visStage}</em>}
          {stage && visBody ? ' ' : ''}
          {visBody.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {i > 0 && <br />}
              {line}
            </React.Fragment>
          ))}
        </div>
        <div className={`dialogue__cue ${complete ? 'dialogue__cue--on' : ''}`}>▾</div>
      </div>
    </button>
  )
}
