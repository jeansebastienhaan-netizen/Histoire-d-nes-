// SCÈNE 2 — La première galerie (script Partie IV.A, tel quel)
export default {
  id: 'scene2',
  title: 'La première galerie',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Le trou descend en pente douce, puis s'élargit. Et là, Aloïs comprend que personne au village ne connaît cet endroit.\nCe n'est pas un terrier. Ce n'est pas une cave. C'est une galerie — des murs droits, taillés à la main, il y a très, très longtemps. Assez haute pour marcher courbé. Elle continue, loin, bien au-delà de ce que la lumière du trou éclaire.",
      next: 'variante',
    },
    variante: {
      type: 'branch',
      cases: [{ if: { flag: 'a_une_lampe' }, next: 'v_lampe' }],
      else: 'v_tatons',
    },
    v_lampe: {
      speaker: 'narrateur',
      text: "Le faisceau accroche des marques régulières sur les parois — des coups d'outils. Quelqu'un a creusé ça. Des gens.",
      next: 'n2',
    },
    v_tatons: {
      speaker: 'narrateur',
      text: "Aloïs avance à tâtons, une main sur la paroi. La paroi est étrangement lisse, presque douce, comme usée par des années de passages.",
      next: 'n2',
    },
    n2: {
      speaker: 'narrateur',
      text: "Dix mètres. Vingt. Puis la main d'Aloïs rencontre autre chose : de la pierre effondrée. Un éboulis, du sol au plafond. Ancien, tassé, sérieux.\nEt devant l'éboulis, dans la poussière fine du sol : une trace sinueuse, qui disparaît dans un interstice grand comme le poing. Mistiflouk est passé. Aloïs, non.",
      next: 'n3',
    },
    n3: {
      speaker: 'alois',
      text: "(dans l'interstice, doucement) Mistiflouk... si tu m'entends... bouge pas. Je reviens. Je te promets que je reviens.",
      next: 'n4',
    },
    n4: {
      speaker: 'narrateur',
      text: "Seul, il lui faudrait une semaine pour dégager ça. Mais Aloïs connaît quelqu'un pour qui les choses lourdes sont une conversation entre gens de bonne compagnie.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
