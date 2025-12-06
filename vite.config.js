import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: false,
      ignored: ['**/node_modules/**', '**/.git/**'],
    },
    hmr: {
      overlay: false,
      clientPort: 24678,
      port: 24678,
    },
    sourcemap: false,
  },
  esbuild: {
    minify: false,
  },
  build: {
    minify: false,
    sourcemap: false,
  },
})