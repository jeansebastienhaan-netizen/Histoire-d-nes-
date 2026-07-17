// SCÈNE 8 — LO, la karateka (script Partie IV.C, tel quel)
export default {
  id: 'scene8',
  title: 'Lo, la karateka',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Le tunnel bute sur une cloison de vieilles planches, clouée serré. Du travail sérieux : quelqu'un, un jour, a voulu que personne ne passe.",
      next: 'n2',
    },
    n2: {
      speaker: 'papy',
      text: "(tâtant le bois) Chêne. Sec comme mon humour. On n'arrache pas ça au treuil sans faire tomber le plafond avec.",
      next: 'n3',
    },
    n3: { speaker: 'alois', text: 'Alors il nous faut quelqu\'un qui casse... proprement.', next: 'n4' },
    n4: {
      speaker: 'narrateur',
      text: "On trouve Lo dans son jardin, en plein entraînement : immobile sur un pied depuis, d'après les voisins, « un temps inquiétant ».",
      next: 'n5',
    },
    n5: {
      speaker: 'lo',
      text: "(sans ouvrir les yeux) Je t'entends respirer depuis le portail, Aloïs. Tu respires comme quelqu'un qui a un mur à casser.",
      next: 'n6',
    },
    n6: { speaker: 'alois', text: "...C'est une cloison, mais oui. Comment tu—", next: 'n7' },
    n7: {
      speaker: 'lo',
      text: "(ouvrant un œil) Tout le monde vient me voir pour deux raisons : casser quelque chose, ou casser quelqu'un. Tu n'as pas la tête à casser quelqu'un.",
      next: 'choixL1',
    },
    choixL1: {
      type: 'choice',
      choices: [
        { label: 'Tout raconter — Mistiflouk, le noir, la promesse', next: 'l1_coeur' },
        {
          label: "« C'est du chêne centenaire. Papy dit qu'aucune main humaine ne peut le briser. »",
          next: 'l1_ruse',
        },
        { label: '« Viens. On casse une cloison. »', next: 'l1_det' },
      ],
    },
    l1_coeur: {
      speaker: 'lo',
      text: "(s'inclinant légèrement) Une promesse est un adversaire qu'on ne peut vaincre qu'en la tenant. J'arrive.",
      setFlags: ['lo_voie_coeur'],
      effects: { coeur: 2 },
      next: 'cloison',
    },
    l1_ruse: {
      speaker: 'papy',
      text: '(las) Faut vraiment que j\'arrête de dire des trucs que je dis pas.',
      next: 'l1_ruse2',
    },
    l1_ruse2: {
      speaker: 'narrateur',
      text: "Lo sourit pour la première fois de l'année.",
      setFlags: ['lo_voie_ruse'],
      effects: { ruse: 2 },
      next: 'cloison',
    },
    l1_det: {
      speaker: 'lo',
      text: "Enfin quelqu'un qui parle ma langue.",
      setFlags: ['lo_voie_det'],
      effects: { determination: 2 },
      next: 'cloison',
    },
    cloison: {
      speaker: 'narrateur',
      text: 'Devant la cloison, Lo pose sa paume à plat sur le bois, ferme les yeux, écoute. Longtemps.',
      next: 'consigne',
    },
    consigne: {
      speaker: 'lo',
      text: "Toute structure a un point d'accord. Une planche qui tient toutes les autres. On ne frappe pas fort, Aloïs. On frappe JUSTE.",
      next: 'ambiance_mamy',
    },
    // Réplique d'ambiance (annexe du script) : Mamy pendant l'épreuve de Lo.
    ambiance_mamy: {
      speaker: 'mamy',
      text: "Frappe à gauche. Enfin, c'est la boule qui dit ça. Moi je dis rien.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'planche',
      variantFrom: 'lo_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Aloïs pose sa paume sur le bois, comme Lo. Une planche, sous ses doigts, vibre autrement que les autres. Un souffle, un geste — et la cloison s'ouvre d'un coup sec, proprement, comme si elle n'attendait que ça.",
      hints: [
        'Lo : « Touche les planches une à une. Celle qui fait trembler toutes les autres, c\'est elle. »',
        'Lo : « Le geste, maintenant : frappe quand le cercle épouse la planche. Pas avant. Pas après. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'lo_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'lo',
      text: "(s'inclinant complètement) Ce geste. Je l'enseignerai.",
      next: 'sortie',
    },
    echec1: {
      speaker: 'lo',
      text: "(posant une main sur l'épaule d'Aloïs) Regarde.",
      next: 'echec2',
    },
    echec2: {
      speaker: 'narrateur',
      text: "Elle frappe elle-même — la cloison s'ouvre comme une fleur.",
      next: 'echec3',
    },
    echec3: {
      speaker: 'lo',
      text: "Il n'y a pas d'échec. Il y a des démonstrations.",
      setFlags: ['lo_demonstration'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Derrière la cloison, l'air est plus frais. Et sur la première pierre : une petite mue de serpent. Fraîche.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'lo',
      text: "(ramassant la mue avec un respect de relique) Ton ami avance bien. Il mue en marchant. C'est un signe de confiance.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
