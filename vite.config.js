import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import { createPinia } from 'pinia';
import PiniaPersistedState from 'pinia-plugin-persistedstate';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),

    // @quasar/plugin-vite options list:
    // https://github.com/quasarframework/quasar/blob/dev/vite-plugin/index.d.ts
    quasar({
      sassVariables: 'src/quasar-variables.sass'
    }),
    
    // Configura Pinia con el plugin de persistencia
    createPinia().use(PiniaPersistedState),
  ]
});

