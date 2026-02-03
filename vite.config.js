import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path' // ต้อง import path มาด้วย

export default defineConfig({
  base: './', 
  logLevel: 'error', 
  plugins: [
    base44({
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true
    }),
    react(),
  ],
  // เพิ่มส่วนนี้เข้าไปเพื่อให้ระบบเข้าใจเครื่องหมาย @ ในโปรเจกต์
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});