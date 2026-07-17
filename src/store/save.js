// Sauvegarde localStorage : JSON versionné, migrations à l'ancienneté.
const KEY = 'mistiflouk-save-v1'
const VERSION = 1

export function loadSave() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (!data || typeof data !== 'object') return null
    return migrate(data)
  } catch {
    return null
  }
}

function migrate(data) {
  // v1 : format initial. Les futures versions transforment data ici, cran par cran.
  if (data.version === VERSION) return data.state || null
  return null
}

export function writeSave(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ version: VERSION, state }))
  } catch {
    // stockage plein ou indisponible : la partie continue sans sauvegarde
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* rien */
  }
}
