// Carte du village en pixel-art rétro (façon RPG ancienne génération).
// Basse définition : tuiles de 16 px dessinées au pixel, canvas 240×352
// agrandi en CSS avec image-rendering: pixelated.

export const TILE = 16
export const COLS = 15
export const ROWS = 22
export const W = COLS * TILE
export const H = ROWS * TILE

// ---------- la carte en ASCII ----------
// ^ sapin · t arbre · . herbe · , touffes · # chemin · ~ eau · % champs
const MAP = [
  '^^^^^^...^tt.~~',
  '^......#.....~~',
  '^......#.....~~',
  '..###########~~',
  '^^^....#....,~~',
  '^^^....#..,..~~',
  '^^^^...#.....~~',
  '^^^....#.....~~',
  '..###########~~',
  '.......#.....~~',
  '.......#.....~~',
  '.......#.....~~',
  '.......#....,~~',
  '%%%%%..#.....~~',
  '%%%%%..######~~',
  '%%%%%..#....~~~',
  '%%%%%..#...~~~~',
  '.......#...~~~~',
  '.......#..,~~~~',
  '.......#...~~~~',
  '.......#..~~~~~',
  ',,.....#..~~~~~',
]

// ---------- palette ----------
const C = {
  grass: '#7ab54a', grassD: '#699e3f', grassL: '#8ec95c',
  path: '#d9b878', pathD: '#c2a05e', pathL: '#e8cf96',
  water: '#4a90c8', waterL: '#7ab8e0', waterD: '#3a78ac',
  soil: '#8a6642', soilD: '#6f4f30', sprout: '#4e8c3a', sproutL: '#66aa4a',
  trunk: '#7a5230', trunkD: '#5c3c20',
  pine: '#2e6b3a', pineD: '#235430', pineL: '#3f8248',
  leaf: '#4e8c4a', leafD: '#3a7038', leafL: '#63a55c',
  wall: '#e8d0a8', wallD: '#c9af84', roofR: '#c85a4a', roofRD: '#a44234',
  roofB: '#5a78c8', roofBD: '#41599e', roofG: '#5a9a62', roofGD: '#417a49',
  roofP: '#9a6ab0', roofPD: '#7a4e8e', roofO: '#d89040', roofOD: '#b47026',
  door: '#6f4f30', win: '#fce8a0', winD: '#b8a050',
  fence: '#a87848', fenceD: '#83592e',
  stone: '#9a9aa8', stoneD: '#77778a',
  gold: '#f0c050', goldD: '#c89830',
  skin: '#f0c8a0', skinD: '#d8a878',
  white: '#f8f8f0', ink: '#2b2b3d', red: '#c84a3a',
}

const px = (ctx, x, y, w, h, color) => {
  ctx.fillStyle = color
  ctx.fillRect(x, y, w, h)
}
// petit hash déterministe pour varier les tuiles
const hash = (x, y) => ((x * 73856093) ^ (y * 19349663)) >>> 0

