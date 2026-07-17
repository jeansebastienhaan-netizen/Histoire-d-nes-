// Génère les icônes PWA (192, 512, 512 maskable) en PNG pur, sans dépendance.
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

// Dessin : fond nuit #1a1a2e, croissant de lune doré, étoiles.
function drawIcon(size, { padding = 0 } = {}) {
  const px = Buffer.alloc(size * size * 4)
  const put = (x, y, r, g, b, a = 255) => {
    if (x < 0 || y < 0 || x >= size || y >= size) return
    const i = (y * size + x) * 4
    // alpha blend simple
    const na = a / 255
    px[i] = px[i] * (1 - na) + r * na
    px[i + 1] = px[i + 1] * (1 - na) + g * na
    px[i + 2] = px[i + 2] * (1 - na) + b * na
    px[i + 3] = Math.min(255, px[i + 3] + a)
  }
  // fond
  for (let y = 0; y < size; y++)
    for (let x = 0; x < size; x++) put(x, y, 0x1a, 0x1a, 0x2e)

  const inCircle = (x, y, cx, cy, rr) => {
    const dx = x - cx, dy = y - cy
    return dx * dx + dy * dy <= rr * rr
  }

  const scale = (size - padding * 2) / 512
  const cx = size / 2
  const cy = size / 2
  const moonR = 150 * scale
  const holeOff = 60 * scale
  // croissant : cercle doré moins cercle décalé (couleur fond)
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (inCircle(x, y, cx + 10 * scale, cy - 10 * scale, moonR)) {
        if (!inCircle(x, y, cx + 10 * scale + holeOff, cy - 10 * scale - holeOff * 0.6, moonR * 0.92)) {
          put(x, y, 0xe8, 0xc5, 0x6a)
        }
      }
    }
  }
  // étoiles
  const stars = [
    [0.22, 0.2, 6], [0.75, 0.72, 5], [0.2, 0.68, 4],
    [0.68, 0.18, 4], [0.32, 0.82, 3], [0.85, 0.4, 3],
  ]
  for (const [sx, sy, sr] of stars) {
    const scx = padding + sx * (size - padding * 2)
    const scy = padding + sy * (size - padding * 2)
    const r = Math.max(1, sr * scale)
    for (let y = Math.floor(scy - r); y <= scy + r; y++)
      for (let x = Math.floor(scx - r); x <= scx + r; x++)
        if (inCircle(x, y, scx, scy, r)) put(x, y, 0xf5, 0xef, 0xd8)
  }
  return encodePNG(size, size, px)
}

writeFileSync(join(outDir, 'icon-192.png'), drawIcon(192))
writeFileSync(join(outDir, 'icon-512.png'), drawIcon(512))
// maskable : zone de sécurité de 20 % (padding)
writeFileSync(join(outDir, 'icon-512-maskable.png'), drawIcon(512, { padding: 102 }))
console.log('Icônes générées dans public/icons/')
