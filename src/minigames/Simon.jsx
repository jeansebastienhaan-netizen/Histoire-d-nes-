import React, { useEffect, useRef, useState } from 'react'
import { sfx } from '../engine/soundManager.js'

// Le Simon des échos (Xavier, scène 10).
// Quatre pads : la salle joue une séquence, on la rejoue. Chaque manche éteint un faux tunnel.
const VARIANTS = {
  coeur: { from: 3, to: 7, tempo: 650, pulse: true },
  ruse: { from: 3, to: 5, tempo: 480, pulse: false },
  det: { from: 3, to: 8, tempo: 650, pulse: false },
}

const FREQS = [392, 494, 587, 740]
const COLORS = ['#5aa06a', '#5a7fb0', '#c9a04f', '#a05a8a']

function tone(freq) {
  try {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return
    if (!tone.ctx) tone.ctx = new AC()
    const a = tone.ctx
    if (a.state === 'suspended') a.resume()
    const o = a.createOscillator()
    const g = a.createGain()
    o.type = 'triangle'
    o.frequency.value = freq
    g.gain.setValueAtTime(0.0001, a.currentTime)
    g.gain.exponentialRampToValueAtTime(0.07, a.currentTime + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + 0.3)
    o.connect(g).connect(a.destination)
    o.start()
    o.stop(a.currentTime + 0.35)
  } catch {
    /* silencieux */
  }
}

export default function Simon({ variant, paused, assist, onError, onEnd, settings }) {
  const cfg = VARIANTS[variant] || VARIANTS.det
  const [seq, setSeq] = useState(() =>
    Array.from({ length: cfg.from }, () => Math.floor(Math.random() * 4))
  )
  const [playingIdx, setPlayingIdx] = useState(-1)
  const [inputIdx, setInputIdx] = useState(0)
  const [listening, setListening] = useState(false)
  const [errors, setErrors] = useState(0)
  const [flash, setFlash] = useState(-1)
  const freeTry = useRef(true)
  const perfect = useRef(true)
  const timeouts = useRef([])

  const playSeq = (s) => {
    setListening(false)
    setInputIdx(0)
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
    s.forEach((pad, i) => {
      timeouts.current.push(
        setTimeout(() => {
          setPlayingIdx(pad)
          if (settings.sound) tone(FREQS[pad])
          timeouts.current.push(setTimeout(() => setPlayingIdx(-1), cfg.tempo * 0.6))
          if (i === s.length - 1)
            timeouts.current.push(setTimeout(() => setListening(true), cfg.tempo * 0.8))
        }, 500 + i * cfg.tempo)
      )
    })
  }

  useEffect(() => {
    playSeq(seq)
    return () => timeouts.current.forEach(clearTimeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seq])

  const tap = (pad) => {
    if (!listening || paused) return
    setFlash(pad)
    setTimeout(() => setFlash(-1), 180)
    if (settings.sound) tone(FREQS[pad])
    if (pad === seq[inputIdx]) {
      const next = inputIdx + 1
      if (next >= seq.length) {
        if (seq.length >= cfg.to) {
          onEnd(perfect.current && errors === 0 ? 'perfect' : 'success')
          return
        }
        setSeq((s) => [...s, Math.floor(Math.random() * 4)])
      } else {
        setInputIdx(next)
      }
    } else {
      perfect.current = false
      if (freeTry.current) {
        freeTry.current = false
        playSeq(seq)
        return
      }
      onError()
      setErrors((e) => {
        const n = e + 1
        if (n >= 3) {
          onEnd('fail')
          return n
        }
        playSeq(seq)
        return n
      })
    }
  }

  const nextPad = cfg.pulse || assist ? seq[inputIdx] : -1
  const round = seq.length - cfg.from + 1
  const totalRounds = cfg.to - cfg.from + 1

  return (
    <div className="game game--simon">
      <div className="game__status">
        Échos annulés : {round - 1}/{totalRounds} · Erreurs : {errors}/3
      </div>
      <div className="simon__pads">
        {[0, 1, 2, 3].map((p) => (
          <button
            key={p}
            type="button"
            className={[
              'simon__pad',
              playingIdx === p || flash === p ? 'simon__pad--lit' : '',
              listening && nextPad === p ? 'simon__pad--pulse' : '',
            ].join(' ')}
            style={{ background: COLORS[p] }}
            onClick={() => tap(p)}
          />
        ))}
      </div>
      <div className="game__msg">{listening ? 'À toi : rejoue la séquence.' : 'La salle joue... écoute.'}</div>
    </div>
  )
}
