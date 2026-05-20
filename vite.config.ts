import { defineConfig } from 'vite'

export default defineConfig({
  root: 'public',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: 'public/index.html',
        login: 'public/login.html',
        dashboard: 'public/dashboard.html',
        inventory: 'public/inventory.html',
        movements: 'public/movements.html',
      }
    }
  },
  publicDir: false,
})
