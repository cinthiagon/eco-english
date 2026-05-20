import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Projeto desenvolvido por Cinthia Gonçalez
// Atividade de extensão — Cruzeiro do Sul Virtual / Universidade Positivo
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
