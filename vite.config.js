import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import markdown from 'vite-plugin-markdown';

export default defineConfig({
  plugins: [react(), markdown.default({ mode: 'react' })],
  resolve: {
    alias: {
      '%': fileURLToPath(new URL('./src', import.meta.url)),
      '#': fileURLToPath(new URL('./src/modules', import.meta.url)),
    },
  },
});
