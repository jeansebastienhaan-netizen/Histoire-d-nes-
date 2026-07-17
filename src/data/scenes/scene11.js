// SCÈNE 11 — MANU, la rockstar (script Partie IV.C, tel quel)
export default {
  id: 'scene11',
  title: 'Manu, la rockstar',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Le tunnel de Xavier descend longtemps. Puis la trace s'arrête net devant trois failles étroites. Plus d'écho exploitable : ici, il faudrait que Mistiflouk RÉPONDE. Il faut une voix qui porte. LA voix.\nManu descend l'échelle comme on descend sur scène : en s'attendant à des applaudissements. Elle n'a pas tort, Mamy applaudit.",
      next: 'n2',
    },
    n2: {
      speaker: 'manu',
      text: "(regardant la salle autour d'elle) Alors c'est ici, le fameux endroit dont Xavier parle en pleurant à moitié.",
      next: 'n3',
    },
    n3: { speaker: 'xavier', text: "Je ne pleurais pas, j'avais de l'acoustique dans l'œil.", next: 'n4' },
    n4: {
      speaker: 'manu',
      text: "(main sur le cœur) Un public dans le noir qui attend qu'on l'appelle. J'ai fait des salles pires.",
      next: 'choixMA1',
    },
    choixMA1: {
      type: 'choice',
      choices: [
        {
          label: "« Il connaît les trois notes d'Aloïs. Mais là, il est loin, fatigué. Il faut les lui CHANTER. »",
          next: 'ma1_coeur',
        },
        { label: '« Xavier dit que même ta voix ne passera pas trois failles de pierre. »', next: 'ma1_ruse' },
        { label: '« Chante. »', next: 'ma1_det' },
      ],
    },
    ma1_coeur: {
      speaker: 'manu',
      text: "(doucement, sans aucune pose) Alors on va les lui chanter comme une berceuse qu'on n'oublie pas.",
      setFlags: ['manu_voie_coeur'],
      effects: { coeur: 2 },
      next: 'consigne',
    },
    ma1_ruse: {
      speaker: 'xavier',
      text: "Pourquoi c'est toujours moi maintenant ?!",
      next: 'ma1_ruse2',
    },
    ma1_ruse2: {
      speaker: 'manu',
      text: "(déjà en train de s'échauffer) Tenez ma veste.",
      setFlags: ['manu_voie_ruse'],
      effects: { ruse: 2 },
      next: 'consigne',
    },
    ma1_det: {
      speaker: 'manu',
      text: 'Deux lettres de plus que ce que dit mon producteur. Ça me va.',
      setFlags: ['manu_voie_det'],
      effects: { determination: 2 },
      next: 'consigne',
    },
    consigne: {
      speaker: 'manu',
      text: "Écoute-moi bien, Aloïs : une chanson qui appelle quelqu'un, ça ne se braille pas. Ça se PLACE. Chaque note à sa place exacte, sinon la pierre nous la rend en bouillie. Tu tiens le tempo. Je tiens le reste.",
      next: 'ambiance_xavier',
    },
    // Réplique d'ambiance (annexe du script) : Xavier pendant le chant de Manu.
    ambiance_xavier: {
      speaker: 'xavier',
      text: "(il enregistre tout) Pour la postérité. Et pour l'album.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'rythme',
      variantFrom: 'manu_voie',
      onSuccess: 'sortie1',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Manu chante, Aloïs tient le tempo, et les trois notes de Mistiflouk, placées une à une, exactement où il faut, traversent la pierre comme si elle n'existait pas.",
      hints: [
        'Manu : « Tape quand la note franchit la ligne. Pas quand tu la vois : quand elle ARRIVE. »',
        'Manu : « Respire avec moi. Le tempo, c\'est une respiration qu\'on partage. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'manu_voie_det' }, next: 'bonus_det' }],
      else: 'sortie1',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: 'La note finale tenue fait tomber une poussière scintillante du plafond.',
      next: 'bonus_det2',
    },
    bonus_det2: {
      speaker: 'manu',
      text: "(bouleversée, chuchotant) Ça, même à l'Olympia, ça m'est jamais arrivé.",
      next: 'sortie1',
    },
    echec1: {
      speaker: 'narrateur',
      text: "Manu s'assied par terre, dos à la faille, et chante a cappella, tout doucement, juste les trois notes, en boucle. Tout le monde s'assied. On attend.",
      sound: 'mistiflouk',
      next: 'sortie1',
    },
    sortie1: {
      speaker: 'narrateur',
      text: "La dernière note s'éteint. Une seconde. Deux. Trois.\nEt puis — de la faille du milieu, faible, ébouriffé, mais reconnaissable entre mille : trois notes sifflées.\nIl est vivant. Il répond. Il attend.",
      sound: 'mistifloukFaible',
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'alois',
      text: '(la main sur la pierre, la voix cassée) On arrive, mon grand. On arrive.',
      setFlags: ['mistiflouk_a_repondu'],
      next: 'sifflement_check',
    },
    sifflement_check: {
      type: 'branch',
      cases: [{ if: { flag: 'sifflement_entendu' }, next: 'xavier_bonus' }],
      else: 'end',
    },
    xavier_bonus: {
      speaker: 'xavier',
      text: "La deuxième fois qu'il nous répond. Il compte sur nous, maintenant.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
