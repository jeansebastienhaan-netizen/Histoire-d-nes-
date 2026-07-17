// Valide les graphes de scènes : chaque référence de nœud doit exister,
// chaque scène doit atteindre un nœud end/fin, chaque mini-jeu doit être connu.
// Usage : node scripts/validate-scenes.mjs
import { SCENES, SCENE_ORDER } from '../src/data/scenes/index.js'

const KNOWN_GAMES = [
  'mikado',
  'flamme',
  'mastermind',
  'planche',
  'coffre',
  'simon',
  'rythme',
  'labyrinthe',
  'taquin',
  'inventaire',
  'coordination',
  'calme',
]

let errors = 0
const err = (msg) => {
  errors++
  console.error('✗ ' + msg)
}

for (const id of SCENE_ORDER) {
  const scene = SCENES[id]
  if (!scene) {
    err(`${id} absent de SCENES`)
    continue
  }
  const nodes = scene.nodes
  const ref = (from, target) => {
    if (target && !nodes[target]) err(`${id}/${from} → nœud inconnu « ${target} »`)
  }
  if (!nodes[scene.start]) err(`${id} : nœud de départ « ${scene.start} » inconnu`)

  let terminal = false
  for (const [nid, n] of Object.entries(nodes)) {
    if (n.type === 'end' || n.type === 'fin') {
      terminal = true
      continue
    }
    if (n.type === 'choice') {
      if (!n.choices || n.choices.length < 2) err(`${id}/${nid} : choix avec moins de 2 options`)
      for (const c of n.choices || []) ref(nid, c.next)
    } else if (n.type === 'branch') {
      for (const c of n.cases || []) ref(nid, c.next)
      ref(nid, n.else)
    } else if (n.type === 'minigame') {
      if (!KNOWN_GAMES.includes(n.game)) err(`${id}/${nid} : mini-jeu inconnu « ${n.game} »`)
      if (!n.narrated) err(`${id}/${nid} : mode raconté manquant (obligatoire dès la v1)`)
      ref(nid, n.onSuccess)
      ref(nid, n.onFail)
      ref(nid, n.onPerfect)
    } else if (n.type === 'hold') {
      ref(nid, n.next)
    } else {
      if (!n.text) err(`${id}/${nid} : nœud texte sans texte`)
      if (!n.speaker) err(`${id}/${nid} : nœud texte sans speaker`)
      ref(nid, n.next)
    }
  }
  if (!terminal) err(`${id} : aucun nœud end/fin`)

  // Accessibilité depuis start.
  const seen = new Set()
  const stack = [scene.start]
  while (stack.length) {
    const nid = stack.pop()
    if (!nid || seen.has(nid) || !nodes[nid]) continue
    seen.add(nid)
    const n = nodes[nid]
    if (n.type === 'choice') for (const c of n.choices || []) stack.push(c.next)
    else if (n.type === 'branch') {
      for (const c of n.cases || []) stack.push(c.next)
      stack.push(n.else)
    } else if (n.type === 'minigame') stack.push(n.onSuccess, n.onFail, n.onPerfect)
    else stack.push(n.next)
  }
  for (const nid of Object.keys(nodes))
    if (!seen.has(nid)) err(`${id}/${nid} : nœud inaccessible depuis start`)
}

if (errors) {
  console.error(`\n${errors} erreur(s).`)
  process.exit(1)
}
console.log(`✓ ${SCENE_ORDER.length} scènes valides.`)
