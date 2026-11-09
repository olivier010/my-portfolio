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
  build: {
    minify: 'esbuild',
    target: 'es2020',
    sourcemap: false,
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
          'vendor-icons': ['lucide-react', 'react-icons'],
          'vendor-contentful': ['contentful', '@contentful/rich-text-react-renderer'],
        }
      }
    }
  },
})