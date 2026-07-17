import { create } from 'zustand'
import { loadSave, writeSave, clearSave } from './save.js'
import { playFragmentFound, playSoundRestored } from '../engine/soundManager.js'

const initialProgress = {
  currentChapter: 1,
  reputation: { coeur: 0, ruse: 0, determination: 0 },
  flags: [],
  fragments: [],
  completedChapters: [],
  soundsRestored: [],
}

export const useGameStore = create((set, get) => ({
  ...initialProgress,
  screen: 'title', // title | map | encounter | notebook | ending
  activeCharacterId: null,

  // --- navigation d'écrans ---
  newGame() {
    clearSave()
    set({ ...initialProgress, screen: 'map', activeCharacterId: null })
  },
  continueGame() {
    const saved = loadSave()
    if (saved) set({ ...saved, screen: 'map', activeCharacterId: null })
    else set({ ...initialProgress, screen: 'map' })
  },
  goToMap: () => set({ screen: 'map', activeCharacterId: null }),
  openNotebook: () => set({ screen: 'notebook' }),
  startEncounter: (characterId) =>
    set({ screen: 'encounter', activeCharacterId: characterId }),
  showEnding: () => set({ screen: 'ending' }),

  // --- effets de jeu (appelés par le moteur de dialogue) ---
  applyEffects(effects = {}) {
    const rep = { ...get().reputation }
    for (const axis of ['coeur', 'ruse', 'determination']) {
      if (typeof effects[axis] === 'number') rep[axis] += effects[axis]
    }
    set({ reputation: rep })
  },
  setFlags(flags = []) {
    const current = new Set(get().flags)
    flags.forEach((f) => current.add(f))
    set({ flags: [...current] })
  },
  addFragment(fragmentId) {
    if (!get().fragments.includes(fragmentId)) {
      set({ fragments: [...get().fragments, fragmentId] })
      playFragmentFound()
    }
  },
  restoreSound(soundId) {
    if (!get().soundsRestored.includes(soundId)) {
      playSoundRestored(get().soundsRestored.length)
      set({ soundsRestored: [...get().soundsRestored, soundId] })
    }
  },
  completeChapter(chapterNumber) {
    const done = new Set(get().completedChapters)
    done.add(chapterNumber)
    set({
      completedChapters: [...done],
      currentChapter: Math.max(get().currentChapter, chapterNumber + 1),
    })
  },

  // Sauvegarde automatique : appelée par le moteur après chaque nœud résolu.
  autoSave() {
    writeSave(get())
  },
}))
