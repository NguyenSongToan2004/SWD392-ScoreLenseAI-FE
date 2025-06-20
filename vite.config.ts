import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Đặt thư mục đầu ra là 'dist'
    rollupOptions: {
      output: {
        // Đặt tên chunk file
        chunkFileNames: 'chunks/[name]-[hash].js',
        // Manual chunks cần phải được cấu hình trong rollupOptions.output
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          antd: ['antd'],
          motion: ['motion'],
        }
      }
    },
  },
  server: {
    fs: {
      strict: false, // Cho phép truy cập hệ thống tệp rộng hơn
    }
  },
})
