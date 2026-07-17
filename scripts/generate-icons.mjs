// Génère les icônes PWA (192, 512, 512 maskable) en PNG pur, sans dépendance.
// Icône : Mistiflouk lové autour de la lampe (Partie III §9).
// Usage : node scripts/generate-icons.mjs
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'icons')
mkdirSync(outDir, { recursive: true })

const CRC_TABLE = (() => {
  const t = new Int32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([len, body, crc])
}

function encodePNG(width, height, rgba) {
  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0
    rgba.copy(raw, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4)
  }
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

// Dessin pixel : fond nuit, halo doré, lampe de cuivre, Mistiflouk lové autour.
function drawIcon(size, { padding = 0 } = {}) {
  const px = Buffer.alloc(size * size * 4)
  const put = (x, y, r, g, b, a = 255) => {
    x = Math.round(x)
    y = Math.round(y)
    if (x < 0 || y < 0 || x >= size || y >= size) return
    const i = (y * size + x) * 4
    const na = a / 255
    px[i] = px[i] * (1 - na) + r * na
    px[i + 1] = px[i + 1] * (1 - na) + g * na
    px[i + 2] = px[i + 2] * (1 - na) + b * na
    px[i + 3] = Math.min(255, px[i + 3] + a)
  }
  const disc = (cx, cy, rr, r, g, b, a = 255) => {
    for (let y = Math.floor(cy - rr); y <= cy + rr; y++)
      for (let x = Math.floor(cx - rr); x <= cx + rr; x++) {
        const dx = x - cx
        const dy = y - cy
        if (dx * dx + dy * dy <= rr * rr) put(x, y, r, g, b, a)
      }
  }
  const rect = (x0, y0, x1, y1, r, g, b) => {
    for (let y = Math.floor(y0); y <= y1; y++) for (let x = Math.floor(x0); x <= x1; x++) put(x, y, r, g, b)
  }

  // Fond nuit
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) put(x, y, 0x14, 0x11, 0x26)

  const s = (size - padding * 2) / 512
  const cx = size / 2
  const cy = size / 2

  // Halo doré
  for (let ring = 200; ring > 0; ring -= 4)
    disc(cx, cy - 10 * s, ring * s, 0xf0, 0xa8, 0x44, ring > 150 ? 2 : ring > 90 ? 4 : 6)

  // Corps de la lampe (cuivre)
  rect(cx - 60 * s, cy + 20 * s, cx + 60 * s, cy + 80 * s, 0xa8, 0x6a, 0x3a) // cuve
  rect(cx - 74 * s, cy + 74 * s, cx + 74 * s, cy + 90 * s, 0x8a, 0x54, 0x2e) // pied
  rect(cx - 16 * s, cy - 24 * s, cx + 16 * s, cy + 24 * s, 0xc8, 0x86, 0x4a) // col
  rect(cx - 34 * s, cy - 34 * s, cx + 34 * s, cy - 22 * s, 0xa8, 0x6a, 0x3a) // collerette
  // Reflet
  rect(cx - 48 * s, cy + 28 * s, cx - 36 * s, cy + 70 * s, 0xd8, 0x9a, 0x5c)

  // Flamme
  disc(cx, cy - 66 * s, 30 * s, 0xf0, 0xa8, 0x44)
  disc(cx, cy - 72 * s, 20 * s, 0xff, 0xd2, 0x7a)
  disc(cx, cy - 78 * s, 10 * s, 0xff, 0xf0, 0xc0)

  // Mistiflouk lové autour (arc de cercle vert, tête à droite)
  const R = 150 * s
  const thick = 26 * s
  for (let a = -0.2; a < Math.PI * 1.45; a += 0.008) {
    const wob = Math.sin(a * 3) * 8 * s
    const x = cx + Math.cos(a) * (R + wob)
    const y = cy + 30 * s + Math.sin(a) * (R * 0.72 + wob)
    disc(x, y, thick / 2, 0x4f, 0x9f, 0x68)
    disc(x, y - thick * 0.18, thick / 5, 0x7a, 0xc8, 0x8f, 160) // reflet d'écailles
  }
  // Tête
  const hx = cx + Math.cos(-0.2) * R
  const hy = cy + 30 * s + Math.sin(-0.2) * (R * 0.72)
  disc(hx, hy, 22 * s, 0x4f, 0x9f, 0x68)
  disc(hx + 8 * s, hy - 6 * s, 5 * s, 0x14, 0x11, 0x26) // œil
  rect(hx + 18 * s, hy + 2 * s, hx + 30 * s, hy + 5 * s, 0xe0, 0x5a, 0x5a) // langue

  return encodePNG(size, size, px)
}

writeFileSync(join(outDir, 'icon-192.png'), drawIcon(192))
writeFileSync(join(outDir, 'icon-512.png'), drawIcon(512))
// maskable : zone de sécurité de 20 % (padding)
writeFileSync(join(outDir, 'icon-512-maskable.png'), drawIcon(512, { padding: 102 }))
console.log('Icônes générées dans public/icons/')
