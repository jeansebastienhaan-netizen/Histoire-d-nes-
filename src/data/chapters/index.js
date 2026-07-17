// Registre des chapitres disponibles, indexés par personnage.
// Un personnage absent de ce registre est visible sur la carte mais
// son chapitre est « en cours d'écriture ».
import chapter1 from './chapter1.json'

const byCharacter = {
  mamy: chapter1,
}

export function getChapterForCharacter(characterId) {
  return byCharacter[characterId] ?? null
}