// ---------- tuiles ----------
function tGrass(ctx, x, y) {
  px(ctx, x, y, TILE, TILE, C.grass)
  const h = hash(x, y)
  px(ctx, x + (h % 11), y + ((h >> 3) % 11), 2, 1, C.grassD)
  px(ctx, x + ((h >> 5) % 12), y + ((h >> 8) % 12), 1, 2, C.grassL)
}
function tTuft(ctx, x, y) {
  tGrass(ctx, x, y)
  px(ctx, x + 3, y + 9, 1, 4, C.grassD); px(ctx, x + 5, y + 8, 1, 5, C.leafD)
  px(ctx, x + 7, y + 10, 1, 3, C.grassD); px(ctx, x + 10, y + 8, 1, 5, C.leafD)
  px(ctx, x + 12, y + 10, 1, 3, C.grassD)
  const h = hash(x, y)
  if (h % 3 === 0) { px(ctx, x + 11, y + 4, 2, 2, '#e86a5a'); px(ctx, x + 11, y + 3, 2, 1, '#f0907a') }
  if (h % 3 === 1) px(ctx, x + 2, y + 3, 2, 2, '#f0e060')
}
function tPath(ctx, x, y, map) {
  px(ctx, x, y, TILE, TILE, C.path)
  const h = hash(x, y)
  px(ctx, x + (h % 12), y + ((h >> 4) % 12), 2, 2, C.pathD)
  px(ctx, x + ((h >> 6) % 13), y + ((h >> 9) % 13), 1, 1, C.pathL)
  const at = (cx, cy) => (MAP[cy] ?? '')[cx] === '#'
  const cx = x / TILE, cy = y / TILE
  if (!at(cx, cy - 1)) px(ctx, x, y, TILE, 2, C.pathL)
  if (!at(cx, cy + 1)) px(ctx, x, y + TILE - 2, TILE, 2, C.pathD)
  if (!at(cx - 1, cy)) px(ctx, x, y, 2, TILE, C.pathL)
  if (!at(cx + 1, cy)) px(ctx, x + TILE - 2, y, 2, TILE, C.pathD)
}
function tWater(ctx, x, y, frame) {
  px(ctx, x, y, TILE, TILE, C.water)
  const h = hash(x, y)
  const o = frame % 2 === 0 ? 0 : 3
  px(ctx, x + ((h % 8) + o) % 12, y + 3 + ((h >> 4) % 5), 4, 1, C.waterL)
  px(ctx, x + (((h >> 6) % 9) + o) % 12, y + 10 + ((h >> 9) % 4), 3, 1, C.waterD)
}
function tPine(ctx, x, y) {
  tGrass(ctx, x, y)
  px(ctx, x + 7, y + 12, 3, 3, C.trunkD)
  px(ctx, x + 3, y + 8, 11, 4, C.pineD)
  px(ctx, x + 4, y + 5, 9, 4, C.pine)
  px(ctx, x + 6, y + 2, 5, 4, C.pine)
  px(ctx, x + 7, y + 1, 3, 2, C.pineL)
  px(ctx, x + 4, y + 8, 2, 1, C.pineL); px(ctx, x + 6, y + 5, 2, 1, C.pineL)
}
function tTree(ctx, x, y) {
  tGrass(ctx, x, y)
  px(ctx, x + 7, y + 11, 3, 4, C.trunk)
  px(ctx, x + 2, y + 4, 12, 7, C.leafD)
  px(ctx, x + 3, y + 2, 10, 8, C.leaf)
  px(ctx, x + 4, y + 2, 5, 3, C.leafL)
}
function tCrops(ctx, x, y) {
  px(ctx, x, y, TILE, TILE, C.soil)
  px(ctx, x, y + 4, TILE, 2, C.soilD)
  px(ctx, x, y + 11, TILE, 2, C.soilD)
  const h = hash(x, y)
  for (let i = 0; i < 3; i++) {
    const sx = x + 2 + i * 5 + (h >> i) % 2
    px(ctx, sx, y + 1, 2, 3, C.sprout)
    px(ctx, sx, y + 8, 2, 3, C.sproutL)
    px(ctx, sx + 1, y + 14, 1, 2, C.sprout)
  }
}

const TILES = {
  '.': tGrass, ',': tTuft, '#': tPath, '~': tWater,
  '^': tPine, t: tTree, '%': tCrops,
}

// ---------- bâtiments ----------
function house(ctx, tx, ty, roof, roofD, opts = {}) {
  const x = tx * TILE, y = ty * TILE
  const w = (opts.w ?? 2) * TILE, hgt = (opts.h ?? 2) * TILE
  // murs
  px(ctx, x + 1, y + 12, w - 2, hgt - 13, C.wall)
  px(ctx, x + 1, y + hgt - 3, w - 2, 2, C.wallD)
  // toit
  px(ctx, x, y + 2, w, 11, roof)
  px(ctx, x, y + 11, w, 2, roofD)
  px(ctx, x + 2, y, w - 4, 3, roof)
  px(ctx, x + 2, y + 3, w - 4, 2, roofD === roof ? roof : roof)
  // porte + fenêtre
  px(ctx, x + 4, y + hgt - 10, 6, 9, C.door)
  px(ctx, x + 5, y + hgt - 9, 4, 7, C.trunk)
  if (w > 24) {
    px(ctx, x + w - 10, y + hgt - 12, 6, 6, C.win)
    px(ctx, x + w - 10, y + hgt - 12, 6, 1, C.winD)
    px(ctx, x + w - 8, y + hgt - 12, 1, 6, C.winD)
  }
}
function drawSign(ctx, x, y, color) {
  px(ctx, x, y, 8, 6, color)
  px(ctx, x + 1, y + 1, 6, 4, C.white)
}

