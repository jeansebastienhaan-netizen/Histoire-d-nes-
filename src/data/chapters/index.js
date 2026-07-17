// Registre des chapitres, indexés par personnage.
import chapter1 from './chapter1.json'
import chapter2 from './chapter2.json'
import chapter3 from './chapter3.json'
import chapter4 from './chapter4.json'
import chapter5 from './chapter5.json'
import chapter6 from './chapter6.json'
import chapter7 from './chapter7.json'
import chapter8 from './chapter8.json'
import chapter9 from './chapter9.json'
import chapter10 from './chapter10.json'
import chapter11 from './chapter11.json'
import chapter12 from './chapter12.json'

const byCharacter = {
  mamy: chapter1,
  alois: chapter2,
  xavier: chapter3,
  papy: chapter4,
  jules: chapter5,
  oxane: chapter6,
  cyril: chapter7,
  manu: chapter8,
  noelia: chapter9,
  lo: chapter10,
  lana: chapter11,
  mousquetaires: chapter12,
}

export function getChapterForCharacter(characterId) {
  return byCharacter[characterId] ?? null
}

export const allChapters = Object.values(byCharacter)
