import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs',
      '@tensorflow-models/mobilenet',
      '@tensorflow/tfjs-core',
      '@tensorflow/tfjs-converter',
      '@tensorflow/tfjs-backend-cpu',
      '@tensorflow/tfjs-backend-webgl'
    ],
    exclude: ['@tensorflow/tfjs-backend-wasm'] // Exclude WASM backend unless needed
  },
  server: {
    fs: {
      // Allow serving files from tensorflow modules
      allow: ['..', 'node_modules/@tensorflow']
    }
  }
})