const BUILDINGS = {
  oxane(ctx) { // bibliothèque — toit violet + enseigne livre
    house(ctx, 1, 1, C.roofP, C.roofPD, { w: 2, h: 2 })
    px(ctx, 18, 20, 6, 4, C.white); px(ctx, 20, 20, 1, 4, C.roofPD)
  },
  noelia(ctx) { // étal de marché — auvent rayé
    const x = 4 * TILE, y = 1 * TILE
    px(ctx, x + 1, y + 10, 30, 14, C.trunk)
    px(ctx, x + 2, y + 12, 28, 8, C.wall)
    for (let i = 0; i < 8; i++) px(ctx, x + i * 4, y + 2, 4, 8, i % 2 ? C.red : C.white)
    px(ctx, x, y + 9, 32, 2, C.wallD)
    px(ctx, x + 4, y + 14, 5, 4, '#e8a030'); px(ctx, x + 12, y + 14, 5, 4, '#c84a3a'); px(ctx, x + 20, y + 14, 5, 4, '#7ab54a')
  },
  mousquetaires(ctx) { // cabane dans le grand arbre
    const x = 10 * TILE, y = 0
    px(ctx, x + 12, y + 26, 8, 20, C.trunkD)
    px(ctx, x, y + 2, 32, 18, C.leafD)
    px(ctx, x + 3, y, 26, 14, C.leaf)
    px(ctx, x + 6, y, 12, 6, C.leafL)
    px(ctx, x + 8, y + 10, 16, 12, C.trunk)
    px(ctx, x + 10, y + 12, 5, 6, C.door)
    px(ctx, x + 18, y + 12, 4, 4, C.win)
    px(ctx, x + 24, y + 4, 6, 4, C.red) // fanion
  },
  alois(ctx) { // haute maison au grenier, dans la clairière
    house(ctx, 2, 5, C.roofO, C.roofOD, { w: 2, h: 2 })
    px(ctx, 44, 84, 6, 6, C.win); px(ctx, 46, 84, 2, 6, C.winD) // lucarne ronde-ish
  },
  cyril(ctx) { // toit bleu + note
    house(ctx, 4, 7, C.roofB, C.roofBD, { w: 2, h: 2 })
    px(ctx, 92, 116, 2, 6, C.gold); px(ctx, 90, 120, 3, 3, C.gold)
  },
  jules(ctx) { // terrain : but + ballon
    const x = 9 * TILE, y = 4 * TILE
    px(ctx, x, y + 2, 2, 16, C.white); px(ctx, x + 20, y + 2, 2, 16, C.white)
    px(ctx, x, y, 22, 2, C.white)
    px(ctx, x + 4, y + 4, 14, 1, '#d8d8e0'); px(ctx, x + 4, y + 8, 14, 1, '#d8d8e0')
    px(ctx, x + 8, y + 22, 6, 6, C.white); px(ctx, x + 10, y + 24, 2, 2, C.ink)
  },
  lana(ctx) { // observatoire — dôme
    const x = 10 * TILE, y = 7 * TILE
    px(ctx, x + 2, y + 12, 28, 18, C.stone)
    px(ctx, x + 2, y + 28, 28, 2, C.stoneD)
    px(ctx, x + 4, y + 2, 24, 12, C.roofB)
    px(ctx, x + 8, y, 16, 4, C.roofB)
    px(ctx, x + 14, y, 4, 12, C.gold) // fente du télescope
    px(ctx, x + 12, y + 18, 8, 12, C.door)
  },
  mamy(ctx) { // cottage toit rouge + cheminée
    house(ctx, 5, 9, C.roofR, C.roofRD, { w: 2, h: 2 })
    px(ctx, 102, 140, 5, 8, C.stoneD)
    px(ctx, 103, 137, 3, 3, '#d8d8e0')
  },
  xavier(ctx) { // atelier — appentis + scie
    const x = 1 * TILE, y = 10 * TILE
    px(ctx, x, y + 8, 30, 22, C.trunk)
    px(ctx, x - 1, y + 2, 32, 8, C.roofG)
    px(ctx, x - 1, y + 8, 32, 2, C.roofGD)
    px(ctx, x + 4, y + 14, 8, 16, C.door)
    px(ctx, x + 18, y + 12, 9, 3, C.stone) // scie enseigne
    px(ctx, x + 18, y + 15, 9, 1, C.stoneD)
  },
  papy(ctx) { // cabane à outils au bord des champs
    const x = 0, y = 12 * TILE
    px(ctx, x + 2, y + 8, 20, 14, C.trunk)
    px(ctx, x, y + 2, 24, 8, C.roofG); px(ctx, x, y + 8, 24, 2, C.roofGD)
    px(ctx, x + 8, y + 12, 7, 10, C.door)
  },
  manu(ctx) { // garage — large porte rayée
    const x = 8 * TILE, y = 14 * TILE + 8
    px(ctx, x, y + 6, 40, 18, C.stone)
    px(ctx, x - 1, y, 42, 8, C.roofB); px(ctx, x - 1, y + 6, 42, 2, C.roofBD)
    px(ctx, x + 4, y + 10, 24, 14, '#b8b8c4')
    px(ctx, x + 4, y + 13, 24, 1, C.stoneD); px(ctx, x + 4, y + 17, 24, 1, C.stoneD); px(ctx, x + 4, y + 21, 24, 1, C.stoneD)
    px(ctx, x + 32, y + 12, 5, 5, C.red) // bidon
  },
  marjo(ctx) { // grange rouge au coin de l'enclos
    const x = 3 * TILE, y = 16 * TILE + 4
    px(ctx, x + 1, y + 10, 28, 16, '#a04a38')
    px(ctx, x - 1, y + 2, 32, 10, C.roofRD); px(ctx, x + 2, y, 26, 4, C.roofRD)
    px(ctx, x + 10, y + 14, 10, 12, C.door)
    px(ctx, x + 11, y + 15, 8, 10, C.trunkD)
    px(ctx, x + 12, y + 16, 6, 8, '#4a2418')
    px(ctx, x + 4, y + 12, 5, 5, C.win)
  },
  lo(ctx) { // pierres plates au bord du lac
    const x = 10 * TILE + 8, y = 16 * TILE
    ;[[0, 4], [10, 10], [20, 4], [28, 12]].forEach(([dx, dy]) => {
      px(ctx, x + dx, y + dy, 8, 5, C.stone)
      px(ctx, x + dx, y + dy + 4, 8, 1, C.stoneD)
    })
    px(ctx, x - 4, y + 14, 2, 8, C.leafD); px(ctx, x - 2, y + 12, 1, 10, C.trunk) // roseaux
  },
}

