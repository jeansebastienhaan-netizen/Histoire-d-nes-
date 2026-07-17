import { useEffect, useRef, useState } from 'react'
import { useGameStore } from '../store/gameStore.js'
import { getChapterForCharacter } from '../data/chapters/index.js'
import charactersData from '../data/characters.json'
import fragmentsData from '../data/fragments.json'
import Mistiflouk from '../components/Mistiflouk.jsx'
import {
  TILE, W, H, ZONES, TILLEUL, HERO_START,
  renderBase, renderLife, drawHero,
} from './pixel/pixelMap.js'

const { characters } = charactersData
const BY_ID = Object.fromEntries(characters.map((c) => [c.id, c]))

function zoneStatus(character, state) {
  if (state.completedChapters.includes(character.chapter)) return 'done'
  if (character.chapter <= state.currentChapter) return 'open'
  return 'locked'
}

export default function VillageMap() {
  const state = useGameStore()
  const [toast, setToast] = useState(null)
  const canvasRef = useRef(null)
  const heroRef = useRef({
    x: HERO_START.x * TILE + 3,
    y: HERO_START.y * TILE,
    waypoints: [],
    facing: 1,
    onArrive: null,
  })
  const statusRef = useRef({})
  const allFragments = state.fragments.length >= fragmentsData.order.length

  // statuts des zones, tenus à jour pour la boucle de rendu
  statusRef.current = Object.fromEntries(
    characters.map((c) => [c.id, zoneStatus(c, state)])
  )
  const fragCountRef = useRef(state.fragments.length)
  fragCountRef.current = state.fragments.length

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  // ---------- boucle de rendu ----------
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.imageSmoothingEnabled = false

    // pré-rendu du décor (2 images pour l'animation de l'eau)
    const bases = [0, 1].map((f) => {
      const off = document.createElement('canvas')
      off.width = W
      off.height = H
      renderBase(off.getContext('2d'), f)
      return off
    })

    let raf
    let last = performance.now()
    const SPEED = 72 // px/s

    const loop = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const frame = Math.floor(now / 260)

      // déplacement du héros vers ses points de passage
      const hero = heroRef.current
      const wp = hero.waypoints[0]
      if (wp) {
        const dx = wp.x - hero.x
        const dy = wp.y - hero.y
        const dist = Math.hypot(dx, dy)
        if (dist < 2) {
          hero.waypoints.shift()
          if (hero.waypoints.length === 0 && hero.onArrive) {
            const action = hero.onArrive
            hero.onArrive = null
            action()
          }
        } else {
          const step = Math.min(dist, SPEED * dt)
          hero.x += (dx / dist) * step
          hero.y += (dy / dist) * step
          if (Math.abs(dx) > 2) hero.facing = dx >= 0 ? 1 : -1
        }
      }

      ctx.drawImage(bases[frame % 2], 0, 0)
      renderLife(ctx, frame, statusRef.current, fragCountRef.current, fragmentsData.order.length)
      drawHero(ctx, hero.x - 5, hero.y - 12, hero.waypoints.length > 0, Math.floor(now / 140), hero.facing)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  // ---------- interactions ----------
  const walkTo = (tx, ty, onArrive) => {
    const hero = heroRef.current
    if (hero.waypoints.length > 0) return
    const target = { x: tx * TILE + TILE / 2, y: ty * TILE + TILE / 2 }
    // trajet en L : d'abord vertical (le long du chemin), puis horizontal
    hero.waypoints = [{ x: hero.x, y: target.y }, target]
    hero.onArrive = onArrive ?? null
  }

  const tapZone = (id) => {
    if (id === 'tilleul') {
      walkTo(TILLEUL.x, TILLEUL.y + 1.4, () => state.showEnding())
      return
    }
    const character = BY_ID[id]
    const status = statusRef.current[id]
    if (status === 'locked') {
      showToast(`${character.name} — cette porte est encore fermée… Continue la chasse aux éclats !`)
      return
    }
    const dest = ZONES[id]
    if (status === 'done') {
      walkTo(dest.x, dest.y + 1.2, () =>
        showToast(`${character.name} te salue de la main. Son éclat a rejoint Étincelle.`)
      )
      return
    }
    if (!getChapterForCharacter(id)) {
      showToast('Ce chapitre est encore en train de s’écrire dans le carnet…')
      return
    }
    walkTo(dest.x, dest.y + 1.2, () => state.startEncounter(id))
  }

  const onTap = (e) => {
    const rect = canvasRef.current.getBoundingClientRect()
    const tx = ((e.clientX - rect.left) / rect.width) * (W / TILE)
    const ty = ((e.clientY - rect.top) / rect.height) * (H / TILE)
    // zone la plus proche à portée de doigt
    let best = null
    let bestDist = 1.9
    for (const [id, z] of Object.entries(ZONES)) {
      const d = Math.hypot(tx - z.x, ty - z.y)
      if (d < bestDist) {
        best = id
        bestDist = d
      }
    }
    if (allFragments) {
      const d = Math.hypot(tx - TILLEUL.x, ty - TILLEUL.y)
      if (d < bestDist) {
        best = 'tilleul'
        bestDist = d
      }
    }
    if (best) tapZone(best)
  }

  return (
    <div className="screen map-screen">
      <header className="map-header">
        <h2 className="map-title">Le village</h2>
        <button className="btn btn-small" onClick={state.openNotebook}>
          Carnet · {state.fragments.length}/{fragmentsData.order.length}
        </button>
      </header>

      <div className="map-canvas-wrap">
        <canvas
          ref={canvasRef}
          width={W}
          height={H}
          className="map-canvas"
          onPointerDown={onTap}
          role="img"
          aria-label="Carte du village"
        />
      </div>

      {toast && <div className="toast">{toast}</div>}
      <Mistiflouk />
    </div>
  )
}
