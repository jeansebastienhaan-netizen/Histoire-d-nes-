# MISTIFLOUK — Dossier de production complet

> Document unique du projet. Ordre de lecture : Partie I (design) → Partie II (technique) → Partie III (UX) → Parties IV (scripts).
> En cas de contradiction : Partie I > Parties IV > Partie III > Partie II.


---
---

# PARTIE I — GAME DESIGN
> **À lire en premier à chaque session de développement.** Cette partie fixe les règles non négociables du projet. En cas de contradiction entre parties du dossier, l'ordre de priorité est : Partie I (design) > Partie IV (scripts) > Partie III (UX) > Partie II (technique).

---

## 1. Le jeu en trois phrases

Mistiflouk, le serpent de compagnie d'Aloïs, disparaît dans des galeries inconnues sous le village. Pour le retrouver, Aloïs doit convaincre chaque membre de sa famille de descendre — chacun débloque un passage grâce à ce qu'il est. Un jeu narratif mobile chaleureux, en pixel art, où les choix de dialogue colorent chaque scène et reviennent tous au final.

## 2. Structure du dossier

Tout le projet tient dans ce document unique :
- **Partie I** (celle-ci) — design, variables, direction artistique, plan de production
- **Partie II** — stack technique, PWA, GitHub Pages, PWABuilder
- **Partie III** — règles UX, accessibilité, checklist de recette
- **Partie IV.A** — script : acte 1, ouverture (scènes 1-4 : disparition, descente, Papy)
- **Partie IV.B** — script : JS et la lampe (scènes 5-6)
- **Partie IV.C** — script : scènes 7 à 17 (Mamy → finale)

Les scripts (Parties IV) sont à implémenter **tels quels**.

## 3. RÈGLE ABSOLUE : le texte

**Aucune réplique, aucun texte narratif ne doit être inventé, reformulé, résumé ou "amélioré".** Les scripts sont la source unique. Si un texte manque pour un état non prévu (bouton, message d'erreur, réglage), le rédiger dans le ton du narrateur (chaleureux, sobre, style conte) et le **lister dans un fichier `TEXTES_AJOUTES.md`** pour validation par l'auteur.

## 4. Registre des variables (source de vérité)

### Réputation (invisibles pour le joueur, cumulatives)
- `coeur`, `ruse`, `determination` — incrémentées par les choix (valeurs dans les scripts). La teinte dominante peut colorer des micro-variations de répliques au final, jamais l'accès aux fins.

### Flags d'histoire (booléens)
| Flag | Posé à | Effet |
|---|---|---|
| `a_une_lampe` | Sc.2 (choix A2) | Variante descriptive galerie + indice marques d'outils |
| `indice_trace_droite` | Sc.1 (choix A1b) | Dialogue bonus Mamy (Sc.7) |
| `papy_convaincu_coeur/ruse/det` | Sc.3 | Variante de l'épreuve de l'éboulis |
| `histoire_grandpere_entendue` | Sc.3 (Cœur) ou Sc.4 (Dét. parfaite) | Réplique de Papy au final |
| `treuil_abime` | Sc.4 (échec) | Dette : réplique Cyril/Papy au final |
| `js_convaincu_coeur/ruse/det` | Sc.5 | Personnalité de la lampe (confiante/curieuse/fière) — persiste tout le jeu |
| `js_trouble_vu` | Sc.5 (Ruse) | Dialogue JS/Aloïs au final |
| `lampe_a_flanche` | Sc.6 (échec) | Réplique de JS au final |
| `mamy_reve_confirme` | Sc.7 (si `indice_trace_droite`) | Réplique de Mamy au final |
| `mamy_a_l_ancienne` | Sc.7 (échec) | Couleur de dialogue ultérieure |
| `lo_demonstration` | Sc.8 (échec) | Jules demandera « le coup de la fleur » |
| `cyril_poing` | Sc.9 (échec) | Lana bande sa main en Sc.13 |
| `sifflement_entendu` | Sc.10 (échec) | Réplique de Xavier en Sc.11 |
| `mistiflouk_a_repondu` | Sc.11 | État narratif (espoir confirmé) |
| `oxane_invitation` | Sc.12 (Cœur) | Variante douce du labyrinthe |
| `royaume_oxane` | Sc.12 (échec) | Oxane baptise la salle au final |
| `lana_vepres` | Sc.13 (échec) | Couleur de dialogue |
| `decret_artistique` | Sc.14 (échec) | Couleur de dialogue |
| `noelia_oeufs` | Sc.14 (obligatoire) | Réplique de Noélia au final |
| `mousquetaires_a_mains_nues` | Sc.15 (échec) | Réplique des 4 au final |

Le final (Sc.17) joue **toutes** les répliques conditionnelles dont le flag est posé, dans l'ordre du script.

## 5. Structure d'une scène (patron unique)

1. Accroche du narrateur → 2. Persuasion (3 voies, ou variante propre au personnage) → 3. Épreuve (mini-jeu classique, 3 variantes de paramètres selon la voie) → 4. Issue d'échec narrative jamais bloquante → 5. Sortie avec phrase d'accroche vers la scène suivante.

**Ordre des scènes** : Ouverture → Papy → JS → Mamy → Lo → Cyril → Xavier → Manu → Oxane → Lana → Noélia → Mousquetaires → Jules → Finale. Progression strictement linéaire (pas de monde ouvert) : la coupe du village sert de carte de progression, pas de navigation libre.

## 6. Les 12 mini-jeux (mécaniques classiques adaptées)

Mikado de pierres (Papy) · Fil chaud de la flamme (JS) · Mastermind (Mamy) · Planche porteuse + timing (Lo) · Coffre-fort haptique (Cyril) · Simon (Xavier) · Rythme 3 colonnes (Manu) · Labyrinthe mémoire (Oxane) · Taquin 3×3 (Lana) · Tetris d'inventaire (Noélia) · Coordination 4 zones (Mousquetaires) · Cohérence cardiaque (Jules — **ne peut pas échouer**, règle de design).

**Mode 4 joueurs (Mousquetaires) : INCLUS EN V1.** Écran posé à plat, un coin par joueur, proposé avant l'épreuve (« Vous êtes plusieurs ? »), avec repli solo identique. Multitouch 4 points requis — tester sur appareil réel.

**Mode raconté** (réglages) : chaque mini-jeu a une résolution automatique narrative — obligatoire dès la v1.

## 7. Direction artistique : PIXEL ART DÉTAILLÉ (hi-bit)

Le style visé n'est pas le rétro minimaliste 8-bit, mais le **pixel art moderne et riche** — la famille visuelle d'Eastward, Owlboy ou Octopath (versant 2D) : des pixels assumés, mais denses en détails, en lumière et en matière.

- **Résolution de référence : 540×960 pixels logiques** (portrait), upscalée ×2 (ou ×3 sur grands écrans) en **nearest-neighbor strict** (`image-rendering: pixelated`, aucun lissage). Assez fin pour du détail, assez pixel pour l'identité.
- **Palette généreuse mais maîtrisée** : ~64 couleurs de base, avec rampes de dégradés dédiées à la lumière. Deux ambiances : surface (verts profonds, dorés de fin d'été, ciels laiteux) et galeries (bleus nuit, bruns terreux, gris de pierre) — traversées par l'**orange/or de la lampe, couleur narrative** : tout ce qui compte est touché par sa lumière.
- **Personnages** : sprites en scène ~64×96 px, animés (idle 4-6 frames, marche 6-8 frames, une animation signature chacun : Papy qui remonte sa casquette, Mamy qui astique sa boule, les Mousquetaires qui se replacent en formation…). Silhouettes immédiatement reconnaissables.
- **Portraits de dialogue : 160×160 px, soignés** — c'est là que le « détaillé » paie le plus : visages expressifs, 3-4 expressions par personnage (neutre, ému, réjoui, surpris), petites animations de portrait (clignement, mèche qui bouge). Les portraits sont la vitrine des personnages : y mettre le budget pixel.
- **Décors travaillés** : parallaxe 2-3 plans, textures de pierre détaillées, végétation animée en surface, gouttes et poussières en suspension dans les galeries. Chaque scène a UN élément de décor mémorable (le tilleul, l'écluse, la crypte, la salle ronde).
- **La lumière est le langage visuel du jeu** : halo de la lampe en dégradés doux avec dithering fin, spirales gravées qui s'embrasent pixel par pixel, rayons volumétriques stylisés au trou d'entrée. La salle finale = le feu d'artifice de palette du jeu. Effets réalisés en techniques pixel (dithering, rampes de couleur), pas en flous modernes.
- **Mistiflouk** : sprite fin et sinueux (~48 px de long), ondulation fluide 8 frames, reflets sur les écailles ; ses traces au sol sont un motif récurrent du jeu.
- **Texte** : police pixel lisible et fine (type m5x7/m6x11 ou équivalent libre) rendue à taille UX conforme (≥ 17 pt) ; option « police confort » (sans-serif) dans les réglages.
- **Animations d'interface** : transitions de scène en fondu par trame de dithering ; objets ramassés qui rejoignent le sac avec un arc animé ; timing général doux — ce n'est pas un jeu d'arcade nerveux.
- Rendu : Canvas 2D natif (pas de Three.js). Assets en spritesheets PNG. Prévoir un fichier `palette.png` de référence et s'y tenir strictement.

## 8. Ce que le jeu n'est PAS (garde-fous)

- Pas de combat, pas de mort, pas de game over, pas de score, pas de timer visible (hors mini-jeux qui l'exigent).
- Pas de monnaie, pas de pub, pas de notification, pas de compte.
- Pas d'humour moqueur : chaque personnage est une caricature **affectueuse**, montrée sous son meilleur jour. Test avant toute retouche visuelle ou textuelle : « la vraie personne sourirait-elle devant toute la famille ? »
- Le mystère (spirales, origine de la lampe, instinct de Mistiflouk) n'est **jamais** expliqué. Mamy a le dernier mot : les bonnes soupes.

## 9. Plan de production

1. **Sprint 0** — squelette PWA déployé sur Pages (cf. Partie II), moteur de dialogue + registre de variables, écran titre pixel art, coupe du village.
2. **Sprint 1** — Scènes 1-4 (ouverture + Papy) complètes, mode raconté inclus.
3. **Sprint 2** — Scènes 5-6 (JS), la lampe comme élément d'interface persistant.
4. **Sprints 3-7** — deux scènes par sprint dans l'ordre du jeu ; le mode 4 joueurs arrive au sprint des Mousquetaires.
5. **Sprint final** — Scène 17 avec toutes les répliques conditionnelles, les 3 fins, épilogues, générique. Passage de la checklist UX complète, puis PWABuilder.

À chaque sprint : build vert, Lighthouse installable, sauvegarde rétrocompatible, `TEXTES_AJOUTES.md` à jour.


---
---

# PARTIE II — GUIDE TECHNIQUE (PWA → APK)
## Objectif : PWA sur GitHub Pages → APK via PWABuilder

Ce guide est destiné à Claude Code. Il décrit la stack, les contraintes techniques et le pipeline de livraison. Le contenu narratif se trouve dans les Parties I et IV de ce dossier — le consulter avant d'écrire tout dialogue.

---

## 1. Vue d'ensemble

- **Type** : jeu narratif mobile, portrait, tactile, un joueur
- **Cible finale** : APK Android générée par PWABuilder à partir d'une PWA hébergée sur GitHub Pages
- **Conséquence** : le jeu DOIT être une PWA valide dès le premier commit (manifest + service worker + HTTPS + chemins relatifs)

## 2. Stack imposée

- Vite + React 18 (pas de Next.js — GitHub Pages est du statique pur)
- Zustand pour l'état global (réputation, flags, fragments, inventaire)
- Sauvegarde : localStorage (JSON versionné, clé `grand-silence-save-v1`)
- Pas de Three.js : carte du village en SVG/images + CSS
- Pas de backend, pas d'API externe, tout embarqué
- vite-plugin-pwa pour le manifest et le service worker

## 3. Initialisation du projet

```bash
npm create vite@latest grand-silence -- --template react
cd grand-silence
npm install zustand
npm install -D vite-plugin-pwa
```

### vite.config.js — points critiques pour GitHub Pages

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  // OBLIGATOIRE : nom exact du repo GitHub, sinon assets cassés sur Pages
  base: '/grand-silence/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Le Grand Silence',
        short_name: 'Grand Silence',
        description: 'Un village muet, une enquête, treize rencontres.',
        start_url: '/grand-silence/',
        scope: '/grand-silence/',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#1a1a2e',
        theme_color: '#1a1a2e',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webp,woff2,json,mp3}']
      }
    })
  ]
})
```

Règles associées :
- Icônes 192, 512 et 512 maskable obligatoires (PWABuilder les exige).
- Tous les assets référencés en chemins relatifs ou via imports Vite. Jamais de chemin absolu `/images/...`.
- Le service worker doit précacher tout le jeu : il doit fonctionner 100 % hors ligne après la première visite.

## 4. Architecture du code

```
src/
  main.jsx
  App.jsx                  # routeur d'écrans (titre / carte / rencontre / carnet / fin)
  store/
    gameStore.js           # Zustand : réputation, flags, fragments, chapitre courant
    save.js                # load/save localStorage + migration de version
  engine/
    dialogueEngine.js      # interprète le graphe JSON de dialogues
    conditions.js          # évaluation des conditions (flags, réputation, fragments)
  data/
    characters.json        # les 13 personnages + Mistiflouk
    chapters/
      chapter1.json        # graphe de dialogues + défis du chapitre 1
      ...
  screens/
    TitleScreen.jsx
    VillageMap.jsx         # carte SVG, zones cliquables, déblocage par chapitre
    EncounterScreen.jsx    # dialogue + choix + mini-jeu
    NotebookScreen.jsx     # carnet : fragments récoltés, vœu qui se reconstitue
    EndingScreen.jsx
  minigames/
    RhythmTap.jsx          # tap rythmé (Xavier, Cyril, Lo)
    DragPhysics.jsx        # drag/swipe (Papy, Manu)
    TimedDialogue.jsx      # choix chronométrés (Jules, Oxane, Noélia, Mousquetaires)
    LogicPuzzle.jsx        # déduction (Aloïs, Mamy, Lana)
  components/
    Mistiflouk.jsx         # compagnon d'interface (après le chapitre d'Aloïs)
    DialogueBox.jsx
    ChoiceButtons.jsx
