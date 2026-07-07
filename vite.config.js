// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@core': path.resolve(__dirname, './src/core'),
      '@layout': path.resolve(__dirname, './src/layout'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@content': path.resolve(__dirname, './src/pages/content'),
    }
  },

  server: {
    port:3000,
    open: true, // 👈 isso faz abrir o navegador automaticamente
  }
});