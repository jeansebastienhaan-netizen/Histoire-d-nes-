// SCÈNE 9 — CYRIL, le boxeur (script Partie IV.C, tel quel)
export default {
  id: 'scene9',
  title: 'Cyril, le boxeur',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "La galerie suivante descend... dans l'eau. Trente mètres noyés jusqu'au plafond. Sur le côté, une vanne de fonte, rouillée en place depuis un siècle, qui commande une écluse oubliée.",
      next: 'n2',
    },
    n2: {
      speaker: 'papy',
      text: "(essayant, s'arc-boutant, renonçant) Rouillée jusqu'à l'âme. Là, il faut pas de la force. Il faut de la frappe.",
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "Cyril, on le trouve à la salle, en train de faire peur à un sac de sable. La conversation est la plus courte du jeu :",
      next: 'n4',
    },
    n4: { speaker: 'alois', text: 'Cyril, on a besoin de—', next: 'n5' },
    n5: { speaker: 'cyril', text: "(déjà en train de retirer ses gants) Où ?", next: 'n6' },
    n6: { speaker: 'alois', text: "...Tu veux pas savoir quoi, d'abord ?", next: 'n7' },
    n7: {
      speaker: 'cyril',
      text: "(enfilant sa veste) Quelqu'un a besoin. Le reste, tu me raconteras en chemin. Marche plus vite.",
      next: 'choixC1',
    },
    choixC1: {
      type: 'choice',
      prompt: 'En marchant, lui raconter :',
      choices: [
        { label: "Parler de Mistiflouk, de Jules qui s'inquiète aussi", next: 'c1_coeur' },
        { label: 'Décrire la vanne comme « imbattable »', next: 'c1_ruse' },
        { label: 'Ne rien dire, marcher vite', next: 'c1_det' },
      ],
    },
    c1_coeur: {
      speaker: 'cyril',
      text: '(hochant la tête) Le nounours. S\'il descend un jour, je passe devant lui. Tu lui dis.',
      setFlags: ['cyril_voie_coeur'],
      effects: { coeur: 2 },
      next: 'vanne',
    },
    c1_ruse: {
      speaker: 'cyril',
      text: "(souriant du coin) Y a pas d'imbattable. Y a des combats mal préparés.",
      setFlags: ['cyril_voie_ruse'],
      effects: { ruse: 2 },
      next: 'vanne',
    },
    c1_det: {
      speaker: 'cyril',
      text: "(après un silence) J'aime bien marcher avec toi. C'est reposant.",
      setFlags: ['cyril_voie_det'],
      effects: { determination: 2 },
      next: 'vanne',
    },
    vanne: {
      speaker: 'cyril',
      text: "(devant la vanne, la palpant comme un adversaire au premier round) OK. Elle est vieille, elle est têtue, elle a l'avantage du terrain. Mais elle a un défaut : elle est prévisible. Une vanne comme ça, ça se force pas. Ça s'écoute. Tu me guides : je frappe où tu me dis, quand tu me dis.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'coffre',
      variantFrom: 'cyril_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Aloïs tourne la molette, lentement, l'oreille contre la fonte. Un clic. Cyril frappe. Un cran saute. Puis un deuxième, puis un troisième — et la vanne, vaincue à la loyale, rend les armes.",
      hints: [
        "Cyril : « Tourne doucement. Quand ça vibre sous tes doigts, c'est qu'elle avoue. »",
        "Cyril : « Au clic, tu me fais signe tout de suite. Une vanne, ça se frappe à l'aveu, pas après. »",
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'cyril_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: "Cyril soulève Aloïs par le col, une seconde, comme un trophée. Le repose.",
      next: 'bonus_det2',
    },
    bonus_det2: { speaker: 'cyril', text: "Pardon. L'habitude.", next: 'sortie' },
    echec1: {
      speaker: 'cyril',
      text: "(crachant dans ses mains) Changement de tactique : elle m'énerve.",
      next: 'echec2',
    },
    echec2: {
      speaker: 'narrateur',
      text: 'Il frappe la vanne UNE fois, de toute son âme. Elle cède.',
      next: 'echec3',
    },
    echec3: {
      speaker: 'cyril',
      text: "(massant son poing en regardant ailleurs) On dira que c'est toi.",
      setFlags: ['cyril_poing'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "L'écluse gronde, l'eau se retire en tourbillonnant. Sur la vase fraîche du fond : LA trace, sinueuse, qui traverse et continue.",
      next: 'sortie2',
    },
    sortie2: { speaker: 'cyril', text: 'Il a nagé ? Costaud, le petit. Respect.', next: 'end' },
    end: { type: 'end' },
  },
}
