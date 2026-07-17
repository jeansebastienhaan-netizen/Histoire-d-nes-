// SCÈNE 14 — NOÉLIA, la princesse (script Partie IV.C, tel quel)
export default {
  id: 'scene14',
  title: 'Noélia, la princesse',
  place: 'crypte',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "L'escalier de la crypte descend, descend, descend. Les jambes tirent, les gourdes sont vides, le moral s'use. À mi-hauteur, une salle d'étape naturelle. C'est Mamy qui dit tout haut ce que tout le monde pense :",
      next: 'n2',
    },
    n2: {
      speaker: 'mamy',
      text: "Mes petits, sans ravitaillement, on ne verra pas le fond. Et sans quelqu'un pour nous tenir la tête haute non plus.",
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "Message est passé au village. Une heure plus tard, une voix claire tombe dans l'escalier, accompagnée d'un panier au bout d'une corde :",
      next: 'n4',
    },
    n4: {
      speaker: 'noelia',
      text: "(invisible, depuis le haut) QUE PERSONNE NE TOUCHE À RIEN. Une expédition sans intendance est une expédition ratée, c'est écrit dans tous les livres que je fais semblant d'avoir lus. Je descends. La cour descend avec moi.",
      next: 'n5',
    },
    n5: { speaker: 'papy', text: 'La cour ?', next: 'n6' },
    n6: {
      speaker: 'noelia',
      text: '(apparaissant, diadème impeccable, quatre paniers en équilibre) Vous. Vous êtes la cour. Félicitations.',
      next: 'choixN1',
    },
    choixN1: {
      type: 'choice',
      choices: [
        { label: "« On n'y arrivera pas sans toi, Noélia. Vraiment. »", next: 'n1_coeur' },
        { label: "« Oxane a dit qu'une princesse tiendrait pas deux heures ici. »", next: 'n1_ruse' },
        { label: "« Prends le commandement de l'intendance. C'est un ordre. »", next: 'n1_det' },
      ],
    },
    n1_coeur: {
      speaker: 'noelia',
      text: '(un micro-tremblement du menton, vite maîtrisé) ...Évidemment que non. Approchez, la cour. On refait les sacs.',
      setFlags: ['noelia_voie_coeur'],
      effects: { coeur: 2 },
      next: 'consigne',
    },
    n1_ruse: {
      speaker: 'oxane',
      text: "J'ai TELLEMENT pas dit ça.",
      next: 'n1_ruse2',
    },
    n1_ruse2: {
      speaker: 'noelia',
      text: '(retroussant ses manches en soie) Deux heures ? Je vais vous montrer un RÈGNE.',
      setFlags: ['noelia_voie_ruse'],
      effects: { ruse: 2 },
      next: 'consigne',
    },
    n1_det: {
      speaker: 'noelia',
      text: "On ne donne pas d'ordre à une princesse. (un temps) Mais celui-ci était excellent. Exécution.",
      setFlags: ['noelia_voie_det'],
      effects: { determination: 2 },
      next: 'consigne',
    },
    consigne: {
      speaker: 'noelia',
      text: "(étalant le contenu des paniers avec une autorité de général) Le protocole est simple : TOUT doit rentrer, RIEN ne doit s'abîmer, et le goûter voyage AU-DESSUS, toujours. Un royaume, ça se range. Montre-moi ce que tu vaux, écuyer.",
      next: 'fil_tendre',
    },
    // Fil tendre obligatoire du script : les œufs pour Mistiflouk.
    fil_tendre: {
      speaker: 'noelia',
      text: "(faussement détachée) Et il mange quoi, votre... Mistiflouk ? Parce que j'ai pris des œufs. Au cas où. On dit que c'est régalien, les œufs, pour un serpent.",
      next: 'fil_tendre2',
    },
    fil_tendre2: {
      speaker: 'narrateur',
      text: 'Personne ne relève. Tout le monde a compris.',
      setFlags: ['noelia_oeufs'],
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'inventaire',
      variantFrom: 'noelia_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Sous l'œil impérial de Noélia, chaque gourde, chaque couverture, chaque lanterne trouve sa place exacte dans le grand sac — et le goûter voyage au-dessus, toujours. Le royaume est rangé.",
      hints: [
        'Noélia : « Les grandes pièces d\'abord, écuyer. Un royaume se bâtit par les fondations. »',
        'Noélia : « Le goûter attend la FIN. Rangée du haut. Toujours. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'noelia_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: "Noélia adoube Aloïs du plat de sa cuillère à goûter : « Relève-toi, Intendant Royal des Choses Bien Rangées. »",
      next: 'sortie',
    },
    echec1: {
      speaker: 'narrateur',
      text: 'Noélia contemple le chaos, inspire, et déclare :',
      next: 'echec2',
    },
    echec2: {
      speaker: 'noelia',
      text: 'Bien. Nouveau décret : ceci est désormais un rangement ARTISTIQUE.',
      next: 'echec3',
    },
    echec3: {
      speaker: 'narrateur',
      text: "Elle s'assied sur le sac pour le fermer. Ça rentre.",
      next: 'echec4',
    },
    echec4: {
      speaker: 'noelia',
      text: "Un royaume, ça se range. Ou ça s'assied dessus.",
      setFlags: ['decret_artistique'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Sacs faits, gourdes pleines, moral regonflé — Noélia distribue le goûter selon un ordre protocolaire strict qui, comme par hasard, sert les plus fatigués en premier. L'escalier reprend. En bas : le sol s'arrête net. Une crevasse.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