// le grand tilleul (centre du village) — doré quand le vœu est complet
function tilleul(ctx, allFragments) {
  const x = 8 * TILE + 8, y = 9 * TILE + 8
  px(ctx, x + 10, y + 22, 6, 10, C.trunkD)
  const leafD = allFragments ? C.goldD : C.leafD
  const leaf = allFragments ? C.gold : C.leaf
  const leafL = allFragments ? '#f8dc88' : C.leafL
  px(ctx, x, y + 8, 26, 14, leafD)
  px(ctx, x + 2, y + 3, 22, 14, leaf)
  px(ctx, x + 5, y, 16, 8, leaf)
  px(ctx, x + 6, y + 2, 8, 5, leafL)
}

// ---------- l'enclos de Marjo (clôture + animaux visibles) ----------
function enclosure(ctx) {
  const post = (tx, ty) => {
    const x = tx * TILE, y = ty * TILE
    px(ctx, x + 6, y + 4, 3, 10, C.fence)
    px(ctx, x + 6, y + 12, 3, 2, C.fenceD)
  }
  const railH = (tx, ty) => px(ctx, tx * TILE, ty * TILE + 6, TILE, 2, C.fence)
  const railV = (tx, ty) => px(ctx, tx * TILE + 7, ty * TILE, 2, TILE, C.fence)
  for (let cx = 3; cx <= 9; cx++) {
    if (cx !== 7) { railH(cx, 18); post(cx, 18) } // porte au chemin (col 7)
    railH(cx, 21); post(cx, 21)
  }
  for (let cy = 18; cy <= 21; cy++) {
    railV(3, cy); railV(9, cy)
  }
  post(3, 19); post(9, 19); post(3, 21); post(9, 21)
}

