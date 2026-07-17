// SCÈNE 13 — LANA, la bonne sœur déjantée (script Partie IV.C, tel quel)
export default {
  id: 'scene13',
  title: 'Lana, la bonne sœur déjantée',
  place: 'crypte',
  start: 'start',
  nodes: {
    start: {
      speaker: 'narrateur',
      text: "Au-dessus de la voûte : l'église. Et dans l'église : Lana, qu'on trouve en train de faire ce qu'elle appelle « les vêpres rythmées » — personne n'a jamais osé demander de détails.",
      next: 'n2',
    },
    n2: {
      speaker: 'lana',
      text: "(ouvrant la porte de la crypte avant même qu'on frappe) JE LE SAVAIS. Vingt ans que je dis que cette crypte sonne creux ! Vingt ans qu'on me répond « Lana, une crypte c'est CENSÉ sonner creux » ! Et vous savez ce que je faisais, moi, pendant ce temps ?",
      next: 'n3',
    },
    n3: { speaker: 'papy', text: 'On veut pas savoir.', next: 'n4' },
    n4: {
      speaker: 'lana',
      text: "JE TAPAIS SUR LES MURS. Méthodiquement. J'ai une carte. (elle brandit un carnet couvert de croquis) Le Seigneur m'a donné de la patience et un excellent sens de la percussion.",
      next: 'choixLA1',
    },
    choixLA1: {
      type: 'choice',
      choices: [
        { label: '« Personne te croyait. Nous, on vient TE chercher. »', next: 'la1_coeur' },
        { label: '« On pensait passer sans te déranger, mais la porte du bas est verrouillée... »', next: 'la1_ruse' },
        { label: "« Ouvre la crypte. On t'expliquera après. »", next: 'la1_det' },
      ],
    },
    la1_coeur: {
      speaker: 'lana',
      text: '(la main sur le cœur) Vingt ans de désert et voilà la pluie. Suivez-moi, petits miracles.',
      setFlags: ['lana_voie_coeur'],
      effects: { coeur: 2 },
      next: 'ambiance_oxane',
    },
    la1_ruse: {
      speaker: 'lana',
      text: 'SANS ME DÉRANGER ? Ma crypte ? Mon mystère ? Poussez-vous de mon passage.',
      setFlags: ['lana_voie_ruse'],
      effects: { ruse: 2 },
      next: 'ambiance_oxane',
    },
    la1_det: {
      speaker: 'lana',
      text: '(ravie) Un ordre mystérieux dans une église. ENFIN il se passe quelque chose.',
      setFlags: ['lana_voie_det'],
      effects: { determination: 2 },
      next: 'ambiance_oxane',
    },
    // Répliques d'ambiance (annexe du script) : Oxane et Lana à la crypte.
    ambiance_oxane: {
      speaker: 'oxane',
      text: 'Attends. Ta crypte communique avec MES galeries ? On était voisines, ma sœur.',
      next: 'ambiance_lana',
    },
    ambiance_lana: {
      speaker: 'lana',
      text: '(enchantée) Colocataires du mystère !',
      next: 'taquin_intro',
    },
    taquin_intro: {
      speaker: 'narrateur',
      text: "Au fond de la crypte, sous une tenture que Lana retire d'un geste de matador : une porte basse, couverte de plaques de pierre gravées... toutes déplacées, dans le désordre, sauf une absente. Un taquin de pierre.",
      next: 'consigne',
    },
    consigne: {
      speaker: 'lana',
      text: "(chuchotant, aux anges) Un MÉCANISME. Dans MA crypte. Je vais être honnête : j'ai déjà essayé. Trois nuits. J'ai failli réussir et j'ai failli rester coincée du bras, dans cet ordre. À toi, petit — moi je tiens le cierge et je prie pour tes phalanges.",
      next: 'poing_check',
    },
    // Si Cyril a le poing abîmé (scène 9), Lana le bande pendant le taquin.
    poing_check: {
      type: 'branch',
      cases: [{ if: { flag: 'cyril_poing' }, next: 'bandage' }],
      else: 'jeu',
    },
    bandage: {
      speaker: 'lana',
      text: "(bandant la main de Cyril d'office) On frappe les vannes, pas ses phalanges, jeune homme. La fonte ne souffre pas, TOI si.",
      next: 'jeu',
    },
    jeu: {
      type: 'minigame',
      game: 'taquin',
      variantFrom: 'lana_voie',
      onSuccess: 'sortie',
      onPerfect: 'perfect_check',
      onFail: 'echec1',
      narrated:
        "Plaque après plaque, la spirale gravée se recompose sous les doigts d'Aloïs, pendant que Lana tient le cierge et retient son souffle. La dernière plaque glisse à sa place avec un clic solennel.",
      hints: [
        'Lana : « Commence par le coin en haut à gauche, petit. Une spirale, ça se remonte par le début. »',
        'Lana : « Range la rangée du haut, puis n\'y touche PLUS. Le reste suivra. »',
      ],
    },
    perfect_check: {
      type: 'branch',
      cases: [{ if: { flag: 'lana_voie_det' }, next: 'bonus_det' }],
      else: 'sortie',
    },
    bonus_det: {
      speaker: 'narrateur',
      text: "Lana embrasse le front d'Aloïs et déclare la crypte « annexe officielle du terrain d'aventure paroissial ».",
      next: 'sortie',
    },
    echec1: {
      speaker: 'lana',
      text: "(craquant ses doigts) Bon. Trois nuits d'entraînement, ça va bien servir.",
      next: 'echec2',
    },
    echec2: {
      speaker: 'narrateur',
      text: 'Elle finit le taquin elle-même à une vitesse ahurissante, en chantonnant. Tout le monde la regarde.',
      next: 'echec3',
    },
    echec3: {
      speaker: 'lana',
      text: 'Quoi ? Les vêpres rythmées, ça muscle.',
      setFlags: ['lana_vepres'],
      next: 'sortie',
    },
    sortie: {
      speaker: 'narrateur',
      text: "La porte pivote. L'escalier derrière descend en colimaçon, PROFOND. Sur la première marche : une mue.",
      next: 'sortie2',
    },
    sortie2: {
      speaker: 'lana',
      text: "(la ramassant, émue) Il est passé par ma crypte. J'ai toujours dit que cet endroit était béni.",
      next: 'end',
    },
    end: { type: 'end' },
  },
}
