// SCÈNE 6 — L'ÉPREUVE : la traversée noire (script Partie IV.B, tel quel)
export default {
  id: 'scene6',
  title: "L'épreuve : la traversée noire",
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Passé la brèche de Papy, la galerie s'enfonce — et le noir, ici, n'est pas le noir d'une cave. C'est un noir ancien, épais, qui semble avaler les bords de la lumière.\nJS lève sa lampe. La flamme monte... puis vacille, comme si elle cherchait sa respiration.",
      next: 'n2',
    },
    n2: {
      speaker: 'js',
      text: "(troublé, pour la première fois) Ça, elle ne me l'a jamais fait.",
      next: 'n3',
    },
    n3: {
      speaker: 'papy',
      text: 'Ta lampe a le trac. Formidable. On avance.',
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'flamme',
      variantFrom: 'js_convaincu',
      onSuccess: 'sortie1',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Pas à pas, le halo de la lampe glisse le long des parois. Chaque fois qu'il effleure une marque ancienne, la flamme reprend des forces, et la marque reste doucement lumineuse derrière eux. Section après section, la petite troupe traverse le noir.",
      hints: [
        "JS : « Elle tire vers ce qui la nourrit. Écoute-la : quand elle frémit, c'est qu'une marque est proche. »",
        'JS : « Longe la paroi, doucement. Les marques se suivent — elles dessinent un chemin. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'js_convaincu_det' }, next: 'bonus_det' }],
      else: 'sortie1',
    },
    bonus_det: {
      speaker: 'js',
      text: "Elle ne m'a jamais obéi. Elle m'accompagne. Ce n'est pas pareil.",
      next: 'sortie1',
    },
    echec1: {
      speaker: 'narrateur',
      text: "La flamme s'éteint. Une seconde de noir total — puis une lueur : la lampe s'est rallumée toute seule, minuscule, têtue.",
      next: 'echec2',
    },
    echec2: {
      speaker: 'js',
      text: "Elle ne s'éteint pas. Elle reprend son souffle. Avancez doucement, elle suit.",
      setFlags: ['lampe_a_flanche'],
      next: 'sortie1',
    },
    sortie1: {
      speaker: 'narrateur',
      text: "La troisième section débouche sur un élargissement. Les marques des parois convergent toutes vers un même point, là-bas, dans le noir devant — comme des flèches patientes qui attendraient depuis des siècles.\nEt au sol, dans la poussière : la trace fine, sinueuse, de quelqu'un de petit qui, lui, n'a pas eu besoin de lumière.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'alois',
      text: "(s'agenouillant près de la trace) Il est passé ici. Il va bien. Enfin — il avançait bien.",
      next: 'sortie3',
    },
    sortie3: {
      speaker: 'js',
      text: "(regardant sa lampe, qui brûle maintenant droite et claire, presque trop) Aloïs. Ces marques... elles ne montrent pas juste le chemin.\n(un temps)\nElles montrent le chemin à ma lampe. Et j'aimerais beaucoup qu'on m'explique comment c'est possible.",
      next: 'sortie4',
    },
    sortie4: {
      speaker: 'papy',
      text: "On t'expliquera en marchant. La galerie se sépare en trois, droit devant. Et devine quoi : trois tunnels, zéro panneau.",
      next: 'sortie5',
    },
    sortie5: {
      speaker: 'narrateur',
      text: "Trois tunnels. Aucun indice. Il y a au village quelqu'un dont c'est le métier, de voir ce que les autres ne voient pas...",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
