import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const config = {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./demo', import.meta.url))
      }
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'v-hero',
        fileName: (format) => `vhero.${format}.js`
      },
      outDir: "dist",
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    },
  }
  if (command === 'serve') {
    return config
  } else {
    config.publicDir = "/dist"
    return config
  }
})













