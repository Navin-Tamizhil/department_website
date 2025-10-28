import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
   base: '/department_website/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
 
})
