// Le retour progressif du son est une mécanique du jeu : chaque bruit retrouvé
// joue un petit motif synthétisé (WebAudio — aucun fichier, donc hors-ligne par nature).
// Tout est enveloppé de try/catch : le son ne doit jamais casser le jeu.

let ctx = null

function audioContext() {
  try {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext
      if (!AC) return null
      ctx = new AC()
    }
    if (ctx.state === 'suspended') ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function note(c, freq, start, duration, volume = 0.12, type = 'sine') {
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, c.currentTime + start)
  gain.gain.linearRampToValueAtTime(volume, c.currentTime + start + 0.02)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(c.currentTime + start)
  osc.stop(c.currentTime + start + duration + 0.05)
}

// Gamme pentatonique douce : chaque bruit retrouvé a son propre motif.
const PENTATONIC = [392, 440, 494, 587, 659] // sol la si ré mi

export function playSoundRestored(index = 0) {
  const c = audioContext()
  if (!c) return
  const root = PENTATONIC[index % PENTATONIC.length]
  note(c, root, 0, 0.9)
  note(c, root * 1.5, 0.18, 0.9)
  note(c, root * 2, 0.36, 1.4, 0.1)
}

export function playFragmentFound() {
  const c = audioContext()
  if (!c) return
  note(c, 587, 0, 0.5, 0.09, 'triangle')
  note(c, 880, 0.12, 0.8, 0.09, 'triangle')
}

export function playMistiflouk() {
  const c = audioContext()
  if (!c) return
  note(c, 196, 0, 0.15, 0.1, 'sine')
  note(c, 165, 0.12, 0.15, 0.1, 'sine')
  note(c, 220, 0.24, 0.25, 0.08, 'sine')
}

// La grande fin : le village chante à nouveau.
export function playVillageSong() {
  const c = audioContext()
  if (!c) return
  const melody = [392, 440, 494, 587, 494, 659, 587, 784]
  melody.forEach((f, i) => note(c, f, i * 0.28, 0.8, 0.1))
}
