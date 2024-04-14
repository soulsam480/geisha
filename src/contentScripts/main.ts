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

injectScript(runtime.getURL('dist/contentScripts/fetch-mock.mjs'))

modelCache.listen()

const APP_SELECTOR = 'ytmusic-settings-button.settings-button'

addEventListener('load', () => {
  logger.info('page load')

  const container = document.createElement('div')
  container.id = 'geisha-portal'

  const shadowDOM = container.attachShadow?.({ mode: __DEV__ ? 'open' : 'closed' }) || container

  const root = document.createElement('div')
  const styleEl = document.createElement('link')

  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', runtime.getURL('dist/contentScripts/style.css'))

  shadowDOM.appendChild(styleEl)
  shadowDOM.appendChild(root)

  // document.body.appendChild(container)

  const target = document.querySelector<HTMLDivElement>(APP_SELECTOR)

  if (target !== null) {
    target.insertAdjacentElement('afterend', container)

    const app = createApp(App)
    setupApp(app)
    app.mount(root)
  }
})
