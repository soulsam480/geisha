import { defineConfig } from 'vite'
import { sharedConfig } from './vite.config.mjs'
import { isDev, r } from './scripts/utils'
import packageJson from './package.json'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  define: {
    '__DEV__': isDev,
    '__NAME__': JSON.stringify(packageJson.name),
    // https://github.com/vitejs/vite/issues/9320
    // https://github.com/vitejs/vite/issues/9186
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production'),
  },
  build: {
    watch: isDev
      ? {}
      : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    minify: !isDev,
    lib: {
      entry: {
        'index': r('src/contentScripts/index.ts'),
        'main': r('src/contentScripts/main.ts'),
        'fetch-mock': r('src/scripts/fetch-mock.ts'),
      },
      name: packageJson.name,
      formats: ['es'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].mjs',
        extend: true,
      },
    },
  },
})
