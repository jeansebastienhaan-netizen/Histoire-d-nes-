// SCÈNE 4 — L'ÉPREUVE : l'éboulis (script Partie IV.A, tel quel)
export default {
  id: 'scene4',
  title: "L'épreuve : l'éboulis",
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Le tracteur ne descend pas sous terre, évidemment. Mais son treuil, si : Papy le positionne au-dessus du trou, entre les racines, et déroule le câble dans la galerie. En bas, il ausculte l'éboulis du plat de la main, comme un médecin.",
      next: 'n2',
    },
    n2: {
      speaker: 'papy',
      text: "Bon. Écoute-moi bien, parce que la pierre, ça pardonne pas l'à-peu-près. Cet éboulis, c'est un jeu de mikado : il y a des pierres qui portent et des pierres qui décorent. On tire les bonnes, dans le bon ordre, et le passage s'ouvre. On tire une mauvaise... et on recommence tout, dans quinze ans.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'mikado',
      variantFrom: 'papy_convaincu',
      onSuccess: 'sortie1',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Pierre après pierre, en suivant les mains sûres de Papy, Aloïs défait l'éboulis comme on défait un nœud : sans forcer, dans le bon ordre. Le passage s'ouvre.",
      hints: [
        'Papy : « Regarde la poussière, petit. Une pierre qui porte, ça se voit à ce qui bouge autour. »',
        'Papy : « Celles du bas, laisse-les tranquilles. Commence par ce qui dépasse. »',
      ],
    },
    // Réussite sans erreur : sur la voie Détermination, Papy raconte de lui-même « la cave d'en bas ».
    perfect_check: {
      type: 'branch',
      cases: [
        { if: { flag: 'papy_convaincu_det' }, next: 'bonus_det' },
        { if: { flag: 'histoire_grandpere_entendue' }, next: 'sortie1' },
      ],
      else: 'sortie1',
    },
    bonus_det: {
      type: 'branch',
      cases: [{ if: { flag: 'histoire_grandpere_entendue' }, next: 'sortie1' }],
      else: 'bonus_det2',
    },
    bonus_det2: {
      speaker: 'papy',
      text: "(regardant la brèche, sans qu'on lui demande rien) Mon grand-père me parlait de « la cave d'en bas », quand j'étais gamin. Je croyais que c'était une histoire pour m'endormir. Tout le monde le croyait.",
      setFlags: ['histoire_grandpere_entendue'],
      next: 'sortie1',
    },
    echec1: {
      speaker: 'papy',
      text: "Bon. Le mikado a gagné cette manche.\n(il crache dans ses mains)\nPlan B : la force bête et la patience. Ça prendra une heure de plus et le treuil va râler, mais on passera.",
      setFlags: ['treuil_abime'],
      next: 'sortie1',
    },
    sortie1: {
      speaker: 'narrateur',
      text: "La dernière pierre roule sur le côté. Derrière, la galerie continue — plus large, plus haute. De l'air frais circule, venu de loin.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'papy',
      text: "(dans la brèche, à mi-voix) Soixante-dix ans que je laboure au-dessus de ça.\n(à Aloïs)\nTon serpent. Il est parti par où, tu dis ?",
      next: 'sortie3',
    },
    sortie3: { speaker: 'alois', text: 'Par là. Tout droit.', next: 'sortie4' },
    sortie4: {
      speaker: 'papy',
      text: "Alors on va tout droit. Mais dans le noir, tout droit, ça n'existe pas. Il nous faut de la lumière — de la vraie.",
      next: 'sortie5',
    },
    sortie5: {
      speaker: 'narrateur',
      text: "Et au village, quand on dit « de la lumière », tout le monde pense à la même lampe... et à celui qui va avec.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
