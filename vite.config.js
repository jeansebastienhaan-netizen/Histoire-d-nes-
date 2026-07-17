import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Le nom exact du repo GitHub : indispensable pour GitHub Pages.
const BASE = '/Histoire-d-nes-/'

export default defineConfig({
  base: BASE,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['icons/*.png'],
      manifest: {
        name: 'Mistiflouk',
        short_name: 'Mistiflouk',
        description:
          "Mistiflouk, le serpent d'Aloïs, a disparu dans des galeries sous le village. Toute la famille descend le chercher.",
        start_url: BASE,
        scope: BASE,
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#141126',
        theme_color: '#141126',
        icons: [
          { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: 'icons/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,webp,woff2,json,mp3}'],
      },
    }),
  ],
})
