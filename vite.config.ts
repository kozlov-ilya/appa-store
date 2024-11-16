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
      api: '/src/api',
      store: '/src/store',
      config: '/src/config',
      contexts: '/src/contexts',
      utils: '/src/utils',
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
