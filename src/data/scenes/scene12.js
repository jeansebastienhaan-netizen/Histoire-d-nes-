// SCÈNE 12 — OXANE, la rebelle (script Partie IV.C, tel quel)
export default {
  id: 'scene12',
  title: 'Oxane, la rebelle',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "La faille du milieu est infranchissable pour des adultes — mais elle rejoint sûrement d'autres galeries. Le problème : lesquelles ? C'est Mamy qui lâche le morceau, l'air de rien :",
      next: 'n2',
    },
    n2: {
      speaker: 'mamy',
      text: "Demandez donc à la petite Oxane. (silence gêné) Quoi ? Une voyante, ça voit. Ça fait des années qu'elle descend quelque part le dimanche, cette gamine, et c'est pas à la messe.",
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "On trouve Oxane sur son toit, précisément parce que c'est interdit d'être sur les toits.",
      next: 'n4',
    },
    n4: { speaker: 'oxane', text: '(sans se retourner) Non.', next: 'n5' },
    n5: { speaker: 'alois', text: "J'ai encore rien demandé.", next: 'n6' },
    n6: {
      speaker: 'oxane',
      text: "Tu montes chez moi avec Papy, une voyante, un DJ et une rockstar. C'est non par principe.",
      next: 'choixO1_1',
    },
    // Le seul dialogue du jeu où il faut s'y reprendre : deux manches.
    choixO1_1: {
      type: 'choice',
      prompt: 'Manche 1',
      choices: [
        { label: '« On sait que tu connais les galeries. »', next: 'o1_1a' },
        { label: '« Mistiflouk est coincé là-dessous. »', next: 'o1_1b' },
        { label: "« T'es pas obligée. On voulait juste te le dire. » — et redescendre", next: 'o1_1c' },
      ],
    },
    o1_1a: {
      speaker: 'oxane',
      text: 'Ah. La voyante. Évidemment.',
      next: 'o1_1a2',
    },
    o1_1a2: {
      speaker: 'narrateur',
      text: 'Elle se ferme.',
      next: 'choixO1_2',
    },
    o1_1b: {
      speaker: 'oxane',
      text: '(un silence) ...Le serpent ?',
      next: 'o1_1b2',
    },
    o1_1b2: {
      speaker: 'narrateur',
      text: 'Elle se retourne à moitié.',
      next: 'choixO1_2',
    },
    o1_1c: {
      speaker: 'narrateur',
      text: "Oxane vous rattrape dans l'escalier.",
      next: 'o1_1c2',
    },
    o1_1c2: {
      speaker: 'oxane',
      text: "Attends. Personne me dit jamais juste les choses sans rien vouloir. C'est déstabilisant. Redis voir.",
      effects: { coeur: 1 },
      next: 'choixO1_2',
    },
    choixO1_2: {
      type: 'choice',
      prompt: 'Manche 2',
      choices: [
        {
          label: "« Là-dessous, c'est ton endroit. On ne te demande pas de le donner. On te demande de nous y inviter. »",
          next: 'o2_coeur',
        },
        { label: '« Remarque, sans toi on va se perdre, piétiner partout, laisser des traces... »', next: 'o2_ruse' },
        { label: "« Il nous faut un guide. T'es la meilleure. Point. »", next: 'o2_det' },
      ],
    },
    o2_coeur: {
      speaker: 'oxane',
      text: "(longtemps silencieuse) ...C'est la première fois qu'on me demande la permission pour un truc.",
      setFlags: ['oxane_voie_coeur', 'oxane_invitation'],
      effects: { coeur: 2 },
      next: 'regles',
    },
    o2_ruse: {
      speaker: 'oxane',
      text: "(horrifiée) Vous allez SACCAGER mon spot. C'est bon, c'est bon, JE guide.",
      setFlags: ['oxane_voie_ruse'],
      effects: { ruse: 2 },
      next: 'regles',
    },
    o2_det: {
      speaker: 'oxane',
      text: "(haussant une épaule pour cacher que ça lui fait plaisir) ...Point toi-même. Ramassez vos affaires.",
      setFlags: ['oxane_voie_det'],
      effects: { determination: 2 },
      next: 'regles',
    },
    regles: {
      speaker: 'oxane',
      text: "(en bas, dépliant de mémoire un plan qu'elle refuse de dessiner) Règle une : on touche à rien. Règle deux : on répète à personne. Règle trois...\n(elle regarde le groupe, tout le village ou presque)\nBon, la règle deux est morte. Mes raccourcis, je les connais par cœur — et par cœur, c'est comme ça que tu vas les apprendre, parce que là où on va, on ne peut pas s'arrêter pour réfléchir.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'labyrinthe',
      variantFrom: 'oxane_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Virage après virage, Aloïs récite les raccourcis d'Oxane comme une comptine apprise par cœur. Elle corrige d'un sifflement, il recommence, et le dédale se laisse traverser.",
      hints: [
        "Oxane : « Photographie le chemin dans ta tête. Pas les murs : le CHEMIN. »",
        "Oxane : « Trouve-toi un repère par virage. La pierre bizarre, la flaque, le courant d'air. »",
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'oxane_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'oxane',
      text: "(bras croisés) OK. T'as le niveau. Je dis pas ça. Je l'ai jamais dit. T'as rien entendu.",
      next: 'sortie',
    },
    echec1: {
      speaker: 'narrateur',
      text: "Oxane soupire théâtralement, attrape la main d'Aloïs, et guide tout le monde elle-même en commentant chaque virage — et on découvre qu'elle a des noms pour CHAQUE recoin (« la salle du goûter », « le virage où j'ai eu 12 ans »). Son royaume secret, offert à voix haute.",
      setFlags: ['royaume_oxane'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Les raccourcis d'Oxane font gagner des heures. Ils débouchent... sous une voûte maçonnée, différente du reste.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'oxane',
      text: "Ça, c'est ma frontière. Derrière ce mur, c'est plus de la galerie. C'est du bâti. Je suis jamais allée plus loin.",
      next: 'sortie3',
    },
    sortie3: {
      speaker: 'narrateur',
      text: 'Un chant lointain traverse la pierre.',
      next: 'sortie4',
    },
    sortie4: { speaker: 'papy', text: "...C'est pas la crypte de l'église, ça ?", next: 'end' },
    end: { type: 'end' },
  },
}
