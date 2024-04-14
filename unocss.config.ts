import { presetUno, presetWind, transformerDirectives, transformerVariantGroup } from 'unocss'
import { defineConfig } from 'unocss/vite'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  presets: [
    presetUno(),
    presetWind(),
    presetRemToPx(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
