// SCÈNE 15 — LES 4 MOUSQUETAIRES (script Partie IV.C, tel quel)
export default {
  id: 'scene15',
  title: 'Les 4 Mousquetaires',
  place: 'crypte',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "La crevasse coupe la galerie sur quatre bons mètres. Noire, profonde, pas discutable. Papy a une échelle solide — mais posée sur ce vide, elle ploie et danse : il faut la TENIR. À quatre points. Exactement quatre.\nAu village, quand on dit « exactement quatre », tout le monde pense à la même bande.\nIls descendent l'escalier de la crypte en formation, comme toujours, et parlent, comme toujours, à tour de rôle sans jamais se couper :",
      next: 'n2',
    },
    n2: { speaker: 'israel', text: 'On nous a dit :', next: 'n3' },
    n3: { speaker: 'antipas', text: '« une mission »,', next: 'n4' },
    n4: { speaker: 'maranatha', text: '« quatre places »,', next: 'n5' },
    n5: { speaker: 'agapos', text: '« pas une de plus ».', next: 'n6' },
    n6: { speaker: 'les4', text: 'NOUS SOMMES VENUS.', next: 'n7' },
    n7: {
      speaker: 'papy',
      text: '(à Aloïs, bas) Ils font ça à table aussi. Leur mère est une sainte.',
      next: 'choixMQ1',
    },
    choixMQ1: {
      type: 'choice',
      choices: [
        {
          label: "« Mistiflouk est de l'autre côté. Il n'y a que vous quatre pour faire ce pont. »",
          next: 'mq1_coeur',
        },
        { label: "« Il paraît que vous n'avez jamais VRAIMENT testé le \"un pour tous\". »", next: 'mq1_ruse' },
        { label: '« Quatre coins. Une échelle. Un serpent. Questions ? »', next: 'mq1_det' },
      ],
    },
    mq1_coeur: {
      speaker: 'israel',
      text: 'Un ami dans le noir...',
      next: 'mq1_coeur2',
    },
    mq1_coeur2: { speaker: 'antipas', text: '...quatre amis dans la lumière.', next: 'mq1_coeur3' },
    mq1_coeur3: { speaker: 'maranatha', text: "C'est mathématique.", next: 'mq1_coeur4' },
    mq1_coeur4: {
      speaker: 'agapos',
      text: "C'est FRATERNEL.",
      setFlags: ['mousquetaires_voie_coeur'],
      effects: { coeur: 2 },
      next: 'ambiance_cyril',
    },
    mq1_ruse: {
      speaker: 'narrateur',
      text: 'Silence outré. Les quatre retirent leur veste dans un même mouvement.',
      setFlags: ['mousquetaires_voie_ruse'],
      effects: { ruse: 2 },
      next: 'ambiance_cyril',
    },
    mq1_det: {
      speaker: 'les4',
      text: 'AUCUNE.',
      setFlags: ['mousquetaires_voie_det'],
      effects: { determination: 2 },
      next: 'ambiance_cyril',
    },
    // Répliques d'ambiance (annexe du script) : Cyril à la crevasse.
    ambiance_cyril: {
      speaker: 'cyril',
      text: "(aux Mousquetaires) Si l'un de vous lâche, je vous rattrape tous les quatre.",
      next: 'ambiance_les4',
    },
    ambiance_les4: { speaker: 'les4', text: 'NOUS NE LÂCHONS PAS.', next: 'ambiance_cyril2' },
    ambiance_cyril2: { speaker: 'cyril', text: "Je sais. C'était poli.", next: 'mode_famille' },
    // Mode 4 joueurs (Partie I §6) : proposé avant l'épreuve, repli solo identique.
    mode_famille: {
      type: 'choice',
      prompt: 'Vous êtes plusieurs ?',
      shuffle: false,
      choices: [
        { label: 'Nous sommes quatre ! (téléphone posé à plat, un coin chacun)', setFlags: ['mode_famille'], next: 'jeu' },
        { label: 'Je tiens les quatre coins moi-même', next: 'jeu' },
      ],
    },
    jeu: {
      type: 'minigame',
      game: 'coordination',
      variantFrom: 'mousquetaires_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Quatre paires de mains, quatre coins, une échelle qui danse au-dessus du vide — et pas un tremblement de trop. Aloïs traverse pendant que les Mousquetaires, arc-boutés, tiennent leur formation comme un serment.",
      hints: [
        'Israël : « Un coin qui penche... » Antipas : « ...se redresse tout de suite. » Maranatha : « Tape dessus. » Agapos : « DOUCEMENT. »',
        'Les quatre : « Regarde les jauges, pas l\'échelle. NOUS, on regarde l\'échelle. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'mousquetaires_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: "Les quatre entament le chant de traversée qu'ils répètent « depuis toujours pour une occasion pareille ». Il est objectivement magnifique. Personne ne savait qu'ils répétaient.",
      next: 'sortie',
    },
    echec1: {
      speaker: 'narrateur',
      text: "L'échelle glisse — et les quatre la rattrapent d'un même geste, à mains nues, arc-boutés.",
      next: 'echec2',
    },
    echec2: { speaker: 'agapos', text: '(dents serrées) Traverse. MAINTENANT. On tient.', next: 'echec3' },
    echec3: { speaker: 'maranatha', text: 'On tient TOUJOURS.', next: 'echec4' },
    echec4: {
      speaker: 'narrateur',
      text: 'Traversée automatique, au ralenti, sur leurs quatre visages concentrés.',
      setFlags: ['mousquetaires_a_mains_nues'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Tout le monde passe, l'échelle est remontée et rangée (« Elle a servi la cause. Elle sera décorée. »). Devant : la galerie se resserre, se resserre... jusqu'à un boyau où un adulte ne passe pas. Et de l'autre côté du boyau, faible mais net : trois notes sifflées.",
      sound: 'mistifloukFaible',
      next: 'end',
    },
    end: { type: 'end' },
  },
}
