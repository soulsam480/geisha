import { presetIcons, presetUno, presetWind, transformerDirectives } from 'unocss'
import { defineConfig } from 'unocss/vite'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetWind(),
  ],
  transformers: [
    transformerDirectives(),
  ],
})
