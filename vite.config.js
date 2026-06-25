import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom domain (gestprime.online) -> base '/'.
// If you ever deploy to a project subpath instead, set base to '/GestPrime/'.
export default defineConfig({
  plugins: [react()],
  base: '/',
})
