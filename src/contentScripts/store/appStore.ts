import { reactive } from 'vue'

interface IAppStore {
  isPopupOpen: boolean
}

export const appStore = reactive<IAppStore>({
  isPopupOpen: false,
})
