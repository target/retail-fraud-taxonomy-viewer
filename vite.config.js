import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: 'dist',
  },
  base: process.env.VITE_BUILD_MODE === 'development' 
    ? '/retail-fraud-taxonomy-viewer/dev/' 
    : '/retail-fraud-taxonomy-viewer/',  // For production, change this as per your URL
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./vitest-setup.js'],
    environment: 'happy-dom',
  },
});