```

### Format du graphe de dialogues (contrat de données)

```json
{
  "id": "mamy_intro",
  "nodes": {
    "start": {
      "speaker": "carnet",
      "text": "…",
      "next": "mamy_1"
    },
    "mamy_choice": {
      "speaker": "mamy",
      "text": "…",
      "choices": [
        { "label": "…", "effects": { "coeur": 1 }, "setFlags": ["a_aide_mamy"], "next": "suite_a" },
        { "label": "…", "effects": { "ruse": 1 }, "next": "suite_b" },
        { "label": "…", "condition": { "flag": "a_mistiflouk" }, "next": "suite_c" }
      ]
    },
    "fin": { "type": "reward", "fragment": "fragment_01", "next": "END" }
  }
}
```

- `effects` : deltas sur les 3 axes de réputation (coeur / ruse / determination)
- `condition` : flag requis, seuil de réputation, ou nombre de fragments
- Un nœud peut lancer un mini-jeu : `{ "type": "minigame", "game": "RhythmTap", "config": {...}, "onSuccess": "...", "onPartial": "...", "onFail": "..." }`
- L'échec n'est jamais bloquant : `onFail` renvoie toujours vers un nœud qui permet de réessayer ou de revenir plus tard.

## 5. Contraintes de ton (rappel — détail en Partie I)

- Narrateur : le carnet de Mamy, bienveillant, style conte du soir. Aucun sarcasme.
- Chaque personnage est montré sous son meilleur jour ; son trait est une force, jamais moqué.
- Test avant validation d'une scène : « la vraie personne sourirait-elle en lisant son personnage devant la famille ? »
- L'humour vient des situations (ardoises, serpent-sonar), jamais des personnes.

## 6. Contraintes mobiles

- Viewport verrouillé portrait, `user-scalable=no`, zones tactiles ≥ 44 px
- Cibler 60 fps sur téléphone milieu de gamme : pas d'animations lourdes, transitions CSS simples
- Sessions courtes : sauvegarde automatique après chaque nœud de dialogue résolu
- Sons : petits fichiers mp3/ogg, préchargés par le service worker ; le retour progressif du son est une mécanique du jeu (chaque personnage sauvé rétablit un bruitage)
- Vibration : `navigator.vibrate()` pour la piste sonore de Mistiflouk (avec fallback visuel si non supporté)

## 7. Déploiement GitHub Pages

Créer `.github/workflows/deploy.yml` :

```yaml
name: Deploy
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

Puis dans les réglages du repo : Settings → Pages → Source : « GitHub Actions ».

URL finale : `https://<utilisateur>.github.io/grand-silence/`

### Vérification PWA avant de passer à l'APK

- Lighthouse (Chrome DevTools → Lighthouse → PWA) : score installable requis
- Tester hors ligne : couper le réseau, recharger — le jeu doit se lancer
- Tester « Ajouter à l'écran d'accueil » sur un vrai téléphone Android

## 8. Génération de l'APK avec PWABuilder

Étapes (à faire manuellement, hors Claude Code) :

1. Aller sur https://www.pwabuilder.com
2. Coller l'URL GitHub Pages et lancer l'analyse — corriger tout ce qui est signalé en rouge (généralement : icônes manquantes ou manifest incomplet)
3. « Package for stores » → Android
4. Options recommandées :
   - Package ID : `be.famille.grandsilence` (format inverse de domaine, sans tirets)
   - App name : Le Grand Silence
   - Display mode : standalone / fullscreen
   - Signing : « Create new » — PWABuilder génère la clé. **Télécharger et conserver le fichier de signature** (indispensable pour toute mise à jour future de l'APK)
5. Télécharger le zip : il contient `app-release-signed.apk`
6. Distribuer l'APK (WhatsApp, lien Drive…). Sur le téléphone : autoriser l'installation depuis des sources inconnues à la première installation.

Point important : l'APK PWABuilder est une Trusted Web Activity — elle affiche le site en ligne. Les mises à jour du jeu se font donc en poussant sur `main` : pas besoin de régénérer l'APK, tout le monde a la dernière version automatiquement. On ne régénère l'APK que si le manifest change (nom, icône, couleurs).

Optionnel (supprime la barre d'adresse résiduelle sur certains appareils) : ajouter le fichier `public/.well-known/assetlinks.json` avec l'empreinte SHA-256 fournie par PWABuilder lors de la signature.

## 9. Ordre de livraison demandé

1. **Sprint 1** : squelette Vite+PWA, déploiement Pages fonctionnel, écran titre, carte du village avec zones (verrouillées sauf chapitre 1), moteur de dialogue minimal, sauvegarde
2. **Sprint 2** : chapitre 1 complet (Mamy, premier fragment, carnet)
3. **Sprint 3** : chapitre d'Aloïs et Mistiflouk (piste sonore, 3 branches, serpent compagnon d'interface)
4. **Sprints suivants** : un chapitre à la fois, validation du ton des dialogues avant de passer au suivant
5. **Dernier sprint** : les 7 fins + épilogues individuels + passage PWABuilder

À chaque sprint : vérifier que le build passe, que Lighthouse reste installable, et que la sauvegarde survit à la mise à jour.


---
---

# PARTIE III — EXPÉRIENCE UTILISATEUR
> Document de référence pour Claude Code. Ces règles priment sur toute habitude de développement web classique : un jeu narratif mobile ne se conçoit pas comme un site.

---

## 1. Les références dont on s'inspire (et ce qu'on leur prend)

**Florence** (Mountains, 2018) — le maître-étalon du récit mobile court.
→ À prendre : les mini-jeux comme métaphores de la scène (jamais des obstacles), la difficulté qui SERT l'émotion, zéro texte d'interface pendant les moments forts, chapitres de 2-5 minutes.

**Monument Valley** — l'élégance tactile.
→ À prendre : un seul geste par contexte, jamais deux façons de faire la même chose ; tout objet touchable répond immédiatement (animation ou son), même si le geste est inutile ; aucune interface visible pendant le jeu — juste le monde.

**Professor Layton** — l'intégration des casse-têtes au récit.
→ À prendre : chaque énigme est introduite PAR un personnage, dans ses mots à lui ; système d'indices progressifs optionnels ; l'échec relance sans humilier ; on peut quitter une énigme et revenir.

**Old Man's Journey / A Short Hike** — la douceur.
→ À prendre : aucun timer visible sauf nécessité absolue, aucune mort, aucun game over ; le rythme appartient au joueur ; les récompenses sont contemplatives (un paysage, un son, un moment).

**Rusty Lake / Lost Words** — le tactile narratif.
→ À prendre : faire TOUCHER les éléments de l'histoire (ramasser la mue, poser la lampe dans la coupe) plutôt que de les raconter.

**Sky: Children of the Light** — le multijoueur doux.
→ À prendre : pour la scène des Mousquetaires à 4 joueurs, la coopération sans compétition ni chronomètre punitif.

**Anti-références (ce qu'on refuse) :** publicités, notifications, monnaies, énergie/vies, pop-ups de notation, tutoriels en pavés de texte, boutons « OK » à répétition.

---

## 2. Règles cardinales

1. **Une main, pouce droit ou gauche.** Toute action possible dans le tiers inférieur de l'écran. Les choix de dialogue s'affichent en bas, jamais au centre.
2. **Tout tap répond en < 100 ms** par un retour visuel ou sonore, même les taps « inutiles » (toucher le décor fait frémir l'herbe, briller une spirale…). Un écran muet au toucher est un écran cassé.
3. **Zéro game over, zéro écran d'échec.** Déjà dans le scénario ; l'UI doit suivre : jamais de rouge, jamais de « ÉCHEC », jamais de son négatif agressif. L'issue d'échec s'enchaîne comme une scène normale.
4. **Le joueur n'attend jamais.** Aucune animation non interruptible > 2 s. Tap pendant une transition = on accélère.
5. **Sauvegarde invisible et permanente.** Après chaque nœud de dialogue et chaque manche de mini-jeu. Fermer l'app à n'importe quel instant et revenir exactement là. Aucun bouton « sauvegarder ».

---

## 3. Le dialogue (cœur du jeu, donc cœur de l'UX)

- **Affichage** : bulle en bas d'écran, portrait du personnage à gauche, nom au-dessus. Texte en apparition progressive (25-30 caractères/seconde) ; **un tap affiche tout, un second passe à la suite**. Standard absolu du genre — ne pas innover ici.
- **Longueur** : max 3 lignes par bulle à l'écran. Les répliques longues du script sont découpées en plusieurs bulles.
- **Historique** : glisser vers le bas ouvre le journal des répliques passées (backlog). Indispensable — on pose le téléphone, on revient, on a oublié.
- **Choix** : 2-3 boutons pleine largeur, empilés en bas. Pas de timer sur les choix (sauf mention explicite du script). L'ordre des options est mélangé aléatoirement pour ne pas créer de « bouton du haut = gentil ».
- **Aucun indicateur Cœur/Ruse/Détermination visible.** Pas d'icônes sur les choix, pas de jauges : le joueur choisit ce qui lui ressemble, pas ce qui « score ». Les conséquences se découvrent en jouant — c'est le contrat du jeu.
- **Vitesse réglable** (lent / normal / rapide / instantané) dans les réglages, dès le premier écran.

## 4. Les mini-jeux

- **Introduction en jeu, jamais en tutoriel** : c'est le personnage qui explique dans ses mots (déjà écrit dans le script), accompagné d'une **démonstration animée de 3 s** (une main fantôme fait le geste une fois). Pas de panneau de règles.
- **Manche d'essai gratuite** systématique : le premier essai ne compte jamais. Non signalé au joueur — il découvre juste qu'il « a le droit de se rater ».
- **Indices progressifs façon Layton** : après 2 échecs sur une manche, un bouton discret « Un coup de main ? » apparaît (le personnage donne un indice ; un 2ᵉ appui quasi-résout). Jamais imposé.
- **Zones tactiles ≥ 60 px**, fenêtres de timing généreuses par défaut (la variante Détermination du scénario est la SEULE difficulté élevée du jeu, et elle est choisie par le joueur via ses dialogues).
- **Le geste avant la précision** : sur mobile, viser est pénible, rythmer est agréable. En cas de doute sur un réglage, élargir les hitbox et resserrer le tempo, jamais l'inverse.
- **Interruption propre** : bouton pause discret (coin supérieur), qui fige le mini-jeu et propose reprendre / réécouter la consigne / quitter la scène (retour possible plus tard, comme Layton).

## 5. Le son — mécanique ET récompense

- Le jeu est conçu autour de l'écoute (sifflement, échos, chant). **Bandeau au premier lancement : « Ce jeu est plus beau avec le son 🔊 »** — mais tout signal sonore a un équivalent visuel (le sifflement fait aussi onduler l'air, les clics de la vanne font vibrer + scintiller). Jouable en silencieux, meilleur avec casque.
- **Vibration** : utilisée pour les clics de la vanne et la lampe qui « tire » — toujours doublée d'un signal visuel, désactivable.
- **La descente s'entend** : plus on descend, plus l'ambiance sonore s'enrichit (gouttes, résonance, souffle). La progression se ressent à l'oreille.
- Musique discrète, thèmes courts par personnage (3-4 notes chacun), le thème de Mistiflouk = ses trois notes. Le final les superpose tous.

## 6. Carte, progression, navigation

- **Écran d'accueil = la coupe du village** : vue en coupe verticale (village en haut, galeries qui se dévoilent en dessous au fil du jeu). La profondeur atteinte EST la barre de progression — aucun « 43 % » nulle part.
- Les personnages convaincus apparaissent en petites silhouettes sur la coupe, à leur poste. Toucher une silhouette = revoir sa scène (mode souvenir, sans conséquence).
- **Reprendre une partie** : un seul bouton « Continuer » plein écran avec la dernière phrase du narrateur en rappel (« Vous cherchiez de la lumière… »). Pas de menu à tiroirs.
- **Sessions courtes assumées** : une scène complète = 5-8 minutes. Toujours finir une scène sur une phrase d'accroche (déjà dans le script) : on peut poser le téléphone satisfait ET curieux.

## 7. Lisibilité et accessibilité

- Corps de texte ≥ 17 pt équivalent, contraste AA sur fonds sombres (le jeu se passe sous terre : bannir le gris foncé sur noir — utiliser le halo chaud de la lampe comme zone de lecture).
- **Réglages dès l'écran titre** : taille du texte (3 crans), vitesse du texte, vibrations on/off, **« mode raconté »** (les mini-jeux se résolvent automatiquement en version narrative — pour les plus petits et pour jouer à l'histoire en famille le soir), et **mode daltonien** pour le Mastermind de Mamy (les lueurs dorée/argentée sont doublées de formes : cercle plein / anneau).
- Aucune information portée par la couleur seule, nulle part.
- Les portraits des personnages accompagnent CHAQUE réplique : les non-lecteurs suivent qui parle.

## 8. Le premier lancement (les 90 premières secondes décident de tout)

1. Logo bref (< 2 s, tap pour passer)
2. Écran titre : le tilleul, le trou, trois notes sifflées. Un bouton : « Commencer »
3. **Aucun réglage imposé, aucune explication** : la scène 1 démarre. Le premier choix (« Par où commencer ? ») EST le tutoriel des choix ; le premier mini-jeu (Papy) EST le tutoriel des mini-jeux, avec sa démo de 3 s.
4. La demande de son/vibration arrive contextuellement (juste avant la scène de JS, quand le son devient utile), jamais en rafale au lancement.

## 9. Finitions qui font « jeu fini » (le juice, avec retenue)

- Transitions entre scènes : fondu au noir avec une phrase du narrateur — jamais d'écran de chargement visible (précharger la scène suivante pendant les dialogues).
- Chaque objet d'histoire ramassé (mue, carte de Lana, œuf de Noélia…) rejoint physiquement le sac à l'écran, avec un petit son propre.
- Les réussites parfaites déclenchent les répliques bonus du script + un effet lumineux bref — jamais de « PARFAIT ! » clinquant : ce jeu récompense par l'histoire, pas par des confettis.
- Icône d'app : Mistiflouk lové autour de la lampe. Splash screen assorti. Nom court : « Mistiflouk ».

## 10. Checklist de recette avant chaque livraison

- [ ] Jouable entièrement au pouce, téléphone tenu d'une main
- [ ] Fermer l'app en plein mini-jeu → rouvrir → on reprend au début de la manche
- [ ] Mode raconté : l'histoire complète se déroule sans toucher un mini-jeu
- [ ] Aucun texte tronqué en taille de police maximale
- [ ] Silencieux total : tout reste compréhensible
- [ ] Un enfant de 8 ans comprend chaque mini-jeu avec la seule démo de 3 s
- [ ] Aucune scène ne se termine sans sa phrase d'accroche vers la suivante


---
---

# PARTIE IV.A — SCRIPT : Acte 1, ouverture (scènes 1-4)
> Document de référence narratif. Claude Code implémente ce script tel quel : aucune réplique ne doit être inventée ou reformulée. Les identifiants de nœuds sont indicatifs.

**Rappel des variables**
- Réputation : `coeur`, `ruse`, `determination` (invisibles pour le joueur)
- Flags posés dans cet acte : `papy_convaincu_coeur`, `papy_convaincu_ruse`, `papy_convaincu_det`, `treuil_abime`, `histoire_grandpere_entendue`
- Le narrateur parle en encadrés courts, ton chaleureux, style conte du soir. Jamais de moquerie.

---

## SCÈNE 1 — Le matin sans sifflement

**[Narrateur]**
Chez Aloïs, le matin commence toujours pareil : trois notes sifflées depuis la véranda. Mistiflouk salue le soleil avant tout le monde.
Ce matin, rien.

**[Aloïs]** (à voix haute, pour lui-même)
Mistiflouk ?

**[Narrateur]**
Le terrarium est ouvert. Pas forcé — ouvert. Mistiflouk sait faire, il le fait souvent. Mais il ne va jamais plus loin que le potager.

> **CHOIX A1 — Par où commencer ?**
> 1. Vérifier le potager, comme d'habitude *(→ A1a)*
> 2. Chercher des traces autour de la maison *(→ A1b, `determination +1`)*
> 3. Appeler en sifflant ses trois notes *(→ A1c, `coeur +1`)*

**[A1a — Le potager]**
Les salades sont intactes, la pierre plate où il aime se chauffer est froide. Il n'est pas venu ici ce matin. *(→ converge vers A2)*

**[A1b — Les traces]**
Aloïs fait le tour de la maison, les yeux au sol. Là — une trace fine et sinueuse dans la terre meuble, qui file droit vers le fond du jardin. Droit. Mistiflouk ne va jamais droit. Sauf quand quelque chose l'appelle. *(→ A2, le joueur gagne l'indice « la trace filait droit », réutilisé plus tard par Mamy)*

