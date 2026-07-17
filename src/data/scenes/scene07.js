// SCÈNE 7 — MAMY, la diseuse de bonne aventure (script Partie IV.C, tel quel)
export default {
  id: 'scene7',
  title: 'Mamy, la diseuse de bonne aventure',
  place: 'galerie',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Trois tunnels. Identiques. Pas un courant d'air pour départager. Papy remonte chercher « la seule personne du village qui voit plus loin que le bout de sa galerie ».\nMamy arrive au bord du trou dans son châle des grands jours, sa boule de cristal sous le bras comme une miche de pain.",
      next: 'n2',
    },
    n2: {
      speaker: 'mamy',
      text: "(avant même qu'on lui explique) Le tilleul. Je le savais. TRENTE ANS que je rêve de cet arbre, trente ans qu'on me dit « Mamy, arrête le café le soir ». Eh bien qui c'est qui riait ? C'est plus moi !",
      next: 'indice_check',
    },
    indice_check: {
      type: 'branch',
      cases: [{ if: { flag: 'indice_trace_droite' }, next: 'indice1' }],
      else: 'choixM1',
    },
    indice1: {
      speaker: 'alois',
      text: 'Mamy... la trace de Mistiflouk filait droit. Il ne va jamais droit.',
      next: 'indice2',
    },
    indice2: {
      speaker: 'mamy',
      text: "(soudain grave, un doigt levé) Droit. Comme dans mon rêve. Quelque chose l'appelle, mon petit. Et quand quelque chose appelle un animal, c'est jamais pour lui vendre des casseroles.",
      setFlags: ['mamy_reve_confirme'],
      next: 'choixM1',
    },
    choixM1: {
      type: 'choice',
      prompt: 'La faire descendre',
      choices: [
        { label: '« On a besoin de tes yeux, Mamy. Des vrais. »', next: 'm1_coeur' },
        { label: "« Papy dit que ce trou, même toi tu n'y verrais rien. »", next: 'm1_ruse' },
        { label: "« Descends, on t'expliquera en bas. »", next: 'm1_det' },
      ],
    },
    m1_coeur: {
      speaker: 'mamy',
      text: "(elle rosit) Trente ans qu'on attend que quelqu'un me dise ça.",
      setFlags: ['mamy_voie_coeur'],
      effects: { coeur: 2 },
      next: 'carrefour',
    },
    m1_ruse: {
      speaker: 'papy',
      text: "J'ai JAMAIS dit ça.",
      next: 'm1_ruse2',
    },
    m1_ruse2: {
      speaker: 'mamy',
      text: '(déjà dans le trou) Poussez-vous.',
      setFlags: ['mamy_voie_ruse'],
      effects: { ruse: 2 },
      next: 'carrefour',
    },
    m1_det: {
      speaker: 'mamy',
      text: "Petit, on n'expédie pas une voyante. C'est ELLE qui expédie.",
      next: 'm1_det2',
    },
    m1_det2: {
      speaker: 'narrateur',
      text: 'Mais elle descend, vexée-ravie.',
      setFlags: ['mamy_voie_det'],
      effects: { determination: 2 },
      next: 'carrefour',
    },
    carrefour: {
      speaker: 'narrateur',
      text: "Au carrefour, Mamy pose sa boule sur une pierre plate, souffle dessus, l'astique avec sa manche.",
      next: 'consigne',
    },
    consigne: {
      speaker: 'mamy',
      text: "Bon. Je vais être honnête : la boule, elle montre. Mais elle montre FLOU. C'est comme la télé d'avant : il faut trouver le bon réglage. Toi, propose. Elle, elle répondra.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'mastermind',
      variantFrom: 'mamy_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Symbole après symbole, la boule répond à Aloïs par des lueurs dorées et argentées, comme un jeu de devinettes patient. Au troisième essai, les trois symboles s'alignent et une lumière franche désigne un tunnel.",
      hints: [
        "Mamy : « Une lueur dorée, c'est un symbole à sa place. Une argentée, c'est un symbole qui existe mais qui se trompe de chaise. »",
        "Mamy : « Garde les dorés où ils sont, mon chéri, et fais tourner les autres. »",
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'mamy_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: 'Mamy déclare solennellement Aloïs « voyant stagiaire ».',
      next: 'sortie',
    },
    echec1: {
      speaker: 'narrateur',
      text: "La boule s'embrume. Mamy la retourne comme un sablier.",
      next: 'echec2',
    },
    echec2: {
      speaker: 'mamy',
      text: "On va faire à l'ancienne.",
      next: 'echec3',
    },
    echec3: {
      speaker: 'narrateur',
      text: 'Elle choisit le tunnel elle-même... le bon.',
      next: 'echec4',
    },
    echec4: {
      speaker: 'mamy',
      text: "La boule, c'est pour le spectacle, mon chéri. Le don, il est là.\n(elle tapote sa tempe)",
      setFlags: ['mamy_a_l_ancienne'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "Le tunnel choisi descend en pente douce. Sur la paroi, une marque ancienne — la boule de Mamy s'illumine en passant devant, exactement comme la lampe de JS. Mamy et JS échangent un regard. Personne ne commente.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
