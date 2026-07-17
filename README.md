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
- [x] Sprint 2 — chapitre 1 (Mamy) jouable ⚠️ **dialogues provisoires : en attente de `GAME_DESIGN.md`**
- [ ] Sprint 3 — chapitre d'Aloïs + Mistiflouk
- [ ] Sprints suivants — un chapitre à la fois
- [ ] Dernier sprint — les 7 fins + épilogues + passage PWABuilder

> **Important** : le contenu narratif (ordre des chapitres, dialogues, fragments du vœu, fins)
> doit venir de `GAME_DESIGN.md` (non fourni pour l'instant). Tout le texte actuel est un
> contenu d'attente, structurellement définitif mais narrativement à remplacer.
