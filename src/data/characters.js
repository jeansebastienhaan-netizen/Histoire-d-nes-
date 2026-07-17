// Les personnages : nom affiché, couleur de nom, spécification de portrait pixel.
// Les portraits sont dessinés par components/Portrait.jsx (grille pixel procédurale,
// rendu nearest-neighbor) — art provisoire dans l'attente des spritesheets finales.
export const CHARACTERS = {
  narrateur: { name: '', color: '#c9b98a', portrait: null },
  alois: {
    name: 'Aloïs',
    color: '#ffd27a',
    portrait: { skin: '#e8b088', hair: '#5a3a22', style: 'court', extra: null },
  },
  papy: {
    name: 'Papy',
    color: '#b7c7a0',
    portrait: { skin: '#d8a47c', hair: '#cfcabc', style: 'casquette', hat: '#4a5d3a', extra: 'moustache' },
  },
  js: {
    name: 'JS',
    color: '#f0a35e',
    portrait: { skin: '#e0a878', hair: '#3a3430', style: 'bataille', extra: 'lampe' },
  },
  mamy: {
    name: 'Mamy',
    color: '#d9a0d0',
    portrait: { skin: '#e6b493', hair: '#e8e2d4', style: 'chignon', extra: 'chale', extraColor: '#7a4a8a' },
  },
  lo: {
    name: 'Lo',
    color: '#e57b7b',
    portrait: { skin: '#d9a06e', hair: '#241f1c', style: 'queue', extra: 'bandeau', extraColor: '#c23b3b' },
  },
  cyril: {
    name: 'Cyril',
    color: '#e0574f',
    portrait: { skin: '#c98a5e', hair: '#2c241e', style: 'rase', extra: 'sourcils' },
  },
  xavier: {
    name: 'Xavier',
    color: '#6fd08c',
    portrait: { skin: '#e8b088', hair: '#1e2a20', style: 'court', extra: 'casque', extraColor: '#3fae66' },
  },
  manu: {
    name: 'Manu',
    color: '#e8874f',
    portrait: { skin: '#e6ac80', hair: '#b5482a', style: 'longs', extra: null },
  },
  oxane: {
    name: 'Oxane',
    color: '#8fb7c9',
    portrait: { skin: '#e2a887', hair: '#6b4a2e', style: 'capuche', hat: '#5e6b52', extra: 'meche' },
  },
  lana: {
    name: 'Lana',
    color: '#cfd4e8',
    portrait: { skin: '#e8b494', hair: '#3a2e24', style: 'voile', hat: '#8d93a8', extra: null },
  },
  noelia: {
    name: 'Noélia',
    color: '#f2ce6b',
    portrait: { skin: '#ecc09a', hair: '#e9c25a', style: 'longs', extra: 'diademe', extraColor: '#f4d557' },
  },
  jules: {
    name: 'Jules',
    color: '#a8c8f0',
    portrait: { skin: '#f0c4a0', hair: '#6e4a2c', style: 'boucles', extra: 'joues' },
  },
  israel: {
    name: 'Israël',
    color: '#7f9fe0',
    portrait: { skin: '#dca87e', hair: '#3a2c1e', style: 'plume', hat: '#3a5490', extra: 'moustachefine' },
  },
  antipas: {
    name: 'Antipas',
    color: '#e08f7f',
    portrait: { skin: '#dca87e', hair: '#3a2c1e', style: 'plume', hat: '#a04034', extra: 'moustachefine' },
  },
  maranatha: {
    name: 'Maranatha',
    color: '#7fc9a0',
    portrait: { skin: '#dca87e', hair: '#3a2c1e', style: 'plume', hat: '#2c7a52', extra: 'moustachefine' },
  },
  agapos: {
    name: 'Agapos',
    color: '#e0c86f',
    portrait: { skin: '#dca87e', hair: '#3a2c1e', style: 'plume', hat: '#b09030', extra: 'moustachefine' },
  },
  les4: {
    name: 'Les quatre, ensemble',
    color: '#c0b8e8',
    portrait: { skin: '#dca87e', hair: '#3a2c1e', style: 'plume', hat: '#6a5aa0', extra: 'moustachefine' },
  },
  mistiflouk: {
    name: 'Mistiflouk',
    color: '#8fd8a8',
    portrait: { skin: '#4f9f68', hair: '#3a7a50', style: 'serpent', extra: null },
  },
}

// Personnage « convaincu » par scène : silhouettes de la coupe du village.
export const SCENE_CHARACTER = {
  scene3: 'papy',
  scene5: 'js',
  scene7: 'mamy',
  scene8: 'lo',
  scene9: 'cyril',
  scene10: 'xavier',
  scene11: 'manu',
  scene12: 'oxane',
  scene13: 'lana',
  scene14: 'noelia',
  scene15: 'israel',
  scene16: 'jules',
}
