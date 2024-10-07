import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        background: 'background.js',
        contentScript: 'contentScript.js',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
})