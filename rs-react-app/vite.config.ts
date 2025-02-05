import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/REACT2025Q1/', // совпадает с именем репозитория
  build: {
    outDir: 'dist',
  },
});
