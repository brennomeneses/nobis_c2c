import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Plataforma Nobis',
      short_name: 'Nobis',
      description: 'Plataforma de impacto 4.0',
      theme_color: '#ffffff',
      screenshots: [
        {
          src: "assets/screen2_mobile.png",
          sizes: "397x874",
          type: "image/png",
          form_factor: "narrow",
          label: "Primeira tela"
        },
        {
          src: "assets/screen1_mobile.png",
          sizes: "397x874",
          type: "image/png",
          form_factor: "narrow",
          label: "Segunda tela"
        }
      ],
      icons: [
        {
          src: '/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      maximumFileSizeToCacheInBytes: 5000000,
    },
  }),],
  server: {
    host: '0.0.0.0',
  }
})