function animal(ctx, x, y, kind, frame) {
  const bob = frame % 2
  if (kind === 'goat') {
    px(ctx, x, y + 3 - bob, 9, 5, '#d8c8a8')
    px(ctx, x + 7, y - bob, 4, 4, '#d8c8a8')
    px(ctx, x + 8, y - 2 - bob, 1, 2, C.trunkD); px(ctx, x + 10, y - 2 - bob, 1, 2, C.trunkD)
    px(ctx, x + 1, y + 8 - bob, 1, 2, '#b8a888'); px(ctx, x + 6, y + 8 - bob, 1, 2, '#b8a888')
  } else if (kind === 'goose') {
    px(ctx, x, y + 2 + bob, 7, 4, C.white)
    px(ctx, x + 5, y - 2 + bob, 3, 4, C.white)
    px(ctx, x + 8, y - 1 + bob, 2, 2, '#e8a030')
    px(ctx, x + 2, y + 6 + bob, 1, 2, '#e8a030'); px(ctx, x + 4, y + 6 + bob, 1, 2, '#e8a030')
  } else if (kind === 'rabbit') {
    px(ctx, x, y + 2, 5, 4, '#e8e8e0')
    px(ctx, x + 1, y - 2 + bob, 1, 3, '#e8e8e0'); px(ctx, x + 3, y - 2 + bob, 1, 3, '#e8e8e0')
  } else if (kind === 'chicken') {
    px(ctx, x, y + 2 + bob, 5, 4, '#e8d8b8')
    px(ctx, x + 3, y + bob, 3, 3, '#e8d8b8')
    px(ctx, x + 5, y + 1 + bob, 1, 1, '#e8a030')
    px(ctx, x + 3, y - 1 + bob, 1, 1, C.red)
  }
}

// ---------- personnages (petits PNJ pixel) ----------
// palette par personnage : [chapeau/cheveux, haut]
const NPC_COLORS = {
  mamy: ['#d8d8e0', '#9a6ab0'], alois: ['#8a5a30', '#7a5a3a'],
  xavier: ['#6a4a2e', '#c85a4a'], papy: ['#e8d080', '#5a78c8'],
  jules: ['#3d6a4a', '#e8e8e0'], oxane: ['#4a3428', '#8c5a9a'],
  cyril: ['#c85a4a', '#2b2b3d'], manu: ['#c85a4a', '#41599e'],
  noelia: ['#f0c050', '#e07a5a'], lo: ['#2b2b3d', '#5aa888'],
  lana: ['#3d3d63', '#46466e'], marjo: ['#c8a45a', '#8a9a5a'],
  mousquetaires: ['#5a78c8', '#c85a4a'],
}

function npc(ctx, x, y, id, frame) {
  const [hat, shirt] = NPC_COLORS[id] ?? ['#888', '#888']
  const bob = (hash(x, y) + frame) % 4 === 0 ? 1 : 0
  px(ctx, x + 2, y + 12, 2, 3, C.ink); px(ctx, x + 6, y + 12, 2, 3, C.ink)
  px(ctx, x + 1, y + 6 - bob, 8, 7, shirt)
  px(ctx, x + 2, y + 1 - bob, 6, 6, C.skin)
  px(ctx, x + 1, y - 1 - bob, 8, 3, hat)
  px(ctx, x + 2, y - 2 - bob, 6, 2, hat)
  px(ctx, x + 3, y + 4 - bob, 1, 1, C.ink); px(ctx, x + 6, y + 4 - bob, 1, 1, C.ink)
}

