import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/main.scss";`
      }
    }
  },
  plugins: [
    vue(),
    AutoImport({
      dts: true,
      dirs: ['./src/helpers', './src/router'],
      imports: [
        {
          vue: ['ref', 'computed', 'watchEffect', 'onMounted', 'onUnmounted'],
          pinia: ['defineStore', 'storeToRefs']
        }
      ]
    }),
    Components({
      dirs: ['./src/components']
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
