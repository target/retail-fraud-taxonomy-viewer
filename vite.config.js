import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  build: {
    outDir: process.env.BUILD_MODE === 'development' ? 'dist/dev1' : 'dist', // If development, output to dist/dev
  },
  base: process.env.BUILD_MODE === 'development'
    ? '/retail-fraud-taxonomy-viewer/dev1/'
    : '/retail-fraud-taxonomy-viewer/',  // Adjust base for dev and prod
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./vitest-setup.js'],
    environment: 'happy-dom',
  },
});