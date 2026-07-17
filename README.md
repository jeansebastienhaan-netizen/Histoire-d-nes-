# Le Grand Silence

Un village muet, une enquête, treize rencontres. Jeu narratif mobile (portrait, tactile), livré en PWA sur GitHub Pages puis empaqueté en APK via PWABuilder.

## Jouer

- **En ligne** (après activation de GitHub Pages) : `https://jeansebastienhaan-netizen.github.io/Histoire-d-nes-/`
- **En local** :

```bash
npm install
npm run dev
```

## Stack

- Vite + React 18, Zustand, vite-plugin-pwa
- Sauvegarde localStorage (clé `grand-silence-save-v1`, JSON versionné avec migrations)
- 100 % statique, aucun backend — fonctionne hors ligne après la première visite

## Structure

```
src/
  store/       Zustand (réputation, flags, fragments) + sauvegarde versionnée
  engine/      moteur de dialogue (graphe JSON) + évaluation des conditions
  data/        personnages, fragments, chapitres (un JSON par chapitre)
  screens/     titre / carte du village / rencontre / carnet / fin
  minigames/   RhythmTap, DragPhysics, TimedDialogue, LogicPuzzle
  components/  DialogueBox, ChoiceButtons, Mistiflouk
```

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml` (build + GitHub Pages).
**À faire une fois dans les réglages du repo** : Settings → Pages → Source : « GitHub Actions ».

## État d'avancement

- [x] Sprint 1 — squelette PWA, écran titre, carte du village, moteur de dialogue, sauvegarde, déploiement
- [x] Sprint 2 — chapitre 1 (Mamy)
- [x] Sprint 3 — chapitre d'Aloïs + Mistiflouk (piste sonore, 3 branches, compagnon d'interface)
- [x] Chapitres 3 à 12 — les 12 rencontres jouables, 12 fragments, 12 bruits restaurés
- [x] Les 7 fins (3 pures, 3 duos, 1 harmonie) + 12 épilogues individuels
- [ ] Passage PWABuilder (manuel : voir `GUIDE_CLAUDE_CODE.md` §8)

Valider les graphes de dialogue : `node scripts/validate-chapters.mjs`

> **Note** : `GAME_DESIGN.md` (document narratif de référence) n'a pas été fourni ;
> les dialogues ont été écrits directement selon les contraintes de ton du guide
> technique (carnet bienveillant, personnages montrés sous leur meilleur jour,
> humour de situation). Chaque chapitre est un JSON autonome dans
> `src/data/chapters/` — facile à remplacer si le document de référence arrive.
