import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  vite: (env) => {
    return {
      resolve: {
        alias: {
          $lib: path.resolve('src/lib'),
          '@components': path.resolve('src/lib/components/ui'),
        },
      },
      plugins: [tailwindcss() as any],
    };
  },
});
