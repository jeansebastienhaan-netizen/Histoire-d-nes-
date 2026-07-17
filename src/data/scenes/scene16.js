// SCÈNE 16 — JULES, le nounours (script Partie IV.C, tel quel)
export default {
  id: 'scene16',
  title: 'Jules, le nounours',
  place: 'crypte',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Le boyau fait dix mètres. Étroit, bas, noir. Aucun adulte n'y passe les épaules. Il faudrait quelqu'un de petit. Quelqu'un de doux, aussi — parce qu'au bout, il y a un animal fatigué et craintif qu'il ne faut surtout pas effrayer.\nTout le monde pense à la même personne. Et tout le monde se tait, parce que cette personne a peur du noir, et que tout le monde le sait.\nC'est Jules qui parle le premier. Il est descendu avec Noélia, sans rien dire, comme toujours.",
      next: 'n2',
    },
    n2: {
      speaker: 'jules',
      text: "(tout bas, en regardant le boyau) C'est moi qui dois y aller, hein ?",
      next: 'n3',
    },
    n3: { speaker: 'alois', text: "Personne t'oblige, Jules. On peut chercher un autre—", next: 'n4' },
    n4: {
      speaker: 'jules',
      text: "(secouant la tête) Mistiflouk, une fois, il s'est endormi dans mes bras. Tout le monde disait qu'il ne faisait jamais ça.\n(il regarde ses chaussures)\nOn n'abandonne pas quelqu'un qui s'est endormi dans vos bras. Même quand on a peur. SURTOUT quand on a peur, je crois.",
      next: 'cyril_line',
    },
    cyril_line: {
      speaker: 'cyril',
      text: "(s'accroupissant devant Jules) Je peux pas passer devant, là-dedans. Mais je serai à l'entrée. Tu m'appelles, je démonte la colline.",
      next: 'cyril_line2',
    },
    cyril_line2: {
      speaker: 'narrateur',
      text: 'Jules sourit un tout petit peu.',
      next: 'lo_line',
    },
    lo_line: {
      speaker: 'lo',
      text: "La peur est une invitée, Jules. On ne la chasse pas. On lui tient la porte et on avance avec elle.",
      next: 'choixJU1',
    },
    choixJU1: {
      type: 'choice',
      prompt: "Comment l'accompagner (pas le convaincre : il a DÉJÀ dit oui)",
      choices: [
        { label: '« On va respirer ensemble, toi et moi, tout du long. Je lâche pas. »', next: 'ju1_coeur' },
        {
          label: "Lui confier la lampe de JS : « Elle n'a jamais laissé personne dans le noir. »",
          next: 'ju1_ruse',
        },
        { label: '« Tu es le seul qui peut. Et tu peux. »', next: 'ju1_det' },
      ],
    },
    ju1_coeur: {
      speaker: 'narrateur',
      text: "Aloïs s'installe à l'entrée du boyau. Sa voix accompagnera Jules, tout du long.",
      setFlags: ['jules_voie_coeur'],
      effects: { coeur: 2 },
      next: 'ambiance_noelia',
    },
    ju1_ruse: {
      speaker: 'narrateur',
      text: 'JS hoche gravement la tête ; la lampe, minuscule flamme, se laisse emporter.',
      setFlags: ['jules_voie_ruse', 'lampe_dans_boyau'],
      effects: { ruse: 2 },
      next: 'ambiance_noelia',
    },
    ju1_det: {
      speaker: 'jules',
      text: "(inspirant un grand coup) ...D'accord. D'accord d'accord d'accord. J'y vais avant que le d'accord s'use.",
      setFlags: ['jules_voie_det'],
      effects: { determination: 2 },
      next: 'ambiance_noelia',
    },
    // Répliques d'ambiance (annexe du script) : Noélia pendant le boyau.
    ambiance_noelia: {
      speaker: 'noelia',
      text: '(chuchotant très fort) LA COUR RETIENT SON SOUFFLE.',
      next: 'ambiance_papy',
    },
    ambiance_papy: {
      speaker: 'papy',
      text: 'La cour ferait mieux de le retenir en silence.',
      next: 'jeu',
    },
    // L'épreuve la plus douce du jeu. Ne peut PAS échouer : règle de design.
    jeu: {
      type: 'minigame',
      game: 'calme',
      variantFrom: 'jules_voie',
      onSuccess: 'sortie1',
      onPerfect: 'sortie1',
      onFail: 'sortie1',
      narrated:
        "Jules avance dans le noir en respirant lentement, comme on le lui a montré. Quand la peur s'emballe, il s'arrête, écoute les trois notes qui l'encouragent de l'autre côté, et repart. Pas à pas, jusqu'au bout.",
      hints: [
        'Appuyez quand le cercle gonfle, relâchez quand il dégonfle. Respirez avec Jules.',
        "Quand la peur s'emballe, ne tapez pas : reprenez le rythme lent, tout doucement.",
      ],
    },
    sortie1: {
      speaker: 'narrateur',
      text: "Le boyau s'élargit d'un coup. Jules débouche à genoux dans une salle... et s'arrête.\nRonde. Immense. Les parois couvertes de spirales gravées qui luisent faiblement, toutes, comme des braises patientes.\nEt au centre, lové sur une pierre plate en forme de coupe, la tête levée vers lui : Mistiflouk.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'jules',
      text: "(dans un souffle) Coucou, toi. C'est moi. C'est nous. On est TOUS venus.",
      next: 'sortie3',
    },
    sortie3: {
      speaker: 'narrateur',
      text: "Mistiflouk traverse la salle, grimpe le long de son bras, et pose sa tête dans son cou. Exactement comme la première fois.\nDe l'autre côté de la salle : une porte naturelle, large — les autres n'auront qu'à contourner par la galerie qu'elle ouvre. Jules n'a plus qu'à leur ouvrir de l'intérieur.\nIl regarde la salle, le serpent contre lui, et sourit dans le noir qui ne lui fait plus peur.",
      sound: 'mistiflouk',
      next: 'sortie4',
    },
    sortie4: {
      speaker: 'jules',
      text: 'Les amis ? Venez voir. Venez voir où il nous a emmenés.',
      next: 'end',
    },
    end: { type: 'end' },
  },
}
