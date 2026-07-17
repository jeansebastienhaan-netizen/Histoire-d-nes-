// Sauvegarde localStorage — JSON versionné, clé imposée par le guide.
const SAVE_KEY = 'grand-silence-save-v1'
const CURRENT_VERSION = 1

// Migrations : chaque entrée transforme une sauvegarde de version N vers N+1.
// Quand le format évolue, incrémenter CURRENT_VERSION et ajouter une fonction ici.
const MIGRATIONS = {
  // 1: (data) => ({ ...data, nouveauChamp: valeurParDefaut }),
}

export function loadSave() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return null
    let parsed = JSON.parse(raw)
    if (typeof parsed !== 'object' || parsed === null || !parsed.state) return null
    let version = parsed.version ?? 1
    while (version < CURRENT_VERSION) {
      const migrate = MIGRATIONS[version]
      if (!migrate) return null // migration manquante : on repart proprement
      parsed = { version: version + 1, state: migrate(parsed.state) }
      version += 1
    }
    return parsed.state
  } catch {
    return null
  }
}

export function writeSave(state) {
  try {
    const snapshot = {
      version: CURRENT_VERSION,
      state: {
        currentChapter: state.currentChapter,
        reputation: state.reputation,
        flags: state.flags,
        fragments: state.fragments,
        completedChapters: state.completedChapters,
        soundsRestored: state.soundsRestored,
      },
    }
    localStorage.setItem(SAVE_KEY, JSON.stringify(snapshot))
  } catch {
    // stockage plein ou indisponible : on ne bloque jamais le jeu
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY)
  } catch {
    /* noop */
  }
}

export function hasSave() {
  return loadSave() !== null
}
