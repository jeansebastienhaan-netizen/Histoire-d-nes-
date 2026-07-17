// SCÈNE 5 — Celui qui va avec la lampe (script Partie IV.B, tel quel)
export default {
  id: 'scene5',
  title: 'Celui qui va avec la lampe',
  place: 'surface',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "JS, tout le monde le connaît : le génie de la lampe. Pas une lampe de chevet, non — la vieille lampe de cuivre, celle qui ne le quitte jamais, celle dont personne n'a jamais su d'où elle venait. Lui non plus, d'ailleurs. C'est peut-être pour ça qu'il ne s'en sépare pas.\nOn le trouve chez lui, la lampe posée sur l'établi, un chiffon à la main.",
      next: 'n2',
    },
    n2: {
      speaker: 'js',
      text: "(sans lever les yeux) Aloïs. Et Papy qui a coupé son moteur avant midi. Donc c'est sérieux.",
      next: 'n3',
    },
    n3: {
      speaker: 'papy',
      text: "Y a un trou sous le tilleul. Ça descend. Ça continue. Point.",
      next: 'n4',
    },
    n4: {
      speaker: 'js',
      text: '(posant le chiffon, lentement) ...Continue comment ?',
      next: 'choixJ1',
    },
    choixJ1: {
      type: 'choice',
      prompt: "Comment l'embarquer ?",
      choices: [
        {
          label: "La vérité d'Aloïs — « Mistiflouk est là-dessous. Il fait tout noir. On a besoin de toi. »",
          next: 'j1a_1',
        },
        {
          label:
            'Le mystère — « Des galeries taillées à la main. Vieilles. Personne ne sait qui les a creusées. Ça ne te rappelle rien ? »',
          next: 'j1b_1',
        },
        {
          label: "Le défi — « Papy dit que ta lampe n'éclairera jamais assez loin pour un endroit pareil. »",
          next: 'j1c_1',
        },
      ],
    },

    // — La voie du Cœur —
    j1a_1: {
      speaker: 'alois',
      text: "Mistiflouk est là-dessous, JS. Tout seul. Il fait un noir complet, et moi j'ai promis que je reviendrais. Mais sans lumière, je peux pas tenir ma promesse.",
      next: 'j1a_2',
    },
    j1a_2: {
      speaker: 'js',
      text: "(un temps ; il regarde la lampe, puis Aloïs) Une promesse à quelqu'un qui t'attend dans le noir. Ça, c'est exactement le genre de chose pour quoi cette lampe existe. Je ne saurais pas te dire pourquoi je le sais. Mais je le sais.\n(il la prend, elle s'allume sans qu'il l'ait touchée davantage)\nTu vois ? Elle est d'accord.",
      next: 'j1a_3',
    },
    j1a_3: {
      speaker: 'papy',
      text: "(mi-voix) Mouais. Une lampe qui a un avis. Manquait plus que ça.",
      setFlags: ['js_convaincu_coeur'],
      effects: { coeur: 2 },
      next: 'end',
    },

    // — La voie de la Ruse —
    j1b_1: {
      speaker: 'alois',
      text: "Des galeries taillées à la main. Vieilles — plus vieilles que l'église, peut-être. Personne ne sait qui les a creusées, ni pourquoi.\n(un temps)\nÇa ne te rappelle rien... quelque chose qu'on a chez soi depuis toujours sans savoir d'où ça vient ?",
      next: 'j1b_2',
    },
    j1b_2: {
      speaker: 'narrateur',
      text: "Le regard de JS glisse vers la lampe. Et sur l'établi, à cet instant précis — c'est peut-être un reflet, peut-être le nuage qui passe — le cuivre semble frémir.",
      next: 'j1b_3',
    },
    j1b_3: {
      speaker: 'js',
      text: "(doucement) C'est petit, ce que tu fais là, Aloïs.\n(il attrape sa veste)\nEt ça marche complètement. Allons-y.",
      setFlags: ['js_convaincu_ruse', 'js_trouble_vu'],
      effects: { ruse: 2 },
      next: 'end',
    },

    // — La voie de la Détermination —
    j1c_1: {
      speaker: 'alois',
      text: "Papy dit que ta lampe n'éclairera jamais assez loin. Que là-dessous, il faut des vraies torches.",
      next: 'j1c_2',
    },
    j1c_2: { speaker: 'papy', text: "(immédiatement) J'ai rien dit de tel.", next: 'j1c_3' },
    j1c_3: {
      speaker: 'js',
      text: "(déjà debout, la lampe à la main) Non, mais maintenant c'est dit. Et ça mérite réponse.\n(à la lampe, presque en confidence)\nOn va leur montrer, hein ?",
      next: 'j1c_4',
    },
    j1c_4: {
      speaker: 'papy',
      text: "(à Aloïs, bas) T'es pas fin, gamin. Mais t'es efficace.",
      setFlags: ['js_convaincu_det'],
      effects: { determination: 2 },
      next: 'end',
    },

    end: { type: 'end' },
  },
}
