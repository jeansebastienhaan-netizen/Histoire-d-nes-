// Interprète du graphe JSON de dialogues (contrat de données du guide).
// Un chapitre = { id, character, nodes: { [nodeId]: node } }
// Nœuds :
//   texte     : { speaker, text, next }
//   choix     : { speaker, text, choices: [{ label, effects?, setFlags?, condition?, next }] }
//   mini-jeu  : { type: "minigame", game, config, onSuccess, onPartial, onFail }
//   récompense: { type: "reward", fragment?, sound?, next }
//   "END" comme identifiant de nœud termine la rencontre.

export const END = 'END'

export function getStartNode(chapter) {
  return chapter.start ?? 'start'
}

export function getNode(chapter, nodeId) {
  const node = chapter.nodes[nodeId]
  if (!node) throw new Error(`Nœud introuvable : ${chapter.id}/${nodeId}`)
  return node
}

export function nodeKind(node) {
  if (node.type === 'minigame') return 'minigame'
  if (node.type === 'reward') return 'reward'
  if (Array.isArray(node.choices) && node.choices.length > 0) return 'choice'
  return 'text'
}

// Applique les effets d'un choix sur le store et renvoie l'id du nœud suivant.
export function resolveChoice(choice, store) {
  if (choice.effects) store.applyEffects(choice.effects)
  if (choice.setFlags) store.setFlags(choice.setFlags)
  store.autoSave()
  return choice.next
}

// Applique un nœud récompense et renvoie l'id du nœud suivant.
export function resolveReward(node, store) {
  if (node.fragment) store.addFragment(node.fragment)
  if (node.sound) store.restoreSound(node.sound)
  if (node.setFlags) store.setFlags(node.setFlags)
  store.autoSave()
  return node.next
}

// Résout l'issue d'un mini-jeu ('success' | 'partial' | 'fail') vers le nœud suivant.
// L'échec n'est jamais bloquant : onFail doit toujours exister dans les données.
export function resolveMinigame(node, result) {
  const target =
    result === 'success' ? node.onSuccess
    : result === 'partial' ? (node.onPartial ?? node.onSuccess)
    : node.onFail
  return target
}
