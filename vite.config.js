import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  // Base URL for GitHub Pages deployment. Uses the repo name from GITHUB_REPOSITORY env var.
  base: '/' + (process.env.GITHUB_REPOSITORY?.split('/')?.[1] || '') + '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
});