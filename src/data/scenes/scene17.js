// SCÈNE 17 — FINALE : la salle ronde (script Partie IV.C, tel quel)
// Le final joue TOUTES les répliques conditionnelles dont le flag est posé, dans l'ordre du script.
export default {
  id: 'scene17',
  title: 'Finale : la salle ronde',
  place: 'salle',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Ils entrent un par un, et un par un ils se taisent. La salle est ronde, taillée à la main, plus vieille que tout ce qu'on connaît. Les spirales des parois luisent doucement — et plus JS avance, plus elles luisent fort.\nAu centre, la pierre plate en forme de coupe. La taille exacte... d'une lampe.",
      next: 'n2',
    },
    n2: {
      speaker: 'js',
      text: "(la voix changée) Aloïs. Je crois que je sais pourquoi les marques guidaient ma lampe.\n(il s'approche, la pose dans la coupe)\nElle ne me guidait pas vers ton serpent. Ton serpent nous guidait tous... vers chez elle.",
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "La lampe s'ajuste dans la pierre au millimètre. Sa flamme monte, droite, dorée — et toutes les spirales de la salle s'embrasent doucement en réponse, une lumière chaude, comme un feu de cheminée grand comme une cathédrale.\nPersonne ne saura jamais qui a creusé cette salle, ni pourquoi la lampe en vient, ni comment Mistiflouk l'a su. Mamy dira que certaines réponses sont comme les bonnes soupes : meilleures quand on ne connaît pas tous les ingrédients.",
      sound: 'success',
      next: 'c_mamy_reve',
    },

    // — Répliques conditionnelles, dans l'ordre du script —
    c_mamy_reve: {
      type: 'branch',
      cases: [{ if: { flag: 'mamy_reve_confirme' }, next: 'r_mamy_reve' }],
      else: 'c_noelia_oeufs',
    },
    r_mamy_reve: {
      speaker: 'mamy',
      text: "Trente ans que je rêvais d'un arbre. C'était pas l'arbre. C'était sa lumière d'en dessous.\n(elle s'assied, très digne, et s'essuie l'œil avec son châle)",
      next: 'c_noelia_oeufs',
    },
    c_noelia_oeufs: {
      type: 'branch',
      cases: [{ if: { flag: 'noelia_oeufs' }, next: 'r_noelia_oeufs' }],
      else: 'c_js_trouble',
    },
    r_noelia_oeufs: {
      speaker: 'noelia',
      text: "(déposant cérémonieusement un œuf devant Mistiflouk) De la part de la Couronne.",
      next: 'r_noelia_oeufs2',
    },
    r_noelia_oeufs2: {
      speaker: 'narrateur',
      text: "Mistiflouk l'ignore ; Noélia décrète qu'il « le garde pour plus tard, c'est régalien ».",
      next: 'c_js_trouble',
    },
    c_js_trouble: {
      type: 'branch',
      cases: [{ if: { flag: 'js_trouble_vu' }, next: 'r_js_trouble' }],
      else: 'c_lampe_flanche',
    },
    r_js_trouble: {
      speaker: 'js',
      text: "(à Aloïs, à part) Ce matin-là, chez moi... tu l'avais vue frémir, hein ?",
      next: 'r_js_trouble2',
    },
    r_js_trouble2: { speaker: 'alois', text: 'Oui.', next: 'r_js_trouble3' },
    r_js_trouble3: {
      speaker: 'js',
      text: "Moi aussi. Depuis des années. Merci de m'avoir donné une raison de la suivre.",
      next: 'c_lampe_flanche',
    },
    c_lampe_flanche: {
      type: 'branch',
      cases: [{ if: { flag: 'lampe_a_flanche' }, next: 'r_lampe_flanche' }],
      else: 'c_mousquetaires',
    },
    r_lampe_flanche: {
      speaker: 'js',
      text: "(caressant le cuivre) Pardon d'avoir douté de toi dans le tunnel.",
      next: 'r_lampe_flanche2',
    },
    r_lampe_flanche2: {
      speaker: 'narrateur',
      text: "La flamme fait une petite révérence ; tout le monde jure l'avoir vue.",
      next: 'c_mousquetaires',
    },
    c_mousquetaires: {
      type: 'branch',
      cases: [{ if: { flag: 'mousquetaires_a_mains_nues' }, next: 'r_mousq1' }],
      else: 'c_treuil',
    },
    r_mousq1: {
      speaker: 'narrateur',
      text: "Les quatre montrent leurs paumes marquées par l'échelle :",
      next: 'r_mousq2',
    },
    r_mousq2: { speaker: 'israel', text: 'Cicatrice...', next: 'r_mousq3' },
    r_mousq3: { speaker: 'antipas', text: "...d'honneur...", next: 'r_mousq4' },
    r_mousq4: { speaker: 'maranatha', text: '...collective...', next: 'r_mousq5' },
    r_mousq5: { speaker: 'agapos', text: '...ASSORTIE.', next: 'r_mousq6' },
    r_mousq6: { speaker: 'narrateur', text: 'Ils sont enchantés.', next: 'c_treuil' },
    c_treuil: {
      type: 'branch',
      cases: [{ if: { flag: 'treuil_abime' }, next: 'r_treuil1' }],
      else: 'c_royaume',
    },
    r_treuil1: { speaker: 'papy', text: 'Mon treuil est mort pour la cause.', next: 'r_treuil2' },
    r_treuil2: { speaker: 'cyril', text: 'Je te le répare dimanche.', next: 'r_treuil3' },
    r_treuil3: { speaker: 'papy', text: '...Mouais. Viens à midi, y aura du rôti.', next: 'r_treuil4' },
    r_treuil4: {
      speaker: 'narrateur',
      text: "C'est la plus longue déclaration d'affection de sa vie.",
      next: 'c_royaume',
    },
    c_royaume: {
      type: 'branch',
      cases: [{ if: { flag: 'royaume_oxane' }, next: 'r_royaume1' }],
      else: 'ambiance_papy',
    },
    r_royaume1: {
      speaker: 'narrateur',
      text: "Le groupe demande à Oxane de baptiser la salle. Elle réfléchit longtemps.",
      next: 'r_royaume2',
    },
    r_royaume2: { speaker: 'oxane', text: 'La salle de Jules.', next: 'r_royaume3' },
    r_royaume3: {
      speaker: 'narrateur',
      text: 'Jules devient écarlate ; Oxane hausse l\'épaule :',
      next: 'r_royaume4',
    },
    r_royaume4: {
      speaker: 'oxane',
      text: "Quoi ? C'est lui qui a eu le plus peur. C'est lui le plus courageux. C'est mathématique.",
      next: 'r_royaume5',
    },
    r_royaume5: { speaker: 'maranatha', text: "C'EST mathématique.", next: 'ambiance_papy' },

    // Réplique d'ambiance (annexe du script) : Papy dans la salle ronde, tout à la fin.
    ambiance_papy: {
      speaker: 'papy',
      text: "(à personne) Soixante-dix ans que je laboure au-dessus du plus bel endroit du pays.\n(il remet sa casquette)\nÇa m'apprendra à regarder par terre.",
      next: 'choixFinal',
    },

    // — LE CHOIX FINAL —
    choixFinal: {
      type: 'choice',
      prompt: 'Que fait-on de cet endroit ?',
      shuffle: false,
      choices: [
        { label: '« On le garde pour nous. »', next: 'fin_garder' },
        { label: "« On l'offre au village entier. »", next: 'fin_offrir' },
        { label: '« On referme, et on garde juste le chemin. »', next: 'fin_refermer' },
      ],
    },
    fin_garder: {
      speaker: 'narrateur',
      text: "La salle devient le secret de la famille. Un an plus tard, on y descend pour les grandes occasions ; Mistiflouk ouvre la marche, toujours. La lampe reste en bas — JS descend la voir « comme on visite une vieille amie ».",
      setFlags: ['fin_garder'],
      next: 'derniere_image',
    },
    fin_offrir: {
      speaker: 'narrateur',
      text: "Papy et Cyril élargissent l'entrée, Noélia organise l'inauguration (protocole : trois pages), Xavier y installe « le meilleur son souterrain d'Europe, minimum ». La première fête sous terre : Manu chante, les spirales pulsent au rythme.",
      setFlags: ['fin_offrir'],
      next: 'derniere_image',
    },
    fin_refermer: {
      speaker: 'narrateur',
      text: "On ne dit rien, on ne change rien ; on rebouche l'entrée du tilleul, sauf un passage à la taille de Mistiflouk. Certains soirs, le serpent disparaît quelques heures. Aloïs ne s'inquiète plus jamais. « Il va voir la lampe. Il lui tient compagnie. »",
      setFlags: ['fin_refermer'],
      next: 'derniere_image',
    },
    derniere_image: {
      speaker: 'narrateur',
      text: "Sur le chemin du retour, Jules porte Mistiflouk endormi autour de ses épaules, et personne ne marche vite, pour ne pas les réveiller — ni le serpent, ni le petit garçon qui n'a plus peur du noir.\nEt au village, plus tard, quand quelqu'un demandera comment c'était, là-dessous, ils se regarderont tous, et Papy répondra pour tout le monde :",
      next: 'derniere_replique',
    },
    derniere_replique: {
      speaker: 'papy',
      text: '« C\'était de la famille. Jusque sous terre. »',
      sound: 'mistiflouk',
      next: 'fin',
    },
    fin: { type: 'fin' },
  },
}
