// SCÈNE 10 — XAVIER, le DJ (script Partie IV.C, tel quel)
export default {
  id: 'scene10',
  title: 'Xavier, le DJ',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Passé l'écluse, la galerie s'ouvre sur une salle où le son devient fou : chaque bruit rebondit, se dédouble, revient de partout. Cinq tunnels en repartent. Aloïs siffle les trois notes — et les entend revenir de CINQ directions.",
      sound: 'mistiflouk',
      next: 'n2',
    },
    n2: {
      speaker: 'mamy',
      text: "(les mains sur les oreilles) Ma boule dit rien, mes oreilles disent tout et n'importe quoi. Il nous faut le petit qui entend en couleur.",
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "Xavier arrive au bord du trou avec un casque autour du cou et une valise de matériel plus lourde que lui.",
      next: 'n4',
    },
    n4: {
      speaker: 'xavier',
      text: '(mi-descendu, s\'arrêtant net, les yeux fermés) Chhht. Chhht chhht chhht. Vous entendez ça ?',
      next: 'n5',
    },
    n5: { speaker: 'papy', text: 'Non.', next: 'n6' },
    n6: {
      speaker: 'xavier',
      text: "VOILÀ. Vous n'entendez pas. Cette salle, là-dessous... elle a une réverb' que même les cathédrales elles peuvent pas. C'est le plus bel endroit du monde et vous l'utilisez pour CHERCHER UN SERPENT.",
      next: 'n7',
    },
    n7: { speaker: 'alois', text: 'Xavier...', next: 'n8' },
    n8: {
      speaker: 'xavier',
      text: "(déjà en train de déballer trois pieds de micro) Oui oui, le serpent, bien sûr, priorité au serpent. Mais après, on parle studio.",
      next: 'choixX1',
    },
    choixX1: {
      type: 'choice',
      choices: [
        { label: '« Ses trois notes, Xavier. Il faut retrouver ses trois notes dans tout ce bazar. »', next: 'x1_coeur' },
        { label: '« Mamy dit que ses oreilles valent mieux que ton matériel. »', next: 'x1_ruse' },
        { label: '« Trouve le bon tunnel. Le reste après. »', next: 'x1_det' },
      ],
    },
    x1_coeur: {
      speaker: 'xavier',
      text: '(soudain sérieux) Trois notes dans le chaos. C\'est le plus beau brief de ma vie.',
      setFlags: ['xavier_voie_coeur'],
      effects: { coeur: 2 },
      next: 'consigne',
    },
    x1_ruse: {
      speaker: 'mamy',
      text: "(digne) J'assume.",
      next: 'x1_ruse2',
    },
    x1_ruse2: {
      speaker: 'narrateur',
      text: 'Xavier branche tout en marmonnant « ON VA VOIR ÇA ».',
      setFlags: ['xavier_voie_ruse'],
      effects: { ruse: 2 },
      next: 'consigne',
    },
    x1_det: {
      speaker: 'xavier',
      text: 'Direct, sans intro. Je respecte.',
      setFlags: ['xavier_voie_det'],
      effects: { determination: 2 },
      next: 'consigne',
    },
    consigne: {
      speaker: 'xavier',
      text: "(casque vissé, doigts sur sa console) Le principe : la salle me renvoie les échos dans l'ordre où elle veut. Moi je les rejoue dans l'ordre où ILS SONT VENUS. Si je me trompe pas, les faux échos s'annulent et il reste... la source. Toi, tu es mes mains de secours. Suis-moi.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'simon',
      variantFrom: 'xavier_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Écho après écho, Xavier et Aloïs rejouent les séquences de la salle, dans l'ordre exact où elles sont venues. Un à un, les faux tunnels s'éteignent, jusqu'à ce qu'il n'en reste qu'un, tout doucement lumineux.",
      hints: [
        'Xavier : « Écoute d\'abord, rejoue ensuite. La salle triche pas : elle répète toujours pareil. »',
        'Xavier : « Chante-la dans ta tête pendant qu\'elle joue. Tes doigts suivront tout seuls. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'xavier_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'xavier',
      text: "(retirant son casque, solennel) Toi. Samedi. Je t'apprends les platines. C'est pas une proposition, c'est un destin.",
      next: 'sortie',
    },
    echec1: {
      speaker: 'xavier',
      text: '(fermant les yeux, les mains à plat sur sa console) Plan B : le silence.',
      next: 'echec_hold',
    },
    echec_hold: {
      type: 'hold',
      duration: 10,
      text: 'Tout le monde retient son souffle. (Gardez le doigt posé sur l\'écran, sans bouger.)',
      next: 'echec2',
    },
    echec2: {
      speaker: 'narrateur',
      text: 'Et dans le silence total, très loin, UN vrai sifflement. Faible. Fatigué. Mais vrai.',
      setFlags: ['sifflement_entendu'],
      sound: 'mistifloukFaible',
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Un seul tunnel reste « allumé ».",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'xavier',
      text: "(à la salle, en partant, la main sur la pierre) Je reviendrai, toi. On fera des choses ensemble.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
