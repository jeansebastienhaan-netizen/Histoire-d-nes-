# TEXTES_AJOUTES.md — à valider par l'auteur

> Règle absolue du dossier (Partie I §3) : aucune réplique du script n'a été inventée,
> reformulée ni « améliorée ». Ce fichier liste **tous les textes rédigés en plus** pour
> les états non prévus par les scripts (boutons, réglages, consignes de mini-jeux,
> résolutions du mode raconté, indices), écrits dans le ton du narrateur.

## 1. Interface générale

- Écran titre : « Commencer », « Continuer », « Nouvelle partie », « Réglages »
- Confirmation : « Recommencer depuis le début ? La partie en cours sera effacée. » / « Oui, on recommence » / « Non, garder ma partie »
- Coupe du village : « Le village, en coupe », « Continuer », « Touche une silhouette pour revoir sa scène (souvenir, sans conséquence). », « L'histoire est finie. Touche une silhouette pour revivre un souvenir. »
- Journal (backlog) : « Ce qui a été dit », « Revenir à l'histoire »
- Mode souvenir : « Quitter le souvenir »
- Pause de mini-jeu : « Pause », « Reprendre », « Revoir la consigne », « Quitter la scène (on reprendra ici) »
- Indices : « Un coup de main ? », « Compris », « Prêt »
- Écran de fin : « FIN », titres d'épilogue (« Le secret de la famille », « La fête sous terre », « Le chemin de Mistiflouk »), « Revoir la coupe du village », « Recommencer l'histoire »
- Manifest PWA (description) : « Mistiflouk, le serpent d'Aloïs, a disparu dans des galeries sous le village. Toute la famille descend le chercher. »

## 2. Réglages (libellés)

Taille du texte (Petit/Normal/Grand) · Vitesse du texte (Lent/Normal/Rapide/Instantané) ·
Son (Activé/Coupé) · Vibrations · Mode raconté (« Les mini-jeux se résolvent tout seuls,
en version racontée — pour jouer à l'histoire en famille. ») · Mode daltonien (« Les lueurs
de la boule de cristal sont doublées de formes : cercle plein / anneau. ») · Police confort

## 3. Consignes courtes et démonstrations des mini-jeux

Une ligne de geste par jeu (démo « main fantôme ») et une ligne d'aide en bas d'écran,
p. ex. « Touche une pierre, maintiens pour treuiller, relâche dans la zone claire. »,
« Glisse le halo sur les parois pour trouver les marques qui nourrissent la flamme. »,
« Tape quand le cercle épouse la planche. », « La salle joue... écoute. / À toi : rejoue la
séquence. », « La jauge, c'est la portée de la voix. », « Pars du coin bas-gauche et rejoins
la sortie, case par case. », « Fais glisser les plaques pour reconstituer la spirale. »,
« Choisis un objet (retouche-le pour le pivoter), puis pose-le. », « Tapote un coin pour
redresser sa jauge dès qu'elle penche. », « Le cercle gonfle : appuie... Il dégonfle :
relâche... Respire avec Jules. », « Tout le monde retient son souffle. (Gardez le doigt posé
sur l'écran, sans bouger.) »

## 4. Indices progressifs (« Un coup de main ? », 2 niveaux par jeu)

Rédigés dans la voix du personnage de la scène (Papy, JS, Mamy, Lo, Cyril, Xavier, Manu,
Oxane, Lana, Noélia, les Mousquetaires, et la consigne de respiration pour Jules) — voir le
champ `hints` de chaque nœud `minigame` dans `src/data/scenes/`.

## 5. Messages d'état des mini-jeux

- Mikado : « La pierre retombe. On respire, on recommence. », « Relâché trop tôt ou trop tard : la pierre retombe. », « L'éboulis glisse... et se rattrape. Celle-là portait. », « Mauvaise pierre : l'ensemble glisse, la brèche se réduit. », « Papy : “Celle-là, elle porte. Touche pas.” / “Celle-là, tu peux.” » (consultations, voie Cœur), « Demander à Papy (n) »
- Planche : « Lo : “Celle-là ne porte que sa fierté. Écoute encore.” » (déclinaison de la réplique du script), « Le geste part trop tôt — ou trop tard. On recommence. », « C'est celle-là »
- Coffre : « Un cran saute ! Sens horaire/inverse, maintenant. », « Cyril frappe... rien. “Pas encore. Écoute-la.” », « Cyril, frappe ! »
- Mastermind : souvenirs de Mamy par symbole (voie Cœur), dont celui de la lune donné par le script ; « Proposer »
- Rythme/Simon/Labyrinthe/Coordination : compteurs d'état (« Couplet 1/3 », « Échos annulés », « Segment 1/3 · Mémorise ! », « Traversée : 40% »), « Oxane siffle. “Par ici, touriste.” » (réplique du script réutilisée en jeu)
- Inventaire : « Noélia : “Ça dépasse, écuyer. Un royaume ne dépasse pas.” », « Noélia : “Le goûter voyage AU-DESSUS. Toujours. Recommence, écuyer.” » (déclinaisons de ses répliques), « Fermer le sac », « Demander un décret à Noélia »
- Taquin : « Le carnet de Lana (n) », « Laisser faire Lana »
- Calme : « Un bruit. Un frôlement. Le noir qui bouge. On raccompagne le cercle, tout doucement. », « Le cercle repart. », encouragements d'Aloïs (voie Cœur : « Je suis là. », « Tu avances super bien. », « On respire. Ensemble. »)
- Mode famille (scène 15) : options « Nous sommes quatre ! (téléphone posé à plat, un coin chacun) » / « Je tiens les quatre coins moi-même » (la question « Vous êtes plusieurs ? » vient du dossier)

## 6. Résolutions du mode raconté (une par mini-jeu)

Rédigées dans le ton du narrateur, champ `narrated` de chaque nœud `minigame`
(éboulis, traversée noire, boule de cristal, cloison, vanne, échos, chant, raccourcis,
taquin, grand sac, crevasse, boyau).

## 7. Interprétations d'implémentation (logique, pas du texte)

- Scène 3, choix P1c-2 option 1 (« rejoint P1a en version courte ») : rejoue la fin de P1a
  (Papy descend + « Monte... ») et pose `papy_convaincu_coeur` + `histoire_grandpere_entendue`,
  avec le `coeur +1` du choix (et non le +2 de la voie complète).
- Scène 4, réussite parfaite en Détermination : Papy raconte « la cave d'en bas » avec les
  mots exacts de P1a (aucun texte nouveau).
- Scène 14 : le « fil tendre obligatoire » (œufs de Noélia) est joué juste avant l'épreuve.
- Sauvegarde : clé `mistiflouk-save-v1` (le guide technique citait la clé de l'ancien projet).
- Réussites « parfaites » : mikado/flamme/planche/coffre/simon/rythme sans erreur ;
  Mastermind en ≤ 3 essais (script) ; taquin en ≤ 40 coups ; labyrinthe sans faute ;
  inventaire sans refus ; coordination sans glissade.
