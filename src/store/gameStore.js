import { create } from 'zustand'
import { loadSave, writeSave, clearSave } from './save.js'
import { SCENE_ORDER } from '../data/scenes/index.js'

const DEFAULT_SETTINGS = {
  textSize: 1, // 0 petit / 1 normal / 2 grand
  textSpeed: 1, // 0 lent / 1 normal / 2 rapide / 3 instantané
  vibrations: true,
  sound: true,
  narrated: false, // mode raconté : les mini-jeux se résolvent en version narrative
  daltonien: false, // Mastermind : lueurs doublées de formes (toujours actives, renforcées ici)
  fontComfort: false, // police sans-serif au lieu de la police pixel
}

const FRESH = {
  screen: 'title', // title | map | scene | fin
  sceneId: null,
  nodeId: null,
  flags: {},
  rep: { coeur: 0, ruse: 0, determination: 0 },
  completed: [],
  backlog: [],
  lastHook: '',
  endingId: null,
  memorySnapshot: null, // mode souvenir : on rejoue sans conséquence
  soundBannerSeen: false,
}

const saved = loadSave()

export const useGame = create((set, get) => ({
  ...FRESH,
  settings: DEFAULT_SETTINGS,
  ...(saved || {}),
  settings: { ...DEFAULT_SETTINGS, ...((saved && saved.settings) || {}) },

  setSettings(patch) {
    set((s) => ({ settings: { ...s.settings, ...patch } }))
    persist(get)
  },

  markSoundBanner() {
    set({ soundBannerSeen: true })
    persist(get)
  },

  newGame() {
    clearSave()
    set({
      ...FRESH,
      settings: get().settings,
      soundBannerSeen: get().soundBannerSeen,
      screen: 'scene',
      sceneId: SCENE_ORDER[0],
      nodeId: 'start',
    })
    persist(get)
  },

  continueGame() {
    const s = get()
    if (s.sceneId && s.nodeId) set({ screen: 'scene' })
    else if (s.completed.length > 0) set({ screen: 'map' })
    else get().newGame()
    persist(get)
  },

  goToMap() {
    set({ screen: 'map' })
    persist(get)
  },

  startNextScene() {
    const s = get()
    const next = SCENE_ORDER.find((id) => !s.completed.includes(id))
    if (!next) return
    set({ screen: 'scene', sceneId: next, nodeId: 'start' })
    persist(get)
  },

  setNode(nodeId) {
    set({ nodeId })
    persist(get)
  },

  applyNode(node) {
    if (!node) return
    set((s) => {
      const flags = { ...s.flags }
      if (node.setFlags) for (const f of node.setFlags) flags[f] = true
      const rep = { ...s.rep }
      if (node.effects) for (const k of Object.keys(node.effects)) rep[k] = (rep[k] || 0) + node.effects[k]
      return { flags, rep }
    })
    persist(get)
  },

  pushBacklog(entry) {
    set((s) => {
      const backlog = [...s.backlog, entry].slice(-200)
      const patch = { backlog }
      if (entry.speaker === 'narrateur') patch.lastHook = entry.text
      return patch
    })
  },

  completeScene(sceneId) {
    set((s) => {
      const completed = s.completed.includes(sceneId) ? s.completed : [...s.completed, sceneId]
      return { completed, sceneId: null, nodeId: null, screen: 'map' }
    })
    const s = get()
    if (s.memorySnapshot) get().endMemory()
    persist(get)
  },

  finishGame(endingId) {
    set({ endingId, sceneId: null, nodeId: null, screen: 'fin' })
    persist(get)
  },

  // Mode souvenir : rejouer une scène terminée, sans conséquence.
  startMemory(sceneId) {
    const s = get()
    const snapshot = {
      flags: { ...s.flags },
      rep: { ...s.rep },
      completed: [...s.completed],
      sceneId: s.sceneId,
      nodeId: s.nodeId,
      screen: s.screen,
      endingId: s.endingId,
    }
    set({ memorySnapshot: snapshot, screen: 'scene', sceneId, nodeId: 'start' })
  },

  endMemory() {
    const snap = get().memorySnapshot
    if (!snap) return
    set({ ...snap, memorySnapshot: null, screen: 'map' })
    persist(get)
  },

  resetAll() {
    clearSave()
    set({ ...FRESH, settings: get().settings, soundBannerSeen: get().soundBannerSeen })
  },
}))

function persist(get) {
  const s = get()
  if (s.memorySnapshot) return // en mode souvenir, on ne sauve rien
  writeSave({
    screen: s.screen === 'scene' ? 'scene' : s.screen,
    sceneId: s.sceneId,
    nodeId: s.nodeId,
    flags: s.flags,
    rep: s.rep,
    completed: s.completed,
    backlog: s.backlog.slice(-60),
    lastHook: s.lastHook,
    endingId: s.endingId,
    settings: s.settings,
    soundBannerSeen: s.soundBannerSeen,
  })
}
