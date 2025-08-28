import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/webchat': {
        target: 'http://147.93.105.175:9090',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/webchat/, '/webchat'),
      },
    },
  },
})
