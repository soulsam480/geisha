import { fileURLToPath } from 'node:url'
import { crx } from '@crxjs/vite-plugin'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'
import { manifest } from './manifest'
import packageJson from './package.json'
import { isDev } from './scripts/utils'

const EXPORT_HELPER_RE = /plugin-vue:export-helper/

const INTERNAL_VUE_HELPER_ID = 'GEISHA_VUE_HELPER_ID'

const helperCode = `
export default (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
}
`

function ExportHelperPlugin(): Plugin {
  return {
    name: 'vue-export-helper',
    resolveId(id) {
      if (EXPORT_HELPER_RE.test(id))
        return INTERNAL_VUE_HELPER_ID
    },
    load(id) {
      if (id === INTERNAL_VUE_HELPER_ID)
        return helperCode
    },
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
  },
  plugins: [
    ExportHelperPlugin(),
    Vue(),

    // https://github.com/antfu/unplugin-icons
    Icons({
      autoInstall: true,
    }),

    // https://github.com/unocss/unocss
    UnoCSS(),

    crx({
      manifest,
    }),
  ],
  build: {
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].js`,
        chunkFileNames: `assets/[name].js`,
        assetFileNames: `assets/[name].[ext]`,
      },
    },
  },
})