function trio(ctx, x, y, frame) {
  const cols = [['#c85a4a', '#5a78c8'], ['#3d6a4a', '#e8d080'], ['#5a78c8', '#c85a4a']]
  cols.forEach(([hat, shirt], i) => {
    const dx = x + i * 9 - 6, dy = y + (i === 1 ? -3 : 0)
    const bob = (frame + i) % 4 === 0 ? 1 : 0
    px(ctx, dx + 1, dy + 8 - bob, 6, 5, shirt)
    px(ctx, dx + 1, dy + 3 - bob, 5, 5, C.skin)
    px(ctx, dx, dy + 1 - bob, 7, 3, hat)
    px(ctx, dx + 6, dy - 1 - bob, 2, 3, '#f0e060') // plume
  })
}

export function drawHero(ctx, x, y, walking, frame, facing) {
  const step = walking ? frame % 2 : 0
  // ombre
  px(ctx, x + 1, y + 14, 8, 2, 'rgba(0,0,0,0.25)')
  // jambes
  px(ctx, x + 2, y + 11 + (step ? 1 : 0), 2, 4 - (step ? 1 : 0), '#3d3d5c')
  px(ctx, x + 6, y + 11 + (step ? 0 : 1), 2, 4 - (step ? 0 : 1), '#3d3d5c')
  // corps + sacoche
  px(ctx, x + 1, y + 5, 8, 7, '#c8843c')
  px(ctx, x + (facing >= 0 ? 6 : 1), y + 8, 3, 3, '#7a5a3a')
  // tête + casquette
  px(ctx, x + 2, y, 6, 6, C.skin)
  px(ctx, x + 1, y - 2, 8, 3, '#3d6a4a')
  px(ctx, x + (facing >= 0 ? 7 : -1), y, 3, 2, '#3d6a4a')
  px(ctx, x + (facing >= 0 ? 4 : 3), y + 2, 1, 1, C.ink)
  px(ctx, x + (facing >= 0 ? 6 : 5), y + 2, 1, 1, C.ink)
}

// ---------- zones interactives (coordonnées en tuiles) ----------
export const ZONES = {
  oxane: { x: 2, y: 2.6 },
  noelia: { x: 5, y: 2.6 },
  mousquetaires: { x: 11, y: 2.8 },
  alois: { x: 3, y: 7.2 },
  cyril: { x: 5, y: 9.2 },
  jules: { x: 10, y: 5.8 },
  lana: { x: 11, y: 9.6 },
  mamy: { x: 6, y: 11.2 },
  xavier: { x: 2, y: 12.4 },
  papy: { x: 2.5, y: 14.6 },
  manu: { x: 10, y: 16.4 },
  lo: { x: 11.2, y: 17.6 },
  marjo: { x: 5, y: 19.6 },
}
export const TILLEUL = { x: 9.3, y: 11.4 }
export const HERO_START = { x: 7, y: 16 }

// position d'un PNJ à côté de son lieu (en pixels)
const NPC_SPOTS = {
  oxane: [26, 40], noelia: [100, 38], alois: [66, 96], cyril: [98, 130],
  jules: [140, 76], lana: [156, 140], mamy: [82, 168], xavier: [44, 178],
  papy: [38, 226], manu: [122, 250], lo: [176, 270], marjo: [76, 300],
}

function lockIcon(ctx, x, y) {
  px(ctx, x, y + 3, 8, 6, C.stone)
  px(ctx, x + 1, y + 1, 1, 2, C.stone); px(ctx, x + 6, y + 1, 1, 2, C.stone)
  px(ctx, x + 2, y, 4, 1, C.stone)
  px(ctx, x + 3, y + 5, 2, 2, C.stoneD)
}
function noteIcon(ctx, x, y) {
  px(ctx, x, y + 4, 3, 3, C.gold)
  px(ctx, x + 2, y, 1, 5, C.gold)
  px(ctx, x + 2, y, 3, 1, C.gold)
}

