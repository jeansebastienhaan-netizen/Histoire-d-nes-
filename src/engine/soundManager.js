// Petits sons de synthèse (WebAudio) : aucun fichier, tout embarqué.
let ctx = null
let enabled = true

function ac() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

export function setSoundEnabled(v) {
  enabled = v
}

function tone(freq, dur = 0.12, type = 'triangle', gain = 0.08, when = 0) {
  const a = ac()
  if (!a || !enabled) return
  const o = a.createOscillator()
  const g = a.createGain()
  o.type = type
  o.frequency.value = freq
  g.gain.setValueAtTime(0.0001, a.currentTime + when)
  g.gain.exponentialRampToValueAtTime(gain, a.currentTime + when + 0.015)
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + when + dur)
  o.connect(g).connect(a.destination)
  o.start(a.currentTime + when)
  o.stop(a.currentTime + when + dur + 0.05)
}

export const sfx = {
  tap: () => tone(660, 0.05, 'square', 0.03),
  advance: () => tone(440, 0.06, 'triangle', 0.04),
  choice: () => tone(520, 0.09, 'triangle', 0.05),
  pickup: () => {
    tone(523, 0.08, 'triangle', 0.05)
    tone(784, 0.1, 'triangle', 0.05, 0.08)
  },
  success: () => {
    tone(523, 0.1, 'triangle', 0.06)
    tone(659, 0.1, 'triangle', 0.06, 0.1)
    tone(784, 0.16, 'triangle', 0.06, 0.2)
  },
  soft: () => tone(330, 0.12, 'sine', 0.04),
  click: () => tone(200, 0.04, 'square', 0.05),
  // Les trois notes de Mistiflouk — le motif du jeu.
  mistiflouk: () => {
    tone(880, 0.16, 'sine', 0.06)
    tone(988, 0.16, 'sine', 0.06, 0.2)
    tone(740, 0.28, 'sine', 0.06, 0.4)
  },
  mistifloukFaible: () => {
    tone(880, 0.14, 'sine', 0.02)
    tone(988, 0.14, 'sine', 0.02, 0.24)
    tone(740, 0.26, 'sine', 0.02, 0.48)
  },
}

export function vibrate(pattern, settings) {
  if (settings && settings.vibrations === false) return
  if (navigator.vibrate) navigator.vibrate(pattern)
}
