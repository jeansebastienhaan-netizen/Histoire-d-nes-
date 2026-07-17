// SCÈNE 3 — Papy (script Partie IV.A, tel quel)
export default {
  id: 'scene3',
  title: 'Papy',
  place: 'surface',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "On trouve Papy là où on le trouve toujours à cette heure : sur son tracteur, au bout du champ, en train de faire semblant de ne pas voir que le monde s'agite sans lui.",
      next: 'n2',
    },
    n2: {
      speaker: 'papy',
      text: "(coupant le moteur en voyant arriver Aloïs) Oh. À la vitesse où tu cours, c'est soit très grave, soit très intéressant.",
      next: 'choixP1',
    },
    choixP1: {
      type: 'choice',
      prompt: 'Comment lui demander ?',
      choices: [
        { label: "Tout raconter, d'un trait — la vérité, l'inquiétude, tout", next: 'p1a_1' },
        { label: "L'appâter — « Papy... tu savais, toi, qu'il y a des galeries sous le village ? »", next: 'p1b_1' },
        { label: "Aller droit au but — « J'ai besoin du tracteur. Maintenant. »", next: 'p1c_1' },
      ],
    },

    // — La voie du Cœur —
    p1a_1: {
      speaker: 'alois',
      text: "C'est Mistiflouk. Il est parti cette nuit, il est descendu dans un trou sous le vieux tilleul — Papy, il y a des galeries là-dessous, des vraies, creusées par des gens — et il y a un éboulis, et il est passé de l'autre côté, et moi je peux pas, et...",
      next: 'p1a_2',
    },
    p1a_2: {
      speaker: 'papy',
      text: "(levant une main) Respire, petit. On règle jamais rien en apnée.",
      next: 'p1a_3',
    },
    p1a_3: {
      speaker: 'narrateur',
      text: "Papy descend du tracteur. Lentement, comme tout ce qu'il fait — mais il descend.",
      next: 'p1a_4',
    },
    p1a_4: {
      speaker: 'papy',
      text: "Des galeries. Sous le tilleul.\n(un silence)\nMon grand-père me parlait de « la cave d'en bas », quand j'étais gamin. Je croyais que c'était une histoire pour m'endormir. Tout le monde le croyait.",
      next: 'p1a_5',
    },
    p1a_5: {
      speaker: 'papy',
      text: "(il remonte sur le tracteur) Monte. Si le serpent a retrouvé la cave d'en bas, on va pas le laisser la visiter tout seul.",
      setFlags: ['papy_convaincu_coeur', 'histoire_grandpere_entendue'],
      effects: { coeur: 2 },
      next: 'end',
    },

    // — La voie de la Ruse —
    p1b_1: {
      speaker: 'alois',
      text: "(faussement dégagé) Papy... toi qui sais tout sur le village... tu savais qu'il y a des galeries, là-dessous ? Des vraies. Taillées à la main.",
      next: 'p1b_2',
    },
    p1b_2: {
      speaker: 'papy',
      text: "(sans bouger de son siège) Mm. Et toi, tu sais que quand tu prends cet air-là, tu ressembles à ta grand-mère quand elle voulait m'emprunter la remorque ?",
      next: 'p1b_3',
    },
    p1b_3: {
      speaker: 'alois',
      text: "...Il y a un éboulis. Et Mistiflouk est de l'autre côté.",
      next: 'p1b_4',
    },
    p1b_4: {
      speaker: 'papy',
      text: "Voilà. C'était pas si dur.\n(il tapote le volant)\nLa prochaine fois, commence par la fin : c'est la fin qui m'intéresse. Allez, monte.",
      next: 'p1b_5',
    },
    p1b_5: {
      speaker: 'narrateur',
      text: "Il ne le dira pas, mais le mot « galeries » travaille déjà quelque part sous sa casquette.",
      setFlags: ['papy_convaincu_ruse'],
      effects: { ruse: 2 },
      next: 'end',
    },

    // — La voie de la Détermination —
    p1c_1: {
      speaker: 'alois',
      text: "J'ai besoin du tracteur. Maintenant.",
      next: 'p1c_2',
    },
    p1c_2: {
      speaker: 'papy',
      text: "(un sourcil qui monte, très lentement) Le tracteur, il a soixante ans, et moi un peu plus. Ni lui ni moi on démarre sur un ordre.",
      next: 'choixP1c2',
    },
    choixP1c2: {
      type: 'choice',
      choices: [
        {
          label: "« Pardon. C'est Mistiflouk — il est coincé sous terre. S'il te plaît. »",
          effects: { coeur: 1 },
          next: 'p1c_pardon',
        },
        { label: '« Très bien. Alors je vais creuser à la main. » — et tourner les talons', next: 'p1c_3' },
      ],
    },
    p1c_pardon: {
      speaker: 'papy',
      text: '(hochant la tête) Là, on se comprend.',
      next: 'p1c_pardon2',
    },
    // Rejoint la voie du Cœur en version courte (cf. script : « rejoint P1a en version courte »).
    p1c_pardon2: {
      speaker: 'narrateur',
      text: "Papy descend du tracteur. Lentement, comme tout ce qu'il fait — mais il descend.",
      next: 'p1c_pardon3',
    },
    p1c_pardon3: {
      speaker: 'papy',
      text: "Des galeries. Sous le tilleul.\n(un silence)\nMon grand-père me parlait de « la cave d'en bas », quand j'étais gamin. Je croyais que c'était une histoire pour m'endormir. Tout le monde le croyait.",
      next: 'p1c_pardon4',
    },
    p1c_pardon4: {
      speaker: 'papy',
      text: "(il remonte sur le tracteur) Monte. Si le serpent a retrouvé la cave d'en bas, on va pas le laisser la visiter tout seul.",
      setFlags: ['papy_convaincu_coeur', 'histoire_grandpere_entendue'],
      next: 'end',
    },
    p1c_3: {
      speaker: 'narrateur',
      text: "Aloïs est déjà à vingt pas quand le moteur du tracteur tousse, puis gronde derrière lui.",
      next: 'p1c_4',
    },
    p1c_4: {
      speaker: 'papy',
      text: "(le dépassant au ralenti, sans le regarder) Creuser à la main. Et puis quoi. Monte, tête de pioche — c'est de famille, mais quand même.",
      setFlags: ['papy_convaincu_det'],
      effects: { determination: 2 },
      next: 'end',
    },

    end: { type: 'end' },
  },
}
