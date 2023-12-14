import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  envDir: './src/env',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom']
          // Add more chunks as needed
        }
      }
    }
  }
});
