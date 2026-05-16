import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Projeto desenvolvido por Cinthia Gonçalez
// Atividade de extensão — Universidade Positivo
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
