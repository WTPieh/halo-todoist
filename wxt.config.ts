import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-svelte'],
  manifest: {
    browser_action: {
      default_popup: 'popup.html',
      default_title: 'Haloist'
    },
    host_permissions: ['https://app.todoist.com/*'],
    permissions: ['identity', 'storage', 'cookies'],
  },
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
