import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    strictPort: true,
    open: true
  },
  preview: {
    port: 4173,
    host: true,
    strictPort: true
  },
  optimizeDeps: {
    include: [
      'prop-types',
      'react',
      'react-dom',
      'react-router-dom'
    ],
    exclude: ['lucide-react', 'react-datepicker']
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  }
});
