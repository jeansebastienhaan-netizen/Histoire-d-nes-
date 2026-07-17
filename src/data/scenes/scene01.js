// SCÈNE 1 — Le matin sans sifflement (script Partie IV.A, tel quel)
export default {
  id: 'scene1',
  title: 'Le matin sans sifflement',
  place: 'surface',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Chez Aloïs, le matin commence toujours pareil : trois notes sifflées depuis la véranda. Mistiflouk salue le soleil avant tout le monde.\nCe matin, rien.",
      next: 'n2',
    },
    n2: {
      speaker: 'alois',
      text: '(à voix haute, pour lui-même) Mistiflouk ?',
      next: 'n3',
    },
    n3: {
      speaker: 'narrateur',
      text: "Le terrarium est ouvert. Pas forcé — ouvert. Mistiflouk sait faire, il le fait souvent. Mais il ne va jamais plus loin que le potager.",
      next: 'choixA1',
    },
    choixA1: {
      type: 'choice',
      prompt: 'Par où commencer ?',
      choices: [
        { label: "Vérifier le potager, comme d'habitude", next: 'a1a' },
        { label: 'Chercher des traces autour de la maison', effects: { determination: 1 }, next: 'a1b' },
        { label: 'Appeler en sifflant ses trois notes', effects: { coeur: 1 }, next: 'a1c' },
      ],
    },
    a1a: {
      speaker: 'narrateur',
      text: "Les salades sont intactes, la pierre plate où il aime se chauffer est froide. Il n'est pas venu ici ce matin.",
      next: 'a2',
    },
    a1b: {
      speaker: 'narrateur',
      text: "Aloïs fait le tour de la maison, les yeux au sol. Là — une trace fine et sinueuse dans la terre meuble, qui file droit vers le fond du jardin. Droit. Mistiflouk ne va jamais droit. Sauf quand quelque chose l'appelle.",
      setFlags: ['indice_trace_droite'],
      next: 'a2',
    },
    a1c: {
      speaker: 'narrateur',
      text: "Aloïs siffle. Une fois. Deux fois. Le jardin retient son souffle avec lui.\nRien. Et ce rien-là ne ressemble à aucun autre silence.",
      sound: 'mistifloukFaible',
      next: 'a2',
    },
    a2: {
      speaker: 'narrateur',
      text: "La piste — ou l'instinct — mène au vieux tilleul, derrière l'église. L'arbre le plus vieux du village, celui sous lequel tout le monde a fait la sieste au moins une fois.\nEntre deux racines grosses comme des bras, la terre s'est ouverte. Un trou sombre, bien trop régulier pour être un terrier.\nEt accrochée à une racine, à l'entrée : une mue. Fraîche.",
      next: 'a2bis',
    },
    a2bis: {
      speaker: 'alois',
      text: 'Il est passé par là. Ce matin.',
      next: 'choixA2',
    },
    choixA2: {
      type: 'choice',
      prompt: 'Devant le trou',
      choices: [
        { label: 'Descendre tout de suite', effects: { determination: 1 }, next: 'end' },
        {
          label: "Aller d'abord chercher une lampe de poche à la maison",
          effects: { ruse: 1 },
          setFlags: ['a_une_lampe'],
          next: 'end',
        },
        { label: "Hésiter — prévenir quelqu'un d'abord ?", next: 'a2b' },
      ],
    },
    a2b: {
      speaker: 'narrateur',
      text: "Prévenir quelqu'un. C'est raisonnable. C'est ce qu'on fait, normalement.\nMais Mistiflouk est là-dessous, quelque part, et chaque minute est une minute de plus dans le noir.",
      next: 'a2b2',
    },
    a2b2: {
      speaker: 'alois',
      text: '(regardant la mue dans sa main) Je descends. Je préviendrai après.',
      effects: { coeur: 1 },
      next: 'end',
    },
    end: { type: 'end' },
  },
}
