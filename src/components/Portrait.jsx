import React, { useMemo } from 'react'

// Portrait pixel procédural (grille 16×16, rendu net façon pixel art).
// Art provisoire : sera remplacé par les portraits 160×160 définitifs.
const W = 16
const H = 16

function buildGrid(spec) {
  const g = Array.from({ length: H }, () => Array(W).fill(null))
  const put = (x, y, c) => {
    if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c
  }
  const rect = (x0, y0, x1, y1, c) => {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) put(x, y, c)
  }
  const { skin, hair, style, hat, extra, extraColor } = spec
  const dark = '#241f2e'

  if (style === 'serpent') {
    // Mistiflouk : petite tête de serpent et ondulation.
    rect(2, 9, 13, 10, hair)
    rect(3, 8, 12, 8, skin)
    rect(10, 5, 14, 8, skin)
    rect(11, 4, 13, 4, skin)
    put(12, 5, dark) // œil
    put(14, 6, '#e05a5a') // langue
    put(15, 6, '#e05a5a')
    rect(2, 11, 5, 11, hair)
    rect(8, 11, 11, 11, hair)
    return g
  }

  // Visage commun
  rect(4, 4, 11, 11, skin)
  rect(5, 12, 10, 12, skin)
  rect(3, 6, 3, 9, skin)
  rect(12, 6, 12, 9, skin)
  // Yeux
  put(6, 8, dark)
  put(9, 8, dark)
  // Bouche
  rect(7, 10, 8, 10, '#a05a48')

  // Coiffures
  if (style === 'court') {
    rect(4, 3, 11, 4, hair)
    rect(3, 4, 3, 5, hair)
    rect(12, 4, 12, 5, hair)
  } else if (style === 'bataille') {
    rect(4, 2, 11, 4, hair)
    put(3, 3, hair)
    put(12, 2, hair)
    put(5, 1, hair)
    put(9, 1, hair)
  } else if (style === 'rase') {
    rect(4, 3, 11, 3, hair)
  } else if (style === 'chignon') {
    rect(4, 3, 11, 4, hair)
    rect(6, 1, 9, 2, hair)
    rect(3, 4, 3, 7, hair)
    rect(12, 4, 12, 7, hair)
  } else if (style === 'longs') {
    rect(4, 2, 11, 4, hair)
    rect(3, 4, 3, 12, hair)
    rect(12, 4, 12, 12, hair)
    rect(2, 6, 2, 12, hair)
    rect(13, 6, 13, 12, hair)
  } else if (style === 'queue') {
    rect(4, 3, 11, 4, hair)
    rect(12, 4, 13, 10, hair)
  } else if (style === 'boucles') {
    rect(4, 2, 11, 4, hair)
    put(3, 3, hair)
    put(12, 3, hair)
    put(4, 5, hair)
    put(11, 5, hair)
  } else if (style === 'casquette') {
    rect(4, 4, 11, 4, hair)
    rect(3, 2, 12, 3, hat)
    rect(1, 4, 4, 4, hat)
  } else if (style === 'capuche') {
    rect(3, 2, 12, 4, hat)
    rect(2, 4, 3, 11, hat)
    rect(12, 4, 13, 11, hat)
    rect(5, 4, 10, 4, hair)
  } else if (style === 'voile') {
    rect(3, 2, 12, 4, hat)
    rect(2, 4, 3, 12, hat)
    rect(12, 4, 13, 12, hat)
    rect(4, 4, 11, 4, '#f0ead8')
  } else if (style === 'plume') {
    rect(3, 3, 12, 4, hat)
    rect(2, 4, 13, 4, hat)
    put(13, 2, '#e8e2d0') // plume
    put(14, 1, '#e8e2d0')
    rect(4, 5, 11, 5, hair)
  }

  // Détails
  if (extra === 'moustache') rect(5, 10, 10, 10, hair)
  if (extra === 'moustachefine') {
    put(6, 10, hair)
    put(9, 10, hair)
    rect(7, 10, 8, 9, skin)
    rect(7, 10, 8, 10, hair)
  }
  if (extra === 'sourcils') {
    rect(5, 7, 6, 7, hair)
    rect(9, 7, 10, 7, hair)
  }
  if (extra === 'joues') {
    put(4, 9, '#eaa0a0')
    put(11, 9, '#eaa0a0')
  }
  if (extra === 'bandeau') rect(3, 5, 12, 5, extraColor || '#c23b3b')
  if (extra === 'diademe') {
    rect(5, 2, 10, 2, extraColor || '#f4d557')
    put(7, 1, extraColor || '#f4d557')
  }
  if (extra === 'casque') {
    rect(2, 6, 3, 9, extraColor || '#3fae66')
    rect(12, 6, 13, 9, extraColor || '#3fae66')
    rect(3, 1, 12, 1, extraColor || '#3fae66')
    put(3, 2, extraColor || '#3fae66')
    put(12, 2, extraColor || '#3fae66')
  }
  if (extra === 'chale') {
    rect(3, 12, 12, 13, extraColor || '#7a4a8a')
    rect(2, 13, 4, 14, extraColor || '#7a4a8a')
    rect(11, 13, 13, 14, extraColor || '#7a4a8a')
  }
  if (extra === 'meche') rect(5, 4, 7, 5, '#a8763e')
  if (extra === 'lampe') {
    // Reflet chaud de la lampe sur le visage de JS.
    put(3, 10, '#f0b060')
    put(12, 10, '#f0b060')
    put(2, 11, '#f0b060')
  }
  return g
}

export default function Portrait({ spec, size = 56, className = '' }) {
  const grid = useMemo(() => (spec ? buildGrid(spec) : null), [spec])
  if (!grid) return null
  const cells = []
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++)
      if (grid[y][x]) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={grid[y][x]} />)
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width={size}
      height={size}
      className={`portrait ${className}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {cells}
    </svg>
  )
}
