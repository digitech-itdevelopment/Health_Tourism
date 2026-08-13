import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Served from a subdirectory on digiswasth.com, so every asset URL has to carry the
  // prefix. The router reads the same value back via import.meta.env.BASE_URL, so this
  // line is the single place the deploy path is defined.
  base: '/health-tourism/',
  plugins: [react(), tailwindcss()],
})
