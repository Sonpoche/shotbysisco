import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    sourcemap: false, // Désactive les source maps en production
    rollupOptions: {
      // Optimisation des chunks pour cache
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          gsap: ['gsap'],
          router: ['react-router-dom']
        }
      }
    }
  },
  // S'assurer que sw.js est copié
  publicDir: 'public'
});