// ---------- rendu ----------
export function renderBase(ctx, frame) {
  for (let cy = 0; cy < ROWS; cy++) {
    for (let cx = 0; cx < COLS; cx++) {
      const ch = MAP[cy][cx]
      const painter = TILES[ch] ?? tGrass
      if (ch === '~') tWater(ctx, cx * TILE, cy * TILE, frame)
      else painter(ctx, cx * TILE, cy * TILE, MAP)
    }
  }
  enclosure(ctx)
  Object.values(BUILDINGS).forEach((draw) => draw(ctx))
}

// Étincelle dans son cratère, près du tilleul — elle grossit et brille
// à mesure qu'on lui rend ses éclats (0 → 13).
function drawStar(ctx, frame, count, total) {
  const x = 11.4 * TILE, y = 12.4 * TILE
  // le cratère
  px(ctx, x - 7, y + 3, 15, 4, C.soilD)
  px(ctx, x - 5, y + 2, 11, 3, C.soil)
  px(ctx, x - 9, y + 5, 4, 2, C.soilD); px(ctx, x + 6, y + 5, 4, 2, C.soilD)
  const t = count / total
  const glow = frame % 2 === 0 ? 1 : 0
  // halo qui grandit avec les éclats rendus
  if (t > 0.25) px(ctx, x - 4 - glow, y - 5 - glow, 9 + glow * 2, 9 + glow * 2, 'rgba(240,192,80,0.22)')
  if (t > 0.6) px(ctx, x - 6 - glow, y - 7 - glow, 13 + glow * 2, 13 + glow * 2, 'rgba(240,192,80,0.16)')
  // le corps de l'étoile (croix pixel + cœur)
  const body = t >= 1 ? '#f8dc88' : t > 0.5 ? C.gold : '#c8a45a'
  px(ctx, x - 1, y - 5, 3, 9, body)
  px(ctx, x - 4, y - 2, 9, 3, body)
  px(ctx, x - 2, y - 3, 5, 5, t >= 1 ? '#fff2c8' : '#e8d3a8')
  // yeux
  px(ctx, x - 1, y - 1, 1, 1, C.ink)
  px(ctx, x + 1, y - 1, 1, 1, C.ink)
  // étincelles quand complète
  if (t >= 1 && glow) {
    px(ctx, x - 8, y - 8, 1, 1, '#fff'); px(ctx, x + 8, y - 6, 1, 1, '#fff')
    px(ctx, x + 6, y - 10, 1, 1, '#fff')
  }
}

export function renderLife(ctx, frame, zoneStatus, fragmentCount = 0, total = 13) {
  const allFragments = fragmentCount >= total
  tilleul(ctx, allFragments)
  drawStar(ctx, frame, fragmentCount, total)
  // les habitants
  for (const [id, [x, y]] of Object.entries(NPC_SPOTS)) {
    npc(ctx, x, y, id, frame)
    const st = zoneStatus[id]
    if (st === 'locked') lockIcon(ctx, x + 1, y - 12)
    else if (st === 'done') noteIcon(ctx, x + 2, y - 11)
  }
  trio(ctx, 178, 40, frame)
  const stM = zoneStatus.mousquetaires
  if (stM === 'locked') lockIcon(ctx, 180, 24)
  else if (stM === 'done') noteIcon(ctx, 182, 25)
  // les animaux de l'enclos
  animal(ctx, 100, 310, 'goat', frame)
  animal(ctx, 120, 322, 'goose', frame + 1)
  animal(ctx, 88, 326, 'rabbit', frame)
  animal(ctx, 130, 306, 'chicken', frame + 1)
  // poules près de la grange de Papy... non : papillon sur les champs
  if (frame % 4 < 2) px(ctx, 60, 218 + (frame % 8), 2, 2, '#f0e060')
}
