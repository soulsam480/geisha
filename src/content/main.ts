/* eslint-disable no-console */
import { createApp } from 'vue'
import { runtime } from 'webextension-polyfill'
import { modelCache } from './store/modelCacheStore'
import App from './views/App.vue'
import { setupApp } from '~/logic/common-setup'
import { logger } from '~/utils/logger'

console.info('[vitesse-webext] Hello world from content script')

function injectScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('data-geisha-script', 'true')
    script.src = src
    script.type = 'module'
    script.addEventListener('load', resolve)
    script.addEventListener('error', e => reject(e.error))
    document.head.appendChild(script)
  })
}

injectScript(runtime.getURL('src/scripts/fetch-mock.js'))

modelCache.listen()

const APP_SELECTOR = 'ytmusic-settings-button.settings-button'

addEventListener('load', async () => {
  logger.info('page load')

  const container = document.createElement('div')
  container.id = 'geisha-portal'

  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container

  const root = document.createElement('div')

  if (__DEV__) {
    const { devStyleEl } = await import('./style-compat/dev')

    shadowDOM.appendChild(devStyleEl())
  }
  else {
    const { prodStyleEl } = await import('./style-compat/prod')

    shadowDOM.appendChild(prodStyleEl())
  }

  shadowDOM.appendChild(root)

  const target = document.querySelector<HTMLDivElement>(APP_SELECTOR)

  if (target !== null) {
    target.insertAdjacentElement('afterend', container)

    const app = createApp(App)
    setupApp(app)
    app.mount(root)
  }
})