**[A1c — Les trois notes]**
Aloïs siffle. Une fois. Deux fois. Le jardin retient son souffle avec lui.
Rien. Et ce rien-là ne ressemble à aucun autre silence.
*(→ A2)*

**[A2 — Le tilleul]**

**[Narrateur]**
La piste — ou l'instinct — mène au vieux tilleul, derrière l'église. L'arbre le plus vieux du village, celui sous lequel tout le monde a fait la sieste au moins une fois.
Entre deux racines grosses comme des bras, la terre s'est ouverte. Un trou sombre, bien trop régulier pour être un terrier.
Et accrochée à une racine, à l'entrée : une mue. Fraîche.

**[Aloïs]**
Il est passé par là. Ce matin.

> **CHOIX A2 — Devant le trou**
> 1. Descendre tout de suite *(→ Scène 2, `determination +1`)*
> 2. Aller d'abord chercher une lampe de poche à la maison *(→ Scène 2 avec flag `a_une_lampe`, `ruse +1`)*
> 3. Hésiter — prévenir quelqu'un d'abord ? *(→ A2b)*

**[A2b — L'hésitation]**

**[Narrateur]**
Prévenir quelqu'un. C'est raisonnable. C'est ce qu'on fait, normalement.
Mais Mistiflouk est là-dessous, quelque part, et chaque minute est une minute de plus dans le noir.

**[Aloïs]** (regardant la mue dans sa main)
Je descends. Je préviendrai après.

*(→ Scène 2 — l'hésitation est humaine, le jeu ne la punit pas : `coeur +1`)*

---

## SCÈNE 2 — La première galerie

**[Narrateur]**
Le trou descend en pente douce, puis s'élargit. Et là, Aloïs comprend que personne au village ne connaît cet endroit.
Ce n'est pas un terrier. Ce n'est pas une cave. C'est une galerie — des murs droits, taillés à la main, il y a très, très longtemps. Assez haute pour marcher courbé. Elle continue, loin, bien au-delà de ce que la lumière du trou éclaire.

**Variante si `a_une_lampe`** : le faisceau accroche des marques régulières sur les parois — des coups d'outils. Quelqu'un a creusé ça. Des gens. *(indice bonus pour plus tard)*
**Variante sinon** : Aloïs avance à tâtons, une main sur la paroi. La paroi est étrangement lisse, presque douce, comme usée par des années de passages. *(indice différent, même valeur)*

**[Narrateur]**
Dix mètres. Vingt. Puis la main d'Aloïs rencontre autre chose : de la pierre effondrée. Un éboulis, du sol au plafond. Ancien, tassé, sérieux.
Et devant l'éboulis, dans la poussière fine du sol : une trace sinueuse, qui disparaît dans un interstice grand comme le poing. Mistiflouk est passé. Aloïs, non.

**[Aloïs]** (dans l'interstice, doucement)
Mistiflouk... si tu m'entends... bouge pas. Je reviens. Je te promets que je reviens.

**[Narrateur]**
Seul, il lui faudrait une semaine pour dégager ça. Mais Aloïs connaît quelqu'un pour qui les choses lourdes sont une conversation entre gens de bonne compagnie.

*(→ Scène 3)*

---

## SCÈNE 3 — Papy

**[Narrateur]**
On trouve Papy là où on le trouve toujours à cette heure : sur son tracteur, au bout du champ, en train de faire semblant de ne pas voir que le monde s'agite sans lui.

**[Papy]** (coupant le moteur en voyant arriver Aloïs)
Oh. À la vitesse où tu cours, c'est soit très grave, soit très intéressant.

> **CHOIX P1 — Comment lui demander ?**
> 1. **Tout raconter, d'un trait** — la vérité, l'inquiétude, tout *(→ P1a, voie Cœur)*
> 2. **L'appâter** — « Papy... tu savais, toi, qu'il y a des galeries sous le village ? » *(→ P1b, voie Ruse)*
> 3. **Aller droit au but** — « J'ai besoin du tracteur. Maintenant. » *(→ P1c, voie Détermination)*

### P1a — La voie du Cœur

**[Aloïs]**
C'est Mistiflouk. Il est parti cette nuit, il est descendu dans un trou sous le vieux tilleul — Papy, il y a des galeries là-dessous, des vraies, creusées par des gens — et il y a un éboulis, et il est passé de l'autre côté, et moi je peux pas, et...

**[Papy]** (levant une main)
Respire, petit. On règle jamais rien en apnée.

**[Narrateur]**
Papy descend du tracteur. Lentement, comme tout ce qu'il fait — mais il descend.

**[Papy]**
Des galeries. Sous le tilleul.
(un silence)
Mon grand-père me parlait de « la cave d'en bas », quand j'étais gamin. Je croyais que c'était une histoire pour m'endormir. Tout le monde le croyait.
(il remonte sur le tracteur)
Monte. Si le serpent a retrouvé la cave d'en bas, on va pas le laisser la visiter tout seul.

*(flags : `papy_convaincu_coeur`, `histoire_grandpere_entendue`, `coeur +2` — Papy arrive **motivé** : voir Épreuve, variante 1)*

### P1b — La voie de la Ruse

**[Aloïs]** (faussement dégagé)
Papy... toi qui sais tout sur le village... tu savais qu'il y a des galeries, là-dessous ? Des vraies. Taillées à la main.

**[Papy]** (sans bouger de son siège)
Mm. Et toi, tu sais que quand tu prends cet air-là, tu ressembles à ta grand-mère quand elle voulait m'emprunter la remorque ?

**[Aloïs]**
...Il y a un éboulis. Et Mistiflouk est de l'autre côté.

**[Papy]**
Voilà. C'était pas si dur.
(il tapote le volant)
La prochaine fois, commence par la fin : c'est la fin qui m'intéresse. Allez, monte.

**[Narrateur]**
Il ne le dira pas, mais le mot « galeries » travaille déjà quelque part sous sa casquette.

*(flags : `papy_convaincu_ruse`, `ruse +2` — Papy arrive **prudent et curieux** : voir Épreuve, variante 2)*

### P1c — La voie de la Détermination

**[Aloïs]**
J'ai besoin du tracteur. Maintenant.

**[Papy]** (un sourcil qui monte, très lentement)
Le tracteur, il a soixante ans, et moi un peu plus. Ni lui ni moi on démarre sur un ordre.

> **CHOIX P1c-2**
> 1. « Pardon. C'est Mistiflouk — il est coincé sous terre. S'il te plaît. » *(→ Papy hoche la tête : « Là, on se comprend. » — `coeur +1`, rejoint P1a en version courte)*
> 2. « Très bien. Alors je vais creuser à la main. » — et tourner les talons *(→ P1c-3)*

**[P1c-3]**

**[Narrateur]**
Aloïs est déjà à vingt pas quand le moteur du tracteur tousse, puis gronde derrière lui.

**[Papy]** (le dépassant au ralenti, sans le regarder)
Creuser à la main. Et puis quoi. Monte, tête de pioche — c'est de famille, mais quand même.

*(flags : `papy_convaincu_det`, `determination +2` — Papy arrive **bougon mais conquis** : voir Épreuve, variante 3)*

---

## SCÈNE 4 — L'ÉPREUVE : l'éboulis

**[Narrateur]**
Le tracteur ne descend pas sous terre, évidemment. Mais son treuil, si : Papy le positionne au-dessus du trou, entre les racines, et déroule le câble dans la galerie. En bas, il ausculte l'éboulis du plat de la main, comme un médecin.

**[Papy]**
Bon. Écoute-moi bien, parce que la pierre, ça pardonne pas l'à-peu-près. Cet éboulis, c'est un jeu de mikado : il y a des pierres qui portent et des pierres qui décorent. On tire les bonnes, dans le bon ordre, et le passage s'ouvre. On tire une mauvaise... et on recommence tout, dans quinze ans.

### Mécanique du mini-jeu

L'éboulis est affiché comme un empilement de 12 à 15 pierres. Le joueur en désigne une, Papy accroche le câble, le joueur maintient le doigt appuyé pour treuiller — **relâcher au bon moment** (jauge de tension du câble) sinon la pierre retombe. Trois pierres « porteuses » cachées : les retirer trop tôt fait glisser l'ensemble (échec partiel : la brèche se réduit, on continue avec moins de marge). But : ouvrir un passage suffisant en retirant 5 pierres.

**Aides selon la scène 3 :**

- **Variante 1 (Cœur)** — Papy est investi : avant chaque choix, il commente une pierre au choix du joueur (« Celle-là, elle porte. Touche pas. »). Trois consultations gratuites. Réussite quasi garantie si on l'écoute — la récompense d'être venu franchement.
- **Variante 2 (Ruse)** — Papy observe et laisse faire (« Tu m'as eu tout à l'heure ; montre-moi que t'as de la jugeote aussi. »). Pas d'aide directe, mais les pierres porteuses ont un indice visuel discret (poussière qui coule le long). Difficulté moyenne, satisfaction de le faire « seul ».
- **Variante 3 (Détermination)** — Papy teste Aloïs (« Tête de pioche, hein ? Alors pioche. »). Aucune aide, une pierre porteuse de plus — mais si le joueur réussit sans erreur, dialogue bonus : Papy raconte de lui-même l'histoire de « la cave d'en bas » (pose `histoire_grandpere_entendue`, sinon réservée à la voie Cœur).

**Échec total (3 erreurs)** — jamais bloquant :

**[Papy]**
Bon. Le mikado a gagné cette manche.
(il crache dans ses mains)
Plan B : la force bête et la patience. Ça prendra une heure de plus et le treuil va râler, mais on passera.

*(passage ouvert quand même, flag `treuil_abime` : plus tard dans le jeu, il faudra rendre ce service à Papy — réparer le treuil avec l'aide d'un autre personnage)*

### Sortie de scène

**[Narrateur]**
La dernière pierre roule sur le côté. Derrière, la galerie continue — plus large, plus haute. De l'air frais circule, venu de loin.

**[Papy]** (dans la brèche, à mi-voix)
Soixante-dix ans que je laboure au-dessus de ça.
(à Aloïs)
Ton serpent. Il est parti par où, tu dis ?

**[Aloïs]**
Par là. Tout droit.

**[Papy]**
Alors on va tout droit. Mais dans le noir, tout droit, ça n'existe pas. Il nous faut de la lumière — de la vraie.

**[Narrateur]**
Et au village, quand on dit « de la lumière », tout le monde pense à la même lampe... et à celui qui va avec.

*(→ Acte 1, scène suivante : JS le génie de la lampe. Fin du script d'ouverture.)*

---

## Notes d'implémentation

- Chaque variante de l'épreuve réutilise le **même** mini-jeu (une seule scène à coder), seuls changent les paramètres (aides, nombre de pierres porteuses) et les répliques de Papy.
- Les trois voies de persuasion convergent : personne n'est jamais bloqué, mais l'expérience de l'épreuve et deux flags d'histoire diffèrent. C'est le modèle à suivre pour toutes les scènes du jeu.
- L'indice de la trace « qui filait droit » (choix A1b) et les marques d'outils (`a_une_lampe`) ressortiront dans la scène de Mamy : elle y verra la confirmation de ses rêves. Prévoir les conditions.


---
---

# PARTIE IV.B — SCRIPT : JS et la lampe (scènes 5-6)
> Suite directe de la Partie IV.A. Même règle : Claude Code implémente tel quel, aucune réplique inventée.
> Ajustement global : **Papy est bourru** — phrases courtes, affection jamais dite, toujours prouvée. Ses répliques ci-dessous font référence.

**Flags posés dans cette scène** : `js_convaincu_coeur`, `js_convaincu_ruse`, `js_convaincu_det`, `lampe_a_flanche`, `js_trouble_vu`
**Rappel des flags entrants possibles** : `histoire_grandpere_entendue`, `treuil_abime`

---

## SCÈNE 5 — Celui qui va avec la lampe

**[Narrateur]**
JS, tout le monde le connaît : le génie de la lampe. Pas une lampe de chevet, non — la vieille lampe de cuivre, celle qui ne le quitte jamais, celle dont personne n'a jamais su d'où elle venait. Lui non plus, d'ailleurs. C'est peut-être pour ça qu'il ne s'en sépare pas.
On le trouve chez lui, la lampe posée sur l'établi, un chiffon à la main.

**[JS]** (sans lever les yeux)
Aloïs. Et Papy qui a coupé son moteur avant midi. Donc c'est sérieux.

**[Papy]**
Y a un trou sous le tilleul. Ça descend. Ça continue. Point.

**[JS]** (posant le chiffon, lentement)
...Continue comment ?

> **CHOIX J1 — Comment l'embarquer ?**
> 1. **La vérité d'Aloïs** — « Mistiflouk est là-dessous. Il fait tout noir. On a besoin de toi. » *(→ J1a, voie Cœur)*
> 2. **Le mystère** — « Des galeries taillées à la main. Vieilles. Personne ne sait qui les a creusées. Ça ne te rappelle rien ? » — regard vers la lampe *(→ J1b, voie Ruse)*
> 3. **Le défi** — « Papy dit que ta lampe n'éclairera jamais assez loin pour un endroit pareil. » *(→ J1c, voie Détermination — Papy n'a jamais dit ça)*

### J1a — La voie du Cœur

**[Aloïs]]**
Mistiflouk est là-dessous, JS. Tout seul. Il fait un noir complet, et moi j'ai promis que je reviendrais. Mais sans lumière, je peux pas tenir ma promesse.

**[JS]** (un temps ; il regarde la lampe, puis Aloïs)
Une promesse à quelqu'un qui t'attend dans le noir. Ça, c'est exactement le genre de chose pour quoi cette lampe existe. Je ne saurais pas te dire pourquoi je le sais. Mais je le sais.
(il la prend, elle s'allume sans qu'il l'ait touchée davantage)
Tu vois ? Elle est d'accord.

**[Papy]** (mi-voix)
Mouais. Une lampe qui a un avis. Manquait plus que ça.

*(flags : `js_convaincu_coeur`, `coeur +2` — la lampe sera **confiante** : voir Épreuve, variante 1)*

### J1b — La voie de la Ruse

**[Aloïs]**
Des galeries taillées à la main. Vieilles — plus vieilles que l'église, peut-être. Personne ne sait qui les a creusées, ni pourquoi.
(un temps)
Ça ne te rappelle rien... quelque chose qu'on a chez soi depuis toujours sans savoir d'où ça vient ?

**[Narrateur]**
Le regard de JS glisse vers la lampe. Et sur l'établi, à cet instant précis — c'est peut-être un reflet, peut-être le nuage qui passe — le cuivre semble frémir.

**[JS]** (doucement)
C'est petit, ce que tu fais là, Aloïs.
(il attrape sa veste)
Et ça marche complètement. Allons-y.

*(flags : `js_convaincu_ruse`, `js_trouble_vu`, `ruse +2` — la lampe sera **curieuse** : voir Épreuve, variante 2. Le flag `js_trouble_vu` ouvre un dialogue supplémentaire à l'acte final.)*

### J1c — La voie de la Détermination

**[Aloïs]**
Papy dit que ta lampe n'éclairera jamais assez loin. Que là-dessous, il faut des vraies torches.

**[Papy]** (immédiatement)
J'ai rien dit de tel.

**[JS]** (déjà debout, la lampe à la main)
Non, mais maintenant c'est dit. Et ça mérite réponse.
(à la lampe, presque en confidence)
On va leur montrer, hein ?

**[Papy]** (à Aloïs, bas)
T'es pas fin, gamin. Mais t'es efficace.

*(flags : `js_convaincu_det`, `determination +2` — la lampe sera **fière** : voir Épreuve, variante 3)*

---

## SCÈNE 6 — L'ÉPREUVE : la traversée noire

**[Narrateur]**
Passé la brèche de Papy, la galerie s'enfonce — et le noir, ici, n'est pas le noir d'une cave. C'est un noir ancien, épais, qui semble avaler les bords de la lumière.
JS lève sa lampe. La flamme monte... puis vacille, comme si elle cherchait sa respiration.

**[JS]** (troublé, pour la première fois)
Ça, elle ne me l'a jamais fait.

**[Papy]**
Ta lampe a le trac. Formidable. On avance.

### Mécanique du mini-jeu

La flamme de la lampe est une jauge vivante au centre de l'écran. Dans cette galerie, elle **faiblit en continu** — sauf quand on l'approche des bons endroits. Le joueur guide le halo (glisser le doigt) le long des parois pour trouver ce qui la « nourrit » : à chaque fois que le halo passe sur une **marque ancienne gravée dans la pierre** (spirales, lignes, mains), la flamme reprend des forces et la marque reste faiblement lumineuse derrière vous.
But : traverser trois sections en gardant la flamme vivante, en découvrant que les marques dessinent un chemin — quelqu'un, il y a très longtemps, a balisé ces galeries *pour cette lampe*.

**Aides selon la scène 5 :**

- **Variante 1 (Cœur — lampe confiante)** — la flamme faiblit lentement, et quand elle approche d'une marque, elle « tire » doucement vers elle (léger aimant tactile + vibration). La lampe guide celui qui a demandé avec le cœur.
- **Variante 2 (Ruse — lampe curieuse)** — la flamme faiblit normalement, mais chaque marque trouvée en **révèle brièvement une autre** au loin (lueur fugace). Le joueur joue aux devinettes avec la lampe — voie du regard et de la déduction.
- **Variante 3 (Détermination — lampe fière)** — la flamme faiblit vite, aucune aide... mais chaque marque trouvée la fait flamber plus haut que dans les autres variantes, au point d'éclairer toute la section. Exigeante et spectaculaire. Réussite parfaite → réplique bonus de JS : « Elle ne m'a jamais obéi. Elle m'accompagne. Ce n'est pas pareil. »

**Échec (flamme éteinte 3 fois)** — jamais bloquant :

**[Narrateur]**
La flamme s'éteint. Une seconde de noir total — puis une lueur : la lampe s'est rallumée toute seule, minuscule, têtue.

**[JS]**
Elle ne s'éteint pas. Elle reprend son souffle. Avancez doucement, elle suit.

*(la traversée se termine automatiquement au pas lent, flag `lampe_a_flanche` : à l'acte final, la lampe « se souviendra » qu'on a douté d'elle — une réplique de JS en variera.)*

### Sortie de scène

**[Narrateur]**
La troisième section débouche sur un élargissement. Les marques des parois convergent toutes vers un même point, là-bas, dans le noir devant — comme des flèches patientes qui attendraient depuis des siècles.
Et au sol, dans la poussière : la trace fine, sinueuse, de quelqu'un de petit qui, lui, n'a pas eu besoin de lumière.

**[Aloïs]** (s'agenouillant près de la trace)
Il est passé ici. Il va bien. Enfin — il avançait bien.

**[JS]** (regardant sa lampe, qui brûle maintenant droite et claire, presque trop)
Aloïs. Ces marques... elles ne montrent pas juste le chemin.
(un temps)
Elles montrent le chemin *à ma lampe*. Et j'aimerais beaucoup qu'on m'explique comment c'est possible.

**[Papy]**
On t'expliquera en marchant. La galerie se sépare en trois, droit devant. Et devine quoi : trois tunnels, zéro panneau.

**[Narrateur]**
Trois tunnels. Aucun indice. Il y a au village quelqu'un dont c'est le métier, de voir ce que les autres ne voient pas...

*(→ Scène suivante : Mamy la diseuse de bonne aventure, au carrefour. Ses rêves du tilleul, sa boule de cristal — et, si le joueur les possède, les indices de l'ouverture : « la trace filait droit » et les marques d'outils.)*

---

## Notes d'implémentation

- Le mini-jeu de la flamme est **le deuxième et dernier gros mécanisme tactile de l'acte 1** (avec le mikado de pierres). Les trois variantes ne changent que des paramètres (vitesse de perte, aides, intensité).
- La lampe devient à partir d'ici un **élément d'interface permanent** : son halo éclaire les scènes souterraines, et son comportement (confiante/curieuse/fière selon la voie choisie) reste cohérent tout le jeu — c'est la personnalité que le joueur lui a donnée.
- Fil mystère à tenir : les marques balisent le chemin *pour la lampe* → la salle ronde finale résonnera avec elle. Semer sans expliquer. JS ne doit jamais avoir de réponse avant l'acte final.
- Papy bourru : ne jamais lui faire dire plus de deux phrases de suite, jamais un mot tendre — la tendresse passe par les actes (il coupe son moteur, il descend, il marche devant).


---
---

# PARTIE IV.C — SCRIPT : scènes 7 à 17 (Mamy → finale)
> Suite des Parties IV.A (Papy) et IV.B (JS).
> Règle inchangée : Claude Code implémente tel quel, aucune réplique inventée.
> Ton : conte chaleureux, personnages **hauts en couleur** — chacun est une caricature affectueuse de lui-même, montré sous son meilleur jour. On rit AVEC eux, jamais d'eux.

**Ordre des scènes** : Mamy → Lo → Cyril → Xavier → Manu → Oxane → Lana → Noélia → Mousquetaires → Jules → Finale.
**Membres de l'expédition** : chaque personnage convaincu DESCEND et reste présent — prévoir de courtes répliques d'ambiance des présents dans chaque scène suivante (2-3 par scène, listées en fin de document).

---

## SCÈNE 7 — MAMY, la diseuse de bonne aventure
### Le carrefour aux trois tunnels — épreuve : Mastermind de cristal

**[Narrateur]**
Trois tunnels. Identiques. Pas un courant d'air pour départager. Papy remonte chercher « la seule personne du village qui voit plus loin que le bout de sa galerie ».
Mamy arrive au bord du trou dans son châle des grands jours, sa boule de cristal sous le bras comme une miche de pain.

**[Mamy]** (avant même qu'on lui explique)
Le tilleul. Je le savais. TRENTE ANS que je rêve de cet arbre, trente ans qu'on me dit « Mamy, arrête le café le soir ». Eh bien qui c'est qui riait ? C'est plus moi !

**Condition — si le joueur a l'indice « la trace filait droit » (choix A1b) :**
**[Aloïs]** Mamy... la trace de Mistiflouk filait droit. Il ne va jamais droit.
**[Mamy]** (soudain grave, un doigt levé)
Droit. Comme dans mon rêve. Quelque chose l'appelle, mon petit. Et quand quelque chose appelle un animal, c'est jamais pour lui vendre des casseroles.
*(→ `mamy_reve_confirme` : réplique bonus au final)*

> **CHOIX M1 — La faire descendre**
> 1. **Cœur** — « On a besoin de tes yeux, Mamy. Des vrais. » *(Elle rosit : « Trente ans qu'on attend que quelqu'un me dise ça. » — `coeur +2`)*
> 2. **Ruse** — « Papy dit que ce trou, même toi tu n'y verrais rien. » *(Papy : « J'ai JAMAIS dit ça. » / Mamy, déjà dans le trou : « Poussez-vous. » — `ruse +2`)*
> 3. **Détermination** — « Descends, on t'expliquera en bas. » *(Mamy : « Petit, on n'expédie pas une voyante. C'est ELLE qui expédie. » Mais elle descend, vexée-ravie. — `determination +2`)*

**[Narrateur]**
Au carrefour, Mamy pose sa boule sur une pierre plate, souffle dessus, l'astique avec sa manche.

**[Mamy]**
Bon. Je vais être honnête : la boule, elle montre. Mais elle montre FLOU. C'est comme la télé d'avant : il faut trouver le bon réglage. Toi, propose. Elle, elle répondra.

### Mini-jeu : MASTERMIND (adapté)
La boule affiche 6 symboles possibles (lune, racine, eau, spirale, main, étoile). La bonne combinaison de 3 symboles correspond au bon tunnel. Le joueur propose une combinaison → la boule répond par des lueurs : **dorée** = bon symbole bien placé, **argentée** = bon symbole mal placé, rien = faux. 6 essais.
- **Variante Cœur** : Mamy commente chaque essai d'un souvenir qui oriente (« La lune... ta grand-tante en rêvait avant les crues. L'eau n'est pas loin de la lune, crois-moi. »)
- **Variante Ruse** : 4 symboles seulement, mais 4 essais.
- **Variante Détermination** : classique intégral, 6 symboles, 6 essais — réussite en ≤3 essais : Mamy déclare solennellement Aloïs « voyant stagiaire ».
- **Échec** : jamais bloquant. La boule s'embrume, Mamy la retourne comme un sablier : « On va faire à l'ancienne. » Elle choisit le tunnel elle-même... le bon. « La boule, c'est pour le spectacle, mon chéri. Le don, il est là. » (elle tapote sa tempe) *(flag `mamy_a_l_ancienne`)*

**Sortie** : le tunnel choisi descend en pente douce. Sur la paroi, une marque ancienne — la boule de Mamy s'illumine en passant devant, exactement comme la lampe de JS. Mamy et JS échangent un regard. Personne ne commente. *(fil mystère)*

---

## SCÈNE 8 — LO, la karateka
### La cloison condamnée — épreuve : la planche porteuse

**[Narrateur]**
Le tunnel bute sur une cloison de vieilles planches, clouée serré. Du travail sérieux : quelqu'un, un jour, a voulu que personne ne passe.

**[Papy]** (tâtant le bois)
Chêne. Sec comme mon humour. On n'arrache pas ça au treuil sans faire tomber le plafond avec.

**[Aloïs]**
Alors il nous faut quelqu'un qui casse... proprement.

**[Narrateur]**
On trouve Lo dans son jardin, en plein entraînement : immobile sur un pied depuis, d'après les voisins, « un temps inquiétant ».

**[Lo]** (sans ouvrir les yeux)
Je t'entends respirer depuis le portail, Aloïs. Tu respires comme quelqu'un qui a un mur à casser.

**[Aloïs]**
...C'est une cloison, mais oui. Comment tu—

**[Lo]** (ouvrant un œil)
Tout le monde vient me voir pour deux raisons : casser quelque chose, ou casser quelqu'un. Tu n'as pas la tête à casser quelqu'un.

> **CHOIX L1**
> 1. **Cœur** — tout raconter, Mistiflouk, le noir, la promesse *(Lo s'incline légèrement : « Une promesse est un adversaire qu'on ne peut vaincre qu'en la tenant. J'arrive. » — `coeur +2`)*
> 2. **Ruse** — « C'est du chêne centenaire. Papy dit qu'aucune main humaine ne peut le briser. » *(Papy, las : « Faut vraiment que j'arrête de dire des trucs que je dis pas. » / Lo sourit pour la première fois de l'année — `ruse +2`)*
> 3. **Détermination** — « Viens. On casse une cloison. » *(Lo : « Enfin quelqu'un qui parle ma langue. » — `determination +2`)*

**[Narrateur]**
Devant la cloison, Lo pose sa paume à plat sur le bois, ferme les yeux, écoute. Longtemps.

**[Lo]]**
Toute structure a un point d'accord. Une planche qui tient toutes les autres. On ne frappe pas fort, Aloïs. On frappe JUSTE.

### Mini-jeu : PIPE MANIA inversé + timing
La cloison est une grille de planches imbriquées. Phase 1 (analyse) : en touchant une planche, on voit lesquelles bougent avec elle (elles tremblent) — il faut déduire LA planche porteuse (celle reliée à toutes). Phase 2 (le geste) : un cercle se resserre sur la planche choisie, taper au moment exact.
- **Variante Cœur** : Lo élimine 2 fausses pistes (« Celle-là ne porte que sa fierté. »)
- **Variante Ruse** : la phase d'analyse montre les liens plus longtemps.
- **Variante Détermination** : aucune aide, cercle plus rapide — réussite parfaite : Lo s'incline complètement. « Ce geste. Je l'enseignerai. »
- **Échec** : Lo pose une main sur l'épaule d'Aloïs. « Regarde. » Elle frappe elle-même — la cloison s'ouvre comme une fleur. « Il n'y a pas d'échec. Il y a des démonstrations. » *(flag `lo_demonstration` : Jules, plus tard, demandera à Lo de lui apprendre « le coup de la fleur »)*

**Sortie** : derrière la cloison, l'air est plus frais. Et sur la première pierre : une petite mue de serpent. Fraîche. Lo la ramasse avec un respect de relique : « Ton ami avance bien. Il mue en marchant. C'est un signe de confiance. »

---

## SCÈNE 9 — CYRIL, le boxeur
### La galerie inondée — épreuve : la vanne coffre-fort

**[Narrateur]**
La galerie suivante descend... dans l'eau. Trente mètres noyés jusqu'au plafond. Sur le côté, une vanne de fonte, rouillée en place depuis un siècle, qui commande une écluse oubliée.

**[Papy]** (essayant, s'arc-boutant, renonçant)
Rouillée jusqu'à l'âme. Là, il faut pas de la force. Il faut de la frappe.

**[Narrateur]**
Cyril, on le trouve à la salle, en train de faire peur à un sac de sable. La conversation est la plus courte du jeu :

**[Aloïs]**
Cyril, on a besoin de—

**[Cyril]** (déjà en train de retirer ses gants)
Où ?

**[Aloïs]**
...Tu veux pas savoir quoi, d'abord ?

**[Cyril]** (enfilant sa veste)
Quelqu'un a besoin. Le reste, tu me raconteras en chemin. Marche plus vite.

*(pas de choix de persuasion ici — Cyril EST comme ça, et c'est sa grandeur. À la place, un choix EN CHEMIN :)*

> **CHOIX C1 — En marchant, lui raconter :**
> 1. **Cœur** — parler de Mistiflouk, de Jules qui s'inquiète aussi *(Cyril hoche la tête : « Le nounours. S'il descend un jour, je passe devant lui. Tu lui dis. » — `coeur +2`)*
> 2. **Ruse** — décrire la vanne comme « imbattable » *(Cyril sourit du coin : « Y a pas d'imbattable. Y a des combats mal préparés. » — `ruse +2`)*
> 3. **Détermination** — ne rien dire, marcher vite *(Cyril, après un silence : « J'aime bien marcher avec toi. C'est reposant. » — `determination +2`)*

**[Cyril]** (devant la vanne, la palpant comme un adversaire au premier round)
OK. Elle est vieille, elle est têtue, elle a l'avantage du terrain. Mais elle a un défaut : elle est prévisible. Une vanne comme ça, ça se force pas. Ça s'écoute. Tu me guides : je frappe où tu me dis, quand tu me dis.

### Mini-jeu : CROCHETAGE / COFFRE-FORT
Une molette centrale. Le joueur la tourne (geste circulaire) lentement : à certains angles, une vibration + un « clic » sourd (retour haptique). Trouver le clic → Cyril frappe (tap) → un cran saute. Trois crans, sens alterné, la fenêtre de clic se réduit à chaque cran.
- **Variante Cœur** : Cyril encourage en continu, la vibration est plus franche.
- **Variante Ruse** : un indice visuel (la rouille s'écaille aux bons angles).
- **Variante Détermination** : pur haptique/son — réussite parfaite : Cyril soulève Aloïs par le col, une seconde, comme un trophée. Le repose. « Pardon. L'habitude. »
- **Échec** : Cyril crache dans ses mains. « Changement de tactique : elle m'énerve. » Il frappe la vanne UNE fois, de toute son âme. Elle cède. Il masse son poing en regardant ailleurs : « On dira que c'est toi. » *(flag `cyril_poing` : Lana lui fera un bandage à la scène de la crypte, en le grondant tendrement)*

**Sortie** : l'écluse gronde, l'eau se retire en tourbillonnant. Sur la vase fraîche du fond : LA trace, sinueuse, qui traverse et continue. **[Cyril]** « Il a nagé ? Costaud, le petit. Respect. »

---

## SCÈNE 10 — XAVIER, le DJ
### Le carrefour aux échos — épreuve : Simon

**[Narrateur]**
Passé l'écluse, la galerie s'ouvre sur une salle où le son devient fou : chaque bruit rebondit, se dédouble, revient de partout. Cinq tunnels en repartent. Aloïs siffle les trois notes — et les entend revenir de CINQ directions.

**[Mamy]** (les mains sur les oreilles)
Ma boule dit rien, mes oreilles disent tout et n'importe quoi. Il nous faut le petit qui entend en couleur.

**[Narrateur]**
Xavier arrive au bord du trou avec un casque autour du cou et une valise de matériel plus lourde que lui.

**[Xavier]** (mi-descendu, s'arrêtant net, les yeux fermés)
Chhht. Chhht chhht chhht. Vous entendez ça ?
**[Papy]** Non.
**[Xavier]** VOILÀ. Vous n'entendez pas. Cette salle, là-dessous... elle a une réverb' que même les cathédrales elles peuvent pas. C'est le plus bel endroit du monde et vous l'utilisez pour CHERCHER UN SERPENT.
**[Aloïs]** Xavier...
**[Xavier]** (déjà en train de déballer trois pieds de micro)
Oui oui, le serpent, bien sûr, priorité au serpent. Mais après, on parle studio.

> **CHOIX X1**
> 1. **Cœur** — « Ses trois notes, Xavier. Il faut retrouver ses trois notes dans tout ce bazar. » *(Xavier, soudain sérieux : « Trois notes dans le chaos. C'est le plus beau brief de ma vie. » — `coeur +2`)*
> 2. **Ruse** — « Mamy dit que ses oreilles valent mieux que ton matériel. » *(Mamy, digne : « J'assume. » / Xavier branche tout en marmonnant « ON VA VOIR ÇA » — `ruse +2`)*
> 3. **Détermination** — « Trouve le bon tunnel. Le reste après. » *(Xavier : « Direct, sans intro. Je respecte. » — `determination +2`)*

**[Xavier]** (casque vissé, doigts sur sa console)
Le principe : la salle me renvoie les échos dans l'ordre où elle veut. Moi je les rejoue dans l'ordre où ILS SONT VENUS. Si je me trompe pas, les faux échos s'annulent et il reste... la source. Toi, tu es mes mains de secours. Suis-moi.

### Mini-jeu : SIMON
Quatre pads lumineux (les 4 fréquences de Xavier). La salle « joue » une séquence de sons/lumières, le joueur la reproduit. Séquences de 3 → 7, s'allongeant d'un pad par manche. Chaque manche réussie éteint un faux tunnel (son écho « s'annule » visiblement).
- **Variante Cœur** : le pad à venir pulse légèrement (Xavier souffle les notes).
- **Variante Ruse** : séquences plus courtes (max 5) mais tempo plus vif.
- **Variante Détermination** : jusqu'à 8, sans aide — réussite : Xavier retire son casque, solennel. « Toi. Samedi. Je t'apprends les platines. C'est pas une proposition, c'est un destin. »
- **Échec** : Xavier ferme les yeux, pose les mains à plat sur sa console. « Plan B : le silence. » Tout le monde retient son souffle 10 secondes (le joueur maintient le doigt sur l'écran sans bouger) — et dans le silence total, très loin, UN vrai sifflement. Faible. Fatigué. Mais vrai. *(flag `sifflement_entendu` : premier signe de vie — moment d'émotion, PAS un échec ressenti)*

**Sortie** : un seul tunnel reste « allumé ». **[Xavier]** (à la salle, en partant, la main sur la pierre) « Je reviendrai, toi. On fera des choses ensemble. »

---

## SCÈNE 11 — MANU, la rockstar
### Faire répondre Mistiflouk — épreuve : jeu de rythme

**[Narrateur]**
Le tunnel de Xavier descend longtemps. Puis la trace s'arrête net devant trois failles étroites. Plus d'écho exploitable : ici, il faudrait que Mistiflouk RÉPONDE. Il faut une voix qui porte. LA voix.
Manu descend l'échelle comme on descend sur scène : en s'attendant à des applaudissements. Elle n'a pas tort, Mamy applaudit.

**[Manu]** (regardant la salle autour d'elle)
Alors c'est ici, le fameux endroit dont Xavier parle en pleurant à moitié.
**[Xavier]** Je ne pleurais pas, j'avais de l'acoustique dans l'œil.
**[Manu]** (main sur le cœur)
Un public dans le noir qui attend qu'on l'appelle. J'ai fait des salles pires.

> **CHOIX MA1**
> 1. **Cœur** — « Il connaît les trois notes d'Aloïs. Mais là, il est loin, fatigué. Il faut les lui CHANTER. » *(Manu, doucement, sans aucune pose : « Alors on va les lui chanter comme une berceuse qu'on n'oublie pas. » — `coeur +2`)*
> 2. **Ruse** — « Xavier dit que même ta voix ne passera pas trois failles de pierre. » *(Xavier : « Pourquoi c'est toujours moi maintenant ?! » / Manu, déjà en train de s'échauffer : « Tenez ma veste. » — `ruse +2`)*
> 3. **Détermination** — « Chante. » *(Manu : « Deux lettres de plus que ce que dit mon producteur. Ça me va. » — `determination +2`)*

**[Manu]**
Écoute-moi bien, Aloïs : une chanson qui appelle quelqu'un, ça ne se braille pas. Ça se PLACE. Chaque note à sa place exacte, sinon la pierre nous la rend en bouillie. Tu tiens le tempo. Je tiens le reste.

### Mini-jeu : RYTHME (type piano tiles / Guitar Hero simplifié)
Les trois notes de Mistiflouk, arrangées par Manu en phrase musicale : des notes descendent sur 3 colonnes, taper quand elles franchissent la ligne. Trois couplets, tempo croissant. La justesse remplit une jauge « portée de la voix » — à pleine jauge, la chanson franchit les failles.
- **Variante Cœur** : fenêtres de timing larges, la voix de Manu « rattrape » un raté par phrase.
- **Variante Ruse** : deux colonnes seulement, plus rapide.
- **Variante Détermination** : trois colonnes, tempo plein — sans-faute : la note finale tenue fait tomber une poussière scintillante du plafond. Manu, bouleversée, chuchote : « Ça, même à l'Olympia, ça m'est jamais arrivé. »
- **Échec** : Manu s'assied par terre, dos à la faille, et chante a cappella, tout doucement, juste les trois notes, en boucle. Tout le monde s'assied. On attend. *(→ même sortie, version lente et émue)*

**Sortie — LE moment de l'acte :**
**[Narrateur]**
La dernière note s'éteint. Une seconde. Deux. Trois.
Et puis — de la faille du milieu, faible, ébouriffé, mais reconnaissable entre mille : trois notes sifflées.
Il est vivant. Il répond. Il attend.
**[Aloïs]** (la main sur la pierre, la voix cassée)
On arrive, mon grand. On arrive.
*(flag `mistiflouk_a_repondu` — si `sifflement_entendu` était déjà posé : réplique de Xavier « La deuxième fois qu'il nous répond. Il compte sur nous, maintenant. »)*

---

## SCÈNE 12 — OXANE, la rebelle
### Le refuge partagé — épreuve : dialogue + labyrinthe mémoire

**[Narrateur]**
La faille du milieu est infranchissable pour des adultes — mais elle rejoint sûrement d'autres galeries. Le problème : lesquelles ? C'est Mamy qui lâche le morceau, l'air de rien :
**[Mamy]** Demandez donc à la petite Oxane. (silence gêné) Quoi ? Une voyante, ça voit. Ça fait des années qu'elle descend quelque part le dimanche, cette gamine, et c'est pas à la messe.

**[Narrateur]**
On trouve Oxane sur son toit, précisément parce que c'est interdit d'être sur les toits.

**[Oxane]** (sans se retourner)
Non.
**[Aloïs]** J'ai encore rien demandé.
**[Oxane]** Tu montes chez moi avec Papy, une voyante, un DJ et une rockstar. C'est non par principe.

> **CHOIX O1 — Le seul dialogue du jeu où il faut S'Y REPRENDRE (2 manches) :**
> **Manche 1 :**
> 1. « On sait que tu connais les galeries. » *(Oxane : « Ah. La voyante. Évidemment. » Elle se ferme. — malus manche 2)*
> 2. « Mistiflouk est coincé là-dessous. » *(Oxane, un silence : « ...Le serpent ? » Elle se retourne à moitié. — bonus manche 2)*
> 3. « T'es pas obligée. On voulait juste te le dire. » — et redescendre *(Oxane vous rattrape dans l'escalier. « Attends. Personne me dit jamais juste les choses sans rien vouloir. C'est déstabilisant. Redis voir. » — grand bonus manche 2, `coeur +1`)*
> **Manche 2 :**
> 1. **Cœur** — « Là-dessous, c'est ton endroit. On ne te demande pas de le donner. On te demande de nous y inviter. » *(Oxane, longtemps silencieuse : « ...C'est la première fois qu'on me demande la permission pour un truc. » — `coeur +2`, `oxane_invitation`)*
> 2. **Ruse** — « Remarque, sans toi on va se perdre, piétiner partout, laisser des traces... » *(Oxane, horrifiée : « Vous allez SACCAGER mon spot. C'est bon, c'est bon, JE guide. » — `ruse +2`)*
> 3. **Détermination** — « Il nous faut un guide. T'es la meilleure. Point. » *(Oxane hausse une épaule pour cacher que ça lui fait plaisir : « ...Point toi-même. Ramassez vos affaires. » — `determination +2`)*

**[Oxane]** (en bas, dépliant de mémoire un plan qu'elle refuse de dessiner)
Règle une : on touche à rien. Règle deux : on répète à personne. Règle trois... 
(elle regarde le groupe, tout le village ou presque)
Bon, la règle deux est morte. Mes raccourcis, je les connais par cœur — et par cœur, c'est comme ça que tu vas les apprendre, parce que là où on va, on ne peut pas s'arrêter pour réfléchir.

### Mini-jeu : LABYRINTHE MÉMOIRE
Un plan de galeries s'affiche 5 secondes avec le chemin surligné, puis s'efface. Le joueur trace le chemin de mémoire. Trois segments de plus en plus longs (4, 6, 8 embranchements). Une erreur = Oxane siffle, on rembobine au dernier point sûr.
- **Variante Cœur** (`oxane_invitation`) : Oxane laisse le plan 8 secondes et raconte un repère par segment (« Là, la pierre qui ressemble à un chat. Enfin, à un chat déçu. »)
- **Variante Ruse** : 5 secondes, mais les erreurs ne rembobinent pas (Oxane rattrape : « Par ici, touriste. »)
- **Variante Détermination** : 3 secondes, tracé intégral — sans-faute : Oxane, bras croisés : « OK. T'as le niveau. Je dis pas ça. Je l'ai jamais dit. T'as rien entendu. »
- **Échec** : Oxane soupire théâtralement, attrape la main d'Aloïs, et guide tout le monde elle-même en commentant chaque virage — et on découvre qu'elle a des noms pour CHAQUE recoin (« la salle du goûter », « le virage où j'ai eu 12 ans »). Son royaume secret, offert à voix haute. *(flag `royaume_oxane` : au final, la salle ronde pourra être baptisée par elle)*

**Sortie** : les raccourcis d'Oxane font gagner des heures. Ils débouchent... sous une voûte maçonnée, différente du reste. **[Oxane]** « Ça, c'est ma frontière. Derrière ce mur, c'est plus de la galerie. C'est du bâti. Je suis jamais allée plus loin. » **[Lana, voix off avant sa scène]** — un chant lointain traverse la pierre. **[Papy]** « ...C'est pas la crypte de l'église, ça ? »

---

## SCÈNE 13 — LANA, la bonne sœur déjantée
### La crypte — épreuve : taquin

**[Narrateur]**
Au-dessus de la voûte : l'église. Et dans l'église : Lana, qu'on trouve en train de faire ce qu'elle appelle « les vêpres rythmées » — personne n'a jamais osé demander de détails.

**[Lana]** (ouvrant la porte de la crypte avant même qu'on frappe)
JE LE SAVAIS. Vingt ans que je dis que cette crypte sonne creux ! Vingt ans qu'on me répond « Lana, une crypte c'est CENSÉ sonner creux » ! Et vous savez ce que je faisais, moi, pendant ce temps ? 
**[Papy]** On veut pas savoir.
**[Lana]** JE TAPAIS SUR LES MURS. Méthodiquement. J'ai une carte. (elle brandit un carnet couvert de croquis) Le Seigneur m'a donné de la patience et un excellent sens de la percussion.

> **CHOIX LA1**
> 1. **Cœur** — « Personne te croyait. Nous, on vient TE chercher. » *(Lana, la main sur le cœur : « Vingt ans de désert et voilà la pluie. Suivez-moi, petits miracles. » — `coeur +2`)*
> 2. **Ruse** — « On pensait passer sans te déranger, mais la porte du bas est verrouillée... » *(Lana : « SANS ME DÉRANGER ? Ma crypte ? Mon mystère ? Poussez-vous de mon passage. » — `ruse +2`)*
> 3. **Détermination** — « Ouvre la crypte. On t'expliquera après. » *(Lana, ravie : « Un ordre mystérieux dans une église. ENFIN il se passe quelque chose. » — `determination +2`)*

**[Narrateur]**
Au fond de la crypte, sous une tenture que Lana retire d'un geste de matador : une porte basse, couverte de plaques de pierre gravées... toutes déplacées, dans le désordre, sauf une absente. Un taquin de pierre.

**[Lana]** (chuchotant, aux anges)
Un MÉCANISME. Dans MA crypte. Je vais être honnête : j'ai déjà essayé. Trois nuits. J'ai failli réussir et j'ai failli rester coincée du bras, dans cet ordre. À toi, petit — moi je tiens le cierge et je prie pour tes phalanges.

### Mini-jeu : TAQUIN (sliding puzzle)
Grille 3×3 (8 plaques + 1 vide). Les plaques gravées reconstituent le motif en spirale déjà vu sur les parois (celui qui allume la lampe de JS). 
- **Variante Cœur** : le motif complet reste affiché en filigrane.
- **Variante Ruse** : le carnet de Lana donne l'aperçu 5 secondes sur demande, 3 fois.
- **Variante Détermination** : grille 3×3 sans aperçu — réussite : Lana embrasse le front d'Aloïs et déclare la crypte « annexe officielle du terrain d'aventure paroissial ».
- **Échec** : Lana craque ses doigts. « Bon. Trois nuits d'entraînement, ça va bien servir. » Elle finit le taquin elle-même à une vitesse ahurissante, en chantonnant. Tout le monde la regarde. « Quoi ? Les vêpres rythmées, ça muscle. » *(flag `lana_vepres`)*
- **Si flag `cyril_poing`** : pendant le taquin, Lana bande la main de Cyril d'office : « On frappe les vannes, pas ses phalanges, jeune homme. La fonte ne souffre pas, TOI si. »

**Sortie** : la porte pivote. L'escalier derrière descend en colimaçon, PROFOND. Sur la première marche : une mue. **[Lana]** (la ramassant, émue) « Il est passé par ma crypte. J'ai toujours dit que cet endroit était béni. »

---

## SCÈNE 14 — NOÉLIA, la princesse
### Le grand découragement — épreuve : Tetris d'inventaire

**[Narrateur]**
L'escalier de la crypte descend, descend, descend. Les jambes tirent, les gourdes sont vides, le moral s'use. À mi-hauteur, une salle d'étape naturelle. C'est Mamy qui dit tout haut ce que tout le monde pense :
**[Mamy]** Mes petits, sans ravitaillement, on ne verra pas le fond. Et sans quelqu'un pour nous tenir la tête haute non plus.

**[Narrateur]**
Message est passé au village. Une heure plus tard, une voix claire tombe dans l'escalier, accompagnée d'un panier au bout d'une corde :

**[Noélia]] (invisible, depuis le haut)
QUE PERSONNE NE TOUCHE À RIEN. Une expédition sans intendance est une expédition ratée, c'est écrit dans tous les livres que je fais semblant d'avoir lus. Je descends. La cour descend avec moi.
**[Papy]** La cour ?
**[Noélia]** (apparaissant, diadème impeccable, quatre paniers en équilibre)
Vous. Vous êtes la cour. Félicitations.

> **CHOIX N1**
> 1. **Cœur** — « On n'y arrivera pas sans toi, Noélia. Vraiment. » *(Noélia, un micro-tremblement du menton, vite maîtrisé : « ...Évidemment que non. Approchez, la cour. On refait les sacs. » — `coeur +2`)*
> 2. **Ruse** — « Oxane a dit qu'une princesse tiendrait pas deux heures ici. » *(Oxane : « J'ai TELLEMENT pas dit ça. » / Noélia retrousse ses manches en soie : « Deux heures ? Je vais vous montrer un RÈGNE. » — `ruse +2`)*
> 3. **Détermination** — « Prends le commandement de l'intendance. C'est un ordre. » *(Noélia : « On ne donne pas d'ordre à une princesse. » (un temps) « Mais celui-ci était excellent. Exécution. » — `determination +2`)*

**[Noélia]** (étalant le contenu des paniers avec une autorité de général)
Le protocole est simple : TOUT doit rentrer, RIEN ne doit s'abîmer, et le goûter voyage AU-DESSUS, toujours. Un royaume, ça se range. Montre-moi ce que tu vaux, écuyer.

### Mini-jeu : TETRIS D'INVENTAIRE
Une grille (le grand sac de l'expédition) et des objets de formes variées (gourdes en L, couvertures 2×3, lanternes 1×1, la boîte à goûter 2×2 qui DOIT finir sur la rangée du haut, le coussin de voyage de Noélia, absurdement grand, 3×3). Glisser-pivoter pour tout caser.
- **Variante Cœur** : Noélia pré-range un tiers (« Regarde le geste. Poignet souple. Port de tête. »)
- **Variante Ruse** : grille plus grande mais objets en plus (elle a « ajouté trois ou quatre indispensables », dont un miroir).
- **Variante Détermination** : grille exacte au carré près — réussite parfaite : Noélia adoube Aloïs du plat de sa cuillère à goûter : « Relève-toi, Intendant Royal des Choses Bien Rangées. »
- **Échec** : Noélia contemple le chaos, inspire, et déclare : « Bien. Nouveau décret : ceci est désormais un rangement ARTISTIQUE. » Elle s'assied sur le sac pour le fermer. Ça rentre. « Un royaume, ça se range. Ou ça s'assied dessus. » *(flag `decret_artistique`)*
- **Fil tendre obligatoire** : pendant l'épreuve, Noélia demande, faussement détachée : « Et il mange quoi, votre... Mistiflouk ? Parce que j'ai pris des œufs. Au cas où. On dit que c'est régalien, les œufs, pour un serpent. » *(personne ne relève, tout le monde a compris — `noelia_oeufs`, réplique au final)*

**Sortie** : sacs faits, gourdes pleines, moral regonflé — Noélia distribue le goûter selon un ordre protocolaire strict qui, comme par hasard, sert Jules en premier s'il est là, sinon les plus fatigués. L'escalier reprend. En bas : le sol s'arrête net. Une crevasse.

---

## SCÈNE 15 — LES 4 MOUSQUETAIRES (Israël, Antipas, Maranatha, Agapos)
### La crevasse — épreuve : coordination à 4

**[Narrateur]**
La crevasse coupe la galerie sur quatre bons mètres. Noire, profonde, pas discutable. Papy a une échelle solide — mais posée sur ce vide, elle ploie et danse : il faut la TENIR. À quatre points. Exactement quatre.
Au village, quand on dit « exactement quatre », tout le monde pense à la même bande.
Ils descendent l'escalier de la crypte en formation, comme toujours, et parlent, comme toujours, à tour de rôle sans jamais se couper :

**[Israël]** On nous a dit :
**[Antipas]** « une mission »,
**[Maranatha]** « quatre places »,
**[Agapos]** « pas une de plus ».
**[Les quatre, ensemble]** NOUS SOMMES VENUS.

**[Papy]** (à Aloïs, bas)
Ils font ça à table aussi. Leur mère est une sainte.

> **CHOIX MQ1**
> 1. **Cœur** — « Mistiflouk est de l'autre côté. Il n'y a que vous quatre pour faire ce pont. » *(Israël : « Un ami dans le noir... » / Antipas : « ...quatre amis dans la lumière. » / Maranatha : « C'est mathématique. » / Agapos : « C'est FRATERNEL. » — `coeur +2`)*
> 2. **Ruse** — « Il paraît que vous n'avez jamais VRAIMENT testé le "un pour tous". » *(Silence outré. Les quatre retirent leur veste dans un même mouvement. — `ruse +2`)*
> 3. **Détermination** — « Quatre coins. Une échelle. Un serpent. Questions ? » *(Les quatre, ensemble : « AUCUNE. » — `determination +2`)*

### Mini-jeu : COORDINATION 4 ZONES
L'échelle est posée sur la crevasse, vue de dessus. Quatre zones d'appui (les quatre coins) affichent chacune une jauge d'équilibre qui dérive. Pendant qu'Aloïs traverse (progression automatique), maintenir les 4 jauges dans le vert en tapant les zones qui dérivent. Les dérives s'accélèrent au milieu de la traversée (le moment de doute), puis se calment.
- **Variante Cœur** : les Mousquetaires s'annoncent (« Coin gauche faiblit ! » « Je compense ! ») — la zone qui va dériver clignote avant.
- **Variante Ruse** : deux zones dérivent à la fois, mais plus lentement.
- **Variante Détermination** : sans annonce, dérives franches — sans-faute : les quatre entament le chant de traversée qu'ils répètent « depuis toujours pour une occasion pareille ». Il est objectivement magnifique. Personne ne savait qu'ils répétaient.
- **MODE FAMILLE (option affichée avant l'épreuve)** : 4 joueurs réels, un coin d'écran chacun. C'est LE moment multijoueur du jeu — le téléphone posé à plat au milieu de la table.
- **Échec** : l'échelle glisse — et les quatre la rattrapent d'un même geste, à mains nues, arc-boutés. **[Agapos]** (dents serrées) « Traverse. MAINTENANT. On tient. » **[Maranatha]** « On tient TOUJOURS. » Traversée automatique, au ralenti, sur leurs quatre visages concentrés. *(flag `mousquetaires_a_mains_nues` — franchement, cette version est presque plus belle que la réussite)*

**Sortie** : tout le monde passe, l'échelle est remontée et rangée (« Elle a servi la cause. Elle sera décorée. »). Devant : la galerie se resserre, se resserre... jusqu'à un boyau où un adulte ne passe pas. Et de l'autre côté du boyau, faible mais net : trois notes sifflées.

---

## SCÈNE 16 — JULES, le nounours
### Le boyau — épreuve : le jeu du calme

**[Narrateur]**
Le boyau fait dix mètres. Étroit, bas, noir. Aucun adulte n'y passe les épaules. Il faudrait quelqu'un de petit. Quelqu'un de doux, aussi — parce qu'au bout, il y a un animal fatigué et craintif qu'il ne faut surtout pas effrayer.
Tout le monde pense à la même personne. Et tout le monde se tait, parce que cette personne a peur du noir, et que tout le monde le sait.
C'est Jules qui parle le premier. Il est descendu avec Noélia, sans rien dire, comme toujours.

**[Jules]] (tout bas, en regardant le boyau)
C'est moi qui dois y aller, hein ?
**[Aloïs]** Personne t'oblige, Jules. On peut chercher un autre—
**[Jules]** (secouant la tête)
Mistiflouk, une fois, il s'est endormi dans mes bras. Tout le monde disait qu'il ne faisait jamais ça. 
(il regarde ses chaussures)
On n'abandonne pas quelqu'un qui s'est endormi dans vos bras. Même quand on a peur. SURTOUT quand on a peur, je crois.

**[Narrateur]**
Si Cyril est là (`papy_convaincu_*` + scène 9 faite), il s'accroupit devant Jules : **[Cyril]** « Je peux pas passer devant, là-dedans. Mais je serai à l'entrée. Tu m'appelles, je démonte la colline. » — Jules sourit un tout petit peu.
Si Lo est là : **[Lo]** « La peur est une invitée, Jules. On ne la chasse pas. On lui tient la porte et on avance avec elle. »

> **CHOIX JU1 — Comment l'accompagner (pas le convaincre : il a DÉJÀ dit oui) :**
> 1. **Cœur** — « On va respirer ensemble, toi et moi, tout du long. Je lâche pas. » *(→ épreuve avec la voix d'Aloïs — `coeur +2`)*
> 2. **Ruse** — lui confier la lampe de JS : « Elle n'a jamais laissé personne dans le noir. » *(JS hoche gravement la tête ; la lampe, minuscule flamme, se laisse emporter — `ruse +2`, la lampe passe dans le boyau : indice pour le final)*
> 3. **Détermination** — « Tu es le seul qui peut. Et tu peux. » *(Jules inspire un grand coup : « ...D'accord. D'accord d'accord d'accord. J'y vais avant que le d'accord s'use. » — `determination +2`)*

### Mini-jeu : LE JEU DU CALME (cohérence cardiaque)
On joue JULES. L'écran est presque noir, un halo doux autour de lui. Au centre, un cercle qui se gonfle et se dégonfle lentement : **appuyer quand il gonfle, relâcher quand il dégonfle** — respirer avec Jules. Tant que la respiration est suivie, il avance. À trois moments, un événement effrayant (un bruit, un frôlement, le noir qui bouge) fait s'emballer le cercle : il faut le raccompagner doucement au rythme lent, sans taper, sans précipiter. C'est l'épreuve la plus douce du jeu — aucune vitesse, aucune adresse : de la constance et du calme.
- **Variante Cœur** : la voix d'Aloïs ponctue (« Je suis là. » « Tu avances super bien. ») — le cercle se stabilise plus vite.
- **Variante Ruse** : la flamme de la lampe pulse AVEC le cercle (double repère visuel) — et à mi-boyau, elle éclaire brièvement une paroi : le motif en spirale, encore, tout près maintenant.
- **Variante Détermination** : Jules se parle à lui-même (« D'accord d'accord d'accord ») — repère sonore seul.
- **Échec** : impossible. Ce mini-jeu ne peut pas échouer — si le rythme est perdu trop longtemps, Jules s'arrête, se recroqueville... et de l'autre côté, les trois notes sifflent, tout près, comme un encouragement. Le cercle repart. *(design assumé : la peur de Jules ne sera JAMAIS un game over)*

**Sortie — le sommet émotionnel du jeu :**
**[Narrateur]**
Le boyau s'élargit d'un coup. Jules débouche à genoux dans une salle... et s'arrête.
Ronde. Immense. Les parois couvertes de spirales gravées qui luisent faiblement, toutes, comme des braises patientes.
Et au centre, lové sur une pierre plate en forme de coupe, la tête levée vers lui : Mistiflouk.
**[Jules]** (dans un souffle)
Coucou, toi. C'est moi. C'est nous. On est TOUS venus.
**[Narrateur]**
Mistiflouk traverse la salle, grimpe le long de son bras, et pose sa tête dans son cou. Exactement comme la première fois.
De l'autre côté de la salle : une porte naturelle, large — les autres n'auront qu'à contourner par la galerie qu'elle ouvre. Jules n'a plus qu'à leur ouvrir de l'intérieur.
Il regarde la salle, le serpent contre lui, et sourit dans le noir qui ne lui fait plus peur.
**[Jules]** Les amis ? Venez voir. Venez voir où il nous a emmenés.

---

## SCÈNE 17 — FINALE : la salle ronde

**[Narrateur]**
Ils entrent un par un, et un par un ils se taisent. La salle est ronde, taillée à la main, plus vieille que tout ce qu'on connaît. Les spirales des parois luisent doucement — et plus JS avance, plus elles luisent fort.
Au centre, la pierre plate en forme de coupe. La taille exacte... d'une lampe.

**[JS]] (la voix changée)
Aloïs. Je crois que je sais pourquoi les marques guidaient ma lampe.
(il s'approche, la pose dans la coupe)
Elle ne me guidait pas vers ton serpent. Ton serpent nous guidait tous... vers chez elle.

**[Narrateur]**
La lampe s'ajuste dans la pierre au millimètre. Sa flamme monte, droite, dorée — et toutes les spirales de la salle s'embrasent doucement en réponse, une lumière chaude, comme un feu de cheminée grand comme une cathédrale.
Personne ne saura jamais qui a creusé cette salle, ni pourquoi la lampe en vient, ni comment Mistiflouk l'a su. Mamy dira que certaines réponses sont comme les bonnes soupes : meilleures quand on ne connaît pas tous les ingrédients.

**Répliques conditionnelles du final (jouer toutes celles dont le flag est posé) :**
- `mamy_reve_confirme` — **[Mamy]** « Trente ans que je rêvais d'un arbre. C'était pas l'arbre. C'était sa lumière d'en dessous. » (elle s'assied, très digne, et s'essuie l'œil avec son châle)
- `noelia_oeufs` — **[Noélia]** (déposant cérémonieusement un œuf devant Mistiflouk) « De la part de la Couronne. » (Mistiflouk l'ignore ; elle décrète qu'il « le garde pour plus tard, c'est régalien »)
- `js_trouble_vu` — **[JS]** (à Aloïs, à part) « Ce matin-là, chez moi... tu l'avais vue frémir, hein ? » **[Aloïs]** « Oui. » **[JS]** « Moi aussi. Depuis des années. Merci de m'avoir donné une raison de la suivre. »
- `lampe_a_flanche` — **[JS]** (caressant le cuivre) « Pardon d'avoir douté de toi dans le tunnel. » (la flamme fait une petite révérence ; tout le monde jure l'avoir vue)
- `mousquetaires_a_mains_nues` — les quatre montrent leurs paumes marquées par l'échelle : **[Israël]** « Cicatrice... » **[Antipas]** « ...d'honneur... » **[Maranatha]** « ...collective... » **[Agapos]** « ...ASSORTIE. » (ils sont enchantés)
- `treuil_abime` — **[Papy]** « Mon treuil est mort pour la cause. » **[Cyril]** « Je te le répare dimanche. » **[Papy]** « ...Mouais. Viens à midi, y aura du rôti. » (c'est la plus longue déclaration d'affection de sa vie)
- `royaume_oxane` — le groupe demande à Oxane de baptiser la salle. Elle réfléchit longtemps. **[Oxane]** « La salle de Jules. » (Jules devient écarlate ; Oxane hausse l'épaule : « Quoi ? C'est lui qui a eu le plus peur. C'est lui le plus courageux. C'est mathématique. » **[Maranatha]** « C'EST mathématique. »)

### LE CHOIX FINAL — Que fait-on de cet endroit ?
> 1. **« On le garde pour nous. »** — La salle devient le secret de la famille. Épilogue : un an plus tard, on y descend pour les grandes occasions ; Mistiflouk ouvre la marche, toujours. La lampe reste en bas — JS descend la voir « comme on visite une vieille amie ».
> 2. **« On l'offre au village entier. »** — Papy et Cyril élargissent l'entrée, Noélia organise l'inauguration (protocole : trois pages), Xavier y installe « le meilleur son souterrain d'Europe, minimum ». Épilogue : la première fête sous terre, Manu chante, les spirales pulsent au rythme. 
> 3. **« On referme, et on garde juste le chemin. »** — On ne dit rien, on ne change rien ; on rebouche l'entrée du tilleul, sauf un passage à la taille de Mistiflouk. Épilogue : certains soirs, le serpent disparaît quelques heures. Aloïs ne s'inquiète plus jamais. « Il va voir la lampe. Il lui tient compagnie. »

**Dernière image (commune aux trois fins) :**
**[Narrateur]**
Sur le chemin du retour, Jules porte Mistiflouk endormi autour de ses épaules, et personne ne marche vite, pour ne pas les réveiller — ni le serpent, ni le petit garçon qui n'a plus peur du noir.
Et au village, plus tard, quand quelqu'un demandera comment c'était, là-dessous, ils se regarderont tous, et Papy répondra pour tout le monde :
**[Papy]** « C'était de la famille. Jusque sous terre. »

FIN.

---

## ANNEXE — Répliques d'ambiance des membres présents (2 par scène, à placer)
- Mamy, pendant l'épreuve de Lo : « Frappe à gauche. Enfin, c'est la boule qui dit ça. Moi je dis rien. »
- Xavier, pendant le chant de Manu : (enregistre tout) « Pour la postérité. Et pour l'album. »
- Oxane, à la crypte : « Attends. Ta crypte communique avec MES galeries ? On était voisines, ma sœur. » / Lana, enchantée : « Colocataires du mystère ! »
- Cyril, à la crevasse : (aux Mousquetaires) « Si l'un de vous lâche, je vous rattrape tous les quatre. » / Les quatre : « NOUS NE LÂCHONS PAS. » / Cyril : « Je sais. C'était poli. »
- Noélia, pendant le boyau de Jules : (chuchotant très fort) « LA COUR RETIENT SON SOUFFLE. » / Papy : « La cour ferait mieux de le retenir en silence. »
- Papy, dans la salle ronde, tout à la fin, à personne : « Soixante-dix ans que je laboure au-dessus du plus bel endroit du pays. » (il remet sa casquette) « Ça m'apprendra à regarder par terre. »

## ANNEXE — Notes d'implémentation
- 11 mini-jeux, tous adaptés de classiques : mikado (fait), fil chaud (fait), Mastermind, planche porteuse (pipe/timing), coffre-fort, Simon, rythme, labyrinthe mémoire, taquin, Tetris d'inventaire, coordination 4 zones, cohérence cardiaque. Chacun : 3 variantes de paramètres + 1 issue d'échec narrative jamais bloquante.
- Le mode famille de la scène 15 (4 joueurs sur un écran) est optionnel à l'implémentation mais fortement souhaité.
- La respiration de Jules (scène 16) ne peut PAS échouer — c'est une règle de design, pas un oubli.
- Tenir le fil mystère : spirales → boule de Mamy qui luit → lampe qui flambe → salle ronde. Ne JAMAIS expliquer l'origine. Mamy a le dernier mot dessus (les bonnes soupes).
