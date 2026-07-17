# Mistiflouk

Mistiflouk, le serpent de compagnie d'Aloïs, disparaît dans des galeries inconnues sous le
village. Pour le retrouver, Aloïs doit convaincre chaque membre de sa famille de descendre —
chacun débloque un passage grâce à ce qu'il est. Un jeu narratif mobile chaleureux, en pixel
art, où les choix de dialogue colorent chaque scène et reviennent tous au final.

**Document de référence** : [`docs/MISTIFLOUK_DOSSIER_COMPLET.md`](docs/MISTIFLOUK_DOSSIER_COMPLET.md)
(design > scripts > UX > technique). Les scripts y sont implémentés **tels quels** ; tout texte
ajouté est listé dans [`TEXTES_AJOUTES.md`](TEXTES_AJOUTES.md) pour validation par l'auteur.

## Jouer

- **En ligne** : `https://jeansebastienhaan-netizen.github.io/Histoire-d-nes-/`
- **En local** :

```bash
npm install
npm run dev
```

## Télécharger l'application Android

L'APK est publié dans les [**Releases**](https://github.com/jeansebastienhaan-netizen/Histoire-d-nes-/releases) :
télécharger `app-release-signed.apk` sur le téléphone, l'ouvrir, autoriser les
« sources inconnues » (première fois seulement). L'appli affiche le jeu en ligne :
chaque mise à jour de `main` arrive automatiquement, sans réinstaller.

Pour regénérer l'APK : onglet **Actions → Build APK → Run workflow**.

## Ce qui est implémenté

- Les **17 scènes** (ouverture → Papy → JS → Mamy → Lo → Cyril → Xavier → Manu → Oxane →
  Lana → Noélia → Mousquetaires → Jules → finale), scripts verbatim, progression linéaire
- Les **12 mini-jeux** classiques adaptés, chacun avec ses **3 variantes** (Cœur / Ruse /
  Détermination) et son **issue d'échec narrative jamais bloquante** ; l'épreuve de Jules
  ne peut pas échouer (règle de design)
- Le **registre de variables** : réputation invisible (`coeur`, `ruse`, `determination`) et
  tous les flags d'histoire ; le final joue toutes les répliques conditionnelles posées
- **Mode raconté** (résolution narrative automatique des mini-jeux), réglages dès l'écran
  titre (taille/vitesse du texte, vibrations, son, mode daltonien, police confort)
- **Mode 4 joueurs** pour la scène des Mousquetaires (écran posé à plat, un coin par joueur)
- La **coupe du village** comme carte de progression (la profondeur EST la progression),
  silhouettes des convaincus, mode souvenir sans conséquence
- Sauvegarde invisible et permanente (localStorage `mistiflouk-save-v1`, JSON versionné),
  journal des répliques, essai gratuit et indices progressifs dans les mini-jeux
- Les **3 fins** + dernière image commune + générique

Art : portraits pixel procéduraux et décors CSS provisoires, dans la palette du dossier
(surface verte et dorée, galeries bleu nuit, orange/or de la lampe) — à remplacer par les
spritesheets définitives.

## Stack

- Vite + React 18, Zustand, vite-plugin-pwa — 100 % statique, aucun backend,
  fonctionne hors ligne après la première visite
- Sons de synthèse WebAudio (les trois notes de Mistiflouk), vibrations `navigator.vibrate`

## Structure

```
src/
  store/       Zustand (réputation, flags, progression) + sauvegarde versionnée
  engine/      conditions, sons ; le moteur de scène vit dans screens/SceneScreen.jsx
  data/        personnages + les 17 scènes (un fichier par scène, scripts verbatim)
  screens/     titre / coupe du village / scène / réglages / fin
  minigames/   les 12 mini-jeux + hôte commun (pause, indices, démo)
  components/  DialogueBox, ChoiceButtons, Portrait, HoldStill, SceneBackdrop
```

Valider les graphes de scènes : `npm run validate`

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` (build + GitHub Pages).
Réglage à faire une fois : Settings → Pages → Source : « GitHub Actions ».
Passage APK : PWABuilder / workflow « Build APK » (voir le dossier, Partie II §8).
