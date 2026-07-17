// Valide l'intégrité des graphes de dialogue :
// - toutes les destinations (next / choices / mini-jeux) existent ou valent END
// - tous les nœuds sont atteignables depuis start
// - chaque mini-jeu a bien onFail (l'échec n'est jamais bloquant)
// - chaque chapitre a un nœud reward dont le fragment correspond à completeOnFragment
// - les fragments et les mini-jeux référencés existent
// Usage : node scripts/validate-chapters.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const chaptersDir = join(root, 'src', 'data', 'chapters')
const fragments = JSON.parse(readFileSync(join(root, 'src', 'data', 'fragments.json'), 'utf8'))
const MINIGAMES = [
  'LogicPuzzle', 'RhythmTap', 'DragPhysics', 'TimedDialogue', 'AnimalRoundup',
  'CodeLock', 'MatchPuzzle', 'SimonSays', 'SteadyHand',
]

let errors = 0
const fail = (msg) => {
  console.error('✗', msg)
  errors++
}

const files = readdirSync(chaptersDir).filter((f) => f.endsWith('.json')).sort()

for (const file of files) {
  const chapter = JSON.parse(readFileSync(join(chaptersDir, file), 'utf8'))
  const ids = new Set(Object.keys(chapter.nodes))
  const targets = []
  const reachable = new Set()
  const queue = [chapter.start ?? 'start']

  const check = (from, to) => {
    targets.push(to)
    if (to !== 'END' && !ids.has(to)) fail(`${file}: ${from} → nœud inexistant "${to}"`)
  }

  for (const [id, node] of Object.entries(chapter.nodes)) {
    if (node.type === 'minigame') {
      if (!MINIGAMES.includes(node.game)) fail(`${file}: ${id} → mini-jeu inconnu "${node.game}"`)
      if (!node.onFail) fail(`${file}: ${id} → mini-jeu sans onFail (échec bloquant interdit)`)
      for (const key of ['onSuccess', 'onPartial', 'onFail'])
        if (node[key]) check(id, node[key])
    } else if (node.type === 'reward') {
      if (node.fragment && !fragments.fragments[node.fragment])
        fail(`${file}: ${id} → fragment inconnu "${node.fragment}"`)
      check(id, node.next)
    } else if (Array.isArray(node.choices)) {
      if (!node.choices.length) fail(`${file}: ${id} → nœud de choix vide`)
      node.choices.forEach((c, i) => {
        if (!c.label) fail(`${file}: ${id}.choices[${i}] → label manquant`)
        check(id, c.next)
      })
    } else {
      if (!node.text) fail(`${file}: ${id} → nœud texte sans texte`)
      check(id, node.next)
    }
  }

  // atteignabilité
  while (queue.length) {
    const id = queue.pop()
    if (id === 'END' || reachable.has(id)) continue
    reachable.add(id)
    const node = chapter.nodes[id]
    if (!node) continue
    const outs = []
    if (node.type === 'minigame') outs.push(node.onSuccess, node.onPartial, node.onFail)
    else if (Array.isArray(node.choices)) outs.push(...node.choices.map((c) => c.next))
    else outs.push(node.next)
    outs.filter(Boolean).forEach((o) => queue.push(o))
  }
  for (const id of ids)
    if (!reachable.has(id)) fail(`${file}: nœud "${id}" injoignable depuis start`)

  // le fragment de complétion doit être décerné quelque part
  if (chapter.completeOnFragment) {
    const awarded = Object.values(chapter.nodes).some(
      (n) => n.type === 'reward' && n.fragment === chapter.completeOnFragment
    )
    if (!awarded)
      fail(`${file}: completeOnFragment "${chapter.completeOnFragment}" jamais décerné`)
  } else {
    fail(`${file}: completeOnFragment manquant`)
  }

  console.log(`✓ ${file} — ${ids.size} nœuds, tous atteignables`)
}

// chaque fragment de la liste doit être décerné par exactement un chapitre
const awardedFragments = files.flatMap((f) => {
  const c = JSON.parse(readFileSync(join(chaptersDir, f), 'utf8'))
  return Object.values(c.nodes)
    .filter((n) => n.type === 'reward' && n.fragment)
    .map((n) => n.fragment)
})
for (const id of fragments.order) {
  const count = awardedFragments.filter((f) => f === id).length
  if (count !== 1) fail(`fragment "${id}" décerné ${count} fois (attendu : 1)`)
}

if (errors) {
  console.error(`\n${errors} erreur(s) dans les graphes de dialogue.`)
  process.exit(1)
}
console.log(`\nTous les graphes sont valides (${files.length} chapitres, ${fragments.order.length} fragments).`)
