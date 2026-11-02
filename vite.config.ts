import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base: './'` makes the build work on Vercel AND on GitHub Pages sub-paths.
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200,
  },
});
