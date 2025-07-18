import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [react(), tailwindcss(), mkcert()],
  define: {
    global: 'window',
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        chunkFileNames: 'chunks/[name]-[hash].js',
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          motion: ['motion'],
          firebase: ['firebase/app', 'firebase/messaging']
        }
      }
    },
  },
  server: {
    fs: {
      strict: false,
    }
  },  
})
