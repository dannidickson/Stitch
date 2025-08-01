import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  root: './packages/web',
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('/', import.meta.url)),
    },
  },
})
