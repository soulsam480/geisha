import type { WritableComputedRef } from 'vue'
import { computed, reactive } from 'vue'
import { appStore } from './appStore'
import { ModelCache } from '~/store/models/cache'

export const modelCache = reactive(new ModelCache())

export function useAppOpen(): WritableComputedRef<boolean> {
  return computed({
    get() {
      return appStore.isPopupOpen
    },
    set(open: boolean) {
      appStore.isPopupOpen = open
    },

  })
}
