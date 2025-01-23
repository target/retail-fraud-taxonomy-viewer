import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/retail-fraud-taxonomy-viewer/',
  plugins: [react()],
  test: {
    globals: true,
    setupFiles: ['./vitest-setup.js'],
    environment: 'happy-dom',
  },
});
