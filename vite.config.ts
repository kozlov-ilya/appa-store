import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      components: '/src/components',
      styles: '/src/styles',
      providers: '/src/providers',
      assets: '/src/assets',
      configs: '/src/configs',
      hooks: '/src/hooks',
      types: '/src/types',
      api: '/src/api',
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "styles/variables.scss" as *;`,
      },
    },
  },
});
