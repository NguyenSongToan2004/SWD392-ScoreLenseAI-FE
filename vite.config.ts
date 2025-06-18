import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // Đặt thư mục đầu ra là 'dist'
    rollupOptions: {
      output: {
        // Đặt tên chunk file
        chunkFileNames: 'chunks/[name]-[hash].js',
        // Manual chunks cần phải được cấu hình trong rollupOptions.output
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'react'; // Chia thành chunk riêng cho React
            }
            if (id.includes('react-dom')) {
              return 'react-dom'; // Chia thành chunk riêng cho ReactDOM
            }
            if (id.includes('antd')) {
              return 'antd'; // Chia thành chunk riêng cho Ant Design
            }
          }
        }
      }
    },
  },
  server: {
    fs: {
      strict: false, // Cho phép truy cập hệ thống tệp rộng hơn
    },
  },
